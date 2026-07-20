'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import type { BlogPost, Block } from '@/lib/blog'
import { tableOfContents, formatShortDate } from '@/lib/blog'
import styles from './article.module.css'

/* ---- inline icons (match the design, no icon dependency) ---- */
const I = {
  clap: <path d="M11 5.5V2M15 6.5l1.8-2.6M7 6.5L5.2 3.9M8 13a4 4 0 0 1 8 0v2a5 5 0 0 1-5 5h-1a6 6 0 0 1-6-6v-1a2 2 0 0 1 4 0" />,
  clapMobile: <path d="M8 13a4 4 0 0 1 8 0v2a5 5 0 0 1-5 5h-1a6 6 0 0 1-6-6v-1a2 2 0 0 1 4 0" />,
  comment: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  bookmark: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 10.6l6.8-3.8M8.6 13.4l6.8 3.8" /></>,
  thumbUp: <path d="M7 22V11M2 13v7a2 2 0 0 0 2 2h12.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 18 11h-5V5a2 2 0 0 0-2-2L7 11" />,
  thumbDown: <path d="M17 2v11M22 11V4a2 2 0 0 0-2-2H7.5a2 2 0 0 0-2 1.6L4.1 10.6A2 2 0 0 0 6 13h5v6a2 2 0 0 0 2 2l5-8" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  arrowUp: <path d="M12 19V5M5 12l7-7 7 7" />,
  copy: <><rect x="9" y="9" width="12" height="12" rx="1" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></>,
  sparkle: <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />,
}
const Svg = ({ children, stroke = true }: { children: React.ReactNode; stroke?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={stroke ? 'none' : 'currentColor'} stroke={stroke ? 'currentColor' : 'none'} strokeWidth={stroke ? 1.8 : undefined}>{children}</svg>
)

export function ArticleReader({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const toc = tableOfContents(post)
  const bodyRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)
  const [fontSize, setFontSize] = useState(19)
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? '')
  const [claps, setClaps] = useState(1284)
  const [clapped, setClapped] = useState(false)
  const [saved, setSaved] = useState(false)
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)
  const [yes, setYes] = useState(212)
  const [no, setNo] = useState(14)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [showTop, setShowTop] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [sel, setSel] = useState<{ text: string; x: number; y: number } | null>(null)
  const [comments, setComments] = useState<{ name: string; initials: string; time: string; text: string; tone: string; isNew?: boolean }[]>([
    { name: 'Rahul Kapoor', initials: 'RK', time: '2 days ago', tone: 'var(--ai-2)', text: 'The Reflection beat is the one nobody adds on their own. Added it to my Amazon LP stories and my mock scores jumped noticeably.' },
    { name: 'Sofia Lin', initials: 'SL', time: '4 days ago', tone: 'var(--ai-4)', text: 'Timing myself was the unlock. I thought my stories were 90 seconds — they were closer to 4 minutes until I recorded one.' },
    { name: 'David Adeyemi', initials: 'DA', time: '6 days ago', tone: 'var(--ai-3)', text: 'Would love a follow-up on how to adapt the same story for both “conflict” and “failure” prompts without it sounding rehearsed.' },
  ])
  const [commentInput, setCommentInput] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flash = useCallback((msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }, [])

  // Reading progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100
      setProgress(Math.min(100, Math.max(0, pct)))
      setShowTop(window.scrollY > 700)
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  // TOC scrollspy
  useEffect(() => {
    const root = bodyRef.current
    if (!root) return
    const headings = [...root.querySelectorAll('h2[id]')]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId((e.target as HTMLElement).id) }),
      { rootMargin: '-20% 0px -70% 0px' },
    )
    headings.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [])

  // Text-selection toolbar
  useEffect(() => {
    const root = bodyRef.current
    if (!root) return
    const onUp = () => {
      const s = window.getSelection()
      if (s && s.toString().trim().length > 3 && root.contains(s.anchorNode)) {
        const r = s.getRangeAt(0).getBoundingClientRect()
        setSel({ text: s.toString(), x: r.left + r.width / 2 - 40, y: r.top - 50 + window.scrollY })
      } else {
        setSel(null)
      }
    }
    root.addEventListener('mouseup', onUp)
    const onDown = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('[data-seltoolbar]')) setSel(null) }
    document.addEventListener('mousedown', onDown)
    return () => { root.removeEventListener('mouseup', onUp); document.removeEventListener('mousedown', onDown) }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const changeFont = (delta: number) => {
    const next = Math.min(24, Math.max(15, fontSize + delta))
    setFontSize(next)
  }
  const doClap = () => { setClaps((c) => c + 1); setClapped(true) }
  const toggleSave = () => { setSaved((s) => { flash(!s ? 'Saved to your reading list' : 'Removed from reading list'); return !s }) }
  const doShare = () => { navigator.clipboard?.writeText(window.location.href).then(() => flash('Link copied to clipboard')).catch(() => flash('Link: ' + window.location.href)) }
  const jumpComments = () => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })
  const toggleCheck = (key: string) => setChecked((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })
  const voteYes = () => { if (vote === 'yes') return; if (vote === 'no') setNo((n) => n - 1); setYes((y) => y + 1); setVote('yes') }
  const voteNo = () => { if (vote === 'no') return; if (vote === 'yes') setYes((y) => y - 1); setNo((n) => n + 1); setVote('no') }
  const postComment = () => {
    const v = commentInput.trim()
    if (!v) return
    setComments((prev) => [{ name: 'You', initials: 'YOU', time: 'just now', tone: 'var(--ai-1)', text: v, isNew: true }, ...prev])
    setCommentInput('')
  }

  return (
    <div className={styles.reader} style={{ ['--art-fs' as string]: `${fontSize}px` } as React.CSSProperties}>
      <div className={styles.progress} style={{ width: `${progress}%` }} />

      {/* HEADER */}
      <header className={styles.artHead}>
        <span className={styles.catPill}>{post.category}</span>
        <h1 className={styles.artTitle}>{post.title}</h1>
        <p className={styles.artSub}>{post.excerpt}</p>
        <div className={styles.byline}>
          <span className={`${styles.av} ${styles.bylineAv}`}>{post.author.initials}</span>
          <div>
            <div className={styles.blName}>{post.author.name}</div>
            <div className={styles.blMeta}>{post.author.role} · MoInterview Coach · {formatShortDate(post.date)} · {post.readingMinutes} min read</div>
          </div>
          <div className={styles.blActions}>
            <div className={styles.fsize}>
              <button onClick={() => changeFont(-1.5)} aria-label="Decrease text size">A-</button>
              <button onClick={() => changeFont(1.5)} aria-label="Increase text size">A+</button>
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      <div className={styles.artCover}>
        <div className={styles.coverImg}><span>cover image — {post.coverCaption}</span></div>
      </div>

      {/* LAYOUT */}
      <div className={styles.artLayout}>
        {/* LEFT RAIL */}
        <aside className={styles.rail}>
          <button className={`${styles.railBtn} ${clapped ? styles.active : ''}`} onClick={doClap} aria-label="Clap"><Svg>{I.clap}</Svg></button>
          <span className={styles.railCount}>{claps.toLocaleString()}</span>
          <div className={styles.railDiv} />
          <button className={styles.railBtn} onClick={jumpComments} aria-label="Comments"><Svg>{I.comment}</Svg></button>
          <span className={styles.railCount}>{comments.length}</span>
          <div className={styles.railDiv} />
          <button className={`${styles.railBtn} ${saved ? styles.active : ''}`} onClick={toggleSave} aria-label="Bookmark"><Svg>{I.bookmark}</Svg></button>
          <button className={styles.railBtn} onClick={doShare} aria-label="Share"><Svg>{I.share}</Svg></button>
        </aside>

        {/* ARTICLE BODY */}
        <article className={styles.articleBody} ref={bodyRef}>
          <details className={styles.tocMobile}>
            <summary>Contents<Svg><path d="M6 9l6 6 6-6" /></Svg></summary>
            <ul>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); scrollTo(t.id) }}>{t.label}</a></li>)}</ul>
          </details>

          {post.content.map((block, i) => <BlockView key={i} block={block} idx={i} checked={checked} onToggle={toggleCheck} />)}
        </article>

        {/* RIGHT TOC */}
        <aside className={styles.tocSide}>
          <div className={styles.tocBox}>
            <div className={styles.tocTitle}>In this article</div>
            <ul>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={activeId === t.id ? styles.active : ''} onClick={(e) => { e.preventDefault(); scrollTo(t.id) }}>{t.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ctaCard}>
            <div className={styles.ci}><Svg stroke={false}>{I.sparkle}</Svg></div>
            <h4>Get feedback on your own stories</h4>
            <p>Book a mock round with a real interviewer and get an AI-scored report within 48 hours.</p>
            <Link className={`${styles.btn} ${styles.btnSolid}`} href="/find-interviewers">Find a coach</Link>
          </div>
        </aside>
      </div>

      {/* AUTHOR */}
      <div className={styles.authorCard}>
        <span className={styles.av}>{post.author.initials}</span>
        <div>
          <h4>{post.author.name}</h4>
          <div className={styles.role}>{post.author.role}</div>
          <p>{post.author.bio}</p>
        </div>
      </div>

      {/* HELPFUL */}
      <div className={styles.helpful}>
        <p>Was this article helpful?</p>
        <div className={styles.helpfulBtns}>
          <button className={`${styles.hbtn} ${vote === 'yes' ? styles.sel : ''}`} onClick={voteYes}><Svg>{I.thumbUp}</Svg>Yes <span>({yes})</span></button>
          <button className={`${styles.hbtn} ${vote === 'no' ? `${styles.sel} ${styles.selNo}` : ''}`} onClick={voteNo}><Svg>{I.thumbDown}</Svg>No <span>({no})</span></button>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className={styles.relatedSec}>
          <h3>More on interview prep</h3>
          <div className={styles.relGrid}>
            {related.map((r) => (
              <Link key={r.slug} className={styles.relCard} href={`/blog/${r.slug}`}>
                <div className={styles.relThumb} />
                <div className={styles.relBody}>
                  <div className={styles.relCat}>{r.category}</div>
                  <h4>{r.title}</h4>
                  <div className={styles.rmeta}>{formatShortDate(r.date)} · {r.readingMinutes} min read</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* COMMENTS */}
      <div className={styles.commentsSec} id="comments">
        <h3>Discussion ({comments.length})</h3>
        <div className={styles.cForm}>
          <textarea placeholder="Share how you use STAR-R, or ask a question…" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
          <div className={styles.cFormFoot}>
            <span>Be specific — vague comments get vague replies.</span>
            <button className={`${styles.btn} ${styles.btnSolid}`} style={{ padding: '10px 20px' }} onClick={postComment}>Post</button>
          </div>
        </div>
        <div>
          {comments.map((c, i) => (
            <div key={i} className={`${styles.comment} ${c.isNew ? styles.commentNew : ''}`}>
              <span className={styles.av} style={{ background: c.tone }}>{c.initials}</span>
              <div>
                <span className={styles.cname}>{c.name}</span><span className={styles.ctime}>{c.time}</span>
                <div className={styles.ctext}>{c.text}</div>
                <div className={styles.cactions}>
                  <button><Svg>{I.thumbUp}</Svg>0</button>
                  <button>Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING */}
      <div className={styles.mobileRail}>
        <button className={clapped ? styles.active : ''} onClick={doClap}><Svg>{I.clapMobile}</Svg><span>{claps.toLocaleString()}</span></button>
        <button onClick={jumpComments}><Svg>{I.comment}</Svg><span>{comments.length}</span></button>
        <button className={saved ? styles.active : ''} onClick={toggleSave}><Svg>{I.bookmark}</Svg><span>Save</span></button>
        <button onClick={doShare}><Svg>{I.share}</Svg><span>Share</span></button>
      </div>

      <button className={`${styles.totop} ${showTop ? styles.show : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Svg><path d="M12 19V5M5 12l7-7 7 7" /></Svg></button>

      <div className={`${styles.toast} ${toast ? styles.show : ''}`}>{toast}</div>

      {sel && (
        <div className={`${styles.selToolbar} ${styles.show}`} data-seltoolbar style={{ left: sel.x, top: sel.y }}>
          <button onClick={() => { navigator.clipboard?.writeText(`"${sel.text}" — MoInterview`).then(() => flash('Quote copied')); setSel(null) }} aria-label="Copy quote"><Svg>{I.copy}</Svg></button>
          <button onClick={() => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${sel.text.slice(0, 180)}" — MoInterview`)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener'); setSel(null) }} aria-label="Share quote"><Svg stroke={false}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></Svg></button>
        </div>
      )}
    </div>
  )
}

/* ---- block renderer ---- */
function BlockView({ block, idx, checked, onToggle }: { block: Block; idx: number; checked: Set<string>; onToggle: (k: string) => void }) {
  switch (block.kind) {
    case 'p':
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />
    case 'h2':
      return <h2 id={block.id}>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
      return <ul>{block.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ul>
    case 'ol':
      return <ol>{block.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ol>
    case 'quote':
      return <blockquote className={styles.pull} dangerouslySetInnerHTML={{ __html: block.html }} />
    case 'callout':
      return (
        <div className={styles.callout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" /></svg>
          <p><strong>{block.label}</strong><span dangerouslySetInnerHTML={{ __html: block.html }} /></p>
        </div>
      )
    case 'example':
      return (
        <div className={styles.example}>
          <div className={styles.exHead}>{block.head}</div>
          <div className={styles.exBody}>
            {block.rows.map((r, i) => <p key={i}><b>{r.label} —</b> <span dangerouslySetInnerHTML={{ __html: r.html }} /></p>)}
          </div>
        </div>
      )
    case 'checklist':
      return (
        <ul className={styles.checklist}>
          {block.items.map((it, i) => {
            const key = `${idx}-${i}`
            return (
              <li key={i}>
                <label className={styles.contents}>
                  <input type="checkbox" checked={checked.has(key)} onChange={() => onToggle(key)} />
                  <span>{it}</span>
                </label>
              </li>
            )
          })}
        </ul>
      )
    default:
      return null
  }
}
