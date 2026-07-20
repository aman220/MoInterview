import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, ArrowRight } from 'lucide-react'
import { posts, formatDate } from '@/lib/blog'
import { SITE_NAME, absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical, no-nonsense guidance on interview preparation from people who run interviews for a living.',
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    type: 'website',
    title: 'Interview insights — MoInterview Blog',
    description: 'Practical guidance on interview preparation from people who run interviews for a living.',
    url: absoluteUrl('/blog'),
  },
}

export default function BlogPage() {
  const [featured, ...rest] = posts

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: absoluteUrl('/blog'),
    description: 'Practical guidance on interview preparation.',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author.name },
      url: absoluteUrl(`/blog/${p.slug}`),
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center space-y-6 relative">
          <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Blog</p>
          </div>
          <h1 className="text-5xl sm:text-6xl font-light text-foreground tracking-tight">Interview insights</h1>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
            Practical guidance from people who run interviews for a living. No fluff, no gatekeeping.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-12 pb-28">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Featured */}
          <Link href={`/blog/${featured.slug}`} className="group block p-8 sm:p-12 rounded-3xl border border-border/50 bg-gradient-to-br from-accent/5 to-muted/20 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-accent font-medium mb-5">
              <span>{featured.category}</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="flex items-center gap-1.5 text-muted-foreground normal-case tracking-normal"><Clock className="w-3.5 h-3.5" />{featured.readingMinutes} min read</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-tight max-w-3xl">{featured.title}</h2>
            <p className="text-base text-muted-foreground font-light mt-5 max-w-2xl leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center justify-between mt-8">
              <span className="text-sm text-muted-foreground font-light">{featured.author.name} · {formatDate(featured.date)}</span>
              <span className="flex items-center gap-2 text-sm text-accent font-medium group-hover:gap-3 transition-all">Read <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>

          {/* Rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-accent font-medium mb-4">
                  <span>{p.category}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="flex items-center gap-1.5 text-muted-foreground normal-case tracking-normal"><Clock className="w-3.5 h-3.5" />{p.readingMinutes} min</span>
                </div>
                <h3 className="text-xl font-light text-foreground tracking-tight leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground font-light mt-3 leading-relaxed flex-grow">{p.excerpt}</p>
                <span className="text-sm text-muted-foreground font-light mt-6">{formatDate(p.date)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
