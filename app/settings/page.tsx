import { Metadata } from 'next'
import SettingsContent from '@/components/settings/settings-content'

export const metadata: Metadata = {
  title: 'Settings - InterviewHub',
  description: 'Manage your account settings and preferences',
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <SettingsContent />
    </div>
  )
}
