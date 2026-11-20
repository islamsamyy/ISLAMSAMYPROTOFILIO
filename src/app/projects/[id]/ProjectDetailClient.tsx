'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArchitectureModal } from '@/components/projects/ArchitectureModal';
import { useProjects } from '@/lib/hooks';
import { cleanProjectText, isDiagramAsset } from '@/lib/utils';
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
  Share2,
  Check,
  X,
  ChevronLeft,
  Maximize2,
} from 'lucide-react';

import { ProjectItem, initialProjects } from '@/data/seedProjects';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectDetailClientProps {
  projectId: string;
  initialProject?: ProjectItem;
}

export function ProjectDetailClient({ projectId, initialProject }: ProjectDetailClientProps) {
  const { language, t } = useLanguage();
  const { projects, loaded } = useProjects();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readmeExpanded, setReadmeExpanded] = useState(false);
  const [activeBlueprint, setActiveBlueprint] = useState<ProjectItem | null>(null);

  const activeProjects = projects.length > 0 ? projects : initialProjects;
  const project =
    activeProjects.find((p) => p.id === projectId) ||
    initialProject ||
    initialProjects.find((p) => p.id === projectId) ||
    initialProjects[0];

  const relatedProjects = activeProjects
    .filter((p) => p.id !== project?.id && p.category === project?.category)
    .slice(0, 3);

  const gallery =
    project?.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : project?.companyLogo
      ? [project.companyLogo.replace('w=120', 'w=1200')]
      : [];

  useEffect(() => {
    if (lightboxIndex === null || gallery.length === 0) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      else if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, gallery.length]);

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Ignore clipboard errors in restricted contexts
    }
  };

  const currentIndex = activeProjects.findIndex((p) => p.id === project?.id);
  const prevProject = currentIndex > 0 ? activeProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < activeProjects.length - 1 ? activeProjects[currentIndex + 1] : null;

  // Dynamic 3D interactive telemetry canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !project) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 600);
    let height = (canvas.height = 200);
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.02;
      const cx = width / 2;
      const cy = height / 2;

      if (project.category === 'Data Analysis & Power BI') {
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

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [project?.category]);

  if (!project && loaded) {
    return (
      <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="w-full pt-32 pb-24 flex-1 flex items-center justify-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] text-center max-w-lg mx-auto flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-primary" />
            <h1 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.notFoundTitle')}</h1>
            <p className="text-xs text-on-surface-variant">
              {t('projectDetail.notFoundDesc')}
            </p>
            <Link
              href="/projects"
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider"
            >
              {t('projectDetail.backToAll')}
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
              {t('nav.home')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 rtl-flip" />
            <Link href="/projects" className="hover:text-primary transition-colors">
              {t('footer.projectsLink')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 rtl-flip" />
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
                      {t('projectDetail.clientOrg')}
                    </span>
                    <span className="text-sm font-nexa font-bold text-on-surface">{project.client}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {cleanProjectText(project.summary)}
                </p>

                {/* CTA Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:shadow-[0_0_36px_rgba(160,120,255,0.7)] transition-all hover:scale-105 active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('projectDetail.bookAdvisory')}</span>
                  </Link>

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-nexa text-xs font-bold uppercase tracking-wider border border-white/20 dark:border-white/[0.08] transition-all hover:scale-105"
                    >
                      <FolderGit2 className="w-4 h-4 text-secondary" />
                      <span>{t('projectDetail.codebaseSpec')}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyShareLink}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-mono text-xs border border-outline-variant/25 transition-all"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? (language === 'ar' ? 'تم النسخ!' : 'Link Copied!') : (language === 'ar' ? 'مشاركة' : 'Share')}</span>
                  </button>

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-on-surface-variant hover:text-on-surface font-mono text-xs transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 rtl-flip" />
                    <span>{t('projectDetail.backToAll')}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Primary Screenshot Preview + 3D Telemetry Node */}
              <div className="lg:w-88 w-full flex flex-col gap-4 shrink-0">
                {gallery.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(0)}
                    className="group relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/25 dark:border-white/15 shadow-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    title="Inspect visual showcase"
                  >
                    <img
                      src={gallery[0]}
                      alt={`${project.title} preview`}
                      className={`w-full h-full ${isDiagramAsset(gallery[0]) ? 'object-contain p-3' : 'object-cover object-top'} group-hover:scale-[1.03] transition-transform duration-300`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-100">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-secondary" />
                        <span>{language === 'ar' ? 'فتح المعرض' : `Inspect Gallery (${gallery.length})`}</span>
                      </span>
                    </div>
                  </button>
                )}

                <div className="w-full flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/20 dark:border-white/10 shadow-inner backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-primary font-bold">{t('projectDetail.realtimeNode')}</span>
                    <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  </div>
                  <div className="w-full h-24 relative overflow-hidden rounded-xl bg-black/40 flex items-center justify-center">
                    <canvas ref={canvasRef} className="w-full h-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant border-t border-surface-container-high/60 pt-2">
                    <span>{t('projectDetail.archVerified')}</span>
                    <span className="text-secondary font-bold">{t('projectDetail.productionSla')}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* QUICK SECTION JUMP BAR */}
          <nav
            aria-label="Case Study Sections"
            className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[
              { href: '#metrics-section', label: language === 'ar' ? 'المقاييس والنتائج' : 'Metrics & Outcomes' },
              ...(gallery.length > 0 ? [{ href: '#gallery-section', label: language === 'ar' ? 'المعرض' : `Gallery (${gallery.length})` }] : []),
              { href: '#challenge-section', label: language === 'ar' ? 'التحدي والحل' : 'Challenge & Solution' },
              { href: '#highlights-section', label: language === 'ar' ? 'المميزات' : 'Highlights' },
              ...(project.readmeContent ? [{ href: '#readme-section', label: 'README.md' }] : []),
              { href: '#tech-section', label: language === 'ar' ? 'التقنيات' : 'Tech Stack' },
              ...(relatedProjects.length > 0 ? [{ href: '#related-section', label: language === 'ar' ? 'مشاريع ذات صلة' : 'Related Work' }] : []),
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full bg-surface-container-low/75 hover:bg-primary-container hover:text-on-primary-container border border-outline-variant/25 text-xs font-mono text-on-surface-variant whitespace-nowrap transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* METRICS TELEMETRY + BUSINESS OUTCOMES */}
          <section id="metrics-section" className="flex flex-col gap-5 scroll-mt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="relative p-5 sm:p-6 rounded-3xl bg-surface-container-low/65 dark:bg-surface-container-low/45 backdrop-blur-2xl border border-outline-variant/25 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col justify-between"
                >
                  <div className="text-xs font-mono text-secondary uppercase font-semibold">{metric.label}</div>
                  <div className="font-nexa text-2xl sm:text-3xl font-extrabold mt-2 text-primary">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {project.outcomeMetrics && project.outcomeMetrics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.outcomeMetrics.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-surface-container-low/80 to-surface-container/60 border border-primary/20 flex flex-col gap-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                        {outcome.label}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-nexa text-xs font-extrabold">
                        {outcome.value}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* PROJECT GALLERY PHOTOS (Editorial Stage + Interactive Lightbox) */}
          {gallery.length > 0 && (
              <section id="gallery-section" className="flex flex-col gap-5 scroll-mt-24">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
                      {t('projectDetail.visualShowcase')}
                    </span>
                    <h2 className="font-nexa text-2xl sm:text-3xl font-bold text-on-surface">
                      {t('projectDetail.galleryTitle')}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant">
                    {language === 'ar' ? 'انقر على أي صورة للتكبير' : `${gallery.length} ${gallery.length === 1 ? 'Artifact' : 'Artifacts'} • Click any visual to expand`}
                  </span>
                </div>
                <div className={`grid grid-cols-1 ${gallery.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-5`}>
                  {gallery.map((imgUrl, idx) => {
                    const isLead = idx === 0 && gallery.length > 1;
                    const isDiag = isDiagramAsset(imgUrl);
                    const caption = project.steps?.[idx]?.title;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className={`group relative rounded-3xl overflow-hidden bg-surface-container-low/75 dark:bg-surface-container-low/50 border border-outline-variant/25 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.16)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all hover:border-primary/50 ${
                          isLead ? 'md:col-span-2 lg:col-span-2' : ''
                        }`}
                      >
                        <div className={`relative w-full ${isLead ? 'aspect-[16/9]' : 'aspect-video'} bg-surface-container-lowest overflow-hidden`}>
                          <img
                            src={imgUrl}
                            alt={caption || `${project.title} — Gallery ${idx + 1}`}
                            loading="lazy"
                            className={`w-full h-full ${isDiag ? 'object-contain p-4' : 'object-cover object-top'} group-hover:scale-[1.03] transition-transform duration-300`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
                          <span className="absolute top-3.5 right-3.5 opacity-85 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full bg-black/75 text-white text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md border border-white/20">
                            <Maximize2 className="w-3 h-3 text-secondary" />
                            <span>{idx + 1} / {gallery.length}</span>
                          </span>
                          {caption && (
                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                              <span className="text-xs sm:text-sm font-nexa font-bold text-white drop-shadow-sm line-clamp-1">
                                {caption}
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
          )}

          {/* IMPLEMENTATION STEPS */}
          {(() => {
            const stepsList =
              project.steps && project.steps.length > 0
                ? project.steps
                : (project.systemFlow || []).map((flow, i) => ({
                    title: `Step ${i + 1}`,
                    description: flow,
                  }));
            if (stepsList.length === 0) return null;
            return (
              <section className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                    {t('projectDetail.executionBlueprint')}
                  </span>
                  <h2 className="font-nexa text-2xl sm:text-3xl font-bold text-on-surface">
                    {t('projectDetail.stepsTitle')}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {stepsList.map((step, idx) => (
                    <div
                      key={idx}
                      className="relative p-6 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-nexa text-base font-bold text-on-surface leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* TWO-COLUMN CASE STUDY DEEP DIVE: CHALLENGE & SOLUTION */}
          <section id="challenge-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch scroll-mt-24">
            {/* The Technical Challenge */}
            <div className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-error">
                <AlertCircle className="w-5 h-5 text-error" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">{t('projectDetail.bottleneckBadge')}</span>
              </div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.challengeTitle')}</h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {cleanProjectText(project.challenge) ||
                  `The existing architecture struggled with high ingestion latency, data fragmentation across disparate operational siloes, and escalating cloud maintenance costs under peak traffic spikes.`}
              </p>
            </div>

            {/* The Engineered Solution */}
            <div className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-secondary">
                <Cpu className="w-5 h-5 text-secondary" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">{t('projectDetail.strategyBadge')}</span>
              </div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.solutionTitle')}</h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {cleanProjectText(project.solution) ||
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
                    {t('projectDetail.pipelineBadge')}
                  </span>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">{t('projectDetail.pipelineSub')}</span>
              </div>

              <h2 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.pipelineTitle')}</h2>

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
                        <span className="text-[10px] font-mono text-secondary uppercase font-semibold">
                          {language === 'ar' ? `المرحلة ${idx + 1}` : `Stage ${idx + 1}`}
                        </span>
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
          <section id="highlights-section" className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-6 scroll-mt-24">
            <div className="flex items-center gap-2 text-secondary">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                {t('projectDetail.innovationsBadge')}
              </span>
            </div>
            <h2 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.highlightsTitle')}</h2>

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
                  {t('projectDetail.analysisBadge')}
                </span>
              </div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.tradeoffsTitle')}</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {project.keyDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/40 dark:bg-surface-container-lowest/80 border border-white/20 dark:border-white/[0.08] flex flex-col justify-between gap-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                        {t('projectDetail.decisionNum')}{idx + 1}
                      </span>
                      <h3 className="font-nexa font-bold text-base text-on-surface">{decision.title}</h3>
                      <div className="mt-2 text-xs text-on-surface leading-relaxed bg-surface-container-low/70 p-3 rounded-xl border border-outline-variant/20">
                        <strong className="text-secondary block mb-1">✓ {t('projectDetail.rationale')}</strong>
                        {decision.rationale}
                      </div>
                    </div>

                    <div className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-lowest/60 p-3 rounded-xl border border-outline-variant/20">
                      <strong className="text-error block mb-1">⚠ {t('projectDetail.evaluatedTradeOff')}</strong>
                      {decision.tradeOff}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* GITHUB REPOSITORY DOCUMENTATION (EXACT README) */}
          {project.readmeContent && (
            <section id="readme-section" className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-5 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
                    README.md • Synchronized from GitHub
                  </span>
                  <h2 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-primary" />
                    <span>Repository Documentation</span>
                  </h2>
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs font-mono text-secondary hover:text-on-surface hover:border-primary/40 transition-colors"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="relative">
                <div
                  className={`flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed ${
                    !readmeExpanded ? 'max-h-[420px] overflow-hidden' : ''
                  }`}
                >
                {(() => {
                  const lines = project.readmeContent.split(/\r?\n/);
                  const elements: React.ReactNode[] = [];
                  let inCode = false;
                  let codeLines: string[] = [];
                  let listItems: string[] = [];
                  let key = 0;

                  const flushList = () => {
                    if (listItems.length > 0) {
                      elements.push(
                        <ul key={`list-${key++}`} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-on-surface-variant">
                          {listItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      );
                      listItems = [];
                    }
                  };

                  const cleanInline = (s: string) =>
                    s
                      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                      .replace(/\*\*([^*]+)\*\*/g, '$1')
                      .replace(/`([^`]+)`/g, '$1')
                      .replace(/\s+/g, ' ')
                      .trim();

                  for (const rawLine of lines) {
                    const line = rawLine.trim();
                    if (line.startsWith('```')) {
                      flushList();
                      if (!inCode) {
                        inCode = true;
                        codeLines = [];
                      } else {
                        inCode = false;
                        elements.push(
                          <pre
                            key={`code-${key++}`}
                            className="p-4 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/25 overflow-x-auto text-xs font-mono text-zinc-200"
                          >
                            <code>{codeLines.join('\n')}</code>
                          </pre>
                        );
                      }
                      continue;
                    }
                    if (inCode) {
                      codeLines.push(rawLine);
                      continue;
                    }
                    if (!line || /^<p\b|^<\/p>|^<div\b|^<\/div>|^<img\b|^---+$/.test(line)) {
                      flushList();
                      continue;
                    }
                    const hMatch = line.match(/^(#{1,3})\s+(.+)$/);
                    if (hMatch) {
                      flushList();
                      const text = cleanInline(hMatch[2]);
                      if (!text) continue;
                      const level = hMatch[1].length;
                      elements.push(
                        <h3
                          key={`h-${key++}`}
                          className={`font-nexa font-bold text-on-surface pt-2 ${
                            level === 1 ? 'text-lg sm:text-xl' : level === 2 ? 'text-base sm:text-lg text-primary' : 'text-sm sm:text-base text-secondary'
                          }`}
                        >
                          {text}
                        </h3>
                      );
                      continue;
                    }
                    const liMatch = line.match(/^(?:[-*+]|\d+\.)\s+(.+)$/);
                    if (liMatch) {
                      const cleaned = cleanInline(liMatch[1]);
                      if (cleaned) listItems.push(cleaned);
                      continue;
                    }
                    flushList();
                    if (line.startsWith('|')) {
                      if (/^\|[\s:-]+\|/.test(line)) continue;
                      const cells = line.split('|').map((c) => cleanInline(c)).filter(Boolean);
                      if (cells.length > 0) {
                        elements.push(
                          <div key={`row-${key++}`} className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/60 border border-outline-variant/20 text-xs font-mono text-on-surface">
                            {cells.join('  •  ')}
                          </div>
                        );
                      }
                      continue;
                    }
                    const para = cleanInline(line);
                    if (para) {
                      elements.push(
                        <p key={`p-${key++}`} className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {para}
                        </p>
                      );
                    }
                  }
                  flushList();
                  return elements;
                })()}
                </div>
                {!readmeExpanded && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent" />
                )}
              </div>
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => setReadmeExpanded((prev) => !prev)}
                  className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-xs font-mono font-semibold text-primary border border-outline-variant/25 transition-colors"
                >
                  {readmeExpanded
                    ? language === 'ar'
                      ? 'طي التوثيق'
                      : 'Collapse Documentation ↑'
                    : language === 'ar'
                    ? 'عرض التوثيق بالكامل'
                    : 'Expand Full README.md ↓'}
                </button>
              </div>
            </section>
          )}

          {/* TECHNOLOGY ARSENAL */}
          <section id="tech-section" className="p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4 scroll-mt-24">
            <h2 className="font-nexa text-xl font-bold text-on-surface flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span>{t('projectDetail.techArsenal')}</span>
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

          {/* RELATED CASE STUDIES IN SAME DOMAIN */}
          {relatedProjects.length > 0 && (
            <section id="related-section" className="flex flex-col gap-6 scroll-mt-24 pt-4">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-outline-variant/20 pb-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
                    {language === 'ar' ? 'المزيد في نفس المجال' : `More in ${project.category}`}
                  </span>
                  <h2 className="font-nexa text-2xl font-extrabold text-on-surface">
                    {language === 'ar' ? 'مشاريع ودراسات حالة ذات صلة' : 'Related Case Studies'}
                  </h2>
                </div>
                <Link
                  href="/projects"
                  className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'كافة المشاريع' : 'View All Projects'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => (
                  <ProjectCard
                    key={rel.id}
                    project={rel}
                    language={language}
                    onSelectBlueprint={(p) => setActiveBlueprint(p)}
                  />
                ))}
              </div>
            </section>
          )}

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
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform rtl-flip" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">{t('projectDetail.prevCase')}</span>
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
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">{t('projectDetail.nextCase')}</span>
                  <span className="font-nexa font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate max-w-[240px]">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform rtl-flip" />
              </Link>
            )}
          </nav>
        </div>
      </main>

      {/* Interactive Gallery Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} gallery photo ${lightboxIndex + 1} of ${gallery.length}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative z-10 w-full max-w-5xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="truncate font-semibold text-white">
                    {project.steps?.[lightboxIndex]?.title || project.title}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {project.title} &bull; {lightboxIndex + 1} / {gallery.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={gallery[lightboxIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-100 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Original</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close gallery lightbox"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black/70 border border-white/15 shadow-2xl flex items-center justify-center max-h-[72vh]">
                <img
                  src={gallery[lightboxIndex]}
                  alt={project.steps?.[lightboxIndex]?.title || `${project.title} — Gallery ${lightboxIndex + 1}`}
                  className="max-h-[72vh] w-auto object-contain"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)}
                      aria-label="Previous gallery image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}
                      aria-label="Next gallery image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                  {gallery.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className={`w-16 h-10 rounded-lg overflow-hidden border transition-all shrink-0 ${
                        idx === lightboxIndex
                          ? 'border-secondary ring-2 ring-secondary/60 scale-105'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ArchitectureModal
        project={activeBlueprint}
        isOpen={!!activeBlueprint}
        onClose={() => setActiveBlueprint(null)}
      />

      <SiteFooter />
    </div>
  );
}
