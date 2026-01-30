import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { mockInterviewers } from '@/lib/mock-data'
import InterviewerProfileContent from '@/components/interviewer/interviewer-profile-content'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const interviewer = mockInterviewers.find((i) => i.id === id)

  if (!interviewer) {
    return { title: 'Interviewer Not Found' }
  }

  return {
    title: `${interviewer.name} - ${interviewer.role} at ${interviewer.company} | InterviewHub`,
    description: `Book a mock interview with ${interviewer.name}, a ${interviewer.role} at ${interviewer.company}. ${interviewer.experience} years of experience.`,
  }
}

export default async function InterviewerProfilePage({ params }: PageProps) {
  const { id } = await params
  const interviewer = mockInterviewers.find((i) => i.id === id)

  if (!interviewer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <InterviewerProfileContent interviewer={interviewer} />
    </div>
  )
}
