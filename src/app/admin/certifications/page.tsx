'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useCertifications } from '@/lib/hooks';
import { saveCertification, deleteCertification } from '@/lib/data-store';
import { CertificationItem } from '@/data/seedCertifications';
import { supabase } from '@/lib/supabase/client';
import {
  Award,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  FileBadge2,
} from 'lucide-react';

interface BulkCertDraft {
  tempId: string;
  imageUrl: string;
  title: string;
  issuer: string;
  category: string;
  date: string;
}

function formatFileNameToTitle(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^/.]+$/, '');
  return withoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AdminCertificationsPage() {
  const { certifications } = useCertifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Single Modal Form State
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [category, setCategory] = useState('Machine Learning');
  const [date, setDate] = useState(new Date().getFullYear().toString());
  const [credentialId, setCredentialId] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [skillsStr, setSkillsStr] = useState('Python, Scikit-Learn, XGBoost');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Verified' | 'In Progress'>('Verified');
  const [order, setOrder] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingSingle, setUploadingSingle] = useState(false);

  // Bulk Upload Form State
  const [bulkDrafts, setBulkDrafts] = useState<BulkCertDraft[]>([]);
  const [uploadingBulk, setUploadingBulk] = useState(false);
  const [savingBulk, setSavingBulk] = useState(false);
  const [defaultBulkIssuer, setDefaultBulkIssuer] = useState('DataCamp');
  const [defaultBulkCategory, setDefaultBulkCategory] = useState('Machine Learning');
  const [defaultBulkDate, setDefaultBulkDate] = useState(new Date().getFullYear().toString());
  const [isDraggingBulk, setIsDraggingBulk] = useState(false);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const uploadCertImageFile = async (file: File, certId?: string): Promise<string | null> => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'certifications');
    fd.append('projectId', certId || 'cert');
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const headers: Record<string, string> = session?.access_token
      ? { Authorization: `Bearer ${session.access_token}` }
      : {};
    const res = await fetch('/api/admin/upload', { method: 'POST', headers, body: fd });
    const data = await res.json();
    if (!res.ok || !data.url) {
      alert(data.error || 'Certificate image upload failed');
      return null;
    }
    return data.url;
  };

  const handleSingleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSingle(true);
    try {
      const url = await uploadCertImageFile(file, editingCert?.id || `cert-${Date.now()}`);
      if (url) {
        setImageUrl(url);
        if (!title.trim()) {
          setTitle(formatFileNameToTitle(file.name));
        }
      }
    } finally {
      setUploadingSingle(false);
      e.target.value = '';
    }
  };

  const handleBulkFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    setUploadingBulk(true);
    try {
      const uploadedDrafts: BulkCertDraft[] = [];
      for (const file of imageFiles) {
        const tempId = `cert-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const url = await uploadCertImageFile(file, tempId);
        if (url) {
          uploadedDrafts.push({
            tempId,
            imageUrl: url,
            title: formatFileNameToTitle(file.name),
            issuer: defaultBulkIssuer || 'Verified Issuer',
            category: defaultBulkCategory || 'Machine Learning',
            date: defaultBulkDate || new Date().getFullYear().toString(),
          });
        }
      }
      if (uploadedDrafts.length > 0) {
        setBulkDrafts((prev) => [...prev, ...uploadedDrafts]);
        showToast(`Uploaded ${uploadedDrafts.length} certificate image(s). Review titles and click Save All.`);
      }
    } finally {
      setUploadingBulk(false);
    }
  };

  const updateBulkDraft = (tempId: string, field: keyof BulkCertDraft, value: string) => {
    setBulkDrafts((prev) =>
      prev.map((d) => (d.tempId === tempId ? { ...d, [field]: value } : d))
    );
  };

  const removeBulkDraft = (tempId: string) => {
    setBulkDrafts((prev) => prev.filter((d) => d.tempId !== tempId));
  };

  const handleSaveAllBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bulkDrafts.length === 0) return;
    setSavingBulk(true);
    try {
      let nextOrder = certifications.length + 1;
      for (const draft of bulkDrafts) {
        await saveCertification({
          id: draft.tempId,
          title: draft.title.trim() || 'Professional Certification',
          issuer: draft.issuer.trim() || 'Verified Issuer',
          imageUrl: draft.imageUrl,
          issuerLogo: draft.imageUrl,
          category: draft.category,
          date: draft.date,
          issueDate: draft.date,
          skills: [draft.category],
          description: `Verified ${draft.category} credential issued by ${draft.issuer}.`,
          status: 'Verified',
          order: nextOrder,
          display_order: nextOrder,
        });
        nextOrder += 1;
      }
      const count = bulkDrafts.length;
      setBulkDrafts([]);
      showToast(`Published ${count} certification(s) to the Homepage Slideshow!`);
    } finally {
      setSavingBulk(false);
    }
  };

  const openCreateModal = () => {
    setEditingCert(null);
    setTitle('');
    setIssuer('DataCamp');
    setCategory('Machine Learning');
    setDate(new Date().getFullYear().toString());
    setCredentialId(`DC-${Math.floor(100000 + Math.random() * 900000)}`);
    setVerificationUrl('');
    setSkillsStr('Python, Predictive Modeling, Machine Learning');
    setDescription('Credential verifying rigorous practical assessment in applied engineering.');
    setStatus('Verified');
    setOrder(certifications.length + 1);
    setImageUrl('');
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

  const openEditModal = (cert: any) => {
    setEditingCert(cert);
    setTitle(cert.title || '');
    setIssuer(cert.issuer || '');
    setCategory(cert.category || 'Data Analytics');
    setDate(cert.date || cert.issueDate || '2024');
    setCredentialId(cert.credentialId || '');
    setVerificationUrl(cert.verificationUrl || '');
    setSkillsStr((cert.skills || []).join(', '));
    setDescription(cert.description || '');
    setStatus(cert.status === 'In Progress' ? 'In Progress' : 'Verified');
    setOrder(cert.order ?? cert.display_order ?? 1);
    setImageUrl(cert.imageUrl || cert.issuerLogo || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingCert ? editingCert.id : `cert-${Date.now()}`;
    const skills = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedCert: any = {
      id,
      title,
      issuer,
      imageUrl: imageUrl || undefined,
      issuerLogo: imageUrl || undefined,
      category,
      date,
      issueDate: date,
      credentialId: credentialId || undefined,
      verificationUrl: verificationUrl || undefined,
      skills,
      description: description || 'Credential verifying applied engineering competence.',
      status,
      order: Number(order),
      display_order: Number(order),
    };

    await saveCertification(updatedCert);
    setIsModalOpen(false);
    showToast(`Certification "${title}" saved successfully.`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete credential "${name}"?`)) {
      await deleteCertification(id);
      showToast(`Credential "${name}" deleted.`);
    }
  };

  const filteredCerts = certifications
    .filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'all' ||
        c.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort(
      (a: any, b: any) =>
        (a.order ?? a.display_order ?? 0) - (b.order ?? b.display_order ?? 0)
    );

  const categories = Array.from(new Set(certifications.map((c) => c.category)));
  const certsWithImages = certifications.filter((c) => Boolean(c.imageUrl || c.issuerLogo)).length;

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <AdminNav />

      <main className="w-full pt-24 pb-20 flex-1">
        <div className="max-w-[1400px] mx-auto px-gutter flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs uppercase text-primary font-bold tracking-wider">
                  Academic &amp; Professional Credentials CMS
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs text-on-surface-variant font-mono">
                  {certifications.length} Credentials Live
                </span>
              </div>
              <h1 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Certifications &amp; Accreditations Manager
              </h1>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-lg shadow-primary/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Single Credential</span>
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
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMsg}</span>
            </motion.div>
          )}

          {/* Metric Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                Total Accreditations
              </span>
              <span className="font-display-xl text-3xl font-bold text-on-surface">
                {certifications.length}
              </span>
              <span className="text-[11px] text-primary font-mono block mt-1">
                Displayed on Homepage
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                With Uploaded Images
              </span>
              <span className="font-display-xl text-3xl font-bold text-secondary">
                {certsWithImages}
              </span>
              <span className="text-[11px] text-secondary font-mono block mt-1">
                Shown in Slideshow
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                Issuing Bodies
              </span>
              <span className="font-display-xl text-3xl font-bold text-tertiary">
                {new Set(certifications.map((c) => c.issuer)).size}
              </span>
              <span className="text-[11px] text-tertiary font-mono block mt-1">
                DataCamp, Cisco, IBM, ITI
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                Academic Degrees
              </span>
              <span className="font-display-xl text-3xl font-bold text-primary-fixed">
                {certifications.filter((c) => c.category.includes('Academic')).length}
              </span>
              <span className="text-[11px] text-primary-fixed font-mono block mt-1">
                Bachelor&apos;s &amp; Master&apos;s BIS
              </span>
            </div>
          </div>

          {/* BULK CERTIFICATION IMAGE UPLOAD FORM */}
          <div className="rounded-3xl bg-surface-container-low/80 border border-primary/30 p-6 sm:p-7 shadow-lg backdrop-blur-md flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Bulk Certificate Image Uploader</span>
                </div>
                <h2 className="font-display-xl text-lg sm:text-xl font-bold text-on-surface mt-0.5">
                  Upload All Your Certification Images for the Homepage Slideshow
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Select or drag &amp; drop multiple certificate images (PNG, JPG, WebP) at once. Titles are auto-filled from file names and can be edited before publishing.
                </p>
              </div>
            </div>

            {/* Default Metadata for Bulk Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono uppercase text-on-surface-variant">
                  Default Issuer
                </label>
                <input
                  type="text"
                  value={defaultBulkIssuer}
                  onChange={(e) => setDefaultBulkIssuer(e.target.value)}
                  placeholder="e.g. DataCamp, Coursera, IBM"
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono uppercase text-on-surface-variant">
                  Default Category
                </label>
                <select
                  value={defaultBulkCategory}
                  onChange={(e) => setDefaultBulkCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Cloud & Big Data">Cloud &amp; Big Data</option>
                  <option value="Academic">Academic</option>
                  <option value="Marketing Ops">Marketing Ops</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono uppercase text-on-surface-variant">
                  Default Issue Year
                </label>
                <input
                  type="text"
                  value={defaultBulkDate}
                  onChange={(e) => setDefaultBulkDate(e.target.value)}
                  placeholder="e.g. 2025"
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingBulk(true);
              }}
              onDragLeave={() => setIsDraggingBulk(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingBulk(false);
                if (e.dataTransfer.files?.length) {
                  handleBulkFiles(e.dataTransfer.files);
                }
              }}
              onClick={() => bulkInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all flex flex-col items-center justify-center gap-3 ${
                isDraggingBulk
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : 'border-outline-variant/40 bg-surface-container-lowest/60 hover:border-primary/60 hover:bg-surface-container-lowest'
              }`}
            >
              <input
                ref={bulkInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    handleBulkFiles(e.target.files);
                    e.target.value = '';
                  }
                }}
              />
              {uploadingBulk ? (
                <>
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-sm font-semibold text-on-surface">
                    Uploading certificate images...
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">
                      Click to select certification images or drag &amp; drop them here
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Supports multiple PNG, JPG, or WebP files (up to 10MB each)
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Uploaded Drafts Review Queue */}
            {bulkDrafts.length > 0 && (
              <form onSubmit={handleSaveAllBulk} className="flex flex-col gap-4 pt-2 border-t border-surface-container-high">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-secondary">
                    {bulkDrafts.length} Certificate Image(s) Ready to Publish
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBulkDrafts([])}
                      className="px-3 py-1.5 rounded-xl bg-surface-container-high text-xs text-on-surface-variant hover:text-on-surface"
                    >
                      Clear All
                    </button>
                    <button
                      type="submit"
                      disabled={savingBulk}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:opacity-90 shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
                    >
                      {savingBulk ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>
                        {savingBulk
                          ? 'Publishing...'
                          : `Save All (${bulkDrafts.length}) to Homepage Slideshow`}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bulkDrafts.map((draft) => (
                    <div
                      key={draft.tempId}
                      className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-[16/10] bg-surface-container-high overflow-hidden">
                        <img
                          src={draft.imageUrl}
                          alt={draft.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeBulkDraft(draft.tempId)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 text-error hover:bg-error hover:text-on-error transition-colors"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3.5 flex flex-col gap-2.5">
                        <input
                          type="text"
                          required
                          value={draft.title}
                          onChange={(e) => updateBulkDraft(draft.tempId, 'title', e.target.value)}
                          placeholder="Certificate Title"
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            value={draft.issuer}
                            onChange={(e) => updateBulkDraft(draft.tempId, 'issuer', e.target.value)}
                            placeholder="Issuer"
                            className="px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-[11px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <input
                            type="text"
                            value={draft.date}
                            onChange={(e) => updateBulkDraft(draft.tempId, 'date', e.target.value)}
                            placeholder="Year"
                            className="px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-[11px] font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <select
                          value={draft.category}
                          onChange={(e) => updateBulkDraft(draft.tempId, 'category', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-[11px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="Cloud & Big Data">Cloud &amp; Big Data</option>
                          <option value="Academic">Academic</option>
                          <option value="Marketing Ops">Marketing Ops</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            )}
          </div>

          {/* Search & Filters */}
          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search credential, issuer, or skill tag..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All ({certifications.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-surface-container-highest text-on-surface border border-primary/40 font-bold'
                      : 'bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Certifications Table */}
          <div className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-x-auto shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-high text-on-surface-variant uppercase text-[10px] font-mono">
                <tr>
                  <th className="p-4">Sort</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title &amp; Credential</th>
                  <th className="p-4">Issuer</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40 font-mono">
                {filteredCerts.map((cert) => {
                  const thumb = cert.imageUrl || cert.issuerLogo;
                  return (
                    <tr key={cert.id} className="hover:bg-surface-container-high/20 transition-colors">
                      <td className="p-4 text-on-surface-variant font-bold text-center w-12">
                        #{(cert as any).order ?? (cert as any).display_order ?? 1}
                      </td>
                      <td className="p-4 w-24">
                        {thumb ? (
                          <div className="w-20 h-12 rounded-lg overflow-hidden border border-primary/30 bg-surface-container-lowest">
                            <img
                              src={thumb}
                              alt={cert.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-12 rounded-lg border border-dashed border-outline-variant/40 bg-surface-container-high/40 flex items-center justify-center text-on-surface-variant/50">
                            <FileBadge2 className="w-4 h-4" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-on-surface max-w-sm">
                        <div className="font-nexa font-bold text-sm text-on-surface">{cert.title}</div>
                        {cert.credentialId && (
                          <div className="text-[11px] text-primary mt-0.5">ID: {cert.credentialId}</div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {cert.skills.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded bg-surface-container-high text-[9px] text-on-surface-variant"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-secondary font-semibold">{cert.issuer}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px]">
                          {cert.category}
                        </span>
                      </td>
                      <td className="p-4 text-on-surface-variant">{(cert as any).date || cert.issueDate}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            (cert.status as any) === 'Verified' || (cert.status as any) === 'Active'
                              ? 'bg-secondary/15 text-secondary'
                              : (cert.status as any) === 'Completed'
                              ? 'bg-primary/15 text-primary'
                              : 'bg-tertiary/15 text-tertiary'
                          }`}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {cert.verificationUrl ? (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-on-surface-variant/50">—</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openEditModal(cert)}
                          className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cert.id, cert.title)}
                          className="px-3 py-1 rounded-lg bg-error-container/20 hover:bg-error hover:text-on-error text-error font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* CREATE / EDIT CERTIFICATION MODAL */}
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
                      {editingCert ? `Edit Credential: ${editingCert.title}` : 'Add New Verified Credential'}
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
                    {/* Certificate Image Uploader */}
                    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30">
                      <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        <span>Certificate Image (Displayed in Homepage Slideshow)</span>
                      </label>

                      {imageUrl ? (
                        <div className="relative rounded-xl overflow-hidden border border-primary/30 bg-surface-container-high aspect-[16/9] max-h-56">
                          <img
                            src={imageUrl}
                            alt={title || 'Certificate preview'}
                            className="w-full h-full object-contain bg-black/20"
                          />
                          <button
                            type="button"
                            onClick={() => setImageUrl('')}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-background/90 text-error hover:bg-error hover:text-on-error transition-colors shadow"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : null}

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-xs font-semibold cursor-pointer transition-colors shrink-0">
                          {uploadingSingle ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>{uploadingSingle ? 'Uploading...' : 'Upload Image'}</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            onChange={handleSingleImageUpload}
                            disabled={uploadingSingle}
                          />
                        </label>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="Or paste image URL (https://...)"
                          className="flex-1 px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Credential Title *</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Associate Data Scientist"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Issuing Organization *</label>
                        <input
                          type="text"
                          required
                          value={issuer}
                          onChange={(e) => setIssuer(e.target.value)}
                          placeholder="e.g. DataCamp, Cisco, IBM"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="Cloud & Big Data">Cloud &amp; Big Data</option>
                          <option value="Academic">Academic</option>
                          <option value="Marketing Ops">Marketing Ops</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Date Issued</label>
                        <input
                          type="text"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder="e.g. 2024 or 2025 – Present"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as 'Verified' | 'In Progress')}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Verified">Verified</option>
                          <option value="In Progress">In Progress</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Credential ID</label>
                        <input
                          type="text"
                          value={credentialId}
                          onChange={(e) => setCredentialId(e.target.value)}
                          placeholder="e.g. DC-789234"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Display Sort Order</label>
                        <input
                          type="number"
                          value={order}
                          onChange={(e) => setOrder(Number(e.target.value))}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Verification Link URL</label>
                      <input
                        type="url"
                        value={verificationUrl}
                        onChange={(e) => setVerificationUrl(e.target.value)}
                        placeholder="https://..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Skills Covered (comma separated)</label>
                      <input
                        type="text"
                        value={skillsStr}
                        onChange={(e) => setSkillsStr(e.target.value)}
                        placeholder="Python, XGBoost, Model Validation, Lakehouse"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Description</label>
                      <textarea
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief summary of what this certification validates..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs uppercase hover:bg-primary hover:text-on-primary shadow-md transition-all"
                      >
                        {editingCert ? 'Save Changes' : 'Publish Credential'}
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
