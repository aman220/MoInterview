'use client';

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout';
import { InterviewNotes } from '@/components/interviewer-dashboard/interview-notes';

export default function NotesPage() {
  return (
    <DashboardLayout>
      <InterviewNotes />
    </DashboardLayout>
  );
}
