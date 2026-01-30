"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">

      {/* linear background */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-purple-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
      {/* Background gradient accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      {/* Floating company logos/icons */}
      <div className="absolute inset-0 z-5 opacity-[0.08] pointer-events-none">
        {/* Google */}
        <div className="floating-icon absolute top-[15%] left-[10%] text-6xl animate-float-1">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current text-foreground blur-[1px]">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>

        {/* Meta */}
        <div className="floating-icon absolute top-[25%] right-[15%] text-6xl animate-float-2">
          <svg viewBox="0 0 24 24" className="w-14 h-14 fill-current text-foreground blur-[1px]">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>

        {/* Amazon */}
        <div className="floating-icon absolute top-[60%] left-[8%] text-6xl animate-float-3">
          <svg viewBox="0 0 24 24" className="w-20 h-20 fill-current text-foreground blur-[1px]">
            <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.53.406-3.045.608-4.516.608-3.627 0-7.032-.835-10.21-2.5-.708-.37-1.35-.752-1.916-1.145-.16-.114-.23-.22-.21-.31z"/>
            <path d="M21.28 16.62c-.205-.016-.357.024-.455.12-.097.096-.104.21-.02.344l.597.738c.265.337.42.552.465.646.044.094.066.21.066.344 0 .377-.16.693-.48.95-.32.256-.735.384-1.247.384-.477 0-.884-.115-1.22-.344-.336-.23-.504-.523-.504-.88 0-.184.033-.355.1-.515.066-.16.194-.384.383-.673l.387-.597c.225-.357.38-.636.465-.835.086-.2.128-.425.128-.676 0-.534-.195-.992-.586-1.374-.39-.382-.877-.573-1.46-.573-.4 0-.777.097-1.13.29-.353.194-.63.46-.832.8-.2.338-.3.708-.3 1.108 0 .258.05.494.15.71.1.214.24.385.42.51.18.126.385.188.616.188.31 0 .574-.106.79-.318.217-.21.326-.472.326-.783 0-.243-.065-.454-.196-.633-.13-.18-.31-.27-.537-.27-.15 0-.28.04-.39.12-.11.08-.165.185-.165.314 0 .097.033.18.1.248.066.07.1.134.1.194 0 .116-.055.214-.166.294-.11.08-.246.12-.408.12-.226 0-.42-.09-.58-.27-.16-.18-.24-.406-.24-.678 0-.378.147-.702.44-.97.293-.27.666-.404 1.12-.404.486 0 .905.16 1.256.48.35.32.526.713.526 1.18 0 .258-.053.506-.16.744-.106.238-.278.506-.516.805l-.686 1.05c-.197.3-.296.577-.296.83 0 .29.11.536.33.737.22.2.5.3.84.3.387 0 .714-.115.98-.344.266-.23.4-.514.4-.853 0-.178-.037-.344-.11-.497-.073-.153-.2-.344-.38-.573l-.586-.738c-.226-.29-.34-.574-.34-.853 0-.387.137-.718.41-.994.274-.276.62-.414 1.04-.414.434 0 .804.138 1.11.414.306.276.46.623.46 1.04 0 .258-.066.506-.198.745-.132.238-.345.523-.64.854l-.42.463z"/>
          </svg>
        </div>

        {/* Microsoft */}
        <div className="floating-icon absolute top-[70%] right-[12%] text-6xl animate-float-4">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current text-foreground blur-[1px]">
           <path fill="#F35325" d="M1 1h6.5v6.5H1V1z"/><path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z"/><path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z"/><path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z"/>
          </svg>
        </div>

        {/* Apple */}
        <div className="floating-icon absolute top-[40%] right-[8%] text-6xl animate-float-5">
          <svg viewBox="0 0 24 24" className="w-14 h-14 fill-current text-foreground blur-[1px]">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
          </svg>
        </div>

        {/* Netflix */}
        <div className="floating-icon absolute top-[10%] right-[25%] text-6xl animate-float-6">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current text-foreground blur-[1px]">
            <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
          </svg>
        </div>

        {/* Slack */}
        <div className="floating-icon absolute bottom-[15%] left-[20%] text-6xl animate-float-7">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current text-foreground blur-[1px]">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
          </svg>
        </div>

        {/* LinkedIn */}
        <div className="floating-icon absolute bottom-[25%] right-[20%] text-6xl animate-float-8">
          <svg viewBox="0 0 24 24" className="w-14 h-14 fill-current text-foreground blur-[1px]">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>

        {/* Spotify */}
        <div className="floating-icon absolute top-[35%] left-[15%] text-6xl animate-float-9">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current text-foreground blur-[1px]">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>

        {/* Twitter/X */}
        <div className="floating-icon absolute bottom-[35%] left-[25%] text-6xl animate-float-10">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current text-foreground blur-[1px]">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Main content wrapper */}
        <div className="text-center space-y-16 animate-fade-in">
          
          {/* Hero headline */}
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 border border-accent/30 bg-accent/5">
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-light">
                Interview Preparation Platform
              </p>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] text-foreground">
              Perfect your interview
              <br />
              with <span className="font-normal bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">expert guidance</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
              Connect with seasoned professionals from Fortune 500 companies. 
              Receive personalized coaching and master the art of interviewing.
            </p>
          </div>

          {/* CTA Section */}
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

          {/* Featured coaches grid */}
          <div className="pt-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto border border-border">
              
              {/* Coach Card 1 */}
              <div className="relative group border-r border-border p-8 hover:bg-accent/5 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-2xl">
                      👨‍💼
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground">4.9</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-normal text-foreground">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground font-light">Engineering Manager</p>
                    <p className="text-xs text-accent uppercase tracking-wider">Meta</p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">850+ sessions completed</p>
                  </div>
                </div>
              </div>

              {/* Coach Card 2 - Featured */}
              <div className="relative group border-r border-border p-8 bg-accent/5 hover:bg-accent/10 transition-all duration-300">
                <div className="absolute top-4 right-4 px-2 py-1 bg-accent text-background text-xs uppercase tracking-wider">
                  Featured
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-full bg-accent/30 border-2 border-accent flex items-center justify-center text-2xl">
                      👩‍💼
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground">5.0</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-normal text-foreground">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground font-light">Senior Engineer</p>
                    <p className="text-xs text-accent uppercase tracking-wider">Google</p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">1.2k+ sessions completed</p>
                  </div>
                </div>
              </div>

              {/* Coach Card 3 */}
              <div className="relative group p-8 hover:bg-accent/5 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-2xl">
                      👨‍💻
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground">4.8</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-normal text-foreground">David Park</h3>
                    <p className="text-sm text-muted-foreground font-light">Tech Lead</p>
                    <p className="text-xs text-accent uppercase tracking-wider">Amazon</p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">620+ sessions completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link 
                href="/find-interviewers" 
                className="inline-flex items-center text-sm uppercase tracking-[0.2em] text-foreground hover:text-accent transition-all font-light group"
              >
                View All Coaches
                <span className="ml-2 group-hover:ml-4 transition-all">→</span>
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="pt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="border-y border-border py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                  { num: '2,000+', label: 'Expert Coaches', sublabel: 'From top companies' },
                  { num: '50,000+', label: 'Mock Interviews', sublabel: 'Conducted successfully' },
                  { num: '4.9/5.0', label: 'Average Rating', sublabel: 'User satisfaction' },
                  { num: '85%', label: 'Success Rate', sublabel: 'Received offers' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="space-y-3 animate-fade-in"
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  >
                    <p className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                      {stat.num}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-normal text-foreground">
                        {stat.label}
                      </p>
                      <p className="text-xs text-muted-foreground font-light">
                        {stat.sublabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .transition-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-25px, 35px) rotate(-7deg);
          }
          66% {
            transform: translate(25px, -25px) rotate(7deg);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(40px, 20px) rotate(8deg);
          }
          66% {
            transform: translate(-30px, -30px) rotate(-8deg);
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-35px, -25px) rotate(-6deg);
          }
          66% {
            transform: translate(20px, 30px) rotate(6deg);
          }
        }

        @keyframes float-5 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -40px) rotate(10deg);
          }
          66% {
            transform: translate(-25px, 25px) rotate(-10deg);
          }
        }

        @keyframes float-6 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-30px, 30px) rotate(-5deg);
          }
          66% {
            transform: translate(35px, -20px) rotate(5deg);
          }
        }

        @keyframes float-7 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(25px, -35px) rotate(7deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-7deg);
          }
        }

        @keyframes float-8 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-40px, 25px) rotate(-9deg);
          }
          66% {
            transform: translate(30px, -30px) rotate(9deg);
          }
        }

        @keyframes float-9 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(35px, 30px) rotate(6deg);
          }
          66% {
            transform: translate(-25px, -25px) rotate(-6deg);
          }
        }

        @keyframes float-10 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-20px, -35px) rotate(-8deg);
          }
          66% {
            transform: translate(25px, 25px) rotate(8deg);
          }
        }

        .animate-float-1 {
          animation: float-1 20s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 25s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 22s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 28s ease-in-out infinite;
        }

        .animate-float-5 {
          animation: float-5 24s ease-in-out infinite;
        }

        .animate-float-6 {
          animation: float-6 26s ease-in-out infinite;
        }

        .animate-float-7 {
          animation: float-7 23s ease-in-out infinite;
        }

        .animate-float-8 {
          animation: float-8 27s ease-in-out infinite;
        }

        .animate-float-9 {
          animation: float-9 21s ease-in-out infinite;
        }

        .animate-float-10 {
          animation: float-10 29s ease-in-out infinite;
        }

        .floating-icon {
          will-change: transform;
        }
      `}</style>
    </section>
  )
}