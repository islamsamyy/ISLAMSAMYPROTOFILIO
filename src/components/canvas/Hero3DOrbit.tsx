'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Hero3DOrbitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size in pixels (width & height). Default: 460 */
  size?: number;
  /** Number of orbital rings. Default: 4 */
  ringCount?: number;
  /** Overall animation speed multiplier. Default: 1 */
  speed?: number;
  /** Enable cursor-reactive parallax tilt. Default: true */
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface RingConfig {
  radius: number;
  tiltX: number; // base tilt around X in radians
  tiltY: number; // base tilt around Y in radians
  speed: number;
  color: string;
  glowColor: string;
  dash: number[];
  lineWidth: number;
  satellites: { phase: number; speed: number; radius: number; color: string; glow: string }[];
}

export const Hero3DOrbit = React.forwardRef<HTMLDivElement, Hero3DOrbitProps>(
  (
    {
      size = 460,
      ringCount = 4,
      speed = 1,
      interactive = true,
      className,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    // Merge container ref
    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Check prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // HiDPI Scaling (Capped at 1.2 to eliminate high-DPI GPU pixel pipeline load)
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.2);
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);

      const cx = size / 2;
      const cy = size / 2;
      const fov = 650; // Camera perspective distance

      // Define Orbital Rings (matching cybernetic theme tokens)
      const allRings: RingConfig[] = [
        {
          radius: size * 0.38,
          tiltX: (62 * Math.PI) / 180,
          tiltY: (20 * Math.PI) / 180,
          speed: 0.008 * speed,
          color: 'rgba(208, 188, 255, 0.45)', // Primary violet
          glowColor: 'rgba(160, 120, 255, 0.6)',
          dash: [6, 8],
          lineWidth: 1.5,
          satellites: [
            { phase: 0, speed: 0.012 * speed, radius: 4, color: '#d0bcff', glow: '#a078ff' },
            { phase: Math.PI, speed: 0.012 * speed, radius: 3, color: '#e9ddff', glow: '#d0bcff' },
          ],
        },
        {
          radius: size * 0.31,
          tiltX: (46 * Math.PI) / 180,
          tiltY: (-32 * Math.PI) / 180,
          speed: -0.011 * speed,
          color: 'rgba(123, 208, 255, 0.40)', // Secondary cyan
          glowColor: 'rgba(0, 166, 224, 0.6)',
          dash: [4, 6],
          lineWidth: 1.25,
          satellites: [
            { phase: Math.PI * 0.5, speed: -0.015 * speed, radius: 3.5, color: '#7bd0ff', glow: '#00a6e0' },
          ],
        },
        {
          radius: size * 0.44,
          tiltX: (74 * Math.PI) / 180,
          tiltY: (40 * Math.PI) / 180,
          speed: 0.005 * speed,
          color: 'rgba(255, 182, 144, 0.35)', // Tertiary coral/amber
          glowColor: 'rgba(236, 106, 6, 0.5)',
          dash: [8, 10],
          lineWidth: 1.2,
          satellites: [
            { phase: Math.PI * 1.3, speed: 0.007 * speed, radius: 3, color: '#ffb690', glow: '#ec6a06' },
          ],
        },
        {
          radius: size * 0.48,
          tiltX: (30 * Math.PI) / 180,
          tiltY: (-55 * Math.PI) / 180,
          speed: -0.004 * speed,
          color: 'rgba(160, 120, 255, 0.22)',
          glowColor: 'rgba(102, 38, 226, 0.4)',
          dash: [2, 10],
          lineWidth: 1.0,
          satellites: [
            { phase: Math.PI * 0.2, speed: -0.006 * speed, radius: 2.5, color: '#d0bcff', glow: '#a078ff' },
          ],
        },
      ];

      const rings = allRings.slice(0, Math.min(ringCount, allRings.length));

      // Cursor Parallax State
      let targetTiltX = 0;
      let targetTiltY = 0;
      let smoothTiltX = 0;
      let smoothTiltY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        if (!interactive || prefersReducedMotion) return;
        const rect = canvas.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;
        // Normalized cursor offset [-1, 1] relative to viewport
        targetTiltX = ((e.clientY - midY) / (window.innerHeight / 2)) * 0.35;
        targetTiltY = ((e.clientX - midX) / (window.innerWidth / 2)) * 0.35;
      };

      const handleMouseLeave = () => {
        targetTiltX = 0;
        targetTiltY = 0;
      };

      if (interactive && !prefersReducedMotion) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      }

      // 3D Point Projection Helper
      const projectPoint = (
        r: number,
        angle: number,
        xRot: number,
        yRot: number
      ) => {
        // Point in unrotated ring plane (XY)
        const x0 = r * Math.cos(angle);
        const y0 = r * Math.sin(angle);
        const z0 = 0;

        // Rotate around X-axis
        const y1 = y0 * Math.cos(xRot) - z0 * Math.sin(xRot);
        const z1 = y0 * Math.sin(xRot) + z0 * Math.cos(xRot);

        // Rotate around Y-axis
        const x2 = x0 * Math.cos(yRot) + z1 * Math.sin(yRot);
        const y2 = y1;
        const z2 = -x0 * Math.sin(yRot) + z1 * Math.cos(yRot);

        // Perspective division
        const scale = fov / (fov + z2);
        return {
          px: cx + x2 * scale,
          py: cy + y2 * scale,
          z: z2,
          scale,
        };
      };

      let time = 0;
      let animId: number = 0;
      let isVisible = true;

      const render = () => {
        ctx.clearRect(0, 0, size, size);

        // Smooth cursor parallax lerp
        smoothTiltX += (targetTiltX - smoothTiltX) * 0.06;
        smoothTiltY += (targetTiltY - smoothTiltY) * 0.06;

        // Ambient Core Hologram Glow
        const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, size * 0.45);
        coreGrad.addColorStop(0, 'rgba(160, 120, 255, 0.08)');
        coreGrad.addColorStop(0.5, 'rgba(123, 208, 255, 0.03)');
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, size, size);

        // Render each 3D ring
        rings.forEach((ring) => {
          const effectiveTiltX = ring.tiltX + smoothTiltX;
          const effectiveTiltY = ring.tiltY + smoothTiltY;
          const ringAngle = time * ring.speed;

          // 1. Draw Ring Ellipse Path (Streamlined 36 segments)
          const segments = 36;
          ctx.beginPath();
          for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2 + ringAngle;
            const pt = projectPoint(ring.radius, theta, effectiveTiltX, effectiveTiltY);
            if (i === 0) {
              ctx.moveTo(pt.px, pt.py);
            } else {
              ctx.lineTo(pt.px, pt.py);
            }
          }
          ctx.closePath();

          ctx.strokeStyle = ring.color;
          ctx.lineWidth = ring.lineWidth;
          if (ring.dash.length > 0) {
            ctx.setLineDash(ring.dash);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // 2. Draw Orbiting Glowing Satellites (High-performance dual-arc glow, zero shadowBlur CPU stall)
          ring.satellites.forEach((sat) => {
            const satTheta = sat.phase + time * sat.speed;
            const pt = projectPoint(ring.radius, satTheta, effectiveTiltX, effectiveTiltY);
            const coreRadius = Math.max(1, sat.radius * pt.scale);

            // Outer soft glow halo
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, coreRadius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = sat.glow.startsWith('#')
              ? `${sat.glow}40`
              : 'rgba(123, 208, 255, 0.25)';
            ctx.fill();

            // Inner crisp core
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = sat.color;
            ctx.fill();
          });
        });

        time += 1;
        if (isVisible && !prefersReducedMotion) {
          animId = requestAnimationFrame(render);
        }
      };

      // If prefers-reduced-motion, draw single static frame
      if (prefersReducedMotion) {
        render();
        return () => {
          if (interactive) {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
          }
        };
      }

      // Initial Render & Start RAF Loop
      animId = requestAnimationFrame(render);

      // Auto-pause RAF when off-screen via IntersectionObserver
      const observer = typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry ? entry.isIntersecting : true;
              if (isVisible) {
                cancelAnimationFrame(animId);
                animId = requestAnimationFrame(render);
              } else {
                cancelAnimationFrame(animId);
              }
            },
            { threshold: 0.05 }
          )
        : null;

      observer?.observe(canvas);

      return () => {
        if (animId) cancelAnimationFrame(animId);
        observer?.disconnect();
        if (interactive) {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, [size, ringCount, speed, interactive]);

    return (
      <div
        ref={containerRef}
        className={cn('relative flex items-center justify-center pointer-events-none', className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <canvas ref={canvasRef} className="w-full h-full bg-transparent" />
      </div>
    );
  }
);

Hero3DOrbit.displayName = 'Hero3DOrbit';

export default Hero3DOrbit;
