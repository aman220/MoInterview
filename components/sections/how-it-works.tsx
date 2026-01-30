import { Search, Calendar, Video, BarChart3, Trophy, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Find Your Perfect Match',
      description: 'Browse 2,000+ verified interviewers from top companies. Filter by role, experience level, expertise, and price.',
      icon: Search,
      details: ['Filter by company', 'View ratings & reviews', 'Check availability', 'Read bio & experience']
    },
    {
      number: '02',
      title: 'Book & Prepare',
      description: 'Schedule your interview at a time that works for you. Get interview tips and preparation materials.',
      icon: Calendar,
      details: ['Instant booking', 'Flexible scheduling', 'Pre-interview prep', 'Interview reminders']
    },
    {
      number: '03',
      title: 'Live Interview',
      description: 'Connect with your interviewer via video. Experience a realistic interview with real-time feedback.',
      icon: Video,
      details: ['Professional environment', 'Screen sharing', 'Live chat support', 'Recording available']
    },
    {
      number: '04',
      title: 'Get AI Analysis',
      description: 'Receive comprehensive AI-powered analysis of your performance with detailed insights.',
      icon: BarChart3,
      details: ['Performance score', 'Category breakdown', 'Transcript analysis', 'Time tracking']
    },
    {
      number: '05',
      title: 'Expert Feedback',
      description: 'Get personalized feedback from your interviewer including strengths and areas to improve.',
      icon: Trophy,
      details: ['Written feedback', 'Video highlights', 'Specific tips', 'Practice suggestions']
    },
    {
      number: '06',
      title: 'Improve & Repeat',
      description: 'Apply feedback, practice more, and track your progress. Book follow-up sessions to ace your interviews.',
      icon: Zap,
      details: ['Track progress', 'Compare scores', 'Book follow-ups', 'Success stories']
    }
  ]

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-foreground">How It</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six powerful steps to transform your interview preparation and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Card className="relative h-full p-6 hover:border-primary/50 transition-all group overflow-hidden">
                  {/* Background gradient accent */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl group-hover:opacity-100 opacity-50 transition-opacity"></div>

                  <div className="relative z-10">
                    {/* Step number and icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                        {step.number}
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Title and description */}
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

                    {/* Details list */}
                    <div className="space-y-2 pt-4 border-t border-border">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Process flow diagram */}
        <div className="mt-20 hidden lg:block">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <div key={num} className="flex items-center flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm">
                  {num}
                </div>
                {index < 5 && (
                  <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
