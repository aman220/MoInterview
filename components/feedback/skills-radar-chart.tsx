'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { type Feedback } from '@/lib/types'

interface SkillsRadarChartProps {
  feedback: Feedback
}

export default function SkillsRadarChart({ feedback }: SkillsRadarChartProps) {
  const data = [
    {
      subject: 'Communication',
      value: feedback.communicationClarity,
      fullMark: 10,
    },
    {
      subject: 'Technical Depth',
      value: feedback.technicalDepth,
      fullMark: 10,
    },
    {
      subject: 'Confidence',
      value: feedback.confidence,
      fullMark: 10,
    },
    {
      subject: 'Problem Solving',
      value: feedback.problemSolving,
      fullMark: 10,
    },
  ]

  return (
    <div className="w-full h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="subject" stroke="var(--muted-foreground)" />
          <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="var(--muted-foreground)" />
          <Radar
            name="Your Score"
            dataKey="value"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
