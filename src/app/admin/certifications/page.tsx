'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useCertifications } from '@/lib/hooks';
import { saveCertification, deleteCertification } from '@/lib/data-store';
import { CertificationItem } from '@/data/seedCertifications';
import {
  Award,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function AdminCertificationsPage() {
  const { certifications } = useCertifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [category, setCategory] = useState('Machine Learning & AI');
  const [date, setDate] = useState('2024');
  const [credentialId, setCredentialId] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [skillsStr, setSkillsStr] = useState('Python, Scikit-Learn, XGBoost');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Completed' | 'In Progress' | 'Verified'>('Verified');
  const [order, setOrder] = useState(1);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openCreateModal = () => {
    setEditingCert(null);
    setTitle('');
    setIssuer('DataCamp');
    setCategory('Machine Learning & AI');
    setDate('2024');
    setCredentialId(`DC-${Math.floor(100000 + Math.random() * 900000)}`);
    setVerificationUrl('https://www.datacamp.com/statement-of-accomplishment/');
    setSkillsStr('Python, Predictive Modeling, Machine Learning');
    setDescription('Credential verifying rigorous practical assessment in systems architecture.');
    setStatus('Verified');
    setOrder(certifications.length + 1);
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
    setStatus(cert.status || 'Verified');
    setOrder(cert.order ?? cert.display_order ?? 1);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingCert ? editingCert.id : `cert-${Date.now()}`;
    const skills = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);

    const updatedCert: any = {
      id,
      title,
      issuer,
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
      const matchesCategory = selectedCategory === 'all' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => ((a.order ?? a.display_order ?? 0) - (b.order ?? b.display_order ?? 0)));

  const categories = Array.from(new Set(certifications.map((c) => c.category)));

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
                <span className="text-xs text-on-surface-variant font-mono">{certifications.length} Credentials Live</span>
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
              <span>Add Verified Credential</span>
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
                Verified Badges
              </span>
              <span className="font-display-xl text-3xl font-bold text-secondary">
                {certifications.filter((c: any) => c.status === 'Verified' || c.status === 'Active' || c.status === 'Completed').length}
              </span>
              <span className="text-[11px] text-secondary font-mono block mt-1">
                Active &amp; Completed
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
                Bachelor's &amp; Master's BIS
              </span>
            </div>
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
                {filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="p-4 text-on-surface-variant font-bold text-center w-12">
                      #{(cert as any).order ?? (cert as any).display_order ?? 1}
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
                    <td className="p-4 text-right space-x-2">
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
                ))}
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
                          <option value="Machine Learning & AI">Machine Learning & AI</option>
                          <option value="Data Analytics & SQL">Data Analytics & SQL</option>
                          <option value="Academic Degrees">Academic Degrees</option>
                          <option value="Cloud & Architecture">Cloud & Architecture</option>
                          <option value="Business & Finance">Business & Finance</option>
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
                          onChange={(e) => setStatus(e.target.value as any)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
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
