'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle2, Mail, Loader, Trophy, Star, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import {
  sendOtp,
  verifyOtp,
  onboardInterviewer,
  getMyInterviewerProfile,
  getCurrentUser,
  oauthAuthorizeUrl,
  COACH_APP_URL,
  type SpecialtyKey,
} from '@/lib/auth'
import { ApiError } from '@/lib/api'

/** Decode a base64url string (no padding) to UTF-8 text. */
function b64urlDecode(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
  return decodeURIComponent(escape(atob(b64 + pad)))
}

/** Prepend https:// when a URL is missing its scheme (backend requires a full URL). */
function normalizeUrl(raw: string): string {
  const t = raw.trim()
  if (!t) return ''
  return /^https?:\/\//i.test(t) ? t : `https://${t}`
}

function isValidUrl(raw: string): boolean {
  try {
    new URL(normalizeUrl(raw))
    return true
  } catch {
    return false
  }
}

// UI specialty label -> backend enum key.
const SPECIALTY_MAP: Record<string, SpecialtyKey> = {
  'System Design': 'SYSTEM_DESIGN',
  'Algorithms': 'ALGORITHMS',
  'Behavioral': 'BEHAVIORAL',
  'Front-end': 'FRONTEND',
  'Back-end': 'BACKEND',
  'ML/AI': 'ML_AI',
}

// UI experience band -> a representative integer the backend accepts.
const EXPERIENCE_MAP: Record<string, number> = {
  '0-2': 1,
  '3-5': 4,
  '5-10': 7,
  '10+': 10,
}

export default function InterviewerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profileImported, setProfileImported] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  // Step 1 - Basic Information
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedinUrl: ''
  })

  // Step 2 - Company Verification
  const [companyInfo, setCompanyInfo] = useState({
    company: '',
    position: '',
    role: '',
    yearsExperience: '',
    specialties: [] as string[],
    bio: ''
  })

  // Step 3 - OTP
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  // On mount: if this interviewer already finished onboarding, skip straight to the
  // dashboard. Otherwise prefill from the session and absorb any LinkedIn import
  // payload / error the backend redirected back with, then show the wizard.
  useEffect(() => {
    const init = async () => {
      try {
        await getMyInterviewerProfile()
        // Profile exists -> already onboarded.
        window.location.href = COACH_APP_URL
        return
      } catch {
        // 404 (or not authorized) -> not onboarded yet; continue with the wizard.
      }

      const user = getCurrentUser()
      if (user) {
        setBasicInfo(prev => ({
          ...prev,
          firstName: prev.firstName || user.firstName,
          lastName: prev.lastName || user.lastName,
          email: prev.email || user.email,
        }))
      }

      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      const li = hash.get('li')
      if (li) {
        try {
          const p = JSON.parse(b64urlDecode(li)) as {
            firstName?: string; lastName?: string; email?: string; avatarUrl?: string
          }
          setBasicInfo(prev => ({
            ...prev,
            firstName: p.firstName || prev.firstName,
            lastName: p.lastName || prev.lastName,
            email: p.email || prev.email,
          }))
          setProfileImported(true)
          toast.success('LinkedIn profile imported', {
            description: 'Name and email prefilled. Add your company details below.',
          })
        } catch {
          toast.error('Could not read the imported LinkedIn profile.')
        }
        history.replaceState(null, '', window.location.pathname)
      }

      const err = new URLSearchParams(window.location.search).get('error')
      if (err) {
        toast.error(err)
        history.replaceState(null, '', window.location.pathname)
      }

      setReady(true)
    }
    init()
  }, [])

  const handleImportLinkedIn = () => {
    setLoading(true)
    // Full-page redirect into the backend LinkedIn OAuth (import intent);
    // we return to this page with the profile in the URL fragment.
    window.location.href = oauthAuthorizeUrl('linkedin', 'import')
  }

  const handleSendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      await sendOtp(basicInfo.email.trim())
      setOtpSent(true)
      toast.success('Verification code sent', { description: `Check ${basicInfo.email}` })
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Could not send the code. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setError('')
    try {
      await sendOtp(basicInfo.email.trim())
      toast.success('Code resent', { description: `A new code is on its way to ${basicInfo.email}` })
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Could not resend the code. Please try again.'
      setError(msg)
      toast.error(msg)
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return
    setError('')
    setLoading(true)
    try {
      // 1. Confirm the email verification code — but only once, since it's
      //    single-use. If a later step fails and the user retries, we skip this
      //    so they don't hit "No active code found".
      if (!otpVerified) {
        await verifyOtp(basicInfo.email.trim(), otp)
        setOtpVerified(true)
      }

      // 2. Submit the interviewer profile. authFetch auto-refreshes the access
      //    token if it expired during this (potentially long) flow.
      await onboardInterviewer({
        company: companyInfo.company.trim(),
        jobTitle: companyInfo.position.trim(),
        roleType: companyInfo.role,
        yearsExperience: EXPERIENCE_MAP[companyInfo.yearsExperience] ?? 0,
        specialties: companyInfo.specialties
          .map(s => SPECIALTY_MAP[s])
          .filter((s): s is SpecialtyKey => Boolean(s)),
        bio: companyInfo.bio.trim(),
        linkedinUrl: normalizeUrl(basicInfo.linkedinUrl) || undefined,
      })

      toast.success('Email verified — profile created!')
      setTimeout(() => setShowWelcome(true), 500)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Verification failed. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMockCard = () => {
    // Navigate to dashboard or next step
    window.location.href = COACH_APP_URL
  }

  // Hold the render until we've checked whether onboarding is already complete
  // (the effect redirects already-onboarded interviewers to the dashboard).
  if (!ready) {
    return <div className="min-h-screen bg-background" />
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 overflow-hidden">
        <style>{`
          @keyframes welcome-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes confetti-fall {
            to {
              transform: translateY(600px) rotateZ(720deg);
              opacity: 0;
            }
          }
          .animate-welcome-float {
            animation: welcome-float 3s ease-in-out infinite;
          }
          .confetti {
            animation: confetti-fall 3s ease-in forwards;
            position: fixed;
            pointer-events: none;
          }
        `}</style>

        {/* Confetti elements */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: Math.random() * 100 + '%',
              top: -10,
              backgroundColor: [
                'rgba(200, 153, 104, 0.8)',
                'rgba(26, 20, 16, 0.8)',
                'rgba(240, 235, 227, 0.8)',
                'rgba(139, 115, 85, 0.8)'
              ][Math.floor(Math.random() * 4)],
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              animationDelay: Math.random() * 0.5 + 's'
            }}
          />
        ))}

        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          {/* Welcome Icon */}
          <div className="flex justify-center">
            <div className="animate-welcome-float">
              <Trophy className="w-20 h-20 text-accent" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-light text-foreground">
              Welcome to MoInterview!
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Your company identity has been verified. You're all set to start earning by helping candidates ace their interviews.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 py-8">
            <div className="p-6 bg-card border border-border space-y-2 hover:border-accent transition-smooth">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Earning Potential</p>
              <p className="text-3xl font-light text-accent">$150/hr</p>
            </div>
            <div className="p-6 bg-card border border-border space-y-2 hover:border-accent transition-smooth">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Your Rating</p>
              <p className="text-3xl font-light text-foreground">5.0</p>
            </div>
            <div className="p-6 bg-card border border-border space-y-2 hover:border-accent transition-smooth">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Availability</p>
              <p className="text-3xl font-light text-foreground">Flexible</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 pt-8 border-t border-border">
            <h3 className="text-2xl font-light text-foreground">Next Steps</h3>
            <div className="space-y-4 text-left">
              {[
                { num: '1', title: 'Create Your Profile', desc: 'Add a professional photo and bio' },
                { num: '2', title: 'Set Your Rates', desc: 'Configure your hourly rates' },
                { num: '3', title: 'Create Mock Interview Card', desc: 'Let candidates discover and book you' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-muted/20 border border-border rounded hover:border-accent transition-smooth">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 font-light text-sm">
                    {step.num}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-light text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              onClick={handleCreateMockCard}
              className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-light uppercase tracking-widest text-sm hover:bg-primary/90 transition-smooth"
            >
              Create Interview Card
            </button>
            <Link
              href={COACH_APP_URL}
              className="flex-1 px-8 py-4 border border-primary text-primary font-light uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-smooth text-center"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="h-1 bg-muted/30">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <p className="text-xs uppercase tracking-widest text-accent font-light">Step {currentStep} of 3</p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">
            {currentStep === 1 && 'Create Your Coach Profile'}
            {currentStep === 2 && 'Verify Your Company Identity'}
            {currentStep === 3 && 'Verify Your Email'}
          </h1>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-8 flex items-center gap-3 border border-[rgba(193,75,75,0.3)] bg-[rgba(193,75,75,0.08)] px-4 py-3 text-sm text-[#c14b4b] animate-fade-in">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1 - Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            {/* LinkedIn Import Option */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-light uppercase tracking-widest">Quick Setup</p>
              <button
                onClick={handleImportLinkedIn}
                disabled={loading}
                className={`w-full p-6 border-2 border-dashed border-border rounded flex items-center justify-center gap-4 transition-smooth ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent hover:bg-muted/30'
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-light text-muted-foreground">Importing from LinkedIn...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                    <span className="text-sm font-light">Import Profile from LinkedIn</span>
                  </>
                )}
              </button>
            </div>

            {/* Or Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-background text-muted-foreground font-light uppercase tracking-widest">or enter manually</span>
              </div>
            </div>

            {/* Manual Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">First Name *</label>
                  <input
                    type="text"
                    value={basicInfo.firstName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Last Name *</label>
                  <input
                    type="text"
                    value={basicInfo.lastName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Email Address *</label>
                <input
                  type="email"
                  value={basicInfo.email}
                  onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">LinkedIn URL (Optional)</label>
                <input
                  type="text"
                  value={basicInfo.linkedinUrl}
                  onChange={(e) => setBasicInfo({ ...basicInfo, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent"
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 - Company Verification */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Current Company *</label>
                <input
                  type="text"
                  value={companyInfo.company}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, company: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent"
                  placeholder="Google, Meta, Amazon..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Job Title *</label>
                  <input
                    type="text"
                    value={companyInfo.position}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, position: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent"
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Role Type *</label>
                  <select
                    value={companyInfo.role}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, role: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground font-light focus:outline-none focus:border-accent"
                  >
                    <option value="">Select Role</option>
                    <option value="swe">Software Engineer</option>
                    <option value="pm">Product Manager</option>
                    <option value="design">Product Designer</option>
                    <option value="data">Data Scientist</option>
                    <option value="devops">DevOps Engineer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Years of Experience *</label>
                <select
                  value={companyInfo.yearsExperience}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, yearsExperience: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground font-light focus:outline-none focus:border-accent"
                >
                  <option value="">Select Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Specialties (Select at least one) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['System Design', 'Algorithms', 'Behavioral', 'Front-end', 'Back-end', 'ML/AI'].map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => {
                        if (companyInfo.specialties.includes(specialty)) {
                          setCompanyInfo({
                            ...companyInfo,
                            specialties: companyInfo.specialties.filter((s) => s !== specialty)
                          })
                        } else {
                          setCompanyInfo({
                            ...companyInfo,
                            specialties: [
                              ...companyInfo.specialties, specialty]
                          })
                        }
                      }}
                      className={`px-4 py-2 text-xs font-light uppercase tracking-widest border rounded transition-smooth ${
                        companyInfo.specialties.includes(specialty)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'border-border text-foreground hover:border-accent'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Professional Bio * (min 20 characters)</label>
                <textarea
                  value={companyInfo.bio}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-light focus:outline-none focus:border-accent resize-none h-24"
                  placeholder="Brief description of your expertise and coaching style..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 - OTP Verification */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto">
            {!otpSent ? (
              <div className="space-y-6">
                <p className="text-muted-foreground font-light leading-relaxed">
                  We'll send a verification code to your company email to confirm your identity. This is a one-time verification.
                </p>

                <div className="p-6 bg-muted/20 border border-border rounded space-y-3">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Verification Email</p>
                  <p className="text-lg text-foreground font-light">{basicInfo.email}</p>
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-light uppercase tracking-widest text-sm hover:bg-primary/90 disabled:opacity-50 transition-smooth flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Send Verification Code
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-muted/20 border border-border rounded space-y-3">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground font-light">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Code sent to {basicInfo.email}
                  </p>
                  <p className="text-xs text-muted-foreground font-light">Check your inbox and spam folder</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-light">Enter 6-Digit Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] bg-input border-2 border-border text-foreground font-light focus:outline-none focus:border-accent"
                    placeholder="000000"
                  />
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || loading}
                  className="w-full px-6 py-3 bg-accent text-accent-foreground font-light uppercase tracking-widest text-sm hover:bg-accent/90 disabled:opacity-50 transition-smooth flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground font-light">
                  Didn't receive the code?{' '}
                  <button onClick={handleResendOtp} className="text-accent hover:underline">Resend</button>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-16 pt-8 border-t border-border">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-border text-foreground font-light uppercase tracking-widest text-sm hover:border-accent disabled:opacity-50 transition-smooth"
          >
            Back
          </button>

          <button
            onClick={() => {
              setError('')
              // Validate the (optional) LinkedIn URL before leaving step 1 —
              // otherwise the backend rejects it much later at profile submit.
              if (currentStep === 1 && basicInfo.linkedinUrl.trim() && !isValidUrl(basicInfo.linkedinUrl)) {
                toast.error('That LinkedIn URL doesn’t look right', {
                  description: 'Use a full link like https://linkedin.com/in/your-name',
                })
                return
              }
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1)
              }
            }}
            disabled={
              (currentStep === 1 && (!basicInfo.firstName || !basicInfo.lastName || !basicInfo.email)) ||
              (currentStep === 2 && (!companyInfo.company || !companyInfo.position || !companyInfo.role || !companyInfo.yearsExperience || companyInfo.specialties.length === 0 || companyInfo.bio.trim().length < 20)) ||
              currentStep === 3
            }
            className="ml-auto px-8 py-3 bg-accent text-accent-foreground font-light uppercase tracking-widest text-sm hover:bg-accent/90 disabled:opacity-50 transition-smooth flex items-center gap-2"
          >
            {currentStep === 2 ? 'Continue to Verification' : 'Next Step'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
