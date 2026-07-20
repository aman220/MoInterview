import Link from 'next/link'
import type { Metadata } from 'next'
import { Target, Users, Sparkles, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'MoInterview connects candidates with real interviewers from top companies for honest mock interviews, feedback, and preparation.',
}

const values = [
  {
    icon: Target,
    title: 'Real practice, real signal',
    description:
      'Every mock is run by someone who has actually sat on the other side of the table — so the feedback reflects how hiring really works.',
  },
  {
    icon: Users,
    title: 'People over algorithms',
    description:
      'AI helps us summarise and track progress, but a human interviewer is at the centre of every session. That is where the value is.',
  },
  {
    icon: Sparkles,
    title: 'Preparation you can measure',
    description:
      'Readiness scores, skill breakdowns and a practice history turn “I hope I’m ready” into “here is exactly what to work on next”.',
  },
  {
    icon: ShieldCheck,
    title: 'Fair and transparent',
    description:
      'Clear per-session pricing, no lock-in subscriptions, and interviewers who are paid fairly for their expertise.',
  },
]

const stats = [
  { value: 'Top-company', label: 'interviewers' },
  { value: '1:1', label: 'live mock sessions' },
  { value: 'Human + AI', label: 'feedback on every session' },
  { value: 'No', label: 'subscriptions or lock-in' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Our story</p>
          </div>
          <h1 className="text-5xl sm:text-7xl font-light text-foreground tracking-tight leading-[1.1]">
            Interviews shouldn&apos;t be a black box
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            MoInterview was built on a simple idea: the best way to get ready for a real interview is to
            practise with someone who runs them. We connect candidates with experienced interviewers from
            leading companies for honest mock interviews and feedback that actually moves the needle.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-8 lg:px-12 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30">
              <div className="text-2xl sm:text-3xl font-light text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground font-light mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl font-light text-foreground tracking-tight">Why we exist</h2>
          <div className="space-y-5 text-muted-foreground font-light leading-relaxed text-lg">
            <p>
              Preparing for interviews is stressful, and most of the advice out there is generic. Candidates
              grind through problem sets and read blog posts, but never get an honest read on how they actually
              come across in a live conversation with a hiring bar in mind.
            </p>
            <p>
              Meanwhile, thousands of experienced engineers, managers and designers have deep interviewing
              expertise that goes unused outside of their day jobs. MoInterview is the bridge — giving candidates
              real, structured practice and giving interviewers a way to share what they know on their own schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-muted/30 to-background border-y border-border/50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">What we believe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5 p-8 rounded-2xl border border-border/50 bg-background">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">
            Practise with someone who&apos;s been there
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/find-interviewers" className="px-10 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all text-sm uppercase tracking-[0.15em] font-medium rounded-full">
              Find an interviewer
            </Link>
            <Link href="/become-interviewer" className="px-10 py-4 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all text-sm uppercase tracking-[0.15em] font-medium rounded-full">
              Become an interviewer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
