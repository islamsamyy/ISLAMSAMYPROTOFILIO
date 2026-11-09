'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useArticles } from '@/lib/hooks';
import { saveArticle, deleteArticle } from '@/lib/data-store';
import { ArticleItem } from '@/data/seedArticles';

export default function AdminBlogPage() {
  const { articles } = useArticles();
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ArticleItem['category']>('Architecture');
  const [readTime, setReadTime] = useState('6 min read');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('Kafka, Distributed Systems, Event-Driven');
  const [featured, setFeatured] = useState(false);

  const startCreate = () => {
    setTitle('');
    setSlug('');
    setCategory('Architecture');
    setReadTime('7 min read');
    setExcerpt('');
    setContent('### Architecture Overview\n\nDetailed technical analysis of distributed stream processing systems...');
    setTagsStr('ClickHouse, Kafka, Python, SQL');
    setFeatured(false);
    setEditingArticle(null);
    setIsCreating(true);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('create') === 'true') {
        startCreate();
      }
    }
  }, []);

  const startEdit = (a: ArticleItem) => {
    setTitle(a.title);
    setSlug(a.slug);
    setCategory(a.category);
    setReadTime(a.readTime);
    setExcerpt(a.excerpt);
    setContent(a.content);
    setTagsStr(a.tags.join(', '));
    setFeatured(a.featured);
    setEditingArticle(a);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      const id = editingArticle ? editingArticle.id : `art-${Date.now()}`;
      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

      const updated: ArticleItem = {
        id,
        slug: generatedSlug,
        title,
        category,
        readTime,
        date: editingArticle ? editingArticle.date : 'Nov 2024',
        author: 'Islam Samy',
        excerpt,
        content,
        tags,
        featured,
      };

      await saveArticle(updated);
      setIsCreating(false);
      setEditingArticle(null);
      setSuccessToast(`Article "${title}" published and saved to Supabase!`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      alert(`Save failed: ${err.message || 'Error saving article'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete article "${name}"?`)) {
      try {
        await deleteArticle(id);
        setSuccessToast(`Article deleted.`);
        setTimeout(() => setSuccessToast(null), 3000);
      } catch (err: any) {
        alert(`Delete failed: ${err.message || 'Error deleting article'}`);
      }
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <AdminNav />

      <main className="w-full pt-24 pb-20 flex-1">
        <div className="max-w-[1400px] mx-auto px-gutter flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-tertiary font-semibold uppercase">
                  Technical Publishing CMS
                </span>
                <span className="text-outline-variant">&bull;</span>
                <span className="text-xs text-on-surface-variant font-mono">{articles.length} Publications Live</span>
              </div>
              <h1 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Engineering Blog &amp; Insights Manager
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant/30 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-secondary">open_in_new</span>
                <span>View Public /blog</span>
              </Link>
              <button
                onClick={startCreate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-base">post_add</span>
                <span>New Architecture Article</span>
              </button>
            </div>
          </div>

          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono"
            >
              ✓ {successToast}
            </motion.div>
          )}

          {/* Form Modal */}
          <AnimatePresence>
            {isCreating && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCreating(false)}
                  className="fixed inset-0 bg-background/80 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-low/95 border border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                    <h3 className="font-display-xl text-xl font-bold text-on-surface">
                      {editingArticle ? 'Edit Article Publication' : 'Draft New Engineering Article'}
                    </h3>
                    <button
                      onClick={() => setIsCreating(false)}
                      className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Distributed Event-Driven Architecture: 4 Pitfalls & Solutions"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Architecture">Architecture</option>
                          <option value="Data Engineering">Data Engineering</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Performance">Performance</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Reading Time</label>
                        <input
                          type="text"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          placeholder="8 min read"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Slug (optional)</label>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="zero-downtime-lakehouse"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={tagsStr}
                        onChange={(e) => setTagsStr(e.target.value)}
                        placeholder="Kafka, ClickHouse, CDC, Distributed Systems"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Executive Excerpt *</label>
                      <textarea
                        rows={2}
                        required
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Short summary displayed on cards..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Article Content (Markdown supported)</label>
                      <textarea
                        rows={8}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="featured-check"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="rounded bg-surface-container-lowest border-outline-variant/30 text-primary"
                      />
                      <label htmlFor="featured-check" className="text-xs text-on-surface cursor-pointer">
                        Feature this publication as Hero spotlight on /blog
                      </label>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase hover:bg-primary/90 shadow-md transition-all disabled:opacity-50"
                      >
                        {isSaving ? 'Saving to Database...' : editingArticle ? 'Save Changes' : 'Publish Publication'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="px-4 py-3 rounded-xl bg-surface-container-high text-xs text-on-surface-variant hover:text-on-surface"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Articles Table */}
          <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 overflow-x-auto shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-high text-on-surface-variant uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Read Time</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40">
                {articles.map((a) => (
                  <tr key={a.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="p-4 font-semibold text-on-surface max-w-md truncate">{a.title}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        {a.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-on-surface-variant">{a.readTime}</td>
                    <td className="p-4 font-mono text-on-surface-variant">{a.date}</td>
                    <td className="p-4">
                      {a.featured ? (
                        <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[10px] font-bold">
                          ★ Hero Spotlight
                        </span>
                      ) : (
                        <span className="text-on-surface-variant text-[11px]">&mdash;</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/blog/${a.slug}`}
                        target="_blank"
                        className="inline-block px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-secondary font-semibold"
                      >
                        Preview ↗
                      </Link>
                      <button
                        onClick={() => startEdit(a)}
                        className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id, a.title)}
                        className="px-3 py-1 rounded-lg bg-error-container/20 hover:bg-error hover:text-on-error text-error font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
