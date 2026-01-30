'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, TrendingUp, Users, Award, Zap, Lock } from 'lucide-react'

export default function WhyUsSection() {
  const reasons = [
    {
      icon: Users,
      title: 'Expert Interviewers Only',
      description: 'All interviewers are verified professionals with 5+ years of experience at top companies. No amateurs.',
      stats: '2,500+ verified experts'
    },
    {
      icon: Award,
      title: 'Highest Success Rate',
      description: 'Our candidates have an 85% job offer rate. That\'s 3x higher than industry average.',
      stats: '85% offer rate'
    },
    {
      icon: Zap,
      title: 'AI + Human Feedback',
      description: 'Combine intelligent AI analysis with expert human insights for the most comprehensive feedback.',
      stats: 'Best of both worlds'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'See measurable improvements with detailed analytics and scoring over multiple interviews.',
      stats: 'Avg improvement: 23pts'
    },
    {
      icon: CheckCircle2,
      title: '100% Satisfaction',
      description: 'If you\'re not satisfied with your interview, get a full refund. No questions asked.',
      stats: '30-day guarantee'
    },
    {
      icon: Lock,
      title: 'Privacy Guaranteed',
      description: 'Enterprise-grade encryption. Your data is never shared or used for anything else.',
      stats: 'SOC 2 Type II certified'
    }
  ]

  const stats = [
    { num: '50,000+', label: 'Interviews Completed' },
    { num: '4.9/5', label: 'Average Rating' },
    { num: '$847M', label: 'Total Salary Negotiated' },
    { num: '156', label: 'Countries Represented' }
  ]

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">Why InterviewHub</Badge>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-foreground">The Difference</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              That Matters
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six reasons why top job seekers choose InterviewHub over all alternatives
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <div
                key={i}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <Card className="relative h-full p-8 overflow-hidden hover:border-primary/50 transition-all duration-300">
                  {/* Background glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary p-3 mb-6 inline-block">
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{reason.description}</p>

                    {/* Stats */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-primary">{reason.stats}</p>
                    </div>
                  </div>

                  {/* Border effect */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none"></div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="relative mb-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground">Trusted by thousands of professionals</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.num}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
