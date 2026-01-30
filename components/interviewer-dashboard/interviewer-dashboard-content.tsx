'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Users, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function InterviewerDashboardContent() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      label: 'Total Earnings',
      value: '$12,450',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'This Month',
      value: '$2,840',
      change: '+8.2%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Interviews Completed',
      value: '48',
      change: '+3 this week',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      label: 'Average Rating',
      value: '4.8/5',
      change: 'Based on 48 reviews',
      icon: CheckCircle,
      color: 'text-yellow-600'
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      candidateName: 'Alex Johnson',
      position: 'Senior Product Manager',
      company: 'Tech Startup',
      date: 'Today at 2:00 PM',
      duration: '45 mins',
      status: 'confirmed'
    },
    {
      id: 2,
      candidateName: 'Sarah Chen',
      position: 'Frontend Engineer',
      company: 'FAANG Company',
      date: 'Tomorrow at 10:00 AM',
      duration: '60 mins',
      status: 'confirmed'
    },
    {
      id: 3,
      candidateName: 'Michael Brown',
      position: 'Data Scientist',
      company: 'Finance Firm',
      date: 'In 3 days at 3:30 PM',
      duration: '45 mins',
      status: 'pending'
    }
  ]

  const recentReviews = [
    {
      id: 1,
      candidateName: 'Emily Rodriguez',
      rating: 5,
      comment: 'Excellent interview preparation. Sarah was very thorough and gave me actionable feedback.',
      date: '2 days ago'
    },
    {
      id: 2,
      candidateName: 'James Wilson',
      rating: 5,
      comment: 'Great interview coaching. She helped me understand the interviewer perspective.',
      date: '1 week ago'
    },
    {
      id: 3,
      candidateName: 'Lisa Wong',
      rating: 4,
      comment: 'Very knowledgeable. Would have liked more technical depth but overall great.',
      date: '2 weeks ago'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-20 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, Sarah! Here's your performance</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Edit Schedule
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card
                key={i}
                className="p-6 hover:border-primary/50 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold mb-2">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="border-b border-border bg-transparent">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming interviews */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Upcoming Interviews</h2>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                      <div
                        key={interview.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
                      >
                        <div>
                          <p className="font-semibold">{interview.candidateName}</p>
                          <p className="text-sm text-muted-foreground">{interview.position} • {interview.company}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            {interview.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`mb-2 ${interview.status === 'confirmed'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }`}
                          >
                            {interview.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                          </Badge>
                          <p className="text-sm font-medium">{interview.duration}</p>
                          <Button size="sm" variant="outline" className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick actions */}
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Manage Hours
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      View Requests
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Withdrawal
                    </Button>
                  </div>
                </Card>

                {/* Alerts */}
                <Card className="p-4 border-yellow-200 bg-yellow-50/50">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-yellow-900">Completion Bonus Available</p>
                      <p className="text-xs text-yellow-800 mt-1">
                        Complete 2 more interviews this month to earn a $200 bonus
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Schedule Management</h3>
              <p className="text-muted-foreground mb-6">
                Manage your availability and time slots here
              </p>
              <Button>Configure Schedule</Button>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings">
            <Card className="p-8">
              <h2 className="text-xl font-bold mb-6">Earnings Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'This Month', value: '$2,840', trend: '+8.2%' },
                  { label: 'Last Month', value: '$2,620', trend: '+5.1%' },
                  { label: 'Total Earned', value: '$12,450', trend: 'All time' }
                ].map((earning, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">{earning.label}</p>
                    <p className="text-2xl font-bold mb-1">{earning.value}</p>
                    <p className="text-xs text-green-600">{earning.trend}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.candidateName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-muted-foreground'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
