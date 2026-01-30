'use client'

import Link from 'next/link'
import { Clock, Calendar, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type Interviewer } from '@/lib/types'

interface BookingCardProps {
  interviewer: Interviewer
  selectedSlot: { day: string; time: string } | null
}

export default function BookingCard({
  interviewer,
  selectedSlot,
}: BookingCardProps) {
  const sessionDuration = 60 // default
  const totalPrice = interviewer.pricePerSession

  return (
    <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Book Interview</h3>
        <p className="text-sm text-muted-foreground">
          ${interviewer.pricePerSession} per {sessionDuration}-minute session
        </p>
      </div>

      {/* Selected Slot */}
      {selectedSlot ? (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">Your Selection</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{selectedSlot.day}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{selectedSlot.time} - {sessionDuration} min</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Select a time slot above to continue
          </p>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Session Duration</span>
          <span className="font-medium">{sessionDuration} min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Interviewer Rate</span>
          <span className="font-medium">${interviewer.pricePerSession}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg text-primary">${totalPrice}</span>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          What&apos;s Included
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Live interview session</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Recording & transcript</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Human feedback</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>AI performance report</span>
          </li>
        </ul>
      </div>

      {/* CTA Button */}
      <Button
        asChild
        size="lg"
        className="w-full h-12"
        disabled={!selectedSlot}
      >
        <Link
          href={selectedSlot ? `/booking?interviewer=${interviewer.id}&day=${selectedSlot.day}&time=${encodeURIComponent(selectedSlot.time)}` : '#'}
        >
          Continue to Checkout
        </Link>
      </Button>

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center">
        Free cancellation up to 24 hours before the session
      </p>
    </div>
  )
}
