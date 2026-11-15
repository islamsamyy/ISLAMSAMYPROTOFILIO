# Design Document: Arabic & English Translation with Header Switcher

## Intent & The Why
Islam Samy's executive portfolio showcases high-impact Data Engineering, custom ERP system architecture, autonomous AI agents, and enterprise automations. Catering to clients and decision-makers across Egypt, the GCC (Saudi Arabia, UAE, Qatar), and international markets requires full bilingual presentation (Arabic & English). Providing seamless, instant language switching with culturally polished, high-rigor Arabic translations elevates credibility and enables enterprise prospects to engage in their preferred language.

## Goals, Non-Goals, Anti-Goals

### Goals
- Provide full, accurate, executive-grade translations in Arabic (`ar`) and English (`en`) across all public portfolio pages and components.
- Translate all 3 blog articles completely (titles, summaries, tags, metadata, and full markdown article content, keeping nested code blocks LTR).
- Translate all project detail case studies (`/projects/[id]`) completely (objectives, architecture, telemetry, results).
- Introduce an intuitive, sleek Language Switcher in the `SiteHeader` (and `MobileNavDrawer`) next to `ThemeToggle`.
- Persist user language choice in `localStorage` (`islam_language_v1`) with fallback to browser language or English.
- Dynamically toggle document text direction (`dir="rtl"` vs `dir="ltr"`) and HTML `lang` attribute (`ar` vs `en`).
- Maintain visual harmony with dark/light themes, Framer Motion animations, Three.js 3D background canvases, and responsive layouts.
- Ensure proper Arabic typography (supporting Cairo/Tajawal font styling or system Arabic fonts, clean letter-spacing, and no awkward text clipping).

### Non-Goals
- URL subpath rewrites (e.g. `/ar/...`) that would break existing backlinks, Supabase redirects, or require heavy Next.js routing restructuring.
- Machine-translated or external third-party widgets (e.g. Google Translate script) that cause layout shifts or low-quality phrasing.
- Translating technical code samples, SQL queries, or third-party company brand names (e.g., ClickHouse, Kafka, Next.js, OPERA PMS).

### Anti-Goals
- Breaking existing hydration or causing Flash of Unstyled Text / Content (FOUC).
- Leaving any page or section half-translated.
- Neglecting RTL layout details (e.g., icons pointing the wrong way, badges overflowing, or alignment discrepancies).

## Approaches Considered

### 1. Custom React LanguageContext + Structured Translation Dictionaries (Selected)
- **Architecture**: A centralized `LanguageContext` (`LanguageProvider`, `useLanguage`, `t` translator hook) with structured dictionaries for `en` and `ar`.
- **Why chosen**: 
  - Directly matches the clean, established architecture of the existing `ThemeProvider`.
  - Zero hydration mismatch; client-side reactivity without page reloads.
  - Zero heavy third-party bundle weight.
  - Leaves App Router paths (`/`, `/projects`, `/pricing`, `/blog`, `/book`, `/reviews`, `/my-bookings`) intact.

### 2. Next.js Route Rewriting with `next-intl` (`/[locale]/...`)
- **Tradeoffs**: Requires nesting every existing route folder inside `[locale]`, adjusting Next.js middleware, updating all internal links and sitemap generators, and handling complex SSR route hydration for Supabase. Ruled out as overly invasive and disruptive.

### 3. Automated Client-Side Translation Widget (Google Translate / Weglot)
- **Tradeoffs**: Inconsistent Arabic phrasing for technical terms (e.g. ERP, ETL, CDC streaming, Lakehouse), visual flash, lack of fine control over RTL CSS, and external script dependency. Ruled out for an executive engineering portfolio.

## Technical Architecture & Implementation Details

### 1. Translation System & Context (`src/context/LanguageContext.tsx`)
- `Language` type: `'en' | 'ar'`
- `LanguageContext`:
  - `language`: active language (`'en'` | `'ar'`)
  - `setLanguage(lang: Language)`: updates state, writes to `localStorage`, and updates `document.documentElement.dir` (`rtl` / `ltr`) and `document.documentElement.lang`.
  - `toggleLanguage()`: swaps between `'en'` and `'ar'`.
  - `t(key: string, defaultText?: string)` helper for quick key lookups.
  - Direct nested dictionary support for high readability: `t('header.nav.projects')`, `t('hero.headline')`, etc.
  - Anti-FOUC initialization script in `src/app/layout.tsx` to set initial `dir` and `lang` prior to hydration.

### 2. Translation Dictionaries (`src/i18n/translations.ts`)
Comprehensive keys covering:
- **Global / Header**: Navigation links, CTA buttons, status badges, switcher tooltip.
- **Footer**: Brand statement, quick links, advisory tracks, copyright, contact info.
- **Home Page**:
  - Hero section (headline, subhead, CTAs, 6 executive capability cards).
  - Certifications & Verified Credentials section.
  - Credibility strip (ERP, AI Agents, Automations, Web Dev).
  - Technical Arsenal section.
  - Professional Experience Timeline section.
  - Featured Real Projects (descriptions, metrics, tags, case study CTAs).
  - Pricing & Retainer preview section.
  - Client Reviews section.
  - Interactive Contact & Inquiry form (labels, placeholders, buttons, feedback messages).
- **Projects Pages**:
  - Main listing (`/projects`): Categories, search placeholder, metrics, blueprints modal.
  - Detail page (`/projects/[id]`): Objectives, system architecture, telemetry benchmarks, results.
- **Pricing Page (`/pricing`)**:
  - Tiered packages, milestone vs retainer toggle, deliverables, consultation rates calculator.
- **Blog Pages (`/blog` & `/blog/[slug]`)**:
  - Search, categories, reading time, article titles, summaries, tags.
  - **Full Markdown Article Content**: All 3 articles include complete Arabic markdown bodies in addition to English, with code blocks isolated in LTR format.
- **Advisory Booking Page (`/book`)**:
  - Step-by-step advisory reservation wizard, package selector, date picker, confirmation.
- **Client Reviews Page (`/reviews`)**:
  - Rating breakdowns, verified client testimonials, filter chips.
- **Client Portal (`/my-bookings`)**:
  - Reservation lookup, booking status, dossiers.

### 3. Header Switcher UI (`SiteHeader.tsx` & `MobileNavDrawer.tsx`)
- Frosted glass button matching existing `ThemeToggle` style:
  - Icon: Globe / Languages icon (`lucide-react` `Globe` or `Languages`).
  - Label: Shows opposite language in its native script (`العربية` when English is active, `English` when Arabic is active).
  - Smooth spring transition and accessible ARIA attributes (`aria-label`, `role="button"`).

### 4. RTL & Font Styling
- Add Arabic font support in `src/app/layout.tsx` (Cairo / Tajawal via Google Fonts).
- When `dir="rtl"`, apply appropriate font-family and directional adjustments (margins, paddings, icon alignments).

## Calls Made by Builder
- **Blog article body scope**: To satisfy "make sure all sections translated" with zero half-translated pages, full Arabic markdown bodies are provided for all 3 articles in `seedArticles.ts`, with code snippets kept in LTR format.
- **Numerals**: Western numerals (`0-9`) and standard USD symbols (`$`) are preserved across both locales as standard in enterprise tech portfolios.
