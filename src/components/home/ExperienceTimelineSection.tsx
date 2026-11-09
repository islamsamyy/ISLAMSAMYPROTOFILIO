'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useExperiences } from '@/lib/hooks';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export function ExperienceTimelineSection() {
  const { experiences } = useExperiences();

  return (
    <section id="experience" className="w-full max-w-[1280px] mx-auto px-gutter py-24 relative z-10 scroll-mt-24 content-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high/90 border border-secondary/30 shadow-[0_0_20px_rgba(123,208,255,0.2)] mb-3.5 backdrop-blur-md">
          <Briefcase className="w-4 h-4 text-secondary" />
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-semibold">
            Track Record &amp; Career Trajectory
          </span>
        </div>
        <h2 className="font-nexa text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
          Professional Experience &amp; Engineering Roles
        </h2>
        <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
          6+ years delivering distributed systems, enterprise machine learning models, and executive data lakehouse operations.
        </p>
      </motion.div>

      {/* Timeline Tree */}
      <div className="relative border-l-2 border-primary/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Glowing Milestone Node */}
            <div
              className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center transition-transform duration-300 group-hover:scale-125 ${
                exp.current
                  ? 'bg-primary shadow-[0_0_16px_rgba(160,120,255,0.8)]'
                  : 'bg-secondary shadow-[0_0_14px_rgba(123,208,255,0.5)]'
              }`}
            >
              {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            </div>

            {/* Role Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container-high/90 border border-outline-variant/30 hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-nexa font-extrabold text-sm text-primary uppercase tracking-wider">
                      {exp.company}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono text-on-surface-variant border border-outline-variant/30">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-col sm:items-end gap-1 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/80 border border-outline-variant/40 text-on-surface-variant font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <span className="text-[11px] text-on-surface-variant/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
                {exp.summary}
              </p>

              {/* Key Metrics */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {exp.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-xl bg-surface-container-high/40 border border-white/[0.06] flex flex-col"
                    >
                      <span className="font-nexa text-xl sm:text-2xl font-bold text-secondary">
                        {m.value}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights / Responsibilities */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="space-y-2 mb-6">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-surface-container-high/60">
                  <span className="text-[11px] font-label-sm uppercase text-on-surface-variant mr-1 font-semibold">
                    Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-surface-container-high/70 text-xs font-mono text-on-surface-variant border border-outline-variant/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
