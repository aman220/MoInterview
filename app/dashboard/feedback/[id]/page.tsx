import { Metadata } from 'next'
import FeedbackReportContent from '@/components/feedback/feedback-report-content'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: 'Interview Feedback Report | InterviewHub',
    description: 'Review your interview feedback, AI analysis, and performance metrics.',
  }
}

export default async function FeedbackReportPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2">Interview Feedback Report</h1>
          <p className="text-muted-foreground">
            Your AI-powered analysis and interviewer feedback
          </p>
        </div>
      </div>

      {/* Content */}
      <FeedbackReportContent interviewId={id} />
    </div>
  )
}
