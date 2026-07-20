import Link from 'next/link'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

/** Shared layout for the privacy / terms / cookie policy pages. */
export function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/50 py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground font-light mt-4">Last updated {updated}</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <p className="text-lg text-muted-foreground font-light leading-relaxed">{intro}</p>

        <div className="mt-12 space-y-12">
          {sections.map((s, i) => (
            <section key={i} className="space-y-4">
              <h2 className="text-2xl font-light text-foreground tracking-tight">
                <span className="text-accent/60 mr-3 text-lg">{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="text-base text-muted-foreground font-light leading-relaxed">{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-2 pl-1">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-base text-muted-foreground font-light leading-relaxed">
                      <span className="text-accent mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-sm text-muted-foreground font-light">
          Questions about this policy? Email{' '}
          <a href="mailto:privacy@mointerview.com" className="text-accent hover:underline">privacy@mointerview.com</a>{' '}
          or visit our <Link href="/contact" className="text-accent hover:underline">contact page</Link>.
        </div>
      </article>
    </div>
  )
}
