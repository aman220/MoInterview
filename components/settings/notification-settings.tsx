'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div>
            <h3 className="font-semibold mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {[
                {
                  id: 'interview-confirmation',
                  label: 'Interview Confirmations',
                  description: 'Get notified when your interview is confirmed',
                },
                {
                  id: 'interview-reminder',
                  label: 'Interview Reminders',
                  description: 'Reminders 24 hours and 1 hour before your interview',
                },
                {
                  id: 'feedback-ready',
                  label: 'Feedback Ready',
                  description: 'Get notified when your feedback report is ready',
                },
                {
                  id: 'new-interviewer',
                  label: 'New Interviewers',
                  description: 'Get notified about new interviewers matching your interests',
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-grow">
                    <Label className="text-base font-medium cursor-pointer">
                      {notification.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <h3 className="font-semibold mb-4">Push Notifications</h3>
            <div className="space-y-4">
              {[
                {
                  id: 'browser-push',
                  label: 'Browser Notifications',
                  description: 'Get browser notifications for important updates',
                },
                {
                  id: 'mobile-push',
                  label: 'Mobile App Notifications',
                  description: 'Get push notifications on your mobile device',
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-grow">
                    <Label className="text-base font-medium cursor-pointer">
                      {notification.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Button className="w-full h-10">
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  )
}
