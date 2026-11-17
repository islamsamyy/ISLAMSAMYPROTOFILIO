# Islam Samy — Interactive Portfolio, Booking & CRM Platform

A full-stack personal portfolio, technical blog, client booking system, and CRM admin platform built with Next.js 15, React 19, Three.js, Framer Motion, and Supabase.

## Executive Summary & Purpose
`ISLAMSAMYPROTOFILIO` (`islam-samy-portfolio`) goes beyond a static developer portfolio. It combines interactive 3D/animated UI (`three`, `framer-motion`) with a complete client-facing service booking flow, pricing tiers, verified reviews, and a private `/admin` CRM for managing blog posts, certifications, and client leads.

## Core Functionality & Features
- **Portfolio & Showcase**:
  - **Projects (`/projects`)**: Case studies and live project showcases.
  - **Pricing (`/pricing`) & Reviews (`/reviews`)**: Service packages and client testimonials.
  - **Blog (`/blog`)**: Technical articles and engineering write-ups.
- **Client Booking System**:
  - **Book (`/book`) & My Bookings (`/my-bookings`)**: Interactive consultation/service scheduling and booking status tracking.
- **Admin & CRM (`/admin`)**:
  - Manage **Blog** (`/admin/blog`), **Certifications** (`/admin/certifications`), and **CRM** (`/admin/crm`).
- **SEO & PWA**: Built-in `robots.ts`, `sitemap.ts`, `manifest.ts`, and `i18n` support.

## Architecture & Tech Stack
- **Framework**: Next.js 15 (`^15.1.0`) App Router & React 19 (`^19.0.0`)
- **Language**: TypeScript 5
- **UI & Animation**: Radix UI primitives, Tailwind CSS 3, `framer-motion`, `three`, `lucide-react`
- **Backend**: Supabase (`@supabase/supabase-js`)
- **Testing**: Custom Node test runner (`tests/runner.mjs`)

## Project Structure
```text
├── src/
│   ├── app/
│   │   ├── admin/        # Admin CMS & CRM (blog, certifications, crm)
│   │   ├── api/          # API routes
│   │   ├── blog/         # Technical blog
│   │   ├── book/         # Booking flow
│   │   ├── my-bookings/  # Client booking management
│   │   ├── pricing/      # Service pricing
│   │   ├── projects/     # Project showcase
│   │   └── reviews/      # Client reviews
│   ├── components/       # UI & 3D components
│   ├── context/          # React context providers
│   ├── data/             # Static/structured content
│   ├── hooks/            # Custom hooks
│   ├── i18n/             # Internationalization
│   └── lib/              # Utilities & Supabase client
├── docs/                 # Project documentation
├── tests/                # Test runner & specs
└── public/               # Static assets
```

## Getting Started

```bash
git clone https://github.com/islamsamyy/ISLAMSAMYPROTOFILIO.git
cd ISLAMSAMYPROTOFILIO
npm install
cp .env.example .env.local
```

### Available Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js ESLint |
| `npm test` | Run test suite (`node tests/runner.mjs`) |
