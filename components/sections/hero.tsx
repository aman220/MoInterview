import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
      {/* Subtle background line */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-border"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 items-center">
          {/* Left content */}
          <div className="space-y-12 animate-fade-in">
            {/* Premium headline - using serif typography aesthetic */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-tight text-foreground">
                Master your
                <br />
                <span className="font-normal">interview</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Practice with real professionals from top companies. Get expert feedback and confidence before your real interview.
              </p>
            </div>

            {/* CTA Buttons - minimal style */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button
                asChild
                className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-none text-base font-light tracking-wide transition-smooth"
              >
                <Link href="/find-interviewers">
                  EXPLORE INTERVIEWERS
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 px-8 border border-foreground text-foreground hover:bg-foreground/5 rounded-none text-base font-light tracking-wide transition-smooth"
              >
                <Link href="/become-interviewer">
                  BECOME AN INTERVIEWER
                </Link>
              </Button>
            </div>

            {/* Divider */}
            <div className="pt-12">
              <div className="h-px bg-border mb-8"></div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">
                Trusted by professionals from leading companies
              </p>
            </div>
          </div>

          {/* Right side - Elegant showcase */}
          <div className="relative h-96 lg:h-screen max-h-96 lg:max-h-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-full bg-muted/40 border border-border flex items-center justify-center overflow-hidden group">
              {/* Content inside showcase */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
                {/* Interviewer avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-4xl">
                  👤
                </div>

                {/* Interview info */}
                <div className="text-center space-y-2">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground font-light">Premium Interview Coach</p>
                  <h3 className="text-lg font-light text-foreground">Sarah Johnson</h3>
                  <p className="text-xs text-muted-foreground">Senior Engineer • Google</p>
                </div>

                {/* Stats */}
                <div className="flex gap-8 text-center">
                  <div className="space-y-1">
                    <p className="text-xl font-light text-foreground">4.9</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="w-px bg-border"></div>
                  <div className="space-y-1">
                    <p className="text-xl font-light text-foreground">1.2k+</p>
                    <p className="text-xs text-muted-foreground">Sessions</p>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-8 text-sm uppercase tracking-widest text-accent hover:text-accent/80 transition-smooth font-light">
                  VIEW PROFILE →
                </button>
              </div>

              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Bottom stats - minimal design */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 lg:mt-32 pt-12 lg:pt-20 border-t border-border text-center">
          {[
            { num: '2000+', label: 'Coaches' },
            { num: '50k+', label: 'Sessions' },
            { num: '4.9★', label: 'Rating' },
            { num: '85%', label: 'Offer Rate' }
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center space-y-2 animate-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <p className="text-2xl sm:text-3xl font-light text-foreground">
                {stat.num}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
