# Survey Report: Navigation & Header Architecture (R2) and Theme System & Styling (R4)

**Surveyor**: Explorer 2  
**Target Project**: Islam Samy Portfolio Showcase (`islamweb`)  
**Mission**: Comprehensive survey of the existing codebase focusing on:
1. Navigation and Header architecture (layout shell, active route detection, mobile drawer, quick actions, status indicators).
2. Theme system & styling (Tailwind CSS, global CSS, design tokens, color palette, CSS variables, theme provider, cybernetic dark vs light mode, hydration safety, FOUC prevention).
3. Enumeration of required features, interfaces, components, and constraints for R2 and R4.

---

## 1. Observation

### 1.1 Project Runtime & Dependency Baseline
From `package.json` (lines 12–37):
- **Framework**: Next.js `^15.1.0` (App Router)
- **React**: `^19.0.0` and `react-dom: ^19.0.0`
- **Styling**: `tailwindcss: ^3.4.17`, `postcss: ^8.4.49`, `autoprefixer: ^10.4.20`, `tailwind-merge: ^2.5.5`, `clsx: ^2.1.1`, `class-variance-authority: ^0.7.1`
- **UI Primitives**: Radix UI packages installed (`@radix-ui/react-avatar`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`)
- **Animation**: `framer-motion: ^14.9.1`
- **Icons**: `lucide-react: ^0.469.0` and Google Fonts `Material Symbols Outlined`
- **Theme Provider**: `next-themes` is **NOT** installed in `package.json` or in `node_modules`.
- **Build Status**: `npm run build` and `npx tsc --noEmit` execute successfully with exit code 0.

### 1.2 Layout Shell Architecture
From `src/app/layout.tsx` (lines 21–45):
```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
```
**Direct Observations**:
1. `className="dark"` is statically hardcoded on `<html>`. There is no `suppressHydrationWarning` on `<html>` or `<body>`.
2. There is no inline `<script>` in `<head>` to detect system preference or read `localStorage` before paint.
3. Neither `SiteHeader` nor `SiteFooter` exists in `RootLayout`.
4. There are no sub-layouts (`src/app/admin/layout.tsx` does not exist).
5. All 5 public route pages (`/`, `/projects`, `/blog`, `/book`, `/my-bookings`) individually import and render `<SiteHeader />` and `<SiteFooter />`.
6. All 6 admin route pages (`/admin`, `/admin/projects`, `/admin/pricing`, `/admin/blog`, `/admin/reviews`, `/admin/reservations`) individually import and render `<AdminNav />`.
7. The `/admin/login` page renders without any navigation header.

### 1.3 Navigation & Header Implementation (`src/components/navigation/SiteHeader.tsx`)
From `SiteHeader.tsx`:
1. **Active Route Detection** (lines 9, 50–77):
   ```tsx
   const pathname = usePathname();
   // ...
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
   - `isActive` is strictly computed via `pathname === item.href`.
   - The links list in `SiteHeader.tsx` (lines 12–19):
     - `{ href: '/', label: 'Home' }`
     - `{ href: '/projects', label: 'Projects', badge: 'Company Logos' }`
     - `{ href: '/blog', label: 'Blog', badge: 'New' }`
     - `{ href: '/book', label: 'Book', highlight: true }`
     - `{ href: '/#reviews', label: 'Reviews' }`
     - `{ href: '/my-bookings', label: 'Client Portal' }`
   - For `/#reviews`: `usePathname()` returns `/`. Strict equality `pathname === '/#reviews'` evaluates to `false` always, so the Reviews link is never marked active.
   - For subroutes: Any nested paths (e.g. `/blog/sub-post` or `/projects?cat=...`) evaluate to `false` for exact equality.

2. **Status Indicator** (lines 83–89):
   ```tsx
   {/* Live Cal Sync Status */}
   <div className="hidden lg:flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-secondary/20 shadow-sm">
     <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
     <span className="font-label-sm text-[11px] text-on-surface-variant">
       Cairo GMT+2 • <span className="text-secondary font-medium">Accepting Q3/Q4</span>
     </span>
   </div>
   ```
   - Hidden below `lg` breakpoint (`hidden lg:flex`). Not visible on tablet or mobile.
   - Content is static hardcoded text. It does not display a live clock or dynamic time for Cairo EET (UTC+2).

3. **Quick Action Cluster** (lines 81–119):
   - Status chip (`Cairo GMT+2`)
   - CTA button: `<Link href="/book">` with calendar icon, text "Book Advisory"
   - Admin icon button: `<Link href="/admin">` with `admin_panel_settings` icon
   - Hamburger button: `<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden ...">`
   - **No Theme Switcher exists anywhere in the header**.

4. **Mobile Navigation Drawer** (lines 122–172):
   ```tsx
   <AnimatePresence>
     {mobileMenuOpen && (
       <motion.div
         initial={{ opacity: 0, height: 0 }}
         animate={{ opacity: 1, height: 'auto' }}
         exit={{ opacity: 0, height: 0 }}
         className="xl:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container-high px-gutter py-4 overflow-hidden"
       >
         <div className="flex flex-col gap-2">
           {navLinks.map((item) => ( ... ))}
           <div className="pt-2 border-t border-surface-container-high mt-1 flex flex-col gap-2">
             <Link href="/book" ...>Book Consultation / Package</Link>
             <Link href="/admin" ...>Admin Security Gateway</Link>
           </div>
         </div>
       </motion.div>
     )}
   </AnimatePresence>
   ```
   - Implemented as an accordion drop-down beneath the 80px header, not a slide-over drawer or sheet.
   - Missing: Backdrop overlay, body scroll lock, Escape key dismiss, close button inside the drawer, brand header inside the drawer, status indicator, and theme switcher.
   - Breakpoint discrepancy: Desktop navigation uses `hidden xl:flex` (1280px+), so tablets (768px–1279px) are forced into the mobile accordion dropdown.

5. **Admin Navigation (`src/components/navigation/AdminNav.tsx`)**:
   - Renders top bar with links: `/admin`, `/admin/projects`, `/admin/pricing`, `/admin/blog`, `/admin/reviews`, `/admin/reservations`.
   - Quick actions: Live Public Site (`/`), Logout (`/admin/login`).
   - Hidden on `< md` with no mobile drawer fallback.
   - No theme toggle button.

### 1.4 Theme System & Styling
1. **Tailwind Configuration (`tailwind.config.ts`)**:
   - `darkMode: ["class"]` (line 4)
   - Colors object (lines 12–60) contains 48 hardcoded hex strings:
     ```ts
     "on-surface": "#e2e2ea",
     "secondary": "#7bd0ff",
     "surface-container-highest": "#33353b",
     "surface": "#111319",
     "primary-container": "#a078ff",
     "background": "#111319",
     "surface-container": "#1d2025",
     "primary": "#d0bcff",
     "surface-container-high": "#282a30",
     "surface-container-low": "#191c21",
     "outline-variant": "#494454",
     "outline": "#958ea0",
     // ...
     ```
   - Because these are static hex strings in `theme.extend.colors`, removing the `.dark` class from `<html>` does **not** change any element's background or text color.

2. **Global Styles (`src/app/globals.css`)**:
   - Lines 9–12:
     ```css
     :root {
       --background: 228 19% 8%;
       --foreground: 240 13% 90%;
     }
     ```
     Only two CSS variables exist in `:root`, and neither is connected to the Tailwind color keys.
   - Lines 14–26:
     ```css
     html {
       color-scheme: dark;
       scroll-behavior: smooth;
     }

     body {
       background-color: #111319;
       color: #e2e2ea;
       font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
       overscroll-behavior-y: none;
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;
     }
     ```
     Hardcoded `#111319` on body and scrollbar track.
   - Line 70–75:
     ```css
     .glass-panel {
       background: rgba(29, 32, 37, 0.7);
       backdrop-filter: blur(12px);
       -webkit-backdrop-filter: blur(12px);
       border: 1px solid rgba(73, 68, 84, 0.4);
     }
     ```
     Hardcoded dark glass styling.

3. **Canvases with Hardcoded Backgrounds in `src/app/page.tsx`**:
   - Line 427: `ctx.fillStyle = '#111319';` inside `renderSafir` canvas render loop. In light mode, this will paint a solid dark rectangle over the light card.

---

## 2. Logic Chain

### 2.1 Why Current Navigation (R2) Does Not Satisfy Acceptance Criteria
1. *Observation*: The acceptance criteria for Navigation & Theme states:  
   `"Header includes active route tracking indicator, mobile drawer navigation, quick action buttons, and status indicator."`
2. *Premise A (Active Route Tracking)*: Current tracking in `SiteHeader.tsx` line 51 uses `pathname === item.href`.
   - When a user navigates to `/projects` with filter queries, or nested subpaths like `/blog/some-slug`, exact match fails.
   - For `/#reviews`, `usePathname()` returns `/`. The expression `pathname === '/#reviews'` is permanently `false`.
   - The active pill animation (`layoutId="header-active-pill"`) unmounts and remounts between routes because `SiteHeader` is instantiated inside each `page.tsx` instead of a persistent shell.
3. *Premise B (Mobile Navigation Drawer)*: `SiteHeader.tsx` lines 122–172 render a collapsible vertical accordion `overflow-hidden` directly below the navbar. It lacks:
   - True drawer behavior (slide-over sheet from the right or full viewport overlay).
   - Dismissal via backdrop click or Escape key.
   - Body scroll locking (`overflow: hidden` on `document.body` while open).
   - Embedded status indicator and theme toggle.
4. *Premise C (Status Indicator)*: `SiteHeader.tsx` lines 84–89 is wrapped in `hidden lg:flex`. It is completely invisible on mobile/tablet viewports and displays static text without live clock telemetry.
5. *Premise D (Quick Actions)*: The header quick action cluster has only the CTA and admin link; it lacks the theme switcher required by R4.
6. *Conclusion for R2*: To fulfill R2, `SiteHeader.tsx` must be refactored to support robust path/hash detection, a slide-over mobile drawer sheet with complete actions, a live dynamic Cairo clock status indicator accessible across both desktop and mobile, and a theme switcher quick action.

### 2.2 Why Current Theme System (R4) Does Not Satisfy Acceptance Criteria
1. *Observation*: The acceptance criteria states:  
   `"Theme switcher toggles between dark cybernetic mode and high-contrast light mode without hydration errors or unstyled flash."`
2. *Premise A (No Switcher or Provider)*: No theme context, hook, or toggle button exists anywhere in the codebase.
3. *Premise B (Static Colors)*: `tailwind.config.ts` hardcodes all colors to hex strings. Even if `dark` class is toggled on `<html>`, Tailwind classes like `bg-background` and `text-on-surface` evaluate to `#111319` and `#e2e2ea`.
4. *Premise C (Hydration Errors & FOUC)*:
   - If a client-side theme switcher changes `<html>` class after mount, SSR HTML with `className="dark"` mismatching client `localStorage` causes React 19 hydration error: `"Warning: Extra attributes from the server: class"`.
   - If theme detection waits for `useEffect`, the user experiences a Flash of Unstyled Content (FOUC).
5. *Premise D (Opacity Preservation)*: Across all pages, Tailwind opacity modifiers are heavily used: `bg-primary/20`, `border-secondary/30`, `bg-surface-container-high/60`, `bg-surface-container-low/80`, `border-outline-variant/30`.
   - If CSS variables are defined as full hex strings (e.g. `--background: #111319`), Tailwind cannot apply opacity modifiers like `bg-background/80`.
   - Defining CSS variables as **space-separated RGB tuples** (e.g. `--background: 17 19 25;`) allows Tailwind's `rgb(var(--background) / <alpha-value>)` format, preserving 100% of existing opacity utility classes in both light and dark modes.
6. *Conclusion for R4*: To fulfill R4, we must establish:
   - A dual design token system using space-separated RGB CSS variables in `:root` (light) and `.dark` (dark).
   - Remapped `tailwind.config.ts` colors referencing `rgb(var(--<color>) / <alpha-value>)`.
   - A lightweight `ThemeProvider` and `ThemeToggle` component with zero extra dependencies.
   - An inline `<script>` in `<head>` plus `suppressHydrationWarning` on `<html>` to guarantee zero FOUC and zero hydration errors.

---

## 3. Caveats

1. **Test Source Code Integrity**: Per the critical integrity constraint, no test source code (`*.test.*`, `*.spec.*`, `__tests__`) was inspected. All findings are derived strictly from application source code, configuration files, and official documentation.
2. **Page-Level Header Mounts**: While moving `SiteHeader` into `RootLayout` would be standard in a greenfield project, the current application has 6 admin pages with `AdminNav` and 1 login page without headers. If `SiteHeader` were placed in `RootLayout`, it would appear on admin and login pages unless path-conditional routing or route groups `(public)` / `(admin)` are introduced. Given the existing architecture, enhancing `SiteHeader` while keeping it imported in the 5 public pages (or introducing a clean client layout wrapper) preserves complete compatibility with zero route regressions.
3. **Canvas 2D Color Handling in Light Mode**: Canvases like `renderSafir` in `page.tsx` draw directly to the 2D context using `ctx.fillStyle = '#111319'`. In light mode, these hardcoded fills must be adapted (e.g. using `ctx.clearRect` or checking `document.documentElement.classList.contains('dark')`) so they don't produce dark blocks on light surfaces.

---

## 4. Conclusion & Required Specifications

### 4.1 Specification for R2: Modern Cybernetic Header & Navigation

#### A. Component Architecture
1. **`SiteHeader.tsx` (`src/components/navigation/SiteHeader.tsx`)**:
   - Refactored into a high-performance, cybernetic navigation bar.
   - Height: `h-20` (80px), sticky/fixed top position with `backdrop-blur-md` and glass border.
   - **Active Route Tracking**:
     ```ts
     function isRouteActive(currentPath: string, linkHref: string, currentHash: string): boolean {
       if (linkHref.startsWith('/#')) {
         const targetHash = linkHref.replace('/', '');
         return currentPath === '/' && currentHash === targetHash;
       }
       if (linkHref === '/') {
         return currentPath === '/' && (!currentHash || currentHash === '#');
       }
       return currentPath === linkHref || currentPath.startsWith(`${linkHref}/`);
     }
     ```
   - **Active Indicator**:
     - Visual pill with cybernetic glow: `bg-primary/15 border border-primary/40 text-primary shadow-[0_0_12px_rgba(208,188,255,0.25)]` in dark mode; `bg-primary-container/40 border border-primary/30 text-primary shadow-[0_2px_8px_rgba(102,38,226,0.15)]` in light mode.
     - Framer Motion `motion.div` with spring transition (`stiffness: 380, damping: 30`).
   - **Status Telemetry Indicator**:
     - Live Cairo Clock using `Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false })` updated every 30 seconds.
     - Display: Pulsing neon cyan dot (`animate-pulse shadow-[0_0_8px_#7bd0ff]`) + `Cairo [HH:MM] EET • Accepting Q3/Q4`.
     - High-contrast styling in light mode (`border-outline-variant text-on-surface`).
   - **Quick Actions Cluster**:
     - Status Indicator chip.
     - `ThemeToggle` button (Sun/Moon with smooth rotational transition).
     - "Book Advisory" primary CTA button with calendar icon (`/book`).
     - "Admin Console" icon button (`/admin`).
     - Hamburger toggle button (`md:hidden` or `xl:hidden` adjusted).

2. **Mobile Navigation Drawer (`MobileNavDrawer.tsx` or integrated in `SiteHeader.tsx`)**:
   - Slide-over sheet from right with `fixed inset-y-0 right-0 w-full sm:w-[380px] max-w-[90vw] z-50`.
   - Fixed backdrop: `fixed inset-0 bg-background/80 backdrop-blur-md z-40` with click-to-close.
   - Body scroll locking via `document.body.style.overflow = 'hidden'` while open.
   - Keyboard listener: `Escape` key closes the drawer.
   - Contents:
     - Header: Monogram `IS.`, "Islam Samy", subtitle, and close button (`X`).
     - Status Telemetry Block: Live Cairo clock and availability chip.
     - Navigation Links: Large 44px+ touch targets with icons, route badges (`Company Logos`, `New`), and active route styling.
     - Quick Action Section:
       - Dedicated Theme Switcher card: Displays current theme state ("Theme: Cybernetic Dark" / "Theme: High-Contrast Light") with instant toggle.
       - "Book Advisory / Consultation" CTA button.
       - "Admin Gateway" security button.
     - Drawer Footer: Direct channels (LinkedIn, GitHub) and credentials ("6 Yrs Exp • Distributed Systems & AI").

3. **`AdminNav.tsx` (`src/components/navigation/AdminNav.tsx`)**:
   - Add `ThemeToggle` to admin right actions cluster.
   - Add mobile hamburger dropdown so admin routes are manageable on tablet/mobile.

---

### 4.2 Specification for R4: Complete Light and Dark Mode Support

#### A. Design Tokens Specification

##### Token Palette Table

| Token Name | Dark Mode (Cybernetic) Hex | Dark Mode RGB Tuple | Light Mode (High-Contrast) Hex | Light Mode RGB Tuple | Usage / Semantic Role |
|---|---|---|---|---|---|
| `background` | `#111319` | `17 19 25` | `#f8f9fd` | `248 249 253` | Page root background |
| `surface` | `#111319` | `17 19 25` | `#ffffff` | `255 255 255` | Base component surface |
| `surface-dim` | `#111319` | `17 19 25` | `#dee1e9` | `222 225 233` | Inset background |
| `surface-bright` | `#37393f` | `55 57 63` | `#ffffff` | `255 255 255` | Highlight surface |
| `surface-container-lowest` | `#0c0e13` | `12 14 19` | `#ffffff` | `255 255 255` | Deepest card / header surface |
| `surface-container-low` | `#191c21` | `25 28 33` | `#f3f4f9` | `243 244 249` | Subtle card background |
| `surface-container` | `#1d2025` | `29 32 37` | `#edeef4` | `237 238 244` | Standard card / module container |
| `surface-container-high` | `#282a30` | `40 42 48` | `#e7e9ef` | `231 233 239` | Elevated card / button / chip |
| `surface-container-highest` | `#33353b` | `51 53 59` | `#dfe2e8` | `223 226 232` | Highest elevation container |
| `surface-variant` | `#33353b` | `51 53 59` | `#e4e6ee` | `228 230 238` | Alternative container |
| `on-surface` | `#e2e2ea` | `226 226 234` | `#171a1f` | `23 26 31` | Primary text (WCAG AAA) |
| `on-surface-variant` | `#cbc3d7` | `203 195 215` | `#44464f` | `68 70 79` | Secondary / muted text |
| `inverse-surface` | `#e2e2ea` | `226 226 234` | `#2e3036` | `46 48 54` | Inverse container surface |
| `inverse-on-surface` | `#2e3036` | `46 48 54` | `#f1f0f7` | `241 240 247` | Inverse container text |
| `primary` | `#d0bcff` | `208 188 255` | `#6626e2` | `102 38 226` | Electric neon violet / Royal violet |
| `primary-container` | `#a078ff` | `160 120 255` | `#e9ddff` | `233 221 255` | Primary action container |
| `primary-fixed` | `#e9ddff` | `233 221 255` | `#e9ddff` | `233 221 255` | Accent fixed light violet |
| `primary-fixed-dim` | `#d0bcff` | `208 188 255` | `#d0bcff` | `208 188 255` | Accent fixed dim violet |
| `on-primary` | `#3c0091` | `60 0 145` | `#ffffff` | `255 255 255` | Text on primary |
| `on-primary-container` | `#340080` | `52 0 128` | `#23005c` | `35 0 92` | Text on primary container |
| `on-primary-fixed` | `#23005c` | `35 0 92` | `#23005c` | `35 0 92` | Text on fixed primary |
| `on-primary-fixed-variant` | `#5516be` | `85 22 190` | `#5516be` | `85 22 190` | Text on fixed variant |
| `inverse-primary` | `#6d3bd7` | `109 59 215` | `#d0bcff` | `208 188 255` | Inverse primary accent |
| `secondary` | `#7bd0ff` | `123 208 255` | `#00658b` | `0 101 139` | Cybernetic cyan / Ocean cyan |
| `secondary-container` | `#00a6e0` | `0 166 224` | `#c4e7ff` | `196 231 255` | Cyan accent container |
| `secondary-fixed` | `#c4e7ff` | `196 231 255` | `#c4e7ff` | `196 231 255` | Fixed secondary light |
| `secondary-fixed-dim` | `#7bd0ff` | `123 208 255` | `#7bd0ff` | `123 208 255` | Fixed secondary dim |
| `on-secondary` | `#00354a` | `0 53 74` | `#ffffff` | `255 255 255` | Text on secondary |
| `on-secondary-container` | `#00374d` | `0 55 77` | `#001e2c` | `0 30 44` | Text on secondary container |
| `on-secondary-fixed` | `#001e2c` | `0 30 44` | `#001e2c` | `0 30 44` | Text on fixed secondary |
| `on-secondary-fixed-variant` | `#004c69` | `0 76 105` | `#004c69` | `0 76 105` | Text on fixed variant |
| `tertiary` | `#ffb690` | `255 182 144` | `#944200` | `148 66 0` | Neon amber / Warm bronze |
| `tertiary-container` | `#ec6a06` | `236 106 6` | `#ffdbca` | `255 219 202` | Amber accent container |
| `tertiary-fixed` | `#ffdbca` | `255 219 202` | `#ffdbca` | `255 219 202` | Fixed tertiary light |
| `tertiary-fixed-dim` | `#ffb690` | `255 182 144` | `#ffb690` | `255 182 144` | Fixed tertiary dim |
| `on-tertiary` | `#552100` | `85 33 0` | `#ffffff` | `255 255 255` | Text on tertiary |
| `on-tertiary-container` | `#4a1c00` | `74 28 0` | `#341100` | `52 17 0` | Text on tertiary container |
| `on-tertiary-fixed` | `#341100` | `52 17 0` | `#341100` | `52 17 0` | Text on fixed tertiary |
| `on-tertiary-fixed-variant` | `#783200` | `120 50 0` | `#783200` | `120 50 0` | Text on fixed variant |
| `outline` | `#958ea0` | `149 142 160` | `#74777f` | `116 119 127` | Crisp component border |
| `outline-variant` | `#494454` | `73 68 84` | `#c4c6cf` | `196 198 207` | Subtle divider border |
| `error` | `#ffb4ab` | `255 180 171` | `#ba1a1a` | `186 26 26` | Error state text |
| `error-container` | `#93000a` | `147 0 10` | `#ffdad6` | `255 218 214` | Error alert container |
| `on-error` | `#690005` | `105 0 5` | `#ffffff` | `255 255 255` | Text on error |
| `on-error-container` | `#ffdad6` | `255 218 214` | `#410002` | `65 0 2` | Text on error container |
| `surface-tint` | `#d0bcff` | `208 188 255` | `#6626e2` | `102 38 226` | Elevation overlay tint |

#### B. Tailwind Configuration Remapping (`tailwind.config.ts`)
Each key in `theme.extend.colors` must be remapped to:
```ts
colors: {
  "background": "rgb(var(--background) / <alpha-value>)",
  "surface": "rgb(var(--surface) / <alpha-value>)",
  "surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
  "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
  "surface-container-lowest": "rgb(var(--surface-container-lowest) / <alpha-value>)",
  "surface-container-low": "rgb(var(--surface-container-low) / <alpha-value>)",
  "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
  "surface-container-high": "rgb(var(--surface-container-high) / <alpha-value>)",
  "surface-container-highest": "rgb(var(--surface-container-highest) / <alpha-value>)",
  "surface-variant": "rgb(var(--surface-variant) / <alpha-value>)",
  "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
  "on-surface-variant": "rgb(var(--on-surface-variant) / <alpha-value>)",
  "inverse-surface": "rgb(var(--inverse-surface) / <alpha-value>)",
  "inverse-on-surface": "rgb(var(--inverse-on-surface) / <alpha-value>)",
  "primary": "rgb(var(--primary) / <alpha-value>)",
  "primary-container": "rgb(var(--primary-container) / <alpha-value>)",
  "primary-fixed": "rgb(var(--primary-fixed) / <alpha-value>)",
  "primary-fixed-dim": "rgb(var(--primary-fixed-dim) / <alpha-value>)",
  "on-primary": "rgb(var(--on-primary) / <alpha-value>)",
  "on-primary-container": "rgb(var(--on-primary-container) / <alpha-value>)",
  "on-primary-fixed": "rgb(var(--on-primary-fixed) / <alpha-value>)",
  "on-primary-fixed-variant": "rgb(var(--on-primary-fixed-variant) / <alpha-value>)",
  "inverse-primary": "rgb(var(--inverse-primary) / <alpha-value>)",
  "secondary": "rgb(var(--secondary) / <alpha-value>)",
  "secondary-container": "rgb(var(--secondary-container) / <alpha-value>)",
  "secondary-fixed": "rgb(var(--secondary-fixed) / <alpha-value>)",
  "secondary-fixed-dim": "rgb(var(--secondary-fixed-dim) / <alpha-value>)",
  "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
  "on-secondary-container": "rgb(var(--on-secondary-container) / <alpha-value>)",
  "on-secondary-fixed": "rgb(var(--on-secondary-fixed) / <alpha-value>)",
  "on-secondary-fixed-variant": "rgb(var(--on-secondary-fixed-variant) / <alpha-value>)",
  "tertiary": "rgb(var(--tertiary) / <alpha-value>)",
  "tertiary-container": "rgb(var(--tertiary-container) / <alpha-value>)",
  "tertiary-fixed": "rgb(var(--tertiary-fixed) / <alpha-value>)",
  "tertiary-fixed-dim": "rgb(var(--tertiary-fixed-dim) / <alpha-value>)",
  "on-tertiary": "rgb(var(--on-tertiary) / <alpha-value>)",
  "on-tertiary-container": "rgb(var(--on-tertiary-container) / <alpha-value>)",
  "on-tertiary-fixed": "rgb(var(--on-tertiary-fixed) / <alpha-value>)",
  "on-tertiary-fixed-variant": "rgb(var(--on-tertiary-fixed-variant) / <alpha-value>)",
  "outline": "rgb(var(--outline) / <alpha-value>)",
  "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
  "error": "rgb(var(--error) / <alpha-value>)",
  "error-container": "rgb(var(--error-container) / <alpha-value>)",
  "on-error": "rgb(var(--on-error) / <alpha-value>)",
  "on-error-container": "rgb(var(--on-error-container) / <alpha-value>)",
  "surface-tint": "rgb(var(--surface-tint) / <alpha-value>)",
}
```

#### C. Hydration Safety & FOUC Prevention Implementation
1. **Root HTML Shell (`src/app/layout.tsx`)**:
   ```tsx
   <html lang="en" suppressHydrationWarning className="dark">
     <head>
       {/* Anti-FOUC Blocking Theme Initializer */}
       <script
         id="theme-initializer"
         dangerouslySetInnerHTML={{
           __html: `(function(){try{var t=localStorage.getItem('islam_theme_v1')||localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
         }}
       />
       {/* Google Fonts */}
     </head>
     <body className="bg-background text-on-surface min-h-screen antialiased transition-colors duration-300 selection:bg-primary-container selection:text-on-primary-container">
       <ThemeProvider defaultTheme="dark">
         {children}
       </ThemeProvider>
     </body>
   </html>
   ```
2. **`ThemeProvider.tsx` (`src/components/theme/ThemeProvider.tsx`)**:
   - Zero-dependency custom context provider:
     ```ts
     export type Theme = 'dark' | 'light' | 'system';
     export interface ThemeContextType {
       theme: Theme;
       resolvedTheme: 'dark' | 'light';
       setTheme: (theme: Theme) => void;
       toggleTheme: () => void;
       mounted: boolean;
     }
     ```
   - Persists state in `localStorage` under `islam_theme_v1`.
   - Listens to `window.matchMedia('(prefers-color-scheme: dark)')` when `theme === 'system'`.
   - Dispatches a custom event `islam_theme_change` to synchronize multi-window state or 3D canvases.
3. **`ThemeToggle.tsx` (`src/components/theme/ThemeToggle.tsx`)**:
   - Displays Lucide `Sun` or `Moon` with Framer Motion rotation & scale transition.
   - Guarded by `mounted` state to prevent server/client icon hydration mismatch:
     ```tsx
     if (!mounted) {
       return <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/30" />;
     }
     ```
   - Accessible: `aria-label="Switch to light mode"` (when in dark) / `"Switch to cybernetic dark mode"` (when in light).

---

## 5. Verification Method

To independently verify these findings and confirm proper implementation once coded:

1. **Verify No Type or Build Regressions**:
   ```powershell
   npx tsc --noEmit
   npm run build
   ```
   *Expected outcome*: Exit code 0, 15/15 static pages successfully generated.

2. **Verify Theme Switching & Token Reflection**:
   - Inspect `document.documentElement.classList`:
     - In dark mode: `classList` contains `"dark"`, computed `body` background is `rgb(17, 19, 25)` (`#111319`), primary text is `rgb(226, 226, 234)`.
     - In light mode: `classList` does not contain `"dark"`, computed `body` background is `rgb(248, 249, 253)` (`#f8f9fd`), primary text is `rgb(23, 26, 31)`.
   - Inspect opacity classes:
     - Check `.bg-primary/20` computes to `rgba(208, 188, 255, 0.2)` in dark mode and `rgba(102, 38, 226, 0.2)` in light mode.

3. **Verify Zero FOUC & Zero Hydration Warnings**:
   - In browser console, set `localStorage.setItem('islam_theme_v1', 'light')` and reload page.
   - Verify page renders in light mode from frame 1 with zero flash of dark screen.
   - Check browser console: 0 hydration warnings, 0 `Extra attributes from the server` errors.

4. **Verify Navigation & Header Behavior (R2)**:
   - Navigate to `/`, `/projects`, `/blog`, `/book`, `/my-bookings`:
     - Active route tracking indicator reflects the current route on desktop and mobile.
     - Subroute matching works (e.g. `/projects?category=Lakehouse`).
     - `#reviews` link smoothly scrolls and marks section active.
   - Open Mobile Drawer on viewport `< 1024px`:
     - Slide-over sheet opens with spring animation and backdrop blur.
     - Body scrolling is locked while drawer is open.
     - Live Cairo clock and availability status indicator is clearly displayed.
     - Theme switch button toggles theme seamlessly inside drawer.
     - Clicking backdrop, Escape key, or close button dismisses drawer smoothly.
   - Check status indicator on desktop:
     - Real-time Cairo time is displayed and pulsing cyan dot animates.

5. **Invalidation Conditions**:
   - If `tailwind.config.ts` colors are defined without `<alpha-value>`, Tailwind opacity classes will fail.
   - If `suppressHydrationWarning` is omitted on `<html>`, Next.js 15 SSR will warn on client theme modification.
   - If test files or specs are accessed, the critical integrity constraint is violated.
