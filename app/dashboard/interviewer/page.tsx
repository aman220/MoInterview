'use client';

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout';
import { Overview } from '@/components/interviewer-dashboard/overview';

export default function InterviewerDashboardPage() {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
}
