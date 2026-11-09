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
  const pipelineValue = leads.reduce((acc, curr) => acc + (curr.stage !== 'closed' ? curr.dealValue : 0), 0);

  const kpis = [
    {
      label: 'CRM Pipeline Value',
      value: `$${(pipelineValue / 1000).toFixed(0)}k`,
      subtext: `${leads.length} active opportunities`,
      icon: 'query_stats',
      color: 'text-primary',
      href: '/admin/crm'
    },
    {
      label: 'Certifications',
      value: certifications.length.toString(),
      subtext: 'Verified credentials',
      icon: 'verified',
      color: 'text-secondary',
      href: '/admin/certifications'
    },
    {
      label: 'Experience Roles',
      value: experiences.length.toString(),
      subtext: 'Career milestones',
      icon: 'history_edu',
      color: 'text-tertiary',
      href: '/admin/experience'
    },
    {
      label: 'Published Articles',
      value: articles.length.toString(),
      subtext: 'Engineering blog posts',
      icon: 'edit_note',
      color: 'text-primary-fixed',
      href: '/admin/blog'
    },
    {
      label: 'Client Reviews',
      value: reviews.length.toString(),
      subtext: '5.0 ★ public score',
      icon: 'reviews',
      color: 'text-secondary-fixed',
      href: '/admin/reviews'
    },
    {
      label: 'Production Projects',
      value: projects.length.toString(),
      subtext: 'With company logos',
      icon: 'deployed_code',
      color: 'text-primary',
      href: '/admin/projects'
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

          {/* KPI Telemetry Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpis.map((kpi, idx) => (
              <Link
                key={idx}
                href={kpi.href}
                className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/50 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`material-symbols-outlined text-2xl ${kpi.color}`}>
                    {kpi.icon}
                  </span>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </div>
                <div>
                  <span className="font-display-xl text-3xl font-bold text-on-surface block">
                    {kpi.value}
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-on-surface mt-1 block">
                    {kpi.label}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono block mt-0.5">
                    {kpi.subtext}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Management Launchpad Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Module 1: CRM Pipeline */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-primary/50 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-xl">query_stats</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Executive CRM &amp; Deal Pipeline
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Kanban and table views to track client leads, proposal scoping, active advisory deals, and automated follow-ups with full CSV export.
                </p>
                <div className="text-xs text-primary font-mono mt-2">
                  &bull; {leads.length} accounts &bull; ${(pipelineValue / 1000).toFixed(0)}k pipeline
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href="/admin/crm"
                  className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-center font-semibold text-xs transition-all"
                >
                  Pipeline &rarr;
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

            {/* Module 2: Certifications CMS */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-secondary/50 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-xl">verified</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Certifications &amp; Accreditations
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Manage verified credentials from DataCamp, Cisco, IBM, ITI, and academic degrees. Add verification links, credential IDs, and skill pills.
                </p>
                <div className="text-xs text-secondary font-mono mt-2">
                  &bull; {certifications.length} verified credentials live
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
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

            {/* Module 3: Experience CMS */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-tertiary/50 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-xl">history_edu</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Professional Experience Timeline
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Control career trajectory items (Nexalytix, Safir Hotels, CodeAlpha, Sotex). Set metrics, technology tags, and key accomplishments.
                </p>
                <div className="text-xs text-tertiary font-mono mt-2">
                  &bull; {experiences.length} career milestones live
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
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

            {/* Module 4: Technical Blog CMS */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-primary/50 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-xl">edit_note</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Engineering Blog &amp; Insights
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Draft, publish, and format architecture deep dives with SQL / Go / Python code blocks, reading time tags, and Markdown formatting.
                </p>
                <div className="text-xs text-primary font-mono mt-2">
                  &bull; {articles.length} publications live on /blog
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
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

            {/* Module 5: Projects & Logos */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-secondary/50 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-xl">deployed_code</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Production Systems &amp; Logos
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Manage featured client projects, enterprise architectures, company badges, and key technical stack metrics on public pages.
                </p>
                <div className="text-xs text-secondary font-mono mt-2">
                  &bull; {projects.length} showcase projects
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
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

            {/* Module 6: Client Reviews & Endorsements */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-tertiary/50 transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-xl">reviews</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Client Reviews &amp; Testimonials
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Approve, feature, and manage public testimonials. Reviews appear in the 5.0 ★ scorecard and the dedicated /reviews showcase.
                </p>
                <div className="text-xs text-tertiary font-mono mt-2">
                  &bull; {reviews.length} client reviews
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href="/admin/reviews"
                  className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface text-center font-semibold text-xs transition-all"
                >
                  Reviews &rarr;
                </Link>
                <Link
                  href="/admin/reviews?create=true"
                  className="px-3 py-2 rounded-xl bg-tertiary text-on-tertiary hover:bg-tertiary-fixed font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Review</span>
                </Link>
              </div>
            </div>

          </div>

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

