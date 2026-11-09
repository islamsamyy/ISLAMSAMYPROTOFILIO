'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { useArticles } from '@/lib/hooks';
import { ArticleItem } from '@/data/seedArticles';

const CATEGORIES = ['All', 'Architecture', 'Data Engineering', 'Machine Learning', 'Performance'];

export default function BlogPage() {
  const { articles, loaded } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  const filteredArticles = articles.filter((a) => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featured = articles.find((a) => a.featured) || articles[0];

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[1280px] mx-auto px-gutter flex flex-col gap-12">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-primary/30 shadow-[0_0_24px_rgba(160,120,255,0.25)] mb-4 backdrop-blur-xl">
              <span className="material-symbols-outlined text-primary text-base">code_blocks</span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                Engineering Blog &bull; Technical Insights
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              Architectural Blueprints &amp; Distributed Systems
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
              In-depth engineering notes on scaling real-time lakehouses, sub-20ms machine learning inference, and high-concurrency event-driven platforms.
            </p>
          </motion.div>

          {/* Featured Deep Dive Spotlight */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="flex flex-col gap-4 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-wider">
                      Featured Publication
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30 text-xs font-medium">
                      {featured.category}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">
                      {featured.readTime}
                    </span>
                  </div>

                  <h2 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface leading-snug">
                    {featured.title}
                  </h2>

                  <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => setReadingArticle(featured)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs sm:text-sm font-semibold hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(160,120,255,0.4)] transition-all hover:scale-105"
                    >
                      <span className="material-symbols-outlined text-base">menu_book</span>
                      <span>Read Full Architecture Deep Dive</span>
                    </button>
                    <span className="text-xs text-on-surface-variant font-mono">
                      By {featured.author} &bull; {featured.date}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center w-72 h-56 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 p-6 flex-col justify-between shadow-inner">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs text-primary"># Distributed Arch</span>
                    <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  </div>
                  <pre className="text-[11px] font-mono text-on-surface-variant overflow-hidden w-full leading-relaxed">
                    {`CDC -> Kafka (Partitions)\n  -> ClickHouse Columnar\n  -> Sub-250ms p99 SLA`}
                  </pre>
                  <span className="text-[10px] text-secondary font-mono">
                    Validated in Production
                  </span>
                </div>
              </div>

              {/* Background ambient glow */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>
          )}

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-xs transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white font-bold shadow-[0_0_16px_rgba(160,120,255,0.5)]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search articles, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white/40 dark:bg-surface-container-lowest/80 border border-white/20 dark:border-white/[0.08] text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <TiltCard key={article.id} maxTilt={6} depth={10} glare={true} className="h-full">
                <ArticleCard
                  article={article}
                  onRead={(a) => setReadingArticle(a)}
                />
              </TiltCard>
            ))}
          </div>

        </div>
      </main>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingArticle(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-low/95 border border-primary/30 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between gap-4 border-b border-surface-container-high/60 pb-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {readingArticle.category}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">
                      {readingArticle.readTime} &bull; {readingArticle.date}
                    </span>
                  </div>
                  <h2 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface">
                    {readingArticle.title}
                  </h2>
                </div>

                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Formatted Article Body */}
              <div className="prose prose-invert max-w-none text-on-surface leading-relaxed space-y-4 text-sm sm:text-base">
                {readingArticle.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="font-display-xl text-lg sm:text-xl font-bold text-primary mt-6 mb-2">
                        {block.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (block.startsWith('```')) {
                    const lines = block.split('\n');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                      <pre key={idx} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-secondary font-mono text-xs overflow-x-auto shadow-inner my-4">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={idx} className="text-on-surface-variant leading-relaxed">
                      {block}
                    </p>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-surface-container-high/60 flex items-center justify-between gap-4">
                <span className="text-xs text-on-surface-variant">
                  Author: <strong className="text-secondary">{readingArticle.author}</strong>
                </span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-all"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}

