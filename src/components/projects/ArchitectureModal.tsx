'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '@/data/seedProjects';

interface ArchitectureModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ project, isOpen, onClose }: ArchitectureModalProps) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-low/95 border border-primary/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-surface-container-high/60 pb-5">
            <div className="flex items-center gap-4">
              {project.companyLogo && (
                <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/30 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={project.companyLogo}
                    alt={project.client}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-label-md text-secondary font-semibold">
                    {project.client}
                  </span>
                  <span className="text-outline-variant">&bull;</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-display-xl text-xl sm:text-2xl text-on-surface font-bold mt-1">
                  {project.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Telemetry Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-2">
                <span className="font-headline-sm text-base sm:text-lg font-bold text-primary">
                  {m.value}
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Architecture Highlights */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
              Engineering Architecture Highlights
            </h4>
            <ul className="space-y-2.5">
              {project.architectureHighlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-on-surface leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-base mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              Technologies &amp; Protocols
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-between gap-4">
            <span className="font-label-sm text-xs text-on-surface-variant">
              Role: <strong className="text-secondary">{project.role}</strong>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-all"
              >
                Close Blueprint
              </button>
              <a
                href="/book"
                className="px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary shadow-[0_0_16px_rgba(160,120,255,0.4)] transition-all"
              >
                Consult on Similar Architecture
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

