'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { TiltCard } from '@/components/ui/TiltCard';
import { useProjects } from '@/lib/hooks';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Activity,
  GitBranch,
  Terminal,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  AlertCircle,
  FolderGit2,
} from 'lucide-react';

import { ProjectItem, initialProjects } from '@/data/seedProjects';

interface ProjectDetailClientProps {
  projectId: string;
  initialProject?: ProjectItem;
}

export function ProjectDetailClient({ projectId, initialProject }: ProjectDetailClientProps) {
  const { projects, loaded } = useProjects();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeProjects = projects.length > 0 ? projects : initialProjects;
  const project =
    activeProjects.find((p) => p.id === projectId) ||
    initialProject ||
    initialProjects.find((p) => p.id === projectId) ||
    initialProjects[0];

  const currentIndex = activeProjects.findIndex((p) => p.id === project?.id);
  const prevProject = currentIndex > 0 ? activeProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < activeProjects.length - 1 ? activeProjects[currentIndex + 1] : null;

  // Dynamic 3D interactive telemetry canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !project) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 600);
    let height = (canvas.height = 200);
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.02;
      const cx = width / 2;
      const cy = height / 2;

      if (project.category === 'Lakehouse & BI') {
        for (let r = 20; r <= 80; r += 20) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * 0.4, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(208, 188, 255, 0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(step) * 80, cy + Math.sin(step) * 32);
        ctx.strokeStyle = 'rgba(123, 208, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (project.category === 'AI & Machine Learning') {
        ctx.beginPath();
        for (let x = 0; x < width; x += 5) {
          const y = cy + Math.sin(x * 0.02 + step) * 28 + Math.cos(x * 0.01 - step) * 16;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#d0bcff';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        for (let i = 0; i < 5; i++) {
          const angle = step + (i * Math.PI * 2) / 5;
          const nx = cx + Math.cos(angle) * 60;
          const ny = cy + Math.sin(angle) * 35;
          ctx.beginPath();
          ctx.arc(nx, ny, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#7bd0ff';
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = 'rgba(123, 208, 255, 0.3)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [project?.category]);

  if (!project && loaded) {
    return (
      <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="w-full pt-32 pb-24 flex-1 flex items-center justify-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] text-center max-w-lg mx-auto flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-primary" />
            <h1 className="font-nexa text-2xl font-bold text-on-surface">Case Study Not Found</h1>
            <p className="text-xs text-on-surface-variant">
              The requested architecture blueprint could not be located in our production registry.
            </p>
            <Link
              href="/projects"
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider"
            >
              Back to All Projects
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[1280px] mx-auto px-gutter flex flex-col gap-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/projects" className="hover:text-primary transition-colors">
              Projects &amp; Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-primary font-semibold truncate max-w-[240px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          {/* HERO BANNER */}
          <section className="relative overflow-hidden rounded-3xl bg-surface-container-low/40 hover:bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] p-8 sm:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition-all">
            {/* Top Specular Rim Light */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 via-primary/40 to-transparent pointer-events-none rounded-t-3xl" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 relative z-10">
              <div className="flex flex-col gap-5 max-w-3xl">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-label-md font-bold uppercase tracking-wider">
                    {project.category}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 dark:bg-white/[0.06] text-secondary border border-secondary/30 text-xs font-mono font-semibold">
                    <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
                    <span>{project.impactMetric}</span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white/40 dark:bg-white/[0.04] text-on-surface-variant border border-outline-variant/25 text-xs font-mono">
                    {project.role}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-nexa text-3xl sm:text-5xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                  {project.title}
                </h1>

                {/* Client Emblem Row */}
                <div className="flex items-center gap-3 py-1">
                  <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-surface-container-highest p-1 border border-outline-variant/30 flex items-center justify-center shadow-sm shrink-0">
                    <img
                      src={project.companyLogo}
                      alt={project.client}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                      Client Organization
                    </span>
                    <span className="text-sm font-nexa font-bold text-on-surface">{project.client}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {project.summary}
                </p>

                {/* CTA Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:shadow-[0_0_36px_rgba(160,120,255,0.7)] transition-all hover:scale-105 active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Advisory for this Stack</span>
                  </Link>

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-nexa text-xs font-bold uppercase tracking-wider border border-white/20 dark:border-white/[0.08] transition-all hover:scale-105"
                    >
                      <FolderGit2 className="w-4 h-4 text-secondary" />
                      <span>Codebase / Spec</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-on-surface-variant hover:text-on-surface font-mono text-xs transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>All Projects</span>
                  </Link>
                </div>
              </div>

              {/* 3D Telemetry Canvas Visualizer Card */}
              <div className="lg:w-80 w-full flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-lowest/80 border border-white/10 shadow-inner backdrop-blur-xl shrink-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary font-bold"># Real-Time Telemetry Node</span>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                </div>
                <div className="w-full h-32 relative overflow-hidden rounded-xl bg-black/40 flex items-center justify-center">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant border-t border-surface-container-high/60 pt-2">
                  <span>Architecture Verified</span>
                  <span className="text-secondary font-bold">Production SLA</span>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS TELEMETRY GRID */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="relative p-5 sm:p-6 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col justify-between"
              >
                <div className="text-xs font-mono text-secondary uppercase font-semibold">{metric.label}</div>
                <div className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface mt-2 text-primary">
                  {metric.value}
                </div>
              </div>
            ))}
          </section>

          {/* TWO-COLUMN CASE STUDY DEEP DIVE: CHALLENGE & SOLUTION */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Technical Challenge */}
            <div className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-error">
                <AlertCircle className="w-5 h-5 text-error" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">The Technical Bottleneck</span>
              </div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">System Challenge &amp; Constraints</h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {project.challenge ||
                  `The existing architecture struggled with high ingestion latency, data fragmentation across disparate operational siloes, and escalating cloud maintenance costs under peak traffic spikes.`}
              </p>
            </div>

            {/* The Engineered Solution */}
            <div className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-secondary">
                <Cpu className="w-5 h-5 text-secondary" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">The Architecture Strategy</span>
              </div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">Engineered Solution &amp; Delivery</h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {project.solution ||
                  `Engineered a high-performance, fault-tolerant distributed streaming lakehouse utilizing Kafka message buffering, columnar store compression, and automated edge synchronization daemons.`}
              </p>
            </div>
          </section>

          {/* SYSTEM DATA FLOW PIPELINE VISUALIZER */}
          {project.systemFlow && project.systemFlow.length > 0 && (
            <section className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-primary">
                  <GitBranch className="w-5 h-5 text-primary" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    End-to-End Ingestion Pipeline
                  </span>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">Sequential Event Lifecycle</span>
              </div>

              <h2 className="font-nexa text-2xl font-bold text-on-surface">System Architecture Data Flow</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {project.systemFlow.map((stage, idx) => {
                  const [stageTitle, ...stageDesc] = stage.split(':');
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/40 dark:bg-surface-container-lowest/70 border border-white/20 dark:border-white/[0.06] flex flex-col gap-2 relative shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-mono text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-secondary uppercase font-semibold">Stage {idx + 1}</span>
                      </div>
                      <h3 className="font-nexa font-bold text-sm text-on-surface">{stageTitle}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {stageDesc.join(':').trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ARCHITECTURAL HIGHLIGHTS */}
          <section className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-6">
            <div className="flex items-center gap-2 text-secondary">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                Production-Validated Innovations
              </span>
            </div>
            <h2 className="font-nexa text-2xl font-bold text-on-surface">Key Architectural Highlights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.architectureHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/40 dark:bg-surface-container-lowest/60 border border-white/20 dark:border-white/[0.06]"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-on-surface leading-relaxed font-body-md">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* KEY ARCHITECTURAL DECISIONS & TRADE-OFFS */}
          {project.keyDecisions && project.keyDecisions.length > 0 && (
            <section className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-6">
              <div className="flex items-center gap-2 text-primary">
                <Database className="w-5 h-5 text-primary" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  Senior Engineering Analysis
                </span>
              </div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">Architectural Trade-offs &amp; Decisions</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {project.keyDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/40 dark:bg-surface-container-lowest/80 border border-white/20 dark:border-white/[0.08] flex flex-col justify-between gap-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                        Decision #{idx + 1}
                      </span>
                      <h3 className="font-nexa font-bold text-base text-on-surface">{decision.title}</h3>
                      <div className="mt-2 text-xs text-on-surface leading-relaxed bg-surface-container-low/70 p-3 rounded-xl border border-outline-variant/20">
                        <strong className="text-secondary block mb-1">✓ Rationale:</strong>
                        {decision.rationale}
                      </div>
                    </div>

                    <div className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-lowest/60 p-3 rounded-xl border border-outline-variant/20">
                      <strong className="text-error block mb-1">⚠ Evaluated Trade-Off:</strong>
                      {decision.tradeOff}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TECHNOLOGY ARSENAL */}
          <section className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4">
            <h2 className="font-nexa text-xl font-bold text-on-surface flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span>Technology Arsenal Deployed</span>
            </h2>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white/50 dark:bg-surface-container-high/60 text-xs font-mono font-bold text-on-surface border border-white/30 dark:border-outline-variant/30 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* NEXT / PREVIOUS PROJECT NAVIGATION */}
          <nav
            aria-label="Previous and Next Case Studies"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-surface-container-high/60"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group p-5 rounded-2xl bg-surface-container-low/40 hover:bg-surface-container-low/70 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] transition-all flex items-center gap-3"
              >
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">Previous Case Study</span>
                  <span className="font-nexa font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate max-w-[240px]">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group p-5 rounded-2xl bg-surface-container-low/40 hover:bg-surface-container-low/70 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] transition-all flex items-center justify-end text-right gap-3 ml-auto w-full sm:w-auto sm:col-start-2"
              >
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">Next Case Study</span>
                  <span className="font-nexa font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate max-w-[240px]">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
