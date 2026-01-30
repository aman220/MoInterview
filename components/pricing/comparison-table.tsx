'use client'

import { Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ComparisonTable() {
  const features = [
    { category: 'Interview Duration', starter: '45 min', pro: '60 min', exec: '90 min' },
    { category: 'Interviewer Level', starter: 'Intermediate', pro: 'Senior', exec: 'Director+' },
    { category: 'Feedback Type', starter: 'AI Only', pro: 'Human + AI', exec: 'Human + AI + Coach' },
    { category: 'Interview Recording', starter: false, pro: true, exec: true },
    { category: 'Resume Review', starter: false, pro: true, exec: true },
    { category: 'Chat Support', starter: true, pro: true, exec: true },
    { category: 'Phone Support', starter: false, pro: false, exec: true },
    { category: 'Performance Analytics', starter: 'Basic', pro: 'Advanced', exec: 'Premium' },
    { category: 'Study Materials', starter: 'Limited', pro: 'Full Access', exec: 'Full Access' },
    { category: 'Career Coaching', starter: false, pro: false, exec: true },
    { category: 'Salary Negotiation', starter: false, pro: false, exec: true },
    { category: 'Job Search Assistance', starter: false, pro: false, exec: true },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-4 px-4 font-bold">Features</th>
            <th className="text-center py-4 px-4 font-bold min-w-32">
              <div className="text-lg">Starter</div>
              <div className="text-sm text-muted-foreground font-normal">$99/session</div>
            </th>
            <th className="text-center py-4 px-4 font-bold min-w-32 bg-primary/5 rounded-t-lg">
              <Badge className="mb-2 bg-primary">POPULAR</Badge>
              <div className="text-lg">Professional</div>
              <div className="text-sm text-muted-foreground font-normal">$199/session</div>
            </th>
            <th className="text-center py-4 px-4 font-bold min-w-32">
              <div className="text-lg">Executive</div>
              <div className="text-sm text-muted-foreground font-normal">$349/session</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-4 px-4 font-medium text-foreground">{feature.category}</td>
              <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                {typeof feature.starter === 'boolean' ? (
                  feature.starter ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )
                ) : (
                  feature.starter
                )}
              </td>
              <td className="py-4 px-4 text-center text-sm text-muted-foreground bg-primary/5">
                {typeof feature.pro === 'boolean' ? (
                  feature.pro ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )
                ) : (
                  feature.pro
                )}
              </td>
              <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                {typeof feature.exec === 'boolean' ? (
                  feature.exec ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )
                ) : (
                  feature.exec
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
