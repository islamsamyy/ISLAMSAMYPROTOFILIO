'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useCrmLeads } from '@/lib/hooks';
import { saveCrmLead, updateCrmStage, deleteCrmLead } from '@/lib/data-store';
import { CrmLead, CrmStage, CrmPriority } from '@/data/seedCrm';
import {
  TrendingUp,
  Plus,
  Search,
  Filter,
  DollarSign,
  Building,
  Mail,
  Phone,
  Calendar,
  Clock,
  ArrowRight,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Layers,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

const STAGES: { id: CrmStage; label: string; color: string; border: string }[] = [
  { id: 'new', label: 'New / Inbound', color: 'text-primary', border: 'border-primary/40' },
  { id: 'discovery', label: 'Discovery & Audit', color: 'text-secondary', border: 'border-secondary/40' },
  { id: 'proposal', label: 'Proposal & Scoping', color: 'text-tertiary', border: 'border-tertiary/40' },
  { id: 'active', label: 'Active Delivery', color: 'text-primary-fixed', border: 'border-primary-fixed/40' },
  { id: 'retained', label: 'Retained Advisory', color: 'text-secondary-fixed', border: 'border-secondary-fixed/40' },
  { id: 'closed', label: 'Closed / Archived', color: 'text-on-surface-variant', border: 'border-surface-container-high' },
];

export default function AdminCrmPage() {
  const { leads } = useCrmLeads();
  const [activeTab, setActiveTab] = useState<'kanban' | 'table'>('kanban');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<CrmLead | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dealValue, setDealValue] = useState(12000);
  const [stage, setStage] = useState<CrmStage>('new');
  const [priority, setPriority] = useState<CrmPriority>('high');
  const [source, setSource] = useState('Direct Inbound');
  const [notes, setNotes] = useState('');
  const [techInterestsStr, setTechInterestsStr] = useState('Machine Learning, Power BI');
  const [nextFollowUp, setNextFollowUp] = useState('2026-11-20');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setCompany('');
    setContactName('');
    setEmail('');
    setPhone('');
    setDealValue(10000);
    setStage('new');
    setPriority('medium');
    setSource('Direct Advisory Booking');
    setNotes('');
    setTechInterestsStr('Lakehouse Architecture, Python, DAX');
    setNextFollowUp('2026-11-25');
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

  const openEditModal = (lead: CrmLead) => {
    setEditingLead(lead);
    setCompany(lead.company || '');
    setContactName(lead.contactName || lead.clientName || '');
    setEmail(lead.email || '');
    setPhone(lead.phone || '');
    setDealValue(lead.dealValue || 0);
    setStage(lead.stage || 'new');
    setPriority((lead.priority ? lead.priority.toLowerCase() : 'medium') as any);
    setSource(lead.source || 'Website Intake');
    setNotes(lead.notes || lead.requirements || '');
    setTechInterestsStr(((lead.techInterests && lead.techInterests.length > 0) ? lead.techInterests : [lead.engagementType || 'Data Systems']).join(', '));
    setNextFollowUp(lead.nextFollowUp || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingLead ? editingLead.id : `crm-${Date.now()}`;
    const techInterests = techInterestsStr.split(',').map((s) => s.trim()).filter(Boolean);

    const leadData: any = {
      id,
      company,
      contactName,
      email,
      phone: phone || undefined,
      dealValue: Number(dealValue),
      stage,
      priority,
      source: source as any,
      notes,
      techInterests,
      nextFollowUp: nextFollowUp || undefined,
      createdAt: editingLead ? editingLead.createdAt : new Date().toISOString().split('T')[0],
      activityLog: editingLead ? (editingLead as any).activityLog : [
        {
          id: `act-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'note',
          summary: 'Opportunity created in executive CRM pipeline',
        },
      ],
    };

    await saveCrmLead(leadData);
    setIsModalOpen(false);
    showToast(`Lead "${company}" saved successfully.`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete lead "${name}"?`)) {
      await deleteCrmLead(id);
      showToast(`Lead "${name}" deleted.`);
    }
  };

  const handleAdvanceStage = async (lead: CrmLead, next: CrmStage) => {
    await updateCrmStage(lead.id, next);
    showToast(`Moved "${lead.company}" to ${next.toUpperCase()}`);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const contact = (lead.contactName || lead.clientName || '').toLowerCase();
    const comp = (lead.company || '').toLowerCase();
    const em = (lead.email || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = comp.includes(q) || contact.includes(q) || em.includes(q);
    const matchesStage = selectedStage === 'all' || lead.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  // Analytics Metrics
  const totalValue = leads.reduce((acc, curr) => acc + (curr.stage !== 'closed' ? Number(curr.dealValue || 0) : 0), 0);
  const activeCount = leads.filter((l) => l.stage === 'active' || l.stage === 'retained').length;
  const highPriorityCount = leads.filter((l) => String(l.priority).toLowerCase() === 'high').length;

  const exportCsv = () => {
    const headers = ['ID', 'Company', 'Contact', 'Email', 'Phone', 'Deal Value ($)', 'Stage', 'Priority', 'Source'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.company}"`,
      `"${l.contactName}"`,
      l.email,
      l.phone || '',
      l.dealValue,
      l.stage,
      l.priority,
      `"${l.source}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `islam_samy_crm_pipeline_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported pipeline to CSV successfully.');
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <AdminNav />

      <main className="w-full pt-24 pb-20 flex-1">
        <div className="max-w-[1440px] mx-auto px-gutter flex flex-col gap-8">
          
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]" />
                <span className="font-mono text-xs uppercase text-secondary font-bold tracking-wider">
                  Executive CRM &amp; Deal Pipeline
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs text-on-surface-variant font-mono">{leads.length} Active Accounts</span>
              </div>
              <h1 className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                Client Deal &amp; Engagement Pipeline
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant/30 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-secondary" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-lg shadow-primary/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Account</span>
              </button>
            </div>
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
              <div className="flex items-center justify-between mb-2 text-primary">
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Pipeline Value
                </span>
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface">
                ${totalValue.toLocaleString()}
              </span>
              <span className="text-[11px] text-primary font-mono block mt-1">
                Active &amp; Retained Deals
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2 text-secondary">
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Active Engagements
                </span>
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface">
                {activeCount}
              </span>
              <span className="text-[11px] text-secondary font-mono block mt-1">
                Currently Delivering / SLA
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2 text-tertiary">
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  High Priority
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface">
                {highPriorityCount}
              </span>
              <span className="text-[11px] text-tertiary font-mono block mt-1">
                Requires Same-Week Action
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2 text-primary-fixed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Avg Deal Size
                </span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-display-xl text-2xl sm:text-3xl font-bold text-on-surface">
                ${leads.length > 0 ? Math.round(totalValue / leads.length).toLocaleString() : 0}
              </span>
              <span className="text-[11px] text-on-surface-variant font-mono block mt-1">
                Enterprise &amp; Sprint Contracts
              </span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company, contact, or email..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Stage Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setSelectedStage('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedStage === 'all'
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All ({leads.length})
              </button>
              {STAGES.map((s) => {
                const count = leads.filter((l) => l.stage === s.id).length;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStage(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                      selectedStage === s.id
                        ? 'bg-surface-container-highest text-on-surface border border-primary/40 font-bold'
                        : 'bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {s.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-surface-container-high/60 p-1 rounded-xl self-end md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('kanban')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'kanban'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Kanban
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'table'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Table
              </button>
            </div>
          </div>

          {/* KANBAN BOARD VIEW */}
          {activeTab === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
              {STAGES.filter((s) => s.id !== 'closed').map((st) => {
                const stageLeads = filteredLeads.filter((l) => l.stage === st.id);
                const stageSum = stageLeads.reduce((acc, c) => acc + c.dealValue, 0);

                return (
                  <div
                    key={st.id}
                    className="flex flex-col gap-3 p-3.5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 min-h-[500px]"
                  >
                    {/* Stage Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-surface-container-high/60">
                      <div>
                        <h3 className={`font-mono text-xs font-bold ${st.color}`}>
                          {st.label}
                        </h3>
                        <span className="text-[11px] font-mono text-on-surface-variant">
                          ${stageSum.toLocaleString()} • {stageLeads.length}
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
                    </div>

                    {/* Stage Cards */}
                    <div className="flex flex-col gap-3">
                      {stageLeads.map((lead) => (
                        <motion.div
                          key={lead.id}
                          layout
                          className="p-4 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 hover:border-primary/50 shadow-md transition-all flex flex-col gap-3 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-nexa font-extrabold text-sm text-on-surface block">
                                {lead.company}
                              </span>
                              <span className="text-xs text-on-surface-variant">
                                {lead.contactName || lead.clientName}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                String(lead.priority).toLowerCase() === 'high'
                                  ? 'bg-error-container/20 text-error'
                                  : String(lead.priority).toLowerCase() === 'medium'
                                  ? 'bg-tertiary/15 text-tertiary'
                                  : 'bg-surface-container-high text-on-surface-variant'
                              }`}
                            >
                              {lead.priority}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-primary font-bold text-sm">
                              ${lead.dealValue.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-on-surface-variant">
                              {lead.source}
                            </span>
                          </div>

                          {/* Tech Interest Badges */}
                          <div className="flex flex-wrap gap-1">
                            {(lead.techInterests || [lead.engagementType || 'Data Systems']).slice(0, 2).map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-surface-container-high/60 text-[10px] font-mono text-on-surface-variant"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Action Toolbar */}
                          <div className="pt-2 border-t border-surface-container-high/40 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditModal(lead)}
                                className="p-1 rounded text-on-surface-variant hover:text-primary transition-colors"
                                title="Edit Lead"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(lead.id, lead.company)}
                                className="p-1 rounded text-on-surface-variant hover:text-error transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Advance Stage Dropdown / Shortcut */}
                            <select
                              value={lead.stage}
                              onChange={(e) => handleAdvanceStage(lead, e.target.value as CrmStage)}
                              className="px-2 py-1 rounded bg-surface-container-high text-[11px] font-mono text-on-surface border border-outline-variant/30 focus:outline-none"
                            >
                              {STAGES.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      ))}

                      {stageLeads.length === 0 && (
                        <div className="p-6 text-center text-on-surface-variant/60 font-mono text-xs border border-dashed border-surface-container-high rounded-xl">
                          No deals in this stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-high text-on-surface-variant uppercase text-[10px] font-mono">
                  <tr>
                    <th className="p-4">Company</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Deal Value</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Next Action</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/40 font-mono">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-surface-container-high/20 transition-colors">
                      <td className="p-4 font-semibold text-on-surface">
                        <div className="font-nexa text-sm">{lead.company}</div>
                        <div className="text-[11px] text-on-surface-variant">{lead.email}</div>
                      </td>
                      <td className="p-4 text-on-surface">
                        <div>{lead.contactName || lead.clientName}</div>
                        {lead.phone && <div className="text-[11px] text-on-surface-variant">{lead.phone}</div>}
                      </td>
                      <td className="p-4 font-bold text-primary">
                        ${Number(lead.dealValue || 0).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/40 text-[11px] text-on-surface">
                          {lead.stage.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            String(lead.priority).toLowerCase() === 'high'
                              ? 'bg-error-container/20 text-error'
                              : String(lead.priority).toLowerCase() === 'medium'
                              ? 'bg-tertiary/15 text-tertiary'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="p-4 text-on-surface-variant">{lead.source}</td>
                      <td className="p-4 text-on-surface-variant">
                        {lead.nextFollowUp || '—'}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(lead)}
                          className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id, lead.company)}
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
          )}

          {/* CREATE / EDIT LEAD MODAL */}
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
                      {editingLead ? `Edit Account: ${editingLead.company}` : 'Create New CRM Deal & Lead'}
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
                        <label className="text-xs font-semibold text-on-surface">Company / Enterprise *</label>
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Safir Hospitality or FinTech Corp"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Contact Person *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Omar El-Sherif"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@company.com"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+20 100 000 0000"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Deal Value ($ USD) *</label>
                        <input
                          type="number"
                          required
                          value={dealValue}
                          onChange={(e) => setDealValue(Number(e.target.value))}
                          placeholder="10000"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Pipeline Stage</label>
                        <select
                          value={stage}
                          onChange={(e) => setStage(e.target.value as CrmStage)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Priority</label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value as CrmPriority)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="high">High (Sprint Urgent)</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low (Nurture)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Lead Source</label>
                        <input
                          type="text"
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                          placeholder="e.g. LinkedIn Outreach, Advisory Booking"
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Next Follow-up Date</label>
                        <input
                          type="date"
                          value={nextFollowUp}
                          onChange={(e) => setNextFollowUp(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Technologies / Services Discussed</label>
                      <input
                        type="text"
                        value={techInterestsStr}
                        onChange={(e) => setTechInterestsStr(e.target.value)}
                        placeholder="Python, Spark, Power BI, Lakehouse, OPERA PMS"
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Requirements &amp; Discovery Notes</label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Project requirements, budget constraints, expected go-live date..."
                        className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs uppercase hover:bg-primary hover:text-on-primary shadow-md transition-all"
                      >
                        {editingLead ? 'Update Deal' : 'Create Deal in Pipeline'}
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
