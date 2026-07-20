import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal-doc'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of the MoInterview platform.',
}

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      updated="July 20, 2026"
      intro="These terms govern your use of MoInterview. By creating an account or booking a session, you agree to them. Please read them carefully."
      sections={[
        {
          heading: 'Using MoInterview',
          paragraphs: [
            'MoInterview is a marketplace that connects candidates with interviewers for mock interview sessions. You must be at least 16 years old and provide accurate account information. You are responsible for activity that happens under your account and for keeping your credentials secure.',
          ],
        },
        {
          heading: 'Bookings and sessions',
          bullets: [
            'When you request a session, the interviewer may accept, decline, or propose a new time.',
            'Prices are set per session and shown before you confirm. The price charged is always the price displayed at booking.',
            'Sessions are for interview practice and feedback. They are not an offer of employment and do not guarantee any hiring outcome.',
          ],
        },
        {
          heading: 'Payments and cancellations',
          paragraphs: [
            'Payment is handled through your account wallet or saved payment method. You may cancel an upcoming session from your dashboard; the interviewer is notified automatically. Refund eligibility depends on how far in advance you cancel, as described at the time of booking.',
          ],
        },
        {
          heading: 'Interviewer responsibilities',
          bullets: [
            'Interviewers must represent their experience honestly and deliver sessions professionally.',
            'Interviewers must not share confidential material from their employer or ask candidates to do so.',
            'Payouts are made to the interviewer for completed sessions, less applicable platform fees.',
          ],
        },
        {
          heading: 'Acceptable use',
          paragraphs: [
            'You agree not to misuse the platform — no harassment, no attempts to circumvent security or rate limits, no scraping, and no using the service for anything unlawful. We may suspend accounts that violate these terms.',
          ],
        },
        {
          heading: 'Disclaimers and liability',
          paragraphs: [
            'The service is provided “as is”. We work hard to keep it reliable, but we do not warrant that sessions will lead to any particular result. To the extent permitted by law, our liability is limited to the amount you paid for the session giving rise to the claim.',
          ],
        },
        {
          heading: 'Changes to these terms',
          paragraphs: [
            'We may update these terms as the product evolves. If we make material changes, we will notify you. Continued use after an update means you accept the revised terms.',
          ],
        },
      ]}
    />
  )
}
