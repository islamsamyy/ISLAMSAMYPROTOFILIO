'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperiences } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export function ExperienceTimelineSection() {
  const { experiences } = useExperiences();
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="w-full max-w-[1280px] mx-auto px-gutter py-10 relative z-10 scroll-mt-24 content-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/90 border border-secondary/30 mb-2.5 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-secondary" />
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              {t('experience.badge', 'Track Record & Career Trajectory')}
            </span>
          </div>
          <h2 className="font-nexa text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
            {t('experience.title', 'Professional Experience & Engineering Roles')}
          </h2>
        </div>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
          {t('experience.subtitle', '6+ years delivering distributed systems, enterprise machine learning models, and executive data lakehouse operations.')}
        </p>
      </motion.div>

      {/* Compact 2-Column Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="group p-5 rounded-2xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container-high/90 border border-outline-variant/30 hover:border-primary/50 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col justify-between gap-3.5"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {exp.current && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    <span className="font-nexa font-extrabold text-xs text-primary uppercase tracking-wider">
                      {exp.company}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono text-on-surface-variant border border-outline-variant/30">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="font-nexa text-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors truncate">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high/80 border border-outline-variant/40 text-on-surface-variant font-mono text-[11px]">
                    <Calendar className="w-3 h-3 text-secondary" />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <span className="text-[10px] text-on-surface-variant/70 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Compact Summary */}
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-3">
                {exp.summary}
              </p>

              {/* Inline Key Metrics */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {exp.metrics.slice(0, 3).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="px-2.5 py-2 rounded-xl bg-surface-container-high/40 border border-white/[0.06] flex flex-col"
                    >
                      <span className="font-nexa text-sm sm:text-base font-bold text-secondary">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-medium truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Top 2 Highlights */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="space-y-1.5">
                  {exp.highlights.slice(0, 2).map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-on-surface/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technologies */}
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-surface-container-high/60">
                {exp.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-surface-container-high/70 text-[11px] font-mono text-on-surface-variant border border-outline-variant/30"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 5 && (
                  <span className="text-[10px] font-mono text-primary">+{exp.technologies.length - 5}</span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
