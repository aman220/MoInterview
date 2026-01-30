import { Card } from '@/components/ui/card'
import { type Feedback } from '@/lib/types'

interface PerformanceMetricsProps {
  feedback: Feedback
}

export default function PerformanceMetrics({ feedback }: PerformanceMetricsProps) {
  const metrics = [
    {
      label: 'Communication Clarity',
      value: feedback.communicationClarity,
      description: 'How clearly you explained your thoughts and ideas',
    },
    {
      label: 'Technical Depth',
      value: feedback.technicalDepth,
      description: 'Depth of technical knowledge and understanding',
    },
    {
      label: 'Confidence',
      value: feedback.confidence,
      description: 'How confident and composed you were during the interview',
    },
    {
      label: 'Problem Solving',
      value: feedback.problemSolving,
      description: 'Your ability to approach and solve problems systematically',
    },
  ]

  const getColor = (value: number) => {
    if (value >= 8.5) return 'bg-green-500'
    if (value >= 7.5) return 'bg-emerald-500'
    if (value >= 6.5) return 'bg-amber-500'
    return 'bg-orange-500'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="font-semibold">{metric.label}</h3>
              <span className="text-2xl font-bold text-primary">{metric.value.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${getColor(metric.value)} transition-all`}
              style={{ width: `${(metric.value / 10) * 100}%` }}
            />
          </div>

          {/* Score Range */}
          <div className="flex justify-between text-xs text-muted-foreground mt-3">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
