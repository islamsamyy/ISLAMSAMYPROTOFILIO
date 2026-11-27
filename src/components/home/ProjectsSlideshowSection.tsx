'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { useProjects } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { cleanProjectText, isDiagramAsset } from '@/lib/utils';

export function ProjectsSlideshowSection() {
  const { projects } = useProjects();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [slideIndex, setSlideIndex] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    const source = featured.length > 0 ? featured : projects;
    return source
      .map((p) => {
        const imgs =
          p.galleryImages && p.galleryImages.length > 0
            ? p.galleryImages
            : p.companyLogo
            ? [p.companyLogo]
            : [];
        if (imgs.length === 0) return null;
        // Prefer raster image as lead slide image
        const rasterFirst = [
          ...imgs.filter((u) => !isDiagramAsset(u)),
          ...imgs.filter((u) => isDiagramAsset(u)),
        ];
        return { project: p, images: rasterFirst };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [projects]);

  useEffect(() => {
    setSubImageIndex(0);
  }, [slideIndex]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const safeIdx = slideIndex % slides.length;
  const current = slides[safeIdx];
  const currentImage = current.images[subImageIndex % current.images.length] || current.images[0];

  return (
    <section id="featured-slideshow" className="w-full py-14 relative z-10 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-gutter flex flex-col gap-7">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-secondary font-bold">
                {isArabic ? 'عرض المشاريع المميزة' : `Featured Projects Slideshow • ${slides.length} Flagship Systems`}
              </span>
            </div>
            <h2 className="font-nexa text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {isArabic ? 'أبرز المشاريع والأنظمة المميزة' : 'Featured Projects & Production Systems'}
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high/85 hover:bg-primary-container hover:text-on-primary-container border border-outline-variant/30 dark:border-white/15 text-xs font-nexa font-bold uppercase tracking-wider text-on-surface transition-colors"
          >
            <span>{isArabic ? `عرض جميع المشاريع (${projects.length})` : `View All ${projects.length} Projects`}</span>
            <ArrowRight className="w-4 h-4 rtl-flip" />
          </Link>
        </div>

        {/* Slideshow Stage Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl bg-surface-container-low/80 dark:bg-surface-container-low/55 backdrop-blur-2xl border border-outline-variant/30 dark:border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-b border-outline-variant/20 dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-mono font-bold uppercase tracking-wider shrink-0">
                {isArabic ? 'مميز' : 'Featured'}
              </span>
              <span className="font-mono text-xs text-on-surface-variant truncate">
                {current.project.client}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-on-surface-variant mr-1">
                {safeIdx + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? 'Resume featured slideshow' : 'Pause featured slideshow'}
                title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-outline-variant/25 dark:border-white/10 text-on-surface transition-colors"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-secondary" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Previous featured project"
                className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-outline-variant/25 dark:border-white/10 text-on-surface transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                aria-label="Next featured project"
                className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-outline-variant/25 dark:border-white/10 text-on-surface transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Stage */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[440px] bg-surface-container-lowest overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.project.id + currentImage}
                  src={currentImage}
                  alt={current.project.title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full h-full ${isDiagramAsset(currentImage) ? 'object-contain p-4' : 'object-cover object-top'}`}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-zinc-100">
                  {current.project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/90 text-on-primary text-[11px] font-mono font-semibold shadow-sm">
                  {current.project.impactMetric}
                </span>
              </div>

              {/* Multi-screen sub-switcher inside current featured project */}
              {current.images.length > 1 && (
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/15 overflow-x-auto">
                    {current.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSubImageIndex(i)}
                        className={`w-11 h-7 rounded-lg overflow-hidden border transition-all shrink-0 ${
                          i === subImageIndex % current.images.length
                            ? 'border-secondary ring-2 ring-secondary/50'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                        title={`Screen ${i + 1}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                  <span className="hidden sm:inline px-2.5 py-1 rounded-lg bg-black/70 text-[10px] font-mono text-zinc-200 border border-white/15">
                    {(subImageIndex % current.images.length) + 1} / {current.images.length} Screens
                  </span>
                </div>
              )}
            </div>

            {/* Editorial Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-secondary uppercase tracking-wider font-semibold">
                  {current.project.role}
                </span>
                <h3 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                  {current.project.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {cleanProjectText(current.project.summary)}
                </p>

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
                <Link
                  href={`/projects/${current.project.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
                >
                  <span>{isArabic ? 'عرض التفاصيل' : 'Explore Case Study'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>

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

          {/* Featured Thumbnail Strip */}
          <div className="px-6 py-3.5 bg-surface-container-lowest/70 border-t border-outline-variant/20 dark:border-white/[0.06] flex items-center gap-2.5 overflow-x-auto">
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
        </div>
      </div>
    </section>
  );
}
