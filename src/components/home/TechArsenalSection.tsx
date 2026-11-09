'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export interface TechArsenalItem {
  id: string;
  name: string;
  category: 'prog-data' | 'ml-ai' | 'frontend' | 'backend' | 'databases' | 'bi-viz' | 'automation';
  categories: string;
  level: string;
  badge: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary';
  description: string;
  proficiency: number;
  icon: string;
  projectName: string;
  credentialName: string;
}

export const techArsenalData: TechArsenalItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'prog-data',
    categories: 'prog-data ml-ai',
    level: 'Advanced • 4+ Yrs',
    badge: 'Core',
    badgeColor: 'primary',
    description: 'Core language for ML algorithms, ETL architecture, statistical computing, and predictive models.',
    proficiency: 96,
    icon: 'code',
    projectName: 'Enterprise Sales Predictor',
    credentialName: 'DataCamp: Associate Data Scientist',
  },
  {
    id: 'mysql',
    name: 'MySQL & SQL',
    category: 'databases',
    categories: 'prog-data backend databases',
    level: 'Advanced • Star Schemas',
    badge: 'Relational',
    badgeColor: 'secondary',
    description: 'High-volume query optimization, indexing, complex analytical joins, and relational schema modeling.',
    proficiency: 94,
    icon: 'database',
    projectName: 'Sotex Operations Hub',
    credentialName: 'DataCamp: Associate Data Analyst',
  },
  {
    id: 'powerbi',
    name: 'Power BI & DAX',
    category: 'bi-viz',
    categories: 'bi-viz',
    level: 'Expert • Real-time Sync',
    badge: 'Executive',
    badgeColor: 'tertiary',
    description: 'Interactive executive telemetry, DAX measures, automated gateway refreshes, and enterprise reports.',
    proficiency: 95,
    icon: 'query_stats',
    projectName: 'Safir Hotels Live Cockpit',
    credentialName: 'Cisco: Data Analytics Essentials',
  },
  {
    id: 'xgboost',
    name: 'XGBoost & Sklearn',
    category: 'ml-ai',
    categories: 'ml-ai prog-data',
    level: 'Advanced • 95% Acc',
    badge: 'Ensembles',
    badgeColor: 'primary',
    description: 'Gradient boosting, feature engineering, classification trees, hyperparameter tuning & validation.',
    proficiency: 92,
    icon: 'neurology',
    projectName: 'Breast Cancer Diagnostic',
    credentialName: 'DataCamp: ML Scientist Track',
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow & Keras',
    category: 'ml-ai',
    categories: 'ml-ai prog-data',
    level: 'Intermediate • Deep Nets',
    badge: 'Deep Learning',
    badgeColor: 'secondary',
    description: 'Neural network architectures, multi-layer perceptrons, forward/backprop tuning & sequential pipelines.',
    proficiency: 88,
    icon: 'psychology',
    projectName: 'Nexalytix AI Deep Classifier',
    credentialName: 'MaharaTech ITI: Deep Learning',
  },
  {
    id: 'tailwind',
    name: 'Tailwind & Modern UI',
    category: 'frontend',
    categories: 'frontend',
    level: 'Proficient • Sub-2s Latency',
    badge: 'Frontend',
    badgeColor: 'primary',
    description: 'Component architecture, dark-mode design systems, responsive UX layouts, and high-speed DOM rendering.',
    proficiency: 90,
    icon: 'web',
    projectName: 'Sotex Factory Web Platform',
    credentialName: 'BIS Degree: Software Engineering',
  },
  {
    id: 'nodejs',
    name: 'Node.js & REST APIs',
    category: 'backend',
    categories: 'backend prog-data',
    level: 'Proficient • Microservices',
    badge: 'Backend',
    badgeColor: 'secondary',
    description: 'API microservices, webhook dispatchers, asynchronous queues, and database connector architecture.',
    proficiency: 89,
    icon: 'dns',
    projectName: 'Nexalytix API Integration',
    credentialName: 'IBM: Data Fundamentals',
  },
  {
    id: 'pyspark',
    name: 'PySpark & Big Data',
    category: 'prog-data',
    categories: 'prog-data databases',
    level: 'Intermediate • Distributed',
    badge: 'Big Data',
    badgeColor: 'tertiary',
    description: 'Distributed dataframe execution, cluster-scale data transformations, and large partition optimizations.',
    proficiency: 85,
    icon: 'dataset',
    projectName: "Master's Research Analytics",
    credentialName: 'DataCamp: Big Data with PySpark',
  },
  {
    id: 'n8n',
    name: 'n8n Automation',
    category: 'automation',
    categories: 'automation backend',
    level: 'Advanced • 60% Cost Cut',
    badge: 'Orchestration',
    badgeColor: 'primary',
    description: 'Self-hosted autonomous event pipelines, webhook triggers, multi-system synchronization & error recovery.',
    proficiency: 91,
    icon: 'hub',
    projectName: 'Enterprise n8n Task Flow',
    credentialName: 'Nexalytix Architecture Certified',
  },
  {
    id: 'tableau',
    name: 'Tableau Suites',
    category: 'bi-viz',
    categories: 'bi-viz',
    level: 'Proficient • Visual BI',
    badge: 'Exploratory',
    badgeColor: 'secondary',
    description: 'Story-driven dashboards, calculated fields, visual drill-downs, and client-facing analytical presentations.',
    proficiency: 88,
    icon: 'bar_chart',
    projectName: 'Corporate Telemetry Suites',
    credentialName: 'DataCamp: BI Visualizations',
  },
  {
    id: 'opera',
    name: 'OPERA PMS & ERP',
    category: 'databases',
    categories: 'databases bi-viz backend',
    level: 'Domain Specialist',
    badge: 'Enterprise',
    badgeColor: 'tertiary',
    description: 'Real-time hospitality reservation streams, guest telemetry, 200+ daily booking tracking, and latency reduction.',
    proficiency: 93,
    icon: 'hotel',
    projectName: 'Safir Hotels Live Operations',
    credentialName: 'Safir Operations Experience',
  },
  {
    id: 'ga4',
    name: 'GA4 & Marketing Ops',
    category: 'automation',
    categories: 'automation bi-viz',
    level: 'Certified Strategy',
    badge: 'Growth',
    badgeColor: 'primary',
    description: 'Custom event tracking, conversion funnel modeling, attribution pipelines, and ad spend optimization.',
    proficiency: 87,
    icon: 'ads_click',
    projectName: 'Sotex Conversion Architecture',
    credentialName: 'Google Analytics Academy & egFWD',
  },
];

export function TechArsenalSection() {
  const [filter, setFilter] = useState<string>('all');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = techArsenalData.filter((t) => {
    if (filter === 'all') return true;
    return t.categories.includes(filter);
  });

  // Ensure sufficient duplicate items for seamless continuous looping
  const displayItems =
    filtered.length < 5
      ? [...filtered, ...filtered, ...filtered, ...filtered]
      : [...filtered, ...filtered];

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 scroll-mt-24 content-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-primary/40 shadow-[0_0_24px_rgba(208,188,255,0.3)] mb-4 backdrop-blur-xl">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
            Technical Arsenal &amp; Capabilities
          </span>
        </div>
        <h2 className="font-nexa text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight">
          The Technology Behind My Solutions
        </h2>
        <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
          Interactive production stack matrix deployed across high-precision machine learning, data engineering pipelines, full-stack web platforms, and executive telemetry.
        </p>
      </div>

      {/* Live Architecture Telemetry Stream Box */}
      <div className="w-full max-w-5xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden group">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-container-high/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]" />
            <span className="font-label-sm text-[10px] sm:text-[11px] text-secondary uppercase font-semibold tracking-wider">
              LIVE ARCHITECTURE STREAM: Ingestion &rarr; Spark Lakehouse &rarr; ML Inference &rarr; BI Cockpit
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] font-label-sm">
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-primary/20 text-primary">
              Pipeline: Online
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-secondary/20 text-secondary">
              Latency: 12ms
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-tertiary/20 text-tertiary">
              1.4M msg/sec
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden my-3">
          <canvas
            id="safir-telemetry-canvas"
            className="w-full h-[180px] sm:h-[220px] bg-transparent my-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-surface-container-high/40 text-center font-label-sm text-[11px]">
          <div className="p-1.5 rounded-lg bg-surface-container/40 border border-secondary/20 text-secondary font-medium">
            Stage 01 // Ingestion
          </div>
          <div className="p-1.5 rounded-lg bg-surface-container/40 border border-primary/20 text-primary font-medium">
            Stage 02 // ETL &amp; Spark
          </div>
          <div className="p-1.5 rounded-lg bg-surface-container/40 border border-primary/20 text-primary font-medium">
            Stage 03 // Neural &amp; Ensembles
          </div>
          <div className="p-1.5 rounded-lg bg-surface-container/40 border border-tertiary/20 text-tertiary font-medium">
            Stage 04 // BI &amp; Telemetry
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar & Slideshow Controls */}
      <div className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mx-auto sm:mx-0">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'prog-data', label: 'Programming & Data' },
            { id: 'ml-ai', label: 'Machine Learning' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'databases', label: 'Databases' },
            { id: 'bi-viz', label: 'BI & Visualization' },
            { id: 'automation', label: 'Marketing & Automation' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`tech-filter-tab px-3.5 py-1.5 rounded-full text-xs font-label-md transition-all duration-300 ${
                filter === tab.id
                  ? 'bg-primary-container text-on-primary font-bold shadow-[0_0_16px_rgba(160,120,255,0.4)] border border-primary/40 scale-105'
                  : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 hover:bg-surface-container-highest border border-outline-variant/30 backdrop-blur-md'
              }`}
              data-filter={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel Flow Controls */}
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
            aria-label="Scroll technology cards left"
            title="Previous technology"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            className="p-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface transition-all"
            aria-label="Scroll technology cards right"
            title="Next technology"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CONTINUOUS SINGLE ROW SLIDESHOW (Auto-gliding to Right) */}
      <div
        className="relative w-full overflow-hidden py-4 -mx-4 px-4 group/techslider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Vignette / Gradient Shadows */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

        {/* Scrollable Container with Hardware Accelerated Slide Animation */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div
            className={`flex items-stretch gap-5 ${
              isPaused ? 'animate-slide-paused' : 'animate-slide-right-slow'
            }`}
          >
            {displayItems.map((tech, index) => {
              const borderTheme =
                tech.badgeColor === 'primary'
                  ? 'border-primary/20 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(160,120,255,0.35)]'
                  : tech.badgeColor === 'secondary'
                  ? 'border-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_25px_rgba(123,208,255,0.35)]'
                  : 'border-tertiary/20 hover:border-tertiary/50 hover:shadow-[0_0_25px_rgba(255,182,144,0.35)]';

              const badgeTheme =
                tech.badgeColor === 'primary'
                  ? 'bg-primary/10 text-primary'
                  : tech.badgeColor === 'secondary'
                  ? 'bg-secondary/15 text-secondary'
                  : 'bg-tertiary/15 text-tertiary';

              const iconContainerTheme =
                tech.badgeColor === 'primary'
                  ? 'bg-primary-container/20 border-primary/30 text-primary'
                  : tech.badgeColor === 'secondary'
                  ? 'bg-secondary-container/20 border-secondary/30 text-secondary'
                  : 'bg-tertiary-container/20 border-tertiary/30 text-tertiary';

              const progressTheme =
                tech.badgeColor === 'primary'
                  ? 'from-primary-container via-primary to-secondary shadow-[0_0_8px_#d0bcff]'
                  : tech.badgeColor === 'secondary'
                  ? 'from-secondary to-primary shadow-[0_0_8px_#7bd0ff]'
                  : 'from-tertiary via-primary to-secondary shadow-[0_0_8px_#ffb690]';

              const textTheme =
                tech.badgeColor === 'primary'
                  ? 'text-primary'
                  : tech.badgeColor === 'secondary'
                  ? 'text-secondary'
                  : 'text-tertiary';

              return (
                <div
                  key={`${tech.id}-${index}`}
                  className={`tech-card group/card relative w-[310px] sm:w-[350px] min-h-[360px] shrink-0 p-6 rounded-2xl bg-surface-container-low/90 dark:bg-[#14161f]/95 border ${borderTheme} shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-all duration-300 flex flex-col justify-between`}
                  data-categories={tech.categories}
                >
                  {/* Top Specular Rim Light */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-primary/25 to-transparent pointer-events-none rounded-t-2xl" />

                  <div>
                    {/* Header Row: Icon + Name + Badge */}
                    <div className="flex items-start justify-between mb-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${iconContainerTheme}`}
                        >
                          <span className="material-symbols-outlined text-[24px]">
                            {tech.icon}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-nexa text-base sm:text-lg text-on-surface font-bold group-hover/card:text-primary transition-colors leading-tight">
                            {tech.name}
                          </h4>
                          <span
                            className={`font-label-sm text-[11px] uppercase font-bold ${textTheme}`}
                          >
                            {tech.level}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-[10px] uppercase font-semibold ${badgeTheme}`}
                      >
                        {tech.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed line-clamp-3">
                      {tech.description}
                    </p>
                  </div>

                  <div>
                    {/* Proficiency Metric Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5">
                        <span className="text-on-surface-variant/80 uppercase text-[10px] tracking-wider">
                          Proficiency
                        </span>
                        <span
                          className={`font-semibold text-[11px] ${textTheme}`}
                        >
                          {tech.proficiency}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${progressTheme}`}
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                    </div>

                    {/* Bottom Metadata: Associated Project & Verification Tag */}
                    <div className="space-y-2 pt-3 border-t border-surface-container-high/60">
                      <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface">
                        <span className="material-symbols-outlined text-secondary text-[14px]">
                          folder
                        </span>
                        <span className="text-on-surface-variant">Project:</span>
                        <span className="font-medium text-secondary truncate">
                          {tech.projectName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-label-sm text-[10px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-[14px]">
                          verified
                        </span>
                        <span className="truncate">{tech.credentialName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechArsenalSection;
