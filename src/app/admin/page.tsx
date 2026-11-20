'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { AdminFooter } from '@/components/navigation/AdminFooter';
import { useProjects, usePricing, useArticles, useReviews, useReservations, useCertifications, useExperiences, useCrmLeads } from '@/lib/hooks';

export default function AdminPage() {
  const { projects } = useProjects();
  const { packages } = usePricing();
  const { articles } = useArticles();
  const { reviews } = useReviews();
  const { reservations } = useReservations();
  const { certifications } = useCertifications();
  const { experiences } = useExperiences();
  const { leads } = useCrmLeads();

  const pendingBookings = reservations.filter((r) => r.status === 'pending');
  const confirmedBookings = reservations.filter((r) => r.status === 'confirmed');
  const pipelineValue = leads.reduce((acc, curr) => acc + (curr.stage !== 'closed' ? curr.dealValue : 0), 0);
  const featuredProjectsCount = projects.filter((p) => p.featured).length;
  const repoProjectsCount = projects.length - featuredProjectsCount;

  const kpis = [
    {
      label: 'CRM Pipeline Value',
      value: `$${(pipelineValue / 1000).toFixed(0)}k`,
      subtext: `${leads.length} active opportunities`,
      icon: 'query_stats',
      color: 'text-primary',
      accent: 'border-primary/25 hover:border-primary/60',
      href: '/admin/crm'
    },
    {
      label: 'Pending Bookings',
      value: pendingBookings.length.toString(),
      subtext: `${confirmedBookings.length} confirmed • ${reservations.length} total`,
      icon: 'calendar_month',
      color: pendingBookings.length > 0 ? 'text-tertiary' : 'text-secondary',
      accent: pendingBookings.length > 0 ? 'border-tertiary/40 hover:border-tertiary' : 'border-outline-variant/25 hover:border-secondary/60',
      href: '/admin/reservations'
    },
    {
      label: 'Production Projects',
      value: projects.length.toString(),
      subtext: `${featuredProjectsCount} featured • ${repoProjectsCount} repos`,
      icon: 'deployed_code',
      color: 'text-secondary',
      accent: 'border-outline-variant/25 hover:border-secondary/60',
      href: '/admin/projects'
    },
    {
      label: 'Published Articles',
      value: articles.length.toString(),
      subtext: 'Engineering blog posts',
      icon: 'edit_note',
      color: 'text-primary',
      accent: 'border-outline-variant/25 hover:border-primary/60',
      href: '/admin/blog'
    },
    {
      label: 'Certifications',
      value: certifications.length.toString(),
      subtext: `${experiences.length} career roles`,
      icon: 'verified',
      color: 'text-secondary',
      accent: 'border-outline-variant/25 hover:border-secondary/60',
      href: '/admin/certifications'
    },
    {
      label: 'Client Reviews',
      value: reviews.length.toString(),
      subtext: `${packages.length} advisory packages`,
      icon: 'reviews',
      color: 'text-tertiary',
      accent: 'border-outline-variant/25 hover:border-tertiary/60',
      href: '/admin/reviews'
    },
  ];

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <AdminNav />

      <main className="w-full pt-24 pb-20 flex-1">
        <div className="max-w-[1400px] mx-auto px-gutter flex flex-col gap-8">
          
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high border border-primary/30 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 flex items-center justify-center p-3 rounded-2xl bg-surface-container-lowest/80 border border-primary/30 shadow-lg">
                <img
                  src="/images/artboard-mark.png"
                  alt="Islam Samy"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(123,208,255,0.85)] brightness-110"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
                  <span className="font-mono text-xs uppercase text-secondary font-semibold">
                    Executive Admin Node &bull; Islam Samy
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Supabase DB Connected
                  </span>
                </div>
                <h1 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
                  Platform Command Center
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl">
                  Real-time governance console to control projects, company logos, package pricing, technical blog publications, client reviews, and advisory reservations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <Link
                href="/admin/projects?create=true"
                className="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Project</span>
              </Link>
              <Link
                href="/admin/pricing?create=true"
                className="px-3.5 py-2 rounded-xl bg-secondary text-on-secondary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-secondary-fixed transition-all shadow-md hover:scale-105 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Package</span>
              </Link>
              <Link
                href="/admin/blog?create=true"
                className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-all border border-outline-variant/30 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Article</span>
              </Link>
              <Link
                href="/admin/crm?create=true"
                className="px-3.5 py-2 rounded-xl bg-tertiary text-on-tertiary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-tertiary-fixed transition-all shadow-md hover:scale-105 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Lead</span>
              </Link>
            </div>
          </div>

          {/* KPI Telemetry Cards Grid (Balanced 6-column row on xl, 3x2 on md, 2x3 on mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpis.map((kpi, idx) => (
              <Link
                key={idx}
                href={kpi.href}
                className={`p-5 rounded-2xl bg-surface-container-low border ${kpi.accent} shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-container-high/80 flex items-center justify-center">
                    <span className={`material-symbols-outlined text-xl ${kpi.color}`}>
                      {kpi.icon}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </div>
                <div>
                  <span className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface block tracking-tight">
                    {kpi.value}
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-on-surface mt-1 block">
                    {kpi.label}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono block mt-0.5 truncate">
                    {kpi.subtext}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Section 1: Revenue & Client Operations */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(160,120,255,0.7)]" />
                <h2 className="font-nexa text-sm font-extrabold uppercase tracking-wider text-on-surface">
                  Revenue &amp; Client Operations
                </h2>
              </div>
              <span className="text-[11px] font-mono text-on-surface-variant">
                Pipeline &bull; Bookings &bull; Packages
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Module 1: CRM Pipeline */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-xl">query_stats</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Executive CRM Pipeline
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary font-mono text-[10px] font-bold">
                      ${(pipelineValue / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Kanban and table views to track client leads, proposal scoping, active advisory deals, and follow-ups with CSV export.
                  </p>
                  <div className="text-xs text-primary font-mono mt-1">
                    &bull; {leads.length} accounts tracked
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/crm"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Open Pipeline &rarr;
                  </Link>
                  <Link
                    href="/admin/crm?create=true"
                    className="px-3 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Lead</span>
                  </Link>
                </div>
              </div>

              {/* Module 2: Reservations Console */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-secondary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-xl">calendar_month</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Advisory Reservations
                      </h3>
                    </div>
                    {pendingBookings.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary border border-tertiary/30 font-mono text-[10px] font-bold animate-pulse">
                        {pendingBookings.length} Pending
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Triage incoming consultation bookings, confirm discovery calls, or log manual enterprise advisory reservations.
                  </p>
                  <div className="text-xs text-secondary font-mono mt-1">
                    &bull; {confirmedBookings.length} confirmed &bull; {reservations.length} total
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/reservations"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Manage Bookings &rarr;
                  </Link>
                  <Link
                    href="/admin/reservations?create=true"
                    className="px-3 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Booking</span>
                  </Link>
                </div>
              </div>

              {/* Module 3: Pricing & Packages */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-tertiary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-tertiary">
                      <span className="material-symbols-outlined text-xl">payments</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Pricing &amp; Packages
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-[10px] font-bold">
                      {packages.length} Tiers
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Configure advisory retainers, sprint packages, deliverables, and hourly consultation rates synced live to /pricing &amp; /book.
                  </p>
                  <div className="text-xs text-tertiary font-mono mt-1">
                    &bull; {packages.length} active service packages
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/pricing"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Edit Pricing &rarr;
                  </Link>
                  <Link
                    href="/admin/pricing?create=true"
                    className="px-3 py-2 rounded-xl bg-tertiary text-on-tertiary hover:bg-tertiary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Package</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Portfolio & Content CMS */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#7bd0ff]" />
                <h2 className="font-nexa text-sm font-extrabold uppercase tracking-wider text-on-surface">
                  Portfolio &amp; Content CMS
                </h2>
              </div>
              <span className="text-[11px] font-mono text-on-surface-variant">
                Projects &bull; Blog &bull; Credentials &bull; Reviews
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Module 4: Projects & Logos */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-secondary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-xl">deployed_code</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Production Systems &amp; Logos
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-mono text-[10px] font-bold">
                      {projects.length}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Manage featured client projects, enterprise architectures, gallery screenshots, company badges, and key technical metrics.
                  </p>
                  <div className="text-xs text-secondary font-mono mt-1">
                    &bull; {featuredProjectsCount} featured &bull; {repoProjectsCount} GitHub repos
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/projects"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Projects &rarr;
                  </Link>
                  <Link
                    href="/admin/projects?create=true"
                    className="px-3 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Project</span>
                  </Link>
                </div>
              </div>

              {/* Module 5: Technical Blog CMS */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-xl">edit_note</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Engineering Blog &amp; Insights
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary font-mono text-[10px] font-bold">
                      {articles.length}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Draft, publish, and format architecture deep dives with SQL / Go / Python code blocks, reading time tags, and Markdown formatting.
                  </p>
                  <div className="text-xs text-primary font-mono mt-1">
                    &bull; {articles.length} publications live on /blog
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/blog"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Articles &rarr;
                  </Link>
                  <Link
                    href="/admin/blog?create=true"
                    className="px-3 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Article</span>
                  </Link>
                </div>
              </div>

              {/* Module 6: Certifications CMS */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-secondary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-xl">verified</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Certifications &amp; Accreditations
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-mono text-[10px] font-bold">
                      {certifications.length}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Manage verified credentials from DataCamp, Cisco, IBM, ITI, and academic degrees. Add verification links and skill pills.
                  </p>
                  <div className="text-xs text-secondary font-mono mt-1">
                    &bull; {certifications.length} verified credentials live
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/certifications"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Credentials &rarr;
                  </Link>
                  <Link
                    href="/admin/certifications?create=true"
                    className="px-3 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Cert</span>
                  </Link>
                </div>
              </div>

              {/* Module 7: Experience CMS */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-tertiary/50 hover:shadow-lg transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-tertiary">
                      <span className="material-symbols-outlined text-xl">history_edu</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Professional Experience Timeline
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-[10px] font-bold">
                      {experiences.length}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Control career trajectory items (Nexalytix, Safir Hotels, CodeAlpha, Sotex). Set metrics, technology tags, and accomplishments.
                  </p>
                  <div className="text-xs text-tertiary font-mono mt-1">
                    &bull; {experiences.length} career milestones live
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/experience"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Timeline &rarr;
                  </Link>
                  <Link
                    href="/admin/experience?create=true"
                    className="px-3 py-2 rounded-xl bg-tertiary text-on-tertiary hover:bg-tertiary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Role</span>
                  </Link>
                </div>
              </div>

              {/* Module 8: Client Reviews & Endorsements */}
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-tertiary/50 hover:shadow-lg transition-all md:col-span-2 lg:col-span-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-tertiary">
                      <span className="material-symbols-outlined text-xl">reviews</span>
                      <h3 className="font-headline-sm text-base font-bold text-on-surface">
                        Client Reviews &amp; Testimonials
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-[10px] font-bold">
                      5.0 ★ ({reviews.length})
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
                    Approve, feature, and manage public testimonials from enterprise executives and engineering leaders. Reviews appear in the 5.0 ★ scorecard and the dedicated /reviews showcase.
                  </p>
                  <div className="text-xs text-tertiary font-mono mt-1">
                    &bull; {reviews.length} verified client reviews
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  <Link
                    href="/admin/reviews"
                    className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface text-center font-semibold text-xs transition-all"
                  >
                    Manage Reviews &rarr;
                  </Link>
                  <Link
                    href="/admin/reviews?create=true"
                    className="px-4 py-2 rounded-xl bg-tertiary text-on-tertiary hover:bg-tertiary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Review</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Pending Reservations Triage Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-primary/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">pending_actions</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Pending Reservations &amp; Inquiries ({pendingBookings.length})
                </h3>
              </div>
              <Link
                href="/admin/reservations"
                className="text-xs text-primary hover:underline font-semibold"
              >
                View Full Operations Console &rarr;
              </Link>
            </div>

            {pendingBookings.length > 0 ? (
              <div className="divide-y divide-surface-container-high/60">
                {pendingBookings.map((res) => (
                  <div key={res.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                        {res.id}
                      </span>
                      <span className="text-on-surface font-semibold">{res.clientName}</span>
                      <span className="text-on-surface-variant">({res.company})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-on-surface">{res.itemName}</span>
                      <span className="text-secondary">{res.amount}</span>
                      <Link
                        href="/admin/reservations"
                        className="px-3 py-1 rounded-lg bg-primary-container text-on-primary-container font-semibold"
                      >
                        Action
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant font-mono">
                All client booking inquiries have been actioned and confirmed.
              </p>
            )}
          </div>

        </div>
      </main>
      <AdminFooter />
    </div>
  );
}

