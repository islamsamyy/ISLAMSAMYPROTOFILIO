# Project: Islam Samy Executive Portfolio Showcase Overhaul

## Architecture
- **Framework**: Next.js 15.1 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 3.4 + Radix UI Primitives + Lucide React
- **Theme Architecture**: CSS variable design tokens in `globals.css` with space-separated RGB channels for opacity support; zero-dependency React 19 `ThemeProvider`, inline anti-FOUC blocking script in `<head>`, and `suppressHydrationWarning` on `<html>`.
- **Navigation Shell**: High-performance cybernetic sticky header with multi-route active indicator pill (`motion.div`), dynamic Cairo clock status telemetry, quick actions (theme switch, Book CTA, Admin link), and a full-featured slide-over `MobileNavDrawer`.
- **Canvas & 3D System**: Procedural 60 FPS HTML5 Canvas 2D + Framer Motion CSS 3D transforms (`perspective`, `rotateX`, `rotateY`, `translateZ`) in `<TiltCard>`, `<ParticleMeshCanvas>`, `<CyberneticGridCanvas>`, `<Hero3DOrbit>`, and `<ProjectTelemetryCanvas>` with strict RAF cancellation, `IntersectionObserver` auto-pausing, and HiDPI `devicePixelRatio` scaling.
- **Data Persistence**: Reactive client store (`src/lib/data-store.ts`, `hooks.ts`, `seed*.ts`) with custom synchronization events (`islam_store_sync`) and local storage.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Dual Theme Design Tokens | Space-separated RGB variables in `:root` (light) and `.dark` (cybernetic) mapped in `tailwind.config.ts` | M1 | R4 |
| F2 | Zero-FOUC Theme Provider | React 19 `ThemeProvider` + inline blocking `<head>` script + `ThemeToggle` component | M1 | R4 |
| F3 | Accessible Radix UI Primitives | `dialog.tsx`, `tabs.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `select.tsx`, `avatar.tsx`, `tooltip.tsx` | M1 | R1 |
| F4 | Cybernetic Header & Active Route Pill | Active route tracking (exact, subroutes, hash targets) with animated spring pill | M2 | R2 |
| F5 | Dynamic Cairo Status Telemetry | Live Cairo clock (`HH:MM EET`) with pulsing cyan telemetry status dot | M2 | R2 |
| F6 | Responsive Mobile Navigation Drawer | Slide-over sheet from right, backdrop blur, body scroll lock, Escape dismiss, actions & theme toggle | M2 | R2 |
| F7 | Admin Navigation & Theme Sync | `AdminNav.tsx` with `ThemeToggle` and responsive mobile hamburger fallback | M2 | R2, R4 |
| F8 | Interactive Particle Mesh Canvas | Interactive interconnected nodes with distance linking lines and cursor proximity interaction | M3 | R3 |
| F9 | Cybernetic Grid Canvas | 3D perspective receding digital horizon grid with pulsing scanlines | M3 | R3 |
| F10 | Hero 3D Orbital Rings | Multi-ring 3D orbital rings with cursor-reactive parallax | M3 | R3 |
| F11 | Universal 3D Tilt Card Primitive | `<TiltCard />` with mouse-following perspective rotation, specular sheen, and depth transforms | M3 | R3 |
| F12 | Componentized Project 3D Telemetry | Category-driven 3D telemetry canvases (radar, topology, hypercube, hyperplane) with RAF cleanup | M3 | R3 |
| F13 | Centralized Animation Choreography | `motion-variants.ts` and `src/app/template.tsx` route transition wrapper | M3 | R3 |
| F14 | Homepage Semantic Decomposition | Refactor 1,205-line `page.tsx` into typed modular sections (`Hero`, `Telemetry`, `Projects`, `Pricing`, `Contact`) | M4 | R1 |
| F15 | Case Studies Route Overhaul (`/projects`) | Radix `Dialog` for `<ArchitectureModal />`, `TiltCard` on `<ProjectCard />`, accessible category tabs | M4 | R1 |
| F16 | Engineering Blog Route Overhaul (`/blog`) | Radix `Dialog` for reader modal, `TiltCard` on `<ArticleCard />`, accessible search & filters | M4 | R1 |
| F17 | Dual Booking System Overhaul (`/book`) | Radix `Tabs` (Packages vs 1-on-1), shadcn form controls, accessible confirmation modal | M4 | R1 |
| F18 | Client Reservation Portal Overhaul (`/my-bookings`) | Radix `Dialog` for Reschedule modal, Radix `Tabs` for Active/Past bookings, accessible cards | M4 | R1 |
| F19 | Admin Command Center Overhaul (`/admin/*`) | Radix `Dialog` across CRUD modals, semantic `<table>`, accessible form controls | M4 | R1 |
| F20 | Build & TypeScript Zero-Error Baseline | Elimination of `// @ts-nocheck`, clean `npm run build` and `tsc --noEmit` across all 15 static routes | M4 | Verification |
| F21 | E2E Test Suite Validation & Hardening | 100% pass rate on Tiers 1-4 E2E tests + Tier 5 adversarial coverage hardening | M5 | Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundational Theme Tokens & UI Primitives System | F1, F2, F3 | none | IN_PROGRESS |
| M2 | Modern Cybernetic Header & Navigation Drawer | F4, F5, F6, F7 | M1 | PLANNED |
| M3 | Interactive 3D & Canvas Effects and Motion Choreography | F8, F9, F10, F11, F12, F13 | M1 | PLANNED |
| M4 | Semantic Structure & Visual Design Overhaul Across All Routes | F14, F15, F16, F17, F18, F19, F20 | M1, M2, M3 | PLANNED |
| M5 | Final Acceptance: E2E Test Suite Pass & Adversarial Hardening | F21 (Phase 1: Tiers 1-4, Phase 2: Tier 5) | M4, TEST_READY.md | PLANNED |

## Interface Contracts

### M1 ↔ M2 / M3 / M4 (Theme & Primitives)
- `useTheme()` hook:
  ```ts
  interface ThemeContextType {
    theme: 'dark' | 'light' | 'system';
    resolvedTheme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light' | 'system') => void;
    toggleTheme: () => void;
    mounted: boolean;
  }
  ```
- CSS Variables in `:root` and `.dark` provide 48 color channels in `R G B` format.
- UI Primitives exported from `src/components/ui/`:
  - `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose`
  - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
  - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
  - `Input`, `Textarea`, `Label`, `Select`, `Avatar`, `Tooltip`

### M2 ↔ M4 (Navigation Shell)
- `SiteHeader.tsx`: exported default component; renders top navigation bar with active route tracking, live Cairo clock, and `MobileNavDrawer`.
- `AdminNav.tsx`: exported default component; renders admin navigation with `ThemeToggle` and mobile hamburger.

### M3 ↔ M4 (Canvas & 3D Interactive Primitives)
- `<TiltCard maxTilt={12} glare={true} depth={20}>{children}</TiltCard>`: wraps any card (`ProjectCard`, `ArticleCard`, `MetricCard`, Hero portrait) with 3D perspective tilt.
- `<ParticleMeshCanvas particleCount={75} interactive={true} className="..." />`: renders interactive node mesh with canvas RAF cleanup.
- `<Hero3DOrbit size={460} className="..." />`: renders multi-ring 3D orbital rings.
- `<ProjectTelemetryCanvas type="radar"|"topology"|"hypercube"|"hyperplane" />`: renders category-specific telemetry.
- `<CyberneticGridCanvas horizonY={0.65} className="..." />`: renders cybernetic horizon grid.

## Code Layout
- `src/app/`: Next.js 15 App Router routes (`/`, `/projects`, `/blog`, `/book`, `/my-bookings`, `/admin/*`, `layout.tsx`, `template.tsx`, `globals.css`)
- `src/components/ui/`: shadcn & Radix UI primitives (`button.tsx`, `badge.tsx`, `dialog.tsx`, `tabs.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `select.tsx`, `avatar.tsx`, `tooltip.tsx`, `TiltCard.tsx`)
- `src/components/navigation/`: Navigation components (`SiteHeader.tsx`, `MobileNavDrawer.tsx`, `SiteFooter.tsx`, `AdminNav.tsx`)
- `src/components/theme/`: Theme system (`ThemeProvider.tsx`, `ThemeToggle.tsx`)
- `src/components/canvas/`: Canvas & 3D components (`ParticleMeshCanvas.tsx`, `CyberneticGridCanvas.tsx`, `Hero3DOrbit.tsx`, `TelemetryWaveform.tsx`, `ProjectTelemetryCanvas.tsx`)
- `src/components/animation/`: Motion choreography variants (`motion-variants.ts`)
- `src/components/home/`: Homepage modular section components (`HeroSection.tsx`, `TelemetryMetricsSection.tsx`, `FeaturedProjectsSection.tsx`, `PricingSection.tsx`, `ContactSection.tsx`, `ClientReviewsSection.tsx`)
- `src/components/projects/`: Project components (`ProjectCard.tsx`, `ArchitectureModal.tsx`)
- `src/components/blog/`: Blog components (`ArticleCard.tsx`)
- `src/hooks/`: Custom React hooks (`useReducedMotion.ts`)
- `src/lib/`: State management & utilities (`data-store.ts`, `hooks.ts`, `utils.ts`)
- `src/data/`: Data models and seed datasets (`seedProjects.ts`, `seedPricing.ts`, `seedArticles.ts`, `seedReviews.ts`, `seedReservations.ts`)
