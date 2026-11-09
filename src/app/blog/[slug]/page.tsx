import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { initialArticles } from '@/data/seedArticles';
import { getStoredArticles } from '@/lib/data-store';
import { supabase } from '@/lib/supabase/client';

export const revalidate = 60;

export async function generateStaticParams() {
  return initialArticles.map((a) => ({
    slug: a.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Try fetching from Supabase first, fallback to initialArticles
  let article = null;
  try {
    const { data } = await (supabase.from('articles') as any)
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data) {
      const row = data as any;
      article = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        category: row.category,
        readTime: row.read_time,
        date: row.date,
        author: row.author || 'Islam Samy',
        excerpt: row.excerpt,
        content: row.content,
        tags: row.tags || [],
        featured: Boolean(row.featured),
      };
    }
  } catch (e) {
    // Fallback below
  }

  if (!article) {
    article = initialArticles.find((a) => a.slug === slug);
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[900px] mx-auto px-gutter flex flex-col gap-8">
          
          {/* Breadcrumb / Back Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Engineering Blog</span>
            </Link>
            <span>/</span>
            <span className="text-secondary truncate">{article.category}</span>
          </div>

          {/* Article Header Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-mono text-on-surface-variant">
                {article.readTime}
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                {article.date}
              </span>
            </div>

            <h1 className="font-display-xl text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-container-high/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary text-sm">
                  IS
                </div>
                <div>
                  <span className="font-semibold text-sm text-on-surface block">
                    {article.author}
                  </span>
                  <span className="text-xs text-on-surface-variant font-mono">
                    Senior Data Systems &amp; BI Architect
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-high text-[11px] font-mono text-secondary border border-outline-variant/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Article Formatted Body */}
          <article className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md prose prose-invert max-w-none text-on-surface leading-relaxed space-y-6 text-base sm:text-lg">
            {article.content.split('\n\n').map((block: string, idx: number) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display-xl text-xl sm:text-2xl font-bold text-primary mt-8 mb-3">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('```')) {
                const lines = block.split('\n');
                const lang = lines[0].replace('```', '') || 'sql';
                const code = lines.slice(1, -1).join('\n');
                return (
                  <div key={idx} className="my-6 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/30 overflow-hidden shadow-inner">
                    <div className="px-4 py-2 bg-surface-container-high/60 border-b border-outline-variant/20 flex items-center justify-between">
                      <span className="font-mono text-xs text-secondary font-bold uppercase">{lang}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono">Production Architecture</span>
                    </div>
                    <pre className="p-4 sm:p-6 text-secondary font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                  {block}
                </p>
              );
            })}
          </article>

          {/* Bottom Advisory CTA Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high border border-primary/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-secondary uppercase font-bold tracking-wider">
                Architecture Advisory
              </span>
              <h3 className="font-nexa text-xl font-bold text-on-surface">
                Facing Similar Streaming or Lakehouse Bottlenecks?
              </h3>
              <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
                Book a direct 1-on-1 architecture review or engage a production delivery sprint with guaranteed SLA.
              </p>
            </div>
            <Link
              href="/book"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all hover:scale-105 shrink-0 text-center"
            >
              Book Advisory Session &rarr;
            </Link>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
