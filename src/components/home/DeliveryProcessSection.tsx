'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, Cpu, Rocket, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function DeliveryProcessSection() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const phases = [
    {
      step: '01',
      icon: Compass,
      accent: 'text-primary border-primary/30 bg-primary/10',
      timeline: isAr ? 'الأسبوع 1 • التدقيق' : 'Week 1 • Discovery',
      title: isAr ? 'التحليل الميداني وتدقيق البيانات' : 'Operational Audit & Data Baseline',
      desc: isAr
        ? 'استيعاب ملفات الـ PLC أو قواعد البيانات القديمة، تحديد الاختناقات التشغيلية، وحساب خط الأساس للعائد الاستثماري.'
        : 'Ingest PLC logs, ERP tables, or legacy databases to pinpoint operational bottlenecks and establish a measurable ROI baseline.',
      deliverables: isAr
        ? ['خريطة مصادر البيانات', 'تحليل الفجوات والاختناقات', 'وثيقة النطاق والمؤشرات']
        : ['Data source & bottleneck map', 'KPI & unit-economics baseline', 'Milestone scope & SLA'],
    },
    {
      step: '02',
      icon: Cpu,
      accent: 'text-secondary border-secondary/30 bg-secondary/10',
      timeline: isAr ? 'الأسبوع 2 • المعمارية' : 'Week 2 • Blueprint',
      title: isAr ? 'تصميم المعمارية ونمذجة البيانات' : 'System Architecture & Schema Design',
      desc: isAr
        ? 'هندسة مخططات قواعد البيانات (PostgreSQL / ClickHouse)، تدفقات Kafka أو n8n، وتصميم واجهات ERP ووكلاء الذكاء الاصطناعي.'
        : 'Architect relational & columnar schemas (PostgreSQL / ClickHouse), event pipelines (Kafka / n8n), and modular ERP or AI agent flows.',
      deliverables: isAr
        ? ['مخطط قواعد البيانات الموثّق', 'تصميم الصلاحيات RBAC', 'نموذج تفاعلي للوحات التحكم']
        : ['Indexed schema & ERD specs', '5-tier RBAC & security model', 'Interactive dashboard prototype'],
    },
    {
      step: '03',
      icon: Rocket,
      accent: 'text-tertiary border-tertiary/30 bg-tertiary/10',
      timeline: isAr ? 'الأسابيع 2–4 • التنفيذ' : 'Weeks 2–4 • Build',
      title: isAr ? 'البناء الإنتاجي والاختبار المتكرر' : 'Iterative Production Engineering',
      desc: isAr
        ? 'تطوير الوحدات البرمجية بأعلى معايير الأداء (Next.js 15، Python، TypeScript) مع تسليمات مرحلية قابلة للقياس أسبوعياً.'
        : 'Ship production-grade modules in Next.js 15, Python, and TypeScript with milestone-gated demos and automated quality checks.',
      deliverables: isAr
        ? ['كود إنتاجي نظيف وموثّق', 'اختبارات جودة البيانات الآلية', 'ربط مباشر بالأنظمة الحالية']
        : ['Production code in your repo', 'Automated data quality checks', 'Live API / ERP / PLC connectors'],
    },
    {
      step: '04',
      icon: ShieldCheck,
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      timeline: isAr ? 'الإطلاق • ضمان 30 يوماً' : 'Launch • 30-Day SLA',
      title: isAr ? 'الإطلاق، التدريب، والمراقبة المستمرة' : 'Launch, Team Training & Telemetry SLA',
      desc: isAr
        ? 'تدريب عملي للمشغلين والمدراء، تفعيل المراقبة اللحظية والتنبيهات، وضمان استقرار ما بعد الإطلاق لمدة 30 يوماً.'
        : 'Hands-on training for operators and executives, live alerting & audit logs, plus a 30-day post-launch warranty SLA.',
      deliverables: isAr
        ? ['تدريب الفرق التشغيلية والمالية', 'تقارير تنفيذية جاهزة للتصدير', 'ضمان ومتابعة ما بعد الإطلاق']
        : ['Operator & executive training', 'One-click executive CSV/BI reports', '30-day warranty & tuning SLA'],
    },
  ];

  return (
    <section
      id="process"
      className="w-full max-w-[1280px] mx-auto px-gutter py-12 relative z-10 scroll-mt-24 content-auto"
    >
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 mb-3">
          <Compass className="w-3.5 h-3.5 text-secondary" />
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-bold">
            {isAr ? 'منهجية التنفيذ الهندسي' : 'Engineering Delivery Blueprint'}
          </span>
        </div>
        <h2 className="font-headline-lg text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          {isAr ? 'كيف أُحوّل التحدي التشغيلي إلى نظام إنتاجي خلال أسابيع' : 'How I Turn Operational Bottlenecks into Production Systems in 4 Weeks'}
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2.5 leading-relaxed">
          {isAr
            ? 'منهجية تسليم مرحلية شفافة تضمن ملكية الكود بالكامل، انعدام التوقف التشغيلي، وتحقيق أول موجة وفر مالي منذ الشهر الأول.'
            : 'A milestone-gated execution framework engineered for zero operational downtime, full IP ownership, and measurable ROI from Month 1.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {phases.map((phase, idx) => {
          const Icon = phase.icon;
          return (
            <motion.div
              key={phase.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 border border-outline-variant/25 dark:border-white/[0.08] hover:border-primary/40 shadow-[0_10px_28px_rgba(0,0,0,0.2)] flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${phase.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-on-surface/15">{phase.step}</span>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono text-secondary font-semibold mb-2">
                  {phase.timeline}
                </span>

                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface mb-2">
                  {phase.title}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-4">
                  {phase.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 space-y-1.5">
                {phase.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom 48-Hour Diagnostic Banner */}
      <div className="mt-7 p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold block mb-1">
            {isAr ? 'تشخيص فني مجاني خلال 48 ساعة' : 'Complimentary 48-Hour Technical Diagnostic'}
          </span>
          <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
            {isAr
              ? 'أرسل لي عينة من بيانات التشغيل أو ملفات الـ PLC، وسأستخرج لك خلال 48 ساعة تقريراً يوضح التوقفات الضائعة وفرص التوفير قبل التعاقد.'
              : 'Send me a sample of your operational logs or ERP/database schema and I will deliver a 48-hour diagnostic detailing hidden downtime and cost-saving opportunities.'}
          </p>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-nexa text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0"
        >
          <span>{isAr ? 'احجز جلسة التشخيص' : 'Request Diagnostic'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
        </Link>
      </div>
    </section>
  );
}
