/**
 * Public interviewer-discovery data service for the /find-interviewers page.
 *
 * Wraps the backend `GET /interviewers` endpoint (public — no auth) via the
 * shared `request()` helper and maps the wire DTO onto the app's `Interviewer`
 * domain type, so the UI layer keeps working unchanged. Isolating the mapping
 * here means the grid/card/filter components never touch transport concerns.
 */

import { request } from './api'
import { authFetch } from './auth'
import type { Interviewer, AvailabilitySlot } from './types'

/** Shape returned by the backend discovery endpoint. */
interface InterviewerSummaryDto {
  id: string
  name: string
  company: string | null
  role: string | null
  experience: number | null
  avatar: string | null
  bio: string | null
  skills: string[] | null
  rating: number | null
  reviewCount: number | null
  pricePerSession: number | null
  nextAvailable: string | null // ISO-8601
  availability: Array<{ day: string; times: string[] }> | null
}

/** Fallback "next available" when an interviewer has no availability set. */
function defaultNextAvailable(): Date {
  return new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
}

function mapInterviewer(dto: InterviewerSummaryDto): Interviewer {
  const availability: AvailabilitySlot[] = (dto.availability ?? []).map((s) => ({
    day: s.day,
    times: s.times ?? [],
  }))

  return {
    id: dto.id,
    name: dto.name,
    company: dto.company ?? '',
    role: dto.role ?? '',
    experience: dto.experience ?? 0,
    avatar: dto.avatar ?? '',
    bio: dto.bio ?? '',
    skills: dto.skills ?? [],
    rating: dto.rating ?? 0,
    reviewCount: dto.reviewCount ?? 0,
    pricePerSession: dto.pricePerSession ?? 0,
    nextAvailable: dto.nextAvailable ? new Date(dto.nextAvailable) : defaultNextAvailable(),
    availability,
  }
}

/**
 * Fetches all active interviewers for the discovery grid.
 * Throws {@link ApiError} on failure so the caller can render an error state.
 */
export async function fetchInterviewers(signal?: AbortSignal): Promise<Interviewer[]> {
  const data = await request<InterviewerSummaryDto[]>('/interviewers', { signal })
  return (data ?? []).map(mapInterviewer)
}

export interface InterviewerReview {
  id: string
  name: string
  rating: number
  date: string
  text: string
  tone: string
}

export interface RatingBucket {
  stars: number
  percent: number
}

/** Interviewer + review data for the public profile page. */
export interface InterviewerDetail extends Interviewer {
  verified: boolean
  languages: string[]
  reviews: InterviewerReview[]
  ratingDistribution: RatingBucket[]
}

/** Full public profile DTO (superset of the summary). */
interface InterviewerDetailDto extends InterviewerSummaryDto {
  verified?: boolean
  languages?: string[] | null
  rateTiers?: Array<{ name: string; durationMinutes: number; price: number }> | null
  reviews?: InterviewerReview[] | null
  ratingDistribution?: RatingBucket[] | null
}

/** Fetches a single interviewer's public profile (throws ApiError on 404). */
export async function fetchInterviewerDetail(id: string, signal?: AbortSignal): Promise<InterviewerDetail> {
  const dto = await request<InterviewerDetailDto>(`/interviewers/${id}`, { signal })
  return {
    ...mapInterviewer(dto),
    verified: dto.verified ?? false,
    languages: dto.languages ?? [],
    reviews: dto.reviews ?? [],
    ratingDistribution: dto.ratingDistribution ?? [],
  }
}

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------

export interface CreateBookingInput {
  interviewerId: string
  scheduledAt: string // ISO-8601
  durationMinutes: number
  sessionType?: string
  focus?: string[]
  notes?: string
}

export interface BookingConfirmation {
  id: string
  status: string
  interviewerName: string
  scheduledAt: string
  durationMinutes: number
  sessionType: string
}

/** Creates a booking request as the signed-in candidate (requires auth). */
export function createBooking(input: CreateBookingInput): Promise<BookingConfirmation> {
  return authFetch<BookingConfirmation>('/bookings', { method: 'POST', body: input })
}

const DAY_INDEX: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
}

/** Parses a 12-hour label like "2:00 PM" into 24-hour hours/minutes. */
function parseTime(label: string): { h: number; m: number } {
  const match = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(label.trim())
  if (!match) return { h: 9, m: 0 }
  let h = Number(match[1])
  const m = Number(match[2])
  const mer = match[3]?.toUpperCase()
  if (mer === 'PM' && h < 12) h += 12
  if (mer === 'AM' && h === 12) h = 0
  return { h, m }
}

/**
 * Resolves a weekly-template slot ("Monday", "9:00 AM") to the next concrete
 * future Date — the availability is recurring, so we book the soonest occurrence.
 */
export function resolveSlotDate(day: string, time: string): Date {
  const target = DAY_INDEX[day] ?? 1
  const { h, m } = parseTime(time)
  const now = new Date()
  const d = new Date(now)
  d.setHours(h, m, 0, 0)
  let add = (target - d.getDay() + 7) % 7
  if (add === 0 && d <= now) add = 7
  d.setDate(d.getDate() + add)
  if (d <= now) d.setDate(d.getDate() + 7)
  return d
}
