'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchInterviewerDetail, createBooking, resolveSlotDate } from '@/lib/interviewers'
import { getCurrentUser } from '@/lib/auth'
import { ApiError } from '@/lib/api'
import type { Interviewer } from '@/lib/types'

const companyTones: Record<string, string> = {
  Google: '#4285F4',
  Meta: '#0866FF',
  Amazon: '#d98a2b',
  Microsoft: '#5b9bd5',
  Apple: '#555555',
  Netflix: '#c14b4b',
  Stripe: '#635bff',
}

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function Stars5() {
  return (
    <span className="inline-flex gap-[1px]" style={{ color: 'var(--accent)' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 16.9 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6z" />
        </svg>
      ))}
    </span>
  )
}

const FOCUS_CHIPS = ['System design', 'DSA / algorithms', 'Behavioral', 'Mock full loop', 'Communication', 'Resume review']

export default function BookingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const interviewerId = searchParams.get('interviewer')
  const selectedDay = searchParams.get('day')
  const selectedTime = searchParams.get('time')
  const duration = Number(searchParams.get('duration') || '60')

  const [interviewer, setInterviewer] = useState<Interviewer | null>(null)
  const [loadingItv, setLoadingItv] = useState(true)

  const [notes, setNotes] = useState('')
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set())
  const [payMethod, setPayMethod] = useState<'card' | 'paypal'>('card')
  const [termsChecked, setTermsChecked] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmedAt, setConfirmedAt] = useState<Date | null>(null)
  const [bookError, setBookError] = useState<string | null>(null)

  useEffect(() => {
    if (!interviewerId) {
      setLoadingItv(false)
      return
    }
    const controller = new AbortController()
    fetchInterviewerDetail(interviewerId, controller.signal)
      .then((i) => {
        setInterviewer(i)
        setLoadingItv(false)
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadingItv(false)
      })
    return () => controller.abort()
  }, [interviewerId])

  if (loadingItv) {
    return (
      <div className="text-center py-24">
        <span className="inline-block w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent-deep)', borderTopColor: 'transparent' }} />
        <p className="text-muted-foreground font-light mt-4">Loading your booking…</p>
      </div>
    )
  }

  if (!interviewer || !selectedDay || !selectedTime) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground font-light mb-4">This booking link is invalid or the coach is unavailable.</p>
        <Link href="/find-interviewers" className="text-sm uppercase tracking-[0.14em] font-light underline hover:no-underline" style={{ color: 'var(--accent-deep)' }}>
          Back to find coaches
        </Link>
      </div>
    )
  }

  const tone = companyTones[interviewer.company] || '#8b7355'
  const sessionPrice = Math.round((interviewer.pricePerSession / 60) * duration)
  const platformFee = Math.round(sessionPrice * 0.1)
  const total = sessionPrice + platformFee

  function toggleChip(c: string) {
    const s = new Set(activeChips)
    if (s.has(c)) {
      s.delete(c)
    } else {
      s.add(c)
      setNotes(prev => prev ? prev.trimEnd() + (prev.match(/[.!?]\s*$/) ? ' ' : ', ') + c : c)
    }
    setActiveChips(s)
  }

  async function handleConfirm() {
    if (!termsChecked || processing || !interviewer || !selectedDay || !selectedTime) return

    // Must be signed in to book — send guests to login and back.
    const user = getCurrentUser()
    if (!user) {
      const next = encodeURIComponent(window.location.pathname + window.location.search)
      router.push(`/login?next=${next}`)
      return
    }

    setProcessing(true)
    setBookError(null)
    try {
      const when = resolveSlotDate(selectedDay, selectedTime)
      await createBooking({
        interviewerId: interviewer.id,
        scheduledAt: when.toISOString(),
        durationMinutes: duration,
        sessionType: 'Technical',
        focus: [...activeChips],
        notes: notes.trim() || undefined,
      })
      setConfirmedAt(when)
      setConfirmed(true)
      document.body.style.overflow = 'hidden'
    } catch (err) {
      setBookError(
        err instanceof ApiError
          ? err.message
          : 'We couldn’t send your request. Please try again.',
      )
    } finally {
      setProcessing(false)
    }
  }

  function closeOverlay() {
    setConfirmed(false)
    document.body.style.overflow = ''
  }

  function addToCalendar() {
    if (!confirmedAt || !interviewer) return
    const start = confirmedAt
    const end = new Date(start.getTime() + duration * 60000)
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MoInterview//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@mointerview`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Mock interview with ${interviewer.name}`,
      `DESCRIPTION:${duration}-minute mock interview (pending ${interviewer.name.split(' ')[0]}'s confirmation).`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'mointerview-session.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1140px] mx-auto" style={{ padding: '0 clamp(20px,5vw,56px)' }}>

        {/* Stepper */}
        <div className="flex items-center gap-[14px] pt-[30px] pb-[6px] flex-wrap">
          {[
            { label: 'Choose coach', done: true },
            { label: 'Pick a time', done: true },
            { label: 'Confirm & pay', active: true },
          ].map((step, i, arr) => (
            <span key={i} className="flex items-center gap-[14px]">
              <span className={`flex items-center gap-[9px] text-[12.5px] ${step.active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                <span
                  className="w-[22px] h-[22px] rounded-full border grid place-items-center font-mono text-[11px] flex-shrink-0"
                  style={{
                    background: step.done ? 'var(--accent-deep)' : step.active ? 'var(--foreground)' : 'transparent',
                    borderColor: step.done ? 'var(--accent-deep)' : step.active ? 'var(--foreground)' : 'var(--border-strong)',
                    color: step.done || step.active ? 'white' : 'var(--muted-foreground)',
                  }}
                >
                  {step.done ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[11px] h-[11px]">
                      <path d="M5 12l5 5L20 6" />
                    </svg>
                  ) : i + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </span>
              {i < arr.length - 1 && (
                <span className="w-7 h-px" style={{ background: 'var(--border-strong)' }} />
              )}
            </span>
          ))}
        </div>

        {/* Page header */}
        <header className="py-[26px] pb-9">
          <h1 className="font-light tracking-[-0.02em] leading-[1.02]" style={{ fontSize: 'clamp(32px,5vw,48px)' }}>
            One step from your mock with{' '}
            <em className="not-italic" style={{ color: 'var(--accent-deep)' }}>
              {interviewer.name.split(' ')[0]}
            </em>
            .
          </h1>
          <p className="text-base font-light text-muted-foreground mt-[14px] max-w-[540px]">
            Review your session, tell {interviewer.name.split(' ')[0]} what to focus on, and you&apos;re set.
            You can reschedule or cancel free up to 24 hours before.
          </p>
        </header>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 pb-24">

          {/* Left column */}
          <main className="space-y-[22px]">

            {/* 1. Session block */}
            <section className="border border-border bg-card">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                <span className="w-[26px] h-[26px] rounded-full border grid place-items-center font-mono text-[12px] text-muted-foreground flex-shrink-0" style={{ borderColor: 'var(--border-strong)' }}>1</span>
                <h2 className="text-base font-medium tracking-[-0.005em]">Your session</h2>
              </div>
              <div className="p-6">
                {/* Interviewer hero */}
                <div className="flex gap-5 items-start">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex-shrink-0 grid place-items-center font-mono font-medium text-white relative"
                    style={{ background: tone, fontSize: 26 }}
                  >
                    {initials(interviewer.name)}
                    <span
                      className="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-full grid place-items-center"
                      style={{ background: 'var(--accent-deep)', border: '2.5px solid var(--card)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" width={11} height={11}>
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xl font-medium tracking-[-0.01em]">{interviewer.name}</div>
                    <div className="text-sm font-light text-muted-foreground mt-[2px]">{interviewer.role}</div>
                    <div className="inline-flex items-center gap-[6px] mt-[9px] font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--accent-deep)' }}>
                      <span className="w-[5px] h-[5px] rounded-full bg-current" />
                      {interviewer.company}
                    </div>
                    <div className="flex items-center gap-[6px] mt-[10px] text-[13px] font-light text-muted-foreground">
                      <Stars5 />
                      <span>{interviewer.rating} · {interviewer.reviewCount} reviews · {interviewer.experience} yrs experience</span>
                    </div>
                  </div>
                </div>

                {/* Appointment details */}
                <div
                  className="grid mt-[22px]"
                  style={{ gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid var(--border)' }}
                >
                  {[
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="1"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>, label: 'Date', v: selectedDay, sub: 'June 2026' },
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>, label: 'Time', v: selectedTime, sub: `${duration} minutes · PT` },
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7h13v10H3zM16 10l5-3v10l-5-3"/></svg>, label: 'Format', v: 'Technical', sub: 'Live video call' },
                  ].map((item, i) => (
                    <div key={i} className="px-[18px] py-4" style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
                      <div className="flex items-center gap-[7px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground" style={{ color: 'var(--accent-deep)' }}>
                        {item.icon}
                        <span className="text-muted-foreground">{item.label}</span>
                      </div>
                      <div className="text-[15px] font-medium mt-2">{item.v}</div>
                      {item.sub && <div className="text-[12px] font-light text-muted-foreground mt-[2px]">{item.sub}</div>}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-[9px] mt-4 text-[12.5px] font-light text-muted-foreground">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="flex-shrink-0" style={{ color: 'var(--accent-deep)' }}>
                    <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
                  </svg>
                  A private video link arrives by email right after booking. Join 5 minutes early to check your setup.
                </div>
              </div>
            </section>

            {/* 2. Focus block */}
            <section className="border border-border bg-card">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                <span className="w-[26px] h-[26px] rounded-full border grid place-items-center font-mono text-[12px] text-muted-foreground flex-shrink-0" style={{ borderColor: 'var(--border-strong)' }}>2</span>
                <h2 className="text-base font-medium tracking-[-0.005em]">Help {interviewer.name.split(' ')[0]} tailor your hour</h2>
                <span className="ml-auto text-[12px] font-light text-muted-foreground">Optional</span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {FOCUS_CHIPS.map(c => (
                    <button
                      key={c}
                      onClick={() => toggleChip(c)}
                      className="text-[12.5px] font-light border px-[14px] py-[7px] rounded-full cursor-pointer font-sans transition-all duration-[180ms]"
                      style={{
                        background: activeChips.has(c) ? 'var(--foreground)' : 'var(--card)',
                        color: activeChips.has(c) ? 'var(--background)' : 'var(--muted-foreground)',
                        borderColor: activeChips.has(c) ? 'var(--foreground)' : 'var(--border-strong)',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={`e.g. I'm interviewing at ${interviewer.company} for L4 in two weeks. I'd like to focus on system design — scalability and tradeoffs — and get honest feedback on how I communicate under pressure.`}
                  className="w-full min-h-[110px] resize-y border font-sans text-sm font-light text-foreground p-[14px] outline-none transition-colors duration-200 leading-[1.55] bg-input placeholder:text-[#a89c8d]"
                  style={{ borderColor: 'var(--border-strong)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--foreground)'; e.target.style.background = 'var(--card)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.background = 'var(--input)' }}
                />
                <p className="text-[12px] font-light text-muted-foreground mt-[9px]">
                  {interviewer.name.split(' ')[0]} reads this before your call so no time is wasted. The more specific, the sharper the session.
                </p>
              </div>
            </section>

            {/* 3. Outcomes block */}
            <section className="border border-border bg-card">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                <span className="w-[26px] h-[26px] rounded-full border grid place-items-center font-mono text-[12px] text-muted-foreground flex-shrink-0" style={{ borderColor: 'var(--border-strong)' }}>3</span>
                <h2 className="text-base font-medium tracking-[-0.005em]">What you&apos;ll walk away with</h2>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: 1, background: 'var(--border)' }}
              >
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4"><path d="M3 7h13v10H3zM16 10l5-3v10l-5-3"/></svg>, t: 'A full mock interview', d: `A realistic ${duration}-minute round run exactly like the real ${interviewer.company} loop.` },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4"><path d="M5 4h14v16l-7-3-7 3z"/></svg>, t: 'Recording & transcript', d: 'Rewatch the whole session and revisit every question, on demand.' },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, t: 'Honest written feedback', d: 'Specific, no-fluff notes on strengths and exactly what to fix next.' },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4"><path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z"/></svg>, t: 'AI performance report', d: 'Scored breakdown of clarity, depth and problem-solving to track growth.' },
                ].map((item, i) => (
                  <div key={i} className="bg-card p-5 flex gap-[14px]">
                    <span
                      className="w-[34px] h-[34px] border grid place-items-center flex-shrink-0"
                      style={{ borderColor: 'var(--border-strong)', color: 'var(--accent-deep)' }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{item.t}</div>
                      <div className="text-[12.5px] font-light text-muted-foreground mt-[3px] leading-[1.45]">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Trust block */}
            <section className="border border-border bg-card">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                <span className="w-[26px] h-[26px] rounded-full border grid place-items-center font-mono text-[12px] text-muted-foreground flex-shrink-0" style={{ borderColor: 'var(--border-strong)' }}>4</span>
                <h2 className="text-base font-medium tracking-[-0.005em]">You&apos;re in good hands</h2>
              </div>
              <div className="px-7 py-[26px] border-l-2" style={{ borderLeftColor: 'var(--accent-deep)', background: 'var(--input)', margin: '0' }}>
                <p className="text-base font-light leading-[1.6] italic">
                  &ldquo;{interviewer.name.split(' ')[0]} called out the exact gap two other coaches missed. Two weeks later I had the {interviewer.company} offer. Best ${sessionPrice} I spent in my whole prep.&rdquo;
                </p>
                <div className="flex items-center gap-[10px] mt-4">
                  <div className="w-[34px] h-[34px] rounded-full grid place-items-center font-mono text-[12px] font-medium text-white" style={{ background: 'var(--secondary)' }}>
                    DL
                  </div>
                  <div className="text-[12.5px]">
                    <b className="font-medium">Daniel Lee</b>{' '}
                    <span className="text-muted-foreground font-light">· now SWE at {interviewer.company}</span>
                  </div>
                </div>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 border-t border-border"
                style={{ gap: 1, background: 'var(--border)' }}
              >
                {[
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/></svg>, t: 'Vetted experts', d: 'Every coach is a current engineer at a top company.' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M8 12l3 3 5-6"/></svg>, t: 'Free reschedule', d: 'Change or cancel up to 24h before, no fee.' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="10" width="16" height="11" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>, t: 'Secure payment', d: 'Processed by Stripe. We never store your card.' },
                ].map((g, i) => (
                  <div key={i} className="bg-card p-5">
                    <div className="mb-[10px]" style={{ color: 'var(--accent-deep)' }}>{g.icon}</div>
                    <div className="text-[13px] font-medium">{g.t}</div>
                    <div className="text-[12px] font-light text-muted-foreground mt-[2px] leading-[1.4]">{g.d}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Payment block */}
            <section className="border border-border bg-card">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                <span className="w-[26px] h-[26px] rounded-full border grid place-items-center font-mono text-[12px] text-muted-foreground flex-shrink-0" style={{ borderColor: 'var(--border-strong)' }}>5</span>
                <h2 className="text-base font-medium tracking-[-0.005em]">Payment</h2>
                <span className="ml-auto text-[12px] font-light text-muted-foreground flex items-center gap-1">
                  <span style={{ color: '#5fae7e' }}>●</span> Encrypted
                </span>
              </div>
              <div className="p-6">
                {/* Card option */}
                <div
                  className="border mb-3 transition-colors duration-200"
                  style={{ borderColor: payMethod === 'card' ? 'var(--foreground)' : 'var(--border-strong)' }}
                >
                  <div
                    className="flex items-center gap-3 px-[18px] py-[15px] cursor-pointer"
                    onClick={() => setPayMethod('card')}
                  >
                    <span
                      className="w-[18px] h-[18px] rounded-full border grid place-items-center flex-shrink-0 transition-colors duration-200"
                      style={{ borderColor: payMethod === 'card' ? 'var(--foreground)' : 'var(--border-strong)' }}
                    >
                      {payMethod === 'card' && (
                        <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'var(--foreground)' }} />
                      )}
                    </span>
                    <span className="text-sm font-medium flex items-center gap-[9px]">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                      </svg>
                      Card
                    </span>
                    <div className="ml-auto flex gap-[5px]">
                      {['VISA', 'MC', 'AMEX'].map(c => (
                        <span key={c} className="w-[30px] h-[19px] border grid place-items-center font-mono text-[7.5px] font-medium text-muted-foreground rounded-[3px]" style={{ borderColor: 'var(--border)' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  {payMethod === 'card' && (
                    <div className="px-[18px] pb-[18px] pl-[48px] grid gap-3">
                      <FormField label="Email for receipt">
                        <input type="email" defaultValue="john@example.com" className="form-input" />
                      </FormField>
                      <FormField label="Card number">
                        <input type="text" placeholder="1234 1234 1234 1234" defaultValue="4242 4242 4242 4242" className="form-input" />
                      </FormField>
                      <div className="grid grid-cols-3 gap-3">
                        <FormField label="Expiry">
                          <input type="text" placeholder="MM / YY" defaultValue="12 / 26" className="form-input" />
                        </FormField>
                        <FormField label="CVC">
                          <input type="text" placeholder="123" defaultValue="123" className="form-input" />
                        </FormField>
                        <FormField label="ZIP">
                          <input type="text" placeholder="10001" defaultValue="94016" className="form-input" />
                        </FormField>
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal option */}
                <div
                  className="border transition-colors duration-200 cursor-pointer"
                  style={{ borderColor: payMethod === 'paypal' ? 'var(--foreground)' : 'var(--border-strong)' }}
                  onClick={() => setPayMethod('paypal')}
                >
                  <div className="flex items-center gap-3 px-[18px] py-[15px]">
                    <span
                      className="w-[18px] h-[18px] rounded-full border grid place-items-center flex-shrink-0 transition-colors duration-200"
                      style={{ borderColor: payMethod === 'paypal' ? 'var(--foreground)' : 'var(--border-strong)' }}
                    >
                      {payMethod === 'paypal' && (
                        <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'var(--foreground)' }} />
                      )}
                    </span>
                    <span className="text-sm font-medium">PayPal</span>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex gap-[11px] items-start mt-[18px] cursor-pointer">
                  <input type="checkbox" className="sr-only" checked={termsChecked} onChange={e => setTermsChecked(e.target.checked)} />
                  <span
                    className="w-[17px] h-[17px] border flex-shrink-0 mt-[1px] grid place-items-center transition-all duration-[180ms]"
                    style={{
                      background: termsChecked ? 'var(--foreground)' : 'transparent',
                      borderColor: termsChecked ? 'var(--foreground)' : 'var(--border-strong)',
                    }}
                  >
                    {termsChecked && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[10px] h-[10px]">
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    )}
                  </span>
                  <p className="text-[12.5px] font-light text-muted-foreground leading-[1.5]">
                    I agree to the{' '}
                    <a href="#" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Privacy Policy</a>
                    , and understand the session is recorded for my own reference only.
                  </p>
                </label>
              </div>
            </section>
          </main>

          {/* Right rail */}
          <aside>
            <div
              className="border bg-card lg:sticky lg:top-[92px]"
              style={{ borderColor: 'var(--border-strong)', boxShadow: '0 1px 2px rgba(26,20,16,0.04), 0 8px 24px -12px rgba(26,20,16,0.10)' }}
            >
              {/* Coach summary */}
              <div className="p-6 border-b border-border">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block mb-[14px]">
                  Booking summary
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className="w-[42px] h-[42px] rounded-full flex-shrink-0 grid place-items-center font-mono text-[15px] font-medium text-white"
                    style={{ background: tone }}
                  >
                    {initials(interviewer.name)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{interviewer.name}</div>
                    <div className="text-[12px] font-light text-muted-foreground">{interviewer.company} · {interviewer.role.split(' ').slice(-2).join(' ')}</div>
                  </div>
                </div>
              </div>

              {/* When */}
              <div className="px-6 py-[18px] border-b border-border flex flex-col gap-[11px]">
                {[
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="18" rx="1"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>, text: <>{selectedDay} · <b className="font-medium">{selectedTime} PT</b></> },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>, text: <><b className="font-medium">{duration}-minute</b> technical mock</> },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7h13v10H3zM16 10l5-3v10l-5-3"/></svg>, text: <>Live video · link emailed</> },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-[11px] text-[13.5px] font-light" style={{ color: 'var(--accent-deep)' }}>
                    {row.icon}
                    <span className="text-foreground">{row.text}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="px-6 py-[18px] border-b border-border flex flex-col gap-[10px]">
                <div className="flex justify-between text-[13px] font-light">
                  <span className="text-muted-foreground">Session ({duration} min)</span>
                  <span>${sessionPrice}</span>
                </div>
                <div className="flex justify-between text-[13px] font-light">
                  <span className="text-muted-foreground flex items-center gap-[6px]">
                    Platform fee
                    <span
                      className="w-[14px] h-[14px] rounded-full border grid place-items-center text-[9px] text-muted-foreground cursor-help"
                      title="Covers recording, transcript, AI report & secure payments"
                      style={{ borderColor: 'var(--border-strong)' }}
                    >?</span>
                  </span>
                  <span>${platformFee}</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-border pt-[13px] mt-[3px]">
                  <span className="text-sm font-medium">Total due today</span>
                  <span className="text-2xl font-medium tracking-[-0.01em]">${total}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6">
                {bookError && (
                  <div className="mb-3 px-[14px] py-[10px] text-[12.5px] font-light border" style={{ color: 'var(--danger, #c14b4b)', borderColor: 'var(--danger, #c14b4b)', background: 'rgba(193,75,75,0.06)' }}>
                    {bookError}
                  </div>
                )}
                <button
                  onClick={handleConfirm}
                  disabled={!termsChecked || processing}
                  className="w-full border-none cursor-pointer font-sans py-[17px] text-[12.5px] uppercase tracking-[0.13em] text-background flex items-center justify-center gap-[9px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--foreground)' }}
                  onMouseEnter={e => { if (termsChecked && !processing) (e.target as HTMLElement).style.background = 'var(--accent-deep)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = 'var(--foreground)' }}
                >
                  {processing ? (
                    <>
                      <span className="w-[15px] h-[15px] rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Sending request…
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>
                      </svg>
                      Request this session
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-[7px] mt-[14px] text-[11.5px] font-light text-muted-foreground">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#5fae7e' }}>
                    <path d="M5 12l5 5L20 6"/>
                  </svg>
                  You&apos;re only charged after {interviewer.name.split(' ')[0]} confirms
                </div>
                <p className="text-center text-[11.5px] font-light text-muted-foreground mt-[10px]">
                  We&apos;ll email you the moment {interviewer.name.split(' ')[0]} accepts — usually within a few hours.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Success overlay */}
      {confirmed && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center p-6 transition-opacity duration-[350ms]"
          style={{ background: 'rgba(26,20,16,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeOverlay() }}
        >
          <div
            className="bg-card border max-w-[460px] w-full"
            style={{ borderColor: 'var(--border-strong)', boxShadow: '0 2px 4px rgba(26,20,16,0.06), 0 30px 60px -24px rgba(26,20,16,0.28)' }}
          >
            <div className="px-9 pt-10 pb-[30px] text-center border-b border-border">
              <div className="w-16 h-16 rounded-full grid place-items-center mx-auto mb-[22px]" style={{ background: 'rgba(95,174,126,0.12)' }}>
                <div className="w-[42px] h-[42px] rounded-full grid place-items-center" style={{ background: '#5fae7e' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[22px] h-[22px]">
                    <path d="M5 12l5 5L20 6"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-[28px] font-light tracking-[-0.01em]">Request sent.</h2>
              <p className="text-sm font-light text-muted-foreground mt-[10px] leading-[1.5]">
                Your request to book <b className="text-foreground font-medium">{interviewer.name}</b> for{' '}
                <b className="text-foreground font-medium">{selectedDay} at {selectedTime}</b> is in.
                You&apos;ll get an email the moment {interviewer.name.split(' ')[0]} confirms.
              </p>
            </div>
            <div className="px-9 py-6">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block mb-[14px]">
                What happens next
              </span>
              <ul className="space-y-[13px]">
                {[
                  `${interviewer.name.split(' ')[0]} reviews your request and focus notes.`,
                  'As soon as they accept, you get a confirmation email with the calendar invite and private video link.',
                  'Track the status anytime from your dashboard — no need to refresh your inbox.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[13.5px] font-light leading-[1.45]">
                    <span
                      className="w-5 h-5 rounded-full grid place-items-center flex-shrink-0 font-mono text-[10px] mt-[1px]"
                      style={{ background: 'var(--muted)', color: 'var(--accent-deep)' }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-9 pb-8 grid gap-[10px]">
              <button onClick={addToCalendar} className="w-full border-none cursor-pointer font-sans py-[15px] text-[12px] uppercase tracking-[0.13em] text-background transition-colors" style={{ background: 'var(--foreground)' }}>
                Add to calendar
              </button>
              <Link href="/find-interviewers" className="w-full border cursor-pointer font-sans py-[15px] text-[12px] uppercase tracking-[0.13em] text-foreground bg-card text-center block hover:bg-muted transition-colors no-underline" style={{ borderColor: 'var(--border-strong)' }}>
                Browse more coaches
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground mb-[6px]">
        {label}
      </label>
      {children}
    </div>
  )
}
