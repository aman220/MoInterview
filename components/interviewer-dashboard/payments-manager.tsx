'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  candidate: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
  duration: string;
  type: 'interview' | 'prep' | 'feedback';
}

const mockPayments: Payment[] = [
  {
    id: '1',
    date: '2024-06-15',
    candidate: 'Sarah Chen',
    amount: 150,
    status: 'completed',
    duration: '60 min',
    type: 'interview',
  },
  {
    id: '2',
    date: '2024-06-14',
    candidate: 'James Wilson',
    amount: 150,
    status: 'completed',
    duration: '60 min',
    type: 'interview',
  },
  {
    id: '3',
    date: '2024-06-13',
    candidate: 'Emma Rodriguez',
    amount: 75,
    status: 'pending',
    duration: '30 min',
    type: 'feedback',
  },
  {
    id: '4',
    date: '2024-06-12',
    candidate: 'Michael Tang',
    amount: 150,
    status: 'processing',
    duration: '60 min',
    type: 'interview',
  },
  {
    id: '5',
    date: '2024-06-11',
    candidate: 'Lisa Anderson',
    amount: 150,
    status: 'completed',
    duration: '60 min',
    type: 'interview',
  },
  {
    id: '6',
    date: '2024-06-10',
    candidate: 'David Lee',
    amount: 50,
    status: 'completed',
    duration: '20 min',
    type: 'prep',
  },
];

const statusConfig = {
  completed: {
    label: 'Completed',
    color: 'bg-green-50 border-green-200 text-green-700',
    icon: CheckCircle,
  },
  pending: {
    label: 'Pending',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    icon: AlertCircle,
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    icon: Clock,
  },
};

const StatCard = ({ icon: Icon, label, value, subtext }: any) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-3">{value}</p>
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
      <div className="p-2 bg-blue-100 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
    </div>
  </div>
);

export function PaymentsManager() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const totalEarnings = mockPayments.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayments.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const thisMonthEarnings = mockPayments
    .filter((p) => p.status === 'completed' && new Date(p.date).getMonth() === 5)
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = selectedType ? mockPayments.filter((p) => p.type === selectedType) : mockPayments;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments & Withdrawals</h1>
        <p className="text-sm text-gray-600 mt-1">Track your earnings and manage withdrawals</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Earnings" value={`$${totalEarnings}`} subtext="All time" />
        <StatCard
          icon={TrendingUp}
          label="This Month"
          value={`$${thisMonthEarnings}`}
          subtext="6 interviews completed"
        />
        <StatCard icon={AlertCircle} label="Pending Payout" value={`$${pendingAmount}`} subtext="2 pending transactions" />
        <StatCard
          icon={CheckCircle}
          label="Next Payout"
          value="June 30"
          subtext="Automatic transfer enabled"
        />
      </div>

      {/* Withdrawal Request */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Request Withdrawal</h3>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <input
            type="number"
            placeholder="Enter amount"
            className="col-span-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="col-span-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Bank Transfer</option>
            <option>PayPal</option>
            <option>Stripe</option>
          </select>
          <input
            type="text"
            placeholder="Account details"
            className="col-span-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="col-span-1 bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700">
            Request Withdrawal
          </button>
        </div>
      </div>

      {/* Transaction Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedType(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedType === null
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          All Transactions
        </button>
        <button
          onClick={() => setSelectedType('interview')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedType === 'interview'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          Interviews
        </button>
        <button
          onClick={() => setSelectedType('feedback')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedType === 'feedback'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          Feedback
        </button>
        <button
          onClick={() => setSelectedType('prep')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedType === 'prep'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          Preparation
        </button>
      </div>

      {/* Transaction History */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map((payment) => {
              const statusInfo = statusConfig[payment.status];
              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.candidate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{payment.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.duration}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${payment.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                      <statusInfo.icon className="w-3 h-3" />
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
