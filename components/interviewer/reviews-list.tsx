'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  text: string
}

interface ReviewsListProps {
  interviewerId: string
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Emma Wilson',
    avatar: 'https://avatar.vercel.sh/user?u=emmawilson',
    rating: 5,
    date: '2 weeks ago',
    text: 'Excellent interviewer! Very knowledgeable and gave great feedback. Helped me prepare for my Google interview.',
  },
  {
    id: '2',
    author: 'Michael Brown',
    avatar: 'https://avatar.vercel.sh/user?u=michaelbrown',
    rating: 5,
    date: '1 month ago',
    text: 'Professional and thorough. Asked challenging questions that really helped me think through my approach.',
  },
  {
    id: '3',
    author: 'Sarah Davis',
    avatar: 'https://avatar.vercel.sh/user?u=sarahdavis',
    rating: 4,
    date: '1 month ago',
    text: 'Great session overall. Helpful feedback on communication and problem-solving approach.',
  },
]

export default function ReviewsList({ interviewerId }: ReviewsListProps) {
  return (
    <div className="space-y-6">
      {mockReviews.map((review) => (
        <div
          key={review.id}
          className="border border-border rounded-lg p-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {review.author.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent text-accent"
                />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <p className="text-muted-foreground leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  )
}
