'use client'

import { TrendingUp, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const stats = [
  {
    label: 'Total Earnings',
    value: '$12,450',
    change: '+12.5%',
    icon: TrendingUp,
    trend: 'up',
  },
  {
    label: 'This Month',
    value: '$2,840',
    change: '+8.2%',
    icon: Clock,
    trend: 'up',
  },
  {
    label: 'Completed',
    value: '48',
    change: '+3 this week',
    icon: CheckCircle,
    trend: 'up',
  },
  {
    label: 'Avg. Rating',
    value: '4.8/5',
    change: 'From 48 reviews',
    icon: Eye,
    trend: 'stable',
  },
]

const earningsData = [
  { month: 'Jan', earnings: 2400, interviews: 12 },
  { month: 'Feb', earnings: 1398, interviews: 10 },
  { month: 'Mar', earnings: 3200, interviews: 15 },
  { month: 'Apr', earnings: 2780, interviews: 14 },
  { month: 'May', earnings: 1890, interviews: 11 },
  { month: 'Jun', earnings: 2390, interviews: 13 },
]

const acceptanceData = [
  { name: 'Accepted', value: 72, fill: 'var(--color-chart-1)' },
  { name: 'Declined', value: 18, fill: 'var(--color-chart-2)' },
  { name: 'Pending', value: 10, fill: 'var(--color-accent)' },
]

const upcomingInterviews = [
  {
    id: 1,
    candidateName: 'Alex Johnson',
    position: 'Senior Product Manager',
    date: 'Today at 2:00 PM',
    status: 'confirmed',
  },
  {
    id: 2,
    candidateName: 'Sarah Chen',
    position: 'Frontend Engineer',
    date: 'Tomorrow at 10:00 AM',
    status: 'confirmed',
  },
  {
    id: 3,
    candidateName: 'Michael Brown',
    position: 'Data Scientist',
    date: 'In 3 days at 3:30 PM',
    status: 'pending',
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'completed',
    candidateName: 'Emily Rodriguez',
    message: 'completed interview for Senior Designer',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'review',
    candidateName: 'James Wilson',
    message: 'left a 5-star review',
    time: '1 day ago',
  },
  {
    id: 3,
    type: 'scheduled',
    candidateName: 'Lisa Wong',
    message: 'scheduled interview for Product Manager',
    time: '2 days ago',
  },
]

export function Overview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s your dashboard summary</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={`text-xs mt-2 font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="text-muted-foreground/40">
                  <Icon size={20} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Trend */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-foreground">Earnings Trend</h3>
            <p className="text-xs text-muted-foreground mt-1">Monthly earnings and interviews</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Area type="monotone" dataKey="earnings" stroke="var(--color-chart-1)" fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Acceptance Rate */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-foreground">Acceptance Rate</h3>
            <p className="text-xs text-muted-foreground mt-1">Interview outcomes</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={acceptanceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {acceptanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-xs">
            {acceptanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">Upcoming Interviews</h3>
            <p className="text-xs text-muted-foreground mt-1">Your next scheduled sessions</p>
          </div>
          <div className="space-y-3">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{interview.candidateName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{interview.position}</p>
                    <p className="text-xs text-muted-foreground mt-1">{interview.date}</p>
                  </div>
                  <div>
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                      interview.status === 'confirmed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {interview.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground mt-1">Your recent interactions</p>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {activity.type === 'completed' && (
                      <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                    )}
                    {activity.type === 'review' && (
                      <Eye size={16} className="text-blue-600 dark:text-blue-400" />
                    )}
                    {activity.type === 'scheduled' && (
                      <Clock size={16} className="text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.candidateName} <span className="font-normal text-muted-foreground">{activity.message}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
