# Dispatch: Explorer M2 3 — Admin Navigation & Theme Sync (F7)

## Objective
Investigate requirements and architecture for `<AdminNav />` (`src/components/navigation/AdminNav.tsx`) and theme synchronization across admin routes (`/admin/*`).

## Scope
- Inspect `src/components/navigation/AdminNav.tsx`.
- Review 6 admin navigation sections: Overview (`/admin`), Projects (`/admin/projects`), Blog (`/admin/blog`), Pricing (`/admin/pricing`), Reservations (`/admin/reservations`), Reviews (`/admin/reviews`).
- Active route highlighting for each admin section.
- Integrated `ThemeToggle` component syncing with global ThemeProvider.
- Responsive mobile hamburger navigation for admin shell.
- Logout / exit to portfolio link.

## Files to Inspect
- `src/components/navigation/AdminNav.tsx`
- `src/app/admin/layout.tsx` (if present)
- `src/components/theme/ThemeToggle.tsx`
- `c:\Users\Eslam\Desktop\islamweb\PROJECT.md`
- `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md`

## Mandate & Integrity Constraints
- Integrity mode: demo
- The team must NOT: read test source code to understand expected behaviour before implementing.
- Read-only exploration. Do NOT modify any code.
- Deliver comprehensive handoff with actionable implementation recommendations in `handoff.md`.
