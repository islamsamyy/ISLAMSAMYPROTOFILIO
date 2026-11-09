'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useReviews } from '@/lib/hooks';
import { saveReview, deleteReview } from '@/lib/data-store';
import { ClientReview } from '@/data/seedReviews';

export default function AdminReviewsPage() {
  const { reviews } = useReviews();
  const [editingReview, setEditingReview] = useState<ClientReview | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientTitle, setClientTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [rating, setRating] = useState(5);
  const [projectTag, setProjectTag] = useState('');
  const [quote, setQuote] = useState('');

  const startCreate = () => {
    setClientName('');
    setClientTitle('');
    setCompanyName('');
    setCompanyLogo('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80');
    setRating(5);
    setProjectTag('Distributed Lakehouse Architecture');
    setQuote('');
    setEditingReview(null);
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

  const startEdit = (r: ClientReview) => {
    setClientName(r.clientName);
    setClientTitle(r.clientTitle);
    setCompanyName(r.companyName);
    setCompanyLogo(r.companyLogo);
    setRating(r.rating || 5);
    setProjectTag(r.projectTag);
    setQuote(r.quote);
    setEditingReview(r);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingReview ? editingReview.id : `rev-${Date.now()}`;

    const updated: ClientReview = {
      id,
      clientName,
      clientTitle,
      companyName,
      companyLogo,
      rating,
      projectTag,
      quote,
      date: editingReview ? editingReview.date : 'Nov 2024',
      featured: true
    };

    await saveReview(updated);
    setIsCreating(false);
    setEditingReview(null);
    setSuccessToast(`Review from "${clientName}" saved and live on Home page!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete review from "${name}"?`)) {
      await deleteReview(id);
      setSuccessToast(`Review deleted.`);
      setTimeout(() => setSuccessToast(null), 3000);
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
                <span className="font-mono text-xs text-primary font-semibold uppercase">
                  Social Proof &bull; Verified Testimonials
                </span>
                <span className="text-outline-variant">&bull;</span>
                <span className="text-xs text-on-surface-variant font-mono">{reviews.length} Client Endorsements</span>
              </div>
              <h1 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Client Reviews &amp; Testimonials Manager
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/reviews"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant/30 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-secondary">open_in_new</span>
                <span>View Public /reviews</span>
              </Link>
              <button
                onClick={startCreate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-base">rate_review</span>
                <span>Add Verified Client Review</span>
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
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-low/95 border border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                    <h3 className="font-display-xl text-xl font-bold text-on-surface">
                      {editingReview ? 'Edit Client Review' : 'Add Client Review & Company Logo'}
                    </h3>
                    <button
                      onClick={() => setIsCreating(false)}
                      className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Client Name *</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Tarek Mansour"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Client Executive Title *</label>
                        <input
                          type="text"
                          required
                          value={clientTitle}
                          onChange={(e) => setClientTitle(e.target.value)}
                          placeholder="e.g. Group Chief Information Officer"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Safir Hotels & Resorts"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Company Logo URL</label>
                        <input
                          type="url"
                          value={companyLogo}
                          onChange={(e) => setCompanyLogo(e.target.value)}
                          placeholder="https://..."
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Rating (1 to 5 Stars)</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        >
                          <option value={5}>★★★★★ (5 Stars)</option>
                          <option value={4}>★★★★☆ (4 Stars)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Project Scope Tag *</label>
                        <input
                          type="text"
                          required
                          value={projectTag}
                          onChange={(e) => setProjectTag(e.target.value)}
                          placeholder="e.g. OPERA PMS Lakehouse & BI"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Endorsement Quote *</label>
                      <textarea
                        rows={4}
                        required
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="Direct quote detailing the impact, performance SLA, and collaboration experience..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs uppercase hover:bg-primary hover:text-on-primary shadow-md"
                      >
                        {editingReview ? 'Save Changes' : 'Publish Review'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="px-4 py-2.5 rounded-xl bg-surface-container-high text-xs text-on-surface-variant hover:text-on-surface"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Reviews Grid Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-base fill-current">
                          star
                        </span>
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold">
                      {r.projectTag}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant italic leading-relaxed line-clamp-3">
                    &ldquo;{r.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    {r.companyLogo && (
                      <img
                        src={r.companyLogo}
                        alt={r.companyName}
                        className="w-8 h-8 rounded-lg object-cover border border-outline-variant/30"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-on-surface">{r.clientName}</span>
                      <span className="text-[11px] text-on-surface-variant">
                        {r.clientTitle} &bull; <strong className="text-secondary">{r.companyName}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container-high/60 flex items-center justify-end gap-2">
                  <button
                    onClick={() => startEdit(r)}
                    className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id, r.clientName)}
                    className="px-3 py-1 rounded-lg bg-error-container/20 hover:bg-error hover:text-on-error text-error font-semibold text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

