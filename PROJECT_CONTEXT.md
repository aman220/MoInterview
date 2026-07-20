# MoInterview — Project Context (Auth + Server APIs)
     

---

## 1. Repos, stack, and how to run

| | Frontend | Backend |
|---|---|---|
| Path | `D:\MoInterview\MoInterview` | `D:\MoInterview\MoBackend` |
| Stack | Next.js **16** (App Router, Turbopack), React **19**, TypeScript, Tailwind v4, `sonner` (toasts), `lucide-react` | Spring Boot **3.4.1**, Java **21**, Maven |
| Git | branch `feat/auth-api-integration` (**lots uncommitted**) | **Not a git repo** |

**Run backend** (port **8080**): `cd D:\MoInterview\MoBackend && ./run-dev.ps1`
- `run-dev.ps1` / `run-dev.sh` load `.env` and start the `dev` profile. Needs `JAVA_HOME` (JDK 22 at `C:\Program Files\Java\jdk-22`).
- Health-check readiness by grepping the log for `Started MoBackendApplication`.

**Run frontend** (port **3000**): `npm run dev`. API base is `NEXT_PUBLIC_API_URL` in `.env.local` = `http://localhost:8080/api/v1`.

**Database**: **Supabase Postgres** via the **session pooler** (`aws-0-ap-northeast-1.pooler.supabase.com:5432`, user `postgres.hlpivkrfakqkzjejemvk`, db `postgres`, `sslmode=require`). Config in `MoBackend/.env`. Hibernate `ddl-auto: update` (auto-creates tables; **NOT-NULL columns added to existing tables need a default/backfill** or startup warns).
- Direct host `db.<ref>.supabase.co` is IPv6-only → unreachable here; **use the pooler**.

**Email**: Hostinger SMTP `smtp.hostinger.com:465` (implicit SSL), `noreply@mointerview.com`. `APP_MAIL_ENABLED=true`. Dev needs `MAIL_SSL_TRUST=smtp.hostinger.com` because **Avast Mail Shield** intercepts SMTP with an untrusted cert. Domain needs SPF/DKIM/DMARC for Gmail deliverability (Hostinger side).

**Secrets** live in **`MoBackend/.env`** (git-ignored): `DB_*`, `MAIL_*`, `MAIL_SSL_TRUST`, `APP_MAIL_ENABLED`.
⚠️ DB + mail passwords were shared in chat during setup — **should be rotated**.

---

## 2. API reference

Base: `http://localhost:8080/api/v1`. **Every response** uses the envelope:
```json
{ "success": true, "message": "...", "data": {...}, "errors": null, "timestamp": "..." }
```
Protected routes need `Authorization: Bearer <accessToken>`. CORS allows `http://localhost:3000` with credentials.

### Auth (`/auth/**`, public)
| Method | Endpoint | Body | Notes |
|---|---|---|---|
| POST | `/auth/register` | `{firstName,lastName,email,password,role}` | Sets refresh cookie; body `refreshToken:null`. **Candidate** → OTP emailed. **Interviewer** → NO OTP (they verify in onboarding). **Incomplete interviewer** re-registering with correct password → **resumes** (logs in); wrong password → 409. |
| POST | `/auth/login` | `{email,password}` | Rate-limited (see §4). Sets refresh cookie. |
| POST | `/auth/refresh` | — (reads cookie) | Rotates refresh cookie, returns new access token. |
| POST | `/auth/logout` | — (reads cookie) | Revokes + clears cookie. |
| POST | `/auth/send-otp` | `{email}` | Emails a 6-digit EMAIL_VERIFY code (30s throttle). |
| POST | `/auth/verify-otp` | `{email,code}` | Marks email verified. **Candidate** → welcome email sent here. |
| POST | `/auth/forgot-password` | `{email}` | Always 200 (no enumeration); emails PASSWORD_RESET code if account exists. |
| POST | `/auth/reset-password` | `{email,code,newPassword}` | Verifies code, sets password, revokes all refresh tokens. |

### User / Interviewer
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/users/me` | Bearer | → `UserSummary` |
| POST | `/interviewers/onboard` | Bearer + `INTERVIEWER` | `{company,jobTitle,roleType,yearsExperience,specialties[],bio,linkedinUrl?,pricePerSession?}` → `InterviewerProfileResponse`. **Welcome email sent on completion.** 409 if profile already exists. |
| GET | `/interviewers/me/profile` | Bearer + `INTERVIEWER` | → `InterviewerProfileResponse`. **404 if not onboarded** (frontend uses this to detect onboarding status). |

### OAuth (`/oauth/**`, public, browser-driven)
| Method | Endpoint | Notes |
|---|---|---|
| GET | `/oauth/{provider}/authorize?intent=login\|import` | Full-page redirect to provider. `{provider}` = `google\|github\|linkedin`. |
| GET | `/oauth/{provider}/callback` | Redirects to frontend: login→`/oauth/callback?code=…`, import→`/interviewer-onboarding#li=<b64>`, error→`/login?error=…`. |
| POST | `/oauth/exchange` | `{code}` → `AuthResponse` (sets refresh cookie). One-time code, 2-min TTL. |

**OAuth is scaffolded but NOT active** — needs real client credentials in backend env: `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`, `LINKEDIN_CLIENT_ID/SECRET` (redirect URI `http://localhost:8080/api/v1/oauth/<provider>/callback`). Until set, buttons redirect back with "…not configured". LinkedIn is **import-only** (name/email/photo — its API can't provide company/title/experience). New social accounts default to **CANDIDATE**.

### DTOs
- **AuthResponse**: `{accessToken, refreshToken(null in body), tokenType:"Bearer", expiresIn, user}`
- **UserSummary**: `{id(UUID), firstName, lastName, email, role, avatarUrl, emailVerified}`
- **InterviewerProfileResponse**: `{profileId, userId, fullName, email, avatarUrl, company, jobTitle, roleType, yearsExperience, bio, linkedinUrl, pricePerSession, specialties:[{key,label}], verified, rating, reviewCount}`
- **Role**: `CANDIDATE | INTERVIEWER` · **AuthProvider**: `LOCAL, GOOGLE, GITHUB, LINKEDIN`
- **Specialty keys**: `SYSTEM_DESIGN, ALGORITHMS, BEHAVIORAL, FRONTEND, BACKEND, ML_AI`

---

## 3. Token & session model (IMPORTANT for dashboard API calls)

- **Access token**: JWT (HS384, **15 min**). Returned in the response body, held **only in memory** on the client (`lib/auth.ts` → `accessTokenInMemory`). **Never in localStorage.**
- **Refresh token**: opaque, **7 days**, rotating, SHA-256-hashed in DB. Delivered as an **httpOnly, SameSite=Lax cookie `mo_refresh`** (path `/api/v1/auth`). JS cannot read it.
- **User object**: `localStorage['mo-user']` (non-secret) so the UI renders logged-in state without a round-trip.

**Client flow** (`lib/api.ts` + `lib/auth.ts`):
- `request()` sends `credentials:'include'` so the cookie flows.
- `authFetch()` wraps authenticated calls: on `401` it does a **single-flight** `/auth/refresh` (via cookie), saves the new session, retries once. If refresh fails → `clearSession()`.
- After a full-page nav the in-memory access token is empty; the first `authFetch` silently refreshes via the cookie. **So: always call protected endpoints through `authFetch` / the `lib/auth.ts` helpers** — never hand-build fetches with a stored token.

---

## 4. Security features (already implemented)

- **Login brute-force**: `LoginAttemptService` (in-memory) locks an **email or IP** for 15 min after **8 fails / 15 min** → `429`. ⚠️ Per-instance & per-IP: repeated failed curl logins lock your own IP; **restart backend to clear**. Back with Redis for multi-instance.
- **OTP**: 6-digit, **locks after 5 wrong attempts**, constant-time compare, **30s resend throttle**. `forgot-password` swallows the throttle (no enumeration).
- **OAuth**: one-time code exchange (no tokens in URL/history) + `state` cookie CSRF.
- **JWT secret**: `prod` profile has **no default** → startup fails unless `APP_JWT_SECRET` set.
- **Password policy** (client + server identical): 8+ chars, 1 uppercase, 1 digit, 1 symbol from `[!@#$%^&*(),.?":{}|<>]`.
- **Cookie**: `APP_COOKIE_SECURE=true` in prod. `SameSite=Lax` works for same-site (localhost, or `app.` / `api.` subdomains). For **cross-domain** SPA/API, switch to `SameSite=None; Secure`.

---

## 5. Backend structure (`com.mointerview`)
```
auth/        AuthController, AuthService, LoginAttemptService, AuthCookies, dto/*
security/    JwtService, JwtAuthFilter, CustomUserDetailsService, UserPrincipal
user/        User entity, UserRepository, /users/me controller, Role, AuthProvider
token/       RefreshToken entity + rotation service
otp/         OtpCode entity, OtpService, OtpAttemptRecorder (REQUIRES_NEW)
oauth/       OAuthController, OAuthClientService, OAuthService, OAuthCodeStore, SocialProfile
interviewer/ InterviewerController, InterviewerService, InterviewerProfile, Specialty, dto/*
notification/ Notification entity, NotificationService, NotificationDispatcher, NotificationQueueService, EmailTemplates
common/      ApiResponse envelope, ApiException, GlobalExceptionHandler, MailService
config/      SecurityConfig, AppProperties
```
**Tables**: `users`, `refresh_tokens`, `otp_codes`, `interviewer_profiles`, `interviewer_specialties`, `notifications`.

### Notifications (email) — durable outbox queue
Producers call `NotificationService` → inserts a `PENDING` row → `NotificationDispatcher` (`@Scheduled`) drains with `FOR UPDATE SKIP LOCKED`, sends HTML via `MailService`, retries with backoff. Types: `OTP_VERIFICATION, WELCOME, INTERVIEW_BOOKED, INTERVIEW_REMINDER, PAYMENT_SUCCESS, INTERVIEW_CANCELED`. **Only OTP + WELCOME are wired**; the booking/reminder/payment/cancellation methods exist and are **ready for the dashboard/booking phase to call**. Templates in `EmailTemplates` (branded HTML).
- Welcome timing: **candidate** → on email verify; **interviewer** → on onboarding completion; **social** → on account creation.

---

## 6. Frontend structure
```
lib/api.ts     request() wrapper, ApiError, API_BASE_URL, credentials:'include'
lib/auth.ts    types + session helpers + all API calls + authFetch (single-flight refresh)
               key exports: saveSession, getCurrentUser, saveUser, clearSession, signOut,
               getAccessToken, authFetch, dashboardPath, oauthAuthorizeUrl, exchangeOAuthCode,
               getMyInterviewerProfile, onboardInterviewer, login/register/refresh/logout/…
hooks/use-auth.ts   useAuth() → {user, hydrated, isAuthenticated, logout}; reacts to AUTH_EVENT + storage
components/navbar.tsx   session-aware (name, role-based Dashboard, avatar dropdown, logout)
app/layout.tsx          ROOT layout — ONLY this renders <html>/<body>/ThemeProvider/Toaster/Analytics
app/(auth)/             login, signup, forgot-password, verify-email, interviewer-onboarding, oauth/callback
app/(main)/             landing + Navbar/Footer layout
app/dashboard/          nested layout (NO html/body), interviewer dashboard pages
```

### Auth flows (frontend routing)
- **Candidate signup** → `register` (OTP sent) → `/verify-email` → verify → home.
- **Interviewer signup** → `register` (no OTP) → `/interviewer-onboarding` (step 1 profile → step 2 company → step 3 OTP verify → onboard) → welcome → dashboard.
- **Login**: candidate & unverified → `/verify-email`; **interviewer → `/interviewer-onboarding`** (which redirects to `/dashboard/interviewer` if already onboarded via the `getMyInterviewerProfile` check); else → `/`.
- **Incomplete interviewer** re-signup with correct password → resumes onboarding.
- `dashboardPath(user)`: interviewer → `/dashboard/interviewer`, candidate → `/dashboard`.

---

## 7. Current state of the dashboard (the NEXT task)

- **Interviewer dashboard pages exist** under `app/dashboard/interviewer/`: `page.tsx` (overview), `availability`, `notes`, `payments`, `performance`, `pipeline`, `settings`. Components under `components/dashboard`, `components/interviewer-dashboard`, `components/interviewer`.
- **They render hardcoded MOCK data** (e.g. "John Doe", "$12,450 earnings") — **not wired to the backend**.
- **`/dashboard` (candidate) has NO `page.tsx` → 404.** Candidate dashboard isn't built yet; `dashboardPath` sends candidates there. Needs a page (or redirect) in the candidate phase.
- **Backend has none of the dashboard domain yet** — no bookings, availability, sessions, payments, feedback/reports, or candidate discovery beyond `InterviewerProfileResponse`. These are Phase 2/3.

### Suggested next steps (interviewer dashboard)
1. Wire the **overview/profile** to real data via `GET /interviewers/me/profile` (already exists) — replace mock name/company/avatar.
2. Design + build backend domain for the dashboard: availability, bookings/sessions, payments, reviews/performance. Add controllers/entities per the existing package structure and the envelope/`authFetch` conventions.
3. Add typed client functions in `lib/auth.ts` (or a new `lib/interviewer.ts`) using `authFetch`.
4. The notification methods (`interviewBooked`, `interviewReminder`, `paymentSuccess`, `interviewCanceled`) are ready to call from those new flows.

---

## 8. Gotchas / conventions
- **Backend is not a git repo**; frontend changes are uncommitted on `feat/auth-api-integration`.
- **Only the root layout may render `<html>`/`<body>`** (Next App Router) — a nested layout doing so caused hydration errors (already fixed in `app/dashboard/layout.tsx`).
- **Browser automation**: React controlled inputs don't sync from the `form_input` tool. Set values via the native setter + dispatch an `input` event, then `form.requestSubmit()`.
- **Bash tool + Windows**: run backend from its dir (`cd /d/MoInterview/MoBackend`); the shell working dir can reset between calls. `psql` at `C:\Program Files\PostgreSQL\16\bin\psql.exe`.
- Envelope everywhere; throw/handle via `ApiError` (has `.status`, `.fieldErrors`).
- Toasts via `sonner` (`import { toast } from 'sonner'`); `<Toaster>` is mounted in the root layout.
