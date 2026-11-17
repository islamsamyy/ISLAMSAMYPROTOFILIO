'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArchitectureModal } from '@/components/projects/ArchitectureModal';
import { TiltCard } from '@/components/ui/TiltCard';
import { useProjects } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectItem } from '@/data/seedProjects';

const CATEGORIES = ['All Projects', 'Distributed Systems', 'Lakehouse & BI', 'AI & Machine Learning', 'Cloud Native'];

export default function ProjectsPage() {
  const { projects, loaded } = useProjects();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlueprint, setActiveBlueprint] = useState<ProjectItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = useMemo(() => {
    const items: { project: ProjectItem; image: string }[] = [];
    for (const p of projects) {
      const img =
        (p.galleryImages && p.galleryImages.find((u) => !u.endsWith('.svg'))) ||
        (p.galleryImages && p.galleryImages[0]) ||
        p.companyLogo;
      if (img) {
        items.push({ project: p, image: img });
      }
    }
    return items.slice(0, 12);
  }, [projects]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const CATEGORY_MAP: { [key: string]: string } = {
    'All Projects': language === 'ar' ? 'كافة المشاريع' : 'All Projects',
    'Distributed Systems': language === 'ar' ? 'النظم الموزعة' : 'Distributed Systems',
    'Lakehouse & BI': language === 'ar' ? 'مستودعات البيانات وBI' : 'Lakehouse & BI',
    'AI & Machine Learning': language === 'ar' ? 'الذكاء الاصطناعي وتعلم الآلة' : 'AI & Machine Learning',
    'Cloud Native': language === 'ar' ? 'الحوسبة السحابية' : 'Cloud Native',
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All Projects' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-28 flex-1 relative z-10">
        <div className="max-w-[1440px] mx-auto px-gutter flex flex-col gap-12">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-secondary/40 shadow-[0_0_24px_rgba(123,208,255,0.3)] mb-4 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                {language === 'ar' ? 'دراسات حالة بيئات الإنتاج • مستودعات GitHub' : 'Production Case Studies • GitHub Repositories'}
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              {t('pages.projectsTitle', 'Enterprise Engineering & Data Projects')}
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed max-w-2xl">
              {t('pages.projectsSubtitle', 'Showcase of production-tested systems featuring verified company logos, architecture blueprints, and real-time telemetry metrics built over 6 years of technical leadership.')}
            </p>
          </motion.div>

          {/* Portfolio Overview Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                label: language === 'ar' ? 'إجمالي المشاريع' : 'Total Projects',
                value: String(projects.length),
                sub: language === 'ar' ? 'أنظمة إنتاج ومستودعات' : 'Production & Open Source',
              },
              {
                label: language === 'ar' ? 'دراسات الحالة المميزة' : 'Featured Case Studies',
                value: String(projects.filter((p) => p.featured).length),
                sub: language === 'ar' ? 'تسليم مؤسسي موثق' : 'Enterprise Deployments',
              },
              {
                label: language === 'ar' ? 'مستودعات GitHub' : 'GitHub Repositories',
                value: String(projects.filter((p) => !p.featured).length),
                sub: language === 'ar' ? 'مشاريع موثقة بالكامل' : 'Synced with README & Assets',
              },
              {
                label: language === 'ar' ? 'المجالات التقنية' : 'Engineering Domains',
                value: '4',
                sub: 'Distributed • AI/ML • BI • Cloud',
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-surface-container-low/45 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.28)] flex flex-col justify-between gap-1"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-semibold">
                  {stat.label}
                </span>
                <span className="font-nexa text-3xl sm:text-4xl font-extrabold text-on-surface mt-1">
                  {stat.value}
                </span>
                <span className="text-xs text-on-surface-variant">{stat.sub}</span>
              </div>
            ))}
          </motion.section>

          {/* Project Images Slideshow Section */}
          {slides.length > 0 && (() => {
            const safeIdx = slideIndex % slides.length;
            const current = slides[safeIdx];
            return (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative rounded-3xl bg-surface-container-low/55 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                      {language === 'ar' ? 'معرض لقطات المشاريع' : 'Visual Project Showcase'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-on-surface-variant mr-2">
                      {safeIdx + 1} / {slides.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                      aria-label="Previous project slide"
                      className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-white/10 text-on-surface transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                      aria-label="Next project slide"
                      className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-white/10 text-on-surface transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Slide Image */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] bg-surface-container-lowest overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={current.project.id + current.image}
                        src={current.image}
                        alt={current.project.title}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="w-full h-full object-cover object-top"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-zinc-100">
                      {current.project.category}
                    </span>
                  </div>

                  {/* Slide Details */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-xs text-secondary uppercase tracking-wider font-semibold">
                        {current.project.client}
                      </span>
                      <h3 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                        {current.project.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-4">
                        {current.project.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
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

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                      <Link
                        href={`/projects/${current.project.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-nexa font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(160,120,255,0.35)] hover:opacity-90 transition-opacity"
                      >
                        <span>{language === 'ar' ? 'عرض التفاصيل' : 'Explore Project'}</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>

                      {current.project.liveDemoUrl && (
                        <a
                          href={current.project.liveDemoUrl}
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

                {/* Thumbnail Strip */}
                <div className="px-6 py-3.5 bg-surface-container-lowest/60 border-t border-white/[0.06] flex items-center gap-2.5 overflow-x-auto">
                  {slides.map((s, idx) => (
                    <button
                      key={s.project.id}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      className={`relative shrink-0 w-20 h-12 rounded-xl overflow-hidden border transition-all ${
                        idx === safeIdx
                          ? 'border-primary ring-2 ring-primary/50 scale-105'
                          : 'border-white/15 opacity-60 hover:opacity-100'
                      }`}
                      title={s.project.title}
                    >
                      <img
                        src={s.image}
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

          {/* Search & Category Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-surface-container-low/45 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            {/* Category Pills with Counts */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All Projects'
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-label-md text-xs transition-all flex items-center gap-2 ${
                      selectedCategory === cat
                        ? 'bg-primary-container text-on-primary font-semibold shadow-[0_0_16px_rgba(160,120,255,0.45)]'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{CATEGORY_MAP[cat] || cat}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                placeholder={t('pages.projectsSearchPlaceholder', 'Search client, title, stack...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>
          </motion.div>

          {/* Organized Project Sections */}
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-16">
              {(() => {
                const featuredList = filteredProjects.filter((p) => p.featured);
                const repoList = filteredProjects.filter((p) => !p.featured);
                const isGroupedView = selectedCategory === 'All Projects' && !searchQuery.trim();
                const repoCategories = [
                  'Distributed Systems',
                  'AI & Machine Learning',
                  'Lakehouse & BI',
                  'Cloud Native',
                ] as const;

                return (
                  <>
                    {/* Section 1: Featured Enterprise Case Studies */}
                    {featuredList.length > 0 && (
                      <section className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                              01 • {language === 'ar' ? 'دراسات الحالة المميزة' : 'Flagship Production Systems'}
                            </span>
                            <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                              {language === 'ar' ? 'مشاريع المؤسسات المميزة' : 'Featured Enterprise Case Studies'}
                            </h2>
                          </div>
                          <span className="px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-mono text-primary font-semibold">
                            {featuredList.length} {featuredList.length === 1 ? 'Project' : 'Projects'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                          {featuredList.map((project) => (
                            <TiltCard key={project.id} maxTilt={5} depth={12} glare={true} className="h-full">
                              <ProjectCard
                                project={project}
                                onSelectBlueprint={(p) => setActiveBlueprint(p)}
                              />
                            </TiltCard>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Section 2: All GitHub Repositories (Grouped by Category in Default View) */}
                    {repoList.length > 0 && (
                      <section className="flex flex-col gap-10">
                        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
                              02 • {language === 'ar' ? 'مستودعات GitHub المفتوحة' : 'GitHub Open-Source & Production Showcase'}
                            </span>
                            <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                              {language === 'ar' ? 'جميع مشاريع ومستودعات GitHub' : 'GitHub Projects & Repositories'}
                            </h2>
                          </div>
                          <span className="px-3.5 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-xs font-mono text-secondary font-semibold">
                            {repoList.length} {repoList.length === 1 ? 'Repository' : 'Repositories'}
                          </span>
                        </div>

                        {isGroupedView ? (
                          <div className="flex flex-col gap-12">
                            {repoCategories.map((cat) => {
                              const catItems = repoList.filter((p) => p.category === cat);
                              if (catItems.length === 0) return null;
                              return (
                                <div key={cat} className="flex flex-col gap-5">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                      <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_#7bd0ff]" />
                                      <h3 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface">
                                        {CATEGORY_MAP[cat] || cat}
                                      </h3>
                                    </div>
                                    <span className="text-xs font-mono text-on-surface-variant">
                                      {catItems.length} {catItems.length === 1 ? 'Repo' : 'Repos'}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                                    {catItems.map((project) => (
                                      <TiltCard key={project.id} maxTilt={5} depth={12} glare={true} className="h-full">
                                        <ProjectCard
                                          project={project}
                                          onSelectBlueprint={(p) => setActiveBlueprint(p)}
                                        />
                                      </TiltCard>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                            {repoList.map((project) => (
                              <TiltCard key={project.id} maxTilt={5} depth={12} glare={true} className="h-full">
                                <ProjectCard
                                  project={project}
                                  onSelectBlueprint={(p) => setActiveBlueprint(p)}
                                />
                              </TiltCard>
                            ))}
                          </div>
                        )}
                      </section>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                folder_off
              </span>
              <p className="font-headline-sm text-base text-on-surface font-semibold">
                No matching projects found
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Try clearing your search query or choosing another category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Projects');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-surface-container-high text-xs font-semibold text-primary hover:bg-surface-container-highest"
              >
                Reset Filters
              </button>
            </div>
          )}

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

