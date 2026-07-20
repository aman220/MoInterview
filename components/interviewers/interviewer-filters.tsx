'use client'

import { useMemo } from 'react'
import type { Interviewer } from '@/lib/types'

const CANDIDATE_SKILLS = ['System Design', 'DSA', 'Algorithms', 'Behavioral', 'Leadership', 'PM Interview', 'Front-end', 'Back-end', 'ML/AI', 'JavaScript', 'Python']
const RATINGS = [0, 4.7, 4.8, 4.9]

function Checkbox({
  label, count, checked, onChange,
}: {
  label: string; count?: number; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-[11px] cursor-pointer py-[5px] text-sm font-light text-foreground select-none group">
      <input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span
        className="w-4 h-4 border flex-shrink-0 grid place-items-center transition-all duration-[180ms] group-hover:border-foreground"
        style={{
          background: checked ? 'var(--foreground)' : 'transparent',
          borderColor: checked ? 'var(--foreground)' : 'var(--border-strong)',
        }}
      >
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[10px] h-[10px]">
            <path d="M5 12l5 5L20 6" />
          </svg>
        )}
      </span>
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="font-mono text-[11px] text-[#b3a594]">{count}</span>
      )}
    </label>
  )
}

function RadioRow({
  label, value, selected, onChange,
}: {
  label: string; value: number; selected: number; onChange: (v: number) => void
}) {
  const on = selected === value
  return (
    <label className="flex items-center gap-[11px] cursor-pointer py-[5px] text-sm font-light text-foreground select-none">
      <input type="radio" name="rating-filter" className="sr-only" checked={on} onChange={() => onChange(value)} />
      <span
        className="w-4 h-4 border flex-shrink-0 grid place-items-center transition-all duration-[180ms]"
        style={{
          background: on ? 'var(--foreground)' : 'transparent',
          borderColor: on ? 'var(--foreground)' : 'var(--border-strong)',
        }}
      >
        {on && (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[10px] h-[10px]">
            <path d="M5 12l5 5L20 6" />
          </svg>
        )}
      </span>
      {label}
    </label>
  )
}

export interface FilterState {
  companies: Set<string>
  skills: Set<string>
  maxPrice: number
  minExp: number
  minRating: number
}

interface InterviewerFiltersProps {
  /** Live interviewer set — drives the company/skill facet options + counts. */
  interviewers: Interviewer[]
  state: FilterState
  onCompanyToggle: (c: string, checked: boolean) => void
  onSkillToggle: (s: string, checked: boolean) => void
  onPriceChange: (v: number) => void
  onExpChange: (v: number) => void
  onRatingChange: (v: number) => void
  onReset: () => void
}

export default function InterviewerFilters({
  interviewers,
  state,
  onCompanyToggle,
  onSkillToggle,
  onPriceChange,
  onExpChange,
  onRatingChange,
  onReset,
}: InterviewerFiltersProps) {
  // Facets derive from the live data so options + counts stay accurate.
  const companies = useMemo(
    () => [...new Set(interviewers.map((i) => i.company).filter(Boolean))].sort(),
    [interviewers],
  )
  const companyCount = useMemo(() => {
    const m = new Map<string, number>()
    interviewers.forEach((i) => m.set(i.company, (m.get(i.company) ?? 0) + 1))
    return m
  }, [interviewers])
  const skills = useMemo(
    () => CANDIDATE_SKILLS.filter((s) => interviewers.some((i) => i.skills.includes(s))),
    [interviewers],
  )
  const skillCount = (sk: string) => interviewers.filter((i) => i.skills.includes(sk)).length

  return (
    <div>
      <div className="flex items-baseline justify-between pb-4 mb-[22px] border-b border-border">
        <h2 className="text-sm font-medium">Filters</h2>
        <button
          onClick={onReset}
          className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground hover:text-accent-deep transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          Reset all
        </button>
      </div>

      {/* Company */}
      <div className="py-[22px] border-b border-border">
        <span className="block mb-[15px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          Company
        </span>
        {companies.length === 0 && (
          <p className="text-[12.5px] font-light text-muted-foreground">No companies yet</p>
        )}
        {companies.map(c => (
          <Checkbox
            key={c}
            label={c}
            count={companyCount.get(c)}
            checked={state.companies.has(c)}
            onChange={v => onCompanyToggle(c, v)}
          />
        ))}
      </div>

      {/* Focus area */}
      <div className="py-[22px] border-b border-border">
        <span className="block mb-[15px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          Focus area
        </span>
        {skills.length === 0 && (
          <p className="text-[12.5px] font-light text-muted-foreground">No focus areas yet</p>
        )}
        {skills.map(sk => (
          <Checkbox
            key={sk}
            label={sk}
            count={skillCount(sk)}
            checked={state.skills.has(sk)}
            onChange={v => onSkillToggle(sk, v)}
          />
        ))}
      </div>

      {/* Price */}
      <div className="py-[22px] border-b border-border">
        <span className="block mb-[15px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          Price per hour
        </span>
        <div className="text-[13px] font-light text-muted-foreground mb-[14px]">
          Up to <b className="text-foreground font-medium">${state.maxPrice}</b>
        </div>
        <input
          type="range"
          className="design-range"
          min={80}
          max={200}
          step={10}
          value={state.maxPrice}
          onChange={e => onPriceChange(Number(e.target.value))}
        />
      </div>

      {/* Experience */}
      <div className="py-[22px] border-b border-border">
        <span className="block mb-[15px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          Min. experience
        </span>
        <div className="text-[13px] font-light text-muted-foreground mb-[14px]">
          <b className="text-foreground font-medium">{state.minExp}+</b> years
        </div>
        <input
          type="range"
          className="design-range"
          min={0}
          max={12}
          step={1}
          value={state.minExp}
          onChange={e => onExpChange(Number(e.target.value))}
        />
      </div>

      {/* Rating */}
      <div className="pt-[22px]">
        <span className="block mb-[15px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          Min. rating
        </span>
        {RATINGS.map(r => (
          <RadioRow
            key={r}
            label={r === 0 ? 'Any rating' : `${r}+ stars`}
            value={r}
            selected={state.minRating}
            onChange={onRatingChange}
          />
        ))}
      </div>
    </div>
  )
}
