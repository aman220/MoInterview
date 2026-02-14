import HeroSection from '@/components/sections/hero'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust & Social Proof */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        {/* Subtle linear background */}
        <div className="absolute inset-0 bg-linear-to-b from-accent/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative">
          {/* Companies */}
          <div className="space-y-12">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/80 font-medium">
              Trusted by professionals from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-16">
              {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
                <div
                  key={company}
                  className="text-xl text-muted-foreground/60 font-light hover:text-foreground hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="relative py-32 px-4 sm:px-8 lg:px-12 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Process</p>
            </div>
            <h2 className="text-5xl sm:text-7xl font-light text-foreground tracking-tight">
              Simple & Effective
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Three straightforward steps to interview mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: '01',
                title: 'Find Your Coach',
                description: 'Browse experienced professionals from your target companies.',
                icon: '🎯'
              },
              {
                number: '02',
                title: 'Book & Prepare',
                description: 'Schedule your interview and receive preparation materials.',
                icon: '📅'
              },
              {
                number: '03',
                title: 'Learn & Improve',
                description: 'Get feedback and resources to master your interview skills.',
                icon: '🚀'
              }
            ].map((step, i) => (
              <div 
                key={i} 
                className="group relative space-y-6 p-8 rounded-2xl border border-border/50 bg-linear-to-br from-background to-muted/30 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between">
                  <span className="text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {step.icon}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-accent/60 font-medium px-3 py-1 bg-accent/5 rounded-full">
                    {step.number}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-light text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector line for desktop */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-linear-to-r from-border to-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Enhanced divider section */}
          <div className="mt-24 pt-12 border-t border-border/50">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground font-light">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Each interview includes human feedback, AI analysis, and personalized recommendations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="relative py-32 px-4 sm:px-8 lg:px-12 bg-linear-to-b from-muted/30 via-muted/10 to-background border-y border-border/50 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-linear(to_right,#80808008_1px,transparent_1px),linear-linear(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="max-w-7xl mx-auto space-y-20 relative">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Why InterviewHub</p>
            </div>
            <h2 className="text-5xl sm:text-7xl font-light text-foreground tracking-tight">
              Premium Experience
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Everything you need to ace your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Real Professionals', 
                description: 'Interview with actual employees from top companies.',
                icon: '👥'
              },
              { 
                title: 'Expert Feedback', 
                description: 'Get detailed, personalized feedback from seasoned interviewers.',
                icon: '💡'
              },
              { 
                title: 'Flexible Scheduling', 
                description: 'Book sessions that fit your schedule. Most available within 48 hours.',
                icon: '⏰'
              },
              { 
                title: 'Video Recordings', 
                description: 'Review your interview and identify areas for improvement.',
                icon: '📹'
              },
              { 
                title: 'AI Insights', 
                description: 'Detailed performance analysis powered by advanced AI.',
                icon: '🤖'
              },
              { 
                title: 'No Subscriptions', 
                description: 'Pay only for the sessions you book. Full transparency on pricing.',
                icon: '✨'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative space-y-6 p-8 rounded-2xl border border-border/50 bg-linear-to-br from-background to-muted/30 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative space-y-3">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-light text-foreground tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-32 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Success Stories</p>
            </div>
            <h2 className="text-5xl sm:text-7xl font-light text-foreground tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Real stories from professionals who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'InterviewHub helped me crack the Google interview. The real feedback from actual Googlers was invaluable.',
                author: 'James Mitchell',
                role: 'Software Engineer',
                company: 'Google',
                rating: 5
              },
              {
                quote: 'The AI insights after each interview showed me exactly what to improve. Game-changer for my career.',
                author: 'Priya Sharma',
                role: 'Product Manager',
                company: 'Amazon',
                rating: 5
              },
              {
                quote: 'Being able to practice with actual employees from my target companies was transformational.',
                author: 'Alex Chen',
                role: 'Data Engineer',
                company: 'Meta',
                rating: 5
              },
              {
                quote: 'The structured feedback and progress tracking helped me land 3 offers in one month.',
                author: 'Maria Rodriguez',
                role: 'Product Designer',
                company: 'Microsoft',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="group relative space-y-6 p-10 rounded-2xl border border-border/50 bg-linear-to-br from-background to-muted/20 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
              >
                {/* Quote icon */}
                <div className="text-6xl text-accent/20 leading-none">"</div>
                
                <p className="text-base text-foreground/90 font-light italic leading-relaxed -mt-8">
                  {testimonial.quote}
                </p>
                
                {/* Star rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-accent" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                
                <div className="space-y-1 pt-6 border-t border-border/50">
                  <p className="text-base font-light text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground font-light">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="relative py-32 px-4 sm:px-8 lg:px-12 border-t border-border/50 overflow-hidden">
        {/* linear background */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-purple-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center space-y-10 relative">
          <h2 className="text-6xl sm:text-8xl font-light text-foreground tracking-tight leading-[1.1]">
            Ready to transform<br />your interviews?
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Start your journey to interview mastery. Practice with real professionals and get the job you want.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="/find-interviewers"
              className="group relative px-12 py-5 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium rounded-full overflow-hidden hover:shadow-2xl hover:shadow-foreground/20 hover:scale-105"
            >
              <span className="relative z-10">Explore Coaches</span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </Link>
            <Link
              href="/become-interviewer"
              className="group px-12 py-5 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium rounded-full hover:shadow-xl hover:shadow-foreground/10 hover:scale-105"
            >
              Become a Coach
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}