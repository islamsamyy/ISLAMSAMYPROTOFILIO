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
  TrendingUp,
  Target,
} from 'lucide-react';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { TiltCard } from '@/components/ui/TiltCard';
import { usePricing } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { PricingPackage, localizePackage } from '@/data/seedPricing';

const FAQS_EN = [
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
      '100% of all code, database schemas, automation workflows, and architecture documentation are directly committed to your organization’s private repositories under a mutual enterprise NDA with full IP transfer.',
  },
  {
    question: 'Can systems run on an internal local server without internet?',
    answer:
      'Yes. Our On-Premise and Industrial ERP/PLC packages can run 100% locally on your factory, shop, or school server with automated backups and optional encrypted cloud dashboards for management.',
  },
];

const FAQS_AR = [
  {
    question: 'كيف يعمل نظام الدفعات المرتبطة بالمراحل (Milestone-Gated)؟',
    answer:
      'يُقسم المشروع إلى مراحل تسليم واضحة وموثّقة. لا يتم استحقاق دفعة أي مرحلة إلا بعد تسليمها، مراجعتها، والتأكد من مطابقتها لمعايير الجودة والأداء المتفق عليها.',
  },
  {
    question: 'هل يمكن البدء بجلسة استشارية قبل التعاقد على باقة كاملة؟',
    answer:
      'نعم بالتأكيد. يبدأ معظم عملائنا بجلسة تشخيص معماري لمدة 60 دقيقة ($150) نراجع فيها وضع النظام الحالي ونحدد نقاط الاختناق ونطاق العمل الدقيق—وتُخصم قيمة الجلسة بالكامل من تكلفة الباقة عند البدء.',
  },
  {
    question: 'هل يوجد ضمان وصيانة بعد إطلاق النظام؟',
    answer:
      'نعم، كل باقة تشمل ضماناً لمدة 30 يوماً بعد الإطلاق يغطي المراقبة، معالجة أي أخطاء، وتحسين الأداء، مع إمكانية التعاقد على باقة صيانة وتطوير شهرية مستمرة.',
  },
  {
    question: 'من يمتلك الكود المصدري والملكية الفكرية للنظام؟',
    answer:
      'تمتلك شركتك 100% من الكود المصدري وقواعد البيانات والتوثيق الفني بموجب اتفاقية عدم إفشاء (NDA)، بدون أي اشتراكات شهرية خانقة لكل مستخدم.',
  },
  {
    question: 'هل تعمل الأنظمة على سيرفر داخلي بدون إنترنت؟',
    answer:
      'نعم، نوفر تشغيل محلي كامل (On-Premise) على سيرفر المصنع أو المحل أو المدرسة بدون الحاجة للإنترنت، مع نسخ احتياطي تلقائي وإمكانية ربط لوحة متابعة سحابية آمنة للإدارة العليا.',
  },
];

export default function PricingPage() {
  const { packages, consultationRates } = usePricing();
  const { t, language } = useLanguage();
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-outline-variant shadow-sm mb-4 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                {language === 'ar' ? 'أسعار استشارات وباقات برمجية شفافة' : 'Transparent Engagement Models • Live Pricing'}
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              {t('pages.pricingTitle', 'Predictable Engineering Investment. Guaranteed Impact.')}
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
              {t('pages.pricingSubtitle', 'Transparent, milestone-gated pricing for high-throughput distributed systems, real-time data lakehouses, and production ML pipelines.')}
            </p>

            {/* Interactive Billing Mode Toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-surface-container-low/85 dark:bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/30 dark:border-white/[0.08] shadow-sm">
              <button
                type="button"
                onClick={() => setBillingCycle('milestone')}
                className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'milestone'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {t('pricing.tabMilestone', 'Project-Based / Milestones')}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('retainer')}
                className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  billingCycle === 'retainer'
                    ? 'bg-secondary text-on-secondary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{t('pricing.tabRetainer', 'Monthly Dedicated Retainer')}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/15 dark:bg-secondary/20 uppercase font-bold">
                  -10% SLA
                </span>
              </button>
            </div>
          </motion.div>

          {/* ENTERPRISE GUARANTEE & TRUST STRIP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              { icon: ShieldCheck, label: language === 'ar' ? 'ملكية فكرية 100%' : '100% IP Ownership', sub: language === 'ar' ? 'الكود بالكامل في مستودعك الخاص' : 'Direct commits under NDA' },
              { icon: CheckCircle2, label: language === 'ar' ? 'دفعات مرتبطة بالإنجاز' : 'Milestone-Gated', sub: language === 'ar' ? 'لا تدفع إلا بعد التحقق' : 'Verified acceptance criteria' },
              { icon: Zap, label: language === 'ar' ? 'ضمان 30 يوماً' : '30-Day Launch SLA', sub: language === 'ar' ? 'مراقبة وأداء بعد الإطلاق' : 'Post-deployment warranty' },
              { icon: Clock, label: language === 'ar' ? 'استشارة قابلة للخصم' : 'Creditable Triage', sub: language === 'ar' ? 'تُخصم عند بدء المشروع' : '$150 call credited to sprint' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface-container-low/75 dark:bg-surface-container-low/45 border border-outline-variant/25 dark:border-white/[0.08] flex items-center gap-3 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-nexa text-xs font-bold text-on-surface truncate">{item.label}</span>
                    <span className="text-[11px] text-on-surface-variant truncate">{item.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECTION 1: PACKAGES CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {packages.map((rawPkg) => {
              const isAr = language === 'ar';
              const pkg = localizePackage(rawPkg, isAr);

              const name = pkg.name;
              const badge = pkg.badge || (isAr ? 'باقة متخصصة' : 'Targeted Sprint');
              const headline = pkg.headline;
              const duration = pkg.duration;
              const targetAudience = pkg.targetAudience;
              const detailedDescription = pkg.detailedDescription;
              const businessRoi = pkg.businessRoi;
              const roiMetric = pkg.roiMetric;
              const deliverables = pkg.deliverables;

              const isPopular = pkg.isPopular;
              const displayPrice = billingCycle === 'milestone'
                ? pkg.price
                : `$${Math.round(parseInt(pkg.price.replace(/[^0-9]/g, '') || '5000', 10) * 0.9).toLocaleString()}`;
              const displayFreq = billingCycle === 'milestone'
                ? pkg.frequency
                : (isAr ? '/ شهرياً (عقد مستمر)' : '/ month (retained)');

              return (
                <TiltCard key={pkg.id} maxTilt={4} depth={10} glare={true} className="h-full">
                  <div
                    className={`relative h-full p-7 sm:p-8 rounded-3xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between gap-6 ${
                      isPopular
                        ? 'border-2 border-primary/70 shadow-md dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] bg-surface-container-low/95'
                        : 'border border-outline-variant dark:border-white/[0.08] hover:border-outline shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] bg-surface-container-low/95 dark:bg-surface-container-low/60'
                    }`}
                  >
                    {/* Top Specular Rim */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent pointer-events-none rounded-t-3xl" />

                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                        {isAr ? 'الأكثر طلباً • عائد استثماري مرتفع' : 'Most Requested • High ROI'}
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] uppercase font-bold border border-primary/20">
                          {badge}
                        </span>
                        <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-secondary" />
                          <span>{duration}</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="font-nexa text-xl sm:text-2xl font-bold text-on-surface leading-snug">
                          {name}
                        </h3>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                          {headline}
                        </p>
                      </div>

                      {targetAudience && (
                        <div className="flex items-start gap-2 px-3.5 py-2 rounded-xl bg-surface-container-highest/40 border border-outline-variant/20 text-xs text-on-surface-variant">
                          <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-on-surface">
                              {isAr ? 'الأنسب لـ: ' : 'Best For: '}
                            </span>
                            <span>{targetAudience}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-baseline gap-2 py-4 border-y border-surface-container-high/60">
                        <span className={`font-nexa text-4xl font-extrabold ${isPopular ? 'text-primary' : 'text-on-surface'}`}>
                          {displayPrice}
                        </span>
                        <span className="text-xs text-on-surface-variant font-mono">
                          {displayFreq}
                        </span>
                      </div>

                      {detailedDescription && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold block">
                            {isAr ? 'الشرح التفصيلي للباقة:' : 'Detailed Scope & Architecture:'}
                          </span>
                          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            {detailedDescription}
                          </p>
                        </div>
                      )}

                      {businessRoi && (
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-primary/5 to-secondary/10 border border-emerald-500/25 space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                              <TrendingUp className="w-3.5 h-3.5" />
                              {isAr ? 'العائد على الاستثمار (Business ROI)' : 'Business Value & Expected ROI'}
                            </span>
                            {roiMetric && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                                {roiMetric}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                            {businessRoi}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2.5 pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold block">
                          {isAr ? 'الخدمات والمخرجات المتضمنة:' : 'Deliverables & Milestones Included:'}
                        </span>
                        <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant">
                          {deliverables.map((deliv, dIdx) => (
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
                            ? 'bg-primary text-on-primary shadow-sm hover:shadow-md hover:scale-[1.02]'
                            : 'bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant hover:border-primary'
                        }`}
                      >
                        <span>
                          {isAr
                            ? `احجز باقة: ${name}`
                            : isPopular
                            ? t('pricing.deployCta', 'Deploy Enterprise Architecture')
                            : `${t('pricing.bookCta', 'Book')} ${name}`}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {/* SECTION 2: 1-ON-1 ARCHITECTURE ADVISORY SESSIONS */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/95 dark:bg-surface-container-low/60 backdrop-blur-2xl border border-outline-variant dark:border-white/[0.08] shadow-sm dark:shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider">
                  {language === 'ar' ? 'استشارات فنية مباشرة' : 'Direct Advisory Track'}
                </span>
                <span className="text-xs text-on-surface-variant font-mono">
                  {language === 'ar' ? 'حجز في نفس الأسبوع' : 'Same-Week Calendar Dispatch'}
                </span>
              </div>

              <h2 className="font-nexa text-2xl sm:text-4xl font-extrabold text-on-surface">
                {language === 'ar' ? 'تحتاج تشخيصاً معمارياً سريعاً قبل بدء المشروع؟' : 'Need Fast Architectural Triage Before Committing?'}
              </h2>

              <p className="text-xs sm:text-base text-on-surface-variant leading-relaxed">
                {language === 'ar'
                  ? 'احجز جلسة استشارية فردية سرية لتقييم البنية الحالية، تحسين أداء قواعد البيانات، أو تخطيط نظام ERP وربط ماكينات المصنع قبل الالتزام بأي باقة.'
                  : 'Book a high-impact, confidential 1-on-1 strategy call to audit your streaming topology, optimize database performance, or prepare for enterprise scale.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 flex flex-col gap-1">
                  <span className="text-xs font-mono uppercase text-on-surface-variant">
                    {language === 'ar' ? 'جلسة تشخيص 30 دقيقة' : '30-Minute Architecture Audit'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-nexa text-3xl font-extrabold text-secondary">
                      {consultationRates?.session30Min || '$90'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">
                      {language === 'ar' ? '/ جلسة' : '/ session'}
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant mt-1">
                    {language === 'ar' ? 'تشخيص سريع لنقاط الاختناق وتوصيات فورية.' : 'Direct bottleneck triage & immediate recommendations.'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-secondary/30 flex flex-col gap-1 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-secondary font-bold">
                      {language === 'ar' ? 'مراجعة معمارية شاملة 60 دقيقة' : '60-Minute Deep Architecture Review'}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary text-[9px] font-bold">
                      {language === 'ar' ? 'موصى به' : 'Recommended'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-nexa text-3xl font-extrabold text-primary">
                      {consultationRates?.session60Min || '$150'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">
                      {language === 'ar' ? '/ جلسة' : '/ session'}
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant mt-1">
                    {language === 'ar' ? 'مخطط نظام متكامل وخارطة طريق تنفيذية مفصلة.' : 'Full system blueprinting, CDC design & follow-up dossier.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 lg:max-w-xs w-full">
              <Link
                href="/book"
                className="w-full py-4 px-6 rounded-2xl bg-primary text-on-primary font-nexa text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm hover:shadow-md text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ar' ? 'احجز استشارة الآن ←' : 'Schedule Consultation →'}</span>
              </Link>
              <span className="text-[11px] text-center text-on-surface-variant font-mono">
                {language === 'ar' ? 'تُخصم 100% من قيمة أي باقة تختارها لاحقاً' : '100% credited toward any subsequent delivery sprint'}
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
                {language === 'ar' ? 'تسليم مرتبط بالإنجاز 100%' : '100% Milestone-Gated Delivery'}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {language === 'ar'
                  ? 'لا يتم تحرير الدفعات إلا بعد التحقق من معايير القبول واختبار الأداء واعتماد كل مرحلة.'
                  : 'Invoices are only triggered upon verified acceptance criteria, automated test passing, and staging sign-off.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-nexa text-lg font-bold text-on-surface">
                {language === 'ar' ? 'اتفاقية سرية وملكية كاملة للكود' : 'Mutual NDA & Full IP Transfer'}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {language === 'ar'
                  ? 'سرية تامة ونقل كامل للملكية الفكرية؛ كل الكود وقواعد البيانات والمستندات ملك حصري لشركتك.'
                  : 'Strict confidentiality with immediate IP transfer. All code, models, and architecture artifacts belong solely to your company.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary/15 border border-tertiary/30 flex items-center justify-center text-tertiary">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-nexa text-lg font-bold text-on-surface">
                {language === 'ar' ? 'ضمان تشغيل 30 يوماً بعد الإطلاق' : '30-Day Post-Launch SLA Warranty'}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {language === 'ar'
                  ? 'تغطية مضمونة بعد الإطلاق تشمل المراقبة اللحظية، تحسين الأداء، ومعالجة أي أعطال فوراً.'
                  : 'Guaranteed coverage after production release including real-time telemetry observation, performance tuning, and hotfixes.'}
              </p>
            </div>
          </div>

          {/* SECTION 4: ENTERPRISE PRICING FAQ ACCORDION */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col gap-8 max-w-4xl mx-auto w-full">
            <div className="text-center flex flex-col items-center gap-2">
              <span className="font-mono text-xs uppercase text-primary font-bold tracking-wider">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
              <h2 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                {language === 'ar' ? 'كل ما تحتاج معرفته عن الباقات والتعاقد' : 'Everything You Need to Know About Pricing & Terms'}
              </h2>
            </div>

            <div className="divide-y divide-surface-container-high/60">
              {(language === 'ar' ? FAQS_AR : FAQS_EN).map((faq, idx) => (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className={`w-full flex items-center justify-between gap-4 font-nexa text-base sm:text-lg font-bold text-on-surface hover:text-primary transition-colors py-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
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
                {language === 'ar' ? 'حلول مفصلة حسب الطلب' : 'Tailored Engagements'}
              </span>
              <h3 className="font-nexa text-2xl font-bold text-on-surface">
                {language === 'ar' ? 'تحتاج نطاق عمل مخصص لمصنعك أو شركتك؟' : 'Need a Custom Architectural Scope or Retainer?'}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                {language === 'ar'
                  ? 'إذا كان مشروعك يحتاج ربط عدد محدد من ماكينات PLC أو دمج عدة فروع أو عقد تطوير طويل الأجل، تواصل معنا لتصميم عرض مخصص.'
                  : 'If your project demands custom data governance, multi-region CDC streaming, or long-term staff augmentation, let\'s configure a custom SLA contract.'}
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-2xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-lg transition-all hover:scale-105 shrink-0 text-center"
            >
              {language === 'ar' ? 'اطلب عرض سعر مخصص ←' : 'Request Custom Enterprise Quote →'}
            </Link>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
