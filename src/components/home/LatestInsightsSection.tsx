'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { useArticles } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';

export function LatestInsightsSection() {
  const { articles } = useArticles();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const topArticles = articles.slice(0, 3);
  if (topArticles.length === 0) return null;

  return (
    <section
      id="insights"
      className="w-full max-w-[1280px] mx-auto px-gutter py-12 relative z-10 scroll-mt-24 content-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-outline-variant/20 pb-5">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tertiary/15 border border-tertiary/30 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-tertiary" />
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-tertiary font-bold">
              {isAr ? 'المدونة الهندسية ودراسات الجدوى' : 'Engineering Blog & Technical Blueprints'}
            </span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            {isAr ? 'أحدث المقالات والمقترحات الهندسية' : 'Latest Architecture Blueprints & Case Proposals'}
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            {isAr
              ? 'مقالات تطبيقية حول بحوث العمليات في المصانع، أنظمة ERP المخصصة، وكلاء الذكاء الاصطناعي، وهندسة مستودعات البيانات.'
              : 'Deep-dive guides on Operations Research for factories, custom ERP architectures, autonomous AI agents, and zero-downtime data lakehouses.'}
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high/85 hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-outline-variant/30 font-nexa text-xs font-bold uppercase tracking-wider transition-all shrink-0"
        >
          <span>{isAr ? `جميع المقالات (${articles.length})` : `Read All Articles (${articles.length})`}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topArticles.map((art, idx) => {
          const title = isAr && art.title_ar ? art.title_ar : art.title;
          const excerpt = isAr && art.excerpt_ar ? art.excerpt_ar : art.excerpt;
          return (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group p-5 sm:p-6 rounded-2xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 border border-outline-variant/25 dark:border-white/[0.08] hover:border-primary/45 shadow-[0_10px_28px_rgba(0,0,0,0.2)] flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-[10px] font-bold uppercase">
                    {art.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-on-surface-variant">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                {idx === 0 && (
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-secondary font-bold uppercase mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>{isAr ? 'أحدث دراسة فنية ومالية' : 'Featured Technical Proposal'}</span>
                  </div>
                )}

                <Link href={`/blog/${art.slug}`}>
                  <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2.5">
                    {title}
                  </h3>
                </Link>

                <p className="font-body-sm text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                  {excerpt}
                </p>
              </div>

              <div className="pt-3.5 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5 min-w-0">
                  {art.tags.slice(0, 2).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-surface-container-highest text-[10px] font-mono text-secondary truncate"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary uppercase tracking-wider shrink-0"
                >
                  <span>{isAr ? 'اقرأ المقال' : 'Read'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
