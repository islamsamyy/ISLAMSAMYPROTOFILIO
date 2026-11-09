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
  /** Optional custom node color in RGB format e.g. '123, 208, 255' */
  nodeColor?: string;
  /** Optional custom line color in RGB format e.g. '208, 188, 255' */
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
      dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

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
