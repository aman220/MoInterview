'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Download, Share2, Star, TrendingUp, AlertCircle, CheckCircle,
  BookOpen, Brain, Users, Trophy, BarChart3
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function InterviewReportContent() {
  const overallScore = 82
  const strengthAreas = ['Communication', 'Problem-Solving', 'Leadership']
  const improvementAreas = ['Technical Depth', 'Time Management', 'Asking Questions']

  const categoryScores = [
    { name: 'Technical', score: 78 },
    { name: 'Communication', score: 88 },
    { name: 'Problem-Solving', score: 85 },
    { name: 'Culture Fit', score: 90 },
    { name: 'Experience', score: 75 }
  ]

  const timelineData = [
    { minute: '0-10', engagement: 75, clarity: 70 },
    { minute: '10-20', engagement: 82, clarity: 78 },
    { minute: '20-30', engagement: 88, clarity: 85 },
    { minute: '30-40', engagement: 85, clarity: 82 },
    { minute: '40-45', engagement: 80, clarity: 79 }
  ]

  const interviewerFeedback = [
    {
      title: 'Strengths',
      items: [
        'Excellent communication skills - clearly articulated thoughts',
        'Strong problem-solving approach with methodical breakdown',
        'Great enthusiasm and genuine interest in the role',
        'Demonstrated leadership experience effectively'
      ],
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Areas for Improvement',
      items: [
        'Could go deeper into technical implementation details',
        'Watch the time when explaining complex topics',
        'Ask more clarifying questions before diving into solutions',
        'Consider edge cases earlier in problem-solving'
      ],
      icon: AlertCircle,
      color: 'text-amber-600'
    },
    {
      title: 'Recommendations',
      items: [
        'Practice more system design problems focusing on trade-offs',
        'Prepare specific metrics and data from past projects',
        'Work on concise explanations of complex concepts',
        'Mock a few more interviews in this domain before real interviews'
      ],
      icon: BookOpen,
      color: 'text-blue-600'
    }
  ]

  const pieData = [
    { name: 'Excellent', value: 40 },
    { name: 'Good', value: 35 },
    { name: 'Average', value: 20 },
    { name: 'Needs Work', value: 5 }
  ]

  const COLORS = ['#2563eb', '#06b6d4', '#f59e0b', '#ef4444']

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Interview Report</h1>
              <p className="text-muted-foreground">Senior Product Manager | Tech Startup</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share Report
              </Button>
            </div>
          </div>

          {/* Overall score card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 col-span-1 md:col-span-2">
              <p className="text-sm font-medium text-muted-foreground mb-2">Overall Performance</p>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="text-5xl font-bold text-primary mb-2">{overallScore}</div>
                  <p className="text-sm text-muted-foreground">Out of 100</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/20 text-green-700 border-green-300 mb-2">Strong Candidate</Badge>
                  <p className="text-xs text-muted-foreground">Ready to advance</p>
                </div>
              </div>
            </Card>

            {/* Quick stats */}
            {[
              { label: 'Duration', value: '45 mins', icon: '⏱️' },
              { label: 'Interviewer Rating', value: '4.8/5', icon: '⭐' },
              { label: 'Follow-up', value: 'Scheduled', icon: '✓' }
            ].map((stat, i) => (
              <Card key={i} className="p-6">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="font-semibold">{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="border-b border-border bg-transparent">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category breakdown */}
              <Card className="p-6 lg:col-span-2">
                <h2 className="text-xl font-bold mb-6">Performance by Category</h2>
                <div className="space-y-4">
                  {categoryScores.map((cat, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{cat.name}</span>
                        <span className="font-bold text-primary">{cat.score}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                          style={{ width: `${cat.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance distribution */}
              <Card className="p-6">
                <h3 className="font-bold mb-4">Response Quality</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Strengths and improvements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interviewerFeedback.map((section, i) => {
                const Icon = section.icon
                return (
                  <Card key={i} className="p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`w-6 h-6 ${section.color}`} />
                      <h3 className="font-bold">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Performance Timeline</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="minute" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#2563eb" />
                  <Bar dataKey="clarity" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4">Key Moments</h3>
                <div className="space-y-4">
                  {[
                    { time: '8:45', event: 'Started strong with clear introduction' },
                    { time: '16:20', event: 'Excellent problem-solving approach demonstrated' },
                    { time: '28:10', event: 'Depth could be improved on technical details' },
                    { time: '35:45', event: 'Strong closing with great questions for interviewer' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-sm font-semibold text-primary w-12">{item.time}</div>
                      <div className="text-sm text-muted-foreground">{item.event}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4">Communication Analysis</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Speaking Pace', value: 'Excellent' },
                    { metric: 'Grammar & Clarity', value: 'Very Good' },
                    { metric: 'Confidence Level', value: 'Strong' },
                    { metric: 'Engagement', value: 'Excellent' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm">{item.metric}</span>
                      <Badge className="bg-green-500/20 text-green-700 border-green-300">{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Next Steps & Recommendations</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="font-bold mb-2">Immediate Actions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Review the technical concepts discussed in today's interview</li>
                    <li>• Practice system design problems with focus on trade-offs</li>
                    <li>• Record yourself and watch for pacing and clarity improvements</li>
                  </ul>
                </div>

                <div className="border-l-4 border-secondary pl-6 py-2">
                  <h3 className="font-bold mb-2">Preparation for Follow-up Interview</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Prepare 2-3 deep dives into your past projects with metrics</li>
                    <li>• Study the company's recent product launches and strategies</li>
                    <li>• Practice answering behavioral questions with STAR method</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent pl-6 py-2">
                  <h3 className="font-bold mb-2">Recommended Practice Sessions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Book 2 more sessions focusing on technical depth</li>
                    <li>• Practice with an interviewer from same company for insider tips</li>
                    <li>• Session on executive presence and leadership questions</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button className="gap-2">
                  <Trophy className="w-4 h-4" />
                  Book Follow-up Session
                </Button>
                <Button variant="outline">Schedule with Different Interviewer</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Interview Transcript</h2>
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {[
                  {
                    speaker: 'Sarah Johnson (Interviewer)',
                    text: 'Hi! Great to meet you. Let\'s start by having you walk me through your experience in product management.'
                  },
                  {
                    speaker: 'You',
                    text: 'Thanks for having me! I\'ve been working in product management for 5 years now, starting as an APM at a mid-stage fintech startup...'
                  },
                  {
                    speaker: 'Sarah Johnson (Interviewer)',
                    text: 'That\'s great. Tell me about your biggest achievement in that role.'
                  },
                  {
                    speaker: 'You',
                    text: 'One project I\'m particularly proud of was leading the redesign of our payment flow, which resulted in...'
                  }
                ].map((line, i) => (
                  <div key={i} className="border-b border-border pb-4">
                    <p className="font-semibold text-sm mb-2">{line.speaker}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{line.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
