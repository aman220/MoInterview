import HeroSection from '@/components/sections/hero'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen  bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust & Social Proof */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 border-t border-b border-border">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Companies */}
          <div className="space-y-8">
            <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-light">
              Trusted by professionals from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
                <div
                  key={company}
                  className="text-sm text-muted-foreground font-light hover:text-foreground transition-smooth cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-8 lg:gap-16 pt-12 border-t border-border">
            {[
              { number: '2,000+', label: 'Expert Coaches' },
              { number: '50,000+', label: 'Sessions Completed' },
              { number: '85%', label: 'Job Offer Rate' }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-3xl sm:text-4xl font-light text-foreground">{stat.number}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Minimal */}
      <section className="py-32 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent font-light">Process</p>
            <h2 className="text-5xl sm:text-6xl font-light text-foreground">
              Simple & Effective
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: '01',
                title: 'Find Your Coach',
                description: 'Browse experienced professionals from your target companies.'
              },
              {
                number: '02',
                title: 'Book & Prepare',
                description: 'Schedule your interview and receive preparation materials.'
              },
              {
                number: '03',
                title: 'Learn & Improve',
                description: 'Get feedback and resources to master your interview skills.'
              }
            ].map((step, i) => (
              <div key={i} className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-accent font-light">{step.number}</p>
                <h3 className="text-2xl font-light text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-20 pt-20 border-t border-border">
            <p className="text-center text-sm text-muted-foreground font-light">
              Each interview includes human feedback, AI analysis, and personalized recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-4 sm:px-8 lg:px-12 bg-muted/20 border-y border-border">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-light">Why InterviewHub</p>
            <h2 className="text-5xl sm:text-6xl font-light text-foreground">
              Premium Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Real Professionals', description: 'Interview with actual employees from top companies.' },
              { title: 'Expert Feedback', description: 'Get detailed, personalized feedback from seasoned interviewers.' },
              { title: 'Flexible Scheduling', description: 'Book sessions that fit your schedule. Most available within 48 hours.' },
              { title: 'Video Recordings', description: 'Review your interview and identify areas for improvement.' },
              { title: 'AI Insights', description: 'Detailed performance analysis powered by advanced AI.' },
              { title: 'No Subscriptions', description: 'Pay only for the sessions you book. Full transparency on pricing.' }
            ].map((feature, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-base font-light text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-32 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-light">Success Stories</p>
            <h2 className="text-5xl sm:text-6xl font-light text-foreground">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'InterviewHub helped me crack the Google interview. The real feedback from actual Googlers was invaluable.',
                author: 'James Mitchell',
                role: 'Software Engineer',
                company: 'Google'
              },
              {
                quote: 'The AI insights after each interview showed me exactly what to improve. Game-changer for my career.',
                author: 'Priya Sharma',
                role: 'Product Manager',
                company: 'Amazon'
              },
              {
                quote: 'Being able to practice with actual employees from my target companies was transformational.',
                author: 'Alex Chen',
                role: 'Data Engineer',
                company: 'Meta'
              },
              {
                quote: 'The structured feedback and progress tracking helped me land 3 offers in one month.',
                author: 'Maria Rodriguez',
                role: 'Product Designer',
                company: 'Microsoft'
              }
            ].map((testimonial, i) => (
              <div key={i} className="space-y-4 p-8 border border-border rounded-none hover:border-foreground/50 transition-smooth">
                <p className="text-sm text-muted-foreground font-light italic">"{testimonial.quote}"</p>
                <div className="space-y-1 pt-4 border-t border-border">
                  <p className="text-sm font-light text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground font-light">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-8 lg:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-6xl sm:text-7xl font-light text-foreground">
            Ready to transform your interviews?
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Start your journey to interview mastery. Practice with real professionals and get the job you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="/find-interviewers"
              className="px-12 py-4 bg-foreground text-background hover:bg-foreground/90 transition-smooth text-sm uppercase tracking-widest font-light"
            >
              Explore Coaches
            </Link>
            <Link
              href="/become-interviewer"
              className="px-12 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth text-sm uppercase tracking-widest font-light"
            >
              Become a Coach
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
