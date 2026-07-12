'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { verifyOtp, sendOtp, getCurrentUser, getMe, saveUser, signOut } from '@/lib/auth'
import { ApiError } from '@/lib/api'

const AI_GRAD = 'linear-gradient(115deg, #a87b4a 0%, #c89968 30%, #bd8f9d 64%, #8e93c4 100%)'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('mo-theme') === 'dark') applyDark(true)
    } catch {}

    const user = getCurrentUser()
    if (!user) {
      // Not signed in — nothing to verify here.
      window.location.href = '/login'
      return
    }
    if (user.emailVerified) {
      // Already verified — no need for this step.
      window.location.href = '/'
      return
    }
    setEmail(user.email)
    setReady(true)
  }, [])

  function applyDark(val: boolean) {
    setDark(val)
    document.documentElement.classList.toggle('dark', val)
    try { localStorage.setItem('mo-theme', val ? 'dark' : 'light') } catch {}
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.trim().length !== 6) return setError('Enter the 6-digit code we sent you.')

    setLoading(true)
    try {
      await verifyOtp(email.trim(), code.trim())
      // Reflect the verified state in the stored session so guards don't re-trigger.
      try {
        const fresh = await getMe()
        saveUser(fresh)
      } catch {
        const u = getCurrentUser()
        if (u) saveUser({ ...u, emailVerified: true })
      }
      toast.success('Email verified!', { description: 'Welcome to MoInterview.' })
      setTimeout(() => { window.location.href = '/' }, 900)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Verification failed. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setLoading(true)
    try {
      await sendOtp(email.trim())
      toast.success('Code resent', { description: `A new code is on its way to ${email}` })
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Could not resend the code. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  // Avoid flashing the form before we know the user should be here (redirects run in the effect).
  if (!ready) {
    return <div style={{ minHeight: '100vh', background: 'var(--background)' }} />
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: '100vh' }} className="ve-shell">
      <style>{`
        @media (max-width: 940px) {
          .ve-shell { grid-template-columns: 1fr !important; }
          .ve-aside { display: none !important; }
          .ve-mobile-brand { display: flex !important; }
        }
        @keyframes mo-fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes mo-spin { to { transform: rotate(360deg); } }
        .mo-spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.35); border-top-color:#fff; border-radius:50%; animation: mo-spin 0.7s linear infinite; }
        .ve-input:focus { border-color: var(--accent-deep) !important; box-shadow: 0 0 0 3px rgba(168,123,74,0.14); }
        .ve-submit:not(:disabled):hover { background: var(--accent-deep) !important; color: #fff !important; }
      `}</style>

      {/* LEFT — Brand panel */}
      <aside className="ve-aside" style={{
        position: 'relative', background: '#14100c', color: '#faf9f7',
        padding: 'clamp(32px,4vw,56px)', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: AI_GRAD, opacity: 0.16, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 560, height: 560, right: -200, top: -160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(189,143,157,0.34), transparent 62%)', filter: 'blur(8px)', pointerEvents: 'none' }} />

        <Link href="/" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
          <span style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 15, color: '#fff', background: AI_GRAD }}>M</span>
          <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.24em', fontWeight: 400 }}>MoInterview</span>
        </Link>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 500, color: '#d4b896' }}>
            One last step
          </div>
          <h2 style={{ fontSize: 'clamp(34px,3.6vw,50px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '22px 0 20px' }}>
            Confirm it&rsquo;s<br />
            <span style={{ background: 'linear-gradient(115deg, #d4b896, #cf9fae 55%, #a3a7d6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              really you.
            </span>
          </h2>
          <p style={{ fontWeight: 300, fontSize: 16, color: 'rgba(250,249,247,0.72)', maxWidth: 420 }}>
            We sent a 6-digit code to your email. Enter it to verify your account and unlock your dashboard, bookings, and AI reports.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          {['Google', 'Meta', 'Amazon', 'Stripe', 'Netflix'].map(c => (
            <span key={c} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(250,249,247,0.42)' }}>{c}</span>
          ))}
        </div>
      </aside>

      {/* RIGHT — Form */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--background)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px clamp(20px,3vw,40px)' }}>
          <button onClick={handleSignOut} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer' }}
            className="hover:[color:var(--foreground)]">
            <ArrowLeft size={13} strokeWidth={1.6} />
            Sign out
          </button>

          <div className="ve-mobile-brand" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 13, color: '#fff', background: AI_GRAD }}>M</span>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--foreground)' }}>MoInterview</span>
          </div>

          <button onClick={() => applyDark(!dark)} aria-label="Toggle theme"
            style={{ width: 38, height: 38, border: '1px solid var(--border-strong)', background: 'var(--card)', display: 'grid', placeItems: 'center', color: 'var(--muted-foreground)', cursor: 'pointer' }}
            className="hover:[border-color:var(--foreground)] hover:[color:var(--foreground)]">
            {dark ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>
            )}
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px clamp(20px,3vw,40px) 48px' }}>
          <div style={{ width: '100%', maxWidth: 416 }}>
            <div style={{ width: 64, height: 64, marginBottom: 28, border: '1px solid var(--border)', background: 'var(--muted)', display: 'grid', placeItems: 'center', color: 'var(--accent-deep)' }}>
              <Mail size={28} strokeWidth={1.4} />
            </div>

            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted-foreground)', marginBottom: 18 }}>
              Verify your email
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 12 }}>Check your inbox</h1>
            <p style={{ fontWeight: 300, fontSize: 14.5, color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: 28 }}>
              We sent a 6-digit code to{' '}
              <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{email}</strong>.
              {' '}Enter it below to activate your account.
            </p>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(193,75,75,0.08)', border: '1px solid rgba(193,75,75,0.3)', color: '#c14b4b', fontSize: 12.5, padding: '11px 14px', marginBottom: 18, animation: 'mo-fade 0.3s ease' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleVerify} noValidate>
              <div style={{ marginBottom: 26 }}>
                <label htmlFor="code" style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                  6-digit code
                </label>
                <input
                  id="code" type="text" inputMode="numeric" maxLength={6} placeholder="000000"
                  value={code}
                  onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError('') }}
                  autoFocus
                  className="ve-input"
                  style={{ width: '100%', padding: '13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 20, letterSpacing: '0.4em', textAlign: 'center', fontFamily: 'IBM Plex Mono, monospace', outline: 'none', transition: 'all 0.2s' }}
                />
              </div>

              <button
                type="submit" disabled={loading} className="ve-submit"
                style={{ width: '100%', border: 'none', background: 'var(--foreground)', color: 'var(--background)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.16em', padding: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.45 : 1, transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
                {loading ? <span className="mo-spinner" /> : (<><span>Verify email</span><ArrowRight size={15} strokeWidth={1.8} /></>)}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12.5, fontWeight: 300, color: 'var(--muted-foreground)' }}>
              Didn&apos;t get a code?{' '}
              <button type="button" onClick={handleResend} disabled={loading}
                style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--accent-deep)', fontSize: 12.5 }}
                className="hover:[color:var(--foreground)] transition-smooth">
                Resend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
