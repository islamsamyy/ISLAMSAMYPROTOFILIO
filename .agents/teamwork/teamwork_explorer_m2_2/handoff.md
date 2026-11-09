# Handoff Report: Explorer M2 2 — Responsive Mobile Navigation Drawer (F6)

## 1. Observation

### 1.1 Existing Navigation Header Architecture
From inspecting `src/components/navigation/SiteHeader.tsx`:
- **Current Mobile Menu (Lines 10, 110-172)**:
  - Line 10: `const [mobileMenuOpen, setMobileMenuOpen] = useState(false);`
  - Lines 110-118:
    ```tsx
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="xl:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface"
      aria-label="Toggle Navigation"
    >
      <span className="material-symbols-outlined text-xl">
        {mobileMenuOpen ? 'close' : 'menu'}
      </span>
    </button>
    ```
  - Lines 123-172: Naive inline accordion dropdown using `AnimatePresence` + `<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="xl:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container-high px-gutter py-4 overflow-hidden">`.
  - **Deficiencies Observed**:
    1. It expands vertically inline below the fixed header, pushing content or covering it vertically rather than sliding in as an executive sheet from the right.
    2. Zero backdrop blur overlay across the page.
    3. Zero body scroll lock — the underlying page remains scrollable while the menu is open.
    4. Zero Escape key listener for keyboard dismiss.
    5. Zero dialog accessibility attributes: missing `role="dialog"`, `aria-modal="true"`, focus trap, and focus restoration to the hamburger trigger.
    6. Missing `ThemeToggle` component inside mobile view.
    7. Missing live Cairo telemetry clock inside mobile view.
    8. Zero touch swipe gesture support to dismiss.

- **Desktop Navigation Breakpoint (Lines 48-49, 110)**:
  - Line 49: Desktop nav has `className="hidden xl:flex items-center gap-1.5 ..."`
  - Line 112: Hamburger trigger has `className="xl:hidden flex items-center justify-center ..."`
  - The header uses the `xl` (1280px) breakpoint because of the large volume of brand metadata (monogram, full name, 6-year badge, solutions architect title), 6 navigation links with badges, Cairo status chip, and "Book Advisory" CTA button.

### 1.2 Non-existence of `MobileNavDrawer.tsx`
- Search for `MobileNavDrawer.tsx` across `src/components/navigation/` confirmed:
  - `src/components/navigation/SiteHeader.tsx` exists.
  - `src/components/navigation/AdminNav.tsx` exists.
  - `src/components/navigation/SiteFooter.tsx` exists.
  - `src/components/navigation/MobileNavDrawer.tsx` **does not exist yet** and must be created.

### 1.3 Available UI Primitives & Dependencies
- `package.json`:
  - `"@radix-ui/react-dialog": "^1.1.4"`
  - `"framer-motion": "^14.9.1"`
  - `"lucide-react": "^0.469.0"`
  - `"next": "^15.1.0"`
  - `"react": "^19.0.0"`
- `src/components/ui/dialog.tsx`:
  - Contains Radix UI `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`.
  - Current `DialogContent` (line 42) is hardcoded for center modals (`left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`).
- `src/components/theme/ThemeToggle.tsx`:
  - Exports `ThemeToggle({ className, showLabel = false, ...props }: ThemeToggleProps)`.
  - Reusable directly with `showLabel={true}` to render label ("Cybernetic Dark" or "High-Contrast Light") alongside the rotating Sun/Moon icon.
  - Hydration-safe (`mounted` check on line 23).
- `src/components/theme/ThemeProvider.tsx`:
  - Exports `useTheme()`, provides `resolvedTheme` (`'dark' | 'light'`), `toggleTheme()`, and `mounted`.

### 1.4 Cairo Clock Status Telemetry
- `SiteHeader.tsx` lines 83-89 currently display static hardcoded text:
  ```tsx
  <div className="hidden lg:flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-secondary/20 shadow-sm">
    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
    <span className="font-label-sm text-[11px] text-on-surface-variant">
      Cairo GMT+2 • <span className="text-secondary font-medium">Accepting Q3/Q4</span>
    </span>
  </div>
  ```
  It does not display the real live time (`HH:MM EET`).

---

## 2. Logic Chain

1. **Problem Identification**:
   - As observed in Section 1.1, the existing mobile navigation in `SiteHeader.tsx` is an inline accordion that expands downward, violates feature F6 requirements ("Slide-over sheet from right, backdrop blur, body scroll lock, Escape dismiss, actions & theme toggle"), and lacks dialog accessibility and gesture support.

2. **Component Separation**:
   - `SiteHeader.tsx` should delegate its mobile drawer rendering to a dedicated, modular `<MobileNavDrawer />` (`src/components/navigation/MobileNavDrawer.tsx`). This aligns directly with `PROJECT.md` line 66:
     > `SiteHeader.tsx`: exported default component; renders top navigation bar with active route tracking, live Cairo clock, and `MobileNavDrawer`.

3. **Slide-over Sheet & Backdrop Architecture**:
   - **Positioning**: Fixed right slide-over: `fixed inset-y-0 right-0 z-50 h-full w-[85vw] sm:w-[380px] max-w-[420px]`.
   - **Backdrop**: Fixed full viewport overlay `fixed inset-0 z-40 bg-background/80 backdrop-blur-md` with click-to-close dismiss.
   - **Animation**: Physics spring slide from offscreen right (`x: '100%'` -> `x: 0` on enter; `x: 0` -> `x: '100%'` on exit) with 60 FPS Framer Motion transition (`{ type: 'spring', damping: 30, stiffness: 300 }`).

4. **Accessibility (WCAG 2.1 AA/AAA) & Keyboard Navigation**:
   - **Dialog Attributes**: Must render with `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation Menu"`, and a hidden or visible `aria-labelledby` heading.
   - **Focus Trapping**: When drawer is open, keyboard focus must stay trapped inside the sheet (Close button, nav links, theme toggle, CTAs).
   - **Focus Restoration**: When drawer closes (via close button, backdrop click, Escape key, or link selection), focus must automatically return to the hamburger trigger button in `SiteHeader`.
   - **Escape Key Listener**: Pressing `Escape` must trigger `onClose()`.
   - **Radix UI Primitive Integration**: Using `@radix-ui/react-dialog` (`DialogPrimitive.Root`, `DialogPrimitive.Portal`, `DialogPrimitive.Overlay`, `DialogPrimitive.Content`) with Framer Motion `forceMount` delivers automatic focus trapping (`FocusScope`), automatic body scroll locking (`react-remove-scroll`), and standard WAI-ARIA compliance out of the box. Alternatively, custom hooks for Escape listener, scroll lock, and portal render achieve the same contract cleanly.

5. **Body Scroll Lock**:
   - When drawer is open, `document.body.style.overflow = 'hidden'` prevents background page rubber-banding and scroll chaining on touch devices.
   - Restored to `''` on dismiss or unmount.

6. **Touch Gesture Compatibility**:
   - Mobile users expect swipe-to-dismiss.
   - Implementing horizontal swipe detection:
     - On touch devices, dragging or swiping to the right (`deltaX > 75px` or velocity > 300px/s) calls `onClose()`.
     - In Framer Motion: `drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={{ right: 0.7, left: 0 }} onDragEnd={(_, info) => { if (info.offset.x > 75 || info.velocity.x > 300) onClose(); }}`.
     - Pair with `touch-action: pan-y` CSS to ensure vertical page/link scrolling remains silky smooth.

7. **Drawer Content & Navigation Links**:
   - **Brand Monogram**: `IS.` monogram with glowing gradient border, "Islam Samy", and title.
   - **Live Cairo Clock Telemetry**: Live `HH:MM EET` clock readout with pulsing cyan dot and "Accepting Q3/Q4 Advisory" status chip. Hydration-safe using `useEffect` mount initialization to prevent SSR mismatch.
   - **Navigation Items (Matching SiteHeader)**:
     - `/` — Home (icon: `Home`)
     - `/projects` — Projects (badge: `Company Logos`, icon: `FolderGit2` / `Layers`)
     - `/blog` — Blog (badge: `New`, icon: `BookOpen` / `FileText`)
     - `/book` — Book Advisory (highlight: true, icon: `Calendar`)
     - `/#reviews` — Client Reviews (icon: `MessageSquare` / `Star`)
     - `/my-bookings` — Client Portal (icon: `UserCheck` / `Ticket`)
     - `/admin` — Admin Command Center (icon: `Shield` / `Lock`)
   - **Active Route Highlighting**: Uses `usePathname()` to highlight the currently active route with `bg-primary-container/20 text-primary border border-primary/30 font-semibold shadow-sm`.
   - **Auto-Dismiss on Navigation**: Clicking any nav link calls `onClose()` so the user transitions to the new page with the drawer closed.
   - **Touch Target Size**: Nav link items must have a minimum touch target height of 48px (`h-12`) for mobile ergonomics.

8. **Quick Actions Cluster**:
   - **Theme Switcher**: Direct integration of `ThemeToggle` with dedicated status label row ("Interface Mode: Cybernetic Dark / High-Contrast Light").
   - **Book Advisory CTA**: High-visibility full-width button linking to `/book` with calendar icon.
   - **Admin Security Gateway**: Direct link to `/admin` command center.
   - **Verified Channels Footer**: Links to verified LinkedIn and GitHub profiles with credentials tag ("6 Yrs Exp • Distributed Systems & AI").

9. **SiteHeader Integration & Breakpoint Toggling**:
   - In `SiteHeader.tsx`:
     - Replace the existing lines 123-172 with `<MobileNavDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />`.
     - Update the hamburger button to use Lucide `Menu` (and `X`), with `aria-expanded={mobileMenuOpen}`, `aria-controls="mobile-nav-drawer"`, and `aria-label="Open navigation menu"`.
     - When screen size resizes to desktop width (`min-width: 1280px`), auto-close the drawer via a resize / media query listener to prevent orphaned drawer state.

---

## 3. Caveats

1. **Test Source Code Inspection Constraint**:
   - In strict compliance with the Integrity Rule, no test files (`tests/`, `*.test.tsx`) were read or accessed.
   - Architecture and component specifications are derived purely from `PROJECT.md`, `ORIGINAL_REQUEST.md`, and system contracts.

2. **Breakpoint Selection (`xl` vs `md`)**:
   - `SiteHeader.tsx` currently has `hidden xl:flex` for desktop navigation because of the extensive header payload (Monogram, name, experience chip, title, 6 nav links with badges, Cairo status pill, Book CTA, and Admin button).
   - The hamburger button is styled with `xl:hidden`. This means the mobile drawer operates on all screens `< 1280px` (including mobile 375px/414px and tablet 768px/1024px).
   - If tests specifically resize to 768px or 375px, the drawer will be fully accessible and active.
   - `MobileNavDrawer.tsx` itself can accept an optional `className` or use responsive classes (`xl:hidden`) to guarantee it is only rendered / interactive on mobile/tablet screens.

3. **SSR Hydration Safety for Cairo Clock**:
   - Server-side rendering cannot know the client's current time without mismatch.
   - The live Cairo clock must initialize with `--:-- EET` during SSR and hydrate to the real time in `useEffect`, updating via `setInterval` every 10 seconds.

---

## 4. Conclusion & Concrete Architectural Blueprint

### 4.1 Component Contract for `MobileNavDrawer.tsx`

Target file: `src/components/navigation/MobileNavDrawer.tsx`

```ts
export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks?: NavItem[];
}
```

### 4.2 Proposed Implementation Blueprint (`src/components/navigation/MobileNavDrawer.tsx`)

```tsx
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  Layers, 
  BookOpen, 
  Calendar, 
  Star, 
  UserCheck, 
  Shield, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

const DEFAULT_NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects & Case Studies', badge: 'Company Logos', icon: Layers },
  { href: '/blog', label: 'Engineering Blog', badge: 'New', icon: BookOpen },
  { href: '/book', label: 'Book Advisory / Package', highlight: true, icon: Calendar },
  { href: '/#reviews', label: 'Client Reviews', icon: Star },
  { href: '/my-bookings', label: 'Client Portal Dossier', icon: UserCheck },
  { href: '/admin', label: 'Admin Command Center', icon: Shield },
];

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks?: NavItem[];
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  navLinks = DEFAULT_NAV_LINKS,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cairoTime, setCairoTime] = useState<string>('--:--');
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Hydration safety mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Live Cairo Clock Formatter (Africa/Cairo EET)
  const updateCairoTime = useCallback(() => {
    try {
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
      setCairoTime(timeStr);
    } catch {
      setCairoTime('12:00');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    updateCairoTime();
    const interval = setInterval(updateCairoTime, 10000);
    return () => clearInterval(interval);
  }, [mounted, updateCairoTime]);

  // Body Scroll Lock
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-close on viewport resize to desktop (>= 1280px)
  useEffect(() => {
    if (!isOpen) return;
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [isOpen, onClose]);

  // Auto-close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Touch Swipe-to-Dismiss Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    // Swipe to the right (towards screen edge) closes the drawer
    if (deltaX > 70) {
      onClose();
    }
    touchStartXRef.current = null;
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Slide-over Sheet from Right */}
          <motion.aside
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 flex flex-col justify-between w-[85vw] sm:w-[380px] max-w-[420px] h-full bg-surface-container-low/95 dark:bg-surface-container-lowest/95 backdrop-blur-2xl border-l border-outline-variant/30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-surface-container-high/60">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container/30 to-secondary/20 border border-primary/40 shadow-sm">
                  <span className="font-display-xl text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    IS.
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    Islam Samy
                  </span>
                  <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider">
                    Solutions Architect &amp; AI
                  </span>
                </div>
              </Link>
              
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 px-5 py-4 flex flex-col gap-4">
              
              {/* Dynamic Cairo Telemetry Status Card */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/50 border border-secondary/20 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_8px_#7bd0ff]" />
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span className="font-mono text-xs font-semibold text-on-surface">
                        {cairoTime} EET • Cairo
                      </span>
                    </div>
                    <span className="text-[11px] text-secondary font-medium">
                      Accepting Q3/Q4 Advisory
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-mono border border-secondary/30 font-bold uppercase">
                  Live Sync
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
                {navLinks.map((item) => {
                  const isActive = item.href === '/'
                    ? pathname === '/'
                    : item.href.startsWith('/#')
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(item.href + '/');

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px]",
                        isActive
                          ? "bg-primary-container/20 text-primary border border-primary/30 font-semibold shadow-sm"
                          : "text-on-surface hover:text-primary hover:bg-surface-container-high/60 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-on-surface-variant")} />}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Actions Cluster */}
              <div className="pt-3 border-t border-surface-container-high/60 flex flex-col gap-3">
                
                {/* Theme Switcher Row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface">Appearance</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {resolvedTheme === 'dark' ? 'Cybernetic Dark' : 'High-Contrast Light'}
                    </span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Book Advisory Primary CTA */}
                <Link
                  href="/book"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-semibold text-sm shadow-[0_0_16px_rgba(160,120,255,0.3)] hover:bg-primary hover:text-on-primary transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Advisory / Consultation</span>
                </Link>

                {/* Admin Gateway Secondary Link */}
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-xs font-medium border border-outline-variant/20 transition-all min-h-[40px]"
                >
                  <Shield className="w-3.5 h-3.5 text-secondary" />
                  <span>Admin Security Gateway</span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-surface-container-high/60 bg-surface-container-low/40 flex flex-col gap-2.5 text-xs text-on-surface-variant">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-secondary">
                  6 Yrs Exp • Distributed Systems &amp; AI
                </span>
                <span className="text-[10px] text-outline">v1.0.0</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <a
                  href="https://www.linkedin.com/in/islam-samy-3b72061a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-on-surface transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-secondary" />
                </a>
                <span>&bull;</span>
                <a
                  href="https://github.com/islam-samy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-on-surface transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-primary" />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavDrawer;
```

### 4.3 Proposed Integration in `SiteHeader.tsx`

1. **Import `MobileNavDrawer` and `Menu`**:
   ```tsx
   import { MobileNavDrawer } from '@/components/navigation/MobileNavDrawer';
   import { Menu, X } from 'lucide-react';
   ```

2. **Trigger Button Enhancement (lines 110-118)**:
   ```tsx
   {/* Mobile Menu Trigger */}
   <button
     type="button"
     onClick={() => setMobileMenuOpen(true)}
     className="xl:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
     aria-label="Open navigation menu"
     aria-expanded={mobileMenuOpen}
     aria-controls="mobile-nav-drawer"
   >
     <Menu className="w-5 h-5" />
   </button>
   ```

3. **Mounting Drawer (replacing lines 122-172)**:
   ```tsx
   {/* Mobile Navigation Drawer */}
   <MobileNavDrawer
     isOpen={mobileMenuOpen}
     onClose={() => setMobileMenuOpen(false)}
   />
   ```

4. **Default and Named Export**:
   Ensure `export default SiteHeader;` is provided alongside `export function SiteHeader()`.

---

## 5. Verification Method

To verify the implementation independently once applied by the worker:

1. **TypeScript Typecheck**:
   ```bash
   npx tsc --noEmit
   ```
   Must pass with 0 errors across `SiteHeader.tsx` and `MobileNavDrawer.tsx`.

2. **Next.js Production Build**:
   ```bash
   npm run build
   ```
   Must compile all 15 static routes without any SSR hydration errors, syntax errors, or unresolved module imports.

3. **DOM & Accessibility Verification (Browser / Inspection)**:
   - Emulate mobile viewport (e.g. 375x812 iPhone / 768x1024 iPad).
   - Ensure the hamburger button (`Menu` icon) is visible at `< 1280px` (`xl:hidden`).
   - Click the hamburger button:
     - Backdrop blur overlay appears with smooth fade in.
     - Slide-over sheet animates from right edge (`x: '100%' -> 0`).
     - `document.body.style.overflow` is set to `'hidden'`.
     - Container has `role="dialog"` and `aria-modal="true"`.
   - Press `Escape` key:
     - Drawer slides back offscreen right and unmounts.
     - `document.body.style.overflow` returns to default.
   - Click backdrop overlay:
     - Drawer dismisses cleanly.
   - Swipe right on mobile screen:
     - Drawer dismisses when touch deltaX > 70px.
   - Click any navigation link (e.g. `/projects`):
     - Drawer closes and navigation succeeds to `/projects`.
   - Toggle theme using the quick action `ThemeToggle`:
     - Theme switches between cybernetic dark and high-contrast light with live label update.
   - Cairo clock displays accurate `HH:MM EET` with pulsing cyan status dot.

4. **Invalidation Conditions**:
   - If `MobileNavDrawer` is embedded inside `<header>` without viewport-fixed positioning or portal, causing clipping when header has transforms.
   - If Cairo time causes hydration mismatch (suppressed by using `mounted` state guard).
   - If body scroll lock fails to clean up upon unmount.
