'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArticleItem } from '@/data/seedArticles';

interface ArticleCardProps {
  article: ArticleItem;
  onRead: (article: ArticleItem) => void;
}

export function ArticleCard({ article, onRead }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-surface-container-low/40 hover:bg-surface-container-low/65 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(160,120,255,0.3)] transition-all duration-300 overflow-hidden h-full"
    >
      {/* Top Specular Rim Light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

      <div className="p-6 sm:p-7 flex flex-col gap-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-label-md font-semibold">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-on-surface-variant">
            <span className="material-symbols-outlined text-xs">schedule</span>
            {article.readTime}
          </span>
        </div>

        {/* Title & Excerpt */}
        <div className="flex flex-col gap-2">
          <h3 className="font-nexa text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-surface-container-high text-[10px] font-mono text-on-surface-variant border border-outline-variant/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 bg-surface-container-lowest/80 border-t border-surface-container-high/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span>{article.date} &bull; {article.author}</span>
        </div>

        <button
          onClick={() => onRead(article)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-fixed transition-colors"
        >
          <span>Read Deep Dive</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </motion.div>
  );
}

