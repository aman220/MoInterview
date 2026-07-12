/**
 * Thin fetch wrapper around the MoInterview backend.
 *
 * The backend wraps every response in an envelope:
 *   { success, message, data, errors, timestamp }
 *
 * `request()` unwraps `data` on success and throws an {@link ApiError} on failure,
 * so callers deal in plain domain objects and try/catch.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T | null
  errors: Record<string, string> | null
  timestamp: string
}

/** Error thrown for any non-2xx response (or a network failure). */
export class ApiError extends Error {
  status: number
  /** Field-level validation errors keyed by field name, when present. */
  fieldErrors?: Record<string, string>

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  /** Bearer access token for protected endpoints. */
  token?: string | null
  signal?: AbortSignal
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, signal } = options

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers['Authorization'] = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
      // Send/receive the httpOnly refresh cookie on auth endpoints.
      credentials: 'include',
    })
  } catch {
    throw new ApiError(
      'Unable to reach the server. Please check your connection and try again.',
      0,
    )
  }

  // Some endpoints (logout) may return an empty body.
  let envelope: ApiEnvelope<T> | null = null
  const text = await res.text()
  if (text) {
    try {
      envelope = JSON.parse(text) as ApiEnvelope<T>
    } catch {
      envelope = null
    }
  }

  if (!res.ok || (envelope && envelope.success === false)) {
    const message =
      envelope?.message ||
      (res.status === 401
        ? 'Invalid email or password.'
        : 'Something went wrong. Please try again.')
    throw new ApiError(message, res.status, envelope?.errors ?? undefined)
  }

  return (envelope?.data as T) ?? (undefined as T)
}
