'use client';

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout';
import { InterviewerSettings } from '@/components/interviewer-dashboard/interviewer-settings';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <InterviewerSettings />
    </DashboardLayout>
  );
}
