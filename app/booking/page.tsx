import { Metadata } from 'next'
import { Suspense } from 'react'
import BookingPageContent from '@/components/booking/booking-page-content'

export const metadata: Metadata = {
  title: 'Complete Your Booking - InterviewHub',
  description: 'Finalize your mock interview booking with your selected interviewer.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-muted-foreground">
            Review the details and proceed to payment
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <BookingPageContent />
        </Suspense>
      </div>
    </div>
  )
}
