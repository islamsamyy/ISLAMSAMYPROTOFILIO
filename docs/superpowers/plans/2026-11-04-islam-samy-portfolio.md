# Islam Samy Executive Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, pixel-perfect Next.js application implementing all 8 screens from the Google Stitch "Islam Samy Executive Portfolio" design project (ID: 5230278378662719698) with full fidelity, Tailwind CSS, shadcn/Radix UI primitives, Material Symbols Outlined icons, and interactive state.

**Architecture:** Modern Next.js 15+ App Router application with React 19, TypeScript, Tailwind CSS with the exact Google Stitch color palette and typography tokens, Radix UI/shadcn component foundations, and client-side interactive state for scheduling, client booking portal, case studies modal, blog filtering, admin authentication gateway, and operations console.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Radix UI primitives (`@radix-ui/react-*`), Lucide React & Google Material Symbols Outlined, class-variance-authority (CVA), clsx, tailwind-merge.

**Spec:** Google Stitch Project "Islam Samy Executive Portfolio" (ID: 5230278378662719698) with 8 high-fidelity screens downloaded directly from Google Stitch MCP API.

## Global Constraints

- Pixel-perfect fidelity to the Stitch HTML and screenshot exports without any hallucinated themes or layout shifts.
- Exact Stitch Material Design 3 / Dark Executive color tokens (`surface: #111319`, `on-surface: #e2e2ea`, `primary: #d0bcff`, `primary-container: #a078ff`, `secondary: #7bd0ff`, `surface-container: #1d2025`, `surface-container-high: #282a30`, `outline-variant: #494454`).
- Typography system using `Plus Jakarta Sans` (Display & Headlines), `Inter` (Body copy), `JetBrains Mono` (Labels, telemetry, tags, and timestamps).
- Iconography using Google Material Symbols Outlined alongside Lucide React icons matching Stitch `<span class="material-symbols-outlined">`.
- Full navigation connectivity across all 8 screens so any link, button, tab, or action flows naturally.

## Review Focus

1. **Interactive Consultation Booking (`/book`):** Step wizard advances cleanly (Track Selection → Date & Time → Intake Form → Confirmation) with validation and state preservation.
2. **Client Portal (`/my-bookings`):** Displays active consultation card, prep checklist, archive list, and interactive reschedule modal.
3. **Admin Security Gateway (`/admin/login`):** Visual hardware attestation / biometric prompt, 6-digit OTP code entry with auto-focus, and seamless transition into the Admin Command Center (`/admin`).
4. **Admin Operations & Console (`/admin` and `/admin/reservations`):** Consistent admin sidebar, live telemetry indicators, reservation status badges, and action drawer for client reservations.
5. **Responsive Typography & Mobile Support:** Mobile hamburger navigation for public header and responsive grid adaptation across desktop, tablet, and mobile breakpoints.

---

### Task 1: Initialize Next.js Project & Configure Design Tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `components.json`
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/utils.ts`

**Interfaces:**
- Produces: Base styling, typography fonts (`Inter`, `Plus Jakarta Sans`, `JetBrains Mono`), Material Symbols Outlined CSS link, and CSS variables for the dark executive theme.

- [ ] **Step 1: Scaffold Next.js project with App Router and Tailwind CSS**
Initialize package.json, install dependencies (`next@latest`, `react@latest`, `react-dom@latest`, `typescript`, `@types/node`, `@types/react`, `tailwindcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tabs`, `@radix-ui/react-avatar`, `@radix-ui/react-tooltip`, `@radix-ui/react-select`, `@radix-ui/react-slot`).

- [ ] **Step 2: Configure `tailwind.config.ts` with exact Google Stitch tokens**
Include the custom color palette (`surface`, `surface-container`, `primary`, `secondary`, `tertiary`, `outline-variant`, etc.) and typography font families.

- [ ] **Step 3: Setup `src/app/globals.css` and root `src/app/layout.tsx`**
Add Google Web Fonts (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`, `Material Symbols Outlined`), reset scrollbars, configure dark background `#111319` and text color `#e2e2ea`.

- [ ] **Step 4: Verify Next.js build runs cleanly**
Run: `npm run build`
Expected: Build succeeds without TypeScript or compilation errors.

---

### Task 2: Build Shared Navigation, Header & Footer Components

**Files:**
- Create: `src/components/navigation/PublicHeader.tsx`
- Create: `src/components/navigation/PublicFooter.tsx`
- Create: `src/components/navigation/AdminSidebar.tsx`
- Create: `src/components/navigation/AdminHeader.tsx`
- Create: `src/components/ui/badge.tsx`, `src/components/ui/button.tsx`

**Interfaces:**
- Produces: `<PublicHeader currentPath={string} />`, `<PublicFooter />`, `<AdminSidebar activeItem={string} />`, `<AdminHeader title={string} />`

- [ ] **Step 1: Implement `PublicHeader.tsx`**
Executive navigation bar with:
- Brand identity: "ISLAM SAMY" with monospaced subtitle "TECH EXECUTIVE & ARCHITECT"
- Navigation links: Overview (`/`), Projects (`/projects`), Insights (`/blog`), Book Consultation (`/book`), My Bookings (`/my-bookings`)
- Security Ops Gateway pill button (`/admin/login`) with pulsing status indicator
- Mobile drawer menu

- [ ] **Step 2: Implement `PublicFooter.tsx`**
Executive footer matching Stitch:
- Status banner ("SYSTEM STATUS: ALL ARCHITECTURES OPERATIONAL - 99.999% SLA")
- Quick links, domains, verified credentials, and copyright
- Social links (GitHub, LinkedIn, Email, Scheduling)

- [ ] **Step 3: Implement `AdminSidebar.tsx` & `AdminHeader.tsx`**
Admin management navigation:
- Logo and Ops badge
- Navigation links: Command Center (`/admin`), Reservations (`/admin/reservations`), Projects CMS, Blog CMS, Audit Logs, Settings
- Header with live UTC clock, system health indicator, search bar, and admin avatar profile

- [ ] **Step 4: Verify navigation links and rendering**
Test component imports and build.

---

### Task 3: Implement Screen 03 — Islam Samy Executive Portfolio (`/`)

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/portfolio/HeroSection.tsx`
- Create: `src/components/portfolio/MetricsSection.tsx`
- Create: `src/components/portfolio/ExperienceSection.tsx`
- Create: `src/components/portfolio/TechStackSection.tsx`
- Create: `src/components/portfolio/ProjectsTeaserSection.tsx`
- Create: `src/components/portfolio/EducationSection.tsx`
- Create: `src/components/portfolio/ConsultationCtaSection.tsx`

**Interfaces:**
- Produces: The primary executive landing page matching Stitch Screen ID `693a11ee6fc9401c9144440068130b4d`.

- [ ] **Step 1: Implement Hero & Metrics section**
- Headline: "Engineering Digital Solutions. Turning Data into Business Growth."
- Executive summary badge: "FOUNDER & LEAD AI / BI SOLUTIONS ARCHITECT"
- Stat counters: 95% Predictive Accuracy, 60% Cost Reduction, Executive Dashboards, OPERA PMS & ERP, Sub-2s Query Speeds, 95% Client Retention.
- Call-to-action buttons: "Schedule Consultation" (`/book`) and "Explore Projects" (`/projects`).

- [ ] **Step 2: Implement Technology & Stack section**
- Interactive categorized tech badges: Cloud & Lakehouse (AWS, GCP, Databricks, Delta Lake, PySpark), AI & Machine Learning (LightGBM, Scikit-Learn, PyTorch, LangChain), Enterprise BI & ERP (Power BI, DAX, OPERA PMS, SQL Server), Distributed Backend (FastAPI, Docker, Kubernetes).

- [ ] **Step 3: Implement Experience & Impact timeline**
- Career milestones: Founder & Lead AI / BI Solutions Architect, Data Science Intern, Reservations & Operations BI Specialist, Business Intelligence Developer, Team Leader.
- Key outcomes with quantifiable business metrics for each role.

- [ ] **Step 4: Implement Featured Projects & Education Credentials**
- Flagship projects showcase: Safir Hotels Operations Dashboard, Sotex Factory Operations Dashboard, Enterprise Sales Prediction Model, Breast Cancer Prediction System.
- Master's Degree & verified international certifications.

- [ ] **Step 5: Verify page rendering and visual parity with Stitch screenshot**
Check layout, spacing, colors, and typography against `scratch/screens/03_portfolio_home/screen.png`.

---

### Task 4: Implement Screen 06 — Projects & Case Studies (`/projects`)

**Files:**
- Create: `src/app/projects/page.tsx`
- Create: `src/components/projects/CaseStudyCard.tsx`
- Create: `src/components/projects/CaseStudyModal.tsx`
- Create: `src/components/projects/ArtifactsDownloadSection.tsx`
- Create: `src/data/projectsData.ts`

**Interfaces:**
- Produces: Projects & Case Studies page matching Stitch Screen ID `4ba90c0ca1e74bdc89582d3a8e9e9e99`.

- [ ] **Step 1: Create `src/data/projectsData.ts`**
Populate complete case studies from Stitch:
- Safir Hotels & Resorts — Distributed OPERA PMS Real-Time Streaming Lakehouse
- Sotex Textile Manufacturing — Industrial IoT & Telemetry Executive Cockpit
- FinTech Algorithmic Risk — Microservice Backend & Transaction Gateway
- Oncology Clinical Decision Support — Breast Cancer Classification Pipeline
- Enterprise Retail Demand Forecasting Engine (LightGBM + Prophet)
- Automated ETL Observability & Data Pipeline Sentinel

- [ ] **Step 2: Implement Case Studies Page with Category Filters**
- Categories: All, Distributed Lakehouse, Industrial IoT & BI, FinTech & Risk, Machine Learning & AI
- Interactive search input
- Detailed case study cards with architecture tags, problem/solution, metrics, and "Explore Blueprint" trigger

- [ ] **Step 3: Implement Interactive Architecture Blueprint Modal**
- Full modal displaying system diagram flow, technical stack breakdown, and business ROI

- [ ] **Step 4: Implement Verified Architectural Artifacts Section**
- Downloadable artifacts: Architecture Blueprint Specs, PySpark Template Notebooks, Power BI & DAX Model Dictionary

- [ ] **Step 5: Verify page rendering and visual parity with Stitch screenshot**
Check against `scratch/screens/06_projects_case_studies/screen.png`.

---

### Task 5: Implement Screen 07 — Engineering Blog & Technical Insights (`/blog`)

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/components/blog/FeaturedArticle.tsx`
- Create: `src/components/blog/ArticleCard.tsx`
- Create: `src/components/blog/NewsletterCard.tsx`
- Create: `src/components/blog/ArticleReadingModal.tsx`
- Create: `src/data/blogData.ts`

**Interfaces:**
- Produces: Engineering Blog page matching Stitch Screen ID `04404baa113643398bbd52349d785fef`.

- [ ] **Step 1: Create `src/data/blogData.ts`**
Articles directly from Stitch:
- Featured: "Deconstructing PySpark Shuffling: Eliminating 2-Hour Bottlenecks in Multi-Terabyte Delta Lake Upserts"
- "Zero-Downtime Migration from Legacy ERP to Cloud Lakehouse"
- "Designing High-Concurrency Microservices for Real-Time Financial Ledger Reconciliation"
- "Production ML Pipelines: Automated Feature Stores & Drift Detection at Scale"
- "The Distributed Systems Playbook for Technical Leaders"

- [ ] **Step 2: Implement Featured Hero Article**
- Full-width hero layout with architecture code snippet preview, author avatar, reading time (14 min read), tags, and read button

- [ ] **Step 3: Implement Article Grid & Curated Field Guides**
- Tag filters (All, Distributed Systems, Data Engineering, Machine Learning, Leadership)
- Search bar
- Open-Source Reference Repositories section

- [ ] **Step 4: Implement Newsletter Subscription & Article Reader Modal**
- "The Systems Architect" Dispatch subscription form with feedback message
- Interactive reading dialog for full technical deep-dive

- [ ] **Step 5: Verify parity with Stitch screenshot**
Check against `scratch/screens/07_engineering_blog/screen.png`.

---

### Task 6: Implement Screen 04 — Interactive Booking System (`/book`)

**Files:**
- Create: `src/app/book/page.tsx`
- Create: `src/components/booking/TrackSelectionStep.tsx`
- Create: `src/components/booking/DateTimeStep.tsx`
- Create: `src/components/booking/IntakeFormStep.tsx`
- Create: `src/components/booking/ConfirmationStep.tsx`
- Create: `src/components/booking/BookingWizard.tsx`

**Interfaces:**
- Produces: Interactive 4-step scheduling engine matching Stitch Screen ID `e9e2d384d60e4299a2b85906f00d6196`.

- [ ] **Step 1: Implement Step Indicator & Wizard State**
- Progress bar and step headers: Step 01 (Consultation Track), Step 02 (Date & Time Slot), Step 03 (Intake & Architecture), Step 04 (Verification & Confirmation)

- [ ] **Step 2: Implement Step 1 (Consultation Track)**
- Tracks from Stitch:
  - Free Discovery & Scoping (30 mins - Initial assessment)
  - Deep-Dive Architecture Review (90 mins - System blueprint & bottlenecks audit)
  - Enterprise & Retainer Scoping (60 mins - High-level advisory & advisory board)
  - Rapid Code & BI Audit (45 mins - Pipeline inspection & DAX/SQL health check)

- [ ] **Step 3: Implement Step 2 (Interactive Calendar & Time Slots)**
- Calendar month grid with selectable available dates
- Time slot pills (Morning & Afternoon slots with timezone selector)
- Selection summary preview

- [ ] **Step 4: Implement Step 3 (Client Intake & Architecture Scope)**
- Client information fields: Full Name, Corporate Email, Company / Organization, Role, Architecture Scope & Agenda textarea, File attachment simulator

- [ ] **Step 5: Implement Step 4 (Confirmation & Dispatch)**
- "Consultation Dispatched!" celebration card with booking reference code, date/time badge, calendar invite button (.ics), and link to My Bookings portal

- [ ] **Step 6: Verify booking flow and parity with Stitch screenshot**
Check against `scratch/screens/04_book_consultation/screen.png`.

---

### Task 7: Implement Screen 05 — Client Reservation Hub & Portal (`/my-bookings`)

**Files:**
- Create: `src/app/my-bookings/page.tsx`
- Create: `src/components/portal/ActiveBookingCard.tsx`
- Create: `src/components/portal/PrepChecklist.tsx`
- Create: `src/components/portal/BookingArchiveTable.tsx`
- Create: `src/components/portal/RescheduleModal.tsx`
- Create: `src/components/portal/AgendaUpdateModal.tsx`

**Interfaces:**
- Produces: Client Consultation Portal matching Stitch Screen ID `a2881c3ca68440e6a1f2ce6ecd3d66d6`.

- [ ] **Step 1: Implement Active Consultation Hero Card**
- Title: "Deep-Dive Technical Architecture Review with Islam Samy"
- Date, time, Google Meet link button, countdown badge ("CONFIRMED • IN 3 DAYS")
- Action buttons: "Reschedule Slot" and "Update Meeting Agenda"

- [ ] **Step 2: Implement Client Preparation Checklist**
- Interactive preparation steps:
  1. Share architecture diagrams / system topology
  2. Prepare access logs or performance benchmark metrics
  3. Define top 3 architectural bottlenecks
  4. Test conference audio & screen sharing

- [ ] **Step 3: Implement Consultation Registry & Archive Table**
- Historical sessions with date, type, status, and downloadable session notes / architecture recommendations PDF

- [ ] **Step 4: Implement Reschedule & Agenda Modals**
- Interactive dialogs allowing client to select a new date/time or amend meeting objectives

- [ ] **Step 5: Verify parity with Stitch screenshot**
Check against `scratch/screens/05_my_bookings_portal/screen.png`.

---

### Task 8: Implement Screen 02 — Admin Auth & Security Gateway (`/admin/login`)

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/components/auth/SecurityKeyPrompt.tsx`
- Create: `src/components/auth/OtpInput.tsx`
- Create: `src/components/auth/AuditTrailFeed.tsx`
- Create: `src/components/auth/IncidentDefensesCard.tsx`

**Interfaces:**
- Produces: High-security authentication gateway matching Stitch Screen ID `16edd1f41da542d19da8135e279c33fb`.

- [ ] **Step 1: Implement Terminal Security Layout**
- Header: "Ops Gateway Authentication — Classified Access"
- Status bar: "AIR-GAPPED TELEMETRY • ENCLAVE ACTIVE • TLS 1.3"

- [ ] **Step 2: Implement Inbound Attestation & Multi-Factor Inputs**
- Hardware token / WebAuthn simulation button
- 6-digit OTP passcode inputs with auto-advance and numeric paste support
- Quick "Authenticate as Islam Samy (Demo Bypass)" button for instant authorized entry into `/admin`

- [ ] **Step 3: Implement Live Audit Trail & Incident Defenses Cards**
- Terminal log feed: Real-time authentication attempts, IP addresses, TLS handshakes, and cryptographic verification stamps
- Security indicators: Geo-fenced IP validation, rate limiters, memory integrity checks

- [ ] **Step 4: Verify parity with Stitch screenshot**
Check against `scratch/screens/02_admin_auth_security/screen.png`.

---

### Task 9: Implement Screen 01 — Admin Command Center System Overview (`/admin`)

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/components/admin/OverviewKpiCards.tsx`
- Create: `src/components/admin/WeeklyVelocityChart.tsx`
- Create: `src/components/admin/PendingReservationsCard.tsx`
- Create: `src/components/admin/ClusterTopologyCard.tsx`
- Create: `src/components/admin/ActivityStreamCard.tsx`

**Interfaces:**
- Produces: Executive Operations Dashboard matching Stitch Screen ID `6325c92893aa4d2ea1ac63768459bf5f`.

- [ ] **Step 1: Implement Admin Shell & Welcome Banner**
- Header: "Welcome back, Islam" with live system telemetry status and quick action buttons

- [ ] **Step 2: Implement KPI Telemetry Cards & Velocity Radar**
- Key metrics: Total Consultations (142), Weekly Velocity (+18.4%), Average Rating (4.98/5.0), Infrastructure Health (100%)
- Weekly Consultation Radar chart visualization with daily booking volume bars

- [ ] **Step 3: Implement Action Required: Pending Reservations Card**
- Client requests awaiting confirmation (e.g., Safir Hotels & Resorts, Sotex Factory, FinTech Corp)
- Quick action buttons: "Approve Slot", "Propose Reschedule", "Decline"

- [ ] **Step 4: Implement Distributed Cluster Topology & Real-Time Activity Stream**
- Server node status: Node-US-East (Active), Node-EU-Central (Optimal), Lakehouse Sentinel (Streaming)
- Live activity feed with timestamped client reservations and system triggers

- [ ] **Step 5: Verify parity with Stitch screenshot**
Check against `scratch/screens/01_admin_command_center/screen.png`.

---

### Task 10: Implement Screen 08 — Reservations & Schedule Operations Console (`/admin/reservations`)

**Files:**
- Create: `src/app/admin/reservations/page.tsx`
- Create: `src/components/admin/ReservationsTable.tsx`
- Create: `src/components/admin/ReservationDrawer.tsx`
- Create: `src/components/admin/MasterSchedulingRules.tsx`
- Create: `src/data/reservationsData.ts`

**Interfaces:**
- Produces: Schedule & Bookings Operations Console matching Stitch Screen ID `d8e34dbafb3a4142baa34a048502d96a`.

- [ ] **Step 1: Create `src/data/reservationsData.ts`**
Initial mock data matching Stitch (Sarah Jenkins, Safir Hotels executives, Sotex engineering team, FinTech Risk VP).

- [ ] **Step 2: Implement Reservations Table with Status Filters**
- Filter tabs: All (28), Confirmed (18), Pending (6), Rescheduled (3), Cancelled (1)
- Search by client name, email, or company
- Data columns: Client, Organization, Track, Date & Time, Status Badge, Actions

- [ ] **Step 3: Implement Client Dossier & Action Drawer**
- Detailed slide-out drawer when clicking a reservation (e.g., Sarah Jenkins, VP of Architecture):
  - Contact information & LinkedIn
  - Submitted architecture brief & problem statement
  - Meeting link generator
  - Admin notes & internal tagging
  - Status updater (Confirm, Reschedule, Mark Completed)

- [ ] **Step 4: Implement Master Scheduling & Dispatch Rules Card**
- Configure working hours, buffer between consultations, maximum meetings per week, and holiday blackout dates

- [ ] **Step 5: Verify parity with Stitch screenshot**
Check against `scratch/screens/08_reservations_management/screen.png`.

---

### Task 11: End-to-End Verification, Asset Optimization & Production Build

**Files:**
- Create/Verify: All routes (`/`, `/projects`, `/blog`, `/book`, `/my-bookings`, `/admin/login`, `/admin`, `/admin/reservations`)

- [ ] **Step 1: Run TypeScript type check & Production Build**
Run: `npm run build`
Expected: Zero type errors, clean static generation.

- [ ] **Step 2: Test Navigation Flow across all 8 screens**
Verify every route transition, back button, and link between public and admin portals.

- [ ] **Step 3: Final Pixel-Perfect Review**
Compare each route against its corresponding screenshot in `scratch/screens/*/screen.png`.

