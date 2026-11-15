# Arabic & English Translation and Header Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide full, high-rigor Arabic and English translation across all portfolio pages and sections with a header language switcher, dynamic RTL/LTR support, and persistent state.

**Architecture:** A lightweight React LanguageContext (`LanguageProvider`) paired with comprehensive bilingual dictionaries (`ar` and `en`), persisting choice to `localStorage` (`islam_language_v1`), setting `dir="rtl"` / `dir="ltr"` and `lang` on `<html>`, with an anti-FOUC blocking script in `src/app/layout.tsx`, and a frosted-glass switcher in `SiteHeader` and `MobileNavDrawer`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide icons, Framer Motion.

**Spec:** `docs/superpowers/specs/2026-11-14-arabic-english-translation-design.md`

## Global Constraints
- Persist language key as `islam_language_v1` in `localStorage` with multi-tab storage event synchronization.
- Anti-FOUC inline script in `src/app/layout.tsx` before React hydration to prevent flash of wrong text direction.
- Preserve 0-9 numerals and USD ($) currency symbols across both Arabic and English locales.
- Keep technical brand names intact (e.g. OPERA PMS, Kafka, ClickHouse, Next.js, n8n, Python, PostgreSQL, Power BI).
- Keep existing routes intact (no `/[locale]` subpath breaking changes).

## Review Focus
- Document root `dir` and `lang` attributes change immediately on switch without page refresh.
- LocalStorage persists language across page navigation and browser reloads.
- Missing translation fallback: any missing key safely falls back to English rather than throwing or showing `undefined`.
- RTL layout stability: cards, badges, buttons, and form inputs do not clip or misalign when `dir="rtl"` is active.
- Blog markdown bodies on `/blog/[slug]` switch to Arabic text while keeping code snippets LTR formatted.

---

### Task 1: Core I18n System (Dictionaries, LanguageContext, and Layout Integration)

**Files:**
- Create: `src/i18n/translations.ts`
- Create: `src/context/LanguageContext.tsx`
- Modify: `src/app/layout.tsx`
- Create: `tests/i18n.test.mjs`

**Interfaces:**
- Produces: `Language` (`'en' | 'ar'`), `useLanguage(): { language: Language, setLanguage: (l: Language) => void, toggleLanguage: () => void, t: (key: string, fallback?: string) => string, isRTL: boolean }`, `LanguageProvider`.

- [ ] **Step 1: Write the failing test for the translation dictionary and context helper**
Create `tests/i18n.test.mjs` using `node:test` and `node:assert`:
Verify that `translations.en` and `translations.ar` exist, contain identical top-level keys (`nav`, `header`, `hero`, `certifications`, `credibility`, `tech`, `experience`, `projects`, `pricing`, `reviews`, `contact`, `footer`, `pages`), and that a lookup helper returns the correct text for both `en` and `ar`.

- [ ] **Step 2: Run test to verify it fails**
Run: `node tests/i18n.test.mjs`
Expected: FAIL (cannot find module `src/i18n/translations.ts`)

- [ ] **Step 3: Implement `src/i18n/translations.ts`**
Construct comprehensive dictionaries for `en` and `ar` covering all UI labels, navigation, footer, section headlines, badges, descriptions, and page-specific content.

- [ ] **Step 4: Implement `src/context/LanguageContext.tsx`**
Create `LanguageProvider` and `useLanguage` hook. Provide `language`, `setLanguage`, `toggleLanguage`, `isRTL`, and `t(key, fallback)` function supporting dot-notation keys (e.g. `t('nav.home')`). Update `document.documentElement.dir` (`rtl` vs `ltr`) and `document.documentElement.lang`. Handle `localStorage` syncing with storage key `islam_language_v1`.

- [ ] **Step 5: Integrate `LanguageProvider` into `src/app/layout.tsx`**
Wrap the application in `LanguageProvider` inside `src/app/layout.tsx`. Add an inline anti-FOUC script in `<head>` that reads `localStorage.getItem('islam_language_v1')` and sets `document.documentElement.dir` and `lang` before hydration. Add Google Font link for Arabic typography (Cairo/Tajawal).

- [ ] **Step 6: Run test to verify it passes**
Run: `node tests/i18n.test.mjs`
Expected: PASS

- [ ] **Step 7: Commit**
```bash
git add src/i18n/translations.ts src/context/LanguageContext.tsx src/app/layout.tsx tests/i18n.test.mjs
git commit -m "feat(i18n): create core translation dictionaries and LanguageProvider"
```

---

### Task 2: Language Switcher UI in Header & Navigation

**Files:**
- Modify: `src/components/navigation/SiteHeader.tsx`
- Modify: `src/components/navigation/MobileNavDrawer.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `@/context/LanguageContext`

- [ ] **Step 1: Update `SiteHeader.tsx`**
- Import `useLanguage` and `Globe` or `Languages` from `lucide-react`.
- Localize navigation links labels (`navLinks`: Home, Projects, Pricing, Blog, Advisory, Reviews, Portal) via `t()`.
- Localize subtitle in brand crest ("Data Engineer & Software Developer", "6 Yrs Exp", etc.).
- Add language switcher button next to `ThemeToggle`:
  - Frosted glass button with globe icon and text label: `العربية` when English is active, and `EN` / `English` when Arabic is active.
  - Hover/focus states matching `ThemeToggle`.
  - Accessible `aria-label` ("Switch to Arabic" / "التبديل إلى الإنجليزية").
- Localize "Book Advisory" button text.

- [ ] **Step 2: Update `MobileNavDrawer.tsx`**
- Localize drawer header, navigation links, and drawer action buttons.
- Add language switcher toggle in the drawer actions cluster alongside ThemeToggle.

- [ ] **Step 3: Verification**
Run: `npm run lint` or check TypeScript diagnostics on `SiteHeader.tsx` and `MobileNavDrawer.tsx`.
Ensure existing tests for SiteHeader pass or are adapted cleanly.

- [ ] **Step 4: Commit**
```bash
git add src/components/navigation/SiteHeader.tsx src/components/navigation/MobileNavDrawer.tsx
git commit -m "feat(i18n): add header and mobile drawer language switcher"
```

---

### Task 3: Global Footer Localization

**Files:**
- Modify: `src/components/navigation/SiteFooter.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `@/context/LanguageContext`

- [ ] **Step 1: Localize `SiteFooter.tsx`**
- Import `useLanguage` and translate:
  - Identity & bio description paragraph.
  - "Advisory Openings: Q3/Q4 Available" badge.
  - "Core Platform" heading and all internal navigation links.
  - "Advisory Tracks" heading and track descriptions.
  - "Direct Telemetry & Inquiries" heading, email, phone, location.
  - Bottom bar: copyright notice, "Confidentiality Guaranteed", and live status.

- [ ] **Step 2: Verification**
Check TypeScript compilation on `SiteFooter.tsx`.

- [ ] **Step 3: Commit**
```bash
git add src/components/navigation/SiteFooter.tsx
git commit -m "feat(i18n): localize SiteFooter component"
```

---

### Task 4: Home Page & Component Sections Localization

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/CertificationsSection.tsx`
- Modify: `src/components/home/TechArsenalSection.tsx`
- Modify: `src/components/home/ExperienceTimelineSection.tsx`
- Modify: `src/components/home/ClientReviewsSection.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `@/context/LanguageContext`

- [ ] **Step 1: Localize Hero, Credibility Strip, Projects & Pricing previews in `src/app/page.tsx`**
- Translate Hero headline, subtitle, CTA buttons ("Explore Real Projects", "Let's Collaborate", "WhatsApp", "LinkedIn Profile").
- Translate the 6 telemetry metric cards (01 Custom ERP, 02 Automation, 03 AI Agents, 04 BI, 05 Web Dev, 06 Streaming).
- Translate Credibility Strip badges.
- Translate Featured Projects section title, subtitle, category tags, and "Case Study" link.
- Translate Pricing preview section title, subtitle, tab switchers ("Project-Based / Milestones", "Dedicated Advisory / Monthly Retainer"), package CTA buttons, and guarantee badges.
- Translate Direct Communications & Project Inquiry form (all inputs, placeholders, dropdown options, submit button, confirmation message).

- [ ] **Step 2: Localize `CertificationsSection.tsx`**
- Translate section header, filter buttons ("All", "Data Engineering", "Cloud", "Machine Learning"), verification modal labels ("Credential ID", "Issued By", "Verify Online", "Close").

- [ ] **Step 3: Localize `TechArsenalSection.tsx`**
- Translate section title, subtitle, category tabs, and proficiency labels.

- [ ] **Step 4: Localize `ExperienceTimelineSection.tsx`**
- Translate section title, subtitle, role summaries, and key achievements for each career milestone.

- [ ] **Step 5: Localize `ClientReviewsSection.tsx`**
- Translate section title, subtitle, rating overview, testimonial cards, and review author roles.

- [ ] **Step 6: Verification**
Check build or typecheck on home page and sections.

- [ ] **Step 7: Commit**
```bash
git add src/app/page.tsx src/components/home/CertificationsSection.tsx src/components/home/TechArsenalSection.tsx src/components/home/ExperienceTimelineSection.tsx src/components/home/ClientReviewsSection.tsx
git commit -m "feat(i18n): localize all home page sections and components"
```

---

### Task 5: Dedicated Pages & Seed Content Localization

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[id]/page.tsx`
- Modify: `src/app/projects/[id]/ProjectDetailClient.tsx`
- Modify: `src/components/projects/ProjectCard.tsx`
- Modify: `src/components/projects/ArchitectureModal.tsx`
- Modify: `src/app/pricing/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/data/seedArticles.ts`
- Modify: `src/app/book/page.tsx`
- Modify: `src/app/reviews/page.tsx`
- Modify: `src/app/my-bookings/page.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `@/context/LanguageContext`

- [ ] **Step 1: Localize `/projects` and `/projects/[id]`**
- Translate category filters, search input, case study cards, and Architecture Blueprint modal in `/projects`.
- In `/projects/[id]`/`ProjectDetailClient.tsx`: translate case study overview, architecture tabs, metrics, and ROI outcomes.

- [ ] **Step 2: Localize `/pricing`**
- Translate page title, subtitle, milestone/retainer switcher, package cards, feature checklists, and hourly consultation calculator.

- [ ] **Step 3: Localize `/blog` and `/blog/[slug]` with bilingual article content in `seedArticles.ts`**
- Add Arabic fields (`title_ar`, `excerpt_ar`, `content_ar`) to `ArticleItem` in `src/data/seedArticles.ts` with complete technical Arabic markdown for all 3 articles.
- Localize `/blog` (search bar, category chips, article cards).
- In `/blog/[slug]`: render localized title, excerpt, and full markdown body according to active language, keeping code blocks in LTR.

- [ ] **Step 4: Localize `/book`**
- Translate advisory booking intake wizard, package selector, date/time picker, form fields, and confirmation screen.

- [ ] **Step 5: Localize `/reviews`**
- Translate review summary metrics, rating filter pills, client testimonials, and review submission CTA.

- [ ] **Step 6: Localize `/my-bookings`**
- Translate reservation tracker input, status badges, dossier details, reschedule/cancel modals.

- [ ] **Step 7: Verification**
Run `npm run build` or typecheck across all modified pages.

- [ ] **Step 8: Commit**
```bash
git add src/app/projects/ src/components/projects/ src/app/pricing/ src/app/blog/ src/data/seedArticles.ts src/app/book/ src/app/reviews/ src/app/my-bookings/
git commit -m "feat(i18n): localize all dedicated pages and add bilingual blog content"
```

---

### Task 6: Typography, RTL Styling & Visual Polishing

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Connects: Arabic font family (`'Cairo', 'Tajawal', sans-serif`) applied when `html[dir="rtl"]`.

- [ ] **Step 1: Configure Arabic Font in `layout.tsx` & `globals.css`**
- Add `<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />` in `src/app/layout.tsx`.
- In `src/app/globals.css`, add font override rules:
```css
html[dir="rtl"] body {
  font-family: 'Cairo', system-ui, -apple-system, sans-serif;
}
html[dir="rtl"] .font-nexa,
html[dir="rtl"] .font-display-xl,
html[dir="rtl"] .font-headline-lg {
  font-family: 'Cairo', system-ui, sans-serif;
  letter-spacing: 0;
}
```

- [ ] **Step 2: RTL Directional Adjustments**
- Ensure directional icons (arrows, chevrons) rotate properly in RTL mode (`html[dir="rtl"] .rtl-flip { transform: scaleX(-1); }`).
- Verify horizontal scrolling lists, canvas overlays, and modals render smoothly without overflow.

- [ ] **Step 3: Commit**
```bash
git add src/app/globals.css src/app/layout.tsx tailwind.config.ts
git commit -m "style(i18n): configure Cairo Arabic font and RTL layout rules"
```

---

### Task 7: Automated Verification & Integration Tests

**Files:**
- Create: `tests/i18n-comprehensive.test.mjs`

- [ ] **Step 1: Write comprehensive translation verification test**
Create `tests/i18n-comprehensive.test.mjs` testing:
1. Complete key parity between `en` and `ar` in `src/i18n/translations.ts`.
2. Zero empty or untranslated string values in the Arabic dictionary.
3. Bilingual content presence for all articles in `src/data/seedArticles.ts`.
4. Language switching state logic and localStorage key `islam_language_v1`.
5. All 7 main page files import and consume `useLanguage`.

- [ ] **Step 2: Run test suite**
Run: `node tests/i18n-comprehensive.test.mjs`
Expected: PASS with 100% assertions green.

- [ ] **Step 3: Run project build**
Run: `npm run build`
Expected: Build succeeds with zero compilation or lint errors.

- [ ] **Step 4: Commit**
```bash
git add tests/i18n-comprehensive.test.mjs
git commit -m "test(i18n): add comprehensive translation and parity verification tests"
```
