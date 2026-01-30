import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to ace your next interview?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start practicing with real professionals today. First interview available within 48 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 text-base font-semibold"
          >
            <Link href="/find-interviewers">
              Find Interviewers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 text-base font-semibold bg-transparent"
          >
            <Link href="#contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
