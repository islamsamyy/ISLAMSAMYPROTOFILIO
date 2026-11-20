'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  Factory,
  ShoppingBag,
  Landmark,
  HeartPulse,
  Briefcase,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function IndustrySolutionsSection() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [activeIndustry, setActiveIndustry] = useState(0);

  const VALUE_PILLARS = [
    {
      icon: Layers,
      title: isArabic ? 'مبنية حول عملياتك بدون تعقيد' : 'Tailored to Your Exact Workflows',
      desc: isArabic
        ? 'بدلاً من البرمجيات الجاهزة المكلفة برسوم شهرية لكل مستخدم، نطور أنظمة ERP ومواقع مخصصة لطبيعة عملك بملكية كاملة للكود 100%.'
        : 'Instead of paying perpetual per-seat SaaS fees for rigid tools, every ERP, web system, and pipeline fits your exact rules with 100% IP ownership.',
      metric: isArabic ? 'ملكية كاملة 100%' : '100% IP Ownership',
      accent: 'text-primary bg-primary/10 border-primary/25',
    },
    {
      icon: TrendingUp,
      title: isArabic ? 'قرارات تنفيذية في أقل من ثانية' : 'Sub-Second Executive Visibility',
      desc: isArabic
        ? 'نحول الجداول المتفرقة وقواعد البيانات القديمة إلى مستودعات بيانات ولوحات Power BI تفاعلية تمنح الإدارة رؤية لحظية للإيرادات والتكاليف.'
        : 'Unify fragmented spreadsheets and legacy silos into automated data pipelines and Power BI executive dashboards for real-time margin & KPI clarity.',
      metric: isArabic ? 'تحليلات فورية' : 'Real-Time BI & ETL',
      accent: 'text-secondary bg-secondary/10 border-secondary/25',
    },
    {
      icon: Zap,
      title: isArabic ? 'ذكاء اصطناعي وأتمتة تقلل التكاليف' : 'AI & Automation That Pays for Itself',
      desc: isArabic
        ? 'وكلاء الذكاء الاصطناعي (RAG) وأتمتة n8n والنماذج التنبؤية تلغي المهام اليدوية المتكررة وتخفض النفقات التشغيلية حتى 60%.'
        : 'Autonomous RAG AI agents, predictive ML models, and n8n automations eliminate manual bottlenecks and cut operational overhead by up to 60%.',
      metric: isArabic ? 'خفض التكلفة 60%' : 'Up to 60% Cost Saved',
      accent: 'text-tertiary bg-tertiary/10 border-tertiary/25',
    },
    {
      icon: ShieldCheck,
      title: isArabic ? 'جاهزة للتوسع ودعم العربية والإنجليزية' : 'Enterprise Scale & Bilingual Ready',
      desc: isArabic
        ? 'بنية تحتية حديثة (Next.js، Supabase، Kafka، ClickHouse) مصممة للأمان العالي، تعدد الفروع، ودعم كامل للغتين العربية والإنجليزية (RTL/LTR).'
        : 'Production-hardened Next.js, PostgreSQL, Kafka, and ClickHouse architectures engineered for multi-branch scale, RBAC security, and native EN/AR (RTL) teams.',
      metric: isArabic ? 'استقرار 99.9%' : '99.9% Production SLA',
      accent: 'text-primary bg-primary/10 border-primary/25',
    },
  ];

  const INDUSTRIES = [
    {
      id: 'hospitality',
      icon: Building2,
      name: isArabic ? 'الفنادق والضيافة' : 'Hospitality & Hotels',
      tagline: isArabic ? 'تكامل OPERA PMS وتحليلات الفنادق متعددة الفروع' : 'Multi-Property ERP, OPERA PMS & Revenue BI',
      solutions: isArabic
        ? [
            'ربط لحظي لأنظمة OPERA PMS مع مستودع بيانات ClickHouse.',
            'لوحات Power BI لمتابعة الإشغال، RevPAR، ADR، وشكاوى النزلاء.',
            'أنظمة حجوزات إلكترونية ومواقع ضيافة ثنائية اللغة.',
          ]
        : [
            'Real-time OPERA PMS CDC streaming into ClickHouse lakehouses.',
            'Executive Power BI cockpits tracking Occupancy, RevPAR, ADR & guest sentiment.',
            'High-converting bilingual booking portals & multi-branch hospitality ERPs.',
          ],
      fields: ['ERP Systems', 'Data Engineering', 'Data Analysis & Power BI'],
    },
    {
      id: 'manufacturing',
      icon: Factory,
      name: isArabic ? 'المصانع والصناعة' : 'Manufacturing & Industrial',
      tagline: isArabic ? 'أنظمة ERP صناعية، OEE، وتكاليف الإنتاج اللحظية' : 'Industrial ERP, BOM, OEE & PLC Costing Analytics',
      solutions: isArabic
        ? [
            'أنظمة ERP مخصصة للمصانع (النسيج والرخام): مخزون، BOM، جودة، ومالية.',
            'استيعاب بيانات الماكينات (PLC/CSV) لحساب كفاءة التشغيل واستهلاك الطاقة.',
            'صلاحيات RBAC متقدمة وسير عمل موافقات متعدد المستويات.',
          ]
        : [
            'Modular factory ERPs (textile, marble, discrete) covering Inventory, BOM, QC & Finance.',
            'Automated PLC/CSV telemetry ingestion for OEE, downtime, wire-wear & energy costing.',
            'Granular RBAC permissions, audit logs & multi-level approval workflows.',
          ],
      fields: ['ERP Systems', 'Data Engineering', 'Data Analysis & Power BI'],
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      name: isArabic ? 'التجارة الإلكترونية والتجزئة' : 'E-Commerce & Retail',
      tagline: isArabic ? 'منصات متعددة التجار، بوابات الدفع، وتحليلات المبيعات' : 'Multi-Vendor Marketplaces, Payments & Retail BI',
      solutions: isArabic
        ? [
            'تطوير متاجر ومنصات متعددة التجار متكاملة مع HyperPay وMoyasar وTap وStripe.',
            'لوحات Power BI للمبيعات العالمية، التوسع الجغرافي، وسلاسل الإمداد.',
            'نماذج توقع الطلب وتحليل سلوك العملاء لزيادة معدل التحويل.',
          ]
        : [
            'Full-stack Next.js marketplaces with HyperPay, Moyasar, Tap & Stripe checkout.',
            'Global sales, store expansion ROI & supply-chain Power BI intelligence.',
            'Predictive demand forecasting & customer segmentation models.',
          ],
      fields: ['Software Engineering & Online Systems', 'Data Analysis & Power BI', 'AI & Machine Learning'],
    },
    {
      id: 'fintech',
      icon: Landmark,
      name: isArabic ? 'المالية والاتصالات' : 'FinTech & Telecom',
      tagline: isArabic ? 'كشف الاحتيال اللحظي، توقع تسرب العملاء، ومراكز الاتصال' : 'Fraud Detection ML, Churn Prediction & SLA BI',
      solutions: isArabic
        ? [
            'بوابات كشف الاحتيال والشذوذ المالي بزمن استجابة أقل من 20 مللي ثانية.',
            'نماذج تعلم آلة لتوقع تسرب عملاء الاتصالات (Churn) مع لوحات Power BI.',
            'تحليل أداء مراكز الاتصال (33K+ مكالمة) ومؤشرات SLA والمشاعر.',
          ]
        : [
            'Sub-20ms real-time fraud & anomaly prediction gateways with Redis feature stores.',
            'Python + Power BI customer churn prediction with account-level drill-through.',
            'Call-center SLA, handle-time & sentiment intelligence dashboards.',
          ],
      fields: ['Data Engineering', 'AI & Machine Learning', 'Data Analysis & Power BI'],
    },
    {
      id: 'healthcare-hr',
      icon: HeartPulse,
      name: isArabic ? 'الصحة والموارد البشرية والتعليم' : 'Healthcare, HR & EdTech',
      tagline: isArabic ? 'نماذج تنبؤ طبية، تحليلات الموظفين، ومنصات تعليمية' : 'Clinical ML, Workforce Analytics & Web Portals',
      solutions: isArabic
        ? [
            'نماذج ذكاء اصطناعي للتشخيص الطبي وتصنيف المخاطر الصحية بدقة عالية.',
            'منصات توظيف ولوحات Power BI لتحليل دوران العمالة والرواتب.',
            'منصات تعليمية وتدريبية حديثة (EdTech) بتجربة مستخدم سريعة.',
          ]
        : [
            'Balanced healthcare ML pipelines (oncology & risk classification) focused on high recall.',
            'Bilingual recruitment portals & Power BI workforce attrition/compensation suites.',
            'Modern full-stack EdTech & training platforms built on Next.js & Supabase.',
          ],
      fields: ['AI & Machine Learning', 'Data Analysis & Power BI', 'Software Engineering & Online Systems'],
    },
    {
      id: 'agencies-b2b',
      icon: Briefcase,
      name: isArabic ? 'الوكالات والشركات والخدمات' : 'Agencies, Real Estate & B2B',
      tagline: isArabic ? 'أنظمة حجز وCRM مخصصة، ووكلاء مبيعات بالذكاء الاصطناعي' : 'Custom CRM, Booking Engines & AI Sales Agents',
      solutions: isArabic
        ? [
            'مواقع ومنصات حجز فوري مع لوحات تحكم CRM وإدارة عملاء متكاملة.',
            'وكيل ذكاء اصطناعي (Company Brain RAG) يرد على العملاء من بيانات شركتك.',
            'أتمتة جلب العملاء B2B وربط واتساب ولينكدإن عبر n8n.',
          ]
        : [
            'High-converting agency & service platforms with accountless booking and admin CRM.',
            'Grounded RAG Company Brain & WhatsApp AI sales agents backed by PostgreSQL.',
            'Automated B2B lead discovery, enrichment & multi-channel publishing via n8n.',
          ],
      fields: ['Software Engineering & Online Systems', 'AI & Machine Learning', 'Data Engineering'],
    },
  ];

  const currentIndustry = INDUSTRIES[activeIndustry];
  const CurrentIcon = currentIndustry.icon;

  return (
    <section
      id="solutions"
      aria-label={isArabic ? 'لماذا حلولنا فعالة ومخصصة لكل القطاعات' : 'Why My Solutions Work Across All Industries'}
      className="w-full max-w-[1280px] mx-auto px-gutter py-16 relative z-10 scroll-mt-24"
    >
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-bold">
              {isArabic
                ? 'حلول مخصصة لجميع القطاعات • ROI ملموس'
                : 'Custom-Engineered Value • Built for Every Industry'}
            </span>
          </div>
          <h2 className="font-nexa text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
            {isArabic
              ? 'لماذا تحقق حلولنا نتائج حقيقية — وكيف نخصصها لقطاعك'
              : 'Why My Solutions Deliver Measurable ROI Across All Industries'}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {isArabic
              ? 'سواء كنت تدير مصنعاً، سلسلة فنادق، متجراً إلكترونياً، أو شركة خدمات — نجمع بين أنظمة ERP، هندسة البيانات، البرمجيات والمواقع، لوحات Power BI، والذكاء الاصطناعي في منظومة واحدة مصممة لعملك.'
              : 'Whether you operate a factory, hotel chain, e-commerce marketplace, or B2B enterprise, I unify ERP Systems, Data Engineering, Software & Online Systems, Power BI Dashboards, and AI/ML into one cohesive architecture built around your business.'}
          </p>
        </div>

        {/* Part 1: Why My Solutions Are Useful (4 Value Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 rounded-3xl bg-surface-container-low/80 dark:bg-surface-container-low/55 backdrop-blur-xl border border-outline-variant/25 dark:border-white/[0.08] shadow-md flex flex-col justify-between gap-4 hover:border-primary/45 transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${pillar.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono font-bold text-on-surface">
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 className="font-nexa text-base font-bold text-on-surface leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Part 2: Customized for All Industries (Interactive Explorer) */}
        <div className="rounded-3xl bg-surface-container-low/80 dark:bg-surface-container-low/55 backdrop-blur-2xl border border-outline-variant/30 dark:border-white/[0.08] shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-outline-variant/20 flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                  {isArabic ? 'تخصيص كامل حسب مجال عملك' : 'Industry-Specific Customization'}
                </span>
                <h3 className="font-nexa text-xl sm:text-2xl font-extrabold text-on-surface mt-1">
                  {isArabic ? 'اختر قطاعك لتعرف كيف نصمم الحل المناسب لك' : 'Select Your Industry to See Your Tailored Stack'}
                </h3>
              </div>
              <span className="text-xs font-mono text-on-surface-variant">
                {isArabic ? '6 قطاعات رئيسية + حلول مخصصة' : '6 Core Sectors • Fully Customizable'}
              </span>
            </div>

            {/* Industry Tabs */}
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind, idx) => {
                const Icon = ind.icon;
                const active = idx === activeIndustry;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setActiveIndustry(idx)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      active
                        ? 'bg-primary text-on-primary border-primary shadow-md'
                        : 'bg-surface-container-lowest/80 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border-outline-variant/25'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{ind.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Industry Detail Stage */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-nexa text-xl sm:text-2xl font-extrabold text-on-surface">
                    {currentIndustry.name}
                  </h4>
                  <p className="text-xs font-mono text-secondary font-semibold">
                    {currentIndustry.tagline}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 pt-1">
                {currentIndustry.solutions.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-on-surface leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-surface-container-lowest/85 border border-outline-variant/25 flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                {isArabic ? 'المجالات المدمجة في هذا الحل' : 'Core Solution Pillars Combined'}
              </span>
              <div className="flex flex-wrap gap-2">
                {currentIndustry.fields.map((field) => (
                  <span
                    key={field}
                    className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold"
                  >
                    {field}
                  </span>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isArabic
                  ? 'كل نظام يتم تصميمه من الصفر أو دمجه مع أنظمتك الحالية بخطة تسليم مرحلية واضحة وضمان استقرار بعد الإطلاق.'
                  : 'Every engagement is custom-scoped around your existing infrastructure with milestone-gated delivery and a 30-day post-launch SLA.'}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-nexa text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'اطلب حلاً مخصصاً لقطاعك' : 'Customize for Your Industry'}</span>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-mono font-semibold border border-outline-variant/25 transition-colors"
                >
                  <span>{isArabic ? 'شاهد نماذج الأعمال' : 'View Case Studies'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
