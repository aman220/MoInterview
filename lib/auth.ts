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
  /** No longer sent to the client — the refresh token lives in an httpOnly cookie. */
  refreshToken?: string | null
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

const USER_KEY = 'mo-user'
// Legacy keys from the old localStorage-token model — cleaned up on session change.
const LEGACY_ACCESS_KEY = 'mo-access-token'
const LEGACY_REFRESH_KEY = 'mo-refresh-token'

/**
 * The access token is short-lived and kept only in memory — never localStorage —
 * so an XSS payload can't read it after the fact. It's re-obtained on demand via
 * the httpOnly refresh cookie. The (non-secret) user object stays in localStorage
 * purely so the UI can render the logged-in state without a round-trip.
 */
let accessTokenInMemory: string | null = null

/** Dispatched on the window whenever the session changes, so the UI can react. */
export const AUTH_EVENT = 'mo-auth-change'

function notifyAuthChange(): void {
  try {
    window.dispatchEvent(new Event(AUTH_EVENT))
  } catch {
    /* SSR / no window */
  }
}

function clearLegacyTokens(): void {
  try {
    localStorage.removeItem(LEGACY_ACCESS_KEY)
    localStorage.removeItem(LEGACY_REFRESH_KEY)
  } catch {
    /* ignore */
  }
}

export function saveSession(auth: AuthResponse): void {
  accessTokenInMemory = auth.accessToken
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user))
  } catch {
    /* storage unavailable — user just won't persist across reloads */
  }
  clearLegacyTokens()
  notifyAuthChange()
}

/**
 * Base URL of the standalone interviewer ("coach") dashboard app. Interviewers
 * live in that app, not the main site — set NEXT_PUBLIC_COACH_APP_URL per env
 * (defaults to the local dev port).
 */
export const COACH_APP_URL = process.env.NEXT_PUBLIC_COACH_APP_URL ?? 'http://localhost:3002'

/**
 * Route a user to their role-appropriate dashboard. Interviewers go to the
 * standalone coach app (an external URL); candidates stay on the main site.
 */
export function dashboardPath(user: UserSummary | null): string {
  return user?.role === 'INTERVIEWER' ? COACH_APP_URL : '/dashboard'
}

export function getAccessToken(): string | null {
  return accessTokenInMemory
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
  accessTokenInMemory = null
  try {
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
  clearLegacyTokens()
  notifyAuthChange()
}

/**
 * Best-effort logout: revoke the refresh token server-side (the httpOnly cookie
 * carries it) and clear the local session.
 */
export async function signOut(): Promise<void> {
  try {
    await logout()
  } catch {
    /* cookie may already be gone/expired — clear locally regardless */
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

/** Exchanges the httpOnly refresh cookie for a fresh access token (+ rotated cookie). */
export function refresh(): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/refresh', { method: 'POST' })
}

export function logout(): Promise<void> {
  return request<void>('/auth/logout', { method: 'POST' })
}

/** Redeem the one-time OAuth code for a session (sets the refresh cookie). */
export function exchangeOAuthCode(code: string): Promise<AuthResponse> {
  return request<AuthResponse>('/oauth/exchange', { method: 'POST', body: { code } })
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
  refreshInFlight = refresh()
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

/** The interviewer's own profile. Rejects with a 404 ApiError if onboarding isn't done. */
export function getMyInterviewerProfile(): Promise<unknown> {
  return authFetch<unknown>('/interviewers/me/profile')
}
