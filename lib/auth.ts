/**
 * Typed client for the backend auth + interviewer-onboarding APIs, plus small
 * localStorage helpers for persisting the session (access token, refresh token,
 * and the current user).
 */

import { request, API_BASE_URL, ApiError } from './api'

export type Role = 'CANDIDATE' | 'INTERVIEWER'
export type OAuthProvider = 'google' | 'github' | 'linkedin'

/**
 * Full-page URL that kicks off a provider's OAuth flow on the backend.
 * `login` signs in / provisions an account; `import` pulls LinkedIn profile
 * fields to prefill interviewer onboarding.
 */
export function oauthAuthorizeUrl(provider: OAuthProvider, intent: 'login' | 'import' = 'login'): string {
  return `${API_BASE_URL}/oauth/${provider}/authorize?intent=${intent}`
}

export interface UserSummary {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  avatarUrl: string | null
  emailVerified: boolean
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: UserSummary
}

/** Backend Specialty enum keys. Labels shown in the UI map to these. */
export type SpecialtyKey =
  | 'SYSTEM_DESIGN'
  | 'ALGORITHMS'
  | 'BEHAVIORAL'
  | 'FRONTEND'
  | 'BACKEND'
  | 'ML_AI'

export interface OnboardInterviewerPayload {
  company: string
  jobTitle: string
  roleType: string
  yearsExperience: number
  specialties: SpecialtyKey[]
  bio: string
  linkedinUrl?: string
  pricePerSession?: number
}

// ---------------------------------------------------------------------------
// Session storage
// ---------------------------------------------------------------------------

const ACCESS_KEY = 'mo-access-token'
const REFRESH_KEY = 'mo-refresh-token'
const USER_KEY = 'mo-user'

/** Dispatched on the window whenever the session changes, so the UI can react. */
export const AUTH_EVENT = 'mo-auth-change'

function notifyAuthChange(): void {
  try {
    window.dispatchEvent(new Event(AUTH_EVENT))
  } catch {
    /* SSR / no window */
  }
}

export function saveSession(auth: AuthResponse): void {
  try {
    localStorage.setItem(ACCESS_KEY, auth.accessToken)
    localStorage.setItem(REFRESH_KEY, auth.refreshToken)
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user))
  } catch {
    /* storage unavailable — session simply won't persist */
  }
  notifyAuthChange()
}

/** Route a user to their role-appropriate dashboard. */
export function dashboardPath(user: UserSummary | null): string {
  return user?.role === 'INTERVIEWER' ? '/dashboard/interviewer' : '/dashboard'
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_KEY)
  } catch {
    return null
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY)
  } catch {
    return null
  }
}

export function getCurrentUser(): UserSummary | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as UserSummary) : null
  } catch {
    return null
  }
}

/** Update the stored user (e.g. after email verification) and notify listeners. */
export function saveUser(user: UserSummary): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    /* ignore */
  }
  notifyAuthChange()
}

export function clearSession(): void {
  try {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
  notifyAuthChange()
}

/**
 * Best-effort logout: revoke the refresh token on the server (ignoring errors)
 * and clear the local session.
 */
export async function signOut(): Promise<void> {
  const rt = getRefreshToken()
  if (rt) {
    try {
      await logout(rt)
    } catch {
      /* token may already be expired/revoked — clear locally regardless */
    }
  }
  clearSession()
}

// ---------------------------------------------------------------------------
// Auth API calls
// ---------------------------------------------------------------------------

export function register(input: {
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
}): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', { method: 'POST', body: input })
}

export function login(input: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', { method: 'POST', body: input })
}

export function refresh(refreshToken: string): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/refresh', { method: 'POST', body: { refreshToken } })
}

export function logout(refreshToken: string): Promise<void> {
  return request<void>('/auth/logout', { method: 'POST', body: { refreshToken } })
}

export function sendOtp(email: string): Promise<void> {
  return request<void>('/auth/send-otp', { method: 'POST', body: { email } })
}

export function verifyOtp(email: string, code: string): Promise<void> {
  return request<void>('/auth/verify-otp', { method: 'POST', body: { email, code } })
}

export function forgotPassword(email: string): Promise<void> {
  return request<void>('/auth/forgot-password', { method: 'POST', body: { email } })
}

export function resetPassword(input: {
  email: string
  code: string
  newPassword: string
}): Promise<void> {
  return request<void>('/auth/reset-password', { method: 'POST', body: input })
}

/**
 * Single-flight token refresh. Concurrent 401s must not each call /auth/refresh:
 * refresh tokens ROTATE, so the first refresh revokes the token the others hold,
 * which would spuriously log the user out. All callers share one in-flight
 * refresh and receive the same new session.
 */
let refreshInFlight: Promise<AuthResponse> | null = null

function refreshSession(): Promise<AuthResponse> {
  if (refreshInFlight) return refreshInFlight
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    return Promise.reject(new ApiError('Your session has expired. Please sign in again.', 401))
  }
  refreshInFlight = refresh(refreshToken)
    .then(auth => {
      saveSession(auth)
      return auth
    })
    .finally(() => {
      refreshInFlight = null
    })
  return refreshInFlight
}

/**
 * Performs an authenticated request, transparently refreshing the access token
 * once if it has expired (401). Access tokens are short-lived (15 min); the
 * refresh token lasts days, so this keeps long flows (like onboarding) working
 * without forcing a re-login. If refresh fails, the session is cleared.
 */
export async function authFetch<T>(
  path: string,
  options: { method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; body?: unknown } = {},
): Promise<T> {
  const token = getAccessToken()
  try {
    return await request<T>(path, { ...options, token })
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 401) throw err

    let refreshed: AuthResponse
    try {
      refreshed = await refreshSession()
    } catch {
      clearSession()
      throw new ApiError('Your session has expired. Please sign in again.', 401)
    }
    return request<T>(path, { ...options, token: refreshed.accessToken })
  }
}

/** Current user. Pass an explicit token to bootstrap (e.g. right after OAuth). */
export function getMe(token?: string): Promise<UserSummary> {
  if (token) return request<UserSummary>('/users/me', { token })
  return authFetch<UserSummary>('/users/me')
}

// ---------------------------------------------------------------------------
// Interviewer onboarding
// ---------------------------------------------------------------------------

export function onboardInterviewer(payload: OnboardInterviewerPayload): Promise<unknown> {
  return authFetch<unknown>('/interviewers/onboard', { method: 'POST', body: payload })
}
