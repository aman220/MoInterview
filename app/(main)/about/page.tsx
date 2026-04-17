import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Users, Zap, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "About MoInterview | Practice Interviews with Real Professionals",
  description: "Learn about MoInterview's mission to help professionals ace their interviews through real practice with experienced interviewers.",
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            About MoInterview
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            We&apos;re on a mission to help professionals practice interviews with real, experienced interviewers from top companies.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Interview preparation shouldn&apos;t be a solo endeavor. We believe the best way to prepare for your dream job is through realistic, personalized practice with experienced professionals who have been through the process themselves.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              MoInterview bridges the gap between candidates and experienced interviewers, creating a platform where real practice happens and genuine feedback shapes better interviewing skills.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Clear Goal</h3>
                  <p className="text-muted-foreground text-sm">
                    Help professionals land their dream jobs through authentic interview practice.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Expert Network</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect with real interviewers from leading tech companies and industries.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real Feedback</h3>
                  <p className="text-muted-foreground text-sm">
                    Get actionable insights from people who actually conduct interviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Authenticity</h3>
            <p className="text-muted-foreground">
              Real interviews require real practice. We connect candidates with genuine interviewers who conduct interviews the way they&apos;re done in real companies.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Excellence</h3>
            <p className="text-muted-foreground">
              We&apos;re committed to the highest standards in interview practice. Every session is designed to push candidates to perform their best.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
            <p className="text-muted-foreground">
              Quality interview coaching shouldn&apos;t be exclusive. We make professional interview practice available to everyone who needs it.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
        <h2 className="text-3xl font-bold mb-12 text-center">How We Work</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="relative">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 mx-auto">
              1
            </div>
            <h3 className="font-semibold text-center mb-3">Sign Up</h3>
            <p className="text-muted-foreground text-center text-sm">
              Create your profile and tell us about your target role and experience level.
            </p>
          </div>
          <div className="relative">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 mx-auto">
              2
            </div>
            <h3 className="font-semibold text-center mb-3">Find Interviewer</h3>
            <p className="text-muted-foreground text-center text-sm">
              Browse experienced interviewers based on company, role, and expertise.
            </p>
          </div>
          <div className="relative">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 mx-auto">
              3
            </div>
            <h3 className="font-semibold text-center mb-3">Book Session</h3>
            <p className="text-muted-foreground text-center text-sm">
              Schedule an interview practice session at a time that works for you.
            </p>
          </div>
          <div className="relative">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 mx-auto">
              4
            </div>
            <h3 className="font-semibold text-center mb-3">Get Feedback</h3>
            <p className="text-muted-foreground text-center text-sm">
              Receive detailed feedback and insights to improve for your real interview.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
        <h2 className="text-3xl font-bold mb-12">Why Choose MoInterview?</h2>
        <div className="space-y-4">
          {[
            "Experienced interviewers from top tech companies and Fortune 500 companies",
            "Real interview scenarios tailored to your target role",
            "Detailed, actionable feedback after each session",
            "Flexible scheduling to fit your preparation timeline",
            "Recorded sessions for review and reflection",
            "Affordable pricing compared to traditional coaching",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start practicing with real interviewers today and get the feedback you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/find-interviewers"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Find an Interviewer
            </Link>
            <Link 
              href="/become-interviewer"
              className="px-8 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Become an Interviewer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
