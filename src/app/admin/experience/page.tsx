'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useExperiences } from '@/lib/hooks';
import { saveExperience, deleteExperience } from '@/lib/data-store';
import { ExperienceItem } from '@/data/seedExperience';
import {
  History,
  Plus,
  Briefcase,
  Calendar,
  MapPin,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function AdminExperiencePage() {
  const { experiences } = useExperiences();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Full-time');
  const [period, setPeriod] = useState('2025 – Present');
  const [location, setLocation] = useState('Cairo, Egypt');
  const [current, setCurrent] = useState(false);
  const [summary, setSummary] = useState('');
  const [m1Val, setM1Val] = useState('95%');
  const [m1Label, setM1Label] = useState('Prediction Accuracy');
  const [m2Val, setM2Val] = useState('60%');
  const [m2Label, setM2Label] = useState('Cost Reduction');
  const [m3Val, setM3Val] = useState('Sub-2s');
  const [m3Label, setM3Label] = useState('Query Speed');
  const [technologiesStr, setTechnologiesStr] = useState('Python, PySpark, Power BI, SQL');
  const [highlightsStr, setHighlightsStr] = useState('Architected enterprise lakehouse\nEngineered automated ETL workflows');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openCreateModal = () => {
    setEditingExp(null);
    setRole('');
    setCompany('');
    setType('Full-time');
    setPeriod('2025 – Present');
    setLocation('Cairo, Egypt');
    setCurrent(false);
    setSummary('');
    setM1Val('95%');
    setM1Label('Predictive Accuracy');
    setM2Val('60%');
    setM2Label('Task Automation');
    setM3Val('Sub-2s');
    setM3Label('Query Latency');
    setTechnologiesStr('Python, PySpark, Lakehouse, Power BI');
    setHighlightsStr('Deployed high-throughput streaming ingestion pipeline\nIntegrated real-time telemetry dashboards');
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('create') === 'true') {
        openCreateModal();
      }
    }
  }, []);

  const openEditModal = (exp: ExperienceItem) => {
    setEditingExp(exp);
    setRole(exp.role);
    setCompany(exp.company);
    setType(exp.type);
    setPeriod(exp.period);
    setLocation(exp.location || 'Cairo, Egypt');
    setCurrent(exp.current || false);
    setSummary(exp.summary);
    setM1Val(exp.metrics?.[0]?.value || '');
    setM1Label(exp.metrics?.[0]?.label || '');
    setM2Val(exp.metrics?.[1]?.value || '');
    setM2Label(exp.metrics?.[1]?.label || '');
    setM3Val(exp.metrics?.[2]?.value || '');
    setM3Label(exp.metrics?.[2]?.label || '');
    setTechnologiesStr(exp.technologies.join(', '));
    setHighlightsStr(exp.highlights.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingExp ? editingExp.id : `exp-${Date.now()}`;
    const technologies = technologiesStr.split(',').map((s) => s.trim()).filter(Boolean);
    const highlights = highlightsStr.split('\n').map((s) => s.trim()).filter(Boolean);

    const metrics = [];
    if (m1Val && m1Label) metrics.push({ value: m1Val, label: m1Label });
    if (m2Val && m2Label) metrics.push({ value: m2Val, label: m2Label });
    if (m3Val && m3Label) metrics.push({ value: m3Val, label: m3Label });

    const updatedExp: ExperienceItem = {
      id,
      role,
      company,
      type: type as any,
      period,
      location: location || 'Cairo, Egypt',
      current,
      summary,
      highlights,
      technologies,
      metrics,
    };

    await saveExperience(updatedExp);
    setIsModalOpen(false);
    showToast(`Role at "${company}" saved successfully.`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete experience "${name}"?`)) {
      await deleteExperience(id);
      showToast(`Role at "${name}" deleted.`);
    }
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
                <History className="w-4 h-4 text-secondary" />
                <span className="font-mono text-xs uppercase text-secondary font-bold tracking-wider">
                  Career Trajectory &amp; Roles CMS
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs text-on-surface-variant font-mono">{experiences.length} Career Milestones</span>
              </div>
              <h1 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Professional Experience Manager
              </h1>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-lg shadow-primary/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Career Milestone</span>
            </button>
          </div>

          {/* Toast Notification */}
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3.5 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMsg}</span>
            </motion.div>
          )}

          {/* Experience Timeline Grid */}
          <div className="flex flex-col gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                layout
                className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 shadow-md transition-all flex flex-col gap-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-secondary">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-nexa font-extrabold text-base text-primary uppercase">
                          {exp.company}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono text-on-surface-variant">
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-mono font-bold">
                            Current Position
                          </span>
                        )}
                      </div>
                      <h3 className="font-nexa text-xl font-bold text-on-surface mt-0.5">
                        {exp.role}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right font-mono text-xs text-on-surface-variant">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        <span>{exp.period}</span>
                      </div>
                      {exp.location && (
                        <div className="text-[11px] text-on-surface-variant/70 flex items-center gap-1 justify-end mt-0.5">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 border-l border-surface-container-high pl-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(exp)}
                        className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary transition-colors"
                        title="Edit Role"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(exp.id, exp.company)}
                        className="p-2 rounded-xl bg-error-container/20 hover:bg-error hover:text-on-error text-error transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {exp.summary}
                </p>

                {/* Metrics Badges */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {exp.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 flex flex-col"
                      >
                        <span className="font-display-xl text-lg font-bold text-primary">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-mono">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights List */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-surface-container-high/40">
                    <span className="text-[11px] font-mono uppercase text-secondary font-bold block mb-1">
                      Key Engineering Accomplishments:
                    </span>
                    {exp.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-on-surface">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-surface-container-high/40">
                  {exp.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-surface-container-high text-[11px] font-mono text-on-surface-variant"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CREATE / EDIT EXPERIENCE MODAL */}
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="fixed inset-0 bg-background/80 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-low/95 border border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                    <h3 className="font-display-xl text-xl font-bold text-on-surface">
                      {editingExp ? `Edit Career Milestone: ${editingExp.company}` : 'Add Career Milestone'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Nexalytix, Safir Hotels"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Role Title *</label>
                        <input
                          type="text"
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Founder & Lead AI Solutions Architect"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Period *</label>
                        <input
                          type="text"
                          required
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                          placeholder="May 2025 – Present"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Employment Type</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Founder / Lead">Founder / Lead</option>
                          <option value="Contract / Sprint">Contract / Sprint</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Location</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Cairo, Egypt"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="current-pos"
                        checked={current}
                        onChange={(e) => setCurrent(e.target.checked)}
                        className="rounded bg-surface-container-lowest border-outline-variant/30 text-primary"
                      />
                      <label htmlFor="current-pos" className="text-xs text-on-surface cursor-pointer">
                        Mark as my current active role (highlighted on timeline)
                      </label>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Executive Summary *</label>
                      <textarea
                        rows={3}
                        required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Comprehensive summary of engineering contributions and scope..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Metric Inputs */}
                    <div className="p-3.5 rounded-2xl bg-surface-container-high/40 border border-outline-variant/20 flex flex-col gap-2.5">
                      <span className="text-xs font-semibold text-primary">Key Quantifiable Metrics (Up to 3)</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={m1Val}
                            onChange={(e) => setM1Val(e.target.value)}
                            placeholder="Value: 95%"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={m1Label}
                            onChange={(e) => setM1Label(e.target.value)}
                            placeholder="Label: Accuracy"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-[11px]"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            value={m2Val}
                            onChange={(e) => setM2Val(e.target.value)}
                            placeholder="Value: 60%"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={m2Label}
                            onChange={(e) => setM2Label(e.target.value)}
                            placeholder="Label: Cost Reduction"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-[11px]"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            value={m3Val}
                            onChange={(e) => setM3Val(e.target.value)}
                            placeholder="Value: Sub-2s"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={m3Label}
                            onChange={(e) => setM3Label(e.target.value)}
                            placeholder="Label: Latency"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Technologies Used (comma separated)</label>
                      <input
                        type="text"
                        value={technologiesStr}
                        onChange={(e) => setTechnologiesStr(e.target.value)}
                        placeholder="Python, PySpark, Power BI, SQL, n8n"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Key Accomplishments (1 per line)</label>
                      <textarea
                        rows={3}
                        value={highlightsStr}
                        onChange={(e) => setHighlightsStr(e.target.value)}
                        placeholder="Delivered enterprise real-time pipeline&#10;Integrated OPERA PMS with sub-2s query speeds"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs uppercase hover:bg-primary hover:text-on-primary shadow-md transition-all"
                      >
                        {editingExp ? 'Save Changes' : 'Add Experience Role'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-3 rounded-xl bg-surface-container-high text-xs text-on-surface-variant hover:text-on-surface"
                      >
                        Cancel
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
