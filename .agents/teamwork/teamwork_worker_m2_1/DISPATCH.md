# Dispatch: Worker M2 — Modern Cybernetic Header & Navigation Drawer

## Mission
Implement Milestone 2 features (F4, F5, F6, F7) elevating the navigation shell across public and admin routes.

## Required Reading (MANDATORY)
1. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md` (MANDATORY: read before touching any code)
2. `c:\Users\Eslam\Desktop\islamweb\PROJECT.md`
3. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m2_1\handoff.md` (Header & Cairo Telemetry F4, F5)
4. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m2_2\handoff.md` (MobileNavDrawer F6)
5. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m2_3\handoff.md` (AdminNav F7)

## File Ownership
You have exclusive write access to:
- `src/components/navigation/CairoTelemetry.tsx` (create)
- `src/components/navigation/MobileNavDrawer.tsx` (create)
- `src/components/navigation/SiteHeader.tsx` (update)
- `src/components/navigation/AdminNav.tsx` (update)

Do NOT modify any other files.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

The team must NOT: read test source code to understand expected behaviour before implementing.

## Implementation Tasks

### 1. `src/components/navigation/CairoTelemetry.tsx` (F5)
- Create modular Cairo telemetry component.
- Display `HH:MM EET` in standard 24h format via `Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', ... })`.
- Dual-layer pulsing cyan beacon (`animate-ping` outer ring + solid core with shadow).
- SSR hydration safety: initialize with `mounted = false` and placeholder `--:-- EET`, update via `useEffect` timer, add `suppressHydrationWarning`.
- Interval cleanup on unmount.
- Dual export: default and named.

### 2. `src/components/navigation/MobileNavDrawer.tsx` (F6)
- Create responsive slide-over sheet from right (`fixed inset-y-0 right-0 w-[85vw] sm:w-[380px] max-w-[420px]`).
- Full backdrop blur overlay (`bg-background/80 backdrop-blur-md`).
- Physics spring entrance/exit via Framer Motion (`AnimatePresence`).
- Body scroll lock (`document.body.style.overflow = 'hidden'`) with unmount cleanup.
- Escape key listener to dismiss.
- Touch swipe-to-dismiss (`deltaX > 70px`).
- WAI-ARIA dialog attributes: `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile Navigation Menu"`.
- Complete navigation links with active state highlighting (`usePathname()`).
- Quick actions cluster: `ThemeToggle` (with mode label), "Book Advisory" CTA button, "Admin Security Gateway" button.
- Embedded live Cairo clock readout (`<CairoTelemetry />`).
- Dual export: default and named.

### 3. `src/components/navigation/SiteHeader.tsx` (F4, F5, F6)
- Update desktop navigation with Framer Motion gliding pill (`layoutId="header-active-pill"`) with `relative isolate` and `bg-surface-container-high/90 border border-primary/40 shadow-[0_0_12px_rgb(var(--primary)/0.25)]`.
- Active route tracking for root, subroutes (`/projects/*`, `/blog/*`), and hash targets (`/#reviews`).
- Add `aria-current="page"` to active links.
- Integrate `<CairoTelemetry className="hidden lg:inline-flex" />`.
- Integrate `<ThemeToggle />` in the desktop action cluster.
- Replace old inline accordion with `<MobileNavDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />`.
- Hamburger button with `aria-expanded={mobileMenuOpen}` and `aria-label="Open navigation menu"`.
- Dual export: default and named.

### 4. `src/components/navigation/AdminNav.tsx` (F7)
- 6 admin navigation sections (`/admin`, `/admin/projects`, `/admin/pricing`, `/admin/blog`, `/admin/reviews`, `/admin/reservations`).
- Active route highlighting with subroute prefix matching (`startsWith(item.href + '/')`) and Framer Motion `layoutId="admin-nav-active-pill"`.
- Add `aria-current="page"` to active links.
- Integrate `<ThemeToggle />` in the right action cluster.
- Add responsive mobile hamburger button (`lg:hidden`) and mobile slide-over drawer with backdrop blur, scroll locking, and Escape dismiss.
- Dual export: default and named (`export default AdminNav; export { AdminNav };`).

## Verification & Completion Criteria
Execute the following verification commands:
1. `npx tsc --noEmit` — must exit 0 with 0 diagnostic errors.
2. `npm test` — must pass 100% (all 264+ tests).
3. `npm run build` — must compile production build and prerender all 15 static routes without errors or warnings.
4. Document all findings and command outputs in `handoff.md` in `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m2_1\handoff.md` and message the orchestrator.


## 2026-11-05T22:17:57Z
You are Worker M2 (Modern Cybernetic Header & Navigation Drawer).
Your working directory is: c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m2_1\

Read:
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md (MANDATORY FIRST STEP)
- c:\Users\Eslam\Desktop\islamweb\PROJECT.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m2_1\DISPATCH.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m2_1\handoff.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m2_2\handoff.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m2_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
The team must NOT: read test source code to understand expected behaviour before implementing.

File Ownership:
- src/components/navigation/CairoTelemetry.tsx (create)
- src/components/navigation/MobileNavDrawer.tsx (create)
- src/components/navigation/SiteHeader.tsx (update)
- src/components/navigation/AdminNav.tsx (update)

Implement:
1. CairoTelemetry.tsx: Live Cairo clock (HH:MM EET), pulsing cyan beacon, SSR hydration safe.
2. MobileNavDrawer.tsx: Slide-over sheet from right, backdrop blur, scroll locking, Escape dismiss, touch swipe, full navigation links, ThemeToggle, live Cairo clock.
3. SiteHeader.tsx: Active route pill tracking with Framer Motion, CairoTelemetry, ThemeToggle, MobileNavDrawer integration.
4. AdminNav.tsx: 6 admin sections, active route highlighting, ThemeToggle, responsive mobile drawer.

Verify:
- npx tsc --noEmit (0 errors)
- npm test (100% pass)
- npm run build (15/15 static routes prerendered)

Write handoff.md in your working directory and message the orchestrator when complete.
