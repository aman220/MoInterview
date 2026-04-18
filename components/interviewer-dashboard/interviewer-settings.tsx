'use client';

import { useState } from 'react';
import { Save, User, Bell, Lock, CreditCard, FileText, LogOut } from 'lucide-react';

export function InterviewerSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Senior Full Stack Engineer with 10+ years experience',
    expertise: 'React, Node.js, System Design, Technical Leadership',
    timezone: 'EST',
    hourlyRate: 150,
  });

  const [notifications, setNotifications] = useState({
    interviewReminders: true,
    paymentNotifications: true,
    newRequests: true,
    weeklyDigest: true,
    emailUpdates: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-8">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'payment', label: 'Payment Methods', icon: CreditCard },
          { id: 'documents', label: 'Documents', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Professional Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={4}
                  placeholder="Tell candidates about your experience and background"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Areas of Expertise</label>
                <textarea
                  value={profile.expertise}
                  onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={3}
                  placeholder="e.g., React, Node.js, System Design"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option>EST</option>
                  <option>CST</option>
                  <option>MST</option>
                  <option>PST</option>
                  <option>UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({ ...profile, hourlyRate: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              {saved && <div className="text-sm text-green-600 flex items-center gap-1">✓ Saved successfully</div>}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Email Notifications</h3>

          {[
            {
              id: 'interviewReminders',
              label: 'Interview Reminders',
              description: 'Get reminded before your scheduled interviews',
            },
            {
              id: 'paymentNotifications',
              label: 'Payment Notifications',
              description: 'Receive updates about payments and withdrawals',
            },
            { id: 'newRequests', label: 'New Interview Requests', description: 'Get notified when candidates request interviews' },
            { id: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive a weekly summary of your activities' },
            { id: 'emailUpdates', label: 'Marketing Updates', description: 'Receive news and feature updates' },
          ].map((item) => (
            <div key={item.id} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900 cursor-pointer">{item.label}</label>
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications[item.id as keyof typeof notifications]}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      [item.id]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleSaveProfile}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Connected Payment Methods</h3>

            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Bank Account</p>
                  <p className="text-xs text-gray-600">Ending in 4242</p>
                </div>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">PayPal</p>
                  <p className="text-xs text-gray-600">john.doe@paypal.com</p>
                </div>
                <button className="text-xs text-red-600 hover:text-red-700 font-medium">Remove</button>
              </div>
            </div>

            <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium">
              Add Payment Method
            </button>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Important Documents</h3>

            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Tax Form (W-9)</p>
                  <p className="text-xs text-gray-600">Submitted • Jan 15, 2024</p>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Download</button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">1099 Form</p>
                  <p className="text-xs text-gray-600">Available • Generated Jan 31, 2024</p>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Download</button>
              </div>
            </div>

            <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium">
              Upload Document
            </button>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-xs text-red-700 mb-4">Irreversible actions. Please proceed with caution.</p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm font-medium">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
