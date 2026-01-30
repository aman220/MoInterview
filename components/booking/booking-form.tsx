'use client'

import React from "react"

import { CreditCard, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'

interface BookingFormProps {
  interviewNotes: string
  onNotesChange: (notes: string) => void
  paymentMethod: 'card' | 'paypal'
  onPaymentMethodChange: (method: 'card' | 'paypal') => void
  isProcessing: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function BookingForm({
  interviewNotes,
  onNotesChange,
  paymentMethod,
  onPaymentMethodChange,
  isProcessing,
  onSubmit,
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Interview Notes */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-2xl font-bold mb-6">Interview Preparation</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
              What would you like to focus on?
            </Label>
            <Textarea
              id="notes"
              placeholder="e.g., I want to focus on system design questions for distributed systems. Please also provide feedback on my communication skills."
              value={interviewNotes}
              onChange={(e) => onNotesChange(e.target.value)}
              className="min-h-32"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Share any specific topics, companies, or skills you&apos;d like to practice
            </p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

        <RadioGroup value={paymentMethod} onValueChange={(value) => onPaymentMethodChange(value as 'card' | 'paypal')}>
          {/* Credit Card */}
          <div className="mb-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-grow cursor-pointer">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-semibold">Credit or Debit Card</span>
                </div>
              </Label>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-4 space-y-4 ml-8">
                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    defaultValue="john@example.com"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardname" className="text-sm">
                      Name on Card
                    </Label>
                    <Input
                      id="cardname"
                      placeholder="John Doe"
                      defaultValue="John Doe"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardnumber" className="text-sm">
                      Card Number
                    </Label>
                    <Input
                      id="cardnumber"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-sm">
                      Expiry
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      defaultValue="12/26"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc" className="text-sm">
                      CVC
                    </Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      defaultValue="123"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-sm">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      defaultValue="10001"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PayPal */}
          <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex-grow font-semibold cursor-pointer">
                PayPal
              </Label>
            </div>
          </div>
        </RadioGroup>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Your payment is processed securely by Stripe. Your card details are never stored on our servers.
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            defaultChecked
            className="mt-1 rounded border-border"
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
            I agree to the Terms of Service and Privacy Policy. I understand that interviews are recorded for my reference only.
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-12 text-base font-semibold"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Confirm & Pay $120'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Free cancellation up to 24 hours before the session
      </p>
    </form>
  )
}
