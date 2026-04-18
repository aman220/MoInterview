'use client'

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout'
import { AvailabilityManager } from '@/components/interviewer-dashboard/availability-manager'

export default function AvailabilityPage() {
  return (
    <DashboardLayout>
      <AvailabilityManager />
    </DashboardLayout>
  )
}
