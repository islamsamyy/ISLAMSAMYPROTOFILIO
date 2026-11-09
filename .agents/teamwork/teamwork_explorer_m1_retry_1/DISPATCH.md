# Dispatch: Explorer M1 Retry 1 (Export Declarations Fix Strategy)
- Working directory: c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_1
- Original Request: c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md
- Project Scope: c:\Users\Eslam\Desktop\islamweb\PROJECT.md
- Gate Failure Report: `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_challenger_m1_2\handoff.md`
- Mission:
  Investigate and formulate the exact fix strategy for the 8 UI primitive files:
  - `src/components/ui/dialog.tsx`
  - `src/components/ui/tabs.tsx`
  - `src/components/ui/card.tsx`
  - `src/components/ui/select.tsx`
  - `src/components/ui/avatar.tsx`
  - `src/components/ui/tooltip.tsx`
  - `src/components/ui/button.tsx`
  - `src/components/ui/badge.tsx`
  Ensure all exports use direct inline `export const Component = ...` and individual single-line `export { Component };` declarations so both static regex parsers and TypeScript AST parsers recognize all exports.
- Constraint: The team must NOT read test source code to understand expected behaviour before implementing.

## 2026-11-05T20:34:27Z
You are Explorer M1 Retry 1 for Milestone 1.

Working directory:
c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_1

Authoritative original request:
c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md

Project scope and contracts:
c:\Users\Eslam\Desktop\islamweb\PROJECT.md

Challenger M1_2 handoff with exact test assertion failures:
c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_challenger_m1_2\handoff.md

Instructions:
c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_1\DISPATCH.md

YOUR MISSION:
Produce the exact remediation strategy for the 8 UI primitive files:
`src/components/ui/dialog.tsx`, `tabs.tsx`, `card.tsx`, `select.tsx`, `avatar.tsx`, `tooltip.tsx`, `button.tsx`, `badge.tsx`.
Ensure all exports are declared inline as `export const Component = ...` and individual single-item `export { Component };` statements so both static regex parsers and TypeScript AST parsers recognize all exports cleanly.
Write your handoff report to `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m1_retry_1\handoff.md` and notify the orchestrator.

CRITICAL INTEGRITY CONSTRAINT:
The team must NOT: read test source code to understand expected behaviour before implementing. Only inspect application source code and error outputs.
