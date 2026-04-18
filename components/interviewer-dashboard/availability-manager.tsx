'use client';

import { useState } from 'react';
import { Calendar, Clock, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function AvailabilityManager() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { id: '3', day: 'Wednesday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    { id: '4', day: 'Wednesday', startTime: '13:00', endTime: '17:00', isAvailable: true },
    { id: '5', day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { id: '6', day: 'Friday', startTime: '10:00', endTime: '16:00', isAvailable: true },
  ]);

  const [newSlot, setNewSlot] = useState({ day: 'Monday', startTime: '09:00', endTime: '17:00' });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleAddSlot = () => {
    const id = (Math.max(...timeSlots.map((s) => parseInt(s.id))) + 1).toString();
    setTimeSlots([...timeSlots, { ...newSlot, id, isAvailable: true }]);
    setNewSlot({ day: 'Monday', startTime: '09:00', endTime: '17:00' });
  };

  const handleRemoveSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const handleToggleSlot = (id: string) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot)));
  };

  const slotsByDay = timeSlots.reduce(
    (acc, slot) => {
      if (!acc[slot.day]) acc[slot.day] = [];
      acc[slot.day].push(slot);
      return acc;
    },
    {} as Record<string, TimeSlot[]>
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const calendarDays = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
        <p className="text-sm text-gray-600 mt-1">Set your interview availability and time slots</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Time Slots */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Weekly Availability</h3>

            {/* Add New Slot */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs font-semibold text-gray-700 mb-3 uppercase">Add Time Slot</p>
              <div className="grid grid-cols-4 gap-3">
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="col-span-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  className="col-span-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  className="col-span-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddSlot}
                  className="col-span-1 bg-blue-600 text-white rounded px-3 py-2 text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Time Slots List */}
            <div className="space-y-2">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  {slotsByDay[day] && slotsByDay[day].length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">{day}</p>
                      <div className="space-y-2">
                        {slotsByDay[day].map((slot) => (
                          <div
                            key={slot.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              slot.isAvailable
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={slot.isAvailable}
                                onChange={() => handleToggleSlot(slot.id)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                              />
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveSlot(slot.id)}
                              className="p-1 hover:bg-red-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded text-xs font-medium ${
                    day === null ? '' : 'bg-gray-100 text-gray-900 hover:bg-blue-100 cursor-pointer'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available Hours/Week</span>
              <span className="font-semibold text-gray-900">40 hrs</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Booked This Week</span>
              <span className="font-semibold text-gray-900">12 hrs</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available Slots</span>
              <span className="font-semibold text-gray-900">28 hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
