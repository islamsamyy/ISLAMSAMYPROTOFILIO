'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Check,
  GripVertical,
  Layers,
  Pin,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';
import { useProjects } from '@/lib/hooks';
import { reorderProjects } from '@/lib/data-store';
import { initialProjects, ProjectItem } from '@/data/seedProjects';
import { useLanguage } from '@/context/LanguageContext';
import { cleanProjectText, getProjectCover, isDiagramAsset } from '@/lib/utils';

const CATEGORIES = [
  'All',
  'ERP Systems',
  'Data Engineering',
  'AI & Machine Learning',
  'Data Analysis & Power BI',
  'Software Engineering & Online Systems',
] as const;

export function FeaturedProjectsGridSection() {
  const { projects } = useProjects();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [arrangeMode, setArrangeMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const categoryLabels: Record<string, string> = {
    All: isAr ? 'الكل' : 'All Projects',
    'ERP Systems': isAr ? 'أنظمة ERP' : 'ERP Systems',
    'Data Engineering': isAr ? 'هندسة البيانات' : 'Data Engineering',
    'AI & Machine Learning': isAr ? 'الذكاء الاصطناعي' : 'AI & ML',
    'Data Analysis & Power BI': isAr ? 'تحليل البيانات وBI' : 'Data & Power BI',
    'Software Engineering & Online Systems': isAr ? 'تطوير الويب والنظم' : 'Web & Systems',
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const displayedProjects = arrangeMode
    ? filteredProjects
    : filteredProjects.slice(0, visibleCount);

  const triggerSavedToast = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1800);
  };

  const commitOrder = (nextFullList: ProjectItem[]) => {
    void reorderProjects(nextFullList, true);
    triggerSavedToast();
  };

  const moveProject = (id: string, direction: 'up' | 'down' | 'top') => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const next = [...projects];
    const [moved] = next.splice(idx, 1);

    if (direction === 'top') {
      next.unshift(moved);
    } else if (direction === 'up' && idx > 0) {
      next.splice(idx - 1, 0, moved);
    } else if (direction === 'down' && idx < next.length) {
      next.splice(Math.min(idx + 1, next.length), 0, moved);
    } else {
      return;
    }
    commitOrder(next);
  };

  const handleDropOnCard = (targetId: string) => {
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const fromIdx = projects.findIndex((p) => p.id === draggedId);
    const toIdx = projects.findIndex((p) => p.id === targetId);
    if (fromIdx === -1 || toIdx === -1) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const next = [...projects];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setDraggedId(null);
    setDragOverId(null);
    commitOrder(next);
  };

  const handleSortFeaturedFirst = () => {
    const next = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    commitOrder(next);
  };

  const handleResetDefaultOrder = () => {
    const seedOrder = new Map(initialProjects.map((p, idx) => [p.id, idx]));
    const next = [...projects].sort((a, b) => {
      const ai = seedOrder.has(a.id) ? seedOrder.get(a.id)! : 9999;
      const bi = seedOrder.has(b.id) ? seedOrder.get(b.id)! : 9999;
      return ai - bi;
    });
    commitOrder(next);
  };

  return (
    <section
      id="project-cards"
      className="w-full max-w-[1280px] mx-auto px-gutter py-12 relative z-10 scroll-mt-24 content-auto"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6 border-b border-outline-variant/20 pb-5">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 mb-3">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-primary font-bold">
              {isAr ? 'معرض بطاقات المشاريع • ترتيب حسب الأهمية' : 'Project Cards Portfolio • Priority Ranked'}
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            {isAr ? 'المشاريع البرمجية مرتّبة حسب الأهمية' : 'Production Project Cards Arranged by Importance'}
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            {isAr
              ? 'استعرض أبرز الأنظمة والمشاريع أو فعّل وضع الترتيب لإعادة ترتيب البطاقات بالسحب والإفلات أو تثبيت أهم مشروع في المرتبة #1.'
              : 'Browse production systems or toggle Priority Arrange Mode to drag-and-drop cards, reorder by business importance, and pin flagship work to #1.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {savedFeedback && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <Check className="w-3.5 h-3.5" />
              {isAr ? 'تم حفظ الترتيب' : 'Priority Saved'}
            </span>
          )}

          <button
            type="button"
            onClick={() => setArrangeMode((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-nexa font-bold uppercase tracking-wider border transition-all ${
              arrangeMode
                ? 'bg-primary text-on-primary border-primary shadow-sm'
                : 'bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface border-outline-variant hover:border-outline'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>
              {arrangeMode
                ? isAr
                  ? 'إنهاء وضع الترتيب'
                  : 'Done Arranging'
                : isAr
                ? 'ترتيب حسب الأهمية'
                : 'Arrange by Importance'}
            </span>
          </button>

          {arrangeMode && (
            <>
              <button
                type="button"
                onClick={handleSortFeaturedFirst}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high/80 hover:bg-secondary/15 text-secondary border border-secondary/30 text-xs font-mono font-semibold transition-colors"
              >
                <Star className="w-3.5 h-3.5" />
                <span>{isAr ? 'المميزة أولاً' : 'Featured First'}</span>
              </button>
              <button
                type="button"
                onClick={handleResetDefaultOrder}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface border border-outline-variant/30 text-xs font-mono transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'افتراضي' : 'Reset'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label-md transition-all border ${
                  active
                    ? 'bg-primary text-on-primary border-primary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-outline-variant hover:border-outline'
                }`}
              >
                {categoryLabels[cat]} <span className="opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {arrangeMode && (
          <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
            <GripVertical className="w-3.5 h-3.5" />
            {isAr
              ? 'اسحب أي بطاقة وأفلتها أو استخدم أسهم الأولوية لإعادة الترتيب'
              : 'Drag & drop any card or use Up / Down / Pin #1 controls'}
          </span>
        )}
      </div>

      {/* 3-Column Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((proj) => {
          const globalRank = projects.findIndex((p) => p.id === proj.id) + 1;
          const coverSrc = getProjectCover(proj as any);
          const isDiag = isDiagramAsset(coverSrc);
          const isBeingDragged = draggedId === proj.id;
          const isDragTarget = dragOverId === proj.id && draggedId !== proj.id;

          return (
            <motion.div
              key={proj.id}
              layout
              transition={{ duration: 0.25 }}
              draggable={arrangeMode}
              onDragStart={() => arrangeMode && setDraggedId(proj.id)}
              onDragOver={(e) => {
                if (!arrangeMode) return;
                e.preventDefault();
                if (dragOverId !== proj.id) setDragOverId(proj.id);
              }}
              onDragLeave={() => {
                if (dragOverId === proj.id) setDragOverId(null);
              }}
              onDrop={(e) => {
                if (!arrangeMode) return;
                e.preventDefault();
                handleDropOnCard(proj.id);
              }}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
              }}
              className={`h-full rounded-2xl transition-all ${
                arrangeMode ? 'cursor-grab active:cursor-grabbing' : ''
              } ${isBeingDragged ? 'opacity-45 scale-[0.98]' : ''} ${
                isDragTarget ? 'ring-2 ring-secondary shadow-md' : ''
              }`}
            >
              <TiltCard maxTilt={arrangeMode ? 0 : 4} depth={8} glare={!arrangeMode} className="rounded-2xl h-full">
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 border border-outline-variant/25 dark:border-white/[0.08] hover:border-primary/45 shadow-[0_10px_30px_rgba(0,0,0,0.22)] flex flex-col justify-between h-full transition-colors">
                  <div>
                    {/* Top Meta Bar: Priority Rank + Category + Arrange Controls */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border shrink-0 ${
                            globalRank <= 3
                              ? 'bg-primary/20 text-primary border-primary/40'
                              : 'bg-surface-container-high text-on-surface-variant border-outline-variant/30'
                          }`}
                        >
                          {arrangeMode && <GripVertical className="w-3 h-3" />}
                          #{globalRank}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/25 text-secondary text-[10px] font-label-sm font-semibold uppercase truncate">
                          {proj.category}
                        </span>
                      </div>

                      {proj.featured && !arrangeMode && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold shrink-0">
                          <Sparkles className="w-2.5 h-2.5" />
                          {isAr ? 'مميز' : 'TOP'}
                        </span>
                      )}

                      {arrangeMode && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => moveProject(proj.id, 'top')}
                            disabled={globalRank === 1}
                            title={isAr ? 'تثبيت في المرتبة #1' : 'Pin to #1'}
                            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-primary/20 hover:text-primary disabled:opacity-30 text-on-surface-variant transition-colors"
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProject(proj.id, 'up')}
                            disabled={globalRank === 1}
                            title={isAr ? 'رفع الأولوية' : 'Move Up'}
                            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-secondary/20 hover:text-secondary disabled:opacity-30 text-on-surface-variant transition-colors"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProject(proj.id, 'down')}
                            disabled={globalRank === projects.length}
                            title={isAr ? 'خفض الأولوية' : 'Move Down'}
                            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-secondary/20 hover:text-secondary disabled:opacity-30 text-on-surface-variant transition-colors"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Visual Cover */}
                    <Link
                      href={`/projects/${proj.id}`}
                      className="block w-full aspect-[16/9] rounded-xl bg-surface-container-lowest border border-outline-variant/20 relative overflow-hidden mb-3.5 group/cover"
                    >
                      {coverSrc ? (
                        <img
                          src={coverSrc}
                          alt={proj.title}
                          loading="lazy"
                          className={`w-full h-full ${
                            isDiag ? 'object-contain p-2.5' : 'object-cover object-top'
                          } group-hover/cover:scale-105 transition-transform duration-300`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/15 via-surface-container to-secondary/15">
                          <Layers className="w-8 h-8 text-primary/60" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                      {proj.impactMetric && (
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-primary/35 text-[10px] font-mono text-secondary truncate">
                            {proj.impactMetric}
                          </span>
                        </div>
                      )}
                    </Link>

                    {/* Title & Summary */}
                    <Link href={`/projects/${proj.id}`}>
                      <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface hover:text-primary transition-colors line-clamp-2 mb-1.5">
                        {proj.title}
                      </h3>
                    </Link>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3.5">
                      {cleanProjectText(proj.summary)}
                    </p>

                    {/* Compact Metrics */}
                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                        {proj.metrics.slice(0, 2).map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="px-2.5 py-1.5 rounded-lg bg-surface-container-high/55 border border-outline-variant/15 flex items-center justify-between gap-1.5"
                          >
                            <span className="text-[10px] text-on-surface-variant truncate">{m.label}</span>
                            <span className="text-[11px] font-mono font-bold text-secondary shrink-0">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer: Tech Stack + Link */}
                  <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 min-w-0">
                      {proj.techStack.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[10px] font-mono truncate max-w-[95px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${proj.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-secondary uppercase tracking-wider shrink-0"
                    >
                      <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Show More / Explore Full Gallery */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {!arrangeMode && filteredProjects.length > visibleCount && (
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high/85 hover:bg-surface-container-highest text-on-surface text-xs font-nexa font-bold uppercase tracking-wider border border-outline-variant/35 transition-all"
          >
            <span>
              {isAr
                ? `عرض المزيد (${filteredProjects.length - visibleCount} متبقي)`
                : `Load More (${filteredProjects.length - visibleCount} remaining)`}
            </span>
          </button>
        )}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-nexa font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <span>
            {isAr ? `تصفح كافة الـ ${projects.length} مشروع` : `Open Full ${projects.length}-Project Gallery`}
          </span>
          <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
        </Link>
      </div>
    </section>
  );
}
