import { CheckCircle, AlertCircle, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { type Feedback } from '@/lib/types'

interface FeedbackSectionsProps {
  feedback: Feedback
}

export default function FeedbackSections({ feedback }: FeedbackSectionsProps) {
  return (
    <div className="space-y-6">
      {/* Strengths */}
      <Card className="p-6 border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10">
        <div className="flex items-start space-x-4 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
          <h3 className="text-xl font-semibold">Strengths</h3>
        </div>
        <ul className="space-y-3 ml-10">
          {feedback.strengths.map((strength, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-500 mt-2 flex-shrink-0"></span>
              <span className="text-muted-foreground">{strength}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Areas for Improvement */}
      <Card className="p-6 border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10">
        <div className="flex items-start space-x-4 mb-4">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
          <h3 className="text-xl font-semibold">Areas for Improvement</h3>
        </div>
        <ul className="space-y-3 ml-10">
          {feedback.weaknesses.map((weakness, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500 mt-2 flex-shrink-0"></span>
              <span className="text-muted-foreground">{weakness}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Improvement Plan */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Improvement Plan</h3>
        <div className="space-y-4">
          {feedback.improvementPlan.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0 text-sm">
                {index + 1}
              </span>
              <span className="text-muted-foreground pt-1">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Resources */}
      <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10">
        <div className="flex items-start space-x-4 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-1" />
          <h3 className="text-xl font-semibold">Recommended Resources</h3>
        </div>
        <ul className="space-y-3 ml-10">
          {feedback.recommendedResources.map((resource, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 mt-2 flex-shrink-0"></span>
              <span className="text-muted-foreground">{resource}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
