'use client'

import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockUser } from '@/lib/mock-data'

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

        <div className="space-y-6">
          {/* Avatar */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Profile Photo</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Upload className="w-4 h-4" />
                <span>Change Photo</span>
              </Button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold mb-2 block">
                Full Name
              </Label>
              <Input
                id="name"
                defaultValue={mockUser.name}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-semibold mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={mockUser.email}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio" className="text-sm font-semibold mb-2 block">
              Bio
            </Label>
            <Textarea
              id="bio"
              defaultValue={mockUser.bio}
              placeholder="Tell us about yourself..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Maximum 500 characters
            </p>
          </div>

          {/* Resume */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              Resume
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium mb-2">Drop your resume here</p>
              <p className="text-xs text-muted-foreground mb-4">or</p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                PDF or DOCX, up to 5MB
              </p>
            </div>
          </div>

          {/* Save Button */}
          <Button className="w-full h-10">
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  )
}
