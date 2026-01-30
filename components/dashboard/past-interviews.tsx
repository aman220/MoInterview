import Link from 'next/link'
import { Calendar, Play, FileText, BarChart3 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { mockInterviews } from '@/lib/mock-data'

export default function PastInterviews() {
  const pastInterviews = mockInterviews.filter(
    (interview) => interview.status === 'completed'
  )

  if (pastInterviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No past interviews yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pastInterviews.map((interview) => (
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
                  <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Completed
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {interview.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  • {interview.type} Interview
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-transparent"
              >
                <a href={interview.recordingUrl || '#'}>
                  <Play className="w-4 h-4" />
                  <span>Watch</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-transparent"
              >
                <a href={interview.transcriptUrl || '#'}>
                  <FileText className="w-4 h-4" />
                  <span>Transcript</span>
                </a>
              </Button>
              <Button
                asChild
                variant="default"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Link href={`/feedback/${interview.id}`}>
                  <BarChart3 className="w-4 h-4" />
                  <span>View Report</span>
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
