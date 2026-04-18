'use client';

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', interviews: 8, accepted: 6, completed: 7 },
  { month: 'Feb', interviews: 12, accepted: 9, completed: 11 },
  { month: 'Mar', interviews: 10, accepted: 7, completed: 9 },
  { month: 'Apr', interviews: 15, accepted: 12, completed: 14 },
  { month: 'May', interviews: 18, accepted: 14, completed: 17 },
  { month: 'Jun', interviews: 16, accepted: 13, completed: 15 },
];

const earningsData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 1500 },
  { month: 'Apr', amount: 2250 },
  { month: 'May', amount: 2700 },
  { month: 'Jun', amount: 2400 },
];

const ratingDistribution = [
  { name: 'Excellent (4.5+)', value: 45, fill: '#10b981' },
  { name: 'Good (3.5-4.5)', value: 35, fill: '#3b82f6' },
  { name: 'Fair (2.5-3.5)', value: 15, fill: '#f59e0b' },
  { name: 'Poor (<2.5)', value: 5, fill: '#ef4444' },
];

const StatCard = ({ label, value, trend, subtext }: any) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{label}</p>
    <div className="flex items-end justify-between mt-3">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
  </div>
);

export function PerformanceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
        <p className="text-sm text-gray-600 mt-1">Track your interview metrics and earnings</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Acceptance Rate" value="78%" trend={5} subtext="12 of 15 interviews" />
        <StatCard label="Avg Rating" value="4.2/5" trend={2} subtext="Based on 47 reviews" />
        <StatCard label="Completion Rate" value="93%" trend={-1} subtext="56 of 60 interviews" />
        <StatCard label="This Month Earnings" value="$2,400" trend={15} subtext="4 more than last month" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Interview Trends */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Interview Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="interviews" stroke="#3b82f6" strokeWidth={2} name="Requested" />
              <Line type="monotone" dataKey="accepted" stroke="#10b981" strokeWidth={2} name="Accepted" />
              <Line type="monotone" dataKey="completed" stroke="#8b5cf6" strokeWidth={2} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ratingDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Performance Summary</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-medium text-gray-700">Interview Quality</p>
                <span className="text-xs font-semibold text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-medium text-gray-700">Punctuality</p>
                <span className="text-xs font-semibold text-gray-900">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-medium text-gray-700">Communication</p>
                <span className="text-xs font-semibold text-gray-900">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-medium text-gray-700">Candidate Satisfaction</p>
                <span className="text-xs font-semibold text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
