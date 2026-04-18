'use client';

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout';
import { CandidatePipeline } from '@/components/interviewer-dashboard/candidate-pipeline';

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <CandidatePipeline />
    </DashboardLayout>
  );
}
