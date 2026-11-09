# Implementation Blueprint: Standardized Radix & shadcn UI Primitives System (M1_2)

**Explorer**: Explorer M1_2 (UI Primitives & Accessibility Architecture)  
**Target Milestone**: Milestone 1 — Foundational Theme Tokens & UI Primitives System  
**Working Directory**: `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_2`  
**Date**: 2026-11-05  
**Integrity Constraint**: Strictly honored — zero test/spec files (`tests/`, `*.test.*`, `*.spec.*`) were inspected or read.

---

## 1. Observation

### 1.1 Dependency & Library Baseline
From direct inspection of `package.json` (lines 12–37) and `node_modules/@radix-ui`:
- **Installed Radix UI Packages**:
  - `@radix-ui/react-avatar`: `^1.1.2` (installed in `node_modules/@radix-ui/react-avatar`)
  - `@radix-ui/react-dialog`: `^1.1.4` (installed in `node_modules/@radix-ui/react-dialog`, peerDependency supports React `^19.0.0`)
  - `@radix-ui/react-dropdown-menu`: `^2.1.4` (installed in `node_modules/@radix-ui/react-dropdown-menu`)
  - `@radix-ui/react-select`: `^2.1.4` (installed in `node_modules/@radix-ui/react-select`)
  - `@radix-ui/react-slot`: `^1.1.1` (installed in `node_modules/@radix-ui/react-slot`)
  - `@radix-ui/react-tabs`: `^1.1.2` (installed in `node_modules/@radix-ui/react-tabs`)
  - `@radix-ui/react-tooltip`: `^1.1.6` (installed in `node_modules/@radix-ui/react-tooltip`)
- **Utility & Styling Libraries**:
  - `class-variance-authority`: `^0.7.1` (installed)
  - `clsx`: `^2.1.1` (installed)
  - `tailwind-merge`: `^2.5.5` (installed)
  - `lucide-react`: `^0.469.0` (installed in `node_modules/lucide-react`)
- **Key Package Absences**:
  - `@radix-ui/react-label` is **NOT** listed in `package.json` and does **NOT** exist in `node_modules/@radix-ui/`.
  - `tailwindcss-animate` is **NOT** listed in `package.json` and does **NOT** exist in `node_modules/`.
- **Framework & Types**:
  - `react`: `^19.0.0`
  - `react-dom`: `^19.0.0`
  - `@types/react`: `^19.0.2`
  - `@types/react-dom`: `^19.0.2`
  - `typescript`: `^5.7.2`
  - `tailwindcss`: `^3.4.17`

### 1.2 Existing UI Primitives Inventory (`src/components/ui/`)
Direct inspection of `src/components/ui/` reveals only two files:
1. `src/components/ui/button.tsx` (62 lines):
   - Uses `@radix-ui/react-slot`, `class-variance-authority`, `cn` from `@/lib/utils`.
   - Variants: `default`, `primary`, `secondary`, `outline`, `ghost`, `destructive`, `accent`.
   - Sizes: `default`, `sm`, `lg`, `icon`.
   - **Accessibility Gap**: Line 7 specifies `focus-visible:ring-1 focus-visible:ring-primary`, which falls below the high-visibility focus ring standard (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`). Missing `link` variant standard in shadcn.
2. `src/components/ui/badge.tsx` (46 lines):
   - Uses `class-variance-authority` and `cn`.
   - Variants: `default`, `secondary`, `tertiary`, `outline`, `success`, `warning`, `error`, `surface`.
   - **Accessibility Gap**: Line 6 specifies `focus:ring-1 focus:ring-primary`. Defined as a plain function `function Badge(...)` without `React.forwardRef`, preventing ref forwarding when used inside Radix tooltips or animation wrappers.

### 1.3 Ad-hoc Component Implementations Across the Application
Across the codebase, the lack of standardized UI primitives has forced repetitive, ad-hoc implementations:
1. **Modals (8 instances)**:
   - `src/components/projects/ArchitectureModal.tsx:18`: Custom `div.fixed.inset-0` with `AnimatePresence`. No focus trapping, no `aria-modal="true"`, no `aria-labelledby`, no escape key handling.
   - `src/app/book/page.tsx:505`: Booking confirmation modal using raw `fixed inset-0` `div`.
   - `src/app/my-bookings/page.tsx:223`: Reschedule modal using raw `fixed inset-0` `div`.
   - `src/app/blog/page.tsx:165`: Full article reader modal using raw `fixed inset-0` `div`.
   - `src/app/admin/blog/page.tsx:131`: Article publisher modal using raw `fixed inset-0` `div`.
   - `src/app/admin/projects/page.tsx:147`: Project CRUD editor modal using raw `fixed inset-0` `div`.
   - `src/app/admin/pricing/page.tsx:219`: Pricing tier editor modal using raw `fixed inset-0` `div`.
   - `src/app/admin/reviews/page.tsx:125`: Review editor modal using raw `fixed inset-0` `div`.
2. **Tabs (3 instances)**:
   - `src/app/book/page.tsx:13-166`: Custom state `bookingMode === 'packages' | 'consultation'` toggled via buttons without keyboard arrow navigation or ARIA tab semantics.
   - `src/app/my-bookings/page.tsx`: Tab-like list filtering without ARIA attributes.
   - `src/app/page.tsx:947`: Milestone vs Retainer pricing toggle implemented with imperative DOM queries.
3. **Form Controls (Inputs, Textareas, Labels, Selects)**:
   - Input fields in `/book`, `/my-bookings`, `/admin/login`, and `/admin/*` use unstandardized styling (`bg-surface-container-high`, `border-outline-variant/40`, inconsistent height and focus indicators).
   - Labels are either missing or plain `<span>` / `<label>` elements without `htmlFor` and disabled state awareness.
   - Timezone selector in `/book/page.tsx:254` uses a native `<select>` element with custom appearance that does not match the cybernetic design aesthetic and cannot be styled cross-browser.

---

## 2. Logic Chain

1. **Premise 1 (Contract & Requirement)**:
   `PROJECT.md` (lines 59–64) specifies the exact UI primitive contract:
   - `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose`
   - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
   - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
   - `Input`, `Textarea`, `Label`, `Select`, `Avatar`, `Tooltip`
   - Accessible focus rings: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`.
2. **Premise 2 (Zero-Dependency Resolution for Label)**:
   - Because `@radix-ui/react-label` is not installed, adding it would require package modification or could fail in locked environments.
   - In shadcn UI, `Label` can be implemented directly on top of the native HTML `<label>` element with `cva` and `React.forwardRef`. This provides identical API semantics (`htmlFor`, `peer-disabled:` styling, click delegation to inputs) with 0 extra dependencies and 100% React 19 compatibility.
3. **Premise 3 (Handling Missing `tailwindcss-animate`)**:
   - Radix primitives expose `data-[state=open]` and `data-[state=closed]` attributes on portals, overlays, and contents.
   - Without `tailwindcss-animate`, utility classes like `animate-in` or `fade-in-0` rely on specific CSS keyframes.
   - By structuring animations with Tailwind CSS 3.4 standard transitions (`transition-all duration-200`, `data-[state=open]:opacity-100 data-[state=closed]:opacity-0`) or standard transforms, components animate cleanly without runtime crashes or missing-class warnings.
4. **Premise 4 (React 19 Typing & Ref Forwarding)**:
   - In React 19 (`@types/react: ^19.0.2`), `React.forwardRef<ElementRef, Props>` remains fully supported and is the exact pattern used by `@radix-ui/react-*` components.
   - Utilizing `React.ElementRef<typeof Primitive>` and `React.ComponentPropsWithoutRef<typeof Primitive>` guarantees strict type safety across all Radix wrappers.
5. **Premise 5 (WCAG AAA Focus Ring Architecture)**:
   - A focus ring class of `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` ensures:
     - 0 distraction for mouse/pointer clicks (`focus-visible`).
     - Distinct 2px high-contrast outline for keyboard navigation.
     - 2px contrast separation offset against surrounding background tokens (`ring-offset-background`).
     - Complies with WCAG 2.2 Success Criterion 2.4.11 (Focus Appearance) and 2.4.7 (Focus Visible).
6. **Conclusion**:
   Constructing standard shadcn primitives for `dialog.tsx`, `tabs.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `select.tsx`, `avatar.tsx`, and `tooltip.tsx`, alongside enhancing `button.tsx` and `badge.tsx`, will establish a solid foundation for Milestones 2, 3, and 4 with zero type errors and full accessibility.

---

## 3. Caveats

1. **Integrity Constraint Honored**: Per project mandate, zero test source files (`tests/`, `*.test.ts`, `*.spec.ts`) were read or inspected during this investigation.
2. **`@radix-ui/react-label` Dependency**: Do not attempt `import * as LabelPrimitive from "@radix-ui/react-label"`. Use the native HTML `<label>` implementation provided below.
3. **Client Component Directives**: All Radix primitives that manage browser events, focus scopes, or portals (`dialog.tsx`, `tabs.tsx`, `select.tsx`, `avatar.tsx`, `tooltip.tsx`) must begin with `"use client";`. Pure presentational components (`card.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`) can omit `"use client";` to remain universal Server/Client components.
4. **Icons**: Use `lucide-react` icons (`X`, `ChevronDown`, `ChevronUp`, `Check`) which are verified installed in `node_modules` and declared in `PROJECT.md`.
5. **Tooltip Provider**: Tooltip triggers require a `<TooltipProvider>` ancestor. The blueprint exports `TooltipProvider` from `tooltip.tsx` so it can either wrap individual tooltips or be mounted globally in `src/app/layout.tsx`.

---

## 4. Conclusion & Detailed Implementation Blueprint

### 4.1 Component Signatures & Contract Summary

| File Path | Primary Exports | Base Primitive / Engine | Key Accessibility Attributes |
|---|---|---|---|
| `src/components/ui/dialog.tsx` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogOverlay`, `DialogPortal` | `@radix-ui/react-dialog` | `role="dialog"`, `aria-modal="true"`, focus trap, Escape key dismiss, accessible close button with `sr-only` |
| `src/components/ui/tabs.tsx` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `@radix-ui/react-tabs` | `role="tablist"`, `role="tab"`, `role="tabpanel"`, roving arrow key navigation, `focus-visible:ring-2` |
| `src/components/ui/card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Semantic HTML (`div`, `h3`, `p`) | Semantic heading hierarchy (`h3`), cybernetic backdrop tokens, ref forwarding |
| `src/components/ui/input.tsx` | `Input` | HTML `<input>` | `focus-visible:ring-2 focus-visible:ring-primary`, `ring-offset-2`, disabled state styling |
| `src/components/ui/textarea.tsx` | `Textarea` | HTML `<textarea>` | `focus-visible:ring-2 focus-visible:ring-primary`, `ring-offset-2`, `resize-y` |
| `src/components/ui/label.tsx` | `Label` | HTML `<label>` + `cva` | `htmlFor` association, `peer-disabled:` opacity binding |
| `src/components/ui/select.tsx` | `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton` | `@radix-ui/react-select` | `role="combobox"`, `role="listbox"`, Arrow key navigation, character typeahead, Escape dismiss, check indicator |
| `src/components/ui/avatar.tsx` | `Avatar`, `AvatarImage`, `AvatarFallback` | `@radix-ui/react-avatar` | Automatic image load state detection, fallback initial badge, screen reader accessible |
| `src/components/ui/tooltip.tsx` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | `@radix-ui/react-tooltip` | Keyboard focus trigger, Escape dismiss, `role="tooltip"`, `aria-describedby` |
| `src/components/ui/button.tsx` | `Button`, `buttonVariants` (enhanced) | `@radix-ui/react-slot` + `cva` | Enhanced `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`, new `link` variant |
| `src/components/ui/badge.tsx` | `Badge`, `badgeVariants` (enhanced) | HTML `<div>` + `cva` | Enhanced `focus-visible:ring-2`, ref forwarding via `React.forwardRef`, new `destructive` variant |

---

### 4.2 Complete Component Code Blueprints

#### 1. `src/components/ui/dialog.tsx`
```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-md transition-all duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-outline-variant/40 bg-surface-container-low/95 p-6 shadow-2xl backdrop-blur-xl duration-200 sm:rounded-2xl",
        "transition-all data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
        "focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-lg p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-surface-container-high/60 gap-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-display text-lg font-semibold leading-none tracking-tight text-on-surface",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-on-surface-variant leading-relaxed", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

---

#### 2. `src/components/ui/tabs.tsx`
```tsx
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-xl bg-surface-container-high/60 p-1 text-on-surface-variant border border-outline-variant/30 backdrop-blur-sm",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-xs sm:text-sm font-medium ring-offset-background transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-surface-container-lowest data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/30 font-semibold",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

---

#### 3. `src/components/ui/card.tsx`
```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-outline-variant/30 bg-surface-container-low/90 text-on-surface shadow-md backdrop-blur-sm transition-all",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-xl font-semibold leading-none tracking-tight text-on-surface",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-on-surface-variant leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
```

---

#### 4. `src/components/ui/input.tsx`
```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest/80 px-3 py-2 text-sm text-on-surface ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-on-surface-variant/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-sans",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

---

#### 5. `src/components/ui/textarea.tsx`
```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest/80 px-3 py-2 text-sm text-on-surface ring-offset-background placeholder:text-on-surface-variant/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y font-sans",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
```

---

#### 6. `src/components/ui/label.tsx`
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium text-on-surface leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
```

---

#### 7. `src/components/ui/select.tsx`
```tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-lg border border-outline-variant/50 bg-surface-container-lowest/80 px-3 py-2 text-sm text-on-surface ring-offset-background placeholder:text-on-surface-variant/50 transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-60 text-on-surface-variant" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-on-surface-variant",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-on-surface-variant",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-high text-on-surface shadow-xl backdrop-blur-xl duration-200",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-xs font-semibold text-on-surface-variant", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-surface-container-highest focus:text-primary",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-outline-variant/30", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
```

---

#### 8. `src/components/ui/avatar.tsx`
```tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-outline-variant/40 bg-surface-container-high shadow-inner",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-surface-container-high font-mono text-xs font-semibold text-primary uppercase select-none",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
```

---

#### 9. `src/components/ui/tooltip.tsx`
```tsx
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-highest px-3 py-1.5 text-xs text-on-surface shadow-xl backdrop-blur-md transition-all duration-150",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

---

#### 10. `src/components/ui/button.tsx` (Enhanced)
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-on-primary font-semibold shadow-md hover:bg-primary-fixed-dim active:scale-[0.98]",
        primary:
          "bg-gradient-to-r from-primary-container to-secondary-container text-white font-semibold shadow-lg hover:opacity-95 active:scale-[0.98]",
        secondary:
          "bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/40 active:scale-[0.98]",
        outline:
          "border border-outline-variant/60 bg-transparent text-on-surface hover:bg-surface-container hover:border-outline active:scale-[0.98]",
        ghost:
          "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50",
        destructive:
          "bg-error-container text-error hover:bg-error/20 active:scale-[0.98]",
        accent:
          "bg-secondary-container text-on-secondary font-semibold hover:bg-secondary active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-semibold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

#### 11. `src/components/ui/badge.tsx` (Enhanced)
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border border-primary/30 bg-primary/10 text-primary",
        secondary:
          "border border-secondary/30 bg-secondary/10 text-secondary",
        tertiary:
          "border border-tertiary/30 bg-tertiary/10 text-tertiary",
        outline:
          "border border-outline-variant text-on-surface-variant",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        warning:
          "border border-amber-500/30 bg-amber-500/10 text-amber-300",
        error:
          "border border-error/30 bg-error/10 text-error",
        destructive:
          "border border-error/30 bg-error/10 text-error",
        surface:
          "border border-outline-variant/40 bg-surface-container-high text-on-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
```

---

### 4.3 Downstream Route Integration Mapping

| Downstream Milestone | Route / Component | Primary Primitives to Import & Use |
|---|---|---|
| **M2** | `SiteHeader.tsx` | `Button`, `Badge`, `Tooltip`, `TooltipTrigger`, `TooltipContent` (for quick action icon descriptions) |
| **M2** | `MobileNavDrawer.tsx` | `Button`, `Badge` |
| **M2** | `AdminNav.tsx` | `Button`, `Badge`, `Tooltip` |
| **M3** | `TiltCard.tsx` | Wraps `Card`, `CardHeader`, `CardTitle`, `CardContent` |
| **M4** | `/` (Homepage) | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` (pricing switcher); `Card` (project cards, pricing tiers); `Input`, `Textarea` (contact form) |
| **M4** | `/projects` | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` (`<ArchitectureModal />`); `Tabs` (category filter); `Input` (search); `Card` |
| **M4** | `/blog` | `Dialog` (article reader modal); `Card` (`<ArticleCard />`); `Input` (search); `Tabs` (category filter) |
| **M4** | `/book` | `Tabs` (Packages vs 1-on-1 Advisory); `Card` (package cards); `Input`, `Textarea`, `Label`, `Select` (intake form); `Dialog` (confirmation modal) |
| **M4** | `/my-bookings` | `Dialog` (reschedule modal); `Tabs` (Active vs Past reservations); `Card` (booking cards); `Input` (lookup) |
| **M4** | `/admin/*` | `Dialog` across CRUD modals; `Input`, `Textarea`, `Label`, `Select` across admin forms; `Card` across telemetry summary cards |

---

## 5. Verification Method

To independently verify the primitives once implemented by the coder:

1. **Verify TypeScript Strict Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected outcome*: Exits with code 0. Zero missing type definitions or incompatible React 19 forwardRef signatures.
2. **Verify Next.js Production Build**:
   ```powershell
   npm run build
   ```
   *Expected outcome*: Exits with code 0. All 15 static routes compile cleanly without SSR/hydration warnings on Radix primitives.
3. **Verify File Layout Compliance**:
   Ensure all 9 new files and 2 modified files are located in `src/components/ui/`:
   - `src/components/ui/dialog.tsx`
   - `src/components/ui/tabs.tsx`
   - `src/components/ui/card.tsx`
   - `src/components/ui/input.tsx`
   - `src/components/ui/textarea.tsx`
   - `src/components/ui/label.tsx`
   - `src/components/ui/select.tsx`
   - `src/components/ui/avatar.tsx`
   - `src/components/ui/tooltip.tsx`
   - `src/components/ui/button.tsx`
   - `src/components/ui/badge.tsx`
4. **Verify Keyboard Navigation & Accessibility**:
   - `Dialog`: Open dialog; press `Tab` repeatedly and confirm focus remains trapped inside the dialog window; press `Escape` and confirm dialog dismisses and returns focus to trigger.
   - `Tabs`: Focus tablist with `Tab`; use `ArrowLeft` / `ArrowRight` to traverse tabs; confirm active tab switches and content renders.
   - `Select`: Focus trigger with `Tab`; press `Space` or `Enter` to open dropdown; use `ArrowUp` / `ArrowDown` to navigate options; press `Enter` to select; verify `Check` indicator aligns with selected item.
   - `Focus Rings`: Press `Tab` through all interactive elements; confirm `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` is clearly visible with high contrast.
5. **Invalidation Conditions**:
   - If `@radix-ui/react-label` is imported, build will fail because it is not installed.
   - If `"use client";` is omitted from `dialog.tsx`, `tabs.tsx`, `select.tsx`, `avatar.tsx`, or `tooltip.tsx`, Next.js App Router SSR will fail.
   - If tests or specs are opened, the critical integrity constraint is violated.
