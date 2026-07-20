'use client'

import Link from 'next/link'
import { useState } from 'react'
import { type Interviewer } from '@/lib/types'

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

function availText(nextAvailable: Date) {
  const diff = Math.round((nextAvailable.getTime() - Date.now()) / 86400000)
  if (diff <= 1) return 'Tomorrow'
  if (diff <= 3) return `In ${diff} days`
  return nextAvailable.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <span className="inline-flex gap-[2px]" style={{ color: 'var(--accent)' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={13} height={13} fill={i < full ? 'currentColor' : '#e8ddd3'}>
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 16.9 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6z" />
        </svg>
      ))}
    </span>
  )
}

interface InterviewerCardProps {
  interviewer: Interviewer
}

export default function InterviewerCard({ interviewer }: InterviewerCardProps) {
  const [saved, setSaved] = useState(false)
  const tone = companyTones[interviewer.company] || '#8b7355'
  const avail = availText(interviewer.nextAvailable)
  const hasPrice = interviewer.pricePerSession > 0

  return (
    <article
      className="bg-card border border-border flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
      style={{ boxShadow: '0 1px 2px rgba(26,20,16,0.04), 0 8px 24px -12px rgba(26,20,16,0.10)' }}
    >
      {/* Top row: avatar + info + save */}
      <div className="p-[22px] pb-[18px] flex gap-[15px]">
        <div
          className="w-14 h-14 rounded-full flex-shrink-0 grid place-items-center font-mono font-medium text-lg text-white relative"
          style={{ background: tone }}
        >
          {initials(interviewer.name)}
          <span
            className="absolute bottom-[-2px] right-[-2px] w-[18px] h-[18px] rounded-full border-2 border-card grid place-items-center"
            style={{ background: 'var(--accent-deep)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" width={9} height={9}>
              <path d="M5 12l5 5L20 6" />
            </svg>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[17px] font-medium tracking-[-0.01em] leading-[1.2]">{interviewer.name}</div>
          <div className="text-[13px] font-light text-muted-foreground mt-[2px]">{interviewer.role}</div>
          <div
            className="inline-flex items-center gap-[6px] mt-[9px] font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: 'var(--accent-deep)' }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-current" />
            {interviewer.company}
          </div>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className="flex-shrink-0 p-1 transition-all duration-200 self-start"
          style={{ color: saved ? 'var(--accent-deep)' : '#c3b6a5' }}
          aria-label="Save"
        >
          <svg width={19} height={19} viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-[9px] px-[22px] pb-4 text-[13px]">
        <Stars rating={interviewer.rating} />
        <span className="font-medium">{interviewer.rating}</span>
        <span className="text-muted-foreground font-light">({interviewer.reviewCount} reviews)</span>
      </div>

      {/* Bio */}
      <p className="px-[22px] pb-5 text-[13.5px] font-light leading-[1.5] text-muted-foreground line-clamp-2">
        {interviewer.bio}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-border">
        {[
          { v: hasPrice ? `$${interviewer.pricePerSession}` : '—', unit: hasPrice ? '/hr' : '', k: 'Rate' },
          { v: `${interviewer.experience}`, unit: 'yrs', k: 'Experience' },
          { v: `${interviewer.reviewCount}`, unit: '', k: 'Sessions' },
        ].map((stat, i) => (
          <div key={i} className={`py-[15px] px-2 text-center ${i < 2 ? 'border-r border-border' : ''}`}>
            <div className="text-[17px] font-medium tracking-[-0.01em]">
              {stat.v}
              <span className="text-[11px] font-light text-muted-foreground">{stat.unit}</span>
            </div>
            <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
              {stat.k}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="px-[22px] pt-[18px] pb-2 flex flex-wrap gap-[7px] border-t border-border">
        {interviewer.skills.slice(0, 3).map(skill => (
          <span key={skill} className="text-[11.5px] font-light text-muted-foreground border border-border px-[10px] py-1">
            {skill}
          </span>
        ))}
        {interviewer.skills.length > 3 && (
          <span className="text-[11.5px] font-light px-[2px] py-1" style={{ color: 'var(--accent-deep)' }}>
            +{interviewer.skills.length - 3}
          </span>
        )}
      </div>

      {/* Availability */}
      <div className="px-[22px] py-[8px] pb-[18px] flex items-center gap-[7px] text-[12px] font-light text-muted-foreground">
        <span
          className="w-[6px] h-[6px] rounded-full flex-shrink-0"
          style={{ background: '#5fae7e', boxShadow: '0 0 0 3px rgba(95,174,126,0.16)' }}
        />
        Next available{' '}
        <b className="text-foreground font-medium">{avail}</b>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 border-t border-border mt-auto">
        <Link
          href={`/interviewer/${interviewer.id}`}
          className="py-4 text-center text-[11px] uppercase tracking-[0.14em] font-light bg-card text-foreground border-r border-border hover:bg-muted transition-all duration-200 no-underline"
        >
          View profile
        </Link>
        <Link
          href={`/booking?interviewer=${interviewer.id}`}
          className="py-4 text-center text-[11px] uppercase tracking-[0.14em] font-light text-background hover:opacity-90 transition-all duration-200 no-underline"
          style={{ background: 'var(--foreground)' }}
        >
          {hasPrice ? (
            <>Book · <span className="font-mono">${interviewer.pricePerSession}</span></>
          ) : (
            'Book a session'
          )}
        </Link>
      </div>
    </article>
  )
}
