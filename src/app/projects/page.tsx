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

  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('curated');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [repoSubCategory, setRepoSubCategory] = useState<string>('All');

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

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (scopeFilter === 'featured' && !p.featured) return false;
      if (scopeFilter === 'repo' && p.featured) return false;
      if (selectedCategory !== 'All Projects' && p.category !== selectedCategory) return false;
      if (selectedTech && !p.techStack.some((t) => t.toLowerCase() === selectedTech.toLowerCase())) {
        return false;
      }
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        cleanProjectText(p.summary).toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    });

    if (sortBy === 'visuals') {
      return [...list].sort((a, b) => (b.galleryImages?.length || 0) - (a.galleryImages?.length || 0));
    }
    if (sortBy === 'stack') {
      return [...list].sort((a, b) => b.techStack.length - a.techStack.length);
    }
    if (sortBy === 'alpha') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [projects, scopeFilter, selectedCategory, selectedTech, searchQuery, sortBy]);

  const hasActiveFilter =
    scopeFilter !== 'all' ||
    selectedCategory !== 'All Projects' ||
    Boolean(selectedTech) ||
    Boolean(searchQuery.trim()) ||
    sortBy !== 'curated';

  const resetAllFilters = () => {
    setScopeFilter('all');
    setSelectedCategory('All Projects');
    setSelectedTech(null);
    setSearchQuery('');
    setSortBy('curated');
    setRepoSubCategory('All');
  };

  const featuredList = filteredProjects.filter((p) => p.featured);
  const repoList = filteredProjects.filter((p) => !p.featured);

  const signatureTrio = !hasActiveFilter && viewMode === 'grid' ? featuredList.slice(0, 3) : [];
  const remainingFeatured =
    !hasActiveFilter && viewMode === 'grid' ? featuredList.slice(3) : featuredList;
  const visibleRemainingFeatured =
    hasActiveFilter || showAllFeatured || viewMode === 'compact'
      ? remainingFeatured
      : remainingFeatured.slice(0, 6);

  const filteredRepoList =
    repoSubCategory === 'All'
      ? repoList
      : repoList.filter((p) => p.category === repoSubCategory);
  const visibleRepos =
    hasActiveFilter || showAllRepos || viewMode === 'compact'
      ? filteredRepoList
      : filteredRepoList.slice(0, 6);

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

          {/* SECTION 4: STICKY DISCOVERY & FILTER COMMAND BAR */}
          <div id="project-explorer" className="scroll-mt-24 sticky top-20 z-30">
            <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-3xl bg-surface-container-low/90 dark:bg-surface-container-low/85 backdrop-blur-2xl border border-outline-variant/30 dark:border-white/[0.1] shadow-[0_12px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
              {/* Top Row: Scope Switcher + Search + Sort + View Mode */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                {/* Scope Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/20 w-fit">
                  {[
                    { id: 'all', label: isArabic ? 'الكل' : 'All Work', count: projects.length },
                    { id: 'featured', label: isArabic ? 'دراسات مميزة' : 'Flagship Studies', count: totalFlagshipCount },
                    { id: 'repo', label: isArabic ? 'مستودعات GitHub' : 'GitHub Repos', count: totalRepoCount },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setScopeFilter(tab.id as ScopeFilter)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        scopeFilter === tab.id
                          ? 'bg-primary-container text-on-primary-container shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-black/15 dark:bg-black/25 text-[10px] font-mono">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search, Sort & Density Controls */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 flex-1 xl:justify-end">
                  <div className="relative flex-1 sm:max-w-xs">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder={t('pages.projectsSearchPlaceholder', 'Search client, title, stack...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear project search"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-on-surface-variant" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      aria-label="Sort projects"
                      className="bg-transparent text-xs text-on-surface focus:outline-none font-mono"
                    >
                      <option value="curated">{isArabic ? 'الترتيب المختار' : 'Curated Order'}</option>
                      <option value="visuals">{isArabic ? 'الأكثر صوراً' : 'Most Visuals'}</option>
                      <option value="stack">{isArabic ? 'الأغنى تقنياً' : 'Tech Depth'}</option>
                      <option value="alpha">{isArabic ? 'أبجدياً' : 'A – Z'}</option>
                    </select>
                  </div>

                  <div className="flex items-center p-1 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      aria-label="Gallery grid view"
                      title="Gallery grid view"
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary-container text-on-primary-container'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('compact')}
                      aria-label="Compact directory list view"
                      title="Compact directory list view"
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'compact'
                          ? 'bg-primary-container text-on-primary-container'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Domain Pills + Active Tech Chip + Result Count */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-outline-variant/15">
                <div className="flex flex-wrap items-center gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const count =
                      cat === 'All Projects'
                        ? projects.length
                        : projects.filter((p) => p.category === cat).length;
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                          active
                            ? 'bg-secondary/20 text-secondary border border-secondary/40 font-bold'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                        }`}
                      >
                        <span>{CATEGORY_MAP[cat] || cat}</span>
                        <span className="opacity-70 font-mono text-[10px]">({count})</span>
                      </button>
                    );
                  })}

                  {selectedTech && (
                    <button
                      type="button"
                      onClick={() => setSelectedTech(null)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary text-[11px] font-mono font-bold shadow-sm"
                    >
                      <span>Tech: {selectedTech}</span>
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-on-surface-variant">
                  <span>
                    {isArabic
                      ? `عرض ${filteredProjects.length} من ${projects.length}`
                      : `${filteredProjects.length} of ${projects.length} matching`}
                  </span>
                  {hasActiveFilter && (
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="text-primary hover:underline font-semibold"
                    >
                      {isArabic ? 'إعادة ضبط' : 'Reset'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT SECTIONS */}
          {!loaded && projects.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {[0, 1, 2, 3, 4, 5].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-[440px] rounded-3xl bg-surface-container-low/50 border border-outline-variant/20 animate-pulse"
                />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-16">
              {/* SECTION 5: FLAGSHIP CASE STUDIES */}
              {featuredList.length > 0 && (
                <section id="featured-case-studies" className="flex flex-col gap-8 scroll-mt-44">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-outline-variant/20 pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                        01 &bull; {isArabic ? 'دراسات الحالة المميزة' : 'Flagship Production Systems'}
                      </span>
                      <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                        {isArabic ? 'مشاريع المؤسسات المميزة' : 'Featured Enterprise Case Studies'}
                      </h2>
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-mono text-primary font-semibold">
                      {featuredList.length} {featuredList.length === 1 ? 'Case Study' : 'Case Studies'}
                    </span>
                  </div>

                  {/* Signature Flagship Trio (Top 3 highlighted in default gallery view) */}
                  {signatureTrio.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase tracking-wider font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isArabic ? 'أبرز 3 دراسات حالة قيادية' : 'Signature Architecture Trio'}</span>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                        {signatureTrio.map((project) => (
                          <TiltCard key={project.id} maxTilt={4} depth={10} glare={true} className="h-full">
                            <ProjectCard
                              project={project}
                              variant="featured"
                              language={language}
                              onSelectBlueprint={(p) => setActiveBlueprint(p)}
                            />
                          </TiltCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining / Filtered Flagship Grid or Compact Directory */}
                  {visibleRemainingFeatured.length > 0 && (
                    <div
                      className={
                        viewMode === 'compact'
                          ? 'flex flex-col gap-3'
                          : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'
                      }
                    >
                      {visibleRemainingFeatured.map((project) =>
                        viewMode === 'compact' ? (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            variant="compact"
                            language={language}
                            onSelectBlueprint={(p) => setActiveBlueprint(p)}
                          />
                        ) : (
                          <TiltCard key={project.id} maxTilt={4} depth={10} glare={true} className="h-full">
                            <ProjectCard
                              project={project}
                              variant="standard"
                              language={language}
                              onSelectBlueprint={(p) => setActiveBlueprint(p)}
                            />
                          </TiltCard>
                        )
                      )}
                    </div>
                  )}

                  {/* Progressive Disclosure Toggle for Flagship Studies */}
                  {!hasActiveFilter && viewMode === 'grid' && remainingFeatured.length > 6 && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAllFeatured((prev) => !prev)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-container-low hover:bg-primary-container hover:text-on-primary-container border border-outline-variant/30 text-xs font-nexa font-bold uppercase tracking-wider text-on-surface transition-all shadow-sm"
                      >
                        <span>
                          {showAllFeatured
                            ? isArabic
                              ? 'عرض عدد أقل'
                              : 'Collapse Flagship Archive'
                            : isArabic
                            ? `عرض كافة الـ ${featuredList.length} دراسة حالة`
                            : `Explore All ${featuredList.length} Flagship Case Studies`}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${showAllFeatured ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 6: INTERACTIVE TECHNOLOGY & PROTOCOL EXPLORER MATRIX */}
              <section
                aria-label="Technology Stack Explorer"
                className="p-6 sm:p-8 rounded-3xl bg-surface-container-low/70 dark:bg-surface-container-low/45 backdrop-blur-2xl border border-outline-variant/25 dark:border-white/[0.08] flex flex-col gap-5"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
                      {isArabic ? 'التصفية حسب التكنولوجيا' : 'Interactive Stack Matrix'}
                    </span>
                    <h2 className="font-nexa text-xl sm:text-2xl font-extrabold text-on-surface">
                      {isArabic ? 'استكشف المشاريع حسب التقنية والأداة' : 'Filter Portfolio by Core Technology'}
                    </h2>
                  </div>
                  {selectedTech && (
                    <button
                      type="button"
                      onClick={() => setSelectedTech(null)}
                      className="text-xs font-mono text-primary hover:underline"
                    >
                      {isArabic ? 'إزالة الفلتر' : 'Clear tech filter'}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {topTechnologies.map(([tech, count]) => {
                    const active = selectedTech?.toLowerCase() === tech.toLowerCase();
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          setSelectedTech(active ? null : tech);
                          document.getElementById('project-explorer')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                          active
                            ? 'bg-primary text-on-primary border-primary shadow-md font-bold'
                            : 'bg-surface-container-lowest/85 hover:bg-surface-container-high text-on-surface border-outline-variant/25 hover:border-primary/40'
                        }`}
                      >
                        <span>{tech}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                            active ? 'bg-black/20 text-on-primary' : 'bg-surface-container-high text-secondary'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* SECTION 7: OPEN-SOURCE & GITHUB ENGINEERING VAULT */}
              {repoList.length > 0 && (
                <section id="github-repositories" className="flex flex-col gap-7 scroll-mt-44">
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>02 &bull; {isArabic ? 'مستودعات GitHub المفتوحة' : 'GitHub Open-Source & Engineering Vault'}</span>
                      </span>
                      <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                        {isArabic ? 'جميع مشاريع ومستودعات GitHub' : 'Open-Source Repositories & Tools'}
                      </h2>
                    </div>

                    {/* Domain Sub-Tabs inside Repo Vault */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        'All',
                        'ERP Systems',
                        'Data Engineering',
                        'Software Engineering & Online Systems',
                        'Data Analysis & Power BI',
                        'AI & Machine Learning',
                      ].map((sub) => {
                        const subCount =
                          sub === 'All' ? repoList.length : repoList.filter((r) => r.category === sub).length;
                        if (sub !== 'All' && subCount === 0) return null;
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => setRepoSubCategory(sub)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                              repoSubCategory === sub
                                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border border-outline-variant/20'
                            }`}
                          >
                            {sub === 'All' ? (isArabic ? `الكل (${subCount})` : `All (${subCount})`) : `${sub} (${subCount})`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className={
                      viewMode === 'compact'
                        ? 'flex flex-col gap-3'
                        : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'
                    }
                  >
                    {visibleRepos.map((project) =>
                      viewMode === 'compact' ? (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          variant="compact"
                          language={language}
                          onSelectBlueprint={(p) => setActiveBlueprint(p)}
                        />
                      ) : (
                        <TiltCard key={project.id} maxTilt={4} depth={10} glare={true} className="h-full">
                          <ProjectCard
                            project={project}
                            variant="standard"
                            language={language}
                            onSelectBlueprint={(p) => setActiveBlueprint(p)}
                          />
                        </TiltCard>
                      )
                    )}
                  </div>

                  {!hasActiveFilter && viewMode === 'grid' && filteredRepoList.length > 6 && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAllRepos((prev) => !prev)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-container-low hover:bg-secondary hover:text-on-secondary border border-outline-variant/30 text-xs font-nexa font-bold uppercase tracking-wider text-on-surface transition-all shadow-sm"
                      >
                        <span>
                          {showAllRepos
                            ? isArabic
                              ? 'تقليص المستودعات'
                              : 'Collapse Repository Vault'
                            : isArabic
                            ? `عرض كافة الـ ${filteredRepoList.length} مستودع`
                            : `View All ${filteredRepoList.length} GitHub Repositories`}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${showAllRepos ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    </div>
                  )}
                </section>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 rounded-3xl bg-surface-container-low/70 border border-outline-variant/25 text-center gap-3">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                folder_off
              </span>
              <p className="font-headline-sm text-lg text-on-surface font-bold">
                {isArabic ? 'لا توجد مشاريع مطابقة للبحث' : 'No matching projects found'}
              </p>
              <p className="text-xs text-on-surface-variant max-w-md">
                {isArabic
                  ? 'حاول مسح نص البحث أو اختيار مجال تقني مختلف.'
                  : 'Try clearing your search query, removing the technology filter, or selecting another engineering domain.'}
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider shadow-md"
              >
                {isArabic ? 'إعادة ضبط الفلاتر' : 'Reset All Filters'}
              </button>
            </div>
          )}

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
