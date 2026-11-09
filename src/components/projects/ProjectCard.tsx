'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectItem } from '@/data/seedProjects';

interface ProjectCardProps {
  project: ProjectItem;
  onSelectBlueprint: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onSelectBlueprint }: ProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic 3D interactive canvas effect based on project type
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 340);
    let height = (canvas.height = 140);
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.025;
      const cx = width / 2;
      const cy = height / 2;

      if (project.category === 'Lakehouse & BI') {
        // Holographic cylindrical telemetry radar
        for (let r = 16; r <= 52; r += 16) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * 0.42, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(208, 188, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(step) * 52, cy + Math.sin(step) * 22);
        ctx.strokeStyle = 'rgba(123, 208, 255, 0.85)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (project.category === 'AI & Machine Learning') {
        // ML Neural Decision Boundary Wave
        ctx.beginPath();
        for (let x = 0; x < width; x += 6) {
          const y = cy + Math.sin(x * 0.03 + step) * 22 + Math.cos(x * 0.015 - step) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#d0bcff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#a078ff';
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        // Distributed Node Mesh
        for (let i = 0; i < 4; i++) {
          const angle = step + (i * Math.PI) / 2;
          const nx = cx + Math.cos(angle) * 38;
          const ny = cy + Math.sin(angle) * 22;
          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#7bd0ff';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#7bd0ff';
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = 'rgba(123, 208, 255, 0.25)';
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [project.category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-surface-container-low/40 hover:bg-surface-container-low/65 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(160,120,255,0.3)] transition-all duration-300 overflow-hidden"
    >
      {/* Top Specular Rim Light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

      {/* Top Section */}
      <div className="p-6 sm:p-7 flex flex-col gap-4">
        {/* Company Header with Company Logo */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.companyLogo ? (
              <div className="w-12 h-12 rounded-xl bg-white/90 dark:bg-surface-container-high border border-outline-variant/30 overflow-hidden p-1 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/40 transition-colors">
                <img
                  src={project.companyLogo}
                  alt={project.client}
                  className="w-full h-full object-cover rounded-lg filter brightness-105"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center font-bold text-primary shrink-0">
                {project.client.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-label-sm text-xs text-secondary font-semibold uppercase tracking-wider">
                {project.client}
              </span>
              <span className="font-body-sm text-xs text-on-surface-variant">
                {project.role}
              </span>
            </div>
          </div>

          {/* Impact Metric Badge */}
          <span className="px-3 py-1 rounded-full bg-white/40 dark:bg-surface-container-high border border-primary/30 text-primary text-xs font-label-md font-bold tracking-tight shadow-sm">
            {project.impactMetric}
          </span>
        </div>

        {/* Title & Summary */}
        <div className="flex flex-col gap-2">
          <Link href={`/projects/${project.id}`}>
            <h3 className="font-nexa text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug cursor-pointer">
              {project.title}
            </h3>
          </Link>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* 3D Telemetry Canvas Box */}
        <div className="relative w-full h-[120px] rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/20 overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full bg-transparent" />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-surface-container-high/90 text-[10px] font-mono text-on-surface-variant border border-white/5">
            Realtime 3D Telemetry
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-white/40 dark:bg-surface-container-high text-[11px] font-mono text-on-surface-variant border border-outline-variant/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 bg-surface-container-lowest/70 border-t border-surface-container-high/60 flex items-center justify-between gap-3 flex-wrap">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-nexa font-bold uppercase tracking-wider text-primary hover:text-primary-fixed transition-colors"
        >
          <span>Deep Dive Case Study</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>

        <button
          type="button"
          onClick={() => onSelectBlueprint(project)}
          className="inline-flex items-center gap-1 text-xs font-mono text-on-surface-variant hover:text-on-surface transition-colors p-1"
          title="Quick Architectural Blueprint"
        >
          <span className="material-symbols-outlined text-base">schema</span>
          <span className="hidden sm:inline">Blueprint</span>
        </button>
      </div>

      {/* Cybernetic Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </motion.div>
  );
}

