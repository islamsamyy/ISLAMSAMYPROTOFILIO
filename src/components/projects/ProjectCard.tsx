'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Layers, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ProjectItem } from '@/data/seedProjects';
import { cleanProjectText, getProjectCover, isDiagramAsset } from '@/lib/utils';

interface ProjectCardProps {
  project: ProjectItem;
  onSelectBlueprint: (project: ProjectItem) => void;
  variant?: 'featured' | 'standard' | 'compact';
  language?: 'en' | 'ar';
}

function ClientEmblem({ project }: { project: ProjectItem }) {
  const [imgFailed, setImgFailed] = useState(false);
  const logo = project.companyLogo;
  const shouldUseMonogram = !logo || imgFailed || isDiagramAsset(logo);

  if (shouldUseMonogram) {
    const cleanClient = project.client.replace(/^GitHub\s*•\s*/i, '').trim();
    const initials = cleanClient
      .split(/[\s/\-_]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');

    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 border border-primary/30 flex items-center justify-center font-nexa text-xs font-extrabold text-primary shrink-0 shadow-sm">
        {initials || 'PR'}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-xl bg-white/95 dark:bg-surface-container-high border border-outline-variant/30 overflow-hidden p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/40 transition-colors">
      <img
        src={logo}
        alt={project.client}
        onError={() => setImgFailed(true)}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
}

export function ProjectCard({
  project,
  onSelectBlueprint,
  variant = 'standard',
  language = 'en',
}: ProjectCardProps) {
  const coverSrc = getProjectCover(project as ProjectItem & { coverImage?: string });
  const isDiagram = isDiagramAsset(coverSrc);
  const cleanSummary = cleanProjectText(project.summary);
  const galleryCount = project.galleryImages?.length || 0;
  const isArabic = language === 'ar';

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25 }}
        className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-surface-container-low/75 dark:bg-surface-container-low/55 backdrop-blur-xl border border-outline-variant/30 dark:border-white/[0.08] hover:border-primary/50 shadow-sm hover:shadow-lg transition-all"
      >
        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
          <ClientEmblem project={project} />

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-semibold">
                {project.client}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono text-on-surface-variant border border-outline-variant/20">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-mono font-bold">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{isArabic ? 'مميز' : 'Flagship'}</span>
                </span>
              )}
            </div>

            <Link href={`/projects/${project.id}`} className="group/link">
              <h3 className="font-nexa text-base sm:text-lg font-bold text-on-surface group-hover/link:text-primary transition-colors truncate">
                {project.title}
              </h3>
            </Link>

            <p className="text-xs text-on-surface-variant line-clamp-1 max-w-2xl">
              {cleanSummary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 sm:justify-end">
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-mono font-bold">
            {project.impactMetric}
          </span>

          <div className="hidden xl:flex items-center gap-1">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-surface-container-high text-[10px] font-mono text-on-surface-variant border border-outline-variant/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelectBlueprint(project)}
            className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-xs font-mono text-on-surface-variant hover:text-on-surface border border-outline-variant/25 transition-colors"
            title={isArabic ? 'المخطط المعماري' : 'Quick Architecture Blueprint'}
          >
            {isArabic ? 'المخطط' : 'Blueprint'}
          </button>

          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-nexa font-bold transition-colors"
          >
            <span>{isArabic ? 'التفاصيل' : 'Case Study'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
          </Link>
        </div>
      </motion.div>
    );
  }

  const isFeaturedVariant = variant === 'featured';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col justify-between h-full rounded-3xl bg-surface-container-low/95 dark:bg-surface-container-low/55 backdrop-blur-2xl border ${
        isFeaturedVariant
          ? 'border-outline dark:border-white/20 shadow-md dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
          : 'border-outline-variant dark:border-white/[0.08] shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
      } hover:border-outline hover:shadow-lg transition-all duration-300 overflow-hidden`}
    >
      {/* Top Specular Rim Light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent pointer-events-none z-10" />

      {/* 1. Visual Stage */}
      {coverSrc && (
        <Link
          href={`/projects/${project.id}`}
          className={`relative w-full ${
            isFeaturedVariant ? 'aspect-[16/9]' : 'aspect-[16/10]'
          } overflow-hidden bg-surface-container-lowest border-b border-outline-variant/20 dark:border-white/[0.08] block`}
        >
          {isDiagram ? (
            <div className="w-full h-full flex items-center justify-center p-4 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]">
              <img
                src={coverSrc}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </div>
          ) : (
            <img
              src={coverSrc}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            />
          )}

          {/* Subtle Gradient Scrim for Legible Badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35 pointer-events-none" />

          {/* Top Bar Badges (Clean, Non-Overlapping) */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-zinc-100 shadow-sm">
              {project.category}
            </span>

            <div className="flex items-center gap-1.5">
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-on-primary shadow-sm">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{isFeaturedVariant ? (isArabic ? 'مشروع قيادي' : 'Signature') : (isArabic ? 'مميز' : 'Flagship')}</span>
                </span>
              )}
              {galleryCount > 1 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-secondary shadow-sm">
                  <ImageIcon className="w-2.5 h-2.5" />
                  <span>{galleryCount}</span>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Impact Metric Callout on Stage */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-secondary/35 text-[11px] font-mono font-bold text-secondary truncate max-w-[75%]">
              {project.impactMetric}
            </span>
            <span className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 px-2.5 py-1 rounded-lg bg-primary text-on-primary text-[10px] font-nexa font-bold uppercase tracking-wider">
              {isArabic ? 'عرض' : 'Inspect →'}
            </span>
          </div>
        </Link>
      )}

      {/* 2. Content Body (Strict Scannable Rhythm) */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Client Lockup */}
        <div className="flex items-center gap-3 min-w-0">
          <ClientEmblem project={project} />
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[11px] text-secondary font-semibold uppercase tracking-wider truncate">
              {project.client}
            </span>
            <span className="text-xs text-on-surface-variant truncate">
              {project.role}
            </span>
          </div>
        </div>

        {/* Title & Readable Summary */}
        <div className="flex flex-col gap-2">
          <Link href={`/projects/${project.id}`}>
            <h3 className="font-nexa text-lg sm:text-xl font-extrabold text-on-surface group-hover:text-primary transition-colors leading-[1.3] line-clamp-2 cursor-pointer">
              {project.title}
            </h3>
          </Link>
          <p className="font-body-sm text-[13.5px] text-on-surface-variant leading-[1.6] line-clamp-3">
            {cleanSummary}
          </p>
        </div>

        {/* Key Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded-xl bg-surface-container-lowest/85 border border-outline-variant/20 dark:border-white/[0.06] flex flex-col gap-0.5"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant truncate">
                  {m.label}
                </span>
                <span className="text-xs sm:text-sm font-nexa font-bold text-on-surface truncate">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills (Max 4 + Overflow) */}
        <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-surface-container-high/85 text-[11px] font-mono text-on-surface-variant border border-outline-variant/25"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-[11px] font-mono font-semibold text-primary border border-primary/20">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* 3. Card Action Footer */}
      <div className="px-6 py-3.5 bg-surface-container-lowest/75 border-t border-outline-variant/20 dark:border-surface-container-high/60 flex items-center justify-between gap-3">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-nexa font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors"
        >
          <span>{isArabic ? 'دراسة الحالة' : 'Deep Dive Case Study'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl-flip group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectBlueprint(project)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high/70 hover:bg-surface-container-highest text-[11px] font-mono text-on-surface-variant hover:text-on-surface border border-outline-variant/20 transition-colors"
            title={isArabic ? 'المخطط المعماري السريع' : 'Quick Architectural Blueprint'}
          >
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">{isArabic ? 'المخطط' : 'Blueprint'}</span>
          </button>

          {(project.liveDemoUrl || project.githubUrl) && (
            <a
              href={project.liveDemoUrl || project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-high/70 hover:bg-secondary/20 text-secondary border border-outline-variant/20 hover:border-secondary/40 transition-colors"
              title={project.liveDemoUrl ? 'Open Live / Repo URL' : 'Open GitHub Repository'}
              aria-label={`Open external link for ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
