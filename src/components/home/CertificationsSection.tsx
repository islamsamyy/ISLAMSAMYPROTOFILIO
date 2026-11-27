'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCertifications } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { CertificationItem } from '@/data/seedCertifications';
import {
  Award,
  ExternalLink,
  CheckCircle,
  GraduationCap,
  Eye,
  ShieldCheck,
  Copy,
  Check,
  X,
  FileBadge2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const PAGE_SIZE = 8;

export function CertificationsSection() {
  const { certifications } = useCertifications();
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [page, setPage] = useState<number>(0);
  const [viewingCert, setViewingCert] = useState<CertificationItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return certifications;
    return certifications.filter((c) =>
      c.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [certifications, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const visibleCerts = useMemo(
    () => filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE),
    [filtered, safePage]
  );

  useEffect(() => {
    setPage(0);
  }, [filter]);

  useEffect(() => {
    if (!viewingCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewingCert(null);
      else if (e.key === 'ArrowRight') handleNavigateModal('next');
      else if (e.key === 'ArrowLeft') handleNavigateModal('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewingCert, filtered]);

  const handleCopyId = (id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleNavigateModal = (direction: 'prev' | 'next') => {
    if (!viewingCert || filtered.length <= 1) return;
    const currentIndex = filtered.findIndex((c) => c.id === viewingCert.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % filtered.length
        : (currentIndex - 1 + filtered.length) % filtered.length;
    setViewingCert(filtered[nextIndex]);
  };

  return (
    <section
      id="certifications"
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 scroll-mt-24 content-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-outline-variant shadow-sm mb-4 backdrop-blur-xl">
          <Award className="w-4 h-4 text-primary" />
          <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
            {t('certifications.badge', 'Verified Industry Accreditations & Degrees')}
          </span>
        </div>
        <h2 className="font-nexa text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight">
          {t('certifications.title', 'Certifications & Academic Credentials')}
        </h2>
        <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
          {t(
            'certifications.subtitle',
            'Rigorous independent validations from DataCamp, Cisco, MaharaTech ITI, IBM, and Tanta University across high-performance machine learning, data engineering pipelines, and distributed analytics.'
          )}
        </p>

        {/* Academic Degrees Highlight Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-surface-container-low/80 dark:bg-white/[0.04] border border-primary/30 backdrop-blur-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold block">
                {language === 'ar' ? 'بكالوريوس' : "Bachelor's Degree • Graduated"}
              </span>
              <h3 className="font-nexa text-sm font-bold text-on-surface leading-snug">
                {language === 'ar'
                  ? 'نظم معلومات الأعمال (BIS) — جامعة طنطا'
                  : 'Business Information Systems (BIS) — Tanta University'}
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/80 dark:bg-white/[0.04] border border-secondary/30 backdrop-blur-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold block">
                {language === 'ar' ? 'تمهيدي ماجستير' : "Pre-Master's Degree • Completed"}
              </span>
              <h3 className="font-nexa text-sm font-bold text-on-surface leading-snug">
                {language === 'ar'
                  ? 'نظم معلومات الأعمال (BIS) — جامعة طنطا'
                  : 'Business Information Systems (BIS) — Tanta University'}
              </h3>
            </div>
          </div>
        </div>

        {/* Filter Pills & Pagination Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-7 pt-4 border-t border-surface-container-high/40">
          <div className="flex items-center justify-center flex-wrap gap-2 mx-auto sm:mx-0">
            {[
              { id: 'all', label: t('certifications.filterAll', 'All Credentials') },
              { id: 'machine learning', label: t('certifications.filterML', 'Machine Learning & AI') },
              { id: 'data analytics', label: t('certifications.filterData', 'Data Analytics & SQL') },
              { id: 'cloud', label: t('certifications.filterCloud', 'Cloud & Big Data') },
              { id: 'academic', label: language === 'ar' ? 'الدرجات الأكاديمية' : 'Academic Degrees' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label-md transition-colors duration-200 ${
                  filter === tab.id
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 mx-auto sm:mx-0 shrink-0">
              <span className="text-xs font-mono text-on-surface-variant mr-1">
                {safePage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                className="p-2 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Previous certificates page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => (p + 1) % totalPages)}
                className="p-2 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Next certificates page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 8-CARD (4x2) HIGH-PERFORMANCE CERTIFICATES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visibleCerts.map((cert) => {
          const thumb = cert.imageUrl || cert.issuerLogo;
          return (
            <button
              key={cert.id}
              type="button"
              onClick={() => setViewingCert(cert)}
              className="group/card relative text-left rounded-2xl bg-surface-container-low/95 dark:bg-[#0a0a0a]/95 hover:bg-surface-container-low border border-outline-variant dark:border-white/[0.08] hover:border-outline shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Certificate Image Frame */}
              <div className="relative aspect-[16/10] w-full bg-surface-container-lowest overflow-hidden border-b border-white/10">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-container-high/60 to-surface-container-lowest">
                    <FileBadge2 className="w-8 h-8 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-bold">
                      Official Credential
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity" />
                <span
                  className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                    cert.status === 'Verified'
                      ? 'bg-primary/20 border-primary/40 text-primary'
                      : 'bg-secondary/20 border-secondary/40 text-secondary'
                  }`}
                >
                  {cert.status === 'Verified' ? (
                    <CheckCircle className="w-2.5 h-2.5" />
                  ) : (
                    <GraduationCap className="w-2.5 h-2.5" />
                  )}
                  {cert.status}
                </span>
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background/85 backdrop-blur-md border border-primary/40 text-primary text-[10px] font-mono font-bold group-hover/card:bg-primary group-hover/card:text-on-primary transition-colors">
                  <Eye className="w-3 h-3" />
                  <span>View</span>
                </span>
              </div>

              {/* Compact Card Metadata */}
              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary block truncate">
                    {cert.issuer}
                  </span>
                  <h3 className="font-nexa text-sm sm:text-base font-bold text-on-surface group-hover/card:text-primary transition-colors leading-snug mt-0.5 line-clamp-2">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-2 border-t border-surface-container-high/50 mt-1">
                  <span>{cert.issueDate}</span>
                  <span className="truncate max-w-[120px] text-primary/80">{cert.category}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === safePage
                  ? 'w-7 bg-primary'
                  : 'w-2 bg-surface-container-highest hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* INTERACTIVE CERTIFICATE PREVIEW / DOSSIER MODAL */}
      <AnimatePresence>
        {viewingCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingCert(null)}
              className="fixed inset-0 bg-background/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-surface-container-lowest/95 border-2 border-primary/40 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 flex flex-col gap-5"
            >
              <button
                type="button"
                onClick={() => setViewingCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors z-10"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-surface-container-low via-surface-container to-surface-container-low border border-primary/30 flex flex-col items-center text-center">
                {viewingCert.imageUrl || viewingCert.issuerLogo ? (
                  <div className="relative w-full mb-5 rounded-2xl overflow-hidden border border-primary/40 bg-black/30 shadow-xl">
                    <img
                      src={viewingCert.imageUrl || viewingCert.issuerLogo}
                      alt={viewingCert.title}
                      className="w-full max-h-[420px] object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-white/40 dark:bg-white/[0.08] border border-primary/50 flex items-center justify-center text-primary mb-4">
                    <FileBadge2 className="w-9 h-9 text-primary" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                    {viewingCert.issuer}
                  </span>
                </div>

                <h3 className="font-nexa text-xl sm:text-2xl font-extrabold text-on-surface mb-2">
                  {viewingCert.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed mb-5">
                  {viewingCert.description}
                </p>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 text-left font-mono text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block">Candidate:</span>
                    <span className="font-bold text-on-surface font-nexa text-sm">Islam Samy</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block">Date Issued:</span>
                    <span className="font-bold text-secondary">{viewingCert.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-on-surface-variant block">Status:</span>
                    <span className="font-bold text-primary">{viewingCert.status}</span>
                  </div>
                </div>

                {viewingCert.credentialId && (
                  <div className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-high/40 border border-white/[0.06] font-mono text-xs mb-4">
                    <span className="text-on-surface-variant">
                      {t('certifications.credentialId', 'Credential Verification ID')}:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(viewingCert.credentialId!)}
                      className="flex items-center gap-1.5 text-primary font-bold hover:underline"
                    >
                      <span>{viewingCert.credentialId}</span>
                      {copiedId === viewingCert.credentialId ? (
                        <Check className="w-3.5 h-3.5 text-secondary" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {viewingCert.skills.length > 0 && (
                  <div className="w-full flex flex-wrap justify-center gap-1.5">
                    {viewingCert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-surface-container-high text-xs font-mono text-on-surface border border-outline-variant/30"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {filtered.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigateModal('prev')}
                      className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/30 transition-colors"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigateModal('next')}
                      className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/30 transition-colors"
                      aria-label="Next certificate"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {viewingCert.verificationUrl && (
                  <a
                    href={viewingCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
                  >
                    <span>{t('certifications.verifyOnline', 'Verify On Official Registry')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setViewingCert(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-nexa uppercase tracking-wider font-semibold transition-colors"
                >
                  {t('certifications.close', 'Close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
