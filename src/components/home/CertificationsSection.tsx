'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCertifications } from '@/lib/hooks';
import { CertificationItem } from '@/data/seedCertifications';
import {
  Award,
  ExternalLink,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Eye,
  ShieldCheck,
  Copy,
  Check,
  X,
  FileBadge2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
} from 'lucide-react';

export function CertificationsSection() {
  const { certifications } = useCertifications();
  const [filter, setFilter] = useState<string>('all');
  const [viewingCert, setViewingCert] = useState<CertificationItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filtered = certifications.filter((c) => {
    if (filter === 'all') return true;
    return c.category.toLowerCase().includes(filter.toLowerCase());
  });

  // Ensure sufficient items for seamless continuous looping
  const displayItems =
    filtered.length < 4
      ? [...filtered, ...filtered, ...filtered, ...filtered]
      : [...filtered, ...filtered];

  const handleCopyId = (id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-24 content-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-primary/40 shadow-[0_0_24px_rgba(208,188,255,0.3)] mb-4 backdrop-blur-xl">
          <Award className="w-4 h-4 text-primary" />
          <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
            Verified Industry Accreditations &amp; Degrees
          </span>
        </div>
        <h2 className="font-nexa text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight">
          Certifications &amp; Academic Credentials
        </h2>
        <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
          Rigorous independent validations from DataCamp, Cisco, MaharaTech ITI, IBM, and Tanta University across high-performance machine learning, data engineering pipelines, and distributed analytics.
        </p>

        {/* Filter Pills & Interactive Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-4 border-t border-surface-container-high/40">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mx-auto sm:mx-0">
            {[
              { id: 'all', label: 'All Credentials' },
              { id: 'machine learning', label: 'Machine Learning & AI' },
              { id: 'data analytics', label: 'Data Analytics & SQL' },
              { id: 'cloud', label: 'Cloud & Big Data' },
              { id: 'academic', label: 'Academic Degrees' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label-md transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-[0_0_20px_rgba(160,120,255,0.5)] scale-105'
                    : 'bg-white/40 dark:bg-white/[0.04] text-on-surface-variant hover:text-on-surface hover:bg-white/70 dark:hover:bg-white/[0.08] border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Slideshow Controls */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-secondary mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span>Gliding Right</span>
              <ArrowRight className="w-3 h-3 text-secondary animate-pulse" />
            </span>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface text-xs font-mono transition-all"
              title={isPaused ? "Resume auto-glide" : "Pause auto-glide"}
              aria-label={isPaused ? "Resume auto-glide" : "Pause auto-glide"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-primary" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => handleManualScroll('left')}
              className="p-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface transition-all"
              aria-label="Scroll credentials left"
              title="Previous credential"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleManualScroll('right')}
              className="p-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface transition-all"
              aria-label="Scroll credentials right"
              title="Next credential"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* CONTINUOUS SINGLE ROW SLIDESHOW (Auto-gliding to the Right) */}
      <div
        className="relative w-full overflow-hidden py-4 -mx-4 px-4 group/slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Vignette / Gradient Shadows */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

        {/* Scrollable Container with Hardware Accelerated Slide Animation */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div
            className={`flex items-stretch gap-6 ${
              isPaused ? 'animate-slide-paused' : 'animate-slide-right-slow'
            }`}
          >
            {displayItems.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                className="group/card relative w-[320px] sm:w-[360px] min-h-[340px] shrink-0 p-6 sm:p-7 rounded-3xl bg-surface-container-low/90 dark:bg-[#14161f]/95 hover:bg-surface-container-low/95 border border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(160,120,255,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Specular Rim Light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

                <div>
                  {/* Top Row: Issuer & Status */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-label-sm text-xs font-extrabold uppercase tracking-wider text-secondary">
                      {cert.issuer}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                        cert.status === 'Verified'
                          ? 'bg-primary/15 border-primary/40 text-primary shadow-[0_0_12px_rgba(208,188,255,0.2)]'
                          : 'bg-secondary/15 border-secondary/40 text-secondary'
                      }`}
                    >
                      {cert.status === 'Verified' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <GraduationCap className="w-3 h-3" />
                      )}
                      {cert.status}
                    </span>
                  </div>

                  {/* Title & Date */}
                  <h3 className="font-nexa text-lg sm:text-xl font-bold text-on-surface group-hover/card:text-primary transition-colors leading-snug mb-1.5 line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-mono mb-3">
                    <span>Issued: {cert.issueDate}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => handleCopyId(cert.credentialId!)}
                          className="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                          title="Click to copy credential ID"
                        >
                          <span>ID: {cert.credentialId}</span>
                          {copiedId === cert.credentialId ? (
                            <Check className="w-3 h-3 text-secondary" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-60" />
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Miniature Certificate Showcase Display Frame */}
                  <div
                    onClick={() => setViewingCert(cert)}
                    className="relative my-3 p-3 rounded-2xl bg-gradient-to-br from-surface-container-high/60 to-surface-container-lowest/90 border border-primary/25 hover:border-primary/50 shadow-inner cursor-pointer group/thumb transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-sm">
                          <FileBadge2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-bold">
                            Official Credential
                          </span>
                          <span className="text-xs font-semibold text-on-surface truncate max-w-[150px] sm:max-w-[180px]">
                            Islam Samy &bull; {cert.issuer}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/15 text-primary text-[10px] font-mono font-bold group-hover/thumb:bg-primary group-hover/thumb:text-white transition-colors shrink-0">
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                <div>
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-surface-container-high/60">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/40 dark:bg-surface-container-high/60 text-[10px] font-mono text-on-surface-variant border border-white/20 dark:border-outline-variant/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-surface-container-high text-[10px] font-mono text-primary font-bold">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons: Show Certificate + Verify */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setViewingCert(cert)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_16px_rgba(160,120,255,0.4)] hover:shadow-[0_0_24px_rgba(160,120,255,0.6)] hover:scale-105 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Cert</span>
                    </button>
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface text-xs font-nexa uppercase tracking-wider transition-all duration-200 border border-outline-variant/30 hover:border-primary/40 shadow-sm"
                      >
                        <span>Verify ↗</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setViewingCert(cert)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container-high/80 text-on-surface text-xs font-nexa uppercase tracking-wider border border-outline-variant/30"
                      >
                        <span>Dossier</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE CERTIFICATE PREVIEW / DOSSIER MODAL */}
      <AnimatePresence>
        {viewingCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingCert(null)}
              className="fixed inset-0 bg-background/85 backdrop-blur-xl"
            />

            {/* Certificate Display Parchment & Holographic Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-surface-container-lowest/95 border-2 border-primary/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(160,120,255,0.25)] z-10 flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setViewingCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Inner Card Frame */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-surface-container-low via-surface-container to-surface-container-low border border-primary/30 shadow-inner flex flex-col items-center text-center">
                
                {/* Security Hologram & Crest */}
                <div className="w-16 h-16 rounded-2xl bg-white/40 dark:bg-white/[0.08] backdrop-blur-md border border-primary/50 flex items-center justify-center text-primary mb-4 shadow-[0_0_24px_rgba(160,120,255,0.5)]">
                  <FileBadge2 className="w-9 h-9 text-primary animate-pulse" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                    Official Statement of Credential
                  </span>
                </div>

                <span className="text-xs uppercase font-label-md tracking-wider text-on-surface-variant/80">
                  {viewingCert.issuer}
                </span>

                <h3 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface mt-2 mb-3">
                  {viewingCert.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed mb-6">
                  {viewingCert.description}
                </p>

                {/* Recipient & Signature Box */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 text-left font-mono text-xs mb-6">
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
                    <span className="font-bold text-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      {viewingCert.status}
                    </span>
                  </div>
                </div>

                {/* Credential ID Key */}
                {viewingCert.credentialId && (
                  <div className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-high/40 border border-white/[0.06] font-mono text-xs mb-6">
                    <span className="text-on-surface-variant">Credential Verification ID:</span>
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

                {/* Competencies Mastered */}
                <div className="w-full text-left">
                  <span className="text-[11px] font-mono uppercase text-secondary font-bold block mb-2">
                    Verified Competencies &amp; Algorithms Mastered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingCert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-surface-container-high text-xs font-mono text-on-surface border border-outline-variant/30"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {viewingCert.verificationUrl && (
                  <a
                    href={viewingCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:shadow-[0_0_30px_rgba(160,120,255,0.6)] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <span>Verify On Official Registry</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setViewingCert(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-nexa uppercase tracking-wider font-semibold transition-colors"
                >
                  Close Dossier
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
