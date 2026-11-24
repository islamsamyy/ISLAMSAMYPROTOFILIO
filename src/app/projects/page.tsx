'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  X,
  Pause,
  Play,
  LayoutGrid,
  List,
  Layers,
  Cpu,
  Database,
  Code2,
  BarChart3,
  Building2,
  ArrowRight,
  Calendar,
  FolderGit2,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArchitectureModal } from '@/components/projects/ArchitectureModal';
import { TiltCard } from '@/components/ui/TiltCard';
import { useProjects } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectItem } from '@/data/seedProjects';
import { cleanProjectText, isDiagramAsset } from '@/lib/utils';

const CATEGORIES = [
  'All Projects',
  'ERP Systems',
  'Data Engineering',
  'Software Engineering & Online Systems',
  'Data Analysis & Power BI',
  'AI & Machine Learning',
] as const;

type ScopeFilter = 'all' | 'featured' | 'repo';
type SortOption = 'curated' | 'visuals' | 'stack' | 'alpha';
type ViewMode = 'grid' | 'compact';

export default function ProjectsPage() {
  const { projects, loaded } = useProjects();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlueprint, setActiveBlueprint] = useState<ProjectItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeSubImageIdx, setActiveSubImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const CATEGORY_MAP: Record<string, string> = {
    'All Projects': isArabic ? 'كافة المشاريع' : 'All Domains',
    'ERP Systems': isArabic ? 'أنظمة تخطيط الموارد (ERP)' : 'ERP Systems',
    'Data Engineering': isArabic ? 'هندسة البيانات' : 'Data Engineering',
    'Software Engineering & Online Systems': isArabic ? 'هندسة البرمجيات والأنظمة والمواقع' : 'Software Eng & Online Systems',
    'Data Analysis & Power BI': isArabic ? 'تحليل البيانات وPower BI' : 'Data Analysis & Power BI',
    'AI & Machine Learning': isArabic ? 'الذكاء الاصطناعي وتعلم الآلة' : 'AI & Machine Learning',
  };

  const DOMAIN_PILLARS = [
    {
      id: 'ERP Systems',
      title: CATEGORY_MAP['ERP Systems'],
      desc: isArabic ? 'أنظمة إدارة المصانع والعمليات والتكاليف الصناعية' : 'Enterprise & Industrial ERP Platforms, OEE & Costing',
      icon: Building2,
      accent: 'text-primary border-primary/30 bg-primary/10',
    },
    {
      id: 'Data Engineering',
      title: CATEGORY_MAP['Data Engineering'],
      desc: isArabic ? 'مستودعات البيانات، Kafka CDC، وتدفقات ETL' : 'Kafka CDC, ClickHouse Lakehouses & Real-Time Pipelines',
      icon: Database,
      accent: 'text-secondary border-secondary/30 bg-secondary/10',
    },
    {
      id: 'Software Engineering & Online Systems',
      title: CATEGORY_MAP['Software Engineering & Online Systems'],
      desc: isArabic ? 'منصات ويب متكاملة، متاجر إلكترونية ومواقع' : 'Full-Stack Web Platforms, Marketplaces & Online Portals',
      icon: Code2,
      accent: 'text-tertiary border-tertiary/30 bg-tertiary/10',
    },
    {
      id: 'Data Analysis & Power BI',
      title: CATEGORY_MAP['Data Analysis & Power BI'],
      desc: isArabic ? 'لوحات معلومات Power BI، DAX والتحليل الاستكشافي' : 'Power BI Executive Dashboards, DAX & EDA Suites',
      icon: BarChart3,
      accent: 'text-secondary border-secondary/30 bg-secondary/10',
    },
    {
      id: 'AI & Machine Learning',
      title: CATEGORY_MAP['AI & Machine Learning'],
      desc: isArabic ? 'وكلاء الذكاء الاصطناعي RAG ونماذج التنبؤ' : 'RAG AI Agents, Predictive ML Models & Automations',
      icon: Cpu,
      accent: 'text-primary border-primary/30 bg-primary/10',
    },
  ];

  // Spotlight slides: prioritize flagship projects with crisp raster screenshots
  const slides = useMemo(() => {
    const withRaster = projects.filter((p) =>
      p.galleryImages?.some((u) => !isDiagramAsset(u))
    );
    const source = withRaster.length > 0 ? withRaster : projects;
    return source.slice(0, 10).map((p) => {
      const imgs =
        p.galleryImages && p.galleryImages.length > 0
          ? p.galleryImages
          : p.companyLogo
          ? [p.companyLogo]
          : [];
      return { project: p, images: imgs };
    }).filter((item) => item.images.length > 0);
  }, [projects]);

  useEffect(() => {
    setActiveSubImageIdx(0);
  }, [slideIndex]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  // Top technologies across all projects for the Interactive Tech Matrix
  const topTechnologies = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const tech of p.techStack) {
        const key = tech.trim();
        if (!key) continue;
        counts.set(key, (counts.get(key) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14);
  }, [projects]);

  // Filtered projects (all projects together in one list)
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((p) => {
      if (selectedCategory !== 'All Projects' && p.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        cleanProjectText(p.summary).toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, selectedCategory, searchQuery]);

  const totalFlagshipCount = projects.filter((p) => p.featured).length;
  const totalRepoCount = projects.length - totalFlagshipCount;
  const totalScreenshots = projects.reduce((acc, p) => acc + (p.galleryImages?.length || 0), 0);

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[1440px] mx-auto px-gutter flex flex-col gap-14">

          {/* SECTION 1: EDITORIAL HERO & CAPABILITY POSITIONING */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto gap-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low/80 dark:bg-white/[0.06] border border-secondary/40 shadow-[0_0_24px_rgba(123,208,255,0.22)] backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]" />
              <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                {isArabic
                  ? 'دراسات حالة بيئات الإنتاج • مستودعات GitHub'
                  : 'Production Case Studies • Open-Source Engineering Vault'}
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-on-surface leading-[1.12]">
              {t('pages.projectsTitle', 'Enterprise Engineering & Data Projects')}
            </h1>

            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-2xl">
              {t(
                'pages.projectsSubtitle',
                'Showcase of production-tested systems featuring verified company logos, architecture blueprints, and real-time telemetry metrics built over 6 years of technical leadership.'
              )}
            </p>

            {/* Hero Action Strip & Telemetry Summary */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href="#project-explorer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(160,120,255,0.4)] hover:opacity-95 transition-all"
              >
                <span>{isArabic ? 'استكشاف المشاريع' : 'Browse Project Gallery'}</span>
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </a>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low/85 hover:bg-surface-container-high border border-outline-variant/35 text-xs font-nexa font-bold uppercase tracking-wider text-on-surface transition-all"
              >
                <Calendar className="w-4 h-4 text-secondary" />
                <span>{isArabic ? 'حجز استشارة معمارية' : 'Book Architecture Review'}</span>
              </Link>
            </div>

            {/* Clean Telemetry Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs font-mono text-on-surface-variant">
              <span>
                <strong className="text-on-surface font-nexa text-sm">{projects.length}</strong>{' '}
                {isArabic ? 'مشروع ومستودع' : 'Total Systems'}
              </span>
              <span className="opacity-30">&bull;</span>
              <span>
                <strong className="text-primary font-nexa text-sm">{totalFlagshipCount}</strong>{' '}
                {isArabic ? 'دراسة حالة مميزة' : 'Flagship Case Studies'}
              </span>
              <span className="opacity-30">&bull;</span>
              <span>
                <strong className="text-secondary font-nexa text-sm">{totalRepoCount}</strong>{' '}
                {isArabic ? 'مستودع GitHub' : 'Open-Source Repos'}
              </span>
              <span className="opacity-30">&bull;</span>
              <span>
                <strong className="text-on-surface font-nexa text-sm">{totalScreenshots}+</strong>{' '}
                {isArabic ? 'لقطة ومخطط' : 'Visual Artifacts'}
              </span>
            </div>
          </motion.section>

          {/* SECTION 2: INTERACTIVE ENGINEERING PILLARS (CLICK TO FILTER DOMAIN) */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            aria-label="Engineering Domains"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {DOMAIN_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const count = projects.filter((p) => p.category === pillar.id).length;
              const isSelected = selectedCategory === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(isSelected ? 'All Projects' : pillar.id);
                    document.getElementById('project-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left p-5 rounded-3xl backdrop-blur-2xl border transition-all flex flex-col justify-between gap-3 group ${
                    isSelected
                      ? 'bg-primary-container/25 border-primary shadow-[0_8px_32px_rgba(160,120,255,0.2)]'
                      : 'bg-surface-container-low/70 dark:bg-surface-container-low/45 border-outline-variant/25 dark:border-white/[0.08] hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${pillar.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-[11px] font-mono font-bold text-on-surface">
                      {count} {isArabic ? 'مشاريع' : 'Projects'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-nexa text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h2>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.section>

          {/* SECTION 3: FEATURED SPOTLIGHT STAGE */}
          {slides.length > 0 && (() => {
            const safeIdx = slideIndex % slides.length;
            const current = slides[safeIdx];
            const currentImg = current.images[activeSubImageIdx % current.images.length] || current.images[0];
            const isDiagram = isDiagramAsset(currentImg);

            return (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Featured Visual Project Spotlight"
                className="relative rounded-3xl bg-surface-container-low/75 dark:bg-surface-container-low/55 backdrop-blur-2xl border border-outline-variant/30 dark:border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.22)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45)] overflow-hidden"
              >
                {/* Spotlight Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-4 border-b border-outline-variant/20 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                      {isArabic ? 'تسليط الضوء البصري على المشاريع' : 'Flagship Visual Spotlight'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-on-surface-variant mr-1">
                      {safeIdx + 1} / {slides.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPaused((p) => !p)}
                      aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                      className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-outline-variant/25 dark:border-white/10 text-on-surface transition-colors"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 text-secondary" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                      aria-label="Previous project slide"
                      className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-outline-variant/25 dark:border-white/10 text-on-surface transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                      aria-label="Next project slide"
                      className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-outline-variant/25 dark:border-white/10 text-on-surface transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Spotlight Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Visual Stage */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] bg-surface-container-lowest overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={current.project.id + currentImg}
                        src={currentImg}
                        alt={current.project.title}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`w-full h-full ${isDiagram ? 'object-contain p-6' : 'object-cover object-top'}`}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-zinc-100">
                        {current.project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-primary/90 text-on-primary text-[11px] font-mono font-bold shadow-md">
                        {current.project.impactMetric}
                      </span>
                    </div>

                    {/* Multi-screen sub-switcher inside current spotlight project */}
                    {current.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/15 overflow-x-auto">
                          {current.images.map((img, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActiveSubImageIdx(i)}
                              className={`w-12 h-8 rounded-lg overflow-hidden border transition-all shrink-0 ${
                                i === activeSubImageIdx % current.images.length
                                  ? 'border-secondary ring-2 ring-secondary/50'
                                  : 'border-white/20 opacity-60 hover:opacity-100'
                              }`}
                              title={`View screen ${i + 1}`}
                            >
                              <img src={img} alt="" className="w-full h-full object-cover object-top" />
                            </button>
                          ))}
                        </div>
                        <span className="hidden sm:inline px-2.5 py-1 rounded-lg bg-black/70 text-[10px] font-mono text-zinc-200 border border-white/15">
                          {(activeSubImageIdx % current.images.length) + 1} / {current.images.length} Screens
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Editorial Brief */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-secondary uppercase tracking-wider font-semibold truncate">
                          {current.project.client}
                        </span>
                        <span className="text-[11px] font-mono text-on-surface-variant shrink-0">
                          {current.project.role}
                        </span>
                      </div>

                      <h3 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                        {current.project.title}
                      </h3>

                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                        {cleanProjectText(current.project.summary)}
                      </p>

                      {/* Key Highlights (Top 2 scannable bullets) */}
                      {current.project.architectureHighlights?.length > 0 && (
                        <ul className="space-y-1.5 pt-1">
                          {current.project.architectureHighlights.slice(0, 2).map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {current.project.techStack.slice(0, 6).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-surface-container-high text-[11px] font-mono text-on-surface-variant border border-outline-variant/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-outline-variant/20 dark:border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <Link
                          href={`/projects/${current.project.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(160,120,255,0.35)] hover:opacity-90 transition-opacity"
                        >
                          <span>{isArabic ? 'عرض التفاصيل' : 'Explore Case Study'}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setActiveBlueprint(current.project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-xs font-mono text-on-surface border border-outline-variant/25 transition-colors"
                        >
                          <Layers className="w-3.5 h-3.5 text-primary" />
                          <span>{isArabic ? 'المخطط' : 'Blueprint'}</span>
                        </button>
                      </div>

                      {(current.project.liveDemoUrl || current.project.githubUrl) && (
                        <a
                          href={current.project.liveDemoUrl || current.project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-on-surface transition-colors"
                        >
                          <span>GitHub / Live</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Project Selector Strip */}
                <div className="px-6 py-3 bg-surface-container-lowest/70 border-t border-outline-variant/20 dark:border-white/[0.06] flex items-center gap-2.5 overflow-x-auto">
                  {slides.map((s, idx) => (
                    <button
                      key={s.project.id}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      className={`relative shrink-0 w-20 h-12 rounded-xl overflow-hidden border transition-all ${
                        idx === safeIdx
                          ? 'border-primary ring-2 ring-primary/50 scale-105'
                          : 'border-outline-variant/25 dark:border-white/15 opacity-60 hover:opacity-100'
                      }`}
                      title={s.project.title}
                    >
                      <img
                        src={s.images[0]}
                        alt={s.project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </motion.section>
            );
          })()}

          {/* UNIFIED ALL-PROJECTS GALLERY (NO FILTERS IN BETWEEN) */}
          <section id="project-explorer" className="scroll-mt-24 flex flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                  {isArabic ? 'كافة المشاريع ودراسات الحالة' : 'Complete Engineering Portfolio'}
                </span>
                <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                  {isArabic ? 'جميع المشاريع' : 'All Projects'} ({filteredProjects.length})
                </h2>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isArabic ? 'ابحث في المشاريع...' : 'Search projects...'}
                  className="w-full sm:w-72 px-3.5 py-2 rounded-xl bg-surface-container-low/80 border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {selectedCategory !== 'All Projects' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All Projects')}
                    className="px-3 py-2 rounded-xl bg-primary/15 text-primary border border-primary/30 text-xs font-mono font-bold whitespace-nowrap"
                  >
                    {selectedCategory} ✕
                  </button>
                )}
              </div>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    language={language}
                    onSelectBlueprint={(p) => setActiveBlueprint(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-surface-container-low/60 border border-outline-variant/25 text-center flex flex-col items-center gap-3">
                <p className="font-nexa text-lg font-bold text-on-surface">
                  {isArabic ? 'لا توجد مشاريع مطابقة للبحث' : 'No matching projects found'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Projects');
                  }}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider"
                >
                  {isArabic ? 'عرض جميع المشاريع' : 'Show All Projects'}
                </button>
              </div>
            )}
          </section>

          {/* SECTION 8: ARCHITECTURE ADVISORY CTA BANNER */}
          <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high border border-primary/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                {isArabic ? 'هندسة الأنظمة والبيانات للمؤسسات' : 'Enterprise Architecture & Advisory'}
              </span>
              <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                {isArabic
                  ? 'هل تخطط لبناء منصة بيانات أو نظام ذكاء اصطناعي مشابه؟'
                  : 'Planning a Data Lakehouse, BI Suite, or AI Agent Platform?'}
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {isArabic
                  ? 'احجز جلسة مراجعة معمارية مباشرة لتصميم خطة التنفيذ، اختيار التقنيات، وتقليل التكاليف السحابية.'
                  : 'Book a direct technical scoping session to review your data architecture, stack trade-offs, and production delivery roadmap.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:opacity-95 transition-opacity"
              >
                <Calendar className="w-4 h-4" />
                <span>{isArabic ? 'احجز جلسة استشارية' : 'Book Consultation'}</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-lowest/80 hover:bg-surface-container-high border border-outline-variant/30 font-nexa text-xs font-bold uppercase tracking-wider text-on-surface transition-colors"
              >
                <span>{isArabic ? 'استعرض الباقات' : 'View Advisory Packages'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Architecture Blueprint Modal */}
      <ArchitectureModal
        project={activeBlueprint}
        isOpen={!!activeBlueprint}
        onClose={() => setActiveBlueprint(null)}
      />

      <SiteFooter />
    </div>
  );
}
