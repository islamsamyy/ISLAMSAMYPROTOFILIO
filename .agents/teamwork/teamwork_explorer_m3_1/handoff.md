# Handoff Report: Explorer M3-1
**Milestone**: M3 (Interactive 3D & Canvas Effects and Motion Choreography)
**Scope**: Feature F8 (Interactive Particle Mesh Canvas) & Feature F9 (Cybernetic Grid Canvas)
**Target Files**:
- `src/components/canvas/ParticleMeshCanvas.tsx`
- `src/components/canvas/CyberneticGridCanvas.tsx`
- `src/hooks/useReducedMotion.ts`

---

## 1. Observation

1. **Missing Directory & Files**:
   - `find_by_name` in `src/components` showed that `src/components/canvas/` does not yet exist.
   - Neither `src/components/canvas/ParticleMeshCanvas.tsx` nor `src/components/canvas/CyberneticGridCanvas.tsx` has been created.
   - `src/hooks/useReducedMotion.ts` does not yet exist.

2. **Existing Canvas Anti-Patterns in `src/app/page.tsx`**:
   - In `src/app/page.tsx` (lines 28-222), there were legacy procedural 2D canvas routines (`drawRadar`, `drawMesh`, `drawCube`, `drawPlane`) directly querying DOM IDs (`project-3d-safir`, `project-3d-sotex`, `project-3d-sales`, `project-3d-cancer`).
   - Lines 36-65, 76-113, 133-163, and 174-213 run `requestAnimationFrame(...)` loops **without any cancellation or cleanup on unmount**.
   - Canvas resolution handling was naive:
     ```ts
     let w = c1.width = c1.clientWidth || 300;
     let h = c1.height = c1.clientHeight || 144;
     ```
     There was **zero HiDPI / `devicePixelRatio` scaling**, causing blurry rendering on Retina/mobile displays.
   - There was **no `ResizeObserver`** (canvases do not adjust when window or parent cards resize).
   - There was **no `IntersectionObserver`** (canvases loop continuously at 60 FPS even when scrolled off-screen, causing high battery drain and unnecessary GPU/CPU workload).
   - There was **no reduced motion integration** for those canvases.

3. **Contract Specifications in `PROJECT.md`**:
   - Line 8:
     > "Procedural 60 FPS HTML5 Canvas 2D + Framer Motion CSS 3D transforms (`perspective`, `rotateX`, `rotateY`, `translateZ`) in `<TiltCard>`, `<ParticleMeshCanvas>`, `<CyberneticGridCanvas>`, `<Hero3DOrbit>`, and `<ProjectTelemetryCanvas>` with strict RAF cancellation, `IntersectionObserver` auto-pausing, and HiDPI `devicePixelRatio` scaling."
   - Line 21:
     > "F8 | Interactive Particle Mesh Canvas | Interactive interconnected nodes with distance linking lines and cursor proximity interaction | M3 | R3"
   - Line 22:
     > "F9 | Cybernetic Grid Canvas | 3D perspective receding digital horizon grid with pulsing scanlines | M3 | R3"
   - Line 71:
     > "`<ParticleMeshCanvas particleCount={75} interactive={true} className="..." />`: renders interactive node mesh with canvas RAF cleanup."
   - Line 74:
     > "`<CyberneticGridCanvas horizonY={0.65} className="..." />`: renders cybernetic horizon grid."
   - Line 81:
     > "`src/components/canvas/`: Canvas & 3D components (`ParticleMeshCanvas.tsx`, `CyberneticGridCanvas.tsx`, `Hero3DOrbit.tsx`, `TelemetryWaveform.tsx`, `ProjectTelemetryCanvas.tsx`)"
   - Line 86:
     > "`src/hooks/`: Custom React hooks (`useReducedMotion.ts`)"

4. **Theme Architecture in `src/components/theme/ThemeProvider.tsx`**:
   - Lines 51-58 of `ThemeProvider.tsx` dispatch a custom `islam_theme_change` window event with `detail: { theme, resolvedTheme }`.
   - `useTheme()` hook provides `{ theme, resolvedTheme, setTheme, toggleTheme, mounted }`.
   - Dark mode colors: Primary `#d0bcff` (`rgb(208 188 255)`), Secondary `#7bd0ff` (`rgb(123 208 255)`), Tertiary `#ffb690` (`rgb(255 182 144)`), Background `#111319` (`rgb(17 19 25)`).
   - Light mode colors: Primary `#6626e2` (`rgb(102 38 226)`), Secondary `#00658b` (`rgb(0 101 139)`), Background `#f8f9fd` (`rgb(248 249 253)`).

---

## 2. Logic Chain

1. **HiDPI Scaling Logic**:
   - From Observation 2 & 3, raw canvas dimensions match CSS pixels 1:1 by default. On High-DPI screens (`devicePixelRatio >= 2`), lines appear fuzzy and pixelated.
   - Therefore, the canvas must calculate `dpr = Math.min(window.devicePixelRatio || 1, 2)`. Setting `canvas.width = Math.round(width * dpr)`, `canvas.height = Math.round(height * dpr)`, and `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` ensures crisp, razor-sharp vector line graphics across Retina and 4K displays while capping memory usage at 2x.

2. **Lifecycle & Resource Management Logic**:
   - From Observation 2 & 3, orphaned RAF loops cause memory leaks and frame stuttering.
   - Every canvas component must maintain a `animFrameIdRef = useRef<number | null>(null)`.
   - In `useEffect` cleanup, `if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)` must be called.
   - An `IntersectionObserver` must observe the canvas element with a threshold (e.g. `0.05`): when off-screen (`!entry.isIntersecting`), it must cancel the RAF loop and sleep; when entering viewport, it resumes smoothly.
   - A `ResizeObserver` must observe the canvas bounding box to re-compute DPR and buffer dimensions dynamically.

3. **Feature F8 (ParticleMeshCanvas) Physics & Interaction Logic**:
   - For $N$ particles ($N=75$ by default), each particle has position $(x, y)$, velocity $(v_x, v_y)$, radius ($1.2 - 2.5$px), base alpha ($0.25 - 0.75$), and pulse phase.
   - Boundary collisions: gentle velocity reflections ($v_x = -v_x$ when $x < 0$ or $x > W$).
   - Inter-particle connection: For every pair $(p_i, p_j)$ where distance $d < \text{maxDistance}$ ($120$px), draw a line with stroke opacity $\propto (1 - d/\text{maxDistance})^2$.
   - Cursor proximity ($R=150$px):
     - When cursor is active and within $R$ of a particle, draw a bright cyan connector line from particle to cursor.
     - Apply a subtle kinetic repulsion force $\propto (1 - d/R)$ to prevent particle clumping under the cursor.
     - Temporarily swell the particle's radius and brightness.

4. **Feature F9 (CyberneticGridCanvas) 3D Projection Logic**:
   - Digital horizon line at $Y_h = H \times \text{horizonY}$ ($0.65$ by default).
   - Vanishing point $(V_x, V_y)$ initialized at $(W \times 0.5, Y_h)$, with smooth cursor parallax offset: $V_x \leftarrow V_x + (M_x - W/2) \times 0.06$.
   - Perspective longitudinal lines: radiate outward from $(V_x, V_y)$ down to bottom edge $Y = H$, with gradient fading from faint near the horizon to bright at the viewport bottom.
   - Receding transverse lines: forward movement driven by `scrollOffset = (scrollOffset + speed * delta) % 1.0`. Cubic foreshortening $z = t^3$ maps linear progression to non-linear perspective spacing, dense at the horizon and wide at the bottom.
   - Scanline sweep: a traveling laser beam $(Y_{scan} = (time \times 80) \pmod H)$ with gradient glow plus CRT micro-scanline horizontal strokes.
   - Horizon bloom: radial gradient glow centered at the vanishing point.

5. **Accessibility (`useReducedMotion`) Logic**:
   - From Observation 1 & 3, users with vestibular disorders should not be subjected to perpetual movement.
   - Implement `src/hooks/useReducedMotion.ts` using `window.matchMedia('(prefers-reduced-motion: reduce)')`.
   - When active, canvases must cancel continuous RAF looping and render a single static, beautifully composed frame.

---

## 3. Caveats

- **Canvas 2D Context in Testing / Node.js**:
  In headless Node.js or jsdom environments without `jest-canvas-mock`, `HTMLCanvasElement.prototype.getContext('2d')` may return `null` or mock stubs. All canvas code must defensively check `if (!ctx) return;` and gracefully handle missing `ResizeObserver` or `IntersectionObserver` with fallback guards (`typeof window !== 'undefined' && 'ResizeObserver' in window`).
- **Device Pixel Ratio Cap**:
  We recommend capping `dpr` at `2` (`Math.min(window.devicePixelRatio || 1, 2)`). Higher DPRs (such as 3x on mobile OLED screens) yield negligible visual improvement for 2D line meshes while quadrupling fill-rate and memory.
- **SSR Hydration**:
  Canvas elements must have `'use client'` at the top of their component files and defer all DOM/canvas operations until after initial mount (`useEffect`).

---

## 4. Conclusion & Technical Implementation Blueprints

Worker M3 should implement three files:
1. `src/hooks/useReducedMotion.ts`
2. `src/components/canvas/ParticleMeshCanvas.tsx`
3. `src/components/canvas/CyberneticGridCanvas.tsx`

Below are the exact code blueprints for Worker M3.

### 4.1. Blueprint: `src/hooks/useReducedMotion.ts`

```tsx
'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user has requested reduced motion via operating system settings.
 * WCAG 2.1 Success Criterion 2.2.2 and 2.3.3 compliant.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

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

### 4.2. Blueprint: `src/components/canvas/ParticleMeshCanvas.tsx`

```tsx
'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';

export interface ParticleMeshCanvasProps {
  /** Number of particles in the mesh. Default: 75 */
  particleCount?: number;
  /** Max distance between particles to connect with a line. Default: 120 */
  maxDistance?: number;
  /** Radius around mouse for cursor interaction in px. Default: 150 */
  cursorRadius?: number;
  /** Whether mouse/touch proximity interaction is active. Default: true */
  interactive?: boolean;
  /** Particle movement speed multiplier. Default: 0.6 */
  speed?: number;
  /** Custom CSS classes for the canvas */
  className?: string;
  /** Theme override ('dark' | 'light'). Defaults to resolvedTheme */
  theme?: 'dark' | 'light';
  /** Optional custom node color in rgba or hex */
  nodeColor?: string;
  /** Optional custom line color in rgba or hex */
  lineColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  pulseSpeed: number;
}

export function ParticleMeshCanvas({
  particleCount = 75,
  maxDistance = 120,
  cursorRadius = 150,
  interactive = true,
  speed = 0.6,
  className,
  theme: themeOverride,
  nodeColor,
  lineColor,
}: ParticleMeshCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const prefersReducedMotion = useReducedMotion();
  const themeContext = useTheme();
  const activeTheme = themeOverride || themeContext?.resolvedTheme || 'dark';
  const isDark = activeTheme === 'dark';

  // Initialize particles
  const initParticles = useCallback((w: number, h: number) => {
    const list: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = (0.2 + Math.random() * 0.4) * speed;
      const rad = 1.2 + Math.random() * 1.8;
      const alpha = 0.25 + Math.random() * 0.5;
      list.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        radius: rad,
        baseRadius: rad,
        alpha,
        baseAlpha: alpha,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      });
    }
    particlesRef.current = list;
  }, [particleCount, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || canvas.clientWidth || 300;
      height = rect.height || canvas.clientHeight || 150;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      } else {
        // Adjust out-of-bounds particles on resize
        particlesRef.current.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    updateDimensions();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          updateDimensions();
          if (prefersReducedMotion) drawStaticFrame();
        })
      : null;
    resizeObserver?.observe(canvas);

    // Color definitions
    const primaryNode = nodeColor || (isDark ? '123, 208, 255' : '0, 101, 139');
    const primaryLine = lineColor || (isDark ? '208, 188, 255' : '102, 38, 226');

    // Drawing routine
    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      if (animate) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.pulseSpeed;

          // Boundary bouncing
          if (p.x <= 0) { p.x = 0; p.vx = -p.vx; }
          else if (p.x >= width) { p.x = width; p.vx = -p.vx; }
          if (p.y <= 0) { p.y = 0; p.vy = -p.vy; }
          else if (p.y >= height) { p.y = height; p.vy = -p.vy; }

          // Cursor proximity
          if (interactive && mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < cursorRadius && dist > 0) {
              const force = (1 - dist / cursorRadius) * 0.9;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
              p.radius = p.baseRadius * (1 + (1 - dist / cursorRadius) * 0.8);
              p.alpha = Math.min(1, p.baseAlpha + (1 - dist / cursorRadius) * 0.5);
            } else {
              p.radius = p.baseRadius;
              p.alpha = p.baseAlpha;
            }
          }
        }
      }

      // Draw inter-particle lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const ratio = 1 - dist / maxDistance;
            const alpha = ratio * ratio * (isDark ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${primaryLine}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw cursor connection lines
      if (interactive && mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < cursorRadius) {
            const ratio = 1 - dist / cursorRadius;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${primaryNode}, ${ratio * 0.6})`;
            ctx.lineWidth = ratio * 1.4;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryNode}, ${p.alpha})`;
        if (isDark && p.alpha > 0.4) {
          ctx.shadowColor = '#7bd0ff';
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawStaticFrame = () => draw(false);

    // Continuous Animation loop
    const renderLoop = () => {
      if (!isVisibleRef.current) return;
      draw(true);
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    const startAnimation = () => {
      if (animFrameIdRef.current === null && isVisibleRef.current && !prefersReducedMotion) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const stopAnimation = () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    // IntersectionObserver for auto-pausing off-screen
    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          isVisibleRef.current = entry ? entry.isIntersecting : true;
          if (isVisibleRef.current) {
            startAnimation();
          } else {
            stopAnimation();
          }
        }, { threshold: 0.05 })
      : null;
    intersectionObserver?.observe(canvas);

    if (prefersReducedMotion) {
      stopAnimation();
      drawStaticFrame();
    } else {
      startAnimation();
    }

    return () => {
      stopAnimation();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [
    initParticles,
    particleCount,
    maxDistance,
    cursorRadius,
    interactive,
    speed,
    prefersReducedMotion,
    isDark,
    nodeColor,
    lineColor,
  ]);

  // Pointer event listeners
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className={cn('block w-full h-full pointer-events-auto', className)}
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}

export default ParticleMeshCanvas;
```

---

### 4.3. Blueprint: `src/components/canvas/CyberneticGridCanvas.tsx`

```tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';

export interface CyberneticGridCanvasProps {
  /** Relative position of the horizon line (0.0 to 1.0). Default: 0.65 */
  horizonY?: number;
  /** Speed of grid forward scroll. Default: 0.8 */
  speed?: number;
  /** Spacing between vertical perspective lines at bottom edge in px. Default: 45 */
  gridSpacing?: number;
  /** Vanishing point horizontal center (0.0 to 1.0). Default: 0.5 */
  vanishingPointX?: number;
  /** Whether scanline pulse overlay is enabled. Default: true */
  scanlines?: boolean;
  /** Speed of the traveling scanline beam. Default: 1.2 */
  scanlineSpeed?: number;
  /** Interactive mouse parallax tilt. Default: true */
  interactive?: boolean;
  /** Custom CSS classes for the canvas */
  className?: string;
  /** Theme override ('dark' | 'light'). Defaults to resolvedTheme */
  theme?: 'dark' | 'light';
}

export function CyberneticGridCanvas({
  horizonY = 0.65,
  speed = 0.8,
  gridSpacing = 45,
  vanishingPointX = 0.5,
  scanlines = true,
  scanlineSpeed = 1.2,
  interactive = true,
  className,
  theme: themeOverride,
}: CyberneticGridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const prefersReducedMotion = useReducedMotion();
  const themeContext = useTheme();
  const activeTheme = themeOverride || themeContext?.resolvedTheme || 'dark';
  const isDark = activeTheme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scrollOffset = 0;
    let scanlineY = 0;

    let currentVpX = 0;
    let currentVpY = 0;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || canvas.clientWidth || 400;
      height = rect.height || canvas.clientHeight || 250;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      currentVpX = width * vanishingPointX;
      currentVpY = height * horizonY;
      mouseRef.current = { x: width * 0.5, y: height * 0.5 };
    };

    updateDimensions();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          updateDimensions();
          if (prefersReducedMotion) draw(false);
        })
      : null;
    resizeObserver?.observe(canvas);

    // Color palette
    const cyan = isDark ? '123, 208, 255' : '0, 101, 139';
    const purple = isDark ? '208, 188, 255' : '102, 38, 226';

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      if (interactive && animate) {
        const targetVpX = width * vanishingPointX + (mouseRef.current.x - width * 0.5) * 0.08;
        const targetVpY = height * horizonY + (mouseRef.current.y - height * 0.5) * 0.04;
        currentVpX += (targetVpX - currentVpX) * 0.05;
        currentVpY += (targetVpY - currentVpY) * 0.05;
      } else {
        currentVpX = width * vanishingPointX;
        currentVpY = height * horizonY;
      }

      if (animate) {
        scrollOffset = (scrollOffset + speed * 0.006) % 1.0;
        scanlineY = (scanlineY + scanlineSpeed * 1.5) % height;
      }

      // 1. Horizon Atmospheric Glow Bloom
      const bloom = ctx.createRadialGradient(
        currentVpX, currentVpY, 2,
        currentVpX, currentVpY, width * 0.65
      );
      bloom.addColorStop(0, isDark ? `rgba(${purple}, 0.35)` : `rgba(${purple}, 0.2)`);
      bloom.addColorStop(0.35, isDark ? `rgba(${cyan}, 0.15)` : `rgba(${cyan}, 0.08)`);
      bloom.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);

      // 2. Horizon Line Neon Beam
      ctx.beginPath();
      ctx.moveTo(0, currentVpY);
      ctx.lineTo(width, currentVpY);
      ctx.strokeStyle = isDark ? `rgba(${purple}, 0.85)` : `rgba(${purple}, 0.7)`;
      ctx.lineWidth = 1.6;
      if (isDark) {
        ctx.shadowColor = '#d0bcff';
        ctx.shadowBlur = 8;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Perspective Longitudinal (Vertical) Lines
      const numLines = Math.ceil((width * 2) / gridSpacing);
      const startX = currentVpX - (numLines / 2) * gridSpacing;

      for (let i = 0; i <= numLines; i++) {
        const bottomX = startX + i * gridSpacing;
        const grad = ctx.createLinearGradient(currentVpX, currentVpY, bottomX, height);
        grad.addColorStop(0, `rgba(${cyan}, 0.03)`);
        grad.addColorStop(0.4, `rgba(${cyan}, 0.25)`);
        grad.addColorStop(1, `rgba(${cyan}, 0.65)`);

        ctx.beginPath();
        ctx.moveTo(currentVpX, currentVpY);
        ctx.lineTo(bottomX, height);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 4. Perspective Transverse (Horizontal) Receding Lines
      const horizontalLineCount = 20;
      for (let i = 0; i < horizontalLineCount; i++) {
        // Perspective foreshortening: non-linear power curve
        const progress = ((i + scrollOffset) / horizontalLineCount) % 1.0;
        const z = Math.pow(progress, 2.5); // cubic-quadratic compression
        const y = currentVpY + (height - currentVpY) * z;

        if (y > currentVpY && y <= height) {
          const alpha = z * (isDark ? 0.75 : 0.6);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = `rgba(${purple}, ${alpha})`;
          ctx.lineWidth = 0.6 + z * 1.5;
          ctx.stroke();
        }
      }

      // 5. Pulsing Scanlines & CRT HUD beam
      if (scanlines) {
        // Static CRT scanlines
        ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.03)';
        for (let y = 0; y < height; y += 3) {
          ctx.fillRect(0, y, width, 1);
        }

        // Active sweeping scanline pulse beam
        if (animate) {
          const scanGrad = ctx.createLinearGradient(0, scanlineY - 25, 0, scanlineY + 25);
          scanGrad.addColorStop(0, 'rgba(123, 208, 255, 0)');
          scanGrad.addColorStop(0.5, isDark ? `rgba(${cyan}, 0.18)` : `rgba(${cyan}, 0.12)`);
          scanGrad.addColorStop(1, 'rgba(123, 208, 255, 0)');
          ctx.fillStyle = scanGrad;
          ctx.fillRect(0, Math.max(0, scanlineY - 25), width, 50);
        }
      }
    };

    const renderLoop = () => {
      if (!isVisibleRef.current) return;
      draw(true);
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    const startAnimation = () => {
      if (animFrameIdRef.current === null && isVisibleRef.current && !prefersReducedMotion) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const stopAnimation = () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          isVisibleRef.current = entry ? entry.isIntersecting : true;
          if (isVisibleRef.current) {
            startAnimation();
          } else {
            stopAnimation();
          }
        }, { threshold: 0.05 })
      : null;
    intersectionObserver?.observe(canvas);

    if (prefersReducedMotion) {
      stopAnimation();
      draw(false);
    } else {
      startAnimation();
    }

    return () => {
      stopAnimation();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [
    horizonY,
    speed,
    gridSpacing,
    vanishingPointX,
    scanlines,
    scanlineSpeed,
    interactive,
    prefersReducedMotion,
    isDark,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      className={cn('block w-full h-full pointer-events-auto', className)}
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}

export default CyberneticGridCanvas;
```

---

## 5. Verification Method

Once Worker M3 writes the files, the team can independently verify the implementation as follows:

1. **Static Type Checking & Build Verification**:
   ```powershell
   npm run build
   ```
   Must pass with zero TypeScript errors and zero build failures.

2. **Prop & Contract Verification**:
   - Inspect `src/components/canvas/ParticleMeshCanvas.tsx`: verify export of `ParticleMeshCanvas` and `export default ParticleMeshCanvas`, supporting `particleCount={75}`, `interactive={true}`, `className="..."`.
   - Inspect `src/components/canvas/CyberneticGridCanvas.tsx`: verify export of `CyberneticGridCanvas` and `export default CyberneticGridCanvas`, supporting `horizonY={0.65}`, `className="..."`.
   - Inspect `src/hooks/useReducedMotion.ts`: verify export of `useReducedMotion` and `export default useReducedMotion`.

3. **Lifecycle & Memory Leak Verification**:
   - Inspect cleanup functions in both canvas components:
     - `cancelAnimationFrame(animFrameIdRef.current)` must execute on unmount.
     - `resizeObserver.disconnect()` must execute on unmount.
     - `intersectionObserver.disconnect()` must execute on unmount.
   - Verify DPR scaling: `canvas.width = Math.round(width * dpr)`, `canvas.height = Math.round(height * dpr)`, `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`.

4. **Accessibility Verification**:
   - When `prefers-reduced-motion` is simulated or enabled in browser emulation (`Emulate CSS media feature prefers-reduced-motion: reduce`), the canvas must render a single static frame without running a continuous RAF loop.

5. **Invalidation Conditions**:
   - If `ParticleMeshCanvas` or `CyberneticGridCanvas` lack named or default exports matching `PROJECT.md`.
   - If RAF loops run indefinitely without cleanup on component unmount.
   - If HiDPI scaling is missing, resulting in blurred canvas pixels on High-DPI screens.
