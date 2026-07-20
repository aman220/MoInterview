'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchInterviewers } from '@/lib/interviewers'
import type { Interviewer } from '@/lib/types'

const companyTones: Record<string, string> = {
  Google: '#4285F4', Meta: '#0866FF', Amazon: '#d98a2b', Microsoft: '#5b9bd5',
  Apple: '#555555', Netflix: '#c14b4b', Stripe: '#635bff',
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

/** Scores a candidate coach by relevance to the current one (company + shared skills). */
function score(a: Interviewer, company: string, skills: string[]): number {
  let s = 0
  if (a.company && a.company === company) s += 3
  s += a.skills.filter((sk) => skills.includes(sk)).length
  return s
}

export function SimilarCoaches({
  currentId,
  company,
  skills,
}: {
  currentId: string
  company: string
  skills: string[]
}) {
  const [coaches, setCoaches] = useState<Interviewer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchInterviewers(controller.signal)
      .then((all) => {
        const ranked = all
          .filter((i) => i.id !== currentId)
          .map((i) => ({ i, s: score(i, company, skills) }))
          .sort((a, b) => b.s - a.s || b.i.rating - a.i.rating)
          .slice(0, 3)
          .map((x) => x.i)
        setCoaches(ranked)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => controller.abort()
  }, [currentId, company, skills])

  if (loading || coaches.length === 0) return null

  return (
    <section className="pb-20">
      <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground mb-[18px] font-normal">
        Similar coaches
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
        {coaches.map((c) => {
          const tone = companyTones[c.company] || '#8b7355'
          return (
            <Link
              key={c.id}
              href={`/interviewer/${c.id}`}
              className="border border-border bg-card p-5 no-underline text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong"
              style={{ boxShadow: '0 1px 2px rgba(26,20,16,0.04)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex-shrink-0 grid place-items-center font-mono text-sm font-medium text-white"
                  style={{ background: tone }}
                >
                  {initials(c.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{c.name}</div>
                  <div className="text-[12px] font-light text-muted-foreground truncate">{c.company}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-[12.5px]">
                <span className="font-light text-muted-foreground">
                  {c.rating > 0 ? `★ ${c.rating}` : 'New'}
                </span>
                {c.pricePerSession > 0 && (
                  <span className="font-medium">
                    ${c.pricePerSession}
                    <span className="font-light text-muted-foreground">/hr</span>
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
