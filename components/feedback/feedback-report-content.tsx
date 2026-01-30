'use client'

import { Calendar, BarChart3, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockFeedback, mockInterviews } from '@/lib/mock-data'
import PerformanceMetrics from './performance-metrics'
import FeedbackSections from './feedback-sections'
import SkillsRadarChart from './skills-radar-chart'

interface FeedbackReportContentProps {
  interviewId: string
}

export default function FeedbackReportContent({
  interviewId,
}: FeedbackReportContentProps) {
  const interview = mockInterviews.find((i) => i.id === interviewId)
  const feedback = mockFeedback

  if (!interview) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-muted-foreground">Interview not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Interview Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <p className="text-3xl font-bold">{feedback.overallScore.toFixed(1)}/10</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interview Date</p>
              <p className="text-lg font-semibold">
                {interview.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interview Type</p>
              <p className="text-lg font-semibold">{interview.type}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
        <PerformanceMetrics feedback={feedback} />
      </div>

      {/* Skills Radar Chart */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Skills Assessment</h2>
        <Card className="p-6">
          <SkillsRadarChart feedback={feedback} />
        </Card>
      </div>

      {/* Feedback Sections */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Detailed Feedback</h2>
        <FeedbackSections feedback={feedback} />
      </div>

      {/* Action Items */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            <span className="text-muted-foreground">
              Review the feedback sections above to understand your strengths and areas for improvement
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            <span className="text-muted-foreground">
              Go through the recommended resources to practice and improve specific skills
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </span>
            <span className="text-muted-foreground">
              Schedule follow-up interviews with other professionals to track improvement
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
