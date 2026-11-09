## 2026-11-05T22:49:36Z
You are Worker M3 for Milestone 3 (Interactive 3D & Canvas Effects and Motion Choreography).

Working Directory: c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m3_1
Mandatory reading: Read c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md and c:\Users\Eslam\Desktop\islamweb\PROJECT.md before doing any work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

INTEGRITY CONSTRAINT:
Integrity mode is demo. You must NOT read test source code (e.g. files in tests/) to understand expected behavior before implementing. Implement genuine functionality based on user requirements, specs, and Explorer blueprints.

Detailed Blueprints to Read:
1. c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m3_1\handoff.md
2. c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m3_2\handoff.md (and proposed files in that directory)
3. c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_explorer_m3_3\handoff.md

Your Exclusive File Ownership:
- src/hooks/useReducedMotion.ts
- src/components/canvas/ParticleMeshCanvas.tsx
- src/components/canvas/CyberneticGridCanvas.tsx
- src/components/canvas/Hero3DOrbit.tsx
- src/components/ui/TiltCard.tsx
- src/components/canvas/ProjectTelemetryCanvas.tsx
- src/components/animation/motion-variants.ts
- src/app/template.tsx
- In src/app/page.tsx: cleanly integrate Hero3DOrbit and remove/replace the legacy uncancelled canvas RAF loop at lines 389-416.

Tasks:
1. Create src/hooks/useReducedMotion.ts (SSR-safe, WCAG compliant).
2. Create src/components/canvas/ParticleMeshCanvas.tsx (HiDPI DPR scaling, RAF lifecycle cleanup, cursor proximity interaction, IntersectionObserver auto-pausing, reduced motion static frame).
3. Create src/components/canvas/CyberneticGridCanvas.tsx (3D perspective horizon grid, scanline pulse, cursor parallax, RAF cleanup, DPR scaling, IntersectionObserver auto-pausing).
4. Create src/components/canvas/Hero3DOrbit.tsx (4 concentric 3D orbital rings with Euler angle perspective projection, orbiting satellites, cursor-reactive parallax lerp, RAF cleanup, DPR scaling, IntersectionObserver auto-pausing).
5. Create src/components/ui/TiltCard.tsx (Universal 3D tilt card primitive, maxTilt, glare, depth, mouse move tracking, specular sheen, exit reset, touch bypass, reduced motion fallback, forwardRef).
6. Create src/components/canvas/ProjectTelemetryCanvas.tsx (Category-driven 3D telemetry canvases for 'radar', 'topology', 'hypercube', 'hyperplane', RAF cleanup, DPR scaling, IntersectionObserver auto-pausing).
7. Create src/components/animation/motion-variants.ts (centralized Framer Motion choreography variants: fadeIn, slideUp, slideDown, slideLeft, slideRight, scaleIn, staggerContainer, cardHover, cyberneticGlow, routeTransition, modalBackdrop, modalContent, toReducedMotion).
8. Create src/app/template.tsx (Route transition wrapper using Framer Motion routeTransition and MotionConfig reducedMotion="user").
9. Cleanly integrate Hero3DOrbit into src/app/page.tsx, removing the legacy uncancelled hero canvas RAF loop.

Verification Commands:
- Run `npx tsc --noEmit` and ensure 0 errors.
- Run `npm test` and ensure all tests pass.
- Run `npm run build` and ensure clean compilation and prerendering of all 15 static routes (if any file lock on .next occurs, terminate stale node processes first).

Output:
- Write comprehensive handoff report to c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\teamwork_worker_m3_1\handoff.md with verification commands and outputs.
- Send completion message to orchestrator via send_message when done.
