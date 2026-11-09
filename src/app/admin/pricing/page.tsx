'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { usePricing } from '@/lib/hooks';
import { savePackage, deletePackage, saveConsultationRates } from '@/lib/data-store';
import { PricingPackage, ConsultationRates, initialPackages } from '@/data/seedPricing';
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
  X,
  Sparkles,
  RotateCcw,
  Clock,
  DollarSign,
  Tag,
  Check,
} from 'lucide-react';

export default function AdminPricingPage() {
  const { packages, consultationRates } = usePricing();
  const [editingPkg, setEditingPkg] = useState<PricingPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Package Form State
  const [name, setName] = useState('');
  const [badge, setBadge] = useState('Production Tier');
  const [headline, setHeadline] = useState('');
  const [price, setPrice] = useState('$5,000');
  const [frequency, setFrequency] = useState('/ milestone');
  const [duration, setDuration] = useState('2 Weeks');
  const [isPopular, setIsPopular] = useState(false);
  const [deliverablesStr, setDeliverablesStr] = useState(
    'Architecture blueprint & data model\nKafka & stream connector deployment\nSub-250ms query optimization\nPost-launch warranty SLA'
  );

  // Consultation Rates State
  const [session30, setSession30] = useState(consultationRates?.session30Min || '$90');
  const [session60, setSession60] = useState(consultationRates?.session60Min || '$150');

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const startCreatePkg = () => {
    setName('');
    setBadge('Advisory Track');
    setHeadline('Architectural deep-dive, audit, and deployment blueprint.');
    setPrice('$4,500');
    setFrequency('/ project milestone');
    setDuration('2 Sprints (4 Weeks)');
    setIsPopular(false);
    setDeliverablesStr(
      'Infrastructure & data model audit\nStreaming CDC & lakehouse design\nProduction deployment scripts\nExecutive stakeholder presentation'
    );
    setEditingPkg(null);
    setIsCreating(true);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('create') === 'true') {
        startCreatePkg();
      }
    }
  }, []);

  const startEditPkg = (pkg: PricingPackage) => {
    setName(pkg.name);
    setBadge(pkg.badge);
    setHeadline(pkg.headline);
    setPrice(pkg.price);
    setFrequency(pkg.frequency);
    setDuration(pkg.duration);
    setIsPopular(pkg.isPopular || false);
    setDeliverablesStr(pkg.deliverables.join('\n'));
    setEditingPkg(pkg);
    setIsCreating(true);
  };

  const duplicatePkg = async (pkg: PricingPackage) => {
    const duplicated: PricingPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      name: `${pkg.name} (Copy)`,
      isPopular: false,
    };
    await savePackage(duplicated);
    showToast(`Package duplicated as "${duplicated.name}".`);
  };

  const handleDeletePkg = async (id: string, pkgName: string) => {
    if (confirm(`Are you sure you want to delete the package "${pkgName}"?`)) {
      await deletePackage(id);
      showToast(`Package "${pkgName}" deleted successfully.`);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm('Reset all packages to the initial 3 seed packages? Any custom packages will be overwritten.')) {
      for (const p of initialPackages) {
        await savePackage(p);
      }
      showToast('Packages reset to original portfolio defaults.');
    }
  };

  const handleSavePkg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const deliverables = deliverablesStr
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const id = editingPkg ? editingPkg.id : `pkg-${Date.now()}`;
    const updated: PricingPackage = {
      id,
      name,
      badge: badge || 'Advisory',
      headline: headline || 'Technical architecture engagement',
      price: price.startsWith('$') ? price : `$${price}`,
      frequency,
      duration,
      deliverables: deliverables.length ? deliverables : ['Standard advisory sprint deliverables'],
      isPopular,
    };

    await savePackage(updated);
    setIsCreating(false);
    setEditingPkg(null);
    showToast(`Package "${name}" saved and live on /book & Home!`);
  };

  const handleSaveConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRates: ConsultationRates = {
      hourlyRate: session60,
      session30Min: session30,
      session60Min: session60,
      availableDays: consultationRates?.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      availableSlots: consultationRates?.availableSlots || ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'],
      availableTimezones: consultationRates?.availableTimezones || [
        'Cairo EET (UTC+2)',
        'London GMT (UTC+0)',
        'New York EST (UTC-5)',
      ],
    };

    await saveConsultationRates(updatedRates);
    showToast('Consultation session rates updated!');
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <AdminNav />

      <main className="w-full pt-24 pb-20 flex-1">
        <div className="max-w-[1400px] mx-auto px-gutter flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-secondary font-semibold uppercase">
                  Revenue &amp; Engagements Governance
                </span>
                <span className="text-outline-variant">&bull;</span>
                <span className="text-xs text-on-surface-variant font-mono">Live Sync with /book &amp; Homepage</span>
              </div>
              <h1 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">
                Pricing, Packages &amp; Advisory Rates
              </h1>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-xs font-semibold border border-outline-variant/30 transition-all shadow-sm"
                title="Reset to default 3 packages"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={startCreatePkg}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:shadow-[0_0_28px_rgba(160,120,255,0.6)] hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Package</span>
              </button>
            </div>
          </div>

          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>{successToast}</span>
            </motion.div>
          )}

          {/* SECTION 1: PACKAGES CARDS GRID */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-nexa text-lg font-bold text-on-surface flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Active Engagement Packages ({packages.length})</span>
              </h2>
              <span className="text-xs text-on-surface-variant font-mono">
                Changes take effect instantly on client portal and bookings
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-surface-container-low/60 hover:bg-surface-container-low/90 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col justify-between gap-6"
                >
                  {/* Top Specular Rim Light */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-sm text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Requested
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/20">
                        {pkg.badge}
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                        <Clock className="w-3 h-3 text-secondary" />
                        {pkg.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-nexa text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                        {pkg.headline}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1 py-3 border-y border-surface-container-high/60">
                      <span className="font-nexa text-3xl font-extrabold text-primary">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-on-surface-variant font-mono">
                        {pkg.frequency}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                        Included Deliverables ({pkg.deliverables.length}):
                      </span>
                      <ul className="space-y-1 text-xs text-on-surface-variant">
                        {pkg.deliverables.slice(0, 4).map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">
                              check_circle
                            </span>
                            <span className="line-clamp-1">{d}</span>
                          </li>
                        ))}
                        {pkg.deliverables.length > 4 && (
                          <li className="text-[11px] text-secondary font-mono pl-5">
                            + {pkg.deliverables.length - 4} additional milestones
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons: Edit, Duplicate, Delete */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container-high/60">
                    <button
                      type="button"
                      onClick={() => startEditPkg(pkg)}
                      className="col-span-1 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-xs font-semibold transition-all flex items-center justify-center gap-1 border border-outline-variant/20"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => duplicatePkg(pkg)}
                      className="col-span-1 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-all flex items-center justify-center gap-1 border border-outline-variant/20"
                      title="Duplicate package"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Clone</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeletePkg(pkg.id, pkg.name)}
                      className="col-span-1 py-2 px-3 rounded-xl bg-error/10 hover:bg-error hover:text-white text-error text-xs font-semibold transition-all flex items-center justify-center gap-1 border border-error/20"
                      title="Delete package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: 1-ON-1 CONSULTATION RATES */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-6 max-w-2xl">
            <div>
              <h2 className="font-nexa text-lg font-bold text-on-surface flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-secondary" />
                <span>1-on-1 Consultation Session Rates</span>
              </h2>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Configure advisory fees displayed in the calendar dispatch system on `/book` and customer intake receipts.
              </p>
            </div>

            <form onSubmit={handleSaveConsultation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface">30-Minute Architecture Triage Fee</label>
                <input
                  type="text"
                  value={session30}
                  onChange={(e) => setSession30(e.target.value)}
                  placeholder="$90"
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface">60-Minute Deep Advisory Session Fee</label>
                <input
                  type="text"
                  value={session60}
                  onChange={(e) => setSession60(e.target.value)}
                  placeholder="$150"
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-nexa font-bold uppercase tracking-wider hover:bg-secondary-fixed transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  Save Consultation Rates
                </button>
              </div>
            </form>
          </div>

          {/* CREATE / EDIT PACKAGE MODAL */}
          <AnimatePresence>
            {isCreating && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCreating(false)}
                  className="fixed inset-0 bg-background/80 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-lowest/95 border-2 border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <h3 className="font-nexa text-xl font-bold text-on-surface">
                        {editingPkg ? `Edit Package: ${editingPkg.name}` : 'Create New Engagement Package'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePkg} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Package Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Real-Time Lakehouse Deployment"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Badge Pill *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Enterprise Tier"
                          value={badge}
                          onChange={(e) => setBadge(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Headline / Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. Production telemetry and lakehouse CDC pipeline integration."
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Price *</label>
                        <input
                          type="text"
                          required
                          placeholder="$5,000"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Billing Frequency</label>
                        <input
                          type="text"
                          placeholder="/ project milestone"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Duration SLA</label>
                        <input
                          type="text"
                          placeholder="2 Sprints (4 Weeks)"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Most Popular Toggle */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                      <input
                        type="checkbox"
                        id="isPopularToggle"
                        checked={isPopular}
                        onChange={(e) => setIsPopular(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor="isPopularToggle" className="text-xs text-on-surface font-medium cursor-pointer">
                        Mark as <strong className="text-secondary font-bold">&quot;Most Requested&quot;</strong> badge on
                        pricing page
                      </label>
                    </div>

                    {/* Deliverables */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-on-surface">Deliverables (1 per line)</label>
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          Parsed into bulleted checklist
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        value={deliverablesStr}
                        onChange={(e) => setDeliverablesStr(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                        placeholder="Architecture blueprint & schema\nKafka & stream connector deployment\nSub-250ms query optimization"
                      ></textarea>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        {editingPkg ? 'Save Changes' : 'Create Package'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
