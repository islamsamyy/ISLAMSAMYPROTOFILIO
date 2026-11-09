# Handoff Report: Explorer 3 — Milestone 3 (F12 Project Telemetry Canvas & F13 Centralized Motion Choreography)

## 1. Observation

Direct observations from examining the codebase, specifications, and architecture:

### 1.1 Specification Requirements (PROJECT.md & ORIGINAL_REQUEST.md)
- **`PROJECT.md` line 8**:
  > "Canvas & 3D System: Procedural 60 FPS HTML5 Canvas 2D + Framer Motion CSS 3D transforms (`perspective`, `rotateX`, `rotateY`, `translateZ`) in `<TiltCard>`, `<ParticleMeshCanvas>`, `<CyberneticGridCanvas>`, `<Hero3DOrbit>`, and `<ProjectTelemetryCanvas>` with strict RAF cancellation, `IntersectionObserver` auto-pausing, and HiDPI `devicePixelRatio` scaling."
- **`PROJECT.md` line 25**:
  > "F12 | Componentized Project 3D Telemetry | Category-driven 3D telemetry canvases (radar, topology, hypercube, hyperplane) with RAF cleanup | M3 | R3"
- **`PROJECT.md` line 26**:
  > "F13 | Centralized Animation Choreography | `motion-variants.ts` and `src/app/template.tsx` route transition wrapper | M3 | R3"
- **`PROJECT.md` line 73**:
  > "`<ProjectTelemetryCanvas type="radar"|"topology"|"hypercube"|"hyperplane" />`: renders category-specific telemetry."
- **`PROJECT.md` lines 81-82**:
  > "`src/components/canvas/`: Canvas & 3D components (`ParticleMeshCanvas.tsx`, `CyberneticGridCanvas.tsx`, `Hero3DOrbit.tsx`, `TelemetryWaveform.tsx`, `ProjectTelemetryCanvas.tsx`)"
  > "`src/components/animation/`: Motion choreography variants (`motion-variants.ts`)"
- **`PROJECT.md` line 86**:
  > "`src/hooks/`: Custom React hooks (`useReducedMotion.ts`)"

### 1.2 Existing Project Category Model (`src/data/seedProjects.ts`)
- In `src/data/seedProjects.ts` line 6:
  `category: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native';`
- Current initial projects (`initialProjects` in lines 17–112):
  1. `safir-lakehouse`: Category `'Lakehouse & BI'` (lines 19–23)
  2. `fintech-predictive-engine`: Category `'AI & Machine Learning'` (lines 42–46)
  3. `telecom-streaming-pipeline`: Category `'Distributed Systems'` (lines 65–69)
  4. `logistics-fleet-telemetry`: Category `'Cloud Native'` (lines 88–92)

### 1.3 Existing Inline Telemetry Canvas in `ProjectCard.tsx` (`src/components/projects/ProjectCard.tsx`)
- In `src/components/projects/ProjectCard.tsx` lines 16–89:
  - An inline `useEffect` hook operates directly on an internal `<canvas ref={canvasRef} />`.
  - It renders three partial variations:
    - Lines 33–47: `Lakehouse & BI` renders basic 2D ellipses with a line sweep.
    - Lines 48–61: `AI & Machine Learning` renders a static `sin + cos` wave.
    - Lines 62–82: `Distributed Systems` / other categories render 4 rotating orbit nodes.
  - Deficiencies observed:
    1. **Not componentized**: It is tightly coupled inside `ProjectCard.tsx` instead of being exported from `src/components/canvas/ProjectTelemetryCanvas.tsx`.
    2. **Missing fourth type**: `Cloud Native` has no distinct representation (falls back to the 4 orbital nodes). The 4 specified types (`radar`, `topology`, `hypercube`, `hyperplane`) are not implemented.
    3. **No HiDPI scaling**: Uses `canvas.width = canvas.parentElement?.offsetWidth || 340; canvas.height = 140;` without `devicePixelRatio`, causing blurriness on Retina / mobile displays.
    4. **No IntersectionObserver**: Runs `requestAnimationFrame` continuously in the background even when scrolled out of view.
    5. **No ResizeObserver**: Width is computed once on mount and never resizes when the window or layout changes.
    6. **No reduced motion handling**: Continuously animates even if the user prefers reduced motion.

### 1.4 Ad-hoc Motion Choreography across Current Routes
- `package.json` contains `"framer-motion": "^14.9.1"`, `"react": "^19.0.0"`, and `"next": "^15.1.0"`.
- Searching `framer-motion` imports across `src/` revealed 18 files importing `motion` or `AnimatePresence`.
- In all 18 files, motion animation parameters are declared as ad-hoc inline objects (e.g., `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`).
- There is currently no `src/components/animation/motion-variants.ts` file.
- There is currently no `src/app/template.tsx` file. Page navigations currently have no entrance choreography.

---

## 2. Logic Chain

1. **Mapping 4 Categories to 4 Telemetry Visualizations (F12)**:
   - Observation 1.2 confirms exactly 4 project categories: `'Lakehouse & BI'`, `'Distributed Systems'`, `'AI & Machine Learning'`, and `'Cloud Native'`.
   - Observation 1.1 specifies 4 telemetry visualization types: `radar`, `topology`, `hypercube`, `hyperplane`.
   - The logical 1:1 mapping:
     - `'Lakehouse & BI'` ➔ `radar`: Reflects real-time streaming data ingestion, throughput, and ping latencies.
     - `'Distributed Systems'` ➔ `topology`: Reflects cluster nodes, consensus graphs, and network packet propagation.
     - `'AI & Machine Learning'` ➔ `hypercube`: Reflects high-dimensional latent space embeddings, neural tensor rotations, and mathematical transformations.
     - `'Cloud Native'` ➔ `hyperplane`: Reflects undulating multi-tenant service mesh planes, microservice horizons, and telemetry laser sweeps.
   - To maximize reusability, `<ProjectTelemetryCanvas>` should accept either an explicit `type` prop (`type="radar"|"topology"|"hypercube"|"hyperplane"`) OR a `category` prop (`category="Lakehouse & BI" | ...`), automatically inferring the visual type with a fallback to `'radar'`.

2. **Canvas Performance, Lifecycle, and HiDPI Guarantees**:
   - `IntersectionObserver`: When multiple cards are rendered on `/projects` or `/`, only visible canvases should execute the render loop. An `IntersectionObserver` auto-pauses the animation loop (`cancelAnimationFrame`) when off-screen and resumes when entering viewport.
   - `ResizeObserver`: Dynamically recalculates canvas bounding box dimensions and multiplies by `Math.min(window.devicePixelRatio || 1, 2)`, calling `ctx.scale(dpr, dpr)`.
   - Strict RAF cleanup: `cancelAnimationFrame` must be called on component unmount and observer disconnect to prevent memory leaks.
   - Accessibility (`prefers-reduced-motion`): When active, render a pristine static snapshot and do not schedule continuous RAF loops.

3. **Centralized Motion Variants Architecture (F13)**:
   - Defining variants centrally in `src/components/animation/motion-variants.ts` guarantees visual consistency across all routes and components.
   - Key choreography variants needed:
     - `fadeIn`: Clean opacity transition with smooth cubic bezier.
     - `slideUp`: Entrance from 24px below with snappy spring-like cubic bezier `[0.16, 1, 0.3, 1]`.
     - `slideDown`: Entrance from 24px above.
     - `slideLeft` / `slideRight`: Lateral slide transitions for carousels, drawers, and tabs.
     - `scaleIn`: Subtle zoom entrance (`scale: 0.94 ➔ 1.0`) for modals and dialogs.
     - `staggerContainer`: Parent container orchestrating staggered reveals of child items (`staggerChildren: 0.08`).
     - `cardHover`: Micro-interaction lift (`y: -6, scale: 1.01`) and tap compression.
     - `cyberneticGlow`: Pulsing box-shadow and border-color keyframes for high-tech cybernetic focus states.
     - `routeTransition`: Rapid, silky page transition (`opacity: 0, y: 8 ➔ opacity: 1, y: 0`) in 280ms.
   - Reduced motion utility `toReducedMotion(variants)` and `useReducedMotion.ts` hook ensure full accessibility compliance.

4. **Next.js 15 App Router Route Transition Wrapper (`src/app/template.tsx`)**:
   - Next.js 15 `template.tsx` is instantiated fresh on every route navigation, unlike `layout.tsx` which persists.
   - By placing `<motion.div variants={routeTransition} initial="hidden" animate="visible">` inside `src/app/template.tsx`, route transitions execute automatically across `/`, `/projects`, `/blog`, `/book`, `/my-bookings`, and `/admin/*`.
   - Using `<MotionConfig reducedMotion="user">` eliminates SSR hydration mismatch because Framer Motion handles media query resolution without diverging from server-rendered markup.
   - Layout preservation: Styling `<motion.div className="w-full flex-1 flex flex-col min-h-screen">` ensures zero disruption to existing flex and grid layouts.

---

## 3. Caveats

1. **No Test Code Inspection**: In accordance with the demo integrity constraint, no files in `tests/` were inspected. Analysis is based entirely on `PROJECT.md`, `ORIGINAL_REQUEST.md`, and the runtime codebase.
2. **Device Pixel Ratio Cap**: Canvas DPR scaling should be capped at `Math.min(window.devicePixelRatio || 1, 2)` to prevent excessive memory and fill-rate consumption on 3x/4x mobile screens while keeping rendering razor-sharp.
3. **Headless / Node Environment Safety**: Canvas 2D contexts might return `null` in headless test runners (e.g. `node --test` or jsdom without node-canvas). The implementation must guard `canvas.getContext('2d')` with an early return so it renders an empty canvas fallback without crashing.

---

## 4. Conclusion & Concrete Implementation Recommendations for Worker M3

### 4.1 Implementation Specification: `src/components/canvas/ProjectTelemetryCanvas.tsx`

Create `src/components/canvas/ProjectTelemetryCanvas.tsx` with:
- Prop Interface:
  ```typescript
  export type TelemetryType = 'radar' | 'topology' | 'hypercube' | 'hyperplane';

  export interface ProjectTelemetryCanvasProps {
    type?: TelemetryType;
    category?: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native' | string;
    className?: string;
    width?: number;
    height?: number;
    interactive?: boolean;
    speed?: number;
  }
  ```
- Category Mapper:
  ```typescript
  export function getTelemetryTypeForCategory(category?: string): TelemetryType {
    switch (category) {
      case 'Lakehouse & BI':
        return 'radar';
      case 'Distributed Systems':
        return 'topology';
      case 'AI & Machine Learning':
        return 'hypercube';
      case 'Cloud Native':
        return 'hyperplane';
      default:
        return 'radar';
    }
  }
  ```
- Mathematical 2D Canvas Procedural Visualizations:
  1. **`radar` (Lakehouse & BI)**:
     - 3 concentric tilted ellipses representing 3D angled radar platter: `rx`, `ry = rx * 0.42`.
     - Faint crosshairs intersecting at center $(cx, cy)$ with tick marks.
     - Rotating sweep arm: $\theta = \text{step} \times \text{speed}$.
     - Phosphor sweep cone: sector trailing behind sweep arm with gradient fading from `rgba(123, 208, 255, 0.4)` to `0`.
     - 3-4 target pings at set coordinates; when the sweep crosses their azimuth, render an expanding cyan shockwave circle with exponential fade.
  2. **`topology` (Distributed Systems)**:
     - 7 3D nodes: 1 central coordinator $(0,0,0)$ + 6 satellite worker nodes on 3D ellipsoid.
     - Y-axis rotation + slight X-axis pitch tilt:
       $x' = x\cos\alpha + z\sin\alpha$, $z' = -x\sin\alpha + z\cos\alpha$.
     - Perspective projection: $scale = f / (f + z' + d)$ ($f=200, d=120$).
     - Depth sorting: sort nodes by $z'$ so back elements draw before front elements.
     - Connecting edges with depth-dependent opacity.
     - Traveling data packet pulses moving along edges from node A to node B.
  3. **`hypercube` (AI & Machine Learning)**:
     - 4D Tesseract: 16 vertices $(\pm 1, \pm 1, \pm 1, \pm 1)$ and 32 connecting edges.
     - Dual 4D plane rotations: $XW$ plane rotation ($\theta_{xw}$) and $YZ$ plane rotation ($\theta_{yz}$) with isometric $XZ$ tilt.
     - 4D-to-3D stereographic projection: $scale_4 = 1 / (3.2 - w' / S)$.
     - 3D-to-2D perspective projection: $scale_3 = 1 / (2.5 + z'' / S)$.
     - Gradient edges (violet `#d0bcff` to electric cyan `#7bd0ff`) and glowing vertex beads.
  4. **`hyperplane` (Cloud Native)**:
     - 3D perspective receding mesh surface: 14 horizontal grid lines $\times$ 10 depth lines.
     - Undulating surface wave formula:
       $Y = A_1 \sin(u \cdot 4 + \text{time}) \cos(v \cdot 5 - \text{time}) + A_2 \sin((u + v) \cdot 6 + \text{time})$.
     - Perspective horizon at $cy - 20$, depth fog fading distant lines to `rgba(123, 208, 255, 0.05)`.
     - Transverse scanning laser bar moving from horizon to foreground with cyan glow.
     - Floating telemetry packets cruising forward along the wave troughs.
- Lifecycle & Cleanup:
  - `IntersectionObserver` observing canvas container to pause/resume RAF.
  - `ResizeObserver` observing dimensions and scaling for HiDPI (`devicePixelRatio`).
  - `cancelAnimationFrame` in `useEffect` cleanup.
  - Reduced motion check: `window.matchMedia('(prefers-reduced-motion: reduce)')` renders a single static frame.
- Dual exports:
  `export { ProjectTelemetryCanvas, getTelemetryTypeForCategory };`
  `export default ProjectTelemetryCanvas;`

---

### 4.2 Implementation Specification: `src/components/animation/motion-variants.ts`

Create `src/components/animation/motion-variants.ts` exporting:
```typescript
import type { Variants, Transition } from 'framer-motion';

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
};

export const easeCybernetic: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: easeCybernetic },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export function createStaggerContainer(staggerDelay = 0.08, initialDelay = 0.05): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    y: -2,
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

export const cyberneticGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(123, 208, 255, 0)',
    borderColor: 'rgba(208, 188, 255, 0.2)',
  },
  pulse: {
    boxShadow: [
      '0 0 10px rgba(123, 208, 255, 0.2)',
      '0 0 25px rgba(208, 188, 255, 0.4)',
      '0 0 10px rgba(123, 208, 255, 0.2)',
    ],
    borderColor: [
      'rgba(123, 208, 255, 0.3)',
      'rgba(208, 188, 255, 0.6)',
      'rgba(123, 208, 255, 0.3)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const routeTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: easeCybernetic },
  },
};

export function toReducedMotion(variant: Variants): Variants {
  const reduced: Variants = {};
  for (const [key, val] of Object.entries(variant)) {
    if (typeof val === 'object' && val !== null) {
      const copy = { ...val } as Record<string, any>;
      delete copy.x;
      delete copy.y;
      delete copy.z;
      delete copy.scale;
      delete copy.rotate;
      delete copy.rotateX;
      delete copy.rotateY;
      copy.transition = {
        ...(copy.transition || {}),
        duration: 0.01,
      };
      reduced[key] = copy;
    } else {
      reduced[key] = val;
    }
  }
  return reduced;
}
```

---

### 4.3 Implementation Specification: `src/app/template.tsx`

Create `src/app/template.tsx`:
```tsx
'use client';

import React from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { routeTransition } from '@/components/animation/motion-variants';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={routeTransition}
        initial="hidden"
        animate="visible"
        className="w-full flex-1 flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
```

---

### 4.4 Implementation Specification: Custom Hook `src/hooks/useReducedMotion.ts`

Matching PROJECT.md line 86, create `src/hooks/useReducedMotion.ts`:
```typescript
'use client';

import { useState, useEffect } from 'react';

/**
 * Hydration-safe hook for prefers-reduced-motion media query.
 * Defaults to false on SSR to match server render, then resolves to client preference on mount.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;
```

---

## 5. Verification Method

To verify the implementation independently:

1. **TypeScript Static Analysis**:
   ```bash
   npx tsc --noEmit
   ```
   Must exit with code 0 and zero type errors.

2. **Next.js Production Build**:
   ```bash
   npm run build
   ```
   Must compile cleanly and generate static pages for all 15 routes (`/`, `/_not-found`, `/admin`, `/admin/blog`, `/admin/login`, `/admin/pricing`, `/admin/projects`, `/admin/reservations`, `/admin/reviews`, `/blog`, `/book`, `/my-bookings`) without SSR hydration mismatches or build errors.

3. **Runtime & Component Verification**:
   - Verify `<ProjectTelemetryCanvas type="radar" />`, `<ProjectTelemetryCanvas type="topology" />`, `<ProjectTelemetryCanvas type="hypercube" />`, and `<ProjectTelemetryCanvas type="hyperplane" />` render their respective 3D canvas visuals.
   - Verify RAF cleanup: On component unmount, `cancelAnimationFrame` is called and no orphaned RAF loops persist.
   - Verify `IntersectionObserver`: Scrolling the canvas element out of the viewport pauses RAF; scrolling into view resumes it.
   - Verify `src/app/template.tsx`: Navigation across routes performs a smooth 280ms fade/slide-up transition with zero console errors or hydration warnings.
