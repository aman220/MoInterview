'use client'

import { useState, useMemo, useRef } from 'react'
import { mockInterviewers } from '@/lib/mock-data'
import InterviewerCard from './interviewer-card'
import InterviewerFilters, { type FilterState } from './interviewer-filters'

const SUGGEST = ['System Design', 'Google', 'Behavioral', 'Product Manager']

export default function InterviewersGrid() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<FilterState>({
    companies: new Set(),
    skills: new Set(),
    maxPrice: 200,
    minExp: 0,
    minRating: 0,
  })
  const [sort, setSort] = useState('rating')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    const { companies, skills, maxPrice, minExp, minRating } = filterState
    let r = mockInterviewers.filter(i => {
      if (companies.size && !companies.has(i.company)) return false
      if (skills.size && ![...skills].some(s => i.skills.includes(s))) return false
      if (i.pricePerSession > maxPrice) return false
      if (i.experience < minExp) return false
      if (i.rating < minRating) return false
      if (search.trim()) {
        const hay = `${i.name} ${i.company} ${i.role} ${i.skills.join(' ')} ${i.bio}`.toLowerCase()
        if (!hay.includes(search.toLowerCase().trim())) return false
      }
      return true
    })
    r = [...r]
    if (sort === 'rating') r.sort((a, b) => b.rating - a.rating)
    else if (sort === 'reviews') r.sort((a, b) => b.reviewCount - a.reviewCount)
    else if (sort === 'price') r.sort((a, b) => a.pricePerSession - b.pricePerSession)
    else if (sort === 'experience') r.sort((a, b) => b.experience - a.experience)
    else r.sort((a, b) => a.nextAvailable.getTime() - b.nextAvailable.getTime())
    return r
  }, [search, filterState, sort])

  const activeCount =
    filterState.companies.size +
    filterState.skills.size +
    (filterState.maxPrice < 200 ? 1 : 0) +
    (filterState.minExp > 0 ? 1 : 0) +
    (filterState.minRating > 0 ? 1 : 0) +
    (search.trim() ? 1 : 0)

  function reset() {
    setSearch('')
    setFilterState({ companies: new Set(), skills: new Set(), maxPrice: 200, minExp: 0, minRating: 0 })
    if (searchRef.current) searchRef.current.value = ''
  }

  function setQ(q: string) {
    setSearch(q)
    if (searchRef.current) searchRef.current.value = q
  }

  function companyToggle(c: string, v: boolean) {
    setFilterState(prev => {
      const s = new Set(prev.companies)
      v ? s.add(c) : s.delete(c)
      return { ...prev, companies: s }
    })
  }

  function skillToggle(sk: string, v: boolean) {
    setFilterState(prev => {
      const s = new Set(prev.skills)
      v ? s.add(sk) : s.delete(sk)
      return { ...prev, skills: s }
    })
  }

  const filterSidebar = (
    <InterviewerFilters
      state={filterState}
      onCompanyToggle={companyToggle}
      onSkillToggle={skillToggle}
      onPriceChange={v => setFilterState(p => ({ ...p, maxPrice: v }))}
      onExpChange={v => setFilterState(p => ({ ...p, minExp: v }))}
      onRatingChange={v => setFilterState(p => ({ ...p, minRating: v }))}
      onReset={reset}
    />
  )

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO HEADER ===== */}
      <header className="border-b border-border" style={{ padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,56px) clamp(36px,5vw,52px)' }}>
        <div className="max-w-[1240px] mx-auto">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] mb-[18px]" style={{ color: 'var(--accent-deep)' }}>
            Coaches · 1,200+ vetted experts
          </p>
          <h1 className="font-light leading-[0.98] tracking-[-0.02em]" style={{ fontSize: 'clamp(44px,7vw,76px)' }}>
            Find your <em className="not-italic" style={{ color: 'var(--accent-deep)' }}>coach</em>
          </h1>
          <p className="font-light text-muted-foreground max-w-[540px] mt-5" style={{ fontSize: 'clamp(15px,1.6vw,18px)' }}>
            Practice with engineers, PMs and leaders from the companies you&apos;re targeting — and get the unfiltered feedback that gets you hired.
          </p>

          {/* Search bar */}
          <div className="mt-[38px] max-w-[720px]">
            <div
              className="flex items-center gap-[14px] bg-card h-16 px-[18px] transition-all duration-200"
              style={{ border: '1px solid var(--border-strong)' }}
              onFocus={e => (e.currentTarget.style.cssText += ';border-color:var(--foreground);box-shadow:0 0 0 3px rgba(200,153,104,0.12)')}
              onBlur={e => (e.currentTarget.style.cssText += ';border-color:var(--border-strong);box-shadow:none')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="flex-shrink-0 text-muted-foreground">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by name, company, role or skill…"
                onChange={e => setSearch(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent text-base font-light text-foreground placeholder:text-[#a89c8d]"
              />
              <button
                className="flex-shrink-0 h-10 px-[22px] text-[11px] uppercase tracking-[0.15em] cursor-pointer transition-colors duration-200 text-background font-sans"
                style={{ background: 'var(--foreground)' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.background = 'var(--accent-deep)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.background = 'var(--foreground)')}
              >
                Search
              </button>
            </div>

            {/* Suggest chips */}
            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mr-1">Try</span>
              {SUGGEST.map(q => (
                <button
                  key={q}
                  onClick={() => setQ(q)}
                  className="text-[12.5px] font-light text-muted-foreground border border-border bg-transparent px-[13px] py-[5px] rounded-full cursor-pointer font-sans hover:border-foreground hover:text-foreground transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main style={{ padding: 'clamp(28px,4vw,48px) clamp(20px,5vw,56px) 96px' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[248px_1fr] gap-[44px] items-start">

            {/* Desktop filter sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-[92px]">
                {filterSidebar}
              </div>
            </div>

            {/* Results column */}
            <section>
              {/* Results bar */}
              <div className="flex items-center justify-between gap-4 mb-[22px] flex-wrap">
                <p className="text-sm font-light text-muted-foreground">
                  <b className="text-foreground font-medium">{filtered.length}</b> coaches available
                </p>
                <div className="flex items-center gap-[14px]">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-[9px] bg-card cursor-pointer font-sans text-[12px] uppercase tracking-[0.12em] px-[18px] py-[11px] text-foreground transition-colors"
                    style={{ border: '1px solid var(--border-strong)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 6h18M6 12h12M10 18h4" />
                    </svg>
                    Filters
                    {activeCount > 0 && (
                      <span className="bg-foreground text-background rounded-full px-[7px] py-[1px] text-[10px] font-mono">
                        {activeCount}
                      </span>
                    )}
                  </button>

                  {/* Sort select */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">Sort</span>
                    <div className="relative">
                      <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="appearance-none bg-card font-sans text-[13px] font-light text-foreground py-2 pl-3 pr-9 cursor-pointer outline-none transition-colors"
                        style={{ border: '1px solid var(--border-strong)' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--foreground)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
                      >
                        <option value="rating">Highest rated</option>
                        <option value="reviews">Most reviewed</option>
                        <option value="price">Lowest price</option>
                        <option value="experience">Most experience</option>
                        <option value="availability">Soonest available</option>
                      </select>
                      <div className="absolute right-[14px] top-1/2 -translate-y-[70%] w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-muted-foreground rotate-45 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active chips */}
              {activeCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {search.trim() && (
                    <ChipTag label={`"${search}"`} onRemove={() => { setSearch(''); if (searchRef.current) searchRef.current.value = '' }} />
                  )}
                  {[...filterState.companies].map(c => (
                    <ChipTag key={c} label={c} onRemove={() => companyToggle(c, false)} />
                  ))}
                  {[...filterState.skills].map(sk => (
                    <ChipTag key={sk} label={sk} onRemove={() => skillToggle(sk, false)} />
                  ))}
                  {filterState.maxPrice < 200 && (
                    <ChipTag label={`≤ $${filterState.maxPrice}/hr`} onRemove={() => setFilterState(p => ({ ...p, maxPrice: 200 }))} />
                  )}
                  {filterState.minExp > 0 && (
                    <ChipTag label={`${filterState.minExp}+ yrs`} onRemove={() => setFilterState(p => ({ ...p, minExp: 0 }))} />
                  )}
                  {filterState.minRating > 0 && (
                    <ChipTag label={`${filterState.minRating}+ ★`} onRemove={() => setFilterState(p => ({ ...p, minRating: 0 }))} />
                  )}
                </div>
              )}

              {/* Grid or empty state */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
                  {filtered.map(i => <InterviewerCard key={i.id} interviewer={i} />)}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed" style={{ borderColor: 'var(--border-strong)' }}>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground block mb-3">
                    No matches
                  </span>
                  <h3 className="text-2xl font-light mb-2">No coaches fit those filters</h3>
                  <p className="font-light text-muted-foreground mb-[22px]">
                    Try widening your price range or clearing a filter.
                  </p>
                  <button
                    onClick={reset}
                    className="bg-foreground text-background border-none cursor-pointer font-sans px-7 py-[13px] text-[11px] uppercase tracking-[0.14em] hover:bg-accent-deep transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* ===== MOBILE DRAWER ===== */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(26,20,16,0.4)', backdropFilter: 'blur(2px)' }}
        onClick={e => { if (e.target === e.currentTarget) setDrawerOpen(false) }}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 bg-background p-6 overflow-y-auto transition-transform duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ width: 'min(340px, 86vw)', boxShadow: '-20px 0 50px -20px rgba(0,0,0,0.3)' }}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-[22px] right-[22px] bg-transparent border-none cursor-pointer text-muted-foreground"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          {filterSidebar}
        </div>
      </div>
    </div>
  )
}

function ChipTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 bg-muted border border-border px-[13px] py-[6px] pr-2 text-[12.5px] font-normal text-foreground">
      {label}
      <button onClick={onRemove} className="text-muted-foreground hover:text-accent-deep transition-colors p-0 border-none bg-transparent cursor-pointer leading-none">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </span>
  )
}
