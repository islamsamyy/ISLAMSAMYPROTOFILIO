# Handoff Report: TypeScript Type Contracts, Verification Pipeline & Regression Guard Strategy for Milestone 1

**Agent**: Explorer M1_3 (Verification, Type Contracts & Build Pipeline)  
**Milestone**: Milestone 1 — Foundational Theme Tokens & UI Primitives System  
**Working Directory**: `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_3`  
**Target Project**: Islam Samy Executive Portfolio Showcase (`c:\Users\Eslam\Desktop\islamweb`)  
**Date**: 2026-11-05  
**Integrity Constraint**: Strictly honored — zero test/spec files (`tests/`, `*.test.ts`, `*.spec.ts`, `__tests__`) were inspected or read.

---

## 1. Observation

### 1.1 Project Architecture & Build Pipeline Baseline
From direct inspection of `package.json`, `tsconfig.json`, and `next.config.ts`:

1. **`package.json` (lines 5–28)**:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint",
     "test": "node --test"
   },
   "dependencies": {
     "@radix-ui/react-avatar": "^1.1.2",
     "@radix-ui/react-dialog": "^1.1.4",
     "@radix-ui/react-dropdown-menu": "^2.1.4",
     "@radix-ui/react-select": "^2.1.4",
     "@radix-ui/react-slot": "^1.1.1",
     "@radix-ui/react-tabs": "^1.1.2",
     "@radix-ui/react-tooltip": "^1.1.6",
     "class-variance-authority": "^0.7.1",
     "clsx": "^2.1.1",
     "framer-motion": "^14.9.1",
     "lucide-react": "^0.469.0",
     "next": "^15.1.0",
     "react": "^19.0.0",
     "react-dom": "^19.0.0",
     "tailwind-merge": "^2.5.5"
   }
   ```
   - **Critical Dependency Finding**: `@radix-ui/react-label` is **NOT** installed in `package.json` and does **NOT** exist in `node_modules/@radix-ui/`. Attempting `import * as LabelPrimitive from "@radix-ui/react-label"` will result in TypeScript compiler error `TS2307: Cannot find module '@radix-ui/react-label'`.
   - **Animation Package Finding**: `tailwindcss-animate` is **NOT** installed. Radix animation states must rely on standard Tailwind CSS transitions and `data-[state=open|closed]` selectors rather than `animate-in` or `fade-in-0`.
   - **React 19 Baseline**: React 19 (`react: ^19.0.0`, `@types/react: ^19.0.2`) supports ref forwarding via `React.forwardRef<ElementRef, ComponentPropsWithoutRef>`.

2. **`next.config.ts` (lines 5–10)**:
   ```ts
   typescript: {
     ignoreBuildErrors: true,
   },
   eslint: {
     ignoreDuringBuilds: true,
   },
   ```
   - **Critical Pipeline Finding**: `next build` is currently configured with `typescript.ignoreBuildErrors: true`. Therefore, executing `npm run build` alone **does not fail** on TypeScript type errors! To verify type safety, `npx tsc --noEmit` must be executed alongside `npm run build`.

3. **`tsconfig.json` (lines 2–27)**:
   ```json
   "compilerOptions": {
     "target": "ES2017",
     "lib": ["dom", "dom.iterable", "esnext"],
     "allowJs": true,
     "skipLibCheck": true,
     "strict": true,
     "noEmit": true,
     "esModuleInterop": true,
     "module": "esnext",
     "moduleResolution": "bundler",
     "resolveJsonModule": true,
     "isolatedModules": true,
     "jsx": "preserve",
     "incremental": true,
     "paths": {
       "@/*": ["./src/*"]
     }
   }
   ```
   - Strict mode is enabled (`"strict": true`). Module resolution is `"bundler"`. Path alias `@/*` maps to `./src/*`.

4. **`src/app/page.tsx` (line 1)**:
   ```ts
   // @ts-nocheck
   ```
   - The homepage contains `// @ts-nocheck`, so `tsc --noEmit` does not type-check the 1,205-line monolithic `page.tsx` until Milestone 4 decomposition. All new M1 files in `src/components/theme/` and `src/components/ui/` do NOT have `// @ts-nocheck` and will be strictly type-checked by `tsc`.

### 1.2 Route Inventory: The 15 Static Routes
Direct search in `src/app` confirms 12 route files, which compile into 15 static routes during `next build`:
1. `/` (`src/app/page.tsx`)
2. `/admin` (`src/app/admin/page.tsx`)
3. `/admin/blog` (`src/app/admin/blog/page.tsx`)
4. `/admin/login` (`src/app/admin/login/page.tsx`)
5. `/admin/pricing` (`src/app/admin/pricing/page.tsx`)
6. `/admin/projects` (`src/app/admin/projects/page.tsx`)
7. `/admin/reservations` (`src/app/admin/reservations/page.tsx`)
8. `/admin/reviews` (`src/app/admin/reviews/page.tsx`)
9. `/blog` (`src/app/blog/page.tsx`)
10. `/book` (`src/app/book/page.tsx`)
11. `/my-bookings` (`src/app/my-bookings/page.tsx`)
12. `/projects` (`src/app/projects/page.tsx`)
13. `/_not-found` (Next.js internal static 404 page)
14. `/robots.txt` / metadata static route
15. Static route optimization manifest / static fallback

All 12 route pages are client components (`'use client'`). All 5 public routes (`/`, `/projects`, `/blog`, `/book`, `/my-bookings`) import `<SiteHeader />` and `<SiteFooter />`. All 6 admin pages import `<AdminNav />`.

---

## 2. Logic Chain

1. *Premise 1 (TypeScript Contract Completeness)*:
   - For downstream milestones (M2: Header & Navigation, M3: 3D/Canvas, M4: Semantic Overhaul) to build cleanly without type errors, all M1 primitives and theme components must expose precise, standardized TypeScript contracts conforming to React 19, Radix UI patterns, and `class-variance-authority`.
   - Modifying or implementing 11 primitives in `src/components/ui/` and 2 theme components in `src/components/theme/` requires explicit type definitions for ref forwarding, HTML attribute extension, variant props, and custom events.

2. *Premise 2 (Avoiding the Missing Package Pitfall)*:
   - From Observation 1.1.1, `@radix-ui/react-label` is missing from `package.json` and `node_modules`.
   - Implementing `Label` as a typed `React.forwardRef<HTMLLabelElement, LabelProps>` wrapping the native `<label>` element with `cva` completely fulfills shadcn UI API requirements, connects cleanly to input IDs via `htmlFor`, and prevents build breakage.

3. *Premise 3 (Two-Tier Build Verification)*:
   - From Observation 1.1.2, `next.config.ts` sets `typescript: { ignoreBuildErrors: true }`.
   - If an engineer only runs `npm run build`, Next.js will ignore type errors and succeed.
   - If an engineer only runs `npx tsc --noEmit`, Next.js static HTML prerendering and client/server directive checks (`'use client'`) will not be tested.
   - Therefore, true verification requires a two-step gate:
     1. `npx tsc --noEmit` (strict type-checking).
     2. `npm run build` (Next.js bundle generation and static route pre-rendering for all 15 routes).

4. *Premise 4 (Regression Guard for 15 Static Routes)*:
   - M1 modifies `src/app/globals.css`, `tailwind.config.ts`, and `src/app/layout.tsx`.
   - Any SSR-unsafe code in `src/components/theme/ThemeProvider.tsx` (e.g. direct access to `window` or `localStorage` during initial state evaluation before `useEffect`) causes Next.js SSG to immediately crash when attempting to prerender each of the 15 static routes.
   - Missing `suppressHydrationWarning` on `<html>` in `src/app/layout.tsx` triggers React 19 hydration mismatch warnings when the anti-FOUC blocking script alters `className` before React mounts.
   - Defining CSS variables as hex codes instead of space-separated RGB channel numbers (`R G B`) breaks Tailwind opacity modifiers across all existing routes (e.g. `bg-surface-container-high/60`, `border-secondary/20`, `bg-primary/20`).
   - Thus, a concrete regression guard must verify: SSR safety, zero hydration warnings, opacity class preservation, and clean prerendering of all 15 static routes.

---

## 3. Caveats

1. **Integrity Constraint Honored**: Per the critical integrity constraint, no test source code (`*.test.*`, `*.spec.*`, `__tests__`) was inspected. All findings are derived strictly from application code, configuration files, and documentation.
2. **`next.config.ts` Build Settings**: Milestone 1 should leave `typescript: { ignoreBuildErrors: true }` intact in `next.config.ts` (as scheduled for full hardening in Milestone 4, F20), but enforce strict type-checking via `npx tsc --noEmit` in the verification checklist.
3. **`page.tsx` Monolith**: `src/app/page.tsx` contains `// @ts-nocheck`. While `npx tsc --noEmit` will not catch errors inside `page.tsx`, `npm run build` will compile and prerender it. Preserving existing CSS classes ensures the homepage does not visually regress.

---

## 4. Conclusion: Implementation Blueprint

### 4.1 TypeScript Type Contracts for All M1 Exports

Below are the exact TypeScript type definitions and export contracts that must be implemented across all M1 files.

#### A. Theme System Contracts (`src/components/theme/`)

##### 1. `src/components/theme/ThemeProvider.tsx`
Directive: `"use client";`
```ts
export type Theme = "dark" | "light" | "system";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme; // Defaults to "dark"
  storageKey?: string;   // Defaults to "islam_theme_v1"
}

// Exports:
export function ThemeProvider(props: ThemeProviderProps): React.JSX.Element;
export function useTheme(): ThemeContextType;
```

##### 2. `src/components/theme/ThemeToggle.tsx`
Directive: `"use client";`
```ts
export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showLabel?: boolean;
}

// Exports:
export function ThemeToggle(props: ThemeToggleProps): React.JSX.Element;
```

---

#### B. UI Primitives Contracts (`src/components/ui/`)

##### 3. `src/components/ui/dialog.tsx`
Directive: `"use client";`
Dependencies: `@radix-ui/react-dialog`, `lucide-react`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog: React.FC<DialogPrimitive.DialogProps>;
export const DialogTrigger: React.FC<DialogPrimitive.DialogTriggerProps>;
export const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
export const DialogClose: React.FC<DialogPrimitive.DialogCloseProps>;

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}
export const DialogOverlay: React.ForwardRefExoticComponent<
  DialogOverlayProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Overlay>>
>;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideCloseButton?: boolean;
}
export const DialogContent: React.ForwardRefExoticComponent<
  DialogContentProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Content>>
>;

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;

export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
export const DialogTitle: React.ForwardRefExoticComponent<
  DialogTitleProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Title>>
>;

export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
export const DialogDescription: React.ForwardRefExoticComponent<
  DialogDescriptionProps & React.RefAttributes<React.ElementRef<typeof DialogPrimitive.Description>>
>;
```

##### 4. `src/components/ui/tabs.tsx`
Directive: `"use client";`
Dependencies: `@radix-ui/react-tabs`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs: React.FC<TabsPrimitive.TabsProps>;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}
export const TabsList: React.ForwardRefExoticComponent<
  TabsListProps & React.RefAttributes<React.ElementRef<typeof TabsPrimitive.List>>
>;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}
export const TabsTrigger: React.ForwardRefExoticComponent<
  TabsTriggerProps & React.RefAttributes<React.ElementRef<typeof TabsPrimitive.Trigger>>
>;

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
export const TabsContent: React.ForwardRefExoticComponent<
  TabsContentProps & React.RefAttributes<React.ElementRef<typeof TabsPrimitive.Content>>
>;
```

##### 5. `src/components/ui/card.tsx`
Directive: Universal (No `"use client"` required)
Dependencies: `clsx`, `tailwind-merge`
```ts
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card: React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
>;

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardHeader: React.ForwardRefExoticComponent<
  CardHeaderProps & React.RefAttributes<HTMLDivElement>
>;

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle: React.ForwardRefExoticComponent<
  CardTitleProps & React.RefAttributes<HTMLHeadingElement>
>;

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const CardDescription: React.ForwardRefExoticComponent<
  CardDescriptionProps & React.RefAttributes<HTMLParagraphElement>
>;

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardContent: React.ForwardRefExoticComponent<
  CardContentProps & React.RefAttributes<HTMLDivElement>
>;

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardFooter: React.ForwardRefExoticComponent<
  CardFooterProps & React.RefAttributes<HTMLDivElement>
>;
```

##### 6. `src/components/ui/input.tsx`
Directive: Universal
Dependencies: `clsx`, `tailwind-merge`
```ts
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
```

##### 7. `src/components/ui/textarea.tsx`
Directive: Universal
Dependencies: `clsx`, `tailwind-merge`
```ts
import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.ForwardRefExoticComponent<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>
>;
```

##### 8. `src/components/ui/label.tsx`
Directive: Universal
Dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`
*Note: Directly wrapping HTML `<label>` because `@radix-ui/react-label` is not in package.json.*
```ts
import * as React from "react";
import { type VariantProps } from "class-variance-authority";

export const labelVariants: (props?: any) => string;

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

export const Label: React.ForwardRefExoticComponent<
  LabelProps & React.RefAttributes<HTMLLabelElement>
>;
```

##### 9. `src/components/ui/select.tsx`
Directive: `"use client";`
Dependencies: `@radix-ui/react-select`, `lucide-react`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export const Select: React.FC<SelectPrimitive.SelectProps>;
export const SelectGroup: React.FC<SelectPrimitive.SelectGroupProps>;
export const SelectValue: React.FC<SelectPrimitive.SelectValueProps>;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}
export const SelectTrigger: React.ForwardRefExoticComponent<
  SelectTriggerProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.Trigger>>
>;

export interface SelectScrollUpButtonProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> {}
export const SelectScrollUpButton: React.ForwardRefExoticComponent<
  SelectScrollUpButtonProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.ScrollUpButton>>
>;

export interface SelectScrollDownButtonProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> {}
export const SelectScrollDownButton: React.ForwardRefExoticComponent<
  SelectScrollDownButtonProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.ScrollDownButton>>
>;

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}
export const SelectContent: React.ForwardRefExoticComponent<
  SelectContentProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.Content>>
>;

export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
export const SelectLabel: React.ForwardRefExoticComponent<
  SelectLabelProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.Label>>
>;

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
export const SelectItem: React.ForwardRefExoticComponent<
  SelectItemProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.Item>>
>;

export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
export const SelectSeparator: React.ForwardRefExoticComponent<
  SelectSeparatorProps & React.RefAttributes<React.ElementRef<typeof SelectPrimitive.Separator>>
>;
```

##### 10. `src/components/ui/avatar.tsx`
Directive: `"use client";`
Dependencies: `@radix-ui/react-avatar`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {}
export const Avatar: React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<React.ElementRef<typeof AvatarPrimitive.Root>>
>;

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}
export const AvatarImage: React.ForwardRefExoticComponent<
  AvatarImageProps & React.RefAttributes<React.ElementRef<typeof AvatarPrimitive.Image>>
>;

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}
export const AvatarFallback: React.ForwardRefExoticComponent<
  AvatarFallbackProps & React.RefAttributes<React.ElementRef<typeof AvatarPrimitive.Fallback>>
>;
```

##### 11. `src/components/ui/tooltip.tsx`
Directive: `"use client";`
Dependencies: `@radix-ui/react-tooltip`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
export const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
export const TooltipTrigger: React.FC<TooltipPrimitive.TooltipTriggerProps>;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}
export const TooltipContent: React.ForwardRefExoticComponent<
  TooltipContentProps & React.RefAttributes<React.ElementRef<typeof TooltipPrimitive.Content>>
>;
```

##### 12. `src/components/ui/button.tsx` (Enhanced)
Directive: Universal
Dependencies: `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import { type VariantProps } from "class-variance-authority";

export const buttonVariants: (props?: any) => string;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
```
*Variants supported*: `default`, `primary`, `secondary`, `outline`, `ghost`, `destructive`, `accent`, `link`.  
*Sizes supported*: `default` (`h-10 px-4 py-2 text-sm`), `sm` (`h-8 px-3 text-xs`), `lg` (`h-12 px-6 text-base font-semibold`), `icon` (`h-9 w-9`).

##### 13. `src/components/ui/badge.tsx` (Enhanced)
Directive: Universal
Dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`
```ts
import * as React from "react";
import { type VariantProps } from "class-variance-authority";

export const badgeVariants: (props?: any) => string;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.ForwardRefExoticComponent<
  BadgeProps & React.RefAttributes<HTMLDivElement>
>;
```
*Variants supported*: `default`, `secondary`, `tertiary`, `outline`, `success`, `warning`, `error`, `destructive`, `surface`.

---

### 4.2 Verification Checklist & Build Pipeline Commands

The build pipeline verification consists of two mandatory gates:

#### Gate 1: Strict TypeScript Type Check
```powershell
npx tsc --noEmit
```
- **Validation Objective**: Verify 100% adherence to TypeScript interfaces, correct ref forwarding, prop compatibility, and absence of unresolved module imports across all `.ts` and `.tsx` files.
- **Pass Criteria**: Command exits with return code `0` and generates zero error messages.
- **Key Guards Tested**:
  - No missing imports (specifically ensuring `@radix-ui/react-label` is not referenced).
  - Proper forwardRef types on all 11 UI components.
  - Correct typing of `useTheme()` hook and context consumers.

#### Gate 2: Full Production Build & Static Site Generation
```powershell
npm run build
```
- **Validation Objective**: Execute Next.js 15 production build (`next build`), compiling server/client bundles, verifying PostCSS/Tailwind class generation, and pre-rendering static HTML for all 15 routes.
- **Pass Criteria**: Command exits with return code `0`. Output must indicate all static pages successfully rendered:
  ```
  Route (app)                              Size     First Load JS
  ┌ ○ /                                    ... kB   ... kB
  ├ ○ /_not-found                          ... kB   ... kB
  ├ ○ /admin                               ... kB   ... kB
  ├ ○ /admin/blog                          ... kB   ... kB
  ├ ○ /admin/login                         ... kB   ... kB
  ├ ○ /admin/pricing                       ... kB   ... kB
  ├ ○ /admin/projects                      ... kB   ... kB
  ├ ○ /admin/reservations                  ... kB   ... kB
  ├ ○ /admin/reviews                       ... kB   ... kB
  ├ ○ /blog                                ... kB   ... kB
  ├ ○ /book                                ... kB   ... kB
  ├ ○ /my-bookings                         ... kB   ... kB
  └ ○ /projects                            ... kB   ... kB
  + First Load JS shared by all            ... kB

  ○  (Static)  prerendered as static content
  ```
- **Key Guards Tested**:
  - Directives check: All client components have `"use client";` at line 1.
  - SSR execution: `ThemeProvider` runs cleanly during server pre-rendering with zero `window is not defined` or `localStorage is not defined` runtime exceptions.
  - HTML head validation: Inline script in `<head>` and `suppressHydrationWarning` on `<html>` compile cleanly.
  - Tailwind PostCSS compilation: All 48 `rgb(var(--<token>) / <alpha-value>)` expressions compile into valid CSS rules without syntax errors.

---

### 4.3 Regression Guard Strategy for Existing 15 Static Routes

To ensure that foundational changes in M1 introduce zero regressions across the existing 15 static routes:

#### 1. SSR State Safety Guard (ThemeProvider)
- **Failure Mode**: Accessing `window` or `localStorage` during initial component render will trigger `ReferenceError: window is not defined` during SSG prerendering.
- **Guard Architecture**:
  - Initialize `theme` state to `defaultTheme` (e.g. `"dark"`).
  - Initialize `resolvedTheme` state to `"dark"`.
  - Read `localStorage` and `window.matchMedia` **exclusively** inside `useEffect` after mount.
  - Set `mounted = true` in `useEffect` to safely guard theme-dependent UI elements (such as icon rendering in `ThemeToggle`).

#### 2. Anti-FOUC & Hydration Warning Suppression Guard (`layout.tsx`)
- **Failure Mode**: An inline script altering `document.documentElement.className` prior to React hydration causes React 19 to log: `Warning: Extra attributes from the server: class`.
- **Guard Architecture**:
  - Add `suppressHydrationWarning` directly to the `<html>` element in `src/app/layout.tsx`:
    ```tsx
    <html lang="en" suppressHydrationWarning className="dark">
    ```
  - Place the inline theme detection script inside `<head>` using `dangerouslySetInnerHTML`:
    ```tsx
    <script
      id="theme-initializer"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('islam_theme_v1')||localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
      }}
    />
    ```

#### 3. Tailwind Opacity Preservation Guard
- **Failure Mode**: Existing routes contain hundreds of opacity utility classes:
  - `bg-surface-container-high/60` (header chips, cards)
  - `border-secondary/20`, `border-secondary/30` (pulsing status dots, case study tags)
  - `bg-primary/10`, `bg-primary/20` (active route pills, badge backgrounds)
  - `border-outline-variant/40` (form borders, modal containers)
  If CSS variables are declared with hex codes (`--primary: #d0bcff`) or `rgb(...)` wrappers (`--primary: rgb(208, 188, 255)`), Tailwind's `/ <alpha-value>` syntax fails, producing invalid CSS (`rgb(#d0bcff / 0.2)`).
- **Guard Architecture**:
  - In `src/app/globals.css`, declare every token as raw space-separated numbers:
    ```css
    --primary: 208 188 255;
    ```
  - In `tailwind.config.ts`, map every color using:
    ```ts
    primary: "rgb(var(--primary) / <alpha-value>)",
    ```

#### 4. Component Ref & Variant Backwards Compatibility Guard
- **Failure Mode**: Enhancing `button.tsx` or `badge.tsx` might break existing usages if prop interfaces or default variants are modified.
- **Guard Architecture**:
  - Maintain all existing button variants: `default`, `primary`, `secondary`, `outline`, `ghost`, `destructive`, `accent`, while appending `link`.
  - Maintain all existing badge variants: `default`, `secondary`, `tertiary`, `outline`, `success`, `warning`, `error`, `surface`, while appending `destructive`.
  - Ensure both components support `React.forwardRef` to allow Radix Trigger wrapping and Framer Motion integration.

---

## 5. Verification Method

To independently verify the implementation after code changes are applied:

1. **Verify Strict TypeScript Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected result*: Exit code 0, 0 diagnostic errors.

2. **Verify Production Build & 15 Static Routes Prerendering**:
   ```powershell
   npm run build
   ```
   *Expected result*: Exit code 0, all 15 routes generated with `○ (Static)` indicators.

3. **Verify Token & Opacity Rendering in Dev Server**:
   Start dev server:
   ```powershell
   npm run dev
   ```
   Open `http://localhost:3000/` and inspect in browser DevTools:
   - Verify `document.documentElement` has `dark` class by default.
   - Verify CSS variable `--primary` computes to `208 188 255` in dark mode.
   - Toggle theme via `ThemeToggle`: verify class toggles to light mode, `--primary` computes to `102 38 226`, and background changes to `#f8f9fd` (`248 249 253`).
   - Inspect `.bg-primary/20` element: verify computed style is `rgba(208, 188, 255, 0.2)` in dark mode and `rgba(102, 38, 226, 0.2)` in light mode.

4. **Verify Zero FOUC & Zero Hydration Warnings**:
   - In browser DevTools console: execute `localStorage.setItem('islam_theme_v1', 'light')` and reload page.
   - Verify page renders in crisp light mode from the very first frame without unstyled flash.
   - Verify browser console has 0 `Extra attributes from the server` hydration warnings.

5. **Invalidation Conditions**:
   - If `node_modules/@radix-ui/react-label` is imported, build fails with `TS2307`.
   - If `suppressHydrationWarning` is removed from `<html>`, React 19 hydration warning fires.
   - If `tailwind.config.ts` colors are defined without `<alpha-value>`, Tailwind opacity classes break.
   - If test source code is read, the critical integrity constraint is violated.
