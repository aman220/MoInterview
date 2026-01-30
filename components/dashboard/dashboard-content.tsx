'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardStats from './dashboard-stats'
import UpcomingInterviews from './upcoming-interviews'
import PastInterviews from './past-interviews'
import SavedInterviewers from './saved-interviewers'

export default function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats */}
      <DashboardStats />

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
            <TabsTrigger value="past">Past Interviews</TabsTrigger>
            <TabsTrigger value="saved">Saved Interviewers</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <UpcomingInterviews />
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <PastInterviews />
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <SavedInterviewers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
