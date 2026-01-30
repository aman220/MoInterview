export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'candidate' | 'interviewer'
  bio?: string
  resumeUrl?: string
}

export interface Interviewer {
  id: string
  name: string
  company: string
  role: string
  experience: number
  avatar: string
  bio: string
  skills: string[]
  rating: number
  reviewCount: number
  pricePerSession: number
  nextAvailable: Date
  availability: AvailabilitySlot[]
}

export interface AvailabilitySlot {
  day: string
  times: string[]
}

export interface Interview {
  id: string
  candidateId: string
  interviewerId: string
  interviewer: Interviewer
  date: Date
  duration: number // in minutes
  type: 'DSA' | 'System Design' | 'Behavioral' | 'HR' | 'Technical'
  status: 'scheduled' | 'completed' | 'cancelled'
  price: number
  notes?: string
  recordingUrl?: string | null
  transcriptUrl?: string | null
}

export interface Feedback {
  id: string
  interviewId: string
  communicationClarity: number // 0-10
  technicalDepth: number // 0-10
  confidence: number // 0-10
  problemSolving: number // 0-10
  strengths: string[]
  weaknesses: string[]
  improvementPlan: string[]
  recommendedResources: string[]
  overallScore: number // 0-10
  generatedAt: Date
}

export interface InterviewerFilterOptions {
  companies?: string[]
  roles?: string[]
  experienceRange?: [number, number]
  interviewTypes?: string[]
  priceRange?: [number, number]
  minRating?: number
}

export type SortOption = 'rating' | 'price' | 'availability' | 'experience'
