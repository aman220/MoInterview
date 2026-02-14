import { Metadata } from 'next'
import InterviewersGrid from '@/components/interviewers/interviewers-grid'

export const metadata: Metadata = {
  title: 'Find Coaches - InterviewHub',
  description: 'Browse and filter interview coaches from top tech companies. Find the perfect coach for your preparation.',
}

export default function FindInterviewersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-accent font-light">Coaches</p>
            <h1 className="text-6xl sm:text-7xl font-light text-foreground">
              Find Your Coach
            </h1>
          </div>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Browse experienced professionals from your target companies. Find the perfect coach to prepare for your interview.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <InterviewersGrid />
        </div>
      </div>
    </div>
  )
}
