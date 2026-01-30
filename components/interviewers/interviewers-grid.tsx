'use client'

import { useState, useMemo } from 'react'
import { mockInterviewers } from '@/lib/mock-data'
import InterviewerCard from './interviewer-card'
import InterviewerFilters from './interviewer-filters'
import { type InterviewerFilterOptions, type SortOption } from '@/lib/types'

export default function InterviewersGrid() {
  const [filters, setFilters] = useState<InterviewerFilterOptions>({})
  const [sortBy, setSortBy] = useState<SortOption>('rating')

  const filteredInterviewers = useMemo(() => {
    let result = [...mockInterviewers]

    // Filter by company
    if (filters.companies?.length) {
      result = result.filter((i) => filters.companies?.includes(i.company))
    }

    // Filter by experience range
    if (filters.experienceRange) {
      const [min, max] = filters.experienceRange
      result = result.filter((i) => i.experience >= min && i.experience <= max)
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      result = result.filter((i) => i.pricePerSession >= min && i.pricePerSession <= max)
    }

    // Filter by minimum rating
    if (filters.minRating) {
      result = result.filter((i) => i.rating >= filters.minRating)
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price':
        result.sort((a, b) => a.pricePerSession - b.pricePerSession)
        break
      case 'experience':
        result.sort((a, b) => b.experience - a.experience)
        break
      case 'availability':
        result.sort((a, b) => a.nextAvailable.getTime() - b.nextAvailable.getTime())
        break
    }

    return result
  }, [filters, sortBy])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <InterviewerFilters 
          filters={filters} 
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Interviewers Grid */}
      <div className="lg:col-span-3">
        {filteredInterviewers.length > 0 ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredInterviewers.length} of {mockInterviewers.length} interviewers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInterviewers.map((interviewer) => (
                <InterviewerCard key={interviewer.id} interviewer={interviewer} />
              ))}
            </div>
          </>
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">No interviewers found matching your criteria</p>
            <button
              onClick={() => setFilters({})}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
