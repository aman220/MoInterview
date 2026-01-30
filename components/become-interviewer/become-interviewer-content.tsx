'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Users, TrendingUp, Clock, DollarSign, Trophy } from 'lucide-react'

export default function BecomeInterviewerContent() {
  const [activeTab, setActiveTab] = useState('benefits')

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Earnings',
      description: 'Earn $75-150/hour depending on your expertise and experience level'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Set your own availability and work whenever you want'
    },
    {
      icon: Users,
      title: 'Help Others Succeed',
      description: 'Make a real impact by mentoring the next generation of professionals'
    },
    {
      icon: TrendingUp,
      title: 'Build Your Reputation',
      description: 'Establish yourself as an industry expert and thought leader'
    },
    {
      icon: Trophy,
      title: 'Exclusive Perks',
      description: 'Access to premium resources, training, and community events'
    },
    {
      icon: Users,
      title: 'Growing Community',
      description: 'Join thousands of experienced professionals already earning on our platform'
    }
  ]

  const requirements = [
    {
      number: '01',
      title: 'Professional Experience',
      description: 'Minimum 5 years of experience in your field at a reputable company'
    },
    {
      number: '02',
      title: 'Expertise Verification',
      description: 'Verified background check and professional credentials'
    },
    {
      number: '03',
      title: 'Communication Skills',
      description: 'Ability to clearly explain concepts and provide constructive feedback'
    },
    {
      number: '04',
      title: 'Profile Completion',
      description: 'Detailed profile with portfolio, achievements, and teaching style'
    }
  ]

  const steps = [
    {
      step: 1,
      title: 'Create Account',
      description: 'Sign up and complete your professional profile with your experience'
    },
    {
      step: 2,
      title: 'Verification Process',
      description: 'We verify your background and professional credentials (24-48 hours)'
    },
    {
      step: 3,
      title: 'Set Availability',
      description: 'Configure your schedule and pricing based on your preferences'
    },
    {
      step: 4,
      title: 'Start Earning',
      description: 'Begin receiving interview requests and help candidates succeed'
    }
  ]

  const stats = [
    { label: 'Active Interviewers', value: '2,500+' },
    { label: 'Monthly Earnings Average', value: '$4,200' },
    { label: 'Interview Completion Rate', value: '98%' },
    { label: 'Interviewer Satisfaction', value: '4.9/5' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">Join Our Community</Badge>
          
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Share Your Expertise,</span>
            <br />
            <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Earn Competitive Rates
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help ambitious professionals master their interview skills while building your personal brand and earning substantial income.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="h-14 text-base font-semibold"
              asChild
            >
              <Link href="#apply">Apply Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 text-base font-semibold bg-transparent"
            >
              Learn More
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">Why Join InterviewHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy flexibility, competitive rates, and the satisfaction of mentoring professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div
                  key={i}
                  className="group relative animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 rounded-xl blur transition duration-300"></div>
                  <Card className="relative h-full p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Requirements section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">Requirements to Get Started</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain high standards to ensure quality for both candidates and interviewers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, i) => (
              <div
                key={i}
                className="relative animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg">
                      {req.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{req.title}</h3>
                    <p className="text-muted-foreground">{req.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <div
                key={i}
                className="relative animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-1/2 h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}

                <Card className="relative h-full p-6 hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary opacity-5 rounded-full blur-2xl"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Earn While Helping Others?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals already making a difference and earning great income on InterviewHub
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-14 text-base font-semibold px-8"
                id="apply"
              >
                Start Your Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 text-base font-semibold bg-transparent"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ snippet */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'What if I have multiple jobs or other commitments?',
                a: 'You have complete control over your availability. Set your own schedule and only accept interviews when you want.'
              },
              {
                q: 'How much will I earn?',
                a: 'Earnings depend on your expertise, experience, and demand. Most interviewers earn $75-150 per hour.'
              },
              {
                q: 'Is there a minimum number of interviews?',
                a: 'No minimum requirements. You can take as few or as many interviews as you want.'
              },
              {
                q: 'How are payments processed?',
                a: 'Payments are processed weekly via direct deposit. We handle all payment processing securely.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
