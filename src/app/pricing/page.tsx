'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  DollarSign,
  Calendar,
  Zap,
  ChevronDown,
  Layers,
  Lock,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { TiltCard } from '@/components/ui/TiltCard';
import { usePricing } from '@/lib/hooks';
import { PricingPackage } from '@/data/seedPricing';

const FAQS = [
  {
    question: 'How do milestone-gated payments work?',
    answer:
      'Engagements are divided into clear architectural sprints. Each milestone has documented acceptance criteria, automated test coverage, and benchmark verification before the milestone invoice is released. You never pay for unverified work.',
  },
  {
    question: 'Can we start with a 1-on-1 advisory session before committing to a package?',
    answer:
      'Yes, absolutely. Most enterprise clients book a 60-minute deep architecture triage session ($150) first. We review your current stack, diagnose bottlenecks, and map out the exact scope. If you subsequently engage a delivery sprint, the consultation fee is credited toward your package.',
  },
  {
    question: 'Do you provide a post-deployment warranty and ongoing SLA?',
    answer:
      'Yes. Every production package includes a 30-day post-launch warranty covering telemetry monitoring, bug fixes, and performance tuning. Ongoing fractional advisory and maintenance retainers are also available.',
  },
  {
    question: 'How are intellectual property and source code handled?',
    answer:
      '100% of all code, Terraform scripts, Kafka schemas, database migrations, and architecture documentation are directly committed to your organization’s private repositories under a mutual enterprise NDA with full IP transfer.',
  },
  {
    question: 'What timezones and collaboration tools do you support?',
    answer:
      'Based in Cairo EET (UTC+2), overlapping with EMEA, UK/London GMT, and US East Coast business hours. We collaborate via Slack/Discord, Google Meet, GitHub, and Jira/Linear.',
  },
];

export default function PricingPage() {
  const { packages, consultationRates } = usePricing();
  const [billingCycle, setBillingCycle] = useState<'milestone' | 'retainer'>('milestone');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[1320px] mx-auto px-gutter flex flex-col gap-16">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-primary/30 shadow-[0_0_24px_rgba(160,120,255,0.25)] mb-4 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#d0bcff]"></span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                Transparent Engagement Models &bull; Live Pricing
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              Predictable Engineering Investment. Guaranteed Impact.
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
              Transparent, milestone-gated pricing for high-throughput distributed systems, real-time data lakehouses, and production ML pipelines.
            </p>

            {/* Interactive Billing Mode Toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
              <button
                type="button"
                onClick={() => setBillingCycle('milestone')}
                className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'milestone'
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(160,120,255,0.5)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Project-Based / Milestones
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('retainer')}
                className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  billingCycle === 'retainer'
                    ? 'bg-secondary text-on-secondary shadow-[0_0_20px_rgba(123,208,255,0.5)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>Monthly Dedicated Retainer</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary/20 text-secondary border border-secondary/30 uppercase font-bold">
                  SLA Gated
                </span>
              </button>
            </div>
          </motion.div>

          {/* SECTION 1: PACKAGES CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => {
              const isPopular = pkg.isPopular;
              const displayPrice = billingCycle === 'milestone'
                ? pkg.price
                : `$${Math.round(parseInt(pkg.price.replace(/[^0-9]/g, '') || '5000', 10) * 0.9).toLocaleString()}`;
              const displayFreq = billingCycle === 'milestone'
                ? pkg.frequency
                : '/ month (retained)';

              return (
                <TiltCard key={pkg.id} maxTilt={6} depth={12} glare={true} className="h-full">
                  <div
                    className={`relative h-full p-7 sm:p-8 rounded-3xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between gap-6 ${
                      isPopular
                        ? 'border-2 border-primary/50 shadow-[0_0_35px_rgba(160,120,255,0.25),0_12px_40px_rgba(0,0,0,0.6)] bg-surface-container-low/95'
                        : 'border border-white/20 dark:border-white/[0.08] hover:border-secondary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] bg-surface-container-low/60'
                    }`}
                  >
                    {/* Top Specular Rim */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-sm text-[11px] font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(160,120,255,0.5)]">
                        Most Requested &bull; Enterprise
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] uppercase font-bold border border-primary/20">
                          {pkg.badge || 'Targeted Sprint'}
                        </span>
                        <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-secondary" />
                          <span>{pkg.duration}</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="font-nexa text-2xl font-bold text-on-surface">
                          {pkg.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                          {pkg.headline}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-2 py-4 border-y border-surface-container-high/60">
                        <span className={`font-nexa text-4xl font-extrabold ${isPopular ? 'text-primary' : 'text-on-surface'}`}>
                          {displayPrice}
                        </span>
                        <span className="text-xs text-on-surface-variant font-mono">
                          {displayFreq}
                        </span>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold block">
                          Deliverables &amp; Milestones Included:
                        </span>
                        <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                          {pkg.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-on-surface">
                              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                              <span className="leading-snug">{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-surface-container-high/60">
                      <Link
                        href={`/book?package=${pkg.id}`}
                        className={`w-full py-3.5 px-5 rounded-2xl text-center font-nexa text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                          isPopular
                            ? 'bg-primary text-on-primary shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:shadow-[0_0_32px_rgba(160,120,255,0.65)] hover:scale-[1.02]'
                            : 'bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface border border-outline-variant/30 hover:border-primary/50'
                        }`}
                      >
                        <span>Book Engagement Package</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {/* SECTION 2: 1-ON-1 ARCHITECTURE ADVISORY SESSIONS */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider">
                  Direct Advisory Track
                </span>
                <span className="text-xs text-on-surface-variant font-mono">
                  Same-Week Calendar Dispatch
                </span>
              </div>

              <h2 className="font-nexa text-2xl sm:text-4xl font-extrabold text-on-surface">
                Need Fast Architectural Triage Before Committing?
              </h2>

              <p className="text-xs sm:text-base text-on-surface-variant leading-relaxed">
                Book a high-impact, confidential 1-on-1 strategy call to audit your streaming topology, optimize database performance, or prepare for enterprise scale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 flex flex-col gap-1">
                  <span className="text-xs font-mono uppercase text-on-surface-variant">30-Minute Architecture Audit</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-nexa text-3xl font-extrabold text-secondary">
                      {consultationRates?.session30Min || '$90'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">/ session</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant mt-1">Direct bottleneck triage &amp; immediate recommendations.</span>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-secondary/30 flex flex-col gap-1 shadow-[0_0_20px_rgba(123,208,255,0.15)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-secondary font-bold">60-Minute Deep Architecture Review</span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary text-[9px] font-bold">Recommended</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-nexa text-3xl font-extrabold text-primary">
                      {consultationRates?.session60Min || '$150'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">/ session</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant mt-1">Full system blueprinting, CDC design &amp; follow-up dossier.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 lg:max-w-xs w-full">
              <Link
                href="/book"
                className="w-full py-4 px-6 rounded-2xl bg-secondary text-on-secondary font-nexa text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-secondary-fixed transition-all shadow-[0_0_24px_rgba(123,208,255,0.4)] hover:shadow-[0_0_32px_rgba(123,208,255,0.6)] text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation &rarr;</span>
              </Link>
              <span className="text-[11px] text-center text-on-surface-variant font-mono">
                100% credited toward any subsequent delivery sprint
              </span>
            </div>
          </div>

          {/* SECTION 3: ENTERPRISE SLA & GUARANTEES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-nexa text-lg font-bold text-on-surface">
                100% Milestone-Gated Delivery
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Invoices are only triggered upon verified acceptance criteria, automated test passing, and staging sign-off.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-nexa text-lg font-bold text-on-surface">
                Mutual NDA &amp; Full IP Transfer
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Strict confidentiality with immediate IP transfer. All code, models, and architecture artifacts belong solely to your company.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary/15 border border-tertiary/30 flex items-center justify-center text-tertiary">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-nexa text-lg font-bold text-on-surface">
                30-Day Post-Launch SLA Warranty
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Guaranteed coverage after production release including real-time telemetry observation, performance tuning, and hotfixes.
              </p>
            </div>
          </div>

          {/* SECTION 4: ENTERPRISE PRICING FAQ ACCORDION */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col gap-8 max-w-4xl mx-auto w-full">
            <div className="text-center flex flex-col items-center gap-2">
              <span className="font-mono text-xs uppercase text-primary font-bold tracking-wider">
                Frequently Asked Questions
              </span>
              <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                Everything You Need to Know About Pricing &amp; Terms
              </h2>
            </div>

            <div className="divide-y divide-surface-container-high/60">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-nexa text-base sm:text-lg font-bold text-on-surface hover:text-primary transition-colors py-2"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-200 ${
                        openFaqIndex === idx ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-on-surface-variant pt-2 pb-3 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: CUSTOM ENTERPRISE SCOPE CTA */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high border border-primary/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-secondary uppercase font-bold tracking-wider">
                Tailored Engagements
              </span>
              <h3 className="font-nexa text-2xl font-bold text-on-surface">
                Need a Custom Architectural Scope or Retainer?
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                If your project demands custom data governance, multi-region CDC streaming, or long-term staff augmentation, let's configure a custom SLA contract.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-2xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-lg transition-all hover:scale-105 shrink-0 text-center"
            >
              Request Custom Enterprise Quote &rarr;
            </Link>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
