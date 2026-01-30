import { Metadata } from 'next'
import DashboardContent from '@/components/dashboard/dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard - InterviewHub',
  description: 'Manage your upcoming interviews, view past sessions, and track your progress.',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your interviews and track your progress
          </p>
        </div>
      </div>

      {/* Content */}
      <DashboardContent />
    </div>
  )
}
