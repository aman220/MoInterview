'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Calendar, Briefcase, Award, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Interviewer } from '@/lib/types'
import AvailabilityCalendar from './availability-calendar'
import ReviewsList from './reviews-list'
import BookingCard from './booking-card'

interface InterviewerProfileContentProps {
  interviewer: Interviewer
}

export default function InterviewerProfileContent({
  interviewer,
}: InterviewerProfileContentProps) {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-border">
            <Avatar className="w-24 h-24">
              <AvatarImage src={interviewer.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {interviewer.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{interviewer.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="text-base">{interviewer.company}</Badge>
                    <Badge variant="outline">{interviewer.role}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1 bg-accent/10 px-3 py-2 rounded-lg mb-2">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold text-lg">{interviewer.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({interviewer.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {interviewer.experience} years experience
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-lg mb-4">{interviewer.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {interviewer.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {interviewer.bio}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  With {interviewer.experience} years of experience at {interviewer.company}, {interviewer.name.split(' ')[0]} has conducted hundreds of interviews and helped candidates succeed. They specialize in {interviewer.skills.slice(0, 2).join(' and ')} and are passionate about helping candidates prepare effectively.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Key Strengths</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Expert knowledge of {interviewer.company} hiring process</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Specializes in {interviewer.skills[0]} and {interviewer.skills[1]}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Constructive feedback to help you improve</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <AvailabilityCalendar
                interviewer={interviewer}
                selectedSlot={selectedSlot}
                onSlotSelect={setSelectedSlot}
              />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ReviewsList interviewerId={interviewer.id} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Card Sidebar */}
        <div className="lg:col-span-1">
          <BookingCard
            interviewer={interviewer}
            selectedSlot={selectedSlot}
          />
        </div>
      </div>
    </div>
  )
}
