'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  stage: 'booked' | 'completed' | 'pending';
  scheduledDate: string;
  rating?: number;
  feedback?: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    position: 'Senior React Developer',
    stage: 'booked',
    scheduledDate: '2024-04-25',
    rating: 0,
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'j.wilson@email.com',
    position: 'Full Stack Engineer',
    stage: 'completed',
    scheduledDate: '2024-04-20',
    rating: 4.5,
    feedback: 'Strong technical skills, good communication',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.r@email.com',
    position: 'Product Manager',
    stage: 'pending',
    scheduledDate: '2024-04-22',
  },
  {
    id: '4',
    name: 'Michael Tang',
    email: 'm.tang@email.com',
    position: 'DevOps Engineer',
    stage: 'booked',
    scheduledDate: '2024-04-26',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'l.anderson@email.com',
    position: 'Senior React Developer',
    stage: 'completed',
    scheduledDate: '2024-04-18',
    rating: 4,
    feedback: 'Excellent problem solving, needs improvement in system design',
  },
];

const stageConfig = {
  booked: { label: 'Booked', color: 'bg-blue-50 border-blue-200', icon: Clock, textColor: 'text-blue-700' },
  completed: { label: 'Completed', color: 'bg-green-50 border-green-200', icon: CheckCircle, textColor: 'text-green-700' },
  pending: { label: 'Feedback Pending', color: 'bg-amber-50 border-amber-200', icon: AlertCircle, textColor: 'text-amber-700' },
};

export function CandidatePipeline() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = !selectedStage || candidate.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const stageCounts = {
    booked: mockCandidates.filter((c) => c.stage === 'booked').length,
    completed: mockCandidates.filter((c) => c.stage === 'completed').length,
    pending: mockCandidates.filter((c) => c.stage === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Pipeline</h1>
        <p className="text-sm text-gray-600 mt-1">Track candidates through interview stages</p>
      </div>

      {/* Stage Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(stageConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedStage(selectedStage === key ? null : key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedStage === key
                ? `${config.color} border-current`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className={`text-sm font-medium ${config.textColor}`}>{config.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stageCounts[key as keyof typeof stageCounts]}</p>
              </div>
              <config.icon className={`w-6 h-6 ${config.textColor}`} />
            </div>
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Candidates Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Position</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Scheduled</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => {
              const stageInfo = stageConfig[candidate.stage];
              return (
                <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                      <p className="text-xs text-gray-500">{candidate.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{candidate.position}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${stageInfo.color}`}>
                      <stageInfo.icon className="w-3 h-3" />
                      {stageInfo.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(candidate.scheduledDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {candidate.rating ? (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-900 font-medium">{candidate.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-sm">No candidates found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
