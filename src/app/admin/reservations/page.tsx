'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminNav } from '@/components/navigation/AdminNav';
import { useReservations } from '@/lib/hooks';
import { saveReservation, updateReservationStatus, deleteReservation } from '@/lib/data-store';
import { BookingReservation } from '@/data/seedReservations';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Video,
  CheckCircle2,
  X,
  Clock,
  Building,
  Mail,
  DollarSign,
  FileText,
} from 'lucide-react';

export default function AdminReservationsPage() {
  const { reservations } = useReservations();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState<BookingReservation | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState<'consultation' | 'package'>('consultation');
  const [itemName, setItemName] = useState('1-on-1 Technical Architecture Advisory');
  const [scheduledDate, setScheduledDate] = useState('Nov 25, 2024');
  const [scheduledTime, setScheduledTime] = useState('11:00 AM');
  const [timezone, setTimezone] = useState('Cairo EET (UTC+2)');
  const [amount, setAmount] = useState('$150');
  const [status, setStatus] = useState<BookingReservation['status']>('confirmed');
  const [notes, setNotes] = useState('');
  const [meetLink, setMeetLink] = useState('https://meet.google.com/isl-samy-adv');

  const showToast = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const filtered = reservations.filter((r) => {
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase()) ||
      r.itemName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openCreateModal = () => {
    setEditingRes(null);
    setClientName('');
    setClientEmail('');
    setCompany('');
    setType('consultation');
    setItemName('1-on-1 Technical Architecture Advisory (60 Mins)');
    setScheduledDate('Nov 28, 2024');
    setScheduledTime('02:00 PM');
    setTimezone('Cairo EET (UTC+2)');
    setAmount('$150');
    setStatus('confirmed');
    setNotes('Strategic discussion on lakehouse migration and CDC ingestion.');
    setMeetLink('https://meet.google.com/isl-samy-adv');
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

  const openEditModal = (res: BookingReservation) => {
    setEditingRes(res);
    setClientName(res.clientName);
    setClientEmail(res.clientEmail);
    setCompany(res.company);
    setType(res.type);
    setItemName(res.itemName);
    setScheduledDate(res.scheduledDate);
    setScheduledTime(res.scheduledTime);
    setTimezone(res.timezone);
    setAmount(res.amount);
    setStatus(res.status);
    setNotes(res.notes || '');
    setMeetLink(res.meetLink || 'https://meet.google.com/isl-samy-adv');
    setIsModalOpen(true);
  };

  const handleSaveReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    const id = editingRes ? editingRes.id : `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const updated: BookingReservation = {
      id,
      type,
      clientName,
      clientEmail,
      company: company || 'Enterprise Client',
      itemName,
      scheduledDate,
      scheduledTime,
      timezone,
      amount: amount.startsWith('$') ? amount : `$${amount}`,
      status,
      notes,
      meetLink: meetLink || 'https://meet.google.com/isl-samy-adv',
      createdAt: editingRes?.createdAt || new Date().toISOString().split('T')[0],
    };

    await saveReservation(updated);
    setIsModalOpen(false);
    showToast(`Reservation "${id}" saved successfully.`);
  };

  const handleStatusChange = async (id: string, newStatus: BookingReservation['status']) => {
    await updateReservationStatus(id, newStatus);
    showToast(`Reservation ${id} updated to "${newStatus}".`);
  };

  const handleDeleteRes = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete reservation ${id} for "${name}"?`)) {
      await deleteReservation(id);
      showToast(`Reservation ${id} deleted.`);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Client Name', 'Email', 'Company', 'Item', 'Date', 'Time', 'Amount', 'Status'];
    const rows = reservations.map((r) => [
      r.id,
      r.type,
      `"${r.clientName}"`,
      r.clientEmail,
      `"${r.company}"`,
      `"${r.itemName}"`,
      r.scheduledDate,
      r.scheduledTime,
      r.amount,
      r.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `islam_samy_reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  Schedule &amp; Advisory Operations
                </span>
                <span className="text-outline-variant">&bull;</span>
                <span className="text-xs text-secondary font-mono">{reservations.length} Total Bookings</span>
              </div>
              <h1 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">
                Reservations &amp; Bookings Console
              </h1>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs border border-outline-variant/30 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Log</span>
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:shadow-[0_0_28px_rgba(160,120,255,0.6)] hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>New Booking Intake</span>
              </button>
            </div>
          </div>

          {actionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>{actionMessage}</span>
            </motion.div>
          )}

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-md">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider transition-all ${
                    filterStatus === st
                      ? 'bg-primary text-white font-bold shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search client, email, item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-sans"
              />
            </div>
          </div>

          {/* Bookings Table */}
          <div className="rounded-3xl bg-surface-container-low/60 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] overflow-x-auto shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-container-high/80 text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-surface-container-high">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Engagement / Track</th>
                  <th className="p-4">Scheduled Slot</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-surface-container-high/30 transition-colors">
                    <td className="p-4 text-primary font-bold">{res.id}</td>
                    <td className="p-4 font-sans">
                      <div className="font-semibold text-on-surface">{res.clientName}</div>
                      <div className="text-[11px] text-on-surface-variant font-mono">
                        {res.clientEmail} &bull; {res.company}
                      </div>
                    </td>
                    <td className="p-4 font-sans text-on-surface max-w-xs">{res.itemName}</td>
                    <td className="p-4">
                      <div className="text-on-surface font-semibold">{res.scheduledDate}</div>
                      <div className="text-[11px] text-secondary">
                        {res.scheduledTime} ({res.timezone})
                      </div>
                    </td>
                    <td className="p-4 text-primary font-bold">{res.amount}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          res.status === 'confirmed'
                            ? 'bg-secondary/20 text-secondary border-secondary/30'
                            : res.status === 'pending'
                            ? 'bg-primary/20 text-primary border-primary/30'
                            : res.status === 'completed'
                            ? 'bg-surface-container-highest text-on-surface border-outline-variant/30'
                            : 'bg-error/20 text-error border-error/30'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5 font-sans whitespace-nowrap">
                      {res.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(res.id, 'confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary font-semibold text-[11px] hover:scale-105 transition-all"
                        >
                          Confirm
                        </button>
                      )}
                      {res.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(res.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-[11px] transition-all"
                        >
                          Complete
                        </button>
                      )}
                      {res.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(res.id, 'cancelled')}
                          className="px-2.5 py-1 rounded-lg bg-error/15 text-error hover:bg-error hover:text-white font-semibold text-[11px] transition-all"
                        >
                          Cancel
                        </button>
                      )}

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => openEditModal(res)}
                        className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface inline-flex items-center justify-center align-middle"
                        title="Edit Booking"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteRes(res.id, res.clientName)}
                        className="p-1.5 rounded-lg bg-error/10 hover:bg-error hover:text-white text-error inline-flex items-center justify-center align-middle"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Video Room */}
                      <a
                        href={res.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-primary text-on-primary inline-flex items-center justify-center align-middle shadow-sm hover:scale-105 transition-transform"
                        title="Launch Google Meet Room"
                      >
                        <Video className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="p-8 text-center text-on-surface-variant font-mono text-xs">
                No matching reservations found.
              </div>
            )}
          </div>

          {/* CREATE / EDIT RESERVATION MODAL */}
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
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-lowest/95 border-2 border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="font-nexa text-xl font-bold text-on-surface">
                        {editingRes ? `Edit Reservation (${editingRes.id})` : 'New Client Advisory Intake'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveReservation} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Client Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tarek Mansour"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Work Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="tarek@company.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Company / Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. Safir Hotels & Resorts"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Booking Type</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value as 'consultation' | 'package')}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="consultation">1-on-1 Consultation Session</option>
                          <option value="package">Milestone Engagement Package</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Engagement Item / Scope Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Enterprise Lakehouse Architecture Advisory"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Date</label>
                        <input
                          type="text"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          placeholder="Nov 25, 2024"
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Time &amp; Zone</label>
                        <input
                          type="text"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          placeholder="11:00 AM"
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Fee Amount</label>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="$150"
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as BookingReservation['status'])}
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface">Google Meet Link</label>
                        <input
                          type="url"
                          value={meetLink}
                          onChange={(e) => setMeetLink(e.target.value)}
                          placeholder="https://meet.google.com/..."
                          className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-on-surface">Meeting Agenda &amp; Technical Notes</label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Context regarding current infrastructure, cloud bottlenecks, target throughput..."
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-nexa font-bold uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        {editingRes ? 'Save Changes' : 'Log Reservation'}
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
