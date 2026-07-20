// Central SEO configuration. Keeps the canonical site URL, brand, and default
// social metadata in one place so pages, the sitemap, robots, and JSON-LD all
// agree. Override the base URL per-environment with NEXT_PUBLIC_SITE_URL.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mointerview.com').replace(/\/$/, '')
export const SITE_NAME = 'MoInterview'
export const SITE_DESCRIPTION =
  'Practice interviews with real professionals from top companies. Book 1:1 mock interviews and get honest, structured feedback.'

/** Publisher/Organization node reused across JSON-LD graphs. */
export const ORGANIZATION_LD = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
}

/** Absolute URL helper for canonical + OG links. */
export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
