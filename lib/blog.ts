// Editorial content for the MoInterview blog. Static, curated posts — real
// interview-prep guidance, authored by us. The content model is a typed block
// list so articles can render rich elements (callouts, worked examples,
// checklists, pull quotes) faithfully. `html` fields carry trusted, first-party
// inline markup (<strong>/<em>/<a class="inline-link">) only.

export type Block =
  | { kind: 'p'; html: string }
  | { kind: 'h2'; id: string; text: string; nav?: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'quote'; html: string }
  | { kind: 'callout'; label: string; html: string }
  | { kind: 'example'; head: string; rows: { label: string; html: string }[] }
  | { kind: 'checklist'; items: string[] }

export interface Author {
  name: string
  initials: string
  role: string
  bio: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: Author
  date: string // ISO
  readingMinutes: number
  coverCaption: string
  content: Block[]
}

const TEAM: Author = {
  name: 'MoInterview Team',
  initials: 'MI',
  role: 'Interview coaches',
  bio: 'The MoInterview coaching team is made up of engineers, managers and recruiters who have run thousands of real interview loops at leading companies.',
}

const PRIYA: Author = {
  name: 'Priya Desai',
  initials: 'PD',
  role: 'Ex-Amazon Bar Raiser',
  bio: 'Priya spent six years running bar-raiser loops at Amazon before joining MoInterview as a coach. She has conducted over 900 behavioral interviews and now helps candidates rebuild their stories from panel-side experience.',
}

export const posts: BlogPost[] = [
  {
    slug: 'behavioral-stories-that-land',
    title: 'Behavioral Stories That Land: The Framework Top Candidates Use',
    excerpt:
      'Most candidates walk into “tell me about a time…” questions with a vague memory and hope. The ones who get offers walk in with a rehearsed, structured story built to survive follow-up questions. Here’s the framework.',
    category: 'Interview Prep',
    author: PRIYA,
    date: '2026-07-18',
    readingMinutes: 9,
    coverCaption: 'A candidate telling a structured story in a mock interview',
    content: [
      { kind: 'p', html: 'Ask any hiring manager what separates a “strong hire” from a “no hire” on the behavioral portion of an interview, and they’ll rarely mention the underlying accomplishment. They’ll mention <em>how it was told</em>. The candidate who rambles through a six-minute story with no clear resolution loses to the candidate who delivers the same accomplishment in ninety structured seconds — every time.' },
      { kind: 'p', html: 'We’ve reviewed transcripts from over 4,000 mock interviews on MoInterview. The pattern is consistent: the difference between a memorable answer and a forgettable one is almost never the story itself. It’s the scaffolding underneath it.' },

      { kind: 'h2', id: 'why-fail', text: 'Why most behavioral answers fall flat', nav: 'Why most answers fall flat' },
      { kind: 'p', html: 'Three failure modes show up again and again in our session recordings:' },
      { kind: 'ul', items: [
        '<strong>No clear conflict.</strong> The candidate describes a project, not a problem. Without tension, there’s nothing for the interviewer to evaluate.',
        '<strong>Buried result.</strong> The outcome — the one thing the interviewer is actually scoring — arrives as an afterthought in the last sentence, if at all.',
        '<strong>No reflection.</strong> Senior-level questions are really asking “what do you understand about yourself and your judgment?” A story with no reflection answers a junior-level question by accident.',
      ] },
      { kind: 'quote', html: '“I’m not grading the accomplishment. I’m grading whether you can tell me about it clearly under pressure.” — hiring manager, panel debrief' },

      { kind: 'h2', id: 'framework', text: 'The STAR-R framework', nav: 'The STAR-R framework' },
      { kind: 'p', html: 'STAR (Situation, Task, Action, Result) is the baseline every candidate has heard of. It’s necessary but not sufficient — most STAR answers still land flat because they stop at the result. Add a fifth beat, <strong>Reflection</strong>, and the same story starts scoring at the senior level.' },
      { kind: 'ol', items: [
        '<strong>Situation</strong> — one sentence of context. Company, team, stakes. No backstory.',
        '<strong>Task</strong> — what specifically was your responsibility, separate from the team’s?',
        '<strong>Action</strong> — the decisions you made, in order. This is 60% of your airtime.',
        '<strong>Result</strong> — a number, a comparison, or a concrete outcome. Not “it went well.”',
        '<strong>Reflection</strong> — what you’d do differently, or what it changed about how you work now.',
      ] },
      { kind: 'callout', label: 'Coach’s note', html: 'Time yourself. A well-structured STAR-R answer runs 90–120 seconds. Past 2 minutes, interviewers start losing the thread — and you start losing the offer.' },

      { kind: 'h2', id: 'example', text: 'Worked example: “Tell me about a conflict with a teammate”', nav: 'Worked example' },
      { kind: 'p', html: 'Here’s a real answer, lightly anonymized, that a candidate delivered in a MoInterview mock session and later used to pass an L5 onsite loop:' },
      { kind: 'example', head: 'Sample answer — 104 seconds', rows: [
        { label: 'S', html: 'On my last team, a senior engineer and I disagreed on whether to ship a caching layer before a launch deadline.' },
        { label: 'T', html: 'I owned the launch timeline and was accountable for the date, but he owned the infra the change touched.' },
        { label: 'A', html: 'Instead of escalating immediately, I asked him to walk me through his specific failure scenario. It turned out his concern was a narrow edge case in cache invalidation, not the whole approach. I proposed we ship without the layer but added a feature flag and a rollback plan, and scoped a follow-up ticket for the edge case with him as owner.' },
        { label: 'R', html: 'We launched on time, the edge case never triggered in production, and he shipped the fix two weeks later. Our team lead later cited that exchange in my promotion packet as an example of technical disagreement handled without escalation.' },
        { label: 'R+', html: 'What I took from it: most “conflicts” are actually scope disagreements wearing a conflict costume. Now I ask “what specifically are you worried about” before I ask “can we agree.”' },
      ] },

      { kind: 'h2', id: 'mistakes', text: 'Three mistakes that sink strong stories', nav: 'Three mistakes to avoid' },
      { kind: 'p', html: 'Even candidates with genuinely great material undercut themselves in predictable ways:' },
      { kind: 'ul', items: [
        '<strong>Answering the question they wish was asked.</strong> If asked about conflict, don’t answer with a story about ownership. Interviewers notice the swap immediately.',
        '<strong>Hedging the result.</strong> “I think it helped” is weaker than silence. If you don’t have a number, use a comparison: “faster than our previous release,” “fewer tickets than the prior quarter.”',
        '<strong>Over-crediting the team.</strong> Interviewers want to hear “I,” not “we,” for the specific decisions you made. You can still be generous about credit in the Result section.',
      ] },

      { kind: 'h2', id: 'checklist', text: 'A pre-interview checklist', nav: 'Pre-interview checklist' },
      { kind: 'p', html: 'Before any behavioral round, we have candidates run through this list for each of their five to seven prepared stories:' },
      { kind: 'checklist', items: [
        'Story has a clear conflict or decision point, not just a project summary',
        'Result includes a number or explicit comparison',
        'Delivered out loud, timed, under 2 minutes',
        'Includes one sentence of genuine reflection or change in approach',
        'Mapped to at least two likely competencies (ownership, conflict, failure, leadership)',
      ] },

      { kind: 'h2', id: 'practice', text: 'Practice it out loud', nav: 'Practice it out loud' },
      { kind: 'p', html: 'Reading this framework and internalizing it are different skills. Every candidate we’ve coached who scored well on behavioral rounds did the same unglamorous thing: they said their stories out loud, to another person, multiple times, before the real interview. Silent rehearsal in your head almost never surfaces the rambling, the buried result, or the two-minute story that’s secretly five minutes.' },
      { kind: 'p', html: 'If you don’t have a willing friend with interview experience, book a session with a coach who’s actually sat on the other side of the table — they’ll interrupt you exactly where a real interviewer would, and you’ll fix it before it costs you an offer.' },
    ],
  },

  {
    slug: 'how-to-approach-system-design',
    title: 'A calm, repeatable way to approach system design interviews',
    excerpt:
      'System design rounds feel open-ended, but strong candidates follow a quiet structure. Here is a framework you can run on any prompt.',
    category: 'System Design',
    author: TEAM,
    date: '2026-06-18',
    readingMinutes: 6,
    coverCaption: 'A whiteboard mid-way through a system design interview',
    content: [
      { kind: 'p', html: 'The hardest part of a system design interview is not the technology — it is the ambiguity. You are handed a two-line prompt like “design a URL shortener” and expected to drive a 45-minute conversation. Candidates who do well are rarely the ones who know the most; they are the ones who impose a clear structure and bring the interviewer along with them.' },
      { kind: 'h2', id: 'scope', text: 'Scope before you solve', nav: 'Scope before you solve' },
      { kind: 'p', html: 'Spend the first five minutes turning the vague prompt into concrete requirements. What are the core use cases? What is out of scope? What is the rough scale — thousands of requests per second, or dozens? Write these down. This is not filler; it is where you show judgement, and it quietly sets the boundaries you will be graded against.' },
      { kind: 'h2', id: 'math', text: 'Do the back-of-envelope math out loud', nav: 'Back-of-envelope math' },
      { kind: 'p', html: 'Estimate reads vs writes, storage growth, and bandwidth. You do not need precision — you need to demonstrate that your design is anchored to real numbers. This is the single most common place candidates freeze. Practising capacity estimation out loud, before you ever open an editor, pays off more than memorising any specific architecture.' },
      { kind: 'h2', id: 'happy-path', text: 'Draw the happy path, then break it', nav: 'Happy path, then break it' },
      { kind: 'p', html: 'Sketch the simplest end-to-end design that satisfies the core use case. Only then start introducing failure: what happens when this service is down, this queue backs up, this database gets hot? Interviewers are listening for whether you can reason about trade-offs, not whether you can recite a reference architecture.' },
      { kind: 'callout', label: 'Coach’s note', html: 'Every meaningful decision should come with a one-sentence “I am choosing X because Y, at the cost of Z.” That single habit is the difference between a mid-level and a senior signal.' },
      { kind: 'h2', id: 'reps', text: 'It is all reps', nav: 'It is all reps' },
      { kind: 'p', html: 'None of this requires exotic knowledge. It requires reps. The fastest way to build the instinct is to run the loop with someone who interviews for a living and can tell you where your reasoning drifted — which is exactly what a mock session is for.' },
    ],
  },

  {
    slug: 'the-two-weeks-before-your-onsite',
    title: 'What to actually do in the two weeks before your onsite',
    excerpt:
      'The final stretch is about sharpening signal, not cramming new material. A simple plan for the two weeks that matter most.',
    category: 'Preparation',
    author: TEAM,
    date: '2026-05-12',
    readingMinutes: 4,
    coverCaption: 'A two-week interview prep plan on a calendar',
    content: [
      { kind: 'p', html: 'Two weeks out, the temptation is to start a new problem set or a new course. Resist it. This late, your returns come from sharpening what you already know and closing the gap between “can solve it at home” and “can solve it live, under pressure, while talking.”' },
      { kind: 'h2', id: 'week-one', text: 'Week one: full, timed reps', nav: 'Week one: full reps' },
      { kind: 'p', html: 'Do complete, timed mock rounds — coding, system design, and behavioral — rather than isolated problems. The goal is to rehearse the whole performance: managing the clock, narrating your thinking, and recovering when you get stuck. Record yourself or, better, do it live with an interviewer who can push back.' },
      { kind: 'h2', id: 'week-two', text: 'Week two: fix the top three gaps, then taper', nav: 'Week two: fix and taper' },
      { kind: 'p', html: 'By now you should know your three weakest areas. Spend the first half of the week on those specifically, then taper. In the final days, do light reps to stay warm, sleep properly, and re-read your own behavioral stories. Walking in rested and calm beats walking in exhausted and over-prepared.' },
      { kind: 'p', html: 'The candidates who improve most in this window are the ones getting a real read on where they stand — not guessing. A couple of focused mocks in the final fortnight will tell you exactly where to spend your last few hours.' },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function tableOfContents(post: BlogPost): { id: string; label: string }[] {
  return post.content
    .filter((b): b is Extract<Block, { kind: 'h2' }> => b.kind === 'h2')
    .map((b) => ({ id: b.id, label: b.nav ?? b.text }))
}

export function wordCount(post: BlogPost): number {
  return post.content.reduce((n, b) => {
    if (b.kind === 'p' || b.kind === 'quote' || b.kind === 'callout') return n + strip(b.kind === 'p' || b.kind === 'quote' ? b.html : b.html).split(/\s+/).length
    if (b.kind === 'ul' || b.kind === 'ol' || b.kind === 'checklist') return n + b.items.join(' ').split(/\s+/).length
    if (b.kind === 'example') return n + b.rows.map((r) => r.html).join(' ').split(/\s+/).length
    return n
  }, 0)
}

function strip(html: string): string {
  return html.replace(/<[^>]+>/g, ' ')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
