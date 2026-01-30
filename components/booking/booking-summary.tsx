import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { type Interviewer } from '@/lib/types'

interface BookingSummaryProps {
  interviewer: Interviewer
  selectedDay: string
  selectedTime: string
}

export default function BookingSummary({
  interviewer,
  selectedDay,
  selectedTime,
}: BookingSummaryProps) {
  const sessionDuration = 60
  const subtotal = interviewer.pricePerSession
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  return (
    <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card space-y-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      {/* Interviewer Summary */}
      <div className="flex items-start space-x-3 pb-4 border-b border-border">
        <Avatar className="w-10 h-10">
          <AvatarImage src={interviewer.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {interviewer.name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{interviewer.name}</p>
          <p className="text-xs text-muted-foreground">{interviewer.company} • {interviewer.role}</p>
        </div>
      </div>

      {/* Session Details */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Date & Time</span>
          <span className="font-medium">{selectedDay} @ {selectedTime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium">{sessionDuration} minutes</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Interview Type</span>
          <span className="font-medium">Technical</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Interviewer Rate</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service Fee (10%)</span>
          <span>${serviceFee}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-border pt-4 flex justify-between">
        <span className="font-semibold">Total</span>
        <span className="text-2xl font-bold text-primary">${total}</span>
      </div>

      {/* What's Included */}
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Included
        </p>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>Live video interview</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>HD recording</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>Transcript</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>Written feedback</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>AI performance report</span>
          </li>
        </ul>
      </div>

      {/* Info */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
        <p>Free cancellation up to 24 hours before</p>
      </div>
    </div>
  )
}
