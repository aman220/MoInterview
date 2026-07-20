import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google'
import { posts, getPost, wordCount } from '@/lib/blog'
import { ORGANIZATION_LD, absoluteUrl } from '@/lib/seo'
import { ArticleReader } from './ArticleReader'

const plexSans = IBM_Plex_Sans({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-plex-sans', display: 'swap' })
const plexSerif = IBM_Plex_Serif({ weight: ['400', '500'], style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-plex-serif', display: 'swap' })
const plexMono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-plex-mono', display: 'swap' })

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Post not found' }
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      section: post.category,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = absoluteUrl(`/blog/${post.slug}`)
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  // Structured data — Google rich results + LLM extraction/citation.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
        publisher: ORGANIZATION_LD,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        articleSection: post.category,
        wordCount: wordCount(post),
        timeRequired: `PT${post.readingMinutes}M`,
        inLanguage: 'en',
        isAccessibleForFree: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleReader post={post} related={related} />
    </div>
  )
}
