'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { register, saveSession, oauthAuthorizeUrl } from '@/lib/auth'
import { ApiError } from '@/lib/api'
import { toast } from 'sonner'

const AI_GRAD = 'linear-gradient(115deg, #a87b4a 0%, #c89968 30%, #bd8f9d 64%, #8e93c4 100%)'

export default function SignupPage() {
  const [step, setStep] = useState<'role' | 'form'>('role')
  const [role, setRole] = useState<'candidate' | 'interviewer' | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [dark, setDark] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mo-theme')
      if (saved === 'dark') applyDark(true)
    } catch {}
  }, [])

  function applyDark(val: boolean) {
    setDark(val)
    document.documentElement.classList.toggle('dark', val)
    try { localStorage.setItem('mo-theme', val ? 'dark' : 'light') } catch {}
  }

  // These must match the backend's password policy exactly (RegisterRequest):
  // 8+ chars, an uppercase letter, a number, and a symbol from the set below.
  const pwReqs = [
    { key: 'len',   label: '8+ characters',  met: formData.password.length >= 8 },
    { key: 'upper', label: 'One uppercase',   met: /[A-Z]/.test(formData.password) },
    { key: 'num',   label: 'One number',      met: /[0-9]/.test(formData.password) },
    { key: 'spec',  label: 'One symbol',      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ]
  const pwScore = pwReqs.filter(r => r.met).length
  const pwValid = pwReqs.every(r => r.met)
  const meterColors = ['', '#c14b4b', '#c08a3e', '#c89968', '#5fae7e']

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    pwValid &&
    formData.confirmPassword &&
    formData.agree

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return setError('Please fill in all fields.')
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      return setError('Please enter a valid email address.')
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.')
    }
    if (!pwValid) {
      return setError('Password needs 8+ characters, an uppercase letter, a number, and a symbol.')
    }
    if (!formData.agree) {
      return setError('Please accept the terms to continue.')
    }
    setLoading(true)
    try {
      const auth = await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: role === 'interviewer' ? 'INTERVIEWER' : 'CANDIDATE',
      })
      saveSession(auth)
      setSuccess(true)
      if (role === 'interviewer') {
        toast.success('Account created!', { description: "Let's set up your coach profile." })
      } else {
        toast.success('Account created!', { description: 'Check your email for a verification code.' })
      }
      setTimeout(() => {
        // Interviewers verify their email inside onboarding; candidates verify first.
        window.location.href = role === 'interviewer' ? '/interviewer-onboarding' : '/verify-email'
      }, 1200)
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : 'An error occurred during signup. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const roleIcons: Record<string, React.ReactNode> = {
    candidate: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 14a4 4 0 100-8 4 4 0 000 8z"/>
        <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
      </svg>
    ),
    interviewer: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1"/>
        <path d="M9 13l2 2 4-4"/>
      </svg>
    ),
  }

  const roleNames: Record<string, string> = {
    candidate: 'Candidate',
    interviewer: 'Coach / Interviewer',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: '100vh' }}
      className="signup-shell">
      <style>{`
        @media (max-width: 940px) {
          .signup-shell { grid-template-columns: 1fr !important; }
          .signup-aside { display: none !important; }
          .signup-mobile-brand { display: flex !important; }
        }
        @keyframes mo-fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .mo-step { display: none; }
        .mo-step.active { display: block; animation: mo-fade 0.4s ease; }
        @keyframes mo-spin { to { transform: rotate(360deg); } }
        .mo-spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.35); border-top-color:#fff; border-radius:50%; animation: mo-spin 0.7s linear infinite; }
      `}</style>

      {/* LEFT — Brand / Social Proof */}
      <aside className="signup-aside" style={{
        position: 'relative',
        background: '#14100c',
        color: '#faf9f7',
        padding: 'clamp(32px,4vw,56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: AI_GRAD,
          opacity: 0.16, mixBlendMode: 'screen', pointerEvents: 'none',
        }} />
        {/* radial glow */}
        <div style={{
          position: 'absolute', width: 560, height: 560,
          right: -200, top: -160, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(189,143,157,0.34), transparent 62%)',
          filter: 'blur(8px)', pointerEvents: 'none',
        }} />

        {/* Brand */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 34, height: 34, display: 'grid', placeItems: 'center',
            fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 15,
            color: '#fff', background: AI_GRAD,
          }}>M</span>
          <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.24em', fontWeight: 400 }}>
            MoInterview
          </span>
        </div>

        {/* Mid content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 500,
            color: '#d4b896',
          }}>Join the platform</div>

          <h2 style={{
            fontSize: 'clamp(34px,3.6vw,50px)', fontWeight: 300,
            letterSpacing: '-0.025em', lineHeight: 1.05,
            margin: '22px 0 20px',
          }}>
            Practice with real experts.<br />
            <span style={{
              background: 'linear-gradient(115deg, #d4b896, #cf9fae 55%, #a3a7d6)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>Perfected by AI.</span>
          </h2>

          <p style={{ fontWeight: 300, fontSize: 16, color: 'rgba(250,249,247,0.72)', maxWidth: 420 }}>
            Book mock interviews with engineers from the companies you&apos;re aiming for — then get an AI-scored report breaking down exactly where to improve.
          </p>

          {/* Quote */}
          <div style={{ marginTop: 38, borderLeft: '2px solid #c89968', paddingLeft: 22 }}>
            <p style={{ fontWeight: 300, fontSize: 16.5, lineHeight: 1.55, color: 'rgba(250,249,247,0.92)' }}>
              &ldquo;The feedback from an actual Googler — plus the AI report breaking down exactly where I lost points — was the difference. I walked into my onsite knowing what to fix.&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#4285F4', color: '#fff',
                display: 'grid', placeItems: 'center',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 13,
              }}>JM</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>James Mitchell</div>
                <div style={{
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: 'rgba(250,249,247,0.55)', marginTop: 2,
                }}>Software Engineer → Google</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 38 }}>
            {[
              { v: '12k+', k: 'Mock interviews' },
              { v: '4.9', k: 'Avg. coach rating' },
              { v: '3×', k: 'More offers' },
            ].map(s => (
              <div key={s.k}>
                <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.02em' }}>
                  <span style={{
                    background: AI_GRAD,
                    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  }}>{s.v}</span>
                </div>
                <div style={{
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5,
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  color: 'rgba(250,249,247,0.5)', marginTop: 6,
                }}>{s.k}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, flexWrap: 'wrap' }}>
            {['Google', 'Meta', 'Amazon', 'Stripe', 'Netflix'].map(c => (
              <span key={c} style={{
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 11,
                letterSpacing: '0.08em', color: 'rgba(250,249,247,0.42)',
              }}>{c}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* RIGHT — Form */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--background)' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '22px clamp(20px,3vw,40px)',
        }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            color: 'var(--muted-foreground)', textDecoration: 'none',
          }}
            className="hover:[color:var(--foreground)] transition-smooth">
            <ArrowLeft size={13} strokeWidth={1.6} />
            Back to home
          </Link>

          {/* Mobile brand */}
          <div className="signup-mobile-brand" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 28, height: 28, display: 'grid', placeItems: 'center',
              fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: 13,
              color: '#fff', background: AI_GRAD,
            }}>M</span>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--foreground)' }}>
              MoInterview
            </span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => applyDark(!dark)}
            aria-label="Toggle theme"
            style={{
              width: 38, height: 38,
              border: '1px solid var(--border-strong)',
              background: 'var(--card)',
              display: 'grid', placeItems: 'center',
              color: 'var(--muted-foreground)', cursor: 'pointer',
            }}
            className="hover:[border-color:var(--foreground)] hover:[color:var(--foreground)] transition-smooth">
            {dark ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Body */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '12px clamp(20px,3vw,40px) 48px',
        }}>
          <div style={{ width: '100%', maxWidth: 416 }}>

            {/* Step meta */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                textTransform: 'uppercase', letterSpacing: '0.16em',
                color: 'var(--muted-foreground)',
              }}>
                {step === 'role' ? 'Step 01 / 02 — Your role' : 'Step 02 / 02 — Your details'}
              </span>
              <span style={{ display: 'flex', gap: 6 }}>
                <i style={{ width: 26, height: 3, background: 'var(--accent-deep)', display: 'block' }} />
                <i style={{
                  width: 26, height: 3, display: 'block',
                  background: step === 'form' ? 'var(--accent-deep)' : 'var(--border-strong)',
                  transition: 'background 0.3s',
                }} />
              </span>
            </div>

            <h1 style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.025em', marginBottom: 8 }}>
              {step === 'role' ? 'Create your account' : 'A few quick details'}
            </h1>
            <p style={{ fontWeight: 300, fontSize: 14.5, color: 'var(--muted-foreground)', marginBottom: 30 }}>
              {step === 'role'
                ? "Choose how you'll use MoInterview to get started."
                : 'Set up your credentials and you’re in.'}
            </p>

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(193,75,75,0.08)', border: '1px solid rgba(193,75,75,0.3)',
                color: 'var(--danger, #c14b4b)', fontSize: 12.5,
                padding: '11px 14px', marginBottom: 18,
                animation: 'mo-fade 0.3s ease',
              }}>{error}</div>
            )}

            {/* ===== STEP 1 — ROLE ===== */}
            {step === 'role' && (
              <div className="mo-step active">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {([
                    {
                      id: 'candidate' as const,
                      title: 'Candidate',
                      tag: 'Free to join',
                      icon: (
                        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 14a4 4 0 100-8 4 4 0 000 8z"/>
                          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
                        </svg>
                      ),
                      features: [
                        'Practice with coaches from top companies',
                        'AI-scored report after every session',
                        'Track your progress over time',
                      ],
                    },
                    {
                      id: 'interviewer' as const,
                      title: 'Coach / Interviewer',
                      tag: 'Earn on your schedule',
                      icon: (
                        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
                          <rect x="8" y="2" width="8" height="4" rx="1"/>
                          <path d="M9 13l2 2 4-4"/>
                        </svg>
                      ),
                      features: [
                        'Set your own rates and availability',
                        'Help candidates land their dream roles',
                        'Build your coaching reputation',
                      ],
                    },
                  ]).map(r => {
                    const sel = role === r.id
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        style={{
                          position: 'relative', textAlign: 'left',
                          background: 'var(--card)',
                          border: `1px solid ${sel ? 'var(--accent-deep)' : 'var(--border)'}`,
                          padding: '20px 20px 20px 22px',
                          transition: 'all 0.22s', display: 'block', width: '100%',
                          color: 'var(--foreground)', cursor: 'pointer',
                          boxShadow: sel ? '0 1px 2px rgba(26,20,16,0.04), 0 18px 40px -20px rgba(26,20,16,0.18)' : 'none',
                        }}>
                        {/* left accent bar */}
                        <div style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
                          background: 'var(--accent-deep)',
                          opacity: sel ? 1 : 0, transition: 'opacity 0.22s',
                        }} />

                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <span style={{
                              width: 38, height: 38,
                              border: `1px solid ${sel ? 'var(--accent-deep)' : 'var(--border)'}`,
                              display: 'grid', placeItems: 'center',
                              color: sel ? '#fff' : 'var(--accent-deep)',
                              background: sel ? 'var(--accent-deep)' : 'transparent',
                              flexShrink: 0, transition: 'all 0.22s',
                            }}>{r.icon}</span>
                            <div>
                              <h3 style={{ fontSize: 19, fontWeight: 300, letterSpacing: '-0.025em' }}>{r.title}</h3>
                              <div style={{
                                fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5,
                                textTransform: 'uppercase', letterSpacing: '0.12em',
                                color: 'var(--accent-deep)', marginTop: 5,
                              }}>{r.tag}</div>
                            </div>
                          </div>
                          {/* radio */}
                          <span style={{
                            width: 20, height: 20, borderRadius: '50%',
                            border: `1.5px solid ${sel ? 'var(--accent-deep)' : 'var(--border-strong)'}`,
                            flexShrink: 0, display: 'grid', placeItems: 'center',
                            transition: 'all 0.22s',
                          }}>
                            <i style={{
                              width: 10, height: 10, borderRadius: '50%',
                              background: 'var(--accent-deep)',
                              transform: sel ? 'scale(1)' : 'scale(0)',
                              transition: 'transform 0.22s',
                              display: 'block',
                            }} />
                          </span>
                        </div>

                        <ul style={{ listStyle: 'none', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {r.features.map(f => (
                            <li key={f} style={{
                              display: 'flex', alignItems: 'center', gap: 9,
                              fontSize: 12.5, fontWeight: 300, color: 'var(--muted-foreground)',
                            }}>
                              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent-deep)" strokeWidth="2" style={{ flexShrink: 0 }}>
                                <path d="M20 6L9 17l-5-5"/>
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  })}
                </div>

                <div style={{ marginTop: 24 }}>
                  <button
                    type="button"
                    disabled={!role}
                    onClick={() => { setError(''); setStep('form') }}
                    style={{
                      width: '100%', border: 'none',
                      background: 'var(--foreground)', color: 'var(--background)',
                      fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5,
                      textTransform: 'uppercase', letterSpacing: '0.16em',
                      padding: 15, cursor: role ? 'pointer' : 'not-allowed',
                      opacity: role ? 1 : 0.45, transition: 'all 0.25s',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    }}
                    className="hover-continue">
                    <span>Continue</span>
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </button>
                </div>
                <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, fontWeight: 300, color: 'var(--muted-foreground)' }}>
                  Already have an account?{' '}
                  <Link href="/login" style={{ color: 'var(--accent-deep)' }} className="hover:[color:var(--foreground)] transition-smooth">Sign in</Link>
                </p>
              </div>
            )}

            {/* ===== STEP 2 — FORM ===== */}
            {step === 'form' && role && (
              <div className="mo-step active">
                {success ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{
                      width: 64, height: 64, margin: '0 auto 22px',
                      borderRadius: '50%', background: '#5fae7e',
                      display: 'grid', placeItems: 'center',
                    }}>
                      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2.4">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <p style={{ fontWeight: 300, color: 'var(--muted-foreground)', fontSize: 14.5 }}>
                      Account created as{' '}
                      <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{roleNames[role]}</strong>.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Role badge */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      background: 'var(--muted)', border: '1px solid var(--border)',
                      padding: '12px 14px', marginBottom: 22,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                        <span style={{
                          width: 30, height: 30, background: 'var(--accent-deep)',
                          color: '#fff', display: 'grid', placeItems: 'center',
                        }}>
                          {roleIcons[role]}
                        </span>
                        <div>
                          <div style={{
                            fontFamily: 'IBM Plex Mono, monospace', fontSize: 9,
                            textTransform: 'uppercase', letterSpacing: '0.12em',
                            color: 'var(--muted-foreground)',
                          }}>Signing up as</div>
                          <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 1 }}>{roleNames[role]}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setError(''); setStep('role') }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5,
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                          color: 'var(--accent-deep)',
                        }}
                        className="hover:[color:var(--foreground)] transition-smooth">
                        Change
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      {/* Name row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                        {[
                          { id: 'firstName', label: 'First name', placeholder: 'John', key: 'firstName' as const },
                          { id: 'lastName',  label: 'Last name',  placeholder: 'Doe',  key: 'lastName'  as const },
                        ].map(f => (
                          <div key={f.id}>
                            <label htmlFor={f.id} style={{
                              display: 'block',
                              fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                              textTransform: 'uppercase', letterSpacing: '0.12em',
                              color: 'var(--muted-foreground)', marginBottom: 8,
                            }}>{f.label}</label>
                            <input
                              id={f.id} type="text" placeholder={f.placeholder}
                              value={formData[f.key]}
                              onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                              autoComplete={f.key === 'firstName' ? 'given-name' : 'family-name'}
                              style={{
                                width: '100%', padding: '13px 14px',
                                border: '1px solid var(--border)',
                                background: 'var(--input)', color: 'var(--foreground)',
                                fontSize: 14, fontFamily: 'inherit',
                                outline: 'none', transition: 'all 0.2s',
                              }}
                              className="signup-input"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Email */}
                      <div style={{ marginBottom: 18 }}>
                        <label htmlFor="email" style={{
                          display: 'block',
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                          textTransform: 'uppercase', letterSpacing: '0.12em',
                          color: 'var(--muted-foreground)', marginBottom: 8,
                        }}>Email address</label>
                        <input
                          id="email" type="email" placeholder="you@example.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          autoComplete="email"
                          style={{
                            width: '100%', padding: '13px 14px',
                            border: '1px solid var(--border)',
                            background: 'var(--input)', color: 'var(--foreground)',
                            fontSize: 14, fontFamily: 'inherit',
                            outline: 'none', transition: 'all 0.2s',
                          }}
                          className="signup-input"
                        />
                      </div>

                      {/* Password */}
                      <div style={{ marginBottom: 18 }}>
                        <label htmlFor="password" style={{
                          display: 'block',
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                          textTransform: 'uppercase', letterSpacing: '0.12em',
                          color: 'var(--muted-foreground)', marginBottom: 8,
                        }}>Password</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            autoComplete="new-password"
                            style={{
                              width: '100%', padding: '13px 44px 13px 14px',
                              border: '1px solid var(--border)',
                              background: 'var(--input)', color: 'var(--foreground)',
                              fontSize: 14, fontFamily: 'inherit',
                              outline: 'none', transition: 'all 0.2s',
                            }}
                            className="signup-input"
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password"
                            style={{
                              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                              background: 'none', border: 'none', cursor: 'pointer',
                              color: 'var(--muted-foreground)', display: 'grid', placeItems: 'center',
                            }}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {/* Strength meter */}
                        <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
                          {[0,1,2,3].map(i => (
                            <i key={i} style={{
                              flex: 1, height: 3, display: 'block',
                              background: i < pwScore ? meterColors[pwScore] : 'var(--border-strong)',
                              transition: 'background 0.3s',
                            }} />
                          ))}
                        </div>
                        {/* Requirements */}
                        {formData.password && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 14px', marginTop: 12 }}>
                            {pwReqs.map(r => (
                              <div key={r.key} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                fontSize: 11.5, fontWeight: 300,
                                color: r.met ? 'var(--foreground)' : 'var(--muted-foreground)',
                                transition: 'color 0.2s',
                              }}>
                                <span style={{
                                  width: 15, height: 15, borderRadius: '50%',
                                  border: `1px solid ${r.met ? 'transparent' : 'var(--border-strong)'}`,
                                  background: r.met ? '#5fae7e' : 'transparent',
                                  display: 'grid', placeItems: 'center',
                                  flexShrink: 0, transition: 'all 0.2s',
                                }}>
                                  {r.met && <Check size={9} color="#fff" strokeWidth={3} />}
                                </span>
                                {r.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Confirm password */}
                      <div style={{ marginBottom: 18 }}>
                        <label htmlFor="confirm" style={{
                          display: 'block',
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                          textTransform: 'uppercase', letterSpacing: '0.12em',
                          color: 'var(--muted-foreground)', marginBottom: 8,
                        }}>Confirm password</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            id="confirm"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            autoComplete="new-password"
                            style={{
                              width: '100%', padding: '13px 44px 13px 14px',
                              border: '1px solid var(--border)',
                              background: 'var(--input)', color: 'var(--foreground)',
                              fontSize: 14, fontFamily: 'inherit',
                              outline: 'none', transition: 'all 0.2s',
                            }}
                            className="signup-input"
                          />
                          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                            aria-label="Toggle confirm password"
                            style={{
                              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                              background: 'none', border: 'none', cursor: 'pointer',
                              color: 'var(--muted-foreground)', display: 'grid', placeItems: 'center',
                            }}>
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Terms */}
                      <label
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 11,
                          margin: '6px 0 4px', cursor: 'pointer',
                        }}
                        onClick={e => {
                          e.preventDefault()
                          setFormData(f => ({ ...f, agree: !f.agree }))
                        }}>
                        <span style={{
                          width: 18, height: 18,
                          border: `1.5px solid ${formData.agree ? 'var(--accent-deep)' : 'var(--border-strong)'}`,
                          background: formData.agree ? 'var(--accent-deep)' : 'var(--input)',
                          flexShrink: 0, display: 'grid', placeItems: 'center',
                          marginTop: 1, transition: 'all 0.2s',
                        }}>
                          {formData.agree && <Check size={11} color="#fff" strokeWidth={3} />}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--muted-foreground)', lineHeight: 1.55 }}>
                          I agree to the{' '}
                          <Link href="/terms" style={{ color: 'var(--accent-deep)', borderBottom: '1px solid transparent' }}
                            className="hover:[border-color:var(--accent-deep)] transition-smooth">Terms of Service</Link>
                          {' '}and{' '}
                          <Link href="/privacy" style={{ color: 'var(--accent-deep)', borderBottom: '1px solid transparent' }}
                            className="hover:[border-color:var(--accent-deep)] transition-smooth">Privacy Policy</Link>.
                        </span>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        style={{
                          width: '100%', border: 'none',
                          background: 'var(--foreground)', color: 'var(--background)',
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5,
                          textTransform: 'uppercase', letterSpacing: '0.16em',
                          padding: 15, marginTop: 22,
                          cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
                          opacity: loading || !isFormValid ? 0.45 : 1,
                          transition: 'all 0.25s',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                        }}>
                        {loading ? (
                          <span className="mo-spinner" />
                        ) : (
                          <>
                            <span>Create account</span>
                            <ArrowRight size={15} strokeWidth={1.8} />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
                      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5,
                        textTransform: 'uppercase', letterSpacing: '0.14em',
                        color: 'var(--muted-foreground)',
                      }}>or continue with</span>
                      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    </div>

                    {/* Social auth */}
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
                        <button key={s.label} type="button"
                          onClick={() => { window.location.href = oauthAuthorizeUrl(s.provider) }}
                          style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                          border: '1px solid var(--border-strong)', background: 'var(--card)',
                          padding: 13, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11,
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                          color: 'var(--foreground)', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                          className="hover:[border-color:var(--foreground)] hover:[background:var(--muted)] transition-smooth">
                          {s.icon}
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div style={{
                      textAlign: 'center', marginTop: 28, paddingTop: 24,
                      borderTop: '1px solid var(--border)',
                      fontSize: 13, fontWeight: 300, color: 'var(--muted-foreground)',
                    }}>
                      Already have an account?{' '}
                      <Link href="/login" style={{ color: 'var(--accent-deep)' }}
                        className="hover:[color:var(--foreground)] transition-smooth">Sign in</Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
