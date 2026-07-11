/**
 * Typed client for the backend auth + interviewer-onboarding APIs, plus small
 * localStorage helpers for persisting the session (access token, refresh token,
 * and the current user).
 */

import { request } from './api'

export type Role = 'CANDIDATE' | 'INTERVIEWER'

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

export function saveSession(auth: AuthResponse): void {
  try {
    localStorage.setItem(ACCESS_KEY, auth.accessToken)
    localStorage.setItem(REFRESH_KEY, auth.refreshToken)
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user))
  } catch {
    /* storage unavailable — session simply won't persist */
  }
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

export function clearSession(): void {
  try {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
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

export function getMe(token: string): Promise<UserSummary> {
  return request<UserSummary>('/users/me', { token })
}

// ---------------------------------------------------------------------------
// Interviewer onboarding
// ---------------------------------------------------------------------------

export function onboardInterviewer(
  payload: OnboardInterviewerPayload,
  token: string,
): Promise<unknown> {
  return request<unknown>('/interviewers/onboard', { method: 'POST', body: payload, token })
}
