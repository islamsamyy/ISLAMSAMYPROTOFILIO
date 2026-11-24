'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { useProjects } from '@/lib/hooks';
import { cleanProjectText, isDiagramAsset } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Activity,
  Terminal,
  ChevronRight,
  AlertCircle,
  FolderGit2,
  Share2,
  Check,
  X,
  ChevronLeft,
  Maximize2,
  BookOpen,
  Layers,
  Building2,
  UserCheck,
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeProjects = projects.length > 0 ? projects : initialProjects;
  const project =
    activeProjects.find((p) => p.id === projectId) ||
    initialProject ||
    initialProjects.find((p) => p.id === projectId) ||
    initialProjects[0];

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
      else if (e.key === 'ArrowRight')
        setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      else if (e.key === 'ArrowLeft')
        setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
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

  if (!project && loaded) {
    return (
      <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="w-full pt-32 pb-24 flex-1 flex items-center justify-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] text-center max-w-lg mx-auto flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-primary" />
            <h1 className="font-nexa text-2xl font-bold text-on-surface">{t('projectDetail.notFoundTitle')}</h1>
            <p className="text-xs text-on-surface-variant">{t('projectDetail.notFoundDesc')}</p>
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
        <div className="max-w-[1400px] mx-auto px-gutter flex flex-col gap-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-between gap-4 text-xs font-mono text-on-surface-variant"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Link href="/" className="hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-50 rtl-flip shrink-0" />
              <Link href="/projects" className="hover:text-primary transition-colors">
                {t('footer.projectsLink')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-50 rtl-flip shrink-0" />
              <span className="text-primary font-semibold truncate">{project.title}</span>
            </div>

            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />
              <span>{t('projectDetail.backToAll')}</span>
            </Link>
          </nav>

          {/* EDITORIAL HERO HEADER */}
          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-label-md font-bold uppercase tracking-wider">
                {project.category}
              </span>
              {project.impactMetric && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30 text-xs font-mono font-semibold">
                  <Activity className="w-3.5 h-3.5 text-secondary" />
                  <span>{project.impactMetric}</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-surface-container-low/80 text-on-surface-variant border border-outline-variant/25 text-xs font-mono">
                {project.role}
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
              {project.title}
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-4xl">
              {cleanProjectText(project.summary)}
            </p>

            {/* Primary Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:shadow-[0_0_30px_rgba(160,120,255,0.6)] transition-all hover:scale-[1.02]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projectDetail.codebaseSpec')}</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-nexa text-xs font-bold uppercase tracking-wider border border-outline-variant/30 transition-all"
                >
                  <FolderGit2 className="w-4 h-4 text-secondary" />
                  <span>GitHub</span>
                </a>
              )}

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-nexa text-xs font-bold uppercase tracking-wider border border-outline-variant/30 transition-all"
              >
                <Calendar className="w-4 h-4 text-primary" />
                <span>{t('projectDetail.bookAdvisory')}</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-mono text-xs border border-outline-variant/25 transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>
                  {copiedLink
                    ? language === 'ar'
                      ? 'تم النسخ!'
                      : 'Copied!'
                    : language === 'ar'
                    ? 'مشاركة'
                    : 'Share'}
                </span>
              </button>
            </div>
          </header>

          {/* HERO COVER VISUAL */}
          {gallery.length > 0 && (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden bg-surface-container-lowest border border-outline-variant/25 dark:border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.35)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={gallery[0]}
                alt={project.title}
                className={`w-full h-full ${
                  isDiagramAsset(gallery[0]) ? 'object-contain p-6' : 'object-cover object-top'
                } group-hover:scale-[1.02] transition-transform duration-500`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-secondary" />
                <span>
                  {language === 'ar'
                    ? `عرض الصور (${gallery.length})`
                    : `Inspect Fullscreen (${gallery.length})`}
                </span>
              </div>
            </button>
          )}

          {/* COMPACT METRICS STRIP */}
          {project.metrics && project.metrics.length > 0 && (
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/65 dark:bg-surface-container-low/45 backdrop-blur-xl border border-outline-variant/25 dark:border-white/[0.08] flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-secondary uppercase font-semibold tracking-wider">
                    {metric.label}
                  </span>
                  <span className="font-nexa text-xl sm:text-2xl font-extrabold mt-1.5 text-primary">
                    {metric.value}
                  </span>
                </div>
              ))}
            </section>
          )}

          {/* PROJECT INFO & TECH STACK BAR (FULL WIDTH) */}
          <section className="p-6 sm:p-7 rounded-3xl bg-surface-container-low/60 dark:bg-surface-container-low/45 backdrop-blur-2xl border border-outline-variant/25 dark:border-white/[0.08] flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex items-center gap-3">
                {project.companyLogo && (
                  <div className="w-11 h-11 rounded-xl bg-white/85 dark:bg-surface-container-highest p-1.5 border border-outline-variant/30 flex items-center justify-center shrink-0">
                    <img
                      src={project.companyLogo}
                      alt={project.client}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                    {t('projectDetail.clientOrg')}
                  </span>
                  <span className="text-sm font-nexa font-bold text-on-surface truncate">
                    {project.client}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-on-surface-variant">Role</span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface">{project.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-secondary shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-on-surface-variant">Category</span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface">{project.category}</span>
                </div>
              </div>

              {project.impactMetric && (
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase text-on-surface-variant">Key Impact</span>
                    <span className="text-xs sm:text-sm font-semibold text-secondary">{project.impactMetric}</span>
                  </div>
                </div>
              )}
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5 font-semibold me-2">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>{t('projectDetail.techArsenal')}:</span>
                </span>
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-high/70 text-[11px] font-mono font-semibold text-on-surface border border-outline-variant/25"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* FULL-WIDTH ARTICLE & DESCRIPTION */}
          <article className="w-full flex flex-col gap-8">
              {/* Challenge & Solution Editorial Prose */}
              {(project.challenge || project.solution) && (
                <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-low/55 dark:bg-surface-container-low/40 backdrop-blur-2xl border border-outline-variant/25 dark:border-white/[0.08] flex flex-col gap-7">
                  <div className="flex items-center gap-2 text-primary border-b border-outline-variant/20 pb-3">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">
                      {language === 'ar' ? 'نظرة عامة على المشروع' : 'Project Overview & Story'}
                    </span>
                  </div>

                  {project.challenge && (
                    <div className="flex flex-col gap-2.5">
                      <h2 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface">
                        {t('projectDetail.challengeTitle')}
                      </h2>
                      <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-8 border-s-2 border-error/50 ps-4">
                        {cleanProjectText(project.challenge)}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="flex flex-col gap-2.5">
                      <h2 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface">
                        {t('projectDetail.solutionTitle')}
                      </h2>
                      <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-8 border-s-2 border-secondary/60 ps-4">
                        {cleanProjectText(project.solution)}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Key Highlights */}
              {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-low/55 dark:bg-surface-container-low/40 backdrop-blur-2xl border border-outline-variant/25 dark:border-white/[0.08] flex flex-col gap-5">
                  <h2 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface">
                    {t('projectDetail.highlightsTitle')}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {project.architectureHighlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-on-surface-variant leading-relaxed"
                      >
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FULL PROJECT ARTICLE / README DOCUMENTATION */}
              {project.readmeContent && (
                <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-low/55 dark:bg-surface-container-low/40 backdrop-blur-2xl border border-outline-variant/25 dark:border-white/[0.08] flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20 pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[11px] text-secondary uppercase tracking-widest font-semibold">
                        {language === 'ar' ? 'المقال والتوثيق الكامل' : 'Full Technical Article & Documentation'}
                      </span>
                      <h2 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface">
                        {project.title}
                      </h2>
                    </div>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-xs font-mono text-secondary hover:text-on-surface transition-colors"
                      >
                        <span>README.md</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 text-sm sm:text-base text-on-surface-variant leading-8">
                    {(() => {
                      const lines = project.readmeContent.split(/\r?\n/);
                      const elements: React.ReactNode[] = [];
                      let inCode = false;
                      let codeLines: string[] = [];
                      let listItems: string[] = [];
                      let tableRows: string[][] = [];
                      let key = 0;

                      const flushList = () => {
                        if (listItems.length > 0) {
                          elements.push(
                            <ul
                              key={`list-${key++}`}
                              className="list-disc ps-6 space-y-2 text-sm sm:text-base text-on-surface-variant leading-7"
                            >
                              {listItems.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          );
                          listItems = [];
                        }
                      };

                      const flushTable = () => {
                        if (tableRows.length > 0) {
                          const [header, ...body] = tableRows;
                          elements.push(
                            <div
                              key={`tbl-${key++}`}
                              className="overflow-x-auto rounded-2xl border border-outline-variant/25 bg-surface-container-lowest/60 my-2"
                            >
                              <table className="w-full text-xs sm:text-sm text-start border-collapse">
                                <thead>
                                  <tr className="bg-surface-container-high/70 border-b border-outline-variant/25">
                                    {header.map((cell, cIdx) => (
                                      <th
                                        key={cIdx}
                                        className="px-3.5 py-2.5 font-nexa font-bold text-primary text-start whitespace-nowrap"
                                      >
                                        {cell}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/15">
                                  {body.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-surface-container-high/30 transition-colors">
                                      {row.map((cell, cIdx) => (
                                        <td
                                          key={cIdx}
                                          className={`px-3.5 py-2.5 text-on-surface-variant align-top ${
                                            cIdx === 0 ? 'font-semibold text-on-surface' : ''
                                          }`}
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                          tableRows = [];
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
                          flushTable();
                          if (!inCode) {
                            inCode = true;
                            codeLines = [];
                          } else {
                            inCode = false;
                            elements.push(
                              <pre
                                key={`code-${key++}`}
                                className="p-4 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/25 overflow-x-auto text-xs font-mono text-zinc-200 leading-relaxed"
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
                          flushTable();
                          continue;
                        }
                        if (line.startsWith('|')) {
                          flushList();
                          if (/^\|[\s:-]+\|/.test(line)) continue;
                          const cells = line
                            .split('|')
                            .slice(1, -1)
                            .map((c) => cleanInline(c));
                          if (cells.length > 0) {
                            tableRows.push(cells);
                          }
                          continue;
                        }
                        flushTable();
                        if (line.startsWith('>')) {
                          flushList();
                          const quoteText = cleanInline(line.replace(/^>\s*/, ''));
                          if (quoteText) {
                            elements.push(
                              <blockquote
                                key={`q-${key++}`}
                                className="px-4 py-3 rounded-xl border-s-4 border-primary bg-primary/5 text-sm text-on-surface font-medium"
                              >
                                {quoteText}
                              </blockquote>
                            );
                          }
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
                              className={`font-nexa font-bold text-on-surface pt-3 ${
                                level === 1
                                  ? 'text-xl sm:text-2xl'
                                  : level === 2
                                  ? 'text-lg sm:text-xl text-primary'
                                  : 'text-base sm:text-lg text-secondary'
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
                        const para = cleanInline(line);
                        if (para) {
                          elements.push(
                            <p key={`p-${key++}`} className="text-sm sm:text-base text-on-surface-variant leading-8">
                              {para}
                            </p>
                          );
                        }
                      }
                      flushList();
                      flushTable();
                      return elements;
                    })()}
                  </div>
                </section>
              )}

              {/* ADDITIONAL VISUAL GALLERY (when more than 1 image) */}
              {gallery.length > 1 && (
                <section className="flex flex-col gap-4">
                  <div className="flex items-end justify-between gap-3">
                    <h2 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface">
                      {t('projectDetail.galleryTitle')}
                    </h2>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {gallery.length} {language === 'ar' ? 'صور' : 'Images'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.slice(1).map((imgUrl, idx) => {
                      const realIdx = idx + 1;
                      const isDiag = isDiagramAsset(imgUrl);
                      const caption = project.steps?.[realIdx]?.title;
                      return (
                        <button
                          key={realIdx}
                          type="button"
                          onClick={() => setLightboxIndex(realIdx)}
                          className="group relative aspect-video rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/25 dark:border-white/15 hover:border-primary/50 transition-all text-left"
                        >
                          <img
                            src={imgUrl}
                            alt={caption || `${project.title} — ${realIdx + 1}`}
                            loading="lazy"
                            className={`w-full h-full ${
                              isDiag ? 'object-contain p-3' : 'object-cover object-top'
                            } group-hover:scale-[1.03] transition-transform duration-300`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                          {caption && (
                            <span className="absolute bottom-2.5 left-3 right-3 text-xs font-nexa font-bold text-white line-clamp-1">
                              {caption}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}
            </article>

          {/* NEXT / PREVIOUS PROJECT NAVIGATION */}
          <nav
            aria-label="Previous and Next Case Studies"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-surface-container-high/60"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group p-5 rounded-2xl bg-surface-container-low/40 hover:bg-surface-container-low/70 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] transition-all flex items-center gap-3"
              >
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform rtl-flip shrink-0" />
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">
                    {t('projectDetail.prevCase')}
                  </span>
                  <span className="font-nexa font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate">
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
                <div className="flex flex-col text-right min-w-0">
                  <span className="text-[10px] font-mono uppercase text-on-surface-variant">
                    {t('projectDetail.nextCase')}
                  </span>
                  <span className="font-nexa font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform rtl-flip shrink-0" />
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

      <SiteFooter />
    </div>
  );
}
