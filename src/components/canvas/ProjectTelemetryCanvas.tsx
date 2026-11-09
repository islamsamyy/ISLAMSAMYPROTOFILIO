'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/utils';

export type TelemetryType = 'radar' | 'topology' | 'hypercube' | 'hyperplane';

export interface ProjectTelemetryCanvasProps {
  /** Visualization geometry type. Overrides category mapping if provided. */
  type?: TelemetryType;
  /** Project category used to determine the telemetry visualization type */
  category?: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native' | string;
  className?: string;
  width?: number;
  height?: number;
  interactive?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

/**
 * Maps a project category string to its respective 3D telemetry visualization.
 */
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

export function ProjectTelemetryCanvas({
  type: explicitType,
  category,
  className,
  width: customWidth,
  height: customHeight,
  interactive = true,
  speed = 1,
  style,
}: ProjectTelemetryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const activeType: TelemetryType = explicitType || getTelemetryTypeForCategory(category);
  const prefersReducedMotion = useReducedMotion();
  const themeContext = useTheme();
  const isDark = themeContext?.resolvedTheme !== 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      width = customWidth || rect.width || canvas.clientWidth || 340;
      height = customHeight || rect.height || canvas.clientHeight || 140;
      dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          updateDimensions();
          if (prefersReducedMotion) draw(false);
        })
      : null;
    resizeObserver?.observe(canvas);

    // Color definitions based on theme tokens
    const violet = isDark ? '208, 188, 255' : '102, 38, 226';
    const cyan = isDark ? '123, 208, 255' : '0, 101, 139';
    const amber = isDark ? '255, 182, 144' : '236, 106, 6';

    // 1. Radar state (Lakehouse & BI)
    const targets = [
      { angle: 0.65, r: 0.55, ping: 0 },
      { angle: 2.1, r: 0.78, ping: 0 },
      { angle: 3.8, r: 0.42, ping: 0 },
      { angle: 5.2, r: 0.68, ping: 0 },
    ];

    // 2. Topology state (Distributed Systems)
    const topoNodes = [
      { x: 0, y: 0, z: 0, isCoordinator: true },
      { x: 75, y: -25, z: 20, isCoordinator: false },
      { x: -70, y: -20, z: -30, isCoordinator: false },
      { x: 50, y: 35, z: -40, isCoordinator: false },
      { x: -55, y: 30, z: 35, isCoordinator: false },
      { x: 80, y: 15, z: -20, isCoordinator: false },
      { x: -75, y: -10, z: 45, isCoordinator: false },
    ];
    const topoEdges: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 5], [2, 6], [3, 4], [1, 3], [2, 4],
    ];

    // 3. Hypercube state (AI & Machine Learning - 4D Tesseract)
    // 16 vertices of a 4D hypercube: (x, y, z, w) where each is ±1
    const tesseractVertices: number[][] = [];
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          for (let w = -1; w <= 1; w += 2) {
            tesseractVertices.push([x, y, z, w]);
          }
        }
      }
    }
    // 32 edges connecting vertices that differ by exactly 1 coordinate
    const tesseractEdges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (tesseractVertices[i][k] !== tesseractVertices[j][k]) diff++;
        }
        if (diff === 1) {
          tesseractEdges.push([i, j]);
        }
      }
    }

    // Render 1: Radar (Lakehouse & BI)
    const drawRadar = (animate: boolean) => {
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.44;
      const sweepAngle = animate ? (time * 0.025 * speed) % (Math.PI * 2) : Math.PI * 0.75;

      // Radar dish background glow
      const dishGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, maxR);
      dishGrad.addColorStop(0, `rgba(${cyan}, ${isDark ? 0.08 : 0.04})`);
      dishGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = dishGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, maxR, maxR * 0.44, 0, 0, Math.PI * 2);
      ctx.fill();

      // Concentric 3D elliptical rings
      const ringSteps = [0.35, 0.65, 1.0];
      ringSteps.forEach((step, idx) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, maxR * step, maxR * step * 0.44, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${cyan}, ${idx === 2 ? 0.35 : 0.18})`;
        ctx.lineWidth = 1;
        if (idx === 1) ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR * 0.44);
      ctx.lineTo(cx, cy + maxR * 0.44);
      ctx.strokeStyle = `rgba(${cyan}, 0.15)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Sweep Cone (trailing gradient)
      const trailAngle = 0.55;
      const startAngle = sweepAngle - trailAngle;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      // Approximate elliptical sector
      for (let a = startAngle; a <= sweepAngle; a += 0.05) {
        const px = cx + Math.cos(a) * maxR;
        const py = cy + Math.sin(a) * maxR * 0.44;
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, maxR);
      sweepGrad.addColorStop(0, `rgba(${cyan}, ${isDark ? 0.25 : 0.15})`);
      sweepGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Sweep Beam Line
      const beamX = cx + Math.cos(sweepAngle) * maxR;
      const beamY = cy + Math.sin(sweepAngle) * maxR * 0.44;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(beamX, beamY);
      ctx.strokeStyle = isDark ? `rgba(${cyan}, 0.9)` : `rgba(${cyan}, 0.7)`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Radar Target Pings
      targets.forEach((tgt) => {
        const tgtX = cx + Math.cos(tgt.angle) * maxR * tgt.r;
        const tgtY = cy + Math.sin(tgt.angle) * maxR * tgt.r * 0.44;

        // Check if sweep beam just crossed target angle
        const angleDiff = Math.abs((sweepAngle - tgt.angle + Math.PI * 4) % (Math.PI * 2));
        if (animate && angleDiff < 0.06) {
          tgt.ping = 1.0;
        }

        // Draw Target Dot
        ctx.beginPath();
        ctx.arc(tgtX, tgtY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${violet}, 0.9)`;
        ctx.fill();

        // Expanding Shockwave Ring
        if (tgt.ping > 0.02) {
          const pingR = (1 - tgt.ping) * 16 + 3;
          ctx.beginPath();
          ctx.ellipse(tgtX, tgtY, pingR, pingR * 0.44, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${cyan}, ${tgt.ping * 0.8})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          if (animate) tgt.ping *= 0.94;
        }
      });
    };

    // Render 2: Topology (Distributed Systems)
    const drawTopology = (animate: boolean) => {
      const cx = width / 2;
      const cy = height / 2;
      const rotY = animate ? time * 0.012 * speed : 0.8;
      const rotX = 0.22;
      const fov = 180;
      const dist = 120;

      // Project 3D nodes to 2D screen
      const projected = topoNodes.map((n) => {
        // Rotate around Y
        const x1 = n.x * Math.cos(rotY) - n.z * Math.sin(rotY);
        const z1 = n.x * Math.sin(rotY) + n.z * Math.cos(rotY);
        // Pitch around X
        const y2 = n.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = n.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = fov / (fov + z2 + dist);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          z: z2,
          scale,
          isCoordinator: n.isCoordinator,
        };
      });

      // Draw Edges with depth opacity
      topoEdges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.5, 0.32 - avgZ * 0.003));

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(${cyan}, ${alpha})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Traveling data packet pulse
        if (animate) {
          const packetProgress = (time * 0.02 * speed + (i + j) * 0.3) % 1.0;
          const packetX = p1.px + (p2.px - p1.px) * packetProgress;
          const packetY = p1.py + (p2.py - p1.py) * packetProgress;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${violet}, 0.9)`;
          ctx.fill();
        }
      });

      // Sort nodes by depth (draw back to front)
      const sorted = [...projected].sort((a, b) => b.z - a.z);
      sorted.forEach((p) => {
        const r = p.isCoordinator ? 5 * p.scale : 3.2 * p.scale;
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.5, r), 0, Math.PI * 2);
        ctx.fillStyle = p.isCoordinator ? `rgba(${amber}, 0.95)` : `rgba(${violet}, 0.9)`;
        if (isDark) {
          ctx.shadowColor = p.isCoordinator ? '#ffb690' : '#d0bcff';
          ctx.shadowBlur = p.isCoordinator ? 8 : 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Coordinator orbital pulse ring
        if (p.isCoordinator) {
          const pulseR = 8 * p.scale + (animate ? Math.sin(time * 0.05) * 2 : 1);
          ctx.beginPath();
          ctx.arc(p.px, p.py, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${amber}, 0.4)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    // Render 3: Hypercube (AI & Machine Learning - 4D Tesseract)
    const drawHypercube = (animate: boolean) => {
      const cx = width / 2;
      const cy = height / 2;
      const angleXW = animate ? time * 0.014 * speed : 0.6;
      const angleYZ = animate ? time * 0.018 * speed : 0.4;
      const S = 38; // scale factor

      // 4D Rotation + Stereographic 4D->3D -> 2D
      const pts = tesseractVertices.map((v) => {
        let x = v[0] * S;
        let y = v[1] * S;
        let z = v[2] * S;
        let w = v[3] * S;

        // Rotate in XW plane
        const x1 = x * Math.cos(angleXW) - w * Math.sin(angleXW);
        const w1 = x * Math.sin(angleXW) + w * Math.cos(angleXW);

        // Rotate in YZ plane
        const y2 = y * Math.cos(angleYZ) - z * Math.sin(angleYZ);
        const z2 = y * Math.sin(angleYZ) + z * Math.cos(angleYZ);

        // 4D to 3D perspective projection
        const dist4 = 110;
        const scale4 = dist4 / (dist4 + w1);
        const x3 = x1 * scale4;
        const y3 = y2 * scale4;
        const z3 = z2 * scale4;

        // Fixed isometric pitch
        const isoPitch = 0.35;
        const y4 = y3 * Math.cos(isoPitch) - z3 * Math.sin(isoPitch);
        const z4 = y3 * Math.sin(isoPitch) + z3 * Math.cos(isoPitch);

        // 3D to 2D projection
        const dist3 = 200;
        const scale3 = dist3 / (dist3 + z4);

        return {
          px: cx + x3 * scale3,
          py: cy + y4 * scale3,
          z: z4,
          w: w1,
        };
      });

      // Draw Edges
      tesseractEdges.forEach(([i, j]) => {
        const p1 = pts[i];
        const p2 = pts[j];

        const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        grad.addColorStop(0, `rgba(${violet}, 0.55)`);
        grad.addColorStop(1, `rgba(${cyan}, 0.55)`);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      });

      // Draw Vertices
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyan}, 0.95)`;
        if (isDark) {
          ctx.shadowColor = '#7bd0ff';
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    // Render 4: Hyperplane (Cloud Native)
    const drawHyperplane = (animate: boolean) => {
      const horizonY = height * 0.25;
      const numX = 14;
      const numZ = 10;
      const gridW = width * 1.15;
      const startX = (width - gridW) / 2;

      // Draw Transverse Mesh Wave Lines
      for (let zIdx = 0; zIdx < numZ; zIdx++) {
        const progressZ = (zIdx + 1) / numZ;
        const perspZ = Math.pow(progressZ, 2.2);
        const yBase = horizonY + (height - horizonY) * perspZ;
        const alpha = Math.max(0.1, perspZ * (isDark ? 0.75 : 0.6));

        ctx.beginPath();
        for (let xIdx = 0; xIdx <= numX; xIdx++) {
          const u = xIdx / numX;
          const x = startX + u * gridW;
          // Undulating wave elevation
          const wavePhase = animate ? time * 0.03 * speed : 1.2;
          const waveY =
            Math.sin(u * 5 + wavePhase) * Math.cos(progressZ * 4 - wavePhase) * 6 * perspZ +
            Math.sin((u + progressZ) * 6 + wavePhase) * 3 * perspZ;

          const px = x;
          const py = yBase + waveY;

          if (xIdx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(${purpleGrid(zIdx)}, ${alpha})`;
        ctx.lineWidth = 0.8 + perspZ * 1.0;
        ctx.stroke();
      }

      function purpleGrid(idx: number) {
        return idx % 2 === 0 ? violet : cyan;
      }

      // Longitudinal Lines
      for (let xIdx = 0; xIdx <= numX; xIdx += 2) {
        const u = xIdx / numX;
        ctx.beginPath();
        for (let zIdx = 0; zIdx < numZ; zIdx++) {
          const progressZ = (zIdx + 1) / numZ;
          const perspZ = Math.pow(progressZ, 2.2);
          const yBase = horizonY + (height - horizonY) * perspZ;
          const wavePhase = animate ? time * 0.03 * speed : 1.2;
          const waveY =
            Math.sin(u * 5 + wavePhase) * Math.cos(progressZ * 4 - wavePhase) * 6 * perspZ +
            Math.sin((u + progressZ) * 6 + wavePhase) * 3 * perspZ;

          const px = startX + u * gridW;
          const py = yBase + waveY;

          if (zIdx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(${cyan}, 0.22)`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Sweeping Laser Beam
      if (animate) {
        const laserProgress = (time * 0.015 * speed) % 1.0;
        const laserZ = Math.pow(laserProgress, 2.2);
        const laserY = horizonY + (height - horizonY) * laserZ;
        const laserGrad = ctx.createLinearGradient(0, laserY - 8, 0, laserY + 8);
        laserGrad.addColorStop(0, 'rgba(123, 208, 255, 0)');
        laserGrad.addColorStop(0.5, `rgba(${cyan}, ${isDark ? 0.35 : 0.2})`);
        laserGrad.addColorStop(1, 'rgba(123, 208, 255, 0)');
        ctx.fillStyle = laserGrad;
        ctx.fillRect(0, laserY - 8, width, 16);
      }
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      switch (activeType) {
        case 'radar':
          drawRadar(animate);
          break;
        case 'topology':
          drawTopology(animate);
          break;
        case 'hypercube':
          drawHypercube(animate);
          break;
        case 'hyperplane':
          drawHyperplane(animate);
          break;
        default:
          drawRadar(animate);
      }
    };

    const renderLoop = () => {
      if (!isVisibleRef.current) return;
      time += 1;
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
    activeType,
    customWidth,
    customHeight,
    speed,
    prefersReducedMotion,
    isDark,
  ]);

  return (
    <div
      className={cn('relative w-full h-full flex items-center justify-center overflow-hidden', className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export default ProjectTelemetryCanvas;
