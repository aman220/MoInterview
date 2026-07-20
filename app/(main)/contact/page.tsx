'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Mail, MessageSquare, Briefcase, LifeBuoy, Check } from 'lucide-react'

const channels = [
  { icon: LifeBuoy, title: 'Support', desc: 'Questions about a session, booking or your account.', email: 'support@mointerview.com' },
  { icon: Briefcase, title: 'Interviewers', desc: 'Interested in coaching candidates on MoInterview?', email: 'coaches@mointerview.com' },
  { icon: MessageSquare, title: 'Partnerships & press', desc: 'Work with us or write about us.', email: 'hello@mointerview.com' },
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    // Compose a real email in the visitor's mail client — no data leaves the page otherwise.
    const body = `From: ${name} <${email}>%0D%0A%0D%0A${encodeURIComponent(message)}`
    window.location.href = `mailto:support@mointerview.com?subject=${encodeURIComponent(subject || 'MoInterview enquiry')}&body=${body}`
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center space-y-6 relative">
          <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Contact</p>
          </div>
          <h1 className="text-5xl sm:text-6xl font-light text-foreground tracking-tight">Get in touch</h1>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
            We usually reply within one business day. Pick the right channel or send us a note below.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-12 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((c) => (
            <a key={c.title} href={`mailto:${c.email}`} className="group p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                <c.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground font-light mt-2 leading-relaxed">{c.desc}</p>
              <p className="text-sm text-accent mt-4 group-hover:underline flex items-center gap-2">
                <Mail className="w-4 h-4" />{c.email}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl border border-border/50 bg-card">
            <h2 className="text-2xl font-light text-foreground tracking-tight mb-6">Send us a message</h2>
            {sent ? (
              <div className="flex items-start gap-3 p-5 rounded-xl bg-accent/10 border border-accent/20">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="text-sm text-foreground/90 font-light">
                  Your email client should have opened with your message ready to send. If it didn&apos;t, email us
                  directly at <a href="mailto:support@mointerview.com" className="text-accent underline">support@mointerview.com</a>.
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Email</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Subject</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">Message</label>
                  <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-accent transition-colors resize-y" />
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all text-sm uppercase tracking-[0.15em] font-medium rounded-full">
                  Send message
                </button>
              </form>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground font-light mt-6">
            Looking for help getting started?{' '}
            <Link href="/find-interviewers" className="text-accent hover:underline">Browse interviewers</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
