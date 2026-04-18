'use client';

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout';
import { PerformanceAnalytics } from '@/components/interviewer-dashboard/performance-analytics';

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <PerformanceAnalytics />
    </DashboardLayout>
  );
}
