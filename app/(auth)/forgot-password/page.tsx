'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Mail, Eye, EyeOff, Check } from 'lucide-react'
import { forgotPassword, resetPassword } from '@/lib/auth'
import { ApiError } from '@/lib/api'

const AI_GRAD = 'linear-gradient(115deg, #a87b4a 0%, #c89968 30%, #bd8f9d 64%, #8e93c4 100%)'

type Stage = 'request' | 'reset' | 'done'

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<Stage>('request')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('mo-theme') === 'dark') applyDark(true)
    } catch {}
  }, [])

  function applyDark(val: boolean) {
    setDark(val)
    document.documentElement.classList.toggle('dark', val)
    try { localStorage.setItem('mo-theme', val ? 'dark' : 'light') } catch {}
  }

  const pwReqs = [
    { key: 'len',   label: '8+ characters', met: password.length >= 8 },
    { key: 'upper', label: 'One uppercase', met: /[A-Z]/.test(password) },
    { key: 'num',   label: 'One number',    met: /[0-9]/.test(password) },
    { key: 'spec',  label: 'One symbol',    met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]
  const pwOk = pwReqs.every(r => r.met)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) return setError('Please enter your email address.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError('Please enter a valid email address.')

    setLoading(true)
    try {
      await forgotPassword(email.trim())
      setStage('reset')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.trim().length !== 6) return setError('Enter the 6-digit code we sent you.')
    if (!pwOk) return setError('Please choose a stronger password.')
    if (password !== confirmPassword) return setError('Passwords do not match.')

    setLoading(true)
    try {
      await resetPassword({ email: email.trim(), code: code.trim(), newPassword: password })
      setStage('done')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setLoading(true)
    try {
      await forgotPassword(email.trim())
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: '100vh' }}
      className="fp-shell">
      <style>{`
        @media (max-width: 940px) {
          .fp-shell  { grid-template-columns: 1fr !important; }
          .fp-aside  { display: none !important; }
          .fp-mobile-brand { display: flex !important; }
        }
        @keyframes mo-fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes mo-spin { to { transform: rotate(360deg); } }
        .mo-spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.35); border-top-color:#fff; border-radius:50%; animation: mo-spin 0.7s linear infinite; }
        .fp-input:focus { border-color: var(--accent-deep) !important; box-shadow: 0 0 0 3px rgba(168,123,74,0.14); }
        .fp-input::placeholder { color: var(--muted-foreground); opacity: 0.7; }
        .fp-submit:not(:disabled):hover { background: var(--accent-deep) !important; color: #fff !important; }
        .fp-back-btn:hover { color: var(--foreground) !important; }
      `}</style>

      {/* LEFT — Brand panel */}
      <aside className="fp-aside" style={{
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
        <Link href="/" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
          <span style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 15, color: '#fff', background: AI_GRAD }}>M</span>
          <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.24em', fontWeight: 400 }}>MoInterview</span>
        </Link>

        {/* Mid */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 500, color: '#d4b896' }}>
            Account recovery
          </div>
          <h2 style={{ fontSize: 'clamp(34px,3.6vw,50px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '22px 0 20px' }}>
            Back in<br />
            <span style={{ background: 'linear-gradient(115deg, #d4b896, #cf9fae 55%, #a3a7d6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              60 seconds.
            </span>
          </h2>
          <p style={{ fontWeight: 300, fontSize: 16, color: 'rgba(250,249,247,0.72)', maxWidth: 420 }}>
            Enter the email tied to your account and we&apos;ll send a 6-digit reset code. Your progress, sessions, and AI reports are all safe.
          </p>

          {/* Steps */}
          <div style={{ marginTop: 38, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { n: '01', title: 'Enter your email', desc: 'The one you used to create your account.' },
              { n: '02', title: 'Check your inbox', desc: 'A 6-digit code arrives within a minute.' },
              { n: '03', title: 'Set a new password', desc: 'Choose something strong and get back in.' },
            ].map(step => (
              <div key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: '#c89968', marginTop: 2, flexShrink: 0 }}>{step.n}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: 'rgba(250,249,247,0.9)' }}>{step.title}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(250,249,247,0.5)', marginTop: 2 }}>{step.desc}</div>
                </div>
              </div>
            ))}
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
          <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted-foreground)', textDecoration: 'none', transition: 'color 0.2s' }}
            className="fp-back-btn">
            <ArrowLeft size={13} strokeWidth={1.6} />
            Back to sign in
          </Link>

          {/* Mobile brand */}
          <div className="fp-mobile-brand" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 13, color: '#fff', background: AI_GRAD }}>M</span>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--foreground)' }}>MoInterview</span>
          </div>

          {/* Theme toggle */}
          <button onClick={() => applyDark(!dark)} aria-label="Toggle theme"
            style={{ width: 38, height: 38, border: '1px solid var(--border-strong)', background: 'var(--card)', display: 'grid', placeItems: 'center', color: 'var(--muted-foreground)', cursor: 'pointer', transition: 'all 0.2s' }}
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

            {/* Error */}
            {error && stage !== 'done' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(193,75,75,0.08)', border: '1px solid rgba(193,75,75,0.3)', color: '#c14b4b', fontSize: 12.5, padding: '11px 14px', marginBottom: 18, animation: 'mo-fade 0.3s ease' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {stage === 'done' ? (
              /* ── Reset complete ── */
              <div style={{ animation: 'mo-fade 0.4s ease' }}>
                <div style={{ width: 64, height: 64, marginBottom: 28, borderRadius: '50%', background: '#5fae7e', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h1 style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 12 }}>Password updated</h1>
                <p style={{ fontWeight: 300, fontSize: 14.5, color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: 32 }}>
                  Your password has been reset. You can now sign in with your new password.
                </p>
                <Link href="/login"
                  style={{ width: '100%', border: 'none', background: 'var(--foreground)', color: 'var(--background)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.16em', padding: 15, cursor: 'pointer', transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, textDecoration: 'none', boxSizing: 'border-box' }}
                  className="fp-submit">
                  <span>Continue to sign in</span>
                  <ArrowRight size={15} strokeWidth={1.8} />
                </Link>
              </div>
            ) : stage === 'reset' ? (
              /* ── Enter code + new password ── */
              <div style={{ animation: 'mo-fade 0.4s ease' }}>
                <div style={{ width: 64, height: 64, marginBottom: 28, border: '1px solid var(--border)', background: 'var(--muted)', display: 'grid', placeItems: 'center', color: 'var(--accent-deep)' }}>
                  <Mail size={28} strokeWidth={1.4} />
                </div>

                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted-foreground)', marginBottom: 18 }}>
                  Step 02 / 02 — Reset
                </div>

                <h1 style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 12 }}>Enter your code</h1>
                <p style={{ fontWeight: 300, fontSize: 14.5, color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: 28 }}>
                  We sent a 6-digit code to{' '}
                  <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{email}</strong>.
                  {' '}Enter it below and choose a new password.
                </p>

                <form onSubmit={handleReset} noValidate>
                  {/* Code */}
                  <div style={{ marginBottom: 18 }}>
                    <label htmlFor="code" style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                      6-digit code
                    </label>
                    <input
                      id="code" type="text" inputMode="numeric" maxLength={6} placeholder="000000"
                      value={code}
                      onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError('') }}
                      autoFocus
                      className="fp-input"
                      style={{ width: '100%', padding: '13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 20, letterSpacing: '0.4em', textAlign: 'center', fontFamily: 'IBM Plex Mono, monospace', outline: 'none', transition: 'all 0.2s' }}
                    />
                  </div>

                  {/* New password */}
                  <div style={{ marginBottom: 18 }}>
                    <label htmlFor="password" style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                      New password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError('') }}
                        autoComplete="new-password"
                        className="fp-input"
                        style={{ width: '100%', padding: '13px 44px 13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s' }}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password"
                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', display: 'grid', placeItems: 'center' }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Requirements */}
                    {password && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 14px', marginTop: 12 }}>
                        {pwReqs.map(r => (
                          <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, fontWeight: 300, color: r.met ? 'var(--foreground)' : 'var(--muted-foreground)', transition: 'color 0.2s' }}>
                            <span style={{ width: 15, height: 15, borderRadius: '50%', border: `1px solid ${r.met ? 'transparent' : 'var(--border-strong)'}`, background: r.met ? '#5fae7e' : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                              {r.met && <Check size={9} color="#fff" strokeWidth={3} />}
                            </span>
                            {r.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div style={{ marginBottom: 26 }}>
                    <label htmlFor="confirm" style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                      Confirm password
                    </label>
                    <input
                      id="confirm" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setError('') }}
                      autoComplete="new-password"
                      className="fp-input"
                      style={{ width: '100%', padding: '13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="fp-submit"
                    style={{ width: '100%', border: 'none', background: 'var(--foreground)', color: 'var(--background)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.16em', padding: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.45 : 1, transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
                    {loading ? (
                      <span className="mo-spinner" />
                    ) : (
                      <>
                        <span>Reset password</span>
                        <ArrowRight size={15} strokeWidth={1.8} />
                      </>
                    )}
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12.5, fontWeight: 300, color: 'var(--muted-foreground)' }}>
                  Didn&apos;t get a code?{' '}
                  <button type="button" onClick={handleResend} disabled={loading}
                    style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--accent-deep)', fontSize: 12.5 }}
                    className="hover:[color:var(--foreground)] transition-smooth">
                    Resend
                  </button>
                  {' · '}
                  <button type="button" onClick={() => { setStage('request'); setError(''); setCode('') }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-deep)', fontSize: 12.5 }}
                    className="hover:[color:var(--foreground)] transition-smooth">
                    Use a different email
                  </button>
                </div>
              </div>
            ) : (
              /* ── Email entry form ── */
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-deep)' }}>
                    <i style={{ width: 6, height: 6, borderRadius: '50%', background: '#c89968', boxShadow: '0 0 0 3px rgba(200,153,104,0.2)', display: 'inline-block' }} />
                    Password reset
                  </span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--muted-foreground)' }}>
                    Step 01 / 02
                  </span>
                </div>

                <h1 style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 8 }}>Forgot your password?</h1>
                <p style={{ fontWeight: 300, fontSize: 14.5, color: 'var(--muted-foreground)', marginBottom: 32 }}>
                  No problem. Enter your email and we&apos;ll send a reset code right away.
                </p>

                <form onSubmit={handleRequest} noValidate>
                  <div style={{ marginBottom: 26 }}>
                    <label htmlFor="email" style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                      Email address
                    </label>
                    <input
                      id="email" type="email" placeholder="you@example.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      autoComplete="email" autoFocus
                      className="fp-input"
                      style={{ width: '100%', padding: '13px 14px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--foreground)', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="fp-submit"
                    style={{ width: '100%', border: 'none', background: 'var(--foreground)', color: 'var(--background)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.16em', padding: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.45 : 1, transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
                    {loading ? (
                      <span className="mo-spinner" />
                    ) : (
                      <>
                        <span>Send reset code</span>
                        <ArrowRight size={15} strokeWidth={1.8} />
                      </>
                    )}
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)', fontSize: 13, fontWeight: 300, color: 'var(--muted-foreground)' }}>
                  Remembered it?{' '}
                  <Link href="/login" style={{ color: 'var(--accent-deep)', textDecoration: 'none' }} className="hover:[color:var(--foreground)] transition-smooth">
                    Back to sign in
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
