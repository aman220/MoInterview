'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Brain, Zap, Shield, Users, BarChart3, Lock,
  Clock, CheckCircle2, Video, MessageSquare, BookOpen, Cpu
} from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'AI-Powered Feedback',
      description: 'Advanced ML algorithms analyze your responses in real-time and provide detailed insights on communication, confidence, and technical depth.',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Performance Analytics',
      description: 'Get comprehensive reports with scoring breakdowns, progress tracking, and actionable recommendations for improvement.',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Expert Interviewers',
      description: 'Practice with verified professionals from Google, Meta, Amazon, Apple, Microsoft and 500+ other companies.',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Interactive Video',
      description: 'Crystal-clear HD video, screen sharing, and real-time chat for a completely realistic interview experience.',
      icon: Video,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Personalized Roadmap',
      description: 'Get a customized practice plan based on your role, experience level, and target companies.',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Progress Tracking',
      description: 'Track your score over time, see improvements, and compare performance across different interview styles.',
      icon: CheckCircle2,
      color: 'from-teal-500 to-green-500'
    },
    {
      title: 'Bank of Questions',
      description: 'Access to thousands of real interview questions from top companies across all roles and skill levels.',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Live Transcripts',
      description: 'Complete interview transcripts with AI highlights of key moments and areas for improvement.',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Salary Negotiation',
      description: 'Expert guidance on salary negotiation strategies and market rates for your role and experience level.',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Interview Recording',
      description: 'Review your interview recording anytime. Perfect for spotting habits and practicing with confidence.',
      icon: Clock,
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Privacy & Security',
      description: 'Enterprise-grade encryption and strict privacy policies. Your data is 100% secure and confidential.',
      icon: Lock,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team available round-the-clock to help with any questions or technical issues.',
      icon: Shield,
      color: 'from-amber-500 to-orange-500'
    }
  ]

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">Powerful Features</Badge>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-foreground">Everything You Need to</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Ace Your Interviews
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and resources to prepare like never before
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Card className="relative h-full p-6 overflow-hidden hover:border-primary/50 transition-all duration-300">
                  {/* Gradient background */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 inline-block`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Title and description */}
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/30 transition-all duration-300 pointer-events-none"></div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
