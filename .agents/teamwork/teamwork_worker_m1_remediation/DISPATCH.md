# Dispatch: Worker M1 Remediation

## Task
Execute the Milestone 1 UI Primitives export syntax remediation and test harness syntax fix per the blueprints established by Explorer Retry 1, 2, and 3.

## Required Reading (MANDATORY)
1. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md` (MANDATORY: read before starting work)
2. `c:\Users\Eslam\Desktop\islamweb\PROJECT.md`
3. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_1\handoff.md` (Export architecture blueprints)
4. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_2\handoff.md` (Test harness syntax typo fix)
5. `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_3\handoff.md` (Verification checklist & execution protocol)

## File Ownership
You have exclusive write access to:
- `src/components/ui/dialog.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/tooltip.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `tests/tier1-feature-coverage.test.mjs` (strictly line 593 syntax fix: `depth: 3D => 3` -> `depth: 3`)

Do NOT modify any other files.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

The team must NOT: read test source code to understand expected behaviour before implementing. Confine any test file modification strictly to the known syntax typo at line 593 of `tests/tier1-feature-coverage.test.mjs`.

## Implementation Instructions
1. In `src/components/ui/dialog.tsx`, `tabs.tsx`, `card.tsx`, `select.tsx`, `avatar.tsx`, `tooltip.tsx`, `button.tsx`, `badge.tsx`:
   Convert all component definitions to direct inline exports (`export const Component = ...`) and remove trailing multi-line export blocks to eliminate duplicate export errors (or apply Strategy C with comment directives if desired, ensuring ZERO duplicate exports).
   Ensure:
   - All components, variants, and interfaces are cleanly exported.
   - All `forwardRef` display names are preserved.
   - Zero hardcoded hex colors (use design tokens).
2. In `tests/tier1-feature-coverage.test.mjs:593`:
   Fix the syntax error: `const hyperplaneConfig = { type: 'hyperplane', vectors: 48, depth: 3D => 3 };` -> `const hyperplaneConfig = { type: 'hyperplane', vectors: 48, depth: 3 };`
3. Execute the Verification Checklist from Explorer Retry 3:
   - Verify zero duplicate exports (`node -e ...`)
   - Verify zero hardcoded hex colors
   - Verify TypeScript compilation: `npx tsc --noEmit`
   - Run UI primitives test: `node --test tests/challenger-m1-theme-stress.test.mjs`
   - Run full test suite: `npm test`
   - Run Next.js production build: `npm run build`
4. Document all results and commands in your `handoff.md` in `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m1_remediation\handoff.md`.


## 2026-11-05T21:42:00Z
You are the Worker for Milestone 1 Remediation (UI Primitives Export Architecture & Syntax Fix).
Your working directory is: c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m1_remediation\

Read the dispatch instructions:
c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m1_remediation\DISPATCH.md

MANDATORY FIRST STEP:
Read c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md before touching any code.

Also read:
- c:\Users\Eslam\Desktop\islamweb\PROJECT.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_1\handoff.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_2\handoff.md
- c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
The team must NOT: read test source code to understand expected behaviour before implementing. Confine any test file edit strictly to the syntax typo at line 593 in tests/tier1-feature-coverage.test.mjs.

Scope of work:
1. In src/components/ui/dialog.tsx, tabs.tsx, card.tsx, select.tsx, avatar.tsx, tooltip.tsx, button.tsx, badge.tsx:
   Standardize export syntax to direct inline `export const Component = ...` (and types/variants inline) and remove trailing multiline export blocks to avoid duplicate export SyntaxErrors. Keep displayName on all forwardRef components. Zero hardcoded hex colors.
2. In tests/tier1-feature-coverage.test.mjs:593:
   Fix `depth: 3D => 3` to `depth: 3`.
3. Run verification commands:
   - Check duplicate exports with node
   - Check hex colors with node
   - Run `npx tsc --noEmit`
   - Run `node --test tests/challenger-m1-theme-stress.test.mjs`
   - Run `npm test`
   - Run `npm run build`
4. Write handoff.md in your working directory and message the orchestrator when complete.
