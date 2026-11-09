# Handoff Report: Milestone 1 Theme Tokens & Architecture Blueprint

**Agent**: Explorer M1_1  
**Milestone**: Milestone 1 (Foundational Theme Tokens & UI Primitives System)  
**Deliverable**: Comprehensive Implementation Blueprint for Theme Tokens, Tailwind Remapping, ThemeProvider, ThemeToggle, and Anti-FOUC Architecture  
**Working Directory**: `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_1`  

---

## 1. Observation

### 1.1 Current Styling & Token State
1. **`src/app/globals.css` (lines 8–26, 50–75)**:
   - Lines 8–12:
     ```css
     @layer base {
       :root {
         --background: 228 19% 8%;
         --foreground: 240 13% 90%;
       }
     ```
     Only two variables exist in `:root`, defined in HSL format without alpha-channel separation. There is no `.dark` rule in `globals.css`.
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
     `color-scheme: dark`, `background-color: #111319`, and `color: #e2e2ea` are statically hardcoded.
   - Lines 56–75:
     ```css
     ::-webkit-scrollbar-track {
       background: #111319;
     }
     ::-webkit-scrollbar-thumb {
       background: #282a30;
       border-radius: 9999px;
     }
     .glass-panel {
       background: rgba(29, 32, 37, 0.7);
       backdrop-filter: blur(12px);
       -webkit-backdrop-filter: blur(12px);
       border: 1px solid rgba(73, 68, 84, 0.4);
     }
     ```
     All scrollbars and glassmorphism utilities contain hardcoded dark hex/rgba values.

2. **`tailwind.config.ts` (lines 11–60)**:
   - Contains 47 color definitions mapped directly to static hex strings:
     ```ts
     colors: {
       "on-surface": "#e2e2ea",
       "secondary": "#7bd0ff",
       "surface-container-highest": "#33353b",
       "on-secondary-fixed-variant": "#004c69",
       "surface": "#111319",
       "primary-container": "#a078ff",
       // ...
       "error": "#ffb4ab",
       "on-error": "#690005",
     }
     ```
   - Because these are static hex strings in `theme.extend.colors`, toggling the `.dark` class on `<html>` produces zero visual changes on any Tailwind utility classes (e.g. `bg-background`, `text-on-surface`, `bg-surface-container`).
   - Throughout `src/components/ui/button.tsx` (e.g. `border-outline-variant/40`, `bg-surface-container-high/50`) and `src/components/ui/badge.tsx` (e.g. `bg-primary/10`, `border-secondary/30`), Tailwind opacity modifier syntax is heavily used. Using hex strings in CSS variables (`--primary: #d0bcff`) breaks opacity modifiers.

3. **`src/app/layout.tsx` (lines 26–44)**:
   ```tsx
   export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en" className="dark">
         <head>
           {/* Google font links */}
         </head>
         <body className="bg-background text-on-surface min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container">
           {children}
         </body>
       </html>
     );
   }
   ```
   - Hardcoded `className="dark"` on `<html>`.
   - Missing `suppressHydrationWarning` on `<html>`.
   - Missing inline blocking `<script>` in `<head>` to detect user preference before first paint.
   - Missing `ThemeProvider` wrapping `children`.

4. **`src/components/theme/`**:
   - Directory does not currently exist.
   - `next-themes` is not installed in `package.json`.
   - `lucide-react` (`^0.469.0`) and `framer-motion` (`^14.9.1`) are installed and available.

---

## 2. Logic Chain

1. *From Observation 1.1.2 & 1.1.4*: Without a theme provider and reactive token remapping in `tailwind.config.ts`, light mode cannot function.
2. *From Observation 1.1.2*: Components depend on Tailwind opacity utilities (e.g. `bg-primary/20`, `border-outline-variant/40`).
   - Tailwind 3 generates opacity using `rgb(var(--token) / <alpha-value>)`.
   - For this syntax to work, the CSS custom property must store space-separated RGB channel numbers (e.g. `--primary: 208 188 255;` in dark, `102 38 226;` in light), NOT a hex code or `rgb(...)` wrapper.
3. *From Observation 1.1.3 & Requirements*:
   - If theme state is initialized purely inside a React `useEffect`, client HTML initially renders with SSR's `className="dark"`. If the user's stored preference is `light`, the page will flash dark before switching to light (Flash of Unstyled Content / FOUC).
   - If an inline blocking script in `<head>` evaluates `localStorage` and modifies `document.documentElement.className` prior to React hydration, React 19 throws hydration warnings (`"Warning: Extra attributes from the server: class"`) unless `suppressHydrationWarning` is present on `<html>`.
   - Therefore, an inline synchronous `<script>` in `<head>` combined with `suppressHydrationWarning` on `<html>` is both necessary and sufficient to prevent both FOUC and hydration warnings.
4. *From Observation 1.1.4 & PROJECT.md Contracts*:
   - `PROJECT.md` defines `ThemeContextType` with `theme: 'dark' | 'light' | 'system'`, `resolvedTheme: 'dark' | 'light'`, `setTheme`, `toggleTheme`, and `mounted: boolean`.
   - A zero-dependency custom `ThemeProvider` using standard React 19 context avoids external package bloat, maintains 100% control over `localStorage` keying (`islam_theme_v1`), handles system preference media queries, and synchronizes custom events (`islam_theme_change`).
5. *From Observation 1.1.1*:
   - `globals.css` must define all 48 semantic design tokens in space-separated RGB format under `:root` (light) and `.dark` (cybernetic).
   - `html` and `body` rules in `globals.css` must reference `rgb(var(--background))` and `rgb(var(--on-surface))` rather than hardcoded `#111319` and `#e2e2ea`.
   - Utility classes such as `.glass-panel` and scrollbar selectors must use `rgb(var(--surface-container) / 0.7)` and `rgb(var(--surface-container-high))` to adapt across themes.

---

## 3. Caveats

1. **Test Source Code Integrity**: Per the critical integrity constraint, no test source code (`*.test.*`, `*.spec.*`, `__tests__`) was read or inspected. All designs are derived strictly from application code, `PROJECT.md`, `ORIGINAL_REQUEST.md`, and Explorer Survey 2.
2. **Canvas 2D Color Invalidation**: Several 2D canvas routines in `src/app/page.tsx` (e.g. `renderSafir`) currently hardcode background fills such as `ctx.fillStyle = '#111319'`. While Milestone 3 handles Canvas primitives, providing the `islam_theme_change` window event in `ThemeProvider` enables canvases to listen and adapt their backgrounds immediately.
3. **Route Layouts**: `SiteHeader` is currently imported directly in the 5 public routes rather than in `RootLayout` (because `/admin/*` uses `AdminNav` and `/admin/login` uses no navigation). Implementing `ThemeProvider` in `RootLayout` ensures theme state is shared globally across both public routes and admin routes without touching route-specific headers prematurely.

---

## 4. Conclusion & Complete Implementation Blueprint

### 4.1 Token Dictionary Specification (48 Tokens)

All tokens must be defined with space-separated RGB channel numbers (`R G B`) in `src/app/globals.css`.

| # | Token Key | Dark Mode (Cybernetic) Hex | Dark Mode RGB Value | Light Mode (High-Contrast) Hex | Light Mode RGB Value | Semantic Role |
|---|---|---|---|---|---|---|
| 1 | `--background` | `#111319` | `17 19 25` | `#f8f9fd` | `248 249 253` | Page root background |
| 2 | `--on-background` | `#e2e2ea` | `226 226 234` | `#171a1f` | `23 26 31` | Primary text on background |
| 3 | `--surface` | `#111319` | `17 19 25` | `#ffffff` | `255 255 255` | Base component surface |
| 4 | `--surface-dim` | `#111319` | `17 19 25` | `#dee1e9` | `222 225 233` | Inset background surface |
| 5 | `--surface-bright` | `#37393f` | `55 57 63` | `#ffffff` | `255 255 255` | Highlight surface |
| 6 | `--surface-container-lowest` | `#0c0e13` | `12 14 19` | `#ffffff` | `255 255 255` | Deepest card / header surface |
| 7 | `--surface-container-low` | `#191c21` | `25 28 33` | `#f3f4f9` | `243 244 249` | Subtle card background |
| 8 | `--surface-container` | `#1d2025` | `29 32 37` | `#edeef4` | `237 238 244` | Standard card container |
| 9 | `--surface-container-high` | `#282a30` | `40 42 48` | `#e7e9ef` | `231 233 239` | Elevated card / button / chip |
| 10 | `--surface-container-highest` | `#33353b` | `51 53 59` | `#dfe2e8` | `223 226 232` | Highest elevation container |
| 11 | `--surface-variant` | `#33353b` | `51 53 59` | `#e4e6ee` | `228 230 238` | Alternative container |
| 12 | `--surface-tint` | `#d0bcff` | `208 188 255` | `#6626e2` | `102 38 226` | Elevation overlay tint |
| 13 | `--on-surface` | `#e2e2ea` | `226 226 234` | `#171a1f` | `23 26 31` | Primary text (WCAG AAA) |
| 14 | `--on-surface-variant` | `#cbc3d7` | `203 195 215` | `#44464f` | `68 70 79` | Secondary / muted text |
| 15 | `--inverse-surface` | `#e2e2ea` | `226 226 234` | `#2e3036` | `46 48 54` | Inverse container surface |
| 16 | `--inverse-on-surface` | `#2e3036` | `46 48 54` | `#f1f0f7` | `241 240 247` | Inverse container text |
| 17 | `--outline` | `#958ea0` | `149 142 160` | `#74777f` | `116 119 127` | Crisp component border |
| 18 | `--outline-variant` | `#494454` | `73 68 84` | `#c4c6cf` | `196 198 207` | Subtle divider border |
| 19 | `--primary` | `#d0bcff` | `208 188 255` | `#6626e2` | `102 38 226` | Electric neon violet / Royal violet |
| 20 | `--primary-container` | `#a078ff` | `160 120 255` | `#e9ddff` | `233 221 255` | Primary action container |
| 21 | `--primary-fixed` | `#e9ddff` | `233 221 255` | `#e9ddff` | `233 221 255` | Accent fixed light violet |
| 22 | `--primary-fixed-dim` | `#d0bcff` | `208 188 255` | `#d0bcff` | `208 188 255` | Accent fixed dim violet |
| 23 | `--on-primary` | `#3c0091` | `60 0 145` | `#ffffff` | `255 255 255` | Text on primary |
| 24 | `--on-primary-container` | `#340080` | `52 0 128` | `#23005c` | `35 0 92` | Text on primary container |
| 25 | `--on-primary-fixed` | `#23005c` | `35 0 92` | `#23005c` | `35 0 92` | Text on fixed primary |
| 26 | `--on-primary-fixed-variant` | `#5516be` | `85 22 190` | `#5516be` | `85 22 190` | Text on fixed variant |
| 27 | `--inverse-primary` | `#6d3bd7` | `109 59 215` | `#d0bcff` | `208 188 255` | Inverse primary accent |
| 28 | `--secondary` | `#7bd0ff` | `123 208 255` | `#00658b` | `0 101 139` | Cybernetic cyan / Ocean cyan |
| 29 | `--secondary-container` | `#00a6e0` | `0 166 224` | `#c4e7ff` | `196 231 255` | Cyan accent container |
| 30 | `--secondary-fixed` | `#c4e7ff` | `196 231 255` | `#c4e7ff` | `196 231 255` | Fixed secondary light |
| 31 | `--secondary-fixed-dim` | `#7bd0ff` | `123 208 255` | `#7bd0ff` | `123 208 255` | Fixed secondary dim |
| 32 | `--on-secondary` | `#00354a` | `0 53 74` | `#ffffff` | `255 255 255` | Text on secondary |
| 33 | `--on-secondary-container` | `#00374d` | `0 55 77` | `#001e2c` | `0 30 44` | Text on secondary container |
| 34 | `--on-secondary-fixed` | `#001e2c` | `0 30 44` | `#001e2c` | `0 30 44` | Text on fixed secondary |
| 35 | `--on-secondary-fixed-variant` | `#004c69` | `0 76 105` | `#004c69` | `0 76 105` | Text on fixed variant |
| 36 | `--tertiary` | `#ffb690` | `255 182 144` | `#944200` | `148 66 0` | Neon amber / Warm bronze |
| 37 | `--tertiary-container` | `#ec6a06` | `236 106 6` | `#ffdbca` | `255 219 202` | Amber accent container |
| 38 | `--tertiary-fixed` | `#ffdbca` | `255 219 202` | `#ffdbca` | `255 219 202` | Fixed tertiary light |
| 39 | `--tertiary-fixed-dim` | `#ffb690` | `255 182 144` | `#ffb690` | `255 182 144` | Fixed tertiary dim |
| 40 | `--on-tertiary` | `#552100` | `85 33 0` | `#ffffff` | `255 255 255` | Text on tertiary |
| 41 | `--on-tertiary-container` | `#4a1c00` | `74 28 0` | `#341100` | `52 17 0` | Text on tertiary container |
| 42 | `--on-tertiary-fixed` | `#341100` | `52 17 0` | `#341100` | `52 17 0` | Text on fixed tertiary |
| 43 | `--on-tertiary-fixed-variant` | `#783200` | `120 50 0` | `#783200` | `120 50 0` | Text on fixed variant |
| 44 | `--outline` | `#958ea0` | `149 142 160` | `#74777f` | `116 119 127` | Border outline |
| 45 | `--error` | `#ffb4ab` | `255 180 171` | `#ba1a1a` | `186 26 26` | Error state text |
| 46 | `--error-container` | `#93000a` | `147 0 10` | `#ffdad6` | `255 218 214` | Error alert container |
| 47 | `--on-error` | `#690005` | `105 0 5` | `#ffffff` | `255 255 255` | Text on error |
| 48 | `--on-error-container` | `#ffdad6` | `255 218 214` | `#410002` | `65 0 2` | Text on error container |

---

### 4.2 Blueprint File 1: `src/app/globals.css`

Replace the content of `src/app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light;

    /* Light Mode Tokens (Crisp High-Contrast) */
    --background: 248 249 253;
    --on-background: 23 26 31;
    --surface: 255 255 255;
    --surface-dim: 222 225 233;
    --surface-bright: 255 255 255;
    --surface-container-lowest: 255 255 255;
    --surface-container-low: 243 244 249;
    --surface-container: 237 238 244;
    --surface-container-high: 231 233 239;
    --surface-container-highest: 223 226 232;
    --surface-variant: 228 230 238;
    --surface-tint: 102 38 226;
    --on-surface: 23 26 31;
    --on-surface-variant: 68 70 79;
    --inverse-surface: 46 48 54;
    --inverse-on-surface: 241 240 247;
    --outline: 116 119 127;
    --outline-variant: 196 198 207;
    --primary: 102 38 226;
    --primary-container: 233 221 255;
    --primary-fixed: 233 221 255;
    --primary-fixed-dim: 208 188 255;
    --on-primary: 255 255 255;
    --on-primary-container: 35 0 92;
    --on-primary-fixed: 35 0 92;
    --on-primary-fixed-variant: 85 22 190;
    --inverse-primary: 208 188 255;
    --secondary: 0 101 139;
    --secondary-container: 196 231 255;
    --secondary-fixed: 196 231 255;
    --secondary-fixed-dim: 123 208 255;
    --on-secondary: 255 255 255;
    --on-secondary-container: 0 30 44;
    --on-secondary-fixed: 0 30 44;
    --on-secondary-fixed-variant: 0 76 105;
    --tertiary: 148 66 0;
    --tertiary-container: 255 219 202;
    --tertiary-fixed: 255 219 202;
    --tertiary-fixed-dim: 255 182 144;
    --on-tertiary: 255 255 255;
    --on-tertiary-container: 52 17 0;
    --on-tertiary-fixed: 52 17 0;
    --on-tertiary-fixed-variant: 120 50 0;
    --error: 186 26 26;
    --error-container: 255 218 214;
    --on-error: 255 255 255;
    --on-error-container: 65 0 2;

    /* Radix / shadcn UI compatibility aliases */
    --border: var(--outline-variant);
    --input: var(--outline-variant);
    --ring: var(--primary);
    --foreground: var(--on-surface);
    --card: var(--surface-container);
    --card-foreground: var(--on-surface);
    --popover: var(--surface-container-high);
    --popover-foreground: var(--on-surface);
    --muted: var(--surface-container-high);
    --muted-foreground: var(--on-surface-variant);
  }

  .dark {
    color-scheme: dark;

    /* Dark Mode Tokens (Futuristic Cybernetic) */
    --background: 17 19 25;
    --on-background: 226 226 234;
    --surface: 17 19 25;
    --surface-dim: 17 19 25;
    --surface-bright: 55 57 63;
    --surface-container-lowest: 12 14 19;
    --surface-container-low: 25 28 33;
    --surface-container: 29 32 37;
    --surface-container-high: 40 42 48;
    --surface-container-highest: 51 53 59;
    --surface-variant: 51 53 59;
    --surface-tint: 208 188 255;
    --on-surface: 226 226 234;
    --on-surface-variant: 203 195 215;
    --inverse-surface: 226 226 234;
    --inverse-on-surface: 46 48 54;
    --outline: 149 142 160;
    --outline-variant: 73 68 84;
    --primary: 208 188 255;
    --primary-container: 160 120 255;
    --primary-fixed: 233 221 255;
    --primary-fixed-dim: 208 188 255;
    --on-primary: 60 0 145;
    --on-primary-container: 52 0 128;
    --on-primary-fixed: 35 0 92;
    --on-primary-fixed-variant: 85 22 190;
    --inverse-primary: 109 59 215;
    --secondary: 123 208 255;
    --secondary-container: 0 166 224;
    --secondary-fixed: 196 231 255;
    --secondary-fixed-dim: 123 208 255;
    --on-secondary: 0 53 74;
    --on-secondary-container: 0 55 77;
    --on-secondary-fixed: 0 30 44;
    --on-secondary-fixed-variant: 0 76 105;
    --tertiary: 255 182 144;
    --tertiary-container: 236 106 6;
    --tertiary-fixed: 255 219 202;
    --tertiary-fixed-dim: 255 182 144;
    --on-tertiary: 85 33 0;
    --on-tertiary-container: 74 28 0;
    --on-tertiary-fixed: 52 17 0;
    --on-tertiary-fixed-variant: 120 50 0;
    --error: 255 180 171;
    --error-container: 147 0 10;
    --on-error: 105 0 5;
    --on-error-container: 255 218 214;

    /* Radix / shadcn UI compatibility aliases */
    --border: var(--outline-variant);
    --input: var(--outline-variant);
    --ring: var(--primary);
    --foreground: var(--on-surface);
    --card: var(--surface-container);
    --card-foreground: var(--on-surface);
    --popover: var(--surface-container-high);
    --popover-foreground: var(--on-surface);
    --muted: var(--surface-container-high);
    --muted-foreground: var(--on-surface-variant);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: rgb(var(--background));
    color: rgb(var(--on-surface));
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overscroll-behavior-y: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main > :first-child {
    margin-top: 0 !important;
  }
}

/* Material Symbols Outlined utility */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* Custom adaptive scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--surface-container-lowest));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--surface-container-high));
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--surface-container-highest));
}

/* Glassmorphism utility */
.glass-panel {
  background: rgb(var(--surface-container) / 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgb(var(--outline-variant) / 0.4);
}
```

---

### 4.3 Blueprint File 2: `tailwind.config.ts`

Replace the `theme.extend.colors` block in `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        "on-background": "rgb(var(--on-background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
        "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
        "surface-container-lowest": "rgb(var(--surface-container-lowest) / <alpha-value>)",
        "surface-container-low": "rgb(var(--surface-container-low) / <alpha-value>)",
        "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
        "surface-container-high": "rgb(var(--surface-container-high) / <alpha-value>)",
        "surface-container-highest": "rgb(var(--surface-container-highest) / <alpha-value>)",
        "surface-variant": "rgb(var(--surface-variant) / <alpha-value>)",
        "surface-tint": "rgb(var(--surface-tint) / <alpha-value>)",
        "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--on-surface-variant) / <alpha-value>)",
        "inverse-surface": "rgb(var(--inverse-surface) / <alpha-value>)",
        "inverse-on-surface": "rgb(var(--inverse-on-surface) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-container": "rgb(var(--primary-container) / <alpha-value>)",
        "primary-fixed": "rgb(var(--primary-fixed) / <alpha-value>)",
        "primary-fixed-dim": "rgb(var(--primary-fixed-dim) / <alpha-value>)",
        "on-primary": "rgb(var(--on-primary) / <alpha-value>)",
        "on-primary-container": "rgb(var(--on-primary-container) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--on-primary-fixed) / <alpha-value>)",
        "on-primary-fixed-variant": "rgb(var(--on-primary-fixed-variant) / <alpha-value>)",
        "inverse-primary": "rgb(var(--inverse-primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-container": "rgb(var(--secondary-container) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--secondary-fixed) / <alpha-value>)",
        "secondary-fixed-dim": "rgb(var(--secondary-fixed-dim) / <alpha-value>)",
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        "on-secondary-container": "rgb(var(--on-secondary-container) / <alpha-value>)",
        "on-secondary-fixed": "rgb(var(--on-secondary-fixed) / <alpha-value>)",
        "on-secondary-fixed-variant": "rgb(var(--on-secondary-fixed-variant) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        "tertiary-container": "rgb(var(--tertiary-container) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--tertiary-fixed) / <alpha-value>)",
        "tertiary-fixed-dim": "rgb(var(--tertiary-fixed-dim) / <alpha-value>)",
        "on-tertiary": "rgb(var(--on-tertiary) / <alpha-value>)",
        "on-tertiary-container": "rgb(var(--on-tertiary-container) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--on-tertiary-fixed) / <alpha-value>)",
        "on-tertiary-fixed-variant": "rgb(var(--on-tertiary-fixed-variant) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        "error-container": "rgb(var(--error-container) / <alpha-value>)",
        "on-error": "rgb(var(--on-error) / <alpha-value>)",
        "on-error-container": "rgb(var(--on-error-container) / <alpha-value>)",

        /* Radix / shadcn UI compatibility */
        border: "rgb(var(--outline-variant) / <alpha-value>)",
        input: "rgb(var(--outline-variant) / <alpha-value>)",
        ring: "rgb(var(--primary) / <alpha-value>)",
        foreground: "rgb(var(--on-surface) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--surface-container) / <alpha-value>)",
          foreground: "rgb(var(--on-surface) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--surface-container-high) / <alpha-value>)",
          foreground: "rgb(var(--on-surface) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--surface-container-high) / <alpha-value>)",
          foreground: "rgb(var(--on-surface-variant) / <alpha-value>)",
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "space-xl": "2.5rem",
        "gutter": "1.5rem",
        "space-lg": "1.5rem",
        "space-md": "1rem",
        "space-sm": "0.5rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem",
        "gutter-mobile": "1rem",
        "space-xs": "0.25rem",
      },
      fontFamily: {
        "label-md": ["JetBrains Mono", "monospace"],
        "display-xl": ["Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"],
        "display-xl-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "500" }],
        "display-xl": ["56px", { lineHeight: "68px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "500" }],
        "display-xl-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 4.4 Blueprint File 3: `src/components/theme/ThemeProvider.tsx`

Create `src/components/theme/ThemeProvider.tsx`:

```tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "islam_theme_v1";
const THEME_FALLBACK_KEY = "theme";

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveThemeValue(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

function applyDomTheme(resolved: "dark" | "light", activeTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  // Dispatch custom sync event for 3D canvases & external listeners
  window.dispatchEvent(
    new CustomEvent("islam_theme_change", {
      detail: { theme: activeTheme, resolvedTheme: resolved },
    })
  );
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(
    resolveThemeValue(defaultTheme)
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const themeRef = useRef<Theme>(theme);
  themeRef.current = theme;

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = (localStorage.getItem(storageKey) ||
        localStorage.getItem(THEME_FALLBACK_KEY)) as Theme | null;
      const initialTheme = stored && ["dark", "light", "system"].includes(stored)
        ? stored
        : defaultTheme;

      setThemeState(initialTheme);
      const resolved = resolveThemeValue(initialTheme);
      setResolvedTheme(resolved);
      applyDomTheme(resolved, initialTheme);
    } catch {
      // localStorage may fail in restricted/private browsing modes
      const fallbackResolved = resolveThemeValue(defaultTheme);
      setResolvedTheme(fallbackResolved);
      applyDomTheme(fallbackResolved, defaultTheme);
    } finally {
      setMounted(true);
    }
  }, [defaultTheme, storageKey]);

  // System media query change listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (themeRef.current === "system") {
        const newResolved = e.matches ? "dark" : "light";
        setResolvedTheme(newResolved);
        applyDomTheme(newResolved, "system");
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Multi-tab storage synchronization listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === storageKey || e.key === THEME_FALLBACK_KEY) && e.newValue) {
        const nextTheme = e.newValue as Theme;
        if (["dark", "light", "system"].includes(nextTheme)) {
          setThemeState(nextTheme);
          const resolved = resolveThemeValue(nextTheme);
          setResolvedTheme(resolved);
          applyDomTheme(resolved, nextTheme);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      const resolved = resolveThemeValue(newTheme);
      setResolvedTheme(resolved);
      applyDomTheme(resolved, newTheme);

      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore storage exceptions
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      mounted,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

---

### 4.5 Blueprint File 4: `src/components/theme/ThemeToggle.tsx`

Create `src/components/theme/ThemeToggle.tsx`:

```tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Guard against server/client icon hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        className={cn(
          "relative flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high/60 border border-outline-variant/30 text-on-surface-variant opacity-70 cursor-wait",
          className
        )}
      >
        <span className="w-4 h-4 rounded-full bg-on-surface-variant/20 animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to cybernetic dark mode"}
      title={isDark ? "Switch to High-Contrast Light Mode" : "Switch to Cybernetic Dark Mode"}
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/30 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-200 active:scale-95 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -70, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 70, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-secondary group-hover:text-primary"
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 70, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -70, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-amber-500 group-hover:text-amber-600"
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
      {showLabel && (
        <span className="ml-2 font-label-sm text-xs text-on-surface">
          {isDark ? "Cybernetic Dark" : "High-Contrast Light"}
        </span>
      )}
    </button>
  );
}
```

---

### 4.6 Blueprint File 5: `src/components/theme/index.ts`

Create `src/components/theme/index.ts`:

```ts
export * from "./ThemeProvider";
export * from "./ThemeToggle";
```

---

### 4.7 Blueprint File 6: `src/app/layout.tsx`

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";

export const metadata: Metadata = {
  title: "Islam Samy — Technology & Business Portfolio | Solutions Architect",
  description:
    "Executive portfolio of Islam Samy — Founder & Lead AI / BI Solutions Architect specializing in Distributed Systems, Real-Time Lakehouses, and Enterprise Machine Learning.",
  keywords: [
    "Islam Samy",
    "Solutions Architect",
    "AI Architect",
    "BI Developer",
    "Distributed Systems",
    "Lakehouse",
    "OPERA PMS",
    "Enterprise Analytics",
  ],
  authors: [{ name: "Islam Samy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Anti-FOUC Blocking Theme Initializer: executes synchronously before render */}
        <script
          id="islam-theme-anti-fouc"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='islam_theme_v1';var s=localStorage.getItem(k)||localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=s==='dark'||(!s&&m)||(s==='system'&&m);var el=document.documentElement;if(isDark){el.classList.add('dark');el.style.colorScheme='dark';}else{el.classList.remove('dark');el.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
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
      <body className="bg-background text-on-surface min-h-screen antialiased transition-colors duration-300 selection:bg-primary-container selection:text-on-primary-container">
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 5. Verification Method

Once the implementer applies the blueprint:

1. **Static Analysis & Type Checking**:
   ```powershell
   npx tsc --noEmit
   npm run build
   ```
   *Expected outcome*: Clean build with 0 TypeScript errors and 0 Next.js build errors. All 15 static routes successfully generated.

2. **Verify Opacity Modifier Generation**:
   - Inspect computed CSS for `.bg-primary/20` in browser developer tools:
     - Should output `rgba(208, 188, 255, 0.2)` in dark mode.
     - Should output `rgba(102, 38, 226, 0.2)` in light mode.

3. **Verify Zero FOUC (Anti-Flash of Unstyled Content)**:
   - In browser developer console, execute:
     ```js
     localStorage.setItem('islam_theme_v1', 'light');
     location.reload();
     ```
   - *Expected outcome*: Page reloads directly in light mode with `#f8f9fd` background from frame 1, with zero flash of dark screen.
   - Inspect console output: 0 React hydration warnings, 0 `Extra attributes from the server: class` warnings.

4. **Verify Theme Switching & Persistence**:
   - Click `ThemeToggle`:
     - Toggles `document.documentElement` class between `dark` and `""`.
     - Toggles `color-scheme` between `"dark"` and `"light"`.
     - Icon animates smoothly between Lucide `Sun` and `Moon`.
     - `localStorage.getItem('islam_theme_v1')` updates to `"light"` / `"dark"`.
     - Custom event `islam_theme_change` fires with `{ theme, resolvedTheme }`.

5. **Invalidation Conditions**:
   - If CSS tokens in `:root` or `.dark` contain commas or `rgb(...)` wrappers instead of space-separated RGB numbers (`R G B`), Tailwind opacity classes will fail.
   - If `suppressHydrationWarning` is omitted on `<html>`, React 19 will log hydration mismatches whenever the stored theme is light.
   - If test source code is accessed or read, the integrity constraint is violated.
