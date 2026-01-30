'use client'

import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type Interviewer } from '@/lib/types'

interface AvailabilityCalendarProps {
  interviewer: Interviewer
  selectedSlot: { day: string; time: string } | null
  onSlotSelect: (slot: { day: string; time: string } | null) => void
}

export default function AvailabilityCalendar({
  interviewer,
  selectedSlot,
  onSlotSelect,
}: AvailabilityCalendarProps) {
  const [sessionDuration, setSessionDuration] = useState<30 | 45 | 60>(60)

  return (
    <div className="space-y-6">
      {/* Duration Selector */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
        <div className="flex gap-3">
          {[30, 45, 60].map((duration) => (
            <Button
              key={duration}
              variant={sessionDuration === duration ? 'default' : 'outline'}
              onClick={() => setSessionDuration(duration as 30 | 45 | 60)}
              className="flex-1"
            >
              {duration}m
            </Button>
          ))}
        </div>
      </div>

      {/* Availability Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Available Slots</h3>
        <div className="space-y-4">
          {interviewer.availability.map((slot) => (
            <div key={slot.day} className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{slot.day}</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {slot.times.map((time) => (
                  <Button
                    key={`${slot.day}-${time}`}
                    variant={
                      selectedSlot?.day === slot.day && selectedSlot?.time === time
                        ? 'default'
                        : 'outline'
                    }
                    onClick={() =>
                      onSlotSelect({
                        day: slot.day,
                        time,
                      })
                    }
                    className="flex items-center justify-center space-x-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{time}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duration Info */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Session Duration:</strong> {sessionDuration} minutes
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Price:</strong> ${interviewer.pricePerSession} per session
        </p>
      </div>
    </div>
  )
}
