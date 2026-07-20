'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { InterviewerDetail } from '@/lib/interviewers'
import { SimilarCoaches } from './similar-coaches'

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

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating)
  return (
    <span className="inline-flex gap-[1px]" style={{ color: 'var(--accent)' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill={i < full ? 'currentColor' : '#e8ddd3'}>
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 16.9 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6z" />
        </svg>
      ))}
    </span>
  )
}

interface InterviewerProfileContentProps {
  interviewer: InterviewerDetail
}

export default function InterviewerProfileContent({ interviewer }: InterviewerProfileContentProps) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'avail' | 'reviews'>('about')
  const [dur, setDur] = useState(60)
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null)

  const tone = companyTones[interviewer.company] || '#8b7355'
  const price = Math.round((interviewer.pricePerSession / 60) * dur)
  const reviews = interviewer.reviews ?? []
  const ratingDist = (interviewer.ratingDistribution ?? []).map((b) => ({ s: b.stars, p: b.percent }))
  const languagesText = interviewer.languages && interviewer.languages.length
    ? interviewer.languages.join(' · ')
    : 'English'

  function handleBook() {
    if (!selectedSlot) return
    router.push(`/booking?interviewer=${interviewer.id}&day=${selectedSlot.day}&time=${encodeURIComponent(selectedSlot.time)}&duration=${dur}`)
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1180px] mx-auto" style={{ padding: '0 clamp(20px,5vw,56px)' }}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-[9px] py-[26px] pb-1 text-[12px]">
          <Link href="/find-interviewers" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
            Find Coaches
          </Link>
          <span className="text-border-strong">/</span>
          <span className="text-foreground">{interviewer.name}</span>
        </nav>

        {/* ===== PROFILE HEADER ===== */}
        <header className="py-[30px] pb-[36px] border-b border-border">
          <div className="flex gap-7 items-start">
            {/* Avatar */}
            <div
              className="w-[104px] h-[104px] rounded-full flex-shrink-0 relative grid place-items-center font-mono font-medium text-white"
              style={{ background: tone, fontSize: 36 }}
            >
              {initials(interviewer.name)}
              <span
                className="absolute bottom-[2px] right-[2px] w-7 h-7 rounded-full grid place-items-center"
                style={{ background: 'var(--accent-deep)', border: '3px solid var(--background)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" width={13} height={13}>
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <h1 className="font-light leading-none tracking-[-0.02em]" style={{ fontSize: 'clamp(34px,5vw,52px)' }}>
                    {interviewer.name}
                  </h1>
                  <p className="text-base font-light text-muted-foreground mt-[10px]">{interviewer.role}</p>
                  <span
                    className="inline-flex items-center gap-[7px] mt-[13px] font-mono text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: 'var(--accent-deep)' }}
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-current" />
                    {interviewer.company}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-[10px]">
                  <button
                    onClick={() => setSaved(!saved)}
                    className="w-[46px] h-[46px] grid place-items-center border cursor-pointer transition-all duration-200"
                    style={{
                      background: 'var(--card)',
                      borderColor: saved ? 'var(--accent-deep)' : 'var(--border-strong)',
                      color: saved ? 'var(--accent-deep)' : 'var(--muted-foreground)',
                    }}
                    aria-label="Save"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                  <button
                    className="w-[46px] h-[46px] grid place-items-center border cursor-pointer transition-all duration-200 text-muted-foreground hover:text-foreground"
                    style={{ background: 'var(--card)', borderColor: 'var(--border-strong)' }}
                    aria-label="Share"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-base font-light text-foreground mt-[22px] max-w-[640px] leading-[1.6]">
                {interviewer.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-[22px]">
                {interviewer.skills.map(skill => (
                  <span key={skill} className="text-[12px] font-light text-muted-foreground border border-border px-3 py-[5px]">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats strip */}
              <div className="flex flex-wrap mt-7 border border-border w-fit">
                {[
                  {
                    v: <span className="flex items-center gap-[6px]">
                      {interviewer.rating} <Stars rating={interviewer.rating} />
                    </span>,
                    k: `${interviewer.reviewCount} reviews`,
                  },
                  { v: `${interviewer.experience} yrs`, k: 'Experience' },
                  { v: `${interviewer.reviewCount}+`, k: 'Sessions' },
                  { v: '98%', k: 'Response rate' },
                ].map((stat, i, arr) => (
                  <div
                    key={i}
                    className="px-[26px] py-[14px]"
                    style={{ borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <div className="text-xl font-medium tracking-[-0.01em] flex items-center gap-[6px]">
                      {stat.v}
                    </div>
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground mt-[5px]">
                      {stat.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ===== BODY GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 pb-24 pt-10">

          {/* Main content */}
          <main>
            {/* Tabs */}
            <div className="flex gap-1 border-b border-border mb-9">
              {([
                { key: 'about', label: 'About' },
                { key: 'avail', label: 'Availability' },
                { key: 'reviews', label: `Reviews`, count: interviewer.reviewCount },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`bg-none border-none cursor-pointer font-sans text-[13px] py-[14px] mr-7 relative transition-colors duration-200 ${
                    activeTab === tab.key ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{
                    background: 'none',
                    ...(activeTab === tab.key ? {} : {}),
                  }}
                >
                  {tab.label}
                  {'count' in tab && tab.count !== undefined && (
                    <span className="font-mono text-[11px] text-muted-foreground ml-[6px]">{tab.count}</span>
                  )}
                  {activeTab === tab.key && (
                    <span className="absolute left-0 right-0 bottom-[-1px] h-[2px]" style={{ background: 'var(--accent-deep)' }} />
                  )}
                </button>
              ))}
            </div>

            {/* About panel */}
            {activeTab === 'about' && (
              <div className="space-y-10">
                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground mb-[18px] font-normal">
                    Professional summary
                  </h3>
                  <p className="text-base font-light leading-[1.7] max-w-[640px]">{interviewer.bio}</p>
                  <p className="text-base font-light leading-[1.7] max-w-[640px] mt-4">
                    With {interviewer.experience} years of experience at {interviewer.company},{' '}
                    {interviewer.name.split(' ')[0]} has conducted hundreds of interviews and helped candidates succeed.
                    They specialize in {interviewer.skills.slice(0, 2).join(' and ')} and are passionate about helping
                    candidates prepare effectively — focusing on the reasoning behind answers, not just the answers themselves.
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground mb-[18px] font-normal">
                    Key strengths
                  </h3>
                  <ul className="max-w-[640px] list-none space-y-0">
                    {[
                      `Expert knowledge of the ${interviewer.company} hiring process and bar.`,
                      `Specializes in ${interviewer.skills[0]} and ${interviewer.skills[1]} at senior level.`,
                      'Constructive, specific feedback you can act on immediately.',
                    ].map((str, i) => (
                      <li key={i} className="flex gap-[14px] py-[14px] border-b border-border text-[15px] font-light leading-[1.5] last:border-none">
                        <span
                          className="flex-shrink-0 w-[22px] h-[22px] rounded-full border grid place-items-center mt-[1px]"
                          style={{ borderColor: 'var(--accent-deep)' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-[11px] h-[11px]" style={{ color: 'var(--accent-deep)' }}>
                            <path d="M5 12l5 5L20 6" />
                          </svg>
                        </span>
                        {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground mb-[18px] font-normal">
                    At a glance
                  </h3>
                  <div
                    className="grid grid-cols-3 max-w-[640px]"
                    style={{ gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}
                  >
                    {[
                      { v: '60 min', k: 'Typical session' },
                      { v: '~2 hrs', k: 'Avg. response' },
                      { v: languagesText, k: 'Languages' },
                    ].map((f, i) => (
                      <div key={i} className="bg-card p-5">
                        <div className="text-[22px] font-medium tracking-[-0.01em]">{f.v}</div>
                        <div className="text-[12px] font-light text-muted-foreground mt-1">{f.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Availability panel */}
            {activeTab === 'avail' && (
              <div className="space-y-9">
                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground mb-[18px] font-normal">
                    Session duration
                  </h3>
                  <div className="flex gap-[10px] max-w-[640px]">
                    {([30, 45, 60] as const).map(d => (
                      <button
                        key={d}
                        onClick={() => setDur(d)}
                        className={`flex-1 border cursor-pointer font-sans py-[14px] text-sm font-light transition-all duration-200 ${
                          dur === d ? 'text-background' : 'text-foreground hover:border-foreground'
                        }`}
                        style={{
                          background: dur === d ? 'var(--foreground)' : 'var(--card)',
                          borderColor: dur === d ? 'var(--foreground)' : 'var(--border-strong)',
                        }}
                      >
                        {d}m
                        <span
                          className="block font-mono text-[10.5px] mt-[3px] tracking-[0.08em]"
                          style={{ color: dur === d ? 'rgba(250,249,247,0.65)' : 'var(--muted-foreground)' }}
                        >
                          ${Math.round((interviewer.pricePerSession / 60) * d)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground mb-[18px] font-normal">
                    Available slots
                  </h3>
                  <div className="space-y-[14px] max-w-[640px]">
                    {interviewer.availability.map(block => (
                      <div key={block.day} className="border border-border">
                        <div className="flex items-center gap-[9px] px-[18px] py-[14px] border-b border-border" style={{ background: 'var(--input)' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <rect x="3" y="4" width="18" height="18" rx="1" /><path d="M3 9h18M8 2v4M16 2v4" />
                          </svg>
                          <span className="text-sm font-medium">{block.day}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-[10px] p-[18px]">
                          {block.times.map(time => {
                            const active = selectedSlot?.day === block.day && selectedSlot?.time === time
                            return (
                              <button
                                key={time}
                                onClick={() => setSelectedSlot(active ? null : { day: block.day, time })}
                                className="border font-mono text-[13px] py-[11px] px-2 cursor-pointer transition-all duration-200"
                                style={{
                                  background: active ? 'var(--foreground)' : 'var(--card)',
                                  color: active ? 'var(--background)' : 'var(--foreground)',
                                  borderColor: active ? 'var(--foreground)' : 'var(--border-strong)',
                                }}
                              >
                                {time}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews panel */}
            {activeTab === 'reviews' && (
              <div>
                {reviews.length === 0 ? (
                  <div className="max-w-[640px] py-16 text-center border border-dashed" style={{ borderColor: 'var(--border-strong)' }}>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block mb-3">
                      No reviews yet
                    </span>
                    <h3 className="text-xl font-light mb-2">Be the first to review {interviewer.name.split(' ')[0]}</h3>
                    <p className="font-light text-muted-foreground">
                      Reviews appear here after candidates complete a session.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Summary */}
                    <div className="flex gap-10 items-center p-[26px] border border-border mb-8 max-w-[640px] flex-wrap">
                      <div className="text-center">
                        <div className="font-light leading-none tracking-[-0.02em]" style={{ fontSize: 52 }}>
                          {interviewer.rating}
                        </div>
                        <div className="mt-2">
                          <Stars rating={interviewer.rating} />
                        </div>
                        <div className="text-[12px] font-light text-muted-foreground mt-2">
                          {interviewer.reviewCount} reviews
                        </div>
                      </div>
                      <div className="flex-1 min-w-[200px] flex flex-col gap-[7px]">
                        {ratingDist.map(d => (
                          <div key={d.s} className="flex items-center gap-[10px] font-mono text-[11px] text-muted-foreground">
                            <span>{d.s}★</span>
                            <div className="flex-1 h-[5px] overflow-hidden" style={{ background: 'var(--muted)' }}>
                              <div style={{ width: `${d.p}%`, height: '100%', background: 'var(--accent)' }} />
                            </div>
                            <span>{d.p}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews list */}
                    <div className="max-w-[640px]">
                      {reviews.map((rv) => (
                        <div key={rv.id} className="py-6 border-b border-border last:border-none">
                          <div className="flex items-center gap-3 mb-[14px]">
                            <div
                              className="w-10 h-10 rounded-full grid place-items-center font-mono text-[13px] font-medium text-white flex-shrink-0"
                              style={{ background: rv.tone }}
                            >
                              {initials(rv.name)}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{rv.name}</div>
                              <div className="text-[12px] font-light text-muted-foreground">{rv.date}</div>
                            </div>
                            <div className="ml-auto">
                              <Stars rating={rv.rating} size={13} />
                            </div>
                          </div>
                          <p className="text-[15px] font-light leading-[1.6]">{rv.text}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </main>

          {/* ===== BOOKING CARD ===== */}
          <aside>
            <div
              className="border bg-card lg:sticky lg:top-[92px]"
              style={{ borderColor: 'var(--border-strong)', boxShadow: '0 1px 2px rgba(26,20,16,0.04), 0 8px 24px -12px rgba(26,20,16,0.10)' }}
            >
              {/* Price */}
              <div className="p-6 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <span className="font-light tracking-[-0.02em]" style={{ fontSize: 38 }}>${price}</span>
                  <span className="text-sm font-light text-muted-foreground">/ session</span>
                </div>
                <p className="text-[13px] font-light text-muted-foreground mt-[6px]">
                  {dur}-minute live mock interview
                </p>
              </div>

              {/* Selection */}
              <div className="p-5 border-b border-border">
                {!selectedSlot ? (
                  <div className="flex gap-[11px] items-start">
                    <span className="flex-shrink-0 mt-[1px]" style={{ color: 'var(--accent-deep)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" />
                      </svg>
                    </span>
                    <p className="text-[13px] font-light text-muted-foreground leading-[1.45]">
                      Pick a time under <b className="font-medium text-foreground">Availability</b> to continue.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block mb-3">
                      Your selection
                    </span>
                    <div className="flex items-center gap-[10px] text-sm font-light py-1" style={{ color: 'var(--accent-deep)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <rect x="3" y="4" width="18" height="18" rx="1" /><path d="M3 9h18M8 2v4M16 2v4" />
                      </svg>
                      <span className="text-foreground">{selectedSlot.day}</span>
                    </div>
                    <div className="flex items-center gap-[10px] text-sm font-light py-1" style={{ color: 'var(--accent-deep)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" />
                      </svg>
                      <span className="text-foreground">{selectedSlot.time}</span>
                      <span className="text-muted-foreground">· {dur} min</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="p-5 border-b border-border flex flex-col gap-[11px]">
                {[
                  { k: 'Session duration', v: `${dur} min` },
                  { k: 'Interviewer rate', v: `$${price}` },
                ].map(row => (
                  <div key={row.k} className="flex justify-between text-[13px] font-light">
                    <span className="text-muted-foreground">{row.k}</span>
                    <span>{row.v}</span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline border-t border-border pt-[13px] mt-[3px]">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-medium">${price}</span>
                </div>
              </div>

              {/* Included */}
              <div className="p-5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block mb-[14px]">
                  What&apos;s included
                </span>
                <ul className="space-y-[11px]">
                  {['Live interview session', 'Recording & transcript', 'Detailed human feedback', 'AI performance report'].map(item => (
                    <li key={item} className="flex items-center gap-[11px] text-[13.5px] font-light">
                      <span className="w-[18px] h-[18px] rounded-full grid place-items-center flex-shrink-0" style={{ background: 'var(--muted)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-[10px] h-[10px]" style={{ color: 'var(--accent-deep)' }}>
                          <path d="M5 12l5 5L20 6" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleBook}
                  disabled={!selectedSlot}
                  className="w-full border-none cursor-pointer font-sans py-[17px] text-[12px] uppercase tracking-[0.14em] text-background transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--foreground)' }}
                  onMouseEnter={e => { if (selectedSlot) (e.target as HTMLElement).style.background = 'var(--accent-deep)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = 'var(--foreground)' }}
                >
                  {selectedSlot ? 'Continue to checkout' : 'Select a time'}
                </button>
                <p className="text-center text-[11.5px] font-light text-muted-foreground mt-[14px]">
                  Free cancellation up to 24 hours before
                </p>
              </div>
            </div>
          </aside>
        </div>

        <SimilarCoaches currentId={interviewer.id} company={interviewer.company} skills={interviewer.skills} />
      </div>
    </div>
  )
}
