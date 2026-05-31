import { Metadata } from 'next'
import { Suspense } from 'react'
import BookingPageContent from '@/components/booking/booking-page-content'

export const metadata: Metadata = {
  title: 'Confirm & Pay — MoInterview',
  description: 'Review your session, add focus notes, and confirm your booking.',
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24 text-muted-foreground font-light">Loading…</div>}>
      <BookingPageContent />
    </Suspense>
  )
}
