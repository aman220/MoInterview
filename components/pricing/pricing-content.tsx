'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default function PricingContent() {
  const [isAnnual, setIsAnnual] = useState(false)

  const tiers = [
    {
      name: 'Starter',
      description: 'Perfect for first-time interview prep',
      price: isAnnual ? 79 : 99,
      period: 'per session',
      popular: false,
      features: [
        '45-minute interview session',
        'Real interviewer from tech companies',
        'AI-powered feedback report',
        'Chat support',
        'Basic performance analytics',
        'Resume review (limited)',
        'Community access'
      ],
      cta: 'Get Started',
      interviewers: 'Intermediate level',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Professional',
      description: 'Most popular choice for serious candidates',
      price: isAnnual ? 159 : 199,
      period: 'per session',
      popular: true,
      features: [
        '60-minute deep-dive interview',
        'Senior interviewers from FAANG',
        'Detailed AI + human feedback',
        'Priority email & chat support',
        'Advanced performance analytics',
        'Unlimited resume reviews',
        'Private study materials',
        'Interview history tracking',
        'Follow-up consultation'
      ],
      cta: 'Most Popular',
      interviewers: 'Senior level',
      color: 'from-primary via-accent to-secondary'
    },
    {
      name: 'Executive',
      description: 'For serious candidates targeting leadership roles',
      price: isAnnual ? 299 : 349,
      period: 'per session',
      popular: false,
      features: [
        '90-minute premium interview',
        'Director/VP level interviewers',
        'Executive coach feedback',
        'Priority phone support',
        '1-on-1 strategy sessions',
        'Behavioral coaching',
        'Salary negotiation guidance',
        'Personalized interview plan',
        'Career counseling',
        'Job search assistance'
      ],
      cta: 'Get Started',
      interviewers: 'Executive level',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const packages = [
    {
      name: 'Practice Bundle',
      sessions: 5,
      price: 449,
      savings: 'Save $45',
      perSession: '$89.80/session'
    },
    {
      name: 'Interview Bootcamp',
      sessions: 10,
      price: 799,
      savings: 'Save $190',
      perSession: '$79.90/session'
    },
    {
      name: 'Full Prep Program',
      sessions: 20,
      price: 1499,
      savings: 'Save $495',
      perSession: '$74.95/session'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary opacity-15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">Transparent Pricing</Badge>
          
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Invest in Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Career Success
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan to prepare for your next interview. All plans include AI feedback and expert guidance.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Pay per session
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted transition-colors"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Save with packages
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`animate-fade-up ${tier.popular ? 'md:scale-105 md:z-10' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative">
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <Card className={`p-8 h-full flex flex-col hover:border-primary/50 transition-all ${
                    tier.popular ? 'border-primary/50 shadow-2xl' : ''
                  }`}>
                    {/* Header */}
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">InterviewerLevel: {tier.interviewers}</p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      size="lg"
                      className={`mb-6 ${tier.popular
                        ? 'bg-gradient-to-r from-primary to-secondary'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                    >
                      <Link href="/find-interviewers">
                        {tier.cta}
                      </Link>
                    </Button>

                    {/* Features */}
                    <div className="space-y-3 flex-grow">
                      {tier.features.map((feature, j) => (
                        <div key={j} className="flex gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">Interview Packages</h2>
            <p className="text-lg text-muted-foreground">Save more with bundled sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <Card
                key={i}
                className="p-8 hover:border-primary/50 transition-all animate-fade-up text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-primary mb-1">{pkg.sessions}</p>
                <p className="text-sm text-muted-foreground mb-6">Interview sessions</p>

                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 font-semibold text-sm">{pkg.savings}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{pkg.perSession}</p>
                </div>

                <p className="text-3xl font-bold mb-6">${pkg.price}</p>

                <Button className="w-full" size="lg">
                  <Link href="/find-interviewers">
                    Get Package
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I use interviews for multiple job interviews?',
                a: 'Yes! Each interview is fully customizable. We have interviewers across all industries and roles.'
              },
              {
                q: 'What happens if I need to reschedule?',
                a: 'You can reschedule up to 48 hours before your interview with no penalty. Cancellations are refunded within 7 days.'
              },
              {
                q: 'Do I get access to interview recordings?',
                a: 'Yes, all Professional and Executive tier interviews include video recordings for your review.'
              },
              {
                q: 'Can I get a refund?',
                a: '100% satisfaction guaranteed. If you\'re not satisfied, we offer full refunds within 7 days of purchase.'
              },
              {
                q: 'Are interviews 1-on-1?',
                a: 'Yes, all interviews are private 1-on-1 sessions between you and your interviewer.'
              },
              {
                q: 'How are interviewers selected?',
                a: 'All interviewers are vetted professionals with 5+ years of experience from top companies. You can see their profiles before booking.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-secondary/10">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start with a session today and see the difference expert preparation makes.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-white"
            asChild
          >
            <Link href="/find-interviewers">
              Find Your Interviewer
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
