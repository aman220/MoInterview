import { Calendar, Clock, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { type Interviewer } from '@/lib/types'

interface BookingDetailsProps {
  interviewer: Interviewer
  selectedDay: string
  selectedTime: string
}

export default function BookingDetails({
  interviewer,
  selectedDay,
  selectedTime,
}: BookingDetailsProps) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card">
      <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

      {/* Interviewer Info */}
      <div className="flex items-start space-x-4 pb-6 border-b border-border">
        <Avatar className="w-16 h-16">
          <AvatarImage src={interviewer.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {interviewer.name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{interviewer.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {interviewer.company}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {interviewer.role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {interviewer.experience} years of experience
          </p>
        </div>
      </div>

      {/* Session Details */}
      <div className="space-y-4 mt-6">
        {/* Date & Time */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Date & Time</p>
            <p className="text-sm text-muted-foreground">
              {selectedDay} at {selectedTime}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Duration</p>
            <p className="text-sm text-muted-foreground">60 minutes</p>
          </div>
        </div>

        {/* Interview Type */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Interview Type</p>
            <p className="text-sm text-muted-foreground">
              Technical Interview
            </p>
          </div>
        </div>
      </div>

      {/* What to expect */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm font-semibold mb-3">What to expect:</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Interview will be conducted via video call</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Session will be recorded for your reference</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>You&apos;ll receive written feedback and AI analysis</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Join 10 minutes early for technical setup</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
