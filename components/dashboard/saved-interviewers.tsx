import Link from 'next/link'
import { Star, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { mockInterviewers } from '@/lib/mock-data'

export default function SavedInterviewers() {
  // Mock saved interviewers (first 3)
  const savedInterviewers = mockInterviewers.slice(0, 3)

  if (savedInterviewers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No saved interviewers yet</p>
        <Button asChild>
          <Link href="/find-interviewers">Browse Interviewers</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedInterviewers.map((interviewer) => (
        <Card key={interviewer.id} className="p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={interviewer.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {interviewer.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Info */}
          <h3 className="font-semibold text-lg mb-1">{interviewer.name}</h3>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {interviewer.company}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {interviewer.role}
            </Badge>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
            {interviewer.bio}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-4 pb-4 border-b border-border">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold text-sm">{interviewer.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({interviewer.reviewCount} reviews)
            </span>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">per session</p>
              <p className="text-lg font-bold text-primary">${interviewer.pricePerSession}</p>
            </div>
            <Button
              asChild
              size="sm"
              className="h-9"
            >
              <Link href={`/interviewer/${interviewer.id}`}>
                Book
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
