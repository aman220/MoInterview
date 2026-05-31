# Professional Interviewer Dashboard

A comprehensive dashboard for managing interviews, candidates, and payments with a professional sidebar navigation layout.

## Pages & Features

### 1. **Overview Dashboard** (`/dashboard/interviewer`)
- Quick stats cards showing:
  - Total Interviews Completed
  - This Month's Earnings
  - Acceptance Rate
  - Cancellation Rate
  - Average Rating
  - Pending Payouts
- Quick action buttons
- Recent activity feed
- Performance trends

### 2. **Candidate Pipeline** (`/dashboard/interviewer/pipeline`)
- Track candidates through interview lifecycle
- Kanban-style pipeline with stages:
  - Booked
  - In Progress
  - Completed
  - Feedback Pending
  - Archived
- Candidate details including:
  - Position applied for
  - Interview date & time
  - Status indicators
  - Action buttons (reschedule, complete, send feedback)
- Search and filter capabilities
- Quick status updates

### 3. **Performance Analytics** (`/dashboard/interviewer/performance`)
- Multiple visualization charts:
  - **Interviews Over Time** - Line chart showing monthly trends
  - **Acceptance Rate Breakdown** - Pie chart of accepted vs declined
  - **Average Rating Trend** - Line chart of rating progression
  - **Interview Duration Distribution** - Bar chart of time spent
  - **Top Candidates** - Bar chart of candidate feedback scores
- Key metrics summary
- Performance insights and recommendations

### 4. **Availability Management** (`/dashboard/interviewer/availability`)
- Weekly calendar view
- Time slot management:
  - Add/edit time slots
  - Set availability hours
  - Bulk actions for quick setup
  - Timezone support
- Availability status indicators
- Quick availability templates (e.g., "9-5 Weekdays", "Weekends Only")
- Booked slots visualization
- Conflict detection

### 5. **Payments & Withdrawals** (`/dashboard/interviewer/payments`)
- Account balance display
- Payment history table with:
  - Date
  - Amount
  - Interview ID
  - Status (completed, pending, processed)
  - Actions
- Withdrawal requests section:
  - Request new withdrawal
  - View pending requests
  - Minimum withdrawal threshold info
- Payment methods management
- Transaction filters and search
- Monthly earnings summary

### 6. **Interview Notes** (`/dashboard/interviewer/notes`)
- Searchable notes database
- Create/edit notes for each interview
- Note features:
  - Candidate name
  - Interview topic
  - Date
  - Rating (1-5 stars)
  - Detailed notes editor
  - Tags for categorization
- Sort by date, rating, or candidate
- Filter by topic/tags
- Export notes functionality
- Quick reference cards for recent interviews

### 7. **Settings** (`/dashboard/interviewer/settings`)
- Profile information
  - Name, email, bio
  - Expert level
  - Specializations
- Interview preferences:
  - Preferred interview duration
  - Topics of expertise
  - Notification settings
  - Calendar integrations
- Account settings:
  - Password management
  - Two-factor authentication
  - Privacy preferences
- Billing information
- Support & documentation links

## Design Features

- **Responsive Sidebar Navigation**: Compact professional sidebar with collapsible menu
- **Compact Cards**: Professional stat cards without oversized elements
- **Data Visualizations**: Recharts integration for analytics
- **Icons**: Lucide React icons throughout
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Mobile Responsive**: Adapts to smaller screens with sidebar collapse
- **Modern UI**: Tailwind CSS with custom design tokens
- **Dark Mode Support**: Built-in theme switching

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: Radix UI with custom styling
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: Mock data (ready for API integration)
- **Forms**: React Hook Form with Zod validation (ready)

## Getting Started

Access the dashboard at: `http://localhost:3000/dashboard/interviewer`

Navigate between sections using the sidebar menu. All pages are fully functional with mock data demonstrating the intended user experience.

## Integration Ready

All components are built to easily integrate with your backend API. Mock data can be replaced with real API calls as needed.
