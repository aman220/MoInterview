import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal-doc'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MoInterview collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="July 20, 2026"
      intro="This policy explains what personal information MoInterview collects, why we collect it, and the choices you have. We aim to collect only what we need to run the platform and to keep it secure."
      sections={[
        {
          heading: 'Information we collect',
          paragraphs: ['We collect information you provide and a limited amount of technical data needed to operate the service:'],
          bullets: [
            'Account details: your name, email address, and role (candidate or interviewer).',
            'Profile information you choose to add, such as target role, focus areas, and languages.',
            'Booking and session data: the sessions you schedule, attend, and any feedback or reviews associated with them.',
            'Payment metadata: we store a masked reference to your payment method (for example, the last four digits of a card). We do not store full card numbers.',
            'Technical data: authentication tokens, and standard security logs used to protect accounts.',
          ],
        },
        {
          heading: 'How we use your information',
          bullets: [
            'To provide the service — matching candidates with interviewers, running bookings, and delivering feedback.',
            'To secure your account and detect abuse, including rate-limiting and login-anomaly protection.',
            'To send transactional messages such as booking confirmations, reminders, and verification codes.',
            'To send product updates only where you have opted in; you can turn these off at any time in settings.',
          ],
        },
        {
          heading: 'How we share information',
          paragraphs: [
            'When you book a session, the interviewer sees the information needed to prepare — your name and the context you provide. Interviewers do not receive your email address or payment details.',
            'We use a small number of infrastructure providers (hosting, database, and email delivery) that process data on our behalf under contract. We do not sell your personal information.',
          ],
        },
        {
          heading: 'Data retention',
          paragraphs: [
            'We keep account and session data for as long as your account is active. You can request deletion of your account by contacting support, after which we remove or anonymise your personal data except where we are required to retain records for legal or accounting reasons.',
          ],
        },
        {
          heading: 'Security',
          paragraphs: [
            'Passwords are hashed, access tokens are short-lived and held in memory only, and refresh tokens are stored as hashed values and delivered via secure, HTTP-only cookies. We apply the principle of least privilege across our systems.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'Depending on where you live, you may have the right to access, correct, export, or delete your personal data. To exercise any of these, contact us at privacy@mointerview.com and we will respond within a reasonable timeframe.',
          ],
        },
      ]}
    />
  )
}
