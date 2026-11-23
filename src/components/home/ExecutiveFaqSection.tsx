'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function ExecutiveFaqSection() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isAr
    ? [
        {
          q: 'لماذا أختار نظام ERP مخصص بدلاً من البرامج الجاهزة مثل SAP أو Odoo؟',
          a: 'البرامج الجاهزة تفرض قوالب جامدة وتكاليف تراخيص سنوية مرتفعة وتحتاج شهوراً من التخصيص. النظام المخصص يُبنى بدقة على مراحل التشغيل الفعلية في مصنعك أو شركتك (مثل قراءة حساسات الـ PLC، حساب السلك الماسي، أو تكامل OPERA PMS) بتكلفة تأسيس أقل وملكية كاملة للكود والبيانات.',
        },
        {
          q: 'هل يتطلب الربط مع الماكينات أو قواعد البيانات القديمة إيقاف العمل؟',
          a: 'لا على الإطلاق. نستخدم معمارية غير تدخلية (Non-Invasive Ingestion & CDC) سواء بقراءة ملفات الـ PLC الأصلية (log.CSV) أو التقاط تغييرات قواعد البيانات دون أي حمل إضافي أو توقف لخطوط الإنتاج أو أنظمة الكاشير والاستقبال.',
        },
        {
          q: 'ما هو العائد المتوقع على الاستثمار (ROI) ومتى يبدأ ظهوره؟',
          a: 'في الأنظمة الصناعية مثل WireCut OS أو أتمتة n8n، يبدأ الوفر المالي منذ الشهر الأول عبر تقليل هدر الخامات (8–15%) واستعادة ساعات التوقف الضائعة (+10–15%) وخفض الأعمال اليدوية حتى 60%، ليحقق النظام عائداً يتراوح بين 8 إلى 20 ضعف التكلفة.',
        },
        {
          q: 'كيف تضمن سرية بيانات الشركة وملكية الشفرة البرمجية (IP & NDA)؟',
          a: 'جميع التعاقدات تشمل اتفاقية عدم إفصاح وسرية بيانات (NDA)، ويتم تسليم 100% من الشفرة البرمجية ومخططات قواعد البيانات في المستودعات الخاصة بمؤسستك، مع صلاحيات RBAC وسجل تدقيق كامل (Audit Log).',
        },
        {
          q: 'هل يمكن البدء بتجربة ميدانية أو تشخيص فني قبل التعاقد الكامل؟',
          a: 'نعم. يمكنك إرسال عينة من بيانات التشغيل للحصول على تقرير تشخيصي خلال 48 ساعة، أو البدء بجلسة استشارية فردية (60 دقيقة) أو تجربة ميدانية لمدة 30 يوماً تُخصم بالكامل من رسوم التأسيس عند التعاقد.',
        },
      ]
    : [
        {
          q: 'Why build a custom ERP instead of licensing SAP or Odoo?',
          a: 'Off-the-shelf ERPs impose rigid workflows, expensive recurring seat licenses, and lengthy customization cycles. A custom modular ERP mirrors your exact physical operations (such as 28-channel PLC telemetry, BOM yields, or OPERA PMS sync) with lower TCO and 100% IP ownership.',
        },
        {
          q: 'Does integrating legacy databases or factory PLCs require downtime?',
          a: 'Zero downtime. We engineer non-invasive Change Data Capture (CDC) pipelines and native PLC log.CSV parsers that stream operational data without locking production tables or interrupting plant shifts.',
        },
        {
          q: 'How fast do clients see measurable ROI?',
          a: 'Most engagements pay back within Month 1–2 by cutting variable waste (8–15% on consumables like diamond wire), recovering 10–15% lost machine uptime, and eliminating up to 60% of manual administrative overhead via n8n and AI agents.',
        },
        {
          q: 'How are source code IP ownership and data confidentiality handled?',
          a: 'Every engagement is governed by a mutual NDA. 100% of source code, database migrations, and documentation are committed directly to your private repositories with role-based access control (RBAC) and full audit trails.',
        },
        {
          q: 'Can we start with a diagnostic audit or paid pilot before a full build?',
          a: 'Yes. You can book a 60-minute architecture review, request a 48-hour operational log diagnostic, or run a 30-day Paid Pilot whose fee is credited in full toward the production deployment.',
        },
      ];

  return (
    <section
      id="faq"
      className="w-full max-w-[1080px] mx-auto px-gutter py-12 relative z-10 scroll-mt-24 content-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-primary" />
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-primary font-bold">
            {isAr ? 'الأسئلة الشائعة لصناع القرار' : 'Executive FAQ'}
          </span>
        </div>
        <h2 className="font-headline-lg text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          {isAr ? 'إجابات واضحة حول التنفيذ، الأمان، والعائد' : 'Clarity on Architecture, Security & ROI'}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-surface-container-low/95 dark:bg-[#151822]/95 border-primary/40 shadow-[0_8px_24px_rgba(0,0,0,0.2)]'
                  : 'bg-surface-container-low/70 dark:bg-[#14161f]/80 border-outline-variant/25 hover:border-primary/30'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-start"
              >
                <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/15">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-7 text-center">
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high/85 hover:bg-primary-container hover:text-on-primary-container text-primary text-xs font-bold uppercase tracking-wider border border-primary/30 transition-all"
        >
          <span>{isAr ? 'لديك سؤال آخر؟ تواصل مباشرة' : 'Have a specific architecture question? Reach out'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
        </Link>
      </div>
    </section>
  );
}
