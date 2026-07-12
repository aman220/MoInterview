'use client'

import { useEffect, useState } from 'react'
import { getMe, saveSession } from '@/lib/auth'
import { toast } from 'sonner'

const AI_GRAD = 'linear-gradient(115deg, #a87b4a 0%, #c89968 30%, #bd8f9d 64%, #8e93c4 100%)'

/**
 * Landing page for the backend's social-login redirect. The backend puts the
 * freshly issued tokens in the URL fragment (never sent to the server), so we
 * read them here, resolve the user, persist the session, and go home.
 */
export default function OAuthCallbackPage() {
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      const accessToken = hash.get('accessToken')
      const refreshToken = hash.get('refreshToken')
      const hashError = hash.get('error')

      // Scrub the fragment from the address bar / history immediately.
      history.replaceState(null, '', window.location.pathname)

      if (hashError) {
        setError(hashError)
        toast.error(hashError)
        setTimeout(() => { window.location.href = '/login' }, 1800)
        return
      }
      if (!accessToken || !refreshToken) {
        setError('Sign-in did not complete. Please try again.')
        setTimeout(() => { window.location.href = '/login' }, 1800)
        return
      }

      try {
        const user = await getMe(accessToken)
        saveSession({ accessToken, refreshToken, tokenType: 'Bearer', expiresIn: 900, user })
        toast.success(`Welcome, ${user.firstName}!`)
        window.location.href = '/'
      } catch {
        setError('Could not load your account. Please sign in again.')
        toast.error('Could not complete sign-in.')
        setTimeout(() => { window.location.href = '/login' }, 1800)
      }
    }
    run()
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--background)', padding: 24 }}>
      <style>{`@keyframes mo-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ textAlign: 'center' }}>
        <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', margin: '0 auto 20px', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 18, color: '#fff', background: AI_GRAD }}>M</span>
        {error ? (
          <>
            <p style={{ fontSize: 15, fontWeight: 400, color: 'var(--foreground)', marginBottom: 6 }}>{error}</p>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--muted-foreground)' }}>Redirecting you to sign in…</p>
          </>
        ) : (
          <>
            <div style={{ width: 22, height: 22, margin: '0 auto 16px', border: '2px solid var(--border-strong)', borderTopColor: 'var(--accent-deep)', borderRadius: '50%', animation: 'mo-spin 0.7s linear infinite' }} />
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--muted-foreground)' }}>Completing sign-in…</p>
          </>
        )}
      </div>
    </div>
  )
}
