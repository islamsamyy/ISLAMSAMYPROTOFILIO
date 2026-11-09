# Handoff Report — Explorer M2 1 (Cybernetic Header & Cairo Telemetry F4, F5)

## 1. Observation

Direct code observations from inspection of the codebase:

### 1.1 `SiteHeader.tsx` Current Navigation & Active State (Lines 8–78)
- **File**: `c:\Users\Eslam\Desktop\islamweb\src\components\navigation\SiteHeader.tsx`
- **Line 9**: `const pathname = usePathname();`
- **Lines 12–19**:
  ```tsx
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects', badge: 'Company Logos' },
    { href: '/blog', label: 'Blog', badge: 'New' },
    { href: '/book', label: 'Book', highlight: true },
    { href: '/#reviews', label: 'Reviews' },
    { href: '/my-bookings', label: 'Client Portal' },
  ];
  ```
- **Lines 51–76**:
  ```tsx
  {navLinks.map((item) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`relative px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-1.5 ${
          isActive
            ? 'text-primary font-semibold bg-surface-container-high/90 shadow-[0_0_12px_rgba(208,188,255,0.2)]'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 font-medium'
        }`}
      >
        <span>{item.label}</span>
        {item.badge && (
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold">
            {item.badge}
          </span>
        )}
        {isActive && (
          <motion.div
            layoutId="header-active-pill"
            className="absolute inset-0 rounded-full border border-primary/40 -z-10"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    );
  })}
  ```
- **Observation**:
  1. `pathname === item.href` fails for all subroutes (e.g. `/projects/safir-lakehouse` or `/blog/kafka-triage`). When on a subroute, no link is highlighted.
  2. For hash targets (`/#reviews`), `usePathname()` evaluates to `'/'`. Consequently, when navigating to `/#reviews`, `'/'` (Home) is marked active, and `/#reviews` is never marked active.
  3. `className` on `<Link>` places `bg-surface-container-high/90 shadow-[0_0_12px_rgba(208,188,255,0.2)]` directly on the `<Link>`, while `motion.div` only has `border border-primary/40 -z-10`. As a result, the capsule background and glow instantly snap across links rather than fluidly morphing and gliding with Framer Motion's `layoutId`.
  4. The `<Link>` does not establish an isolated stacking context (e.g., `isolate` or `z-0`). In certain render trees, `-z-10` on the child causes the border to fall behind the parent `<nav>` background (`bg-surface-container-low/70`).
  5. The `<Link>` lacks `aria-current={isActive ? 'page' : undefined}` for accessible semantic markup.

### 1.2 `SiteHeader.tsx` Cairo Telemetry & Status Indicator (Lines 83–89)
- **Lines 83–89**:
  ```tsx
  {/* Live Cal Sync Status */}
  <div className="hidden lg:flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-secondary/20 shadow-sm">
    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
    <span className="font-label-sm text-[11px] text-on-surface-variant">
      Cairo GMT+2 • <span className="text-secondary font-medium">Accepting Q3/Q4</span>
    </span>
  </div>
  ```
- **Observation**:
  1. The time display is completely static text (`Cairo GMT+2`). There is NO live clock.
  2. Requirement F5 in `PROJECT.md` mandates: `Dynamic Cairo Status Telemetry: Live Cairo clock (HH:MM EET) with pulsing cyan telemetry status dot`.
  3. The pulsing indicator is a simple `animate-pulse` dot without a radar/beacon ping ring.
  4. The telemetry is completely missing from the mobile drawer.

### 1.3 `SiteHeader.tsx` Theme Switcher Missing (Lines 80–120)
- **Observation**:
  `ThemeToggle` is not imported or rendered anywhere in `SiteHeader.tsx`. Both `PROJECT.md` ("quick actions (theme switch, Book CTA, Admin link)") and Acceptance Criteria R2/R4 require theme switching in the header.

### 1.4 Cairo Clock Formatting Verification
- **Command**:
  ```bash
  node -e "const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false }); console.log([new Date('2026-01-01T00:00:00Z'), new Date('2026-01-01T22:00:00Z'), new Date('2026-06-01T12:00:00Z')].map(d => f.format(d) + ' EET'))"
  ```
- **Result**: `[ '02:00 EET', '00:00 EET', '15:00 EET' ]`
- **Observation**: Using locale `'en-GB'` with `hour12: false` guarantees standard 24h `HH:MM` format (avoiding `24:00` or `12:00 PM` variations produced by `en-US`), and appending `' EET'` reliably yields `HH:MM EET`.

---

## 2. Logic Chain

1. **Subroute & Hash Active State (F4)**:
   - *From 1.1*: `usePathname()` returns the path without hash.
   - *Deduction*:
     - For root `'/'`: `isActive` should be `true` only when `pathname === '/'` AND hash is empty (`!currentHash || currentHash === '#'`).
     - For hash links (e.g. `/#reviews`): `isActive` should be `true` when `pathname === '/'` AND `currentHash === '#reviews'`.
     - For standard routes (e.g. `/projects`, `/blog`): `isActive` should be `true` if `pathname === item.href` OR `pathname.startsWith(item.href + '/')`.
   - *Hydration Safety*: `window.location.hash` cannot be accessed during SSR. An initial state `const [currentHash, setCurrentHash] = useState('')` initialized in `useEffect` (with `hashchange` event listener) ensures SSR safety.

2. **Framer Motion Gliding Capsule (F4)**:
   - *From 1.1*: Because the background and shadow were placed on `<Link>`, the visual tab capsule did not travel with `motion.div layoutId="header-active-pill"`.
   - *Deduction*: Moving `bg-surface-container-high/90 border border-primary/40 shadow-[0_0_12px_rgb(var(--primary)/0.25)]` into `<motion.div layoutId="header-active-pill" className="absolute inset-0 rounded-full ... -z-10" />` allows Framer Motion to calculate the bounding rect and spring-morph the entire capsule from tab to tab. Adding `isolate` to `<Link>` prevents `-z-10` from clipping beneath `<nav>`.

3. **Cairo Clock Telemetry & SSR Hydration Safety (F5)**:
   - *From 1.2 & 1.4*: Dynamic live clocks frequently trigger Next.js hydration mismatches because server-rendered time (at build or request time) differs from client hydration time.
   - *Deduction*:
     - Guard with `mounted` state (`const [mounted, setMounted] = useState(false)`).
     - Render deterministic placeholder `--:-- EET` during SSR and initial client render.
     - In `useEffect`, activate `mounted = true`, format current Cairo time, and start a 1,000ms `setInterval` with cleanup in the `useEffect` return function to prevent memory leaks.
     - Add `suppressHydrationWarning` to the dynamic text element.

4. **Pulsing Cyan Indicator (F5)**:
   - *From 1.2*: A cybernetic radar telemetry dot should consist of a dual-layer pin:
     - Inner dot: `w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]`
     - Outer beacon ring: `animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75`
   - This maintains high visibility in both Dark Cybernetic and Light High-Contrast modes.

---

## 3. Caveats

1. **Hash Change Events**: `window.addEventListener('hashchange', ...)` fires when URL hash changes, but in Next.js internal client transitions, setting `currentHash` on click of hash links in `<Link onClick={...}>` provides immediate, instantaneous pill animation without waiting for scroll or browser event propagation.
2. **IntersectionObserver for Scrollspy**: If automatic activation of `/#reviews` when scrolling the homepage is desired, a lightweight `IntersectionObserver` on `#reviews` can update `currentHash`. However, manual click tracking and `hashchange` already satisfy route-based active tracking.
3. **AdminNav Integration**: `AdminNav.tsx` has its own navigation pills and requires `ThemeToggle` (Milestone 2, F7).
4. **MobileNavDrawer**: `SiteHeader.tsx` currently has an inline accordion drawer. F6 will introduce a dedicated slide-over `MobileNavDrawer.tsx`. The proposed implementation exports `CairoTelemetry` and keeps the interface clean for F6 integration.

---

## 4. Conclusion & Proposed Implementation

### 4.1 Proposed Modular Component: `src/components/navigation/CairoTelemetry.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function formatCairoTime(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${formatter.format(date)} EET`;
  } catch {
    const utcHours = date.getUTCHours();
    const utcMins = date.getUTCMinutes();
    const cairoHours = (utcHours + 2) % 24;
    return `${String(cairoHours).padStart(2, '0')}:${String(utcMins).padStart(2, '0')} EET`;
  }
}

export interface CairoTelemetryProps {
  className?: string;
  showStatus?: boolean;
  showPulse?: boolean;
}

export function CairoTelemetry({
  className,
  showStatus = true,
  showPulse = true,
}: CairoTelemetryProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [cairoTime, setCairoTime] = useState<string>('--:-- EET');

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setCairoTime(formatCairoTime(new Date()));
    };
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-secondary/20 shadow-sm font-mono text-[11px] text-on-surface-variant select-none transition-colors",
        className
      )}
      title="Live Cairo Telemetry (Africa/Cairo EET UTC+2)"
    >
      {showPulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </span>
      )}

      <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1.5">
        <span className="text-on-surface font-semibold">Cairo</span>
        <span
          suppressHydrationWarning
          className="text-secondary font-medium tracking-tight font-mono"
        >
          {mounted ? cairoTime : '--:-- EET'}
        </span>
        {showStatus && (
          <>
            <span className="text-outline-variant/60" aria-hidden="true">•</span>
            <span className="text-secondary font-medium">Accepting Q3/Q4</span>
          </>
        )}
      </span>
    </div>
  );
}

export default CairoTelemetry;
```

### 4.2 Proposed Refactored `src/components/navigation/SiteHeader.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { CairoTelemetry } from './CairoTelemetry';
import { cn } from '@/lib/utils';

interface NavLinkItem {
  href: string;
  label: string;
  badge?: string;
  highlight?: boolean;
}

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects', badge: 'Company Logos' },
  { href: '/blog', label: 'Blog', badge: 'New' },
  { href: '/book', label: 'Book', highlight: true },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/my-bookings', label: 'Client Portal' },
];

function checkIsActive(href: string, pathname: string, currentHash: string): boolean {
  if (href.includes('#')) {
    const [pathPart, hashPart] = href.split('#');
    const targetPath = pathPart || '/';
    return pathname === targetPath && currentHash === `#${hashPart}`;
  }

  if (href === '/') {
    return pathname === '/' && (!currentHash || currentHash === '#');
  }

  if (pathname === href) {
    return true;
  }

  if (pathname.startsWith(`${href}/`)) {
    return true;
  }

  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-surface-container-high/40 transition-colors">
      <div className="h-20 max-w-[1280px] mx-auto px-gutter flex items-center justify-between gap-space-md">
        
        {/* Brand & Monogram */}
        <Link
          href="/"
          onClick={() => setCurrentHash('')}
          className="flex items-center gap-space-sm group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container/30 to-secondary/20 border border-primary/40 shadow-[0_0_16px_rgba(160,120,255,0.25)] group-hover:shadow-[0_0_24px_rgba(123,208,255,0.4)] transition-all">
            <span className="font-display-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              IS.
            </span>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors tracking-tight font-semibold">
                Islam Samy
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-label-md font-semibold tracking-wider uppercase border border-secondary/30">
                6 Yrs Exp
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-medium">
              Solutions Architect &amp; Distributed Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Framer Motion Active Pill */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-1.5 p-1 rounded-full bg-surface-container-low/70 border border-outline-variant/20 shadow-inner"
        >
          {navLinks.map((item) => {
            const isActive = checkIsActive(item.href, pathname, currentHash);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  if (item.href.includes('#')) {
                    setCurrentHash(item.href.slice(item.href.indexOf('#')));
                  } else {
                    setCurrentHash('');
                  }
                }}
                className={cn(
                  "relative isolate px-4 py-2 rounded-full font-label-md text-label-md transition-colors duration-200 flex items-center gap-1.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 font-medium"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors",
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-surface-container-high text-on-surface-variant border border-outline-variant/30"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 rounded-full bg-surface-container-high/90 border border-primary/40 shadow-[0_0_12px_rgb(var(--primary)/0.25)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-space-sm shrink-0">
          
          {/* Live Cairo Telemetry Clock */}
          <CairoTelemetry className="hidden lg:inline-flex" />

          {/* Book Consultation CTA Button */}
          <Link
            href="/book"
            onClick={() => setCurrentHash('')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(160,120,255,0.4)] transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Book Advisory</span>
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Admin Command Center Link */}
          <Link
            href="/admin"
            title="Admin Command Center"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-secondary hover:border-secondary/40 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container-high px-gutter py-4 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="pb-2 mb-1 border-b border-surface-container-high flex items-center justify-between">
                <CairoTelemetry showStatus={false} />
                <ThemeToggle showLabel={true} />
              </div>

              {navLinks.map((item) => {
                const isActive = checkIsActive(item.href, pathname, currentHash);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      if (item.href.includes('#')) {
                        setCurrentHash(item.href.slice(item.href.indexOf('#')));
                      } else {
                        setCurrentHash('');
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-container/20 text-primary font-semibold border-l-2 border-primary"
                        : "text-on-surface hover:bg-surface-container-high"
                    )}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-surface-container-high mt-1 flex flex-col gap-2">
                <Link
                  href="/book"
                  onClick={() => {
                    setCurrentHash('');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-semibold text-sm shadow-md"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>Book Consultation / Package</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Admin Security Gateway</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SiteHeader;
```

---

## 5. Verification Method

To independently verify the implementation:

1. **Static Typecheck**:
   ```bash
   npx tsc --noEmit
   ```
   Must pass with 0 errors across the entire codebase.

2. **Next.js Production Build**:
   ```bash
   npm run build
   ```
   Must compile cleanly and generate all 15 static routes without SSR hydration warnings or errors.

3. **Cairo Clock Verification in Node**:
   ```bash
   node -e "const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false }); console.log(f.format(new Date()) + ' EET');"
   ```
   Confirms format strictly matches `HH:MM EET`.

4. **Interactive Browser Verification**:
   - Navigate to `/` -> Home pill active.
   - Navigate to `/projects` -> Projects pill active via smooth spring animation.
   - Navigate to `/blog` -> Blog pill active.
   - Navigate to `/#reviews` -> Reviews pill active, Home pill inactive.
   - Observe live Cairo clock updating minute by minute with pulsing cyan beacon.
   - Click `ThemeToggle` in the header -> Instant transition between dark cybernetic and light high-contrast modes without FOUC or layout shifts.
