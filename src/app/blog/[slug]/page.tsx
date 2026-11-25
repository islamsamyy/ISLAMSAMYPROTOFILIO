import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { initialArticles } from '@/data/seedArticles';
import { getStoredArticles } from '@/lib/data-store';
import { supabase } from '@/lib/supabase/client';
import { BlogPostClient } from '@/components/blog/BlogPostClient';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = initialArticles.find((a) => a.slug === decodedSlug || a.id === decodedSlug);
  if (!article) {
    return {
      title: 'Engineering Article & Proposal',
      description: 'Technical blueprint and Operations Research guide by Islam Samy.',
    };
  }
  const title = article.title;
  const description = article.excerpt.slice(0, 160);
  return {
    title,
    description,
    keywords: [...article.tags, article.category, 'Islam Samy', 'Operations Research', 'ERP'],
    openGraph: {
      title: `${title} | Islam Samy`,
      description,
      type: 'article',
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Islam Samy`,
      description,
    },
  };
}

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

  // Try fetching from Supabase first (matching either slug or id), fallback to initialArticles
  let article: any = null;
  const decodedSlug = decodeURIComponent(slug);
  try {
    const { data } = await (supabase.from('articles') as any)
      .select('*')
      .or(`slug.eq.${decodedSlug},id.eq.${decodedSlug}`)
      .maybeSingle();

    if (data) {
      const row = data as any;
      article = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        title_ar: row.title_ar,
        category: row.category,
        readTime: row.read_time,
        date: row.date,
        author: row.author || 'Islam Samy',
        excerpt: row.excerpt,
        excerpt_ar: row.excerpt_ar,
        content: row.content,
        content_ar: row.content_ar,
        tags: row.tags || [],
        featured: Boolean(row.featured),
      };
    }
  } catch (e) {
    // Fallback below
  }

  const seed = initialArticles.find((a) => a.slug === decodedSlug || a.id === decodedSlug);
  if (!article && seed) {
    article = seed;
  } else if (article && seed) {
    article.title_ar = article.title_ar || seed.title_ar;
    article.excerpt_ar = article.excerpt_ar || seed.excerpt_ar;
    article.content_ar = article.content_ar || seed.content_ar;
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <BlogPostClient article={article} />
      </main>

      <SiteFooter />
    </div>
  );
}
