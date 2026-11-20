'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { useProjects } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { cleanProjectText, isDiagramAsset } from '@/lib/utils';

export function ProjectsSlideshowSection() {
  const { projects } = useProjects();
  const { language } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = useMemo(() => {
    const items = projects
      .map((p) => {
        const img =
          (p.galleryImages && p.galleryImages.find((u) => !u.endsWith('.svg'))) ||
          (p.galleryImages && p.galleryImages[0]) ||
          p.companyLogo;
        return img ? { project: p, image: img } : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
    return items;
  }, [projects]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const safeIdx = slideIndex % slides.length;
  const current = slides[safeIdx];

  return (
    <section className="w-full py-16 relative z-10">
      <div className="max-w-[1280px] mx-auto px-gutter flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-secondary font-bold">
                {language === 'ar' ? 'معرض المشاريع التفاعلي' : 'Featured & GitHub Showcase'}
              </span>
            </div>
            <h2 className="font-nexa text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {language === 'ar' ? 'أحدث المشاريع والأنظمة' : 'Projects & Production Systems'}
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-white/15 text-xs font-nexa font-bold uppercase tracking-wider text-on-surface hover:text-primary transition-colors"
          >
            <span>{language === 'ar' ? 'عرض جميع المشاريع' : `View All ${projects.length} Projects`}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Slideshow Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl bg-surface-container-low/55 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-3 px-6 py-3.5 border-b border-white/[0.08]">
            <span className="font-mono text-xs text-on-surface-variant">
              {current.project.client}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-on-surface-variant mr-2">
                {safeIdx + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Previous project"
                className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-white/10 text-on-surface transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                aria-label="Next project"
                className="p-2 rounded-xl bg-surface-container-high/80 hover:bg-primary/20 border border-white/10 text-on-surface transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image */}
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
                  className={`w-full h-full ${isDiagramAsset(current.image) ? 'object-contain p-4' : 'object-cover object-top'}`}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-zinc-100">
                {current.project.category}
              </span>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-primary/40 text-[11px] font-mono text-primary font-semibold">
                {current.project.impactMetric}
              </span>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-secondary uppercase tracking-wider font-semibold">
                  {current.project.role}
                </span>
                <h3 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                  {current.project.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-4">
                  {cleanProjectText(current.project.summary)}
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(160,120,255,0.35)] hover:opacity-90 transition-opacity"
                >
                  <span>{language === 'ar' ? 'عرض التفاصيل' : 'Explore Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
        </div>
      </div>
    </section>
  );
}
