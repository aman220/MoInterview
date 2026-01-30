'use client'

import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'James Mitchell',
      company: 'Google',
      role: 'Software Engineer',
      avatar: 'https://avatar.vercel.sh/user?u=jamesmitchell',
      quote: 'InterviewHub helped me crack the Google interview. The real feedback from actual Googlers was invaluable. I went from nervous to confident.',
      rating: 5,
      result: 'Got offer at Google'
    },
    {
      name: 'Priya Sharma',
      company: 'Amazon',
      role: 'Product Manager',
      avatar: 'https://avatar.vercel.sh/user?u=priyasharma',
      quote: 'The AI insights after each interview showed me exactly what to improve. Went from struggling to confidently passing every round. Game-changer!',
      rating: 5,
      result: 'Promoted to Senior PM'
    },
    {
      name: 'Alex Chen',
      company: 'Meta',
      role: 'Data Engineer',
      avatar: 'https://avatar.vercel.sh/user?u=alexchen',
      quote: 'Being able to practice with actual employees from my target companies was transformational. The personalized feedback was incredibly valuable.',
      rating: 5,
      result: 'Hired at Meta'
    },
    {
      name: 'Maria Rodriguez',
      company: 'Microsoft',
      role: 'Product Designer',
      avatar: 'https://avatar.vercel.sh/user?u=mariarodriguez',
      quote: 'The structured feedback and progress tracking helped me improve systematically. Landed 3 offers and negotiated great compensation.',
      rating: 5,
      result: 'Offers from 3 companies'
    },
    {
      name: 'David Kim',
      company: 'Apple',
      role: 'Backend Engineer',
      avatar: 'https://avatar.vercel.sh/user?u=davidkim',
      quote: 'InterviewHub prepared me better than any other platform. The interviewer quality and AI analysis were exceptional. Highly recommend!',
      rating: 5,
      result: 'Joined Apple'
    },
    {
      name: 'Sarah Thompson',
      company: 'Netflix',
      role: 'Data Scientist',
      avatar: 'https://avatar.vercel.sh/user?u=sarahthompson',
      quote: 'As someone changing careers, this platform gave me the confidence I needed. The feedback was detailed and actionable every single time.',
      rating: 5,
      result: 'Career switch successful'
    }
  ]

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">Success Stories</Badge>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-foreground">Trusted by</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Thousands of Job Seekers</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how professionals landed their dream jobs using InterviewHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <Card className="relative h-full p-6 flex flex-col hover:border-primary/50 transition-all duration-300 overflow-hidden">
                {/* Background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl group-hover:opacity-100 opacity-50 transition-opacity"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote icon and text */}
                  <div className="mb-6 flex-grow">
                    <div className="inline-block p-2 bg-primary/10 rounded-lg mb-3">
                      <Quote className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground leading-relaxed font-medium">&quot;{testimonial.quote}&quot;</p>
                  </div>

                  {/* Result badge */}
                  <div className="mb-4 pb-4 border-b border-border">
                    <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-300/50">
                      ✓ {testimonial.result}
                    </Badge>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary font-semibold">{testimonial.company}</p>
                    </div>
                  </div>
                </div>

                {/* Border animation */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/30 transition-all duration-300 pointer-events-none"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          {[
            { label: 'Successful Placements', value: '8,500+' },
            { label: 'Average Salary Increase', value: '+42%' },
            { label: 'Client Satisfaction', value: '4.9/5' },
            { label: 'Companies Represented', value: '500+' }
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center hover:border-primary/50 transition-colors animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
