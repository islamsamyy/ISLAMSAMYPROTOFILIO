'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useProjects } from '@/lib/hooks';
import { saveProject, deleteProject } from '@/lib/data-store';
import { ProjectItem } from '@/data/seedProjects';

const SAMPLE_LOGOS = [
  { name: 'Safir Hotels', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80' },
  { name: 'FinTech Cloud', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80' },
  { name: 'Telecom Alliance', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80' },
  { name: 'TransGlobal Freight', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80' },
  { name: 'Nexa Health', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=120&q=80' }
];

export default function AdminProjectsPage() {
  const { projects } = useProjects();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [category, setCategory] = useState<ProjectItem['category']>('Distributed Systems');
  const [role, setRole] = useState('Lead Solutions Architect');
  const [impactMetric, setImpactMetric] = useState('1.4M msg/sec');
  const [summary, setSummary] = useState('');
  const [techStackStr, setTechStackStr] = useState('Kafka, Go, ClickHouse, Docker');
  const [highlightsStr, setHighlightsStr] = useState('Sub-second analytics lakehouse\nReal-time CDC pipeline from OPERA PMS');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [featured, setFeatured] = useState(true);

  const startCreate = () => {
    setTitle('');
    setClient('');
    setCompanyLogo(SAMPLE_LOGOS[0].url);
    setCategory('Distributed Systems');
    setRole('Lead Solutions Architect');
    setImpactMetric('95% Accuracy');
    setSummary('');
    setTechStackStr('Kafka, ClickHouse, Go, Docker');
    setHighlightsStr('Engineered distributed stream pipeline\nReduced cloud compute cost by 60%');
    setLiveDemoUrl('');
    setFeatured(true);
    setEditingProject(null);
    setIsCreating(true);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('create') === 'true') {
        startCreate();
      }
    }
  }, []);

  const startEdit = (p: ProjectItem) => {
    setTitle(p.title);
    setClient(p.client);
    setCompanyLogo(p.companyLogo);
    setCategory(p.category);
    setRole(p.role);
    setImpactMetric(p.impactMetric);
    setSummary(p.summary);
    setTechStackStr(p.techStack.join(', '));
    setHighlightsStr(p.architectureHighlights.join('\n'));
    setLiveDemoUrl(p.liveDemoUrl || '');
    setFeatured(p.featured);
    setEditingProject(p);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) return;

    setIsSaving(true);
    try {
      const id = editingProject ? editingProject.id : `proj-${Date.now()}`;
      const techStack = techStackStr.split(',').map((s) => s.trim()).filter(Boolean);
      const architectureHighlights = highlightsStr.split('\n').map((s) => s.trim()).filter(Boolean);

      const updated: ProjectItem = {
        id,
        title,
        client,
        companyLogo,
        category,
        role,
        impactMetric,
        metrics: editingProject?.metrics?.length ? editingProject.metrics : [
          { label: 'Throughput', value: impactMetric },
          { label: 'Latency', value: '< 200ms' },
          { label: 'Availability', value: '99.99%' }
        ],
        techStack,
        summary,
        architectureHighlights,
        featured,
        liveDemoUrl: liveDemoUrl || undefined,
        challenge: editingProject?.challenge,
        solution: editingProject?.solution,
        keyDecisions: editingProject?.keyDecisions || [],
        systemFlow: editingProject?.systemFlow || [],
        outcomeMetrics: editingProject?.outcomeMetrics || [],
      };

      await saveProject(updated);
      setIsCreating(false);
      setEditingProject(null);
      setSuccessToast(`Project "${title}" saved successfully to database!`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      alert(`Save failed: ${err.message || 'Error saving project'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete project "${name}"?`)) {
      try {
        await deleteProject(id);
        setSuccessToast(`Project "${name}" deleted.`);
        setTimeout(() => setSuccessToast(null), 3000);
      } catch (err: any) {
        alert(`Delete failed: ${err.message || 'Error deleting project'}`);
      }
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
                <span className="font-mono text-xs text-primary font-semibold uppercase">
                  Content Governance
                </span>
                <span className="text-outline-variant">&bull;</span>
                <span className="text-xs text-secondary font-mono">{projects.length} Total Projects</span>
              </div>
              <h1 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Projects &amp; Company Logos Manager
              </h1>
            </div>

            <button
              onClick={startCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(160,120,255,0.4)] transition-all"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Add New Enterprise Project</span>
            </button>
          </div>

          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono"
            >
              ✓ {successToast}
            </motion.div>
          )}

          {/* Form Modal (Create or Edit) */}
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-low/95 border border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
                    <h3 className="font-display-xl text-xl font-bold text-on-surface">
                      {editingProject ? 'Edit Enterprise Project' : 'Create Enterprise Project'}
                    </h3>
                    <button
                      onClick={() => setIsCreating(false)}
                      className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="OPERA Cloud CDC Lakehouse"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Client / Company Name *</label>
                        <input
                          type="text"
                          required
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          placeholder="Safir Hotels & Resorts"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Company Logo Selector / URL */}
                    <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20">
                      <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-secondary">image</span>
                        <span>Company Logo (URL or Preset)</span>
                      </label>
                      <input
                        type="url"
                        value={companyLogo}
                        onChange={(e) => setCompanyLogo(e.target.value)}
                        placeholder="https://... image url"
                        className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] text-on-surface-variant">Presets:</span>
                        {SAMPLE_LOGOS.map((sample) => (
                          <button
                            key={sample.name}
                            type="button"
                            onClick={() => setCompanyLogo(sample.url)}
                            className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-[11px] text-secondary border border-secondary/30 flex items-center gap-1.5"
                          >
                            <img src={sample.url} alt={sample.name} className="w-3.5 h-3.5 rounded object-cover" />
                            <span>{sample.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Distributed Systems">Distributed Systems</option>
                          <option value="Lakehouse & BI">Lakehouse &amp; BI</option>
                          <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                          <option value="Cloud Native">Cloud Native</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Role</label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Lead Solutions Architect"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Impact Metric Badge</label>
                        <input
                          type="text"
                          value={impactMetric}
                          onChange={(e) => setImpactMetric(e.target.value)}
                          placeholder="e.g. 1.4M msg/sec"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Live Demo / Repository URL</label>
                        <input
                          type="text"
                          value={liveDemoUrl}
                          onChange={(e) => setLiveDemoUrl(e.target.value)}
                          placeholder="https://..."
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="featuredProjectCheck"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
                        <label htmlFor="featuredProjectCheck" className="text-xs font-semibold text-on-surface cursor-pointer">
                          Featured on Homepage Portfolio Showcase
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={techStackStr}
                        onChange={(e) => setTechStackStr(e.target.value)}
                        placeholder="Kafka, ClickHouse, Go, Python, Docker"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Executive Summary *</label>
                      <textarea
                        rows={3}
                        required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Brief summary of the engineering problem and business impact..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Architecture Highlights (one per line)</label>
                      <textarea
                        rows={3}
                        value={highlightsStr}
                        onChange={(e) => setHighlightsStr(e.target.value)}
                        placeholder="Engineered bi-directional CDC connectors&#10;Constructed columnar store with 18x compression"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-surface-container-high">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase hover:bg-primary/90 shadow-md transition-all disabled:opacity-50"
                      >
                        {isSaving ? 'Saving to Database...' : editingProject ? 'Save Changes' : 'Publish Project'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="px-5 py-3 rounded-xl bg-surface-container-high text-xs text-on-surface-variant hover:text-on-surface"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Existing Projects Table */}
          <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 overflow-x-auto shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-high text-on-surface-variant uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-4">Logo</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Key Metric</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="p-4">
                      {p.companyLogo ? (
                        <img
                          src={p.companyLogo}
                          alt={p.client}
                          className="w-9 h-9 rounded-lg object-cover border border-outline-variant/30"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary">
                          {p.client[0]}
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-on-surface">{p.client}</td>
                    <td className="p-4 text-on-surface">{p.title}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-secondary font-semibold">{p.impactMetric}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="px-3 py-1 rounded-lg bg-error-container/20 hover:bg-error hover:text-on-error text-error font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
