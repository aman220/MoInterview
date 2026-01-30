'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, BarChart3, CreditCard, Video, Zap } from 'lucide-react'

export default function ValuePropositions() {
  const values = [
    {
      icon: Users,
      title: 'Real Interviewers',
      description: 'Interview with actual professionals from top tech companies who conduct real interviews daily.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Company-Specific Prep',
      description: 'Get prepared for your target company with interviewers who know their exact process.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Video,
      title: 'HD Video Interviews',
      description: 'Professional video conferencing with crystal-clear quality and reliable connections.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'AI Performance Insights',
      description: 'Get detailed analytics on communication, technical depth, confidence, and problem-solving.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: CreditCard,
      title: 'Pay Per Session',
      description: 'Flexible pricing with no subscriptions. Only pay for the interviews you take.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Quick Scheduling',
      description: 'Book interviews instantly. Most interviews available within 24-48 hours.',
      color: 'from-indigo-500 to-blue-500'
    },
  ]

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-secondary/20 text-secondary border-secondary/50">Core Value</Badge>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-foreground">Everything You Need</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              To Succeed
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six key advantages that make InterviewHub the #1 platform for interview preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="group animate-fade-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Card className="relative h-full p-8 overflow-hidden hover:border-primary/50 transition-all duration-300">
                  {/* Gradient background on hover */}
                  <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-300`}></div>

                  <div className="relative z-10">
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${value.color} p-3 mb-6 inline-block shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {value.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className={`w-12 h-1 bg-gradient-to-r ${value.color} mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  </div>

                  {/* Border effect */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
