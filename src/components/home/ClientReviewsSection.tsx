'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReviews } from '@/lib/hooks';

export function ClientReviewsSection() {
  const { reviews, loaded } = useReviews();

  return (
    <section id="reviews" className="relative z-10 w-full max-w-[1280px] mx-auto px-gutter py-20 scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-14"
      >
        <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-high border border-primary/30 shadow-[0_0_20px_rgba(208,188,255,0.2)] mb-4">
          <span className="material-symbols-outlined text-primary text-base">verified</span>
          <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-semibold">
            Verified Client Endorsements
          </span>
        </div>
        <h2 className="font-display-xl text-3xl sm:text-4xl text-on-surface font-bold tracking-tight">
          Client Reviews &amp; Production Impact
        </h2>
        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl mt-3 leading-relaxed">
          Direct testimonials from CIOs, VPs of Engineering, and Directors whose critical systems and data pipelines I have re-architected.
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev, index) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-surface-container-low/45 hover:bg-surface-container/70 backdrop-blur-xl border border-outline-variant/30 hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Row: Stars & Project Tag */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg fill-current">
                      star
                    </span>
                  ))}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high border border-secondary/30 text-secondary text-[11px] font-label-md font-semibold">
                  {rev.projectTag}
                </span>
              </div>

              {/* Quote */}
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed italic mb-6">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            {/* Bottom Row: Client & Company Logo Badge */}
            <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-primary/30 flex items-center justify-center font-bold text-primary text-sm shadow-sm">
                  {rev.clientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface">
                    {rev.clientName}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    {rev.clientTitle} &bull; <span className="text-secondary font-medium">{rev.companyName}</span>
                  </span>
                </div>
              </div>

              {/* Company Logo Display */}
              {rev.companyLogo && (
                <div className="shrink-0 p-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30">
                  <img
                    src={rev.companyLogo}
                    alt={rev.companyName}
                    className="w-8 h-8 rounded object-cover filter brightness-110"
                  />
                </div>
              )}
            </div>

            {/* Ambient Card Corner Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-tr-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* View All & Leave Review CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(160,120,255,0.4)] transition-all duration-300"
        >
          <span>Explore All Verified Client Reviews</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface text-xs sm:text-sm font-semibold border border-outline-variant/40 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-base text-secondary">rate_review</span>
          <span>Leave Client Feedback</span>
        </Link>
      </div>
    </section>
  );
}

