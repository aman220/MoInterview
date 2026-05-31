'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Check } from 'lucide-react'
import { setLazyProp } from 'next/dist/server/api-utils'

export default function SignupPage() {
  const [step, setStep] = useState<'role' | 'form'>('role')
  const [role, setRole] = useState<'candidate' | 'interviewer' | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const passwordRequirements = [
    { met: formData.password.length >= 8, label: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), label: 'One uppercase letter' },
    { met: /[0-9]/.test(formData.password), label: 'One number' },
    { met: /[!@#$%^&*]/.test(formData.password), label: 'One special character' }
  ]

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password })
    const strength = passwordRequirements.filter(req => req.met).length
    setPasswordStrength(strength)
  }

  const handleRoleSelect = (selectedRole: 'candidate' | 'interviewer') => {
    setRole(selectedRole)
    setStep('form')
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordStrength < 3) {
      setError('P9assword is not strong enough')
      return
    }

    if (!formData.agree) {
      setError('Please accept the terms and conditions');
      setLazyProp
      return
    }
 
    setLoading(true)

    try {
      // Mock signup - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success - redirect based on role
      const redirectUrl = role === 'interviewer' ? '/interviewer-onboarding' : '/dashboard'
      window.location.href = redirectUrl
    } catch (err) {
      setError('An error occurred during signup. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      <div className="border-b border-border py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-sm uppercase tracking-widest font-light text-muted-foreground hover:text-foreground transition-smooth">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-light text-foreground">Create Account</h1>
            <p className="text-muted-foreground font-light">Join InterviewHub and start your journey</p>
          </div>

          {/* Role Selection Step */}
          {step === 'role' && (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide font-light text-muted-foreground mb-6">Select your role</p>
              
              {/* Candidate Role */}
              <button
                onClick={() => handleRoleSelect('candidate')}
                className="w-full p-6 border-2 border-border rounded hover:border-accent hover:bg-muted/50 transition-smooth space-y-3 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-light text-foreground text-lg uppercase tracking-wide">Candidate</h3>
                    <p className="text-sm text-muted-foreground font-light mt-1">Practice interviews with expert coaches</p>
                  </div>
                  <div className="w-5 h-5 border-2 border-border rounded-full group-hover:border-accent transition-smooth"></div>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2 font-light">
                  <div className=''>  
                    <span>
                      <strong className='text-foreground'>Free for candidates</strong> - Pay only for coaching sessions    v 
                    </span>
f
                  </div>
                  <li>• Find coaches from top companies</li>
                  <li>• Get expert feedback</li>
                  <li>• Track progress over time</li>
                   
                </ul>
              </button>

              {/* Interviewer Role */}
              <button
                onClick={() => handleRoleSelect('interviewer')}
                className="w-full p-6 border-2 border-border rounded hover:border-accent hover:bg-muted/50 transition-smooth space-y-3 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-light text-foreground text-lg uppercase tracking-wide">Coach/Interviewer</h3>
                    <p className="text-sm text-muted-foreground font-light mt-1">Share expertise and earn money</p>
                  </div>
                  <div className="w-5 h-5 border-2 border-border rounded-full group-hover:border-accent transition-smooth"></div>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2 font-light">
                  <li>• Set your own rates and schedule</li>
                  <li>• Help candidates succeed</li>
                  <li>• Build your coaching business</li>
                </ul>
              </button>

              <p className="text-xs text-muted-foreground text-center font-light mt-8">
                Already have an account?{' '}
                <Link href="/login" className="text-accent hover:text-accent/80 transition-smooth">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {/* Registration Form Step */}
          {step === 'form' && role && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep('role')}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-light mb-4"
              >
                ← Change role
              </button>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Role Badge */}
              <div className="p-3 bg-muted rounded text-sm font-light text-foreground">
                Signing up as: <span className="font-normal uppercase tracking-wide">{role === 'candidate' ? 'Candidate' : 'Coach/Interviewer'}</span>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-light text-foreground uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-smooth"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-light text-foreground uppercase tracking-wide">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-smooth"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-light text-foreground uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-smooth"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-light text-foreground uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-smooth"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="space-y-2 mt-3 p-3 bg-muted rounded text-xs">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${req.met ? 'bg-secondary border-secondary' : 'border-border'}`}>
                          {req.met && <Check className="w-3 h-3 text-secondary-foreground" />}
                        </div>
                        <span className={req.met ? 'text-foreground' : 'text-muted-foreground'}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-light text-foreground uppercase tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-smooth"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="w-4 h-4 border border-border rounded bg-input cursor-pointer mt-1"
                />
                <span className="text-xs text-muted-foreground font-light leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-accent hover:text-accent/80 transition-smooth">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-accent hover:text-accent/80 transition-smooth">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.agree || passwordStrength < 3}
                className="w-full py-3 mt-8 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest font-light rounded transition-smooth"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Sign In Link */}
          {step === 'role' && (
            <div className="text-center mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground font-light">
                Already have an account?{' '}
                <Link href="/login" className="text-accent hover:text-accent/80 transition-smooth font-light">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
