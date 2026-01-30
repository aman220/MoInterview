'use client'

import { mockInterviewers } from '@/lib/mock-data'
import { type InterviewerFilterOptions, type SortOption } from '@/lib/types'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface InterviewerFiltersProps {
  filters: InterviewerFilterOptions
  onFiltersChange: (filters: InterviewerFilterOptions) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export default function InterviewerFilters({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
}: InterviewerFiltersProps) {
  const companies = Array.from(new Set(mockInterviewers.map((i) => i.company)))

  const handleCompanyChange = (company: string, checked: boolean) => {
    const companies = checked
      ? [...(filters.companies || []), company]
      : (filters.companies || []).filter((c) => c !== company)
    onFiltersChange({ ...filters, companies: companies.length > 0 ? companies : undefined })
  }

  const handleExperienceChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, experienceRange: range })
  }

  const handlePriceChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range })
  }

  const handleRatingChange = (value: number) => {
    onFiltersChange({ ...filters, minRating: value > 0 ? value : undefined })
  }

  const handleReset = () => {
    onFiltersChange({})
    onSortChange('rating')
  }

  return (
    <div className="sticky top-20 space-y-6">
      {/* Sort */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Sort by</Label>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest Rating</SelectItem>
            <SelectItem value="price">Lowest Price</SelectItem>
            <SelectItem value="experience">Most Experience</SelectItem>
            <SelectItem value="availability">Next Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Companies */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Companies</Label>
        <div className="space-y-2">
          {companies.map((company) => (
            <div key={company} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${company}`}
                checked={filters.companies?.includes(company) || false}
                onCheckedChange={(checked) => handleCompanyChange(company, checked as boolean)}
              />
              <Label htmlFor={`company-${company}`} className="font-normal cursor-pointer">
                {company}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">
          Experience: {filters.experienceRange?.[0] || 0} - {filters.experienceRange?.[1] || 15} years
        </Label>
        <Slider
          min={0}
          max={15}
          step={1}
          value={filters.experienceRange || [0, 15]}
          onValueChange={(value) => handleExperienceChange(value as [number, number])}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">
          Price: ${filters.priceRange?.[0] || 50} - ${filters.priceRange?.[1] || 200}/hour
        </Label>
        <Slider
          min={50}
          max={200}
          step={10}
          value={filters.priceRange || [50, 200]}
          onValueChange={(value) => handlePriceChange(value as [number, number])}
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Minimum Rating</Label>
        <div className="space-y-2">
          {[0, 4.0, 4.5, 4.7].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) => handleRatingChange(checked ? rating : 0)}
              />
              <Label htmlFor={`rating-${rating}`} className="font-normal cursor-pointer">
                {rating === 0 ? 'Any' : `${rating}+ stars`}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={handleReset}
      >
        Reset Filters
      </Button>
    </div>
  )
}
