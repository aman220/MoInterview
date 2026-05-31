import { Metadata } from 'next'
import InterviewersGrid from '@/components/interviewers/interviewers-grid'

export const metadata: Metadata = {
  title: 'Find Your Coach — MoInterview',
  description: 'Practice with engineers, PMs and leaders from the companies you\'re targeting — and get the unfiltered feedback that gets you hired.',
}

export default function FindInterviewersPage() {
  return <InterviewersGrid />
}
