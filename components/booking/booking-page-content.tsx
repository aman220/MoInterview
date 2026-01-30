'use client'

import React from "react"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { mockInterviewers, mockUser } from '@/lib/mock-data'
import BookingDetails from './booking-details'
import BookingForm from './booking-form'
import BookingSummary from './booking-summary'

export default function BookingPageContent() {
  const searchParams = useSearchParams()
  const interviewerId = searchParams.get('interviewer')
  const selectedDay = searchParams.get('day')
  const selectedTime = searchParams.get('time')

  const [interviewNotes, setInterviewNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const interviewer = interviewerId
    ? mockInterviewers.find((i) => i.id === interviewerId)
    : null

  if (!interviewer || !selectedDay || !selectedTime) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Invalid booking parameters</p>
        <a href="/find-interviewers" className="text-primary hover:underline">
          Go back to find interviewers
        </a>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // In a real app, redirect to confirmation page
      alert('Booking confirmed! Check your email for details.')
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-8">
        {/* Booking Details */}
        <BookingDetails
          interviewer={interviewer}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
        />

        {/* Form */}
        <BookingForm
          interviewNotes={interviewNotes}
          onNotesChange={setInterviewNotes}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          isProcessing={isProcessing}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-1">
        <BookingSummary
          interviewer={interviewer}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
        />
      </div>
    </div>
  )
}
