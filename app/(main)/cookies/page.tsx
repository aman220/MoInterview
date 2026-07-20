import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal-doc'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How and why MoInterview uses cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      title="Cookie Policy"
      updated="July 20, 2026"
      intro="MoInterview uses a small number of cookies to keep you signed in and to keep the platform secure. We do not use advertising cookies or sell your browsing data."
      sections={[
        {
          heading: 'What cookies are',
          paragraphs: [
            'Cookies are small text files a website stores in your browser. They let a site remember things between requests — most importantly, that you are signed in. Some cookies are essential; others are optional.',
          ],
        },
        {
          heading: 'Cookies we use',
          bullets: [
            'Authentication (essential): a secure, HTTP-only cookie that holds your refresh token so you stay signed in without exposing tokens to JavaScript. Without it, the platform cannot keep you logged in.',
            'Session preferences (functional): lightweight storage that remembers non-sensitive UI state, such as your last-used dashboard view.',
          ],
        },
        {
          heading: 'What we do not use',
          paragraphs: [
            'We do not use third-party advertising or cross-site tracking cookies, and we do not sell cookie data. Any analytics we use are privacy-preserving and aggregate.',
          ],
        },
        {
          heading: 'Managing cookies',
          paragraphs: [
            'You can clear or block cookies in your browser settings. Note that blocking essential authentication cookies will sign you out and prevent you from using signed-in features such as booking or your dashboard.',
          ],
        },
        {
          heading: 'Changes to this policy',
          paragraphs: [
            'If we introduce new cookies, we will update this page and, where required, ask for your consent. For questions, contact privacy@mointerview.com.',
          ],
        },
      ]}
    />
  )
}
