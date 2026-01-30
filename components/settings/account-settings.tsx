'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

export default function AccountSettings() {
  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password" className="text-sm font-semibold mb-2 block">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="new-password" className="text-sm font-semibold mb-2 block">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password" className="text-sm font-semibold mb-2 block">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button className="w-full h-10">
            Update Password
          </Button>
        </div>
      </Card>

      {/* Verification Status */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Account Verification</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10">
            <p className="text-sm font-medium">
              ✓ Email verified
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Verified on December 15, 2024
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-grow">
                <p className="text-sm font-medium">Work Email Verification</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Verify your work email to unlock interviewer features
                </p>
                <Button variant="outline" size="sm" className="mt-3 h-8 bg-transparent">
                  Verify Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10">
        <h2 className="text-xl font-semibold mb-6 text-red-900 dark:text-red-100">Danger Zone</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="destructive"
              className="w-full h-10"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Sessions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Active Sessions</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border flex items-start justify-between">
            <div>
              <p className="font-medium text-sm">This Device (Current)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Last active: just now
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
              Active
            </span>
          </div>

          <Button variant="outline" className="w-full h-10 bg-transparent">
            Sign Out From All Devices
          </Button>
        </div>
      </Card>
    </div>
  )
}
