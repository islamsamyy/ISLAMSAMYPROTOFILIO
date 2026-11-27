'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Factory,
  Gauge,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function OperationsResearchSection() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const pillars = [
    {
      num: '01',
      icon: Gauge,
      accent: 'text-primary border-primary/30 bg-primary/10',
      title: isAr ? 'تفكيك الزمن وكشف الاختناقات' : 'Time-Motion & Bottleneck Elimination',
      metric: isAr ? '+15% طاقة إنتاجية مستعادة' : '+15% Recovered Capacity',
      desc: isAr
        ? 'أُحوّل كل دقيقة تشغيل إلى معادلة واضحة تفصل الإنتاج الفعلي عن التوقفات الصامتة وفجوات الانتظار داخل المصانع والهيئات، لأستعيد لك ساعات التشغيل المهدرة بدون زيادة في الرواتب أو الأصول.'
        : 'I decompose every operational minute into active output vs. silent stops and idle gaps across factories and institutions—recovering lost capacity without adding payroll or assets.',
    },
    {
      num: '02',
      icon: Layers,
      accent: 'text-secondary border-secondary/30 bg-secondary/10',
      title: isAr ? 'التخصيص الأمثل للموارد والخامات' : 'Mathematical Resource & Inventory Allocation',
      metric: isAr ? '-15% هدر في الخامات والمستهلكات' : '-15% Material & Consumable Waste',
      desc: isAr
        ? 'تطبيق نماذج بحوث العمليات لضبط أرصدة المخازن، قوائم المواد (BOM)، وجدولة أوامر الشغل والموارد البشرية في المصانع والهيئات لمنع العجز المفاجئ أو التكدس غير المبرر.'
        : 'Applies Operations Research models to control inventory balances, Bills of Materials (BOM), work-order scheduling, and institutional budgets—eliminating stockouts and waste.',
    },
    {
      num: '03',
      icon: BarChart3,
      accent: 'text-tertiary border-tertiary/30 bg-tertiary/10',
      title: isAr ? 'اقتصاديات الوحدة والتكلفة الحقيقية' : 'Unit-Economics & True Costing Engine',
      metric: isAr ? 'رؤية فورية لصافي ربح كل وحدة' : 'Real-Time Net Margin Per Unit',
      desc: isAr
        ? 'ربط الخامات والطاقة والعمالة والمصاريف الإدارية بكل أمر تشغيل أو خدمة لحظياً، لكشف البنود الخاسرة فوراً وتصحيح التسعير بقرارات مبنية على الأرقام لا التخمين.'
        : 'Connects raw materials, energy (kWh), labor, and overhead to every job or institutional service in real time—exposing loss-making lines and fixing pricing immediately.',
    },
    {
      num: '04',
      icon: Cpu,
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      title: isAr ? 'الاستباق التنبؤي والأتمتة الذكية' : 'Predictive Reliability & Autonomous Ops',
      metric: isAr ? '-60% أعمال يدوية وتكلفة تشغيل' : '-60% Manual Operational Overhead',
      desc: isAr
        ? 'دمج بيانات الحساسات (PLC) مع وكلاء الذكاء الاصطناعي وأتمتة n8n للتدخل المبكر قبل وقوع الأعطال الكارثية وتحويل المؤسسة من رد الفعل إلى الإدارة التنبؤية.'
        : 'Combines PLC sensor telemetry, autonomous AI agents, and n8n workflows to intervene before costly failures and move leadership from reactive fixes to predictive control.',
    },
  ];

  const guarantees = isAr
    ? [
        'خط أساس رقمي وتشخيص مجاني خلال 48 ساعة يثبت حجم الهدر وفرص التوفير قبل البدء.',
        'مؤشرات أداء وعائد استثماري (KPIs) مكتوبة ومربوطة بمراحل التسليم منذ يوم التعاقد.',
        'ملكية كاملة 100% للنظام والبيانات مع اتفاقية سرية (NDA) وضمان تشغيل بعد الإطلاق.',
      ]
    : [
        '48-hour diagnostic baseline proving exact waste, downtime, and savings before launch.',
        'Contractual ROI & KPI benchmarks tied directly to milestone-gated deliverables from Day 1.',
        '100% source code & data ownership under mutual NDA with post-launch warranty SLA.',
      ];

  return (
    <section
      id="operations-research"
      className="w-full max-w-[1280px] mx-auto px-gutter py-12 relative z-10 scroll-mt-24 content-auto"
    >
      <div className="rounded-3xl bg-surface-container-low/85 dark:bg-[#0a0a0a]/95 border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6 sm:p-10 relative overflow-hidden">
        {/* Ambient Accent Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(160,120,255,0.22),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(123,208,255,0.18),transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/35 mb-4">
            <Factory className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-[11px] sm:text-xs uppercase tracking-wider text-primary font-bold">
              {isAr
                ? 'بحوث العمليات × أنظمة إدارة الموارد للمصانع والهيئات'
                : 'Operations Research × Enterprise Resource Systems'}
            </span>
          </div>

          <h2 className="font-headline-lg text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-on-surface tracking-tight leading-tight">
            {isAr ? (
              <>
                كل نظام أبنيه قائم على{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-tertiary-fixed bg-clip-text text-transparent">
                  بحوث العمليات (Operations Research)
                </span>{' '}
                لتحقيق أعلى كفاءة تشغيلية وعائد مضمون
              </>
            ) : (
              <>
                Every System I Build Is Engineered on{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-tertiary-fixed bg-clip-text text-transparent">
                  Operations Research (OR)
                </span>{' '}
                for Maximum Efficiency &amp; Guaranteed ROI
              </>
            )}
          </h2>

          <p className="font-body-md text-xs sm:text-base text-on-surface-variant mt-4 leading-relaxed max-w-3xl mx-auto">
            {isAr
              ? 'سواء كنت تدير مصنعاً صناعياً أو هيئة أو مؤسسة خدمية، أنا لا أبيعك مجرد برنامج حسابات أو شاشات تقارير تسجل الخسارة بعد وقوعها — بل أبني لك نظام إدارة موارد (ERP) ذكياً يحوّل بيانات التشغيل إلى قرارات رياضية ترفع الإنتاجية وتضبط التكلفة وتضمن لك عائداً ملموساً بمجرد التعاقد.'
              : 'Whether you run an industrial factory, government entity, or enterprise institution, I do not sell passive accounting screens that report losses after the fact. I build Operations-Research-driven ERP & data systems that turn live operations into mathematical profit and guaranteed ROI upon contracting.'}
          </p>
        </div>

        {/* 4 OR Pillars */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest/80 dark:bg-[#111111]/95 border border-outline-variant/25 dark:border-white/[0.08] hover:border-primary/45 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-on-surface-variant">
                        OR-{pillar.num}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-[11px] font-mono font-bold">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contract-Backed Guaranteed ROI Box */}
        <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/15 via-surface-container-high/85 to-secondary/15 border border-primary/40 shadow-[0_12px_36px_rgba(160,120,255,0.18)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-[11px] font-mono font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {isAr ? 'ضمان العائد على كافة الأنظمة بمجرد التعاقد' : 'Contract-Backed ROI Guarantee Across Every System'}
                </span>
              </div>

              <h3 className="font-headline-sm text-xl sm:text-2xl font-extrabold text-on-surface">
                {isAr
                  ? 'لا تدفع مقابل برمجيات جامدة — استثمر في نظام يغطي تكلفته ويضاعف أرباحك'
                  : 'Never Pay for Passive Software — Invest in Systems That Pay for Themselves'}
              </h3>

              <div className="space-y-2 pt-1">
                {guarantees.map((g, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/25 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-on-surface-variant block">
                    {isAr ? 'العائد المستهدف على الاستثمار' : 'Target Operational ROI'}
                  </span>
                  <span className="text-2xl font-display-xl font-extrabold text-primary">8x – 20x</span>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>

              <Link
                href="/book"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-nexa text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
              >
                <span>{isAr ? 'احجز استشارة ضمان العائد الآن' : 'Book Your ROI Architecture Call'}</span>
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>

              <Link
                href="/blog/wirecut-os-marble-granite-erp-operations-research"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-secondary border border-secondary/30 text-xs font-mono font-semibold transition-all"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{isAr ? 'شاهد نموذج بحوث العمليات (WireCut OS)' : 'Read WireCut OS Case Study'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
