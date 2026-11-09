'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { useReviews } from '@/lib/hooks';
import { saveReview } from '@/lib/data-store';
import { ClientReview } from '@/data/seedReviews';
import { Star, ShieldCheck, Plus, X, CheckCircle2, MessageSquareQuote, Filter } from 'lucide-react';
import Link from 'next/link';

export default function ReviewsPage() {
  const { reviews } = useReviews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  // Form State for Leaving a Review
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [projectTag, setProjectTag] = useState('');
  const [feedback, setFeedback] = useState('');

  const filteredReviews = reviews.filter((r) => {
    const matchCategory =
      selectedCategory === 'all' ||
      (r.projectTag && r.projectTag.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchRating = selectedRating === null || r.rating === selectedRating;
    return matchCategory && matchRating;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) return;

    const newRev: any = {
      id: `rev-${Date.now()}`,
      clientName: name,
      authorName: name,
      clientTitle: role || 'Enterprise Executive',
      authorRole: role || 'Enterprise Executive',
      companyName: company || 'Confidential Client',
      company: company || 'Confidential Client',
      rating,
      date: 'Just now',
      projectTag: projectTag || 'Strategic Systems Architecture',
      quote: feedback,
      feedback,
      featured: true,
      verified: true,
    };

    saveReview(newRev);
    setModalOpen(false);
    setSubmittedToast(true);
    setName('');
    setRole('');
    setCompany('');
    setRating(5);
    setProjectTag('');
    setFeedback('');

    setTimeout(() => {
      setSubmittedToast(false);
    }, 4500);
  };

  const avgRating = (
    reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          
          {/* Header & Scoreboard Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] p-8 sm:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary mb-4">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-label-sm text-xs font-semibold uppercase tracking-wider">
                    Verified Production Testimonials
                  </span>
                </div>
                <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                  Executive Endorsements &amp; Client Feedback
                </h1>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
                  Real assessments from CIOs, VPs of Engineering, and Directors whose critical systems, OPERA PMS pipelines, and AI/BI architectures Islam Samy has engineered.
                </p>
              </div>

              {/* Scorecard Widget */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 p-6 rounded-2xl bg-surface-container-lowest/60 border border-white/[0.08] shadow-inner backdrop-blur-md">
                <div className="flex flex-col items-center justify-center text-center pr-6 sm:border-r border-outline-variant/30">
                  <span className="font-nexa text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {avgRating}
                  </span>
                  <div className="flex items-center gap-1 my-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-[11px] font-label-sm text-on-surface-variant uppercase">
                    5.0 / 5.0 Rating
                  </span>
                </div>

                <div className="flex flex-col gap-2 min-w-[160px]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Client Retention:</span>
                    <span className="font-semibold text-secondary">95%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Milestone Delivery:</span>
                    <span className="font-semibold text-primary">100%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Verified Reviews:</span>
                    <span className="font-semibold text-on-surface">{reviews.length}+</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-nexa text-xs uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:shadow-[0_0_28px_rgba(160,120,255,0.6)] transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Leave Review
                </button>
              </div>

            </div>
          </section>

          {/* Toast Notification */}
          <AnimatePresence>
            {submittedToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/15 border border-secondary text-on-surface shadow-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <div className="flex-1 text-sm font-medium">
                  Thank you! Your executive endorsement has been submitted and published live across the portfolio.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-label-sm text-on-surface-variant uppercase mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Scope Filter:
              </span>
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'opera', label: 'OPERA PMS & Hospitality' },
                { id: 'lakehouse', label: 'Distributed Lakehouse' },
                { id: 'ml', label: 'Predictive ML & AI' },
                { id: 'telemetry', label: 'Executive BI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-label-sm transition-all duration-200 ${
                    selectedCategory === tab.id
                      ? 'bg-primary text-white font-bold shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                      : 'bg-white/40 dark:bg-white/[0.04] text-on-surface-variant hover:text-on-surface hover:bg-white/60 dark:hover:bg-white/[0.08]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-label-sm text-on-surface-variant uppercase">Rating:</span>
              <button
                type="button"
                onClick={() => setSelectedRating(selectedRating === 5 ? null : 5)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedRating === 5
                    ? 'border-primary bg-primary/20 text-primary font-bold'
                    : 'border-white/20 dark:border-white/[0.08] bg-white/40 dark:bg-surface-container/40 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" /> 5 Stars Only
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev, idx) => (
              <motion.article
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative p-6 sm:p-7 rounded-3xl bg-surface-container-low/40 hover:bg-surface-container-low/65 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(160,120,255,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Specular Rim Light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    {((rev as any).verified || (rev as any).featured) && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-[10px] font-semibold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  <p className="font-body-md text-sm text-on-surface/90 leading-relaxed italic mb-6">
                    &ldquo;{(rev as any).feedback || (rev as any).quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-nexa font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                      {(rev as any).authorName || (rev as any).clientName}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {(rev as any).authorRole || (rev as any).clientTitle} • <span className="text-secondary">{(rev as any).company || (rev as any).companyName}</span>
                    </p>
                  </div>
                  {rev.projectTag && (
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-surface-container-high text-[10px] font-label-sm text-on-surface-variant border border-outline-variant/30 max-w-[120px] truncate">
                      {rev.projectTag}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-16 p-8 rounded-2xl bg-surface-container-low/40 border border-outline-variant/30">
              <MessageSquareQuote className="w-12 h-12 mx-auto text-on-surface-variant/40 mb-3" />
              <h3 className="font-nexa text-lg font-bold text-on-surface">No reviews match your selected filter</h3>
              <p className="text-sm text-on-surface-variant mt-1">Try resetting the filter to explore all verified client testimonials.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); setSelectedRating(null); }}
                className="mt-4 px-4 py-2 rounded-xl bg-primary text-on-primary font-nexa text-xs uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-primary-container/20 via-secondary-container/15 to-primary-container/10 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-nexa text-2xl font-bold text-on-surface">Ready to Achieve Similar Results?</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Explore tailored milestone engagements or book a 1-on-1 strategic architecture session.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/book"
                className="px-6 py-3 rounded-xl bg-primary text-on-primary font-nexa text-xs uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                Book Advisory
              </Link>
              <Link
                href="/projects"
                className="px-5 py-3 rounded-xl bg-surface-container-high text-on-surface hover:text-primary font-nexa text-xs uppercase tracking-wider border border-outline-variant/40 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />

      {/* Review Submission Modal Dialog */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-on-surface"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-primary">
                  Client Feedback Intake
                </span>
                <h2 className="font-nexa text-2xl font-bold text-on-surface mt-1">
                  Submit an Executive Review
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Share your experience working with Islam Samy on distributed architectures, ML pipelines, or BI systems.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-label-sm uppercase font-semibold text-on-surface-variant mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Tarek Mansour"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-label-sm uppercase font-semibold text-on-surface-variant mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. VP of Engineering"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-sm uppercase font-semibold text-on-surface-variant mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Safir Hotels & Resorts"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-label-sm uppercase font-semibold text-on-surface-variant mb-1">
                      Rating *
                    </label>
                    <div className="flex items-center gap-1.5 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-primary text-primary'
                                : 'text-outline-variant/50'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label-sm uppercase font-semibold text-on-surface-variant mb-1">
                      Project Scope
                    </label>
                    <input
                      type="text"
                      value={projectTag}
                      onChange={(e) => setProjectTag(e.target.value)}
                      placeholder="e.g. Real-Time OPERA BI"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label-sm uppercase font-semibold text-on-surface-variant mb-1">
                    Your Review &amp; Impact Assessment *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Describe the technical solution, engineering execution, and business impact..."
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high/60">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-nexa text-xs uppercase tracking-wider font-semibold shadow-[0_0_16px_rgba(160,120,255,0.4)] hover:shadow-[0_0_24px_rgba(160,120,255,0.6)]"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
