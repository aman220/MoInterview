'use client'

import Link from 'next/link'
import { type Interviewer } from '@/lib/types'
import { useState } from 'react'

interface InterviewerCardProps {
  interviewer: Interviewer
}

export default function InterviewerCard({ interviewer }: InterviewerCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="group relative border border-border rounded-none bg-card hover:border-foreground/50 transition-smooth hover:shadow-lg">
      {/* Header with company and rating */}
      <div className="p-6 space-y-6 border-b border-border">
        {/* Top row: name and rating */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-light text-foreground leading-tight">{interviewer.name}</h3>
            <p className="text-sm text-muted-foreground font-light mt-1">{interviewer.role}</p>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex-shrink-0 p-2 hover:bg-muted rounded transition-smooth"
            aria-label="Save"
          >
            <svg
              className={`w-5 h-5 ${isSaved ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        {/* Company and location */}
        <div className="space-y-3">
          <div className="inline-block">
            <p className="text-xs uppercase tracking-widest text-accent font-light">
              {interviewer.company}
            </p>
          </div>
          <p className="text-sm text-muted-foreground font-light line-clamp-2">
            {interviewer.bio}
          </p>
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-3 divide-x divide-border">
        <div className="p-4 text-center">
          <p className="text-lg font-light text-foreground">{interviewer.rating}</p>
          <p className="text-xs text-muted-foreground font-light mt-1">Rating</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-lg font-light text-foreground">${interviewer.pricePerSession}</p>
          <p className="text-xs text-muted-foreground font-light mt-1">Per Hour</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-lg font-light text-foreground">{interviewer.experience}y</p>
          <p className="text-xs text-muted-foreground font-light mt-1">Experience</p>
        </div>
      </div>

      {/* Skills and availability */}
      <div className="p-6 space-y-4 border-t border-border">
        {/* Skills */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Skills</p>
          <div className="flex flex-wrap gap-2">
            {interviewer.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 border border-border text-muted-foreground font-light hover:border-foreground/50 transition-smooth"
              >
                {skill}
              </span>
            ))}
            {interviewer.skills.length > 3 && (
              <span className="text-xs px-2 py-1 border border-border text-muted-foreground font-light">
                +{interviewer.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Next available */}
        <div className="text-xs text-muted-foreground font-light pt-2">
          Next available: <span className="text-foreground">{formatDate(interviewer.nextAvailable)}</span>
        </div>
      </div>

      {/* Action button */}
      <div className="p-6 border-t border-border">
        <Link
          href={`/interviewer/${interviewer.id}`}
          className="block w-full text-center py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth text-sm uppercase tracking-widest font-light"
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}
