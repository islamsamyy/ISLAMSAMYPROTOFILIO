'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List, Star, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import { AdminNav } from '@/components/navigation/AdminNav';
import { AdminFooter } from '@/components/navigation/AdminFooter';
import { useProjects } from '@/lib/hooks';
import { saveProject, deleteProject } from '@/lib/data-store';
import { supabase } from '@/lib/supabase/client';
import { ProjectItem } from '@/data/seedProjects';

const SAMPLE_LOGOS = [
  { name: 'Safir Hotels', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80' },
  { name: 'FinTech Cloud', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80' },
  { name: 'Telecom Alliance', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80' },
  { name: 'TransGlobal Freight', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80' },
  { name: 'Nexa Health', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=120&q=80' }
];

function ProjectLogo({ src, alt, fallback }: { src?: string; alt: string; fallback: string }) {
  const [failed, setFailed] = useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary border border-outline-variant/30">
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-lg object-cover border border-outline-variant/30"
    />
  );
}

export default function AdminProjectsPage() {
  const { projects } = useProjects();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // View & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterType, setFilterType] = useState<'all' | 'featured' | 'repo'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [modalTab, setModalTab] = useState<'basics' | 'architecture' | 'media' | 'steps'>('basics');

  // Form Fields
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [category, setCategory] = useState<ProjectItem['category']>('ERP Systems');
  const [role, setRole] = useState('Lead Solutions Architect');
  const [impactMetric, setImpactMetric] = useState('1.4M msg/sec');
  const [summary, setSummary] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [techStackStr, setTechStackStr] = useState('Kafka, Go, ClickHouse, Docker');
  const [highlightsStr, setHighlightsStr] = useState('Sub-second analytics lakehouse\nReal-time CDC pipeline from OPERA PMS');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [galleryImagesStr, setGalleryImagesStr] = useState('');
  const [stepsStr, setStepsStr] = useState('');
  const [featured, setFeatured] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCreating) setIsCreating(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCreating]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((p) => {
      if (filterCategory !== 'All' && p.category !== filterCategory) return false;
      if (filterType === 'featured' && !p.featured) return false;
      if (filterType === 'repo' && p.featured) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, searchQuery, filterCategory, filterType]);

  const uploadImageFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('projectId', editingProject?.id || 'custom');
    const { data: { session } } = await supabase.auth.getSession();
    const headers: Record<string, string> = session?.access_token
      ? { Authorization: `Bearer ${session.access_token}` }
      : {};
    const res = await fetch('/api/admin/upload', { method: 'POST', headers, body: fd });
    const data = await res.json();
    if (!res.ok || !data.url) {
      alert(data.error || 'Image upload failed');
      return null;
    }
    return data.url;
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadImageFile(file);
      if (url) setCompanyLogo(url);
    } finally {
      setUploadingLogo(false);
      e.target.value = '';
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const uploaded: string[] = [];
      for (const f of files) {
        const url = await uploadImageFile(f);
        if (url) uploaded.push(url);
      }
      if (uploaded.length > 0) {
        const existing = galleryImagesStr.split('\n').map((s) => s.trim()).filter(Boolean);
        setGalleryImagesStr([...existing, ...uploaded].join('\n'));
      }
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  const galleryList = galleryImagesStr.split('\n').map((s) => s.trim()).filter(Boolean);

  const removeGalleryImage = (idx: number) => {
    setGalleryImagesStr(galleryList.filter((_, i) => i !== idx).join('\n'));
  };

  const setAsCoverImage = (idx: number) => {
    if (idx === 0) return;
    const target = galleryList[idx];
    const rest = galleryList.filter((_, i) => i !== idx);
    setGalleryImagesStr([target, ...rest].join('\n'));
  };

  const addPhotoByUrl = () => {
    const trimmed = newPhotoUrl.trim();
    if (!trimmed) return;
    setGalleryImagesStr([...galleryList, trimmed].join('\n'));
    setNewPhotoUrl('');
  };

  const startCreate = () => {
    setTitle('');
    setClient('');
    setCompanyLogo(SAMPLE_LOGOS[0].url);
    setCategory('ERP Systems');
    setRole('Lead Solutions Architect');
    setImpactMetric('95% Accuracy');
    setSummary('');
    setChallenge('');
    setSolution('');
    setTechStackStr('Kafka, ClickHouse, Go, Docker');
    setHighlightsStr('Engineered distributed stream pipeline\nReduced cloud compute cost by 60%');
    setLiveDemoUrl('');
    setGalleryImagesStr('');
    setStepsStr('');
    setFeatured(true);
    setModalTab('basics');
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
    setChallenge(p.challenge || '');
    setSolution(p.solution || '');
    setTechStackStr(p.techStack.join(', '));
    setHighlightsStr(p.architectureHighlights.join('\n'));
    setLiveDemoUrl(p.liveDemoUrl || '');
    setGalleryImagesStr((p.galleryImages || []).join('\n'));
    setStepsStr((p.steps || []).map((st) => `${st.title} | ${st.description}`).join('\n'));
    setFeatured(p.featured);
    setModalTab('basics');
    setEditingProject(p);
    setIsCreating(true);
  };

  const handleToggleFeatured = async (p: ProjectItem) => {
    try {
      await saveProject({ ...p, featured: !p.featured });
      setSuccessToast(`"${p.title}" ${!p.featured ? 'marked as Featured' : 'moved to GitHub Repos'}.`);
      setTimeout(() => setSuccessToast(null), 2500);
    } catch (err: any) {
      alert(`Update failed: ${err.message || 'Error updating project'}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) return;

    setIsSaving(true);
    try {
      const id = editingProject ? editingProject.id : `proj-${Date.now()}`;
      const techStack = techStackStr.split(',').map((s) => s.trim()).filter(Boolean);
      const architectureHighlights = highlightsStr.split('\n').map((s) => s.trim()).filter(Boolean);
      const galleryImages = galleryImagesStr.split('\n').map((s) => s.trim()).filter(Boolean);
      const steps = stepsStr
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, idx) => {
          const [t, ...rest] = line.split('|');
          return {
            title: rest.length > 0 ? t.trim() : `Step ${idx + 1}`,
            description: rest.length > 0 ? rest.join('|').trim() : t.trim(),
          };
        });

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
        challenge: challenge.trim() || undefined,
        solution: solution.trim() || undefined,
        keyDecisions: editingProject?.keyDecisions || [],
        systemFlow: editingProject?.systemFlow || [],
        outcomeMetrics: editingProject?.outcomeMetrics || [],
        galleryImages,
        steps,
        readmeContent: editingProject?.readmeContent,
        githubUrl: editingProject?.githubUrl,
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
                  role="dialog"
                  aria-modal="true"
                  aria-label={editingProject ? 'Edit Enterprise Project' : 'Create Enterprise Project'}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-surface-container-low/95 border border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high shrink-0">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                        {editingProject ? `Editing • ${editingProject.id}` : 'New Portfolio Entry'}
                      </span>
                      <h3 className="font-display-xl text-xl font-bold text-on-surface">
                        {editingProject ? 'Edit Enterprise Project' : 'Create Enterprise Project'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      aria-label="Close project editor"
                      className="p-1.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modal Section Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shrink-0 overflow-x-auto">
                    {[
                      { id: 'basics', label: '1. Basics & Client' },
                      { id: 'architecture', label: '2. Architecture & Story' },
                      { id: 'media', label: `3. Media & Gallery (${galleryList.length})` },
                      { id: 'steps', label: '4. Execution Steps' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setModalTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          modalTab === tab.id
                            ? 'bg-primary-container text-on-primary-container shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <form id="project-editor-form" onSubmit={handleSave} className="flex flex-col gap-4 overflow-y-auto flex-1 pr-1">
                    {modalTab === 'basics' && (
                      <>
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

                    {/* Company Logo Selector / Upload / URL */}
                    <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20">
                      <div className="flex items-center justify-between gap-2">
                        <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-secondary">image</span>
                          <span>Company Logo (Upload, URL, or Preset)</span>
                        </label>
                        <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-[11px] font-semibold border border-primary/30 transition-colors">
                          {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={uploadingLogo}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        {companyLogo && (
                          <img
                            src={companyLogo}
                            alt="Logo preview"
                            className="w-10 h-10 rounded-xl object-contain bg-white/90 p-1 border border-outline-variant/30 shrink-0"
                          />
                        )}
                        <input
                          type="text"
                          value={companyLogo}
                          onChange={(e) => setCompanyLogo(e.target.value)}
                          placeholder="https://... or /uploads/..."
                          className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
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
                          <option value="ERP Systems">ERP Systems</option>
                          <option value="Data Engineering">Data Engineering</option>
                          <option value="Software Engineering & Online Systems">Software Engineering &amp; Online Systems</option>
                          <option value="Data Analysis & Power BI">Data Analysis &amp; Power BI</option>
                          <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
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
                      </>
                    )}

                    {modalTab === 'architecture' && (
                      <>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Technical Challenge</label>
                        <textarea
                          rows={3}
                          value={challenge}
                          onChange={(e) => setChallenge(e.target.value)}
                          placeholder="What bottleneck or architectural constraint existed?"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Engineered Solution</label>
                        <textarea
                          rows={3}
                          value={solution}
                          onChange={(e) => setSolution(e.target.value)}
                          placeholder="How did your architecture solve it?"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Architecture Highlights (one per line)</label>
                      <textarea
                        rows={4}
                        value={highlightsStr}
                        onChange={(e) => setHighlightsStr(e.target.value)}
                        placeholder="Engineered bi-directional CDC connectors&#10;Constructed columnar store with 18x compression"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                      </>
                    )}

                    {/* Visual Project Gallery Manager */}
                    {modalTab === 'media' && (
                    <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-primary">photo_library</span>
                          <span>Project Photos &amp; Screenshots ({galleryList.length})</span>
                        </label>
                        <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-primary-container hover:opacity-90 text-on-primary text-[11px] font-bold shadow-sm transition-opacity">
                          {uploadingGallery ? 'Uploading Photos...' : '+ Upload Photos'}
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryUpload}
                            disabled={uploadingGallery}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {galleryList.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {galleryList.map((imgUrl, idx) => (
                            <div
                              key={`${imgUrl}-${idx}`}
                              className="group relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black/40"
                            >
                              <img
                                src={imgUrl}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover object-top"
                              />
                              {idx === 0 && (
                                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-bold">
                                  Cover
                                </span>
                              )}
                              <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/75 flex items-center justify-between gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {idx > 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => setAsCoverImage(idx)}
                                    className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] font-semibold hover:bg-secondary/30"
                                  >
                                    Set Cover
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-zinc-400 px-1">Main</span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeGalleryImage(idx)}
                                  className="px-2 py-0.5 rounded bg-error/20 text-error text-[10px] font-semibold hover:bg-error/30"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="Or paste image URL (https://...) and click Add"
                          className="flex-1 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="button"
                          onClick={addPhotoByUrl}
                          className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-xs font-semibold text-secondary border border-secondary/30"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                    )}

                    {modalTab === 'steps' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-on-surface">Project Steps (Title | Description per line)</label>
                      <textarea
                        rows={6}
                        value={stepsStr}
                        onChange={(e) => setStepsStr(e.target.value)}
                        placeholder="Edge Ingestion | Deployed Go CDC daemons across 14 properties&#10;Stream Processing | Routed events into Kafka & ClickHouse"
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-[11px] font-mono text-on-surface-variant">
                        Format: <span className="text-secondary">Step Title | Step Description</span> — displayed as numbered execution cards on the project detail page.
                      </p>
                    </div>
                    )}

                  </form>

                  <div className="flex items-center gap-3 pt-4 border-t border-surface-container-high shrink-0">
                    <button
                      type="submit"
                      form="project-editor-form"
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
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Filter, Search & View Mode Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/25 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'featured', 'repo'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filterType === t
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t === 'all' ? `All (${projects.length})` : t === 'featured' ? `Featured (${projects.filter((p) => p.featured).length})` : `GitHub Repos (${projects.filter((p) => !p.featured).length})`}
                </button>
              ))}

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                aria-label="Filter by project category"
                className="px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Categories</option>
                <option value="ERP Systems">ERP Systems</option>
                <option value="Data Engineering">Data Engineering</option>
                <option value="Software Engineering & Online Systems">Software Engineering &amp; Online Systems</option>
                <option value="Data Analysis & Power BI">Data Analysis &amp; Power BI</option>
                <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
              </select>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, client, stack..."
                  className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center p-1 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  aria-label="Table view"
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects List: Table or Visual Grid */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 rounded-3xl bg-surface-container-low border border-outline-variant/20 text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">folder_off</span>
              <p className="font-headline-sm text-base font-bold text-on-surface">No projects match your filters</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('All');
                  setFilterType('all');
                }}
                className="px-4 py-2 rounded-xl bg-surface-container-high text-xs font-semibold text-primary hover:bg-surface-container-highest"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
          <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 overflow-x-auto shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-high text-on-surface-variant uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-4">Logo</th>
                  <th className="p-4">Client &amp; Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Key Metric</th>
                  <th className="p-4">Media</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-high/25 transition-colors">
                    <td className="p-4">
                      <ProjectLogo
                        src={p.companyLogo}
                        alt={p.client}
                        fallback={(p.title?.[0] || p.client?.[0] || 'P').toUpperCase()}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{p.title}</span>
                        <span className="text-[11px] text-on-surface-variant font-mono">{p.client}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold whitespace-nowrap">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-secondary font-semibold whitespace-nowrap">{p.impactMetric}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high text-[11px] font-mono text-on-surface-variant">
                        <ImageIcon className="w-3 h-3 text-secondary" />
                        {p.galleryImages?.length || 0}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p)}
                        title={p.featured ? 'Featured on Homepage (Click to toggle)' : 'GitHub Repo (Click to feature)'}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          p.featured
                            ? 'bg-secondary/15 text-secondary border border-secondary/30'
                            : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/20 hover:text-on-surface'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${p.featured ? 'fill-secondary' : ''}`} />
                        <span>{p.featured ? 'Featured' : 'Repo'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                      <Link
                        href={`/projects/${p.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-semibold"
                        title="Preview public case study"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((p) => {
                const thumb = p.galleryImages?.[0] || p.companyLogo;
                return (
                  <div
                    key={p.id}
                    className="rounded-3xl bg-surface-container-low border border-outline-variant/25 overflow-hidden flex flex-col justify-between shadow-md hover:border-primary/40 transition-all"
                  >
                    {thumb && (
                      <div className="relative h-36 bg-surface-container-lowest overflow-hidden border-b border-outline-variant/15">
                        <img src={thumb} alt={p.title} className="w-full h-full object-cover object-top" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 text-zinc-100 text-[10px] font-mono">
                          {p.category}
                        </span>
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 text-secondary text-[10px] font-mono">
                          {p.galleryImages?.length || 0} photos
                        </span>
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ProjectLogo
                            src={p.companyLogo}
                            alt={p.client}
                            fallback={(p.title?.[0] || p.client?.[0] || 'P').toUpperCase()}
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-on-surface truncate">{p.title}</span>
                            <span className="text-[11px] font-mono text-on-surface-variant truncate">{p.client}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p)}
                          className={`shrink-0 p-1.5 rounded-lg border transition-colors ${
                            p.featured ? 'bg-secondary/15 border-secondary/30 text-secondary' : 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant'
                          }`}
                          title={p.featured ? 'Featured' : 'Mark as Featured'}
                        >
                          <Star className={`w-3.5 h-3.5 ${p.featured ? 'fill-secondary' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-2">{p.summary}</p>
                    </div>
                    <div className="px-5 py-3 bg-surface-container-lowest/70 border-t border-outline-variant/15 flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-secondary font-semibold truncate">{p.impactMetric}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link
                          href={`/projects/${p.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                          title="View Public Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => startEdit(p)}
                          className="px-3 py-1 rounded-lg bg-surface-container-high text-primary font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="px-3 py-1 rounded-lg bg-error-container/20 text-error font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
