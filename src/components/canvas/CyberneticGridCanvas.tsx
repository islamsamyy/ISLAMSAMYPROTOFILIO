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
    let scanlinePattern: CanvasPattern | null = null;

    const createScanlinePattern = () => {
      try {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = 4;
        patternCanvas.height = 3;
        const pctx = patternCanvas.getContext('2d');
        if (pctx) {
          pctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.03)';
          pctx.fillRect(0, 0, 4, 1);
          scanlinePattern = ctx.createPattern(patternCanvas, 'repeat');
        }
      } catch (e) {
        scanlinePattern = null;
      }
    };

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || canvas.clientWidth || 400;
      height = rect.height || canvas.clientHeight || 250;
      dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      currentVpX = width * vanishingPointX;
      currentVpY = height * horizonY;
      mouseRef.current = { x: width * 0.5, y: height * 0.5 };
      createScanlinePattern();
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
      ctx.stroke();

      // 3. Perspective Longitudinal (Vertical) Lines - Batched in 1 GPU draw-call with reusable gradient
      const numLines = Math.ceil((width * 2) / gridSpacing);
      const startX = currentVpX - (numLines / 2) * gridSpacing;

      const vGrad = ctx.createLinearGradient(0, currentVpY, 0, height);
      vGrad.addColorStop(0, `rgba(${cyan}, 0.03)`);
      vGrad.addColorStop(0.4, `rgba(${cyan}, 0.25)`);
      vGrad.addColorStop(1, `rgba(${cyan}, 0.65)`);

      ctx.beginPath();
      for (let i = 0; i <= numLines; i++) {
        const bottomX = startX + i * gridSpacing;
        ctx.moveTo(currentVpX, currentVpY);
        ctx.lineTo(bottomX, height);
      }
      ctx.strokeStyle = vGrad;
      ctx.lineWidth = 1.0;
      ctx.stroke();

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
        // Single tiled draw call using cached pattern (eliminates 160+ fillRect calls)
        if (scanlinePattern) {
          ctx.fillStyle = scanlinePattern;
          ctx.fillRect(0, 0, width, height);
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

    let isWindowScrolling = false;
    let scrollDebounceTimer: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      isWindowScrolling = true;
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(() => {
        isWindowScrolling = false;
      }, 90);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastFrameTime = 0;
    const minFrameInterval = 1000 / 30; // 30 FPS ceiling

    const renderLoop = (timestamp = 0) => {
      if (!isVisibleRef.current) return;
      animFrameIdRef.current = requestAnimationFrame(renderLoop);

      // Dedicated 100% compositor thread during rapid scrolling
      if (isWindowScrolling) return;

      if (timestamp - lastFrameTime < minFrameInterval) return;
      lastFrameTime = timestamp;
      draw(true);
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
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      window.removeEventListener('scroll', handleScroll);
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
