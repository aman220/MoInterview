'use client'

import { DashboardLayout } from '@/components/interviewer-dashboard/dashboard-layout'
import { PaymentsManager } from '@/components/interviewer-dashboard/payments-manager'

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <PaymentsManager />
    </DashboardLayout>
  )
}
