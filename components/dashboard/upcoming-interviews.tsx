import Link from 'next/link'
import { Calendar, Clock, MapPin, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { mockInterviews } from '@/lib/mock-data'

export default function UpcomingInterviews() {
  const upcomingInterviews = mockInterviews.filter(
    (interview) => interview.status === 'scheduled'
  )

  if (upcomingInterviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No upcoming interviews</p>
        <Button asChild>
          <Link href="/find-interviewers">Book an Interview</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {upcomingInterviews.map((interview) => (
        <Card key={interview.id} className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Interview Info */}
            <div className="flex items-start space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={interview.interviewer.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {interview.interviewer.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{interview.interviewer.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {interview.interviewer.company}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {interview.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {interview.date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{interview.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
