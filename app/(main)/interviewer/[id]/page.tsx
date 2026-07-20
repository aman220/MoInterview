import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchInterviewerDetail, type InterviewerDetail } from '@/lib/interviewers'
import InterviewerProfileContent from '@/components/interviewer/interviewer-profile-content'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getInterviewer(id: string): Promise<InterviewerDetail | null> {
  try {
    return await fetchInterviewerDetail(id)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const interviewer = await getInterviewer(id)

  if (!interviewer) {
    return { title: 'Interviewer Not Found' }
  }

  return {
    title: `${interviewer.name} - ${interviewer.role} at ${interviewer.company} | MoInterview`,
    description: `Book a mock interview with ${interviewer.name}, a ${interviewer.role} at ${interviewer.company}. ${interviewer.experience} years of experience.`,
  }
}

export default async function InterviewerProfilePage({ params }: PageProps) {
  const { id } = await params
  const interviewer = await getInterviewer(id)

  if (!interviewer) {
    notFound()
  }

  return <InterviewerProfileContent interviewer={interviewer} />
}
