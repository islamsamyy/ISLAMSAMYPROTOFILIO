// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { Hero3DOrbit } from '@/components/canvas/Hero3DOrbit';
import { ParticleMeshCanvas } from '@/components/canvas/ParticleMeshCanvas';
import { CyberneticGridCanvas } from '@/components/canvas/CyberneticGridCanvas';
import { TiltCard } from '@/components/ui/TiltCard';
import { ScrollRevealSection } from '@/components/animation/ScrollRevealSection';
import { submitContactInquiry } from '@/lib/data-store';
import { useProjects, usePricing } from '@/lib/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { localizePackage } from '@/data/seedPricing';
import { cleanProjectText, getProjectCover, isDiagramAsset } from '@/lib/utils';
import { WhatsAppFloatingButton, WHATSAPP_NUMBER, WHATSAPP_INTERNATIONAL, WHATSAPP_URL, WhatsAppIcon } from '@/components/ui/WhatsAppButton';

const ClientReviewsSection = dynamic(
  () => import('@/components/home/ClientReviewsSection').then((m) => m.ClientReviewsSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-64 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const ExperienceTimelineSection = dynamic(
  () => import('@/components/home/ExperienceTimelineSection').then((m) => m.ExperienceTimelineSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-64 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const CertificationsSection = dynamic(
  () => import('@/components/home/CertificationsSection').then((m) => m.CertificationsSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-48 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const ProjectsSlideshowSection = dynamic(
  () => import('@/components/home/ProjectsSlideshowSection').then((m) => m.ProjectsSlideshowSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-96 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const TechArsenalSection = dynamic(
  () => import('@/components/home/TechArsenalSection').then((m) => m.TechArsenalSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-48 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const IndustrySolutionsSection = dynamic(
  () => import('@/components/home/IndustrySolutionsSection').then((m) => m.IndustrySolutionsSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-72 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const FeaturedProjectsGridSection = dynamic(
  () => import('@/components/home/FeaturedProjectsGridSection').then((m) => m.FeaturedProjectsGridSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-96 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const DeliveryProcessSection = dynamic(
  () => import('@/components/home/DeliveryProcessSection').then((m) => m.DeliveryProcessSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-64 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const LatestInsightsSection = dynamic(
  () => import('@/components/home/LatestInsightsSection').then((m) => m.LatestInsightsSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-64 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const ExecutiveFaqSection = dynamic(
  () => import('@/components/home/ExecutiveFaqSection').then((m) => m.ExecutiveFaqSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-64 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);
const OperationsResearchSection = dynamic(
  () => import('@/components/home/OperationsResearchSection').then((m) => m.OperationsResearchSection),
  { ssr: false, loading: () => <div className="py-12 max-w-7xl mx-auto px-4"><div className="h-96 rounded-2xl bg-surface-container/30 animate-pulse" /></div> }
);

export default function PortfolioHomePage() {
  const { t, language } = useLanguage();
  const { projects } = useProjects();
  const { packages } = usePricing();
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqCompany, setInqCompany] = useState('');
  const [inqFocus, setInqFocus] = useState('power-bi');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSending, setInqSending] = useState(false);
  const [inqSent, setInqSent] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'milestone' | 'retainer'>('milestone');
  const [featuredSlide, setFeaturedSlide] = useState(0);
  const [featuredPaused, setFeaturedPaused] = useState(false);

  const featuredProjects = React.useMemo(() => {
    const list = projects.filter((p) => p.featured);
    return list.length > 0 ? list : projects;
  }, [projects]);

  const featuredPageCount = Math.max(1, Math.ceil(featuredProjects.length / 2));

  useEffect(() => {
    if (featuredPageCount <= 1 || featuredPaused) return;
    const timer = setInterval(() => {
      setFeaturedSlide((prev) => (prev + 1) % featuredPageCount);
    }, 6500);
    return () => clearInterval(timer);
  }, [featuredPageCount, featuredPaused]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName.trim() || !inqEmail.trim() || !inqMessage.trim()) return;
    setInqSending(true);
    try {
      await submitContactInquiry({
        name: inqName,
        email: inqEmail,
        company: inqCompany,
        focus: inqFocus,
        message: inqMessage
      });
      setInqSent(true);
      setInqName('');
      setInqEmail('');
      setInqCompany('');
      setInqMessage('');
    } catch (err) {
      console.error('Contact inquiry error:', err);
    } finally {
      setInqSending(false);
    }
  };

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <SiteHeader />
      <main id="main-content" className="w-full pt-20 bg-transparent flex-1">
        <div className="flex flex-col w-full relative overflow-hidden bg-transparent text-on-surface">
{/*  Ambient Background Glows Layer (Hardware Accelerated Subtle Neutral Gradients)  */}
<div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
  <div id="mouse-ambient-glow" className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 opacity-50 z-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.035)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" style={{"left":"50%","top":"20%"}}></div>
  <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[1000px] h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)] opacity-75"></div>
  <div className="absolute top-[1800px] right-[-200px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(30,138,76,0.04)_0%,_transparent_70%)] opacity-60"></div>
  <div className="absolute top-[3600px] left-[-200px] w-[850px] h-[850px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.025)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.025)_0%,_transparent_70%)] opacity-50"></div>
  <div className="absolute top-[5200px] right-[10%] w-[900px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(30,138,76,0.035)_0%,_transparent_70%)] opacity-40"></div>
</div>
{/*  SECTION 1: HERO SECTION - EXECUTIVE 3D COMMAND CENTER  */}
<section className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 flex flex-col items-center text-center">
{/*  Main Headline  */}
<motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
  className="max-w-4xl mx-auto mb-2"
>
  <h1 className="font-display-xl text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
    {t('hero.headlineStart', 'Custom ERP Systems, AI Agents & Data Engineering.')} <span className="bg-gradient-to-r from-primary via-secondary to-tertiary-fixed bg-clip-text text-transparent">{t('hero.headlineGradient', 'Built to Scale Business Revenue.')}</span>
  </h1>
  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto mt-1 leading-relaxed">
    {t('hero.subtitle', 'Data Engineer & ERP Systems Architect engineering custom resource management platforms for factories and institutions with Operations Research and guaranteed ROI.')}
  </p>
</motion.div>
{/*  Hero CTAs  */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
  className="flex flex-wrap items-center justify-center gap-3 mb-5"
>
  <a className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-headline-sm text-xs uppercase tracking-wider shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95" href="#projects">
    <span className="material-symbols-outlined text-[18px]">analytics</span>
    <span>{t('hero.ctaProjects', 'Explore Real Projects')}</span>
  </a>
  <a className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-headline-sm text-xs uppercase tracking-wider shadow-sm border border-outline-variant transition-all duration-300 hover:scale-105 active:scale-95" href="#contact">
    <span className="material-symbols-outlined text-[18px]">handshake</span>
    <span>{t('hero.ctaCollaborate', "Let's Collaborate")}</span>
  </a>
  <a
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 hover:text-white border border-emerald-600/30 dark:border-emerald-500/40 shadow-sm font-headline-sm text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <WhatsAppIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white" />
    <span>{t('hero.ctaWhatsApp', 'WhatsApp:')} {WHATSAPP_NUMBER}</span>
  </a>
  <a className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface border border-outline-variant/30 font-label-md text-xs transition-all duration-300 hover:scale-105 active:scale-95" href="https://www.linkedin.com/in/islam-samy-3b72061a9/" rel="noopener noreferrer" target="_blank">
    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
    <span>{t('hero.ctaLinkedIn', 'LinkedIn Profile')}</span>
  </a>
</motion.div>
{/*  Integrated Executive Portrait & Orbit Core  */}
<div className="relative w-full max-w-6xl mx-auto px-2">
  <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
    {/*  Left 3 Telemetry Metrics  */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-3 flex flex-col gap-3.5 text-left order-2 lg:order-1 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto"
    >
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container/95 border border-primary/20 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">{t('hero.card1Category', '01 • CUSTOM ERP SYSTEMS')}</span>
            <span className="w-2 h-2 rounded-full bg-primary"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{t('hero.card1Title', 'Custom ERP Architecture')}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('hero.card1Desc', 'Engineered modular ERPs integrating inventory, financial ledgers, and OPERA PMS with zero downtime.')}</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container/95 border border-secondary/20 hover:border-secondary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">{t('hero.card2Category', '02 • WORKFLOW AUTOMATION')}</span>
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">{t('hero.card2Title', '60% Cost Reduction')}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('hero.card2Desc', 'Eliminated manual operational overhead through event-driven n8n orchestrations and automated ETL.')}</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container/95 border border-tertiary/20 hover:border-tertiary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-semibold">{t('hero.card3Category', '03 • AUTONOMOUS AI AGENTS')}</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">{t('hero.card3Title', 'Multi-Agent AI Workflows')}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('hero.card3Desc', 'Autonomous LLM agent networks (LangChain, CrewAI) executing real-time data analysis and routing.')}</p>
        </div>
      </TiltCard>
    </motion.div>
    {/*  Central Orbit with Islam Samy's Verified Portrait  */}
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 my-2 lg:my-0"
    >
      {/*  3D Orbit & Portrait Concentric Anchor: mathematically dead-centered on portrait  */}
      <div className="relative flex items-center justify-center">
        {/* Dynamic Background Halo Glow (Hardware-accelerated subtle radial gradient) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.04)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none -z-10" />

        {/* 3D Interactive Gyroscopic Canvas - 100% Dead-Centered on Portrait */}
        <Hero3DOrbit
          size={500}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        />

        {/* Telemetry Vector Beams & Rings SVG - 100% Dead-Centered on Portrait */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[440px] pointer-events-none z-0">
          <svg className="w-full h-full" fill="none" viewBox="0 0 520 440">
            <circle cx="260" cy="220" r="190" stroke="currentColor" className="text-on-surface/20" strokeDasharray="4 6" strokeWidth="1.5" />
            <circle cx="260" cy="220" r="145" stroke="currentColor" className="text-secondary/35" strokeWidth="1.2" />
            <path d="M 40 90 C 130 110, 170 170, 210 200" stroke="currentColor" className="text-on-surface/25" strokeWidth="1.5" />
            <path d="M 30 220 C 110 220, 150 220, 200 220" stroke="currentColor" className="text-secondary/45" strokeWidth="1.5" />
            <path d="M 40 350 C 130 330, 170 270, 210 240" stroke="currentColor" className="text-on-surface/25" strokeWidth="1.5" />
            <path d="M 480 90 C 390 110, 350 170, 310 200" stroke="currentColor" className="text-secondary/35" strokeWidth="1.5" />
            <path d="M 490 220 C 410 220, 370 220, 320 220" stroke="currentColor" className="text-on-surface/35" strokeWidth="1.5" />
            <path d="M 480 350 C 390 330, 350 270, 310 240" stroke="currentColor" className="text-on-surface/25" strokeWidth="1.5" />
            <circle className="animate-pulse text-on-surface/60" cx="150" cy="130" fill="currentColor" r="4.5" />
            <circle className="animate-pulse text-secondary" cx="370" cy="135" fill="currentColor" r="4.5" />
            <circle className="animate-pulse text-on-surface/50" cx="380" cy="305" fill="currentColor" r="4" />
            <circle className="animate-pulse text-secondary/80" cx="140" cy="300" fill="currentColor" r="4" />
          </svg>
        </div>

        {/* Islam Samy Portrait Card with Clean Vercel Border */}
        <div className="relative z-10 p-1 rounded-3xl bg-outline-variant dark:bg-[#262626] shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-2xl transition-all duration-500">
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[22px] overflow-hidden bg-surface-container-lowest flex items-center justify-center group">
            <img alt="Islam Samy - Data Engineer &amp; ERP Systems Architect" className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500" src="/images/islam-samy-portrait.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-surface-container-lowest/95 border border-white/15 shadow-sm flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="font-headline-sm text-body-sm font-bold text-on-surface">{t('header.name', 'Islam Samy')}</span>
                <span className="font-label-sm text-[10px] text-secondary uppercase font-semibold">{t('hero.portraitRole', 'Data Engineer & ERP Systems Architect')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container-high/80 border border-secondary/30">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="text-[10px] font-label-sm text-secondary font-bold">{t('hero.onlineBadge', 'ONLINE')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Status Sub-Badge */}
      <div className="mt-4 flex items-center gap-2 relative z-10">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{t('hero.pipelineStatus', 'Autonomous ERP & AI Intelligence Pipeline')}</span>
      </div>
    </motion.div>
    {/*  Right 3 Execution Capabilities  */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-3 flex flex-col gap-3.5 text-left order-3 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto"
    >
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container/95 border border-secondary/20 hover:border-secondary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">{t('hero.card4Category', '04 • DATA ANALYSIS & BI')}</span>
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">{t('hero.card4Title', 'Sub-Second Executive BI')}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('hero.card4Desc', 'High-speed analytical lakehouses & Power BI suites delivering real-time telemetry across revenue channels.')}</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container/95 border border-tertiary/20 hover:border-tertiary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-semibold">{t('hero.card5Category', '05 • FULL-STACK WEB DEV')}</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">{t('hero.card5Title', 'Modern Web Platforms')}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('hero.card5Desc', 'Production Next.js 15 & React architectures with sub-250ms p99 response times and resilient distributed APIs.')}</p>
        </div>
      </TiltCard>
      <TiltCard maxTilt={6} depth={10} glare={true} className="rounded-xl">
        <div className="group relative p-space-md rounded-xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 hover:bg-surface-container/95 border border-primary/20 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">{t('hero.card6Category', '06 • DATA PIPELINE SCALE')}</span>
            <span className="w-2 h-2 rounded-full bg-primary"></span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{t('hero.card6Title', '1.4M msg/sec Streaming')}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('hero.card6Desc', 'High-throughput CDC streaming using Kafka & ClickHouse, delivering 95%+ predictive modeling accuracy.')}</p>
        </div>
      </TiltCard>
    </motion.div>
  </div>
</div>
</section>

{/*  SECTION 2: CREDIBILITY STRIP  */}
<ScrollRevealSection className="w-full relative z-10 bg-surface-container-lowest/40 backdrop-blur-md py-6 border-y border-white/[0.06]">
<div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-primary/10">
<span className="material-symbols-outlined text-primary text-[28px]">hub</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('credibility.erpTitle', 'ERP Architecture')}</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">{t('credibility.erpDesc', 'Custom ERP Systems & OPERA PMS')}</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-secondary/10">
<span className="material-symbols-outlined text-secondary text-[28px]">smart_toy</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('credibility.aiTitle', 'AI Agents & ML')}</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">{t('credibility.aiDesc', 'Multi-Agent Systems & RAG Chains')}</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-tertiary/10">
<span className="material-symbols-outlined text-tertiary text-[28px]">alt_route</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('credibility.autoTitle', 'Automations & ETL')}</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">{t('credibility.autoDesc', 'n8n Orchestration & Webhook Flows')}</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container/40 border border-primary/10">
<span className="material-symbols-outlined text-primary text-[28px]">terminal</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{t('credibility.dataTitle', 'Data & Web Dev')}</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">{t('credibility.dataDesc', 'Power BI Lakehouses & Next.js 15')}</span>
</div>
</div>
</div>
</ScrollRevealSection>

{/* EXECUTIVE QUICK-JUMP NAVIGATION STRIP */}
<nav
  aria-label="Homepage sections"
  className="relative z-10 w-full max-w-[1280px] mx-auto px-gutter pt-2 pb-4 flex items-center justify-center"
>
  <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-surface-container-low/80 dark:bg-surface-container-low/55 backdrop-blur-xl border border-outline-variant/25 dark:border-white/[0.08] overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-sm">
    {[
      { href: '#certifications', label: language === 'ar' ? 'الشهادات والاعتمادات' : 'Certifications' },
      { href: '#projects', label: language === 'ar' ? 'المشاريع' : 'Projects' },
      { href: '#pricing', label: language === 'ar' ? 'الباقات والأسعار' : 'Pricing & Packages' },
      { href: '#operations-research', label: language === 'ar' ? 'بحوث العمليات وضمان العائد' : 'Operations Research & ROI' },
      { href: '#solutions', label: language === 'ar' ? 'الحلول والقطاعات' : 'Industry Solutions' },
      { href: '#process', label: language === 'ar' ? 'منهجية التنفيذ' : 'Delivery Process' },
      { href: '#insights', label: language === 'ar' ? 'المدونة الهندسية' : 'Blog & Proposals' },
      { href: '#faq', label: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' },
      { href: '#contact', label: language === 'ar' ? 'تواصل مباشر' : 'Direct Contact' },
    ].map((item) =>
      item.isLink ? (
        <Link
          key={item.href}
          href={item.href}
          className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold text-on-surface-variant hover:text-on-primary-container hover:bg-primary-container/80 whitespace-nowrap transition-colors"
        >
          {item.label}
        </Link>
      ) : (
        <a
          key={item.href}
          href={item.href}
          className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold text-on-surface-variant hover:text-on-primary-container hover:bg-primary-container/80 whitespace-nowrap transition-colors"
        >
          {item.label}
        </a>
      )
    )}
  </div>
</nav>

{/* CERTIFICATIONS & VERIFIED CREDENTIALS */}
<CertificationsSection />

{/* INTERACTIVE PROJECT CARDS GRID WITH IMPORTANCE ARRANGEMENT */}
<div id="projects" className="scroll-mt-24">
  <FeaturedProjectsGridSection />
</div>

{/* PRICING & ADVISORY PACKAGES */}
<ScrollRevealSection className="w-full max-w-[1280px] mx-auto px-gutter py-12 relative z-10 content-auto" id="pricing" suppressHydrationWarning>
  <div className="text-center max-w-3xl mx-auto mb-12">
    <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low border border-outline-variant shadow-sm mb-space-sm backdrop-blur-md">
      <span className="w-2 h-2 rounded-full bg-secondary"></span>
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">{t('pricing.badge', 'Enterprise Engagement & Advisory')}</span>
    </div>
    <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-4 tracking-tight">{t('pricing.title', 'Custom ERP, AI Automation & Data Engineering Sprints.')}</h2>
    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{t('pricing.subtitle', 'Turnkey architecture sprints and dedicated advisory engagements tailored for scaling enterprises, hospitality brands, and modern platforms.')}</p>
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="inline-flex items-center p-1 rounded-full bg-surface-container-high border border-outline-variant backdrop-blur-md shadow-sm">
        <button
          type="button"
          id="pricing-tab-milestone"
          onClick={() => setBillingCycle('milestone')}
          className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${
            billingCycle === 'milestone'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
        >
          {t('pricing.tabMilestone', 'Project-Based / Milestones')}
        </button>
        <button
          type="button"
          id="pricing-tab-retainer"
          onClick={() => setBillingCycle('retainer')}
          className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${
            billingCycle === 'retainer'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
        >
          {t('pricing.tabRetainer', 'Dedicated Advisory / Monthly Retainer')}
        </button>
      </div>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-secondary text-xs font-mono font-semibold border border-secondary/30 transition-all shadow-sm hover:scale-105"
      >
        <span>{t('pricing.viewFullPricing', 'View Full Dedicated Pricing & Consultation Rates Page')}</span>
        <span className="material-symbols-outlined text-sm rtl-flip">arrow_forward</span>
      </Link>
    </div>
  </div>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12" suppressHydrationWarning>
    {packages.map((rawPkg, idx) => {
      const isAr = language === 'ar';
      const pkg = localizePackage(rawPkg, isAr);
      const isPopular = pkg.isPopular;
      const displayPrice = billingCycle === 'milestone'
        ? pkg.price
        : `$${Math.round(parseInt(pkg.price.replace(/[^0-9]/g, '') || '5000', 10) * 0.9).toLocaleString()}`;
      const displayFreq = billingCycle === 'milestone'
        ? pkg.frequency
        : (isAr ? '/ شهرياً (عقد مستمر)' : '/ month (retained)');
      const borderCls = isPopular
        ? 'border-2 border-primary/70 shadow-md dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] bg-surface-container-low/95 dark:bg-[#111111]/95'
        : idx === 0
        ? 'border border-outline-variant hover:border-outline shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-surface-container-low/90 dark:bg-[#0a0a0a]/95'
        : 'border border-outline-variant hover:border-outline shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-surface-container-low/90 dark:bg-[#0a0a0a]/95';

      return (
        <div key={pkg.id} className={`relative p-space-lg rounded-2xl transition-all duration-300 flex flex-col justify-between group ${borderCls}`} suppressHydrationWarning>
          {isPopular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
              {t('pricing.mostRequested', 'Most Requested • Enterprise')}
            </div>
          )}
          <div className={`flex flex-col ${isPopular ? 'pt-2' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] uppercase font-semibold border border-primary/20">
                {pkg.badge || (isAr ? 'باقة متخصصة' : 'Targeted Sprint')}
              </span>
              <span className="material-symbols-outlined text-primary text-[22px]">
                {isPopular ? 'all_inclusive' : idx === 0 ? 'speed' : 'military_tech'}
              </span>
            </div>
            <h3 suppressHydrationWarning className="font-headline-sm text-headline-sm text-on-surface mb-2">{pkg.name}</h3>
            <p suppressHydrationWarning className="font-body-sm text-body-sm text-on-surface-variant mb-6 min-h-[48px]">
              {pkg.headline}
            </p>
            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-surface-container-high/60" suppressHydrationWarning>
              <span
                suppressHydrationWarning
                className={`font-display-xl text-[40px] font-bold leading-none price-display ${isPopular ? 'bg-gradient-to-r from-primary via-secondary to-tertiary-fixed bg-clip-text text-transparent' : 'text-on-surface'}`}
              >
                {displayPrice}
              </span>
              <span suppressHydrationWarning className="font-label-sm text-label-sm text-on-surface-variant uppercase frequency-label">
                {displayFreq}
              </span>
            </div>
            <div className="space-y-3 mb-8" suppressHydrationWarning>
              <div className="font-label-sm text-[11px] uppercase text-primary font-bold tracking-wider mb-2">
                {t('pricing.deliverablesIncluded', 'Deliverables Included:')}
              </div>
              {pkg.deliverables.map((deliv, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href={`/book?package=${pkg.id}`}
              className={`w-full py-3 px-4 rounded-xl text-center transition-all duration-300 font-label-md text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 ${
                isPopular
                  ? 'bg-primary text-on-primary shadow-sm hover:shadow-md hover:bg-primary/90'
                  : 'bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-on-surface hover:text-primary'
              }`}
            >
              <span>{isPopular ? t('pricing.deployCta', 'Deploy Enterprise Architecture') : `${t('pricing.bookCta', 'Book')} ${pkg.name}`}</span>
              <span className="material-symbols-outlined text-sm rtl-flip">arrow_forward</span>
            </Link>
            <a
              href="#contact"
              onClick={() => {
                const sel = document.querySelector('#project-form select') as HTMLSelectElement | null;
                if (sel) sel.value = isPopular ? 'ml-models' : idx === 0 ? 'power-bi' : 'advisory';
              }}
              className="w-full py-1.5 text-center text-[11px] font-mono text-on-surface-variant hover:text-secondary transition-colors"
            >
              {t('pricing.sendCustomMsg', 'Or send custom message ↓')}
            </a>
          </div>
        </div>
      );
    })}
  </div>
  <div className="p-space-md sm:p-space-lg rounded-2xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 border border-surface-container-high/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-around gap-6 text-on-surface-variant font-label-sm text-label-sm">
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px]">verified_user</span><span className="text-on-surface font-semibold">{t('pricing.guarantee1', '100% Milestone-Gated Delivery')}</span></div>
    <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest hidden sm:block"></div>
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">tune</span><span className="text-on-surface font-semibold">{t('pricing.guarantee2', 'Fixed-Scope or Flexible T&M')}</span></div>
    <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest hidden sm:block"></div>
    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-[20px]">lock</span><span className="text-on-surface font-semibold">{t('pricing.guarantee3', 'Enterprise Non-Disclosure Agreement (NDA) Guaranteed')}</span></div>
  </div>
</ScrollRevealSection>

{/* OPERATIONS RESEARCH & GUARANTEED ROI FOUNDATION */}
<OperationsResearchSection />

{/* WHY MY SOLUTIONS WORK & CUSTOMIZED FOR ALL INDUSTRIES */}
<IndustrySolutionsSection />

{/* 4-PHASE ENGINEERING DELIVERY & 48-HOUR DIAGNOSTIC */}
<DeliveryProcessSection />

{/* PROFESSIONAL EXPERIENCE (Compact 2-Column Grid) */}
<ExperienceTimelineSection />

      {/* CLIENT REVIEWS SECTION */}
      <ClientReviewsSection />

      {/* LATEST ENGINEERING BLOG & PROPOSALS */}
      <LatestInsightsSection />

      {/* EXECUTIVE FAQ & TECHNICAL READINESS */}
      <ExecutiveFaqSection />

      {/* Cybernetic Grid Horizon Transition */}
      <div className="w-full relative overflow-hidden -my-10 pointer-events-none flex justify-center">
        <CyberneticGridCanvas className="w-full max-w-[1280px] h-48 opacity-40 dark:opacity-30" />
      </div>

      <ScrollRevealSection className="w-full max-w-[1280px] mx-auto px-gutter py-12 relative z-10 content-auto" id="contact">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
{/*  Islam Samy Direct Contact Info  */}
<div className="lg:col-span-5 flex flex-col justify-between">
<div>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase mb-4 border border-primary/20">
<span className="material-symbols-outlined text-[14px]">send</span>
<span className="">{t('contact.badge', 'Direct Communications')}</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-4">
  {t('contact.title', "Let's Build Scalable Systems Together.")}
</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">
  {t('contact.subtitle', 'Available for high-impact Custom ERP Systems, Autonomous AI Agents, Workflow Automation, Lakehouse Architecture, and Full-Stack Web Development across Egypt, the GCC, and international markets.')}
</p>
{/*  Verified Direct Contact Info Cards  */}
<div className="space-y-4">
<a
  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/35 hover:border-emerald-500/60 shadow-sm transition-all hover:scale-[1.01]"
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
      <WhatsAppIcon className="w-5 h-5" />
    </div>
    <div>
      <span className="font-label-sm text-[11px] text-emerald-400 uppercase font-bold flex items-center gap-1.5">
        <span>{t('contact.whatsappCardTitle', 'Instant WhatsApp Chat')}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </span>
      <span className="font-body-sm text-body-sm text-on-surface font-semibold">{WHATSAPP_NUMBER} ({WHATSAPP_INTERNATIONAL})</span>
    </div>
  </div>
  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-nexa text-[11px] font-bold uppercase tracking-wider shadow-sm shrink-0">
    {t('contact.chatNow', 'Chat Now')}
  </span>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-colors" href="mailto:islamsamy410@gmail.com">
<div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[20px]">mail</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">{t('contact.emailTitle', 'Direct Email')}</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">islamsamy410@gmail.com</span>
</div>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5 hover:border-secondary/40 transition-colors" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
<div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[20px]">phone</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">{t('contact.phoneTitle', 'Phone / WhatsApp (Direct)')}</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">{WHATSAPP_NUMBER}</span>
</div>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-colors" href="https://www.linkedin.com/in/islam-samy-3b72061a9/" rel="noopener noreferrer" target="_blank">
<div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[20px]">link</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">{t('contact.linkedinTitle', 'LinkedIn')}</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">linkedin.com/in/islam-samy-3b72061a9/</span>
</div>
</a>
<div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5">
<div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[20px]">location_on</span>
</div>
<div>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase block">{t('contact.locationTitle', 'Location & Languages')}</span>
<span className="font-body-sm text-body-sm text-on-surface font-semibold">{t('contact.locationDesc', 'Cairo, Egypt • Arabic (Native) | English (Proficient B2)')}</span>
</div>
</div>
</div>
</div>
<div className="pt-8 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="">{t('contact.confidentialityNote', 'Guaranteed confidential response within 24 hours.')}</span>
</div>
</div>
{/*  Interactive Project Inquiry Form  */}
<div className="lg:col-span-7">
<form onSubmit={handleInquirySubmit} className="p-space-lg sm:p-space-xl rounded-2xl bg-surface-container-low/90 dark:bg-[#0a0a0a]/95 border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col gap-5" id="project-form">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/*  Name Input  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">{t('contact.formName', 'Your Name *')}</label>
<input value={inqName} onChange={(e) => setInqName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('contact.formNamePlaceholder', 'e.g. Omar Mansour')} required type="text" />
</div>
{/*  Email Input  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">{t('contact.formEmail', 'Work Email *')}</label>
<input value={inqEmail} onChange={(e) => setInqEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('contact.formEmailPlaceholder', 'omar@company.com')} required type="email" />
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/*  Company / Project Name  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">{t('contact.formCompany', 'Company / Venture')}</label>
<input value={inqCompany} onChange={(e) => setInqCompany(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('contact.formCompanyPlaceholder', 'e.g. Nexa Hospitality Group')} type="text" />
</div>
{/*  Project Type Selection  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">{t('contact.formFocus', 'Engagement Focus *')}</label>
<select value={inqFocus} onChange={(e) => setInqFocus(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary" required>
<option value="custom-erp">{t('contact.formFocusErp', 'Custom ERP System Architecture & Development')}</option>
<option value="ai-agents">{t('contact.formFocusAi', 'Autonomous AI Agents & Intelligent Workflows')}</option>
<option value="n8n-automation">{t('contact.formFocusAutomation', 'n8n & Python Workflow Automation (Cost Reduction)')}</option>
<option value="data-engineering">{t('contact.formFocusData', 'Data Lakehouse & Distributed Pipelines (ClickHouse/Kafka)')}</option>
<option value="power-bi">{t('contact.formFocusBi', 'Executive BI & Operations Telemetry (Power BI)')}</option>
<option value="web-development">{t('contact.formFocusWeb', 'Full-Stack Web Application (Next.js 15 / React / Node)')}</option>
<option value="advisory">{t('contact.formFocusAdvisory', 'Fractional Technical Architecture & Advisory')}</option>
</select>
</div>
</div>
{/*  Message Input  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface uppercase">{t('contact.formMessage', 'Project Objectives & Requirements *')}</label>
<textarea value={inqMessage} onChange={(e) => setInqMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('contact.formMessagePlaceholder', 'Describe your data sources, expected metrics, target timelines, or existing operational bottlenecks...')} required rows={4}></textarea>
</div>
{/*  Submit Button  */}
<button disabled={inqSending} className="w-full mt-2 py-4 rounded-xl bg-primary text-on-primary font-headline-sm text-label-md uppercase tracking-wider shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50" type="submit">
<span className="material-symbols-outlined text-[20px]">send</span>
<span>{inqSending ? t('contact.formSending', 'Transmitting to Supabase...') : t('contact.formSubmit', 'Send Message to Islam Samy')}</span>
</button>
{inqSent && (
  <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-label-sm text-label-sm text-center">
    {t('contact.formSuccess', "Inquiry transmitted to Islam's executive pipeline! A confirmation has been logged and Islam will respond within 24 hours.")}
  </div>
)}
</form>
</div>
</div>
</ScrollRevealSection>
</div>
      </main>
      <WhatsAppFloatingButton />
      <SiteFooter />
    </div>
  );
}
