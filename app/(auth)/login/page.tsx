'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { login, saveSession, oauthAuthorizeUrl } from '@/lib/auth'
import { ApiError } from '@/lib/api'
import { toast } from 'sonner'

const AI_GRAD = 'linear-gradient(115deg, #a87b4a 0%, #c89968 30%, #bd8f9d 64%, #8e93c4 100%)'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mo-theme')
      if (saved === 'dark') applyDark(true)
    } catch {}

    // Surface OAuth failures redirected back as ?error=...
    const params = new URLSearchParams(window.location.search)
    const oauthError = params.get('error')
    if (oauthError) {
      setError(oauthError)
      toast.error(oauthError)
      history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  function applyDark(val: boolean) {
    setDark(val)
    document.documentElement.classList.toggle('dark', val)
    try { localStorage.setItem('mo-theme', val ? 'dark' : 'light') } catch {}
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) return setError('Please fill in all fields.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError('Please enter a valid email address.')

    setLoading(true)
    try {
      const auth = await login({ email: email.trim(), password })
      saveSession(auth)
      setSuccess(true)
      toast.success(`Welcome back, ${auth.user.firstName}!`)
      // Candidates verify their email first; interviewers pass through onboarding,
      // which sends them on to the dashboard if they've already completed it.
      let destination = '/'
      if (auth.user.role === 'CANDIDATE' && !auth.user.emailVerified) {
        destination = '/verify-email'
      } else if (auth.user.role === 'INTERVIEWER') {
        destination = '/interviewer-onboarding'
      }
      setTimeout(() => { window.location.href = destination }, 1000)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Invalid email or password. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: '100vh' }}
      className="login-shell">
      <style>{`
        @media (max-width: 940px) {
          .login-shell { grid-template-columns: 1fr !important; }
          .login-aside  { display: none !important; }
          .login-mobile-brand { display: flex !important; }
        }
        @keyframes mo-fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes mo-spin { to { transform: rotate(360deg); } }
        .mo-spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.35); border-top-color:#fff; border-radius:50%; animation: mo-spin 0.7s linear infinite; }
        .login-input:focus { border-color: var(--accent-deep) !important; box-shadow: 0 0 0 3px rgba(168,123,74,0.14); }
        .login-input::placeholder { color: var(--muted-foreground); opacity: 0.7; }
        .login-submit:not(:disabled):hover { background: var(--accent-deep) !important; color: #fff !important; }
        .login-social:hover { border-color: var(--foreground) !important; background: var(--muted) !important; }
      `}</style>

      {/* LEFT — Brand / Social Proof */}
      <aside className="login-aside" style={{
        position: 'relative',
        background: '#14100c',
        color: '#faf9f7',
        padding: 'clamp(32px,4vw,56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: AI_GRAD, opacity: 0.16, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 560, height: 560, right: -200, top: -160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(189,143,157,0.34), transparent 62%)', filter: 'blur(8px)', pointerEvents: 'none' }} />

        {/* Brand */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 15, color: '#fff', background: AI_GRAD }}>M</span>
          <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.24em', fontWeight: 400 }}>MoInterview</span>
        </div>

        {/* Mid */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 500, color: '#d4b896' }}>
            Welcome back
          </div>
          <h2 style={{ fontSize: 'clamp(34px,3.6vw,50px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '22px 0 20px' }}>
            Your next session<br />
            <span style={{ background: 'linear-gradient(115deg, #d4b896, #cf9fae 55%, #a3a7d6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              starts here.
            </span>
          </h2>
          <p style={{ fontWeight: 300, fontSize: 16, color: 'rgba(250,249,247,0.72)', maxWidth: 420 }}>
            Pick up where you left off — review your AI reports, book your next mock, and keep closing the gap to your dream offer.
          </p>

          <div style={{ marginTop: 38, borderLeft: '2px solid #c89968', paddingLeft: 22 }}>
            <p style={{ fontWeight: 300, fontSize: 16.5, lineHeight: 1.55, color: 'rgba(250,249,247,0.92)' }}>
              &ldquo;I came back every week leading up to my onsite. Watching my AI scores climb session over session was the confidence I needed walking in.&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#34A853', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontSize: 13 }}>AR</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Aisha Rahman</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,249,247,0.55)', marginTop: 2 }}>New Grad → Stripe</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 38 }}>
            {[{ v: '12k+', k: 'Mock interviews' }, { v: '4.9', k: 'Avg. coach rating' }, { v: '3×', k: 'More offers' }].map(s => (
              <div key={s.k}>
                <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.02em' }}>
                  <span style={{ background: AI_GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.v}</span>
                </div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(250,249,247,0.5)', marginTop: 6 }}>{s.k}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, flexWrap: 'wrap' }}>
            {['Google', 'Meta', 'Amazon', 'Stripe', 'Netflix'].map(c => (
              <span key={c} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(250,249,247,0.42)' }}>{c}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* RIGHT — Form */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--background)' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px clamp(20px,3vw,40px)' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted-foreground)', textDecoration: 'none', transition: 'color 0.2s' }}
            className="hover:[color:var(--foreground)]">
            <ArrowLeft size={13} strokeWidth={1.6} />
            Back to home
          </Link>

          {/* Mobile brand */}
          <div className="login-mobile-brand" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 13, color: '#fff', background: AI_GRAD }}>M</span>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--foreground)' }}>MoInterview</span>
          </div>

          {/* Theme toggle */}
          <button onClick={() => applyDark(!dark)} aria-label="Toggle theme" style={{ width: 38, height: 38, border: '1px solid var(--border-strong)', background: 'var(--card)', display: 'grid', placeItems: 'center', color: 'var(--muted-foreground)', cursor: 'pointer', transition: 'all 0.2s' }}
            className="hover:[border-color:var(--foreground)] hover:[color:var(--foreground)]">
            {dark ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px clamp(20px,3vw,40px) 48px' }}>
          <div style={{ width: '100%', maxWidth: 416 }}>

            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'mo-fade 0.4s ease' }}>
                <div style={{ width: 64, height: 64, margin: '0 auto 22px', borderRadius: '50%', background: '#5fae7e', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h1 style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 8 }}>You&rsquo;re in</h1>
                <p style={{ fontWeight: 300, color: 'var(--muted-foreground)', fontSize: 14.5 }}>
                  Signed in as <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{email}</strong>.<br />
                  Taking you home…
                </p>
              </div>
            ) : (
              <>
                {/* Step meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-deep)' }}>
                    <i style={{ width: 6, height: 6, borderRadius: '50%', background: '#5fae7e', boxShadow: '0 0 0 3px rgba(95,174,126,0.18)', display: 'inline-block' }} />
                    Sign in
                  </span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted-foreground)' }}>
                    Member access
                  </span>
                </div>

                <h1 style={{ fontSize: 38, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 8 }}>Welcome back</h1>
                <p style={{ fontWeight: 300, fontSize: 14.5, color: 'var(--muted-foreground)', marginBottom: 32 }}>
                  Sign in to pick up your interview prep where you left off.
                </p>

                {/* Error */}
                {error && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(193,75,75,0.08)', border: '1px solid rgba(193,75,75,0.3)', color: '#c14b4b', fontSize: 12.5, padding: '11px 14px', marginBottom: 18, animation: 'mo-fade 0.3s ease' }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Email */}
                  <div style={{ marginBottom: 18 }}>
                    <label htmlFor="email" style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                      Email address
                    </label>
                    <input
                      id="email" type="email" placeholder="you@example.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      autoComplete="email"
                      className="login-input"
                      style={{ width: '100%', padding: '13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s' }}
                    />
                  </div>

                  {/* Password */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label htmlFor="password" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)' }}>
                        Password
                      </label>
                      <Link href="/forgot-password" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-deep)', textDecoration: 'none', transition: 'color 0.2s' }}
                        className="hover:[color:var(--foreground)]">
                        Forgot password?
                      </Link>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError('') }}
                        autoComplete="current-password"
                        className="login-input"
                        style={{ width: '100%', padding: '13px 44px 13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s' }}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password"
                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', display: 'grid', placeItems: 'center', transition: 'color 0.2s' }}
                        className="hover:[color:var(--foreground)]">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0 4px' }}>
                    <label
                      style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}
                      onClick={e => { e.preventDefault(); setRememberMe(v => !v) }}>
                      <span style={{ width: 18, height: 18, border: `1.5px solid ${rememberMe ? 'var(--accent-deep)' : 'var(--border-strong)'}`, background: rememberMe ? 'var(--accent-deep)' : 'var(--input)', flexShrink: 0, display: 'grid', placeItems: 'center', transition: 'all 0.2s' }}>
                        {rememberMe && <Check size={11} color="#fff" strokeWidth={3} />}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 300, color: 'var(--muted-foreground)' }}>
                        Remember me for 30 days
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="login-submit"
                    style={{ width: '100%', border: 'none', background: 'var(--foreground)', color: 'var(--background)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.16em', padding: 15, marginTop: 26, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.45 : 1, transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
                    {loading ? (
                      <span className="mo-spinner" />
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight size={15} strokeWidth={1.8} />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '26px 0' }}>
                  <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted-foreground)' }}>or continue with</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                {/* Social */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    {
                      label: 'Google',
                      provider: 'google' as const,
                      icon: (
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 01-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.9z"/>
                          <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0012 23z"/>
                          <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 010-4.2V7.3H2.3a11 11 0 000 9.8L6 14.3z"/>
                          <path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0012 1 11 11 0 002.3 7.3L6 10.1c.9-2.6 3.2-4.7 6-4.7z"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'GitHub',
                      provider: 'github' as const,
                      icon: (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.8 9.8.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 014.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.3 6.8-9.8C22 6.6 17.5 2 12 2z"/>
                        </svg>
                      ),
                    },
                  ].map(s => (
                    <button key={s.label} type="button" className="login-social"
                      onClick={() => { window.location.href = oauthAuthorizeUrl(s.provider) }}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, border: '1px solid var(--border-strong)', background: 'var(--card)', padding: 13, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--foreground)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      {s.icon}
                      {s.label}
                    </button>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)', fontSize: 13, fontWeight: 300, color: 'var(--muted-foreground)' }}>
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" style={{ color: 'var(--accent-deep)', textDecoration: 'none' }} className="hover:[color:var(--foreground)] transition-smooth">
                    Create one
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
