'use client'

import { useCallback, useEffect, useState } from 'react'
import { AUTH_EVENT, getCurrentUser, signOut, type UserSummary } from '@/lib/auth'

/**
 * Reactive access to the current session. Reads from localStorage on mount and
 * re-reads whenever the session changes (same tab via the AUTH_EVENT, other
 * tabs via the native `storage` event).
 *
 * `hydrated` guards against SSR/first-paint mismatch — render auth-dependent UI
 * only once it is true.
 */
export function useAuth() {
  const [user, setUser] = useState<UserSummary | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const sync = () => setUser(getCurrentUser())
    sync()
    setHydrated(true)

    window.addEventListener(AUTH_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(AUTH_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const logout = useCallback(async () => {
    await signOut()
  }, [])

  return { user, hydrated, isAuthenticated: !!user, logout }
}
