'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { useReservations } from '@/lib/hooks';
import { updateReservationStatus, saveReservation } from '@/lib/data-store';
import { BookingReservation } from '@/data/seedReservations';

export default function MyBookingsPage() {
  const { reservations, loaded } = useReservations();
  const [searchId, setSearchId] = useState('');
  const [rescheduleTarget, setRescheduleTarget] = useState<BookingReservation | null>(null);
  const [newDate, setNewDate] = useState('Nov 25, 2024');
  const [newTime, setNewTime] = useState('02:00 PM');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredReservations = reservations.filter((r) => {
    if (!searchId.trim()) return true;
    return (
      r.id.toLowerCase().includes(searchId.toLowerCase()) ||
      r.clientEmail.toLowerCase().includes(searchId.toLowerCase()) ||
      r.clientName.toLowerCase().includes(searchId.toLowerCase())
    );
  });

  const activeReservations = filteredReservations.filter((r) => r.status === 'confirmed' || r.status === 'pending');
  const pastReservations = filteredReservations.filter((r) => r.status === 'completed' || r.status === 'cancelled');

  const handleReschedule = () => {
    if (!rescheduleTarget) return;
    saveReservation({
      ...rescheduleTarget,
      scheduledDate: newDate,
      scheduledTime: newTime,
    });
    setActionNotice(`Reschedule successfully recorded for ${rescheduleTarget.id} to ${newDate} @ ${newTime}. Synced with Supabase.`);
    setRescheduleTarget(null);
  };

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[1280px] mx-auto px-gutter flex flex-col gap-10">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-secondary/30 shadow-[0_0_24px_rgba(123,208,255,0.25)] mb-4 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                Client Reservation Hub &bull; Live Telemetry
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              My Bookings &amp; Consultation Dossier
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
              Track your scheduled advisory meetings, download `.ics` calendar credentials, launch encrypted Google Meet rooms, and manage agenda files.
            </p>
          </motion.div>

          {/* Search / Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto w-full relative"
          >
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by Booking ID (e.g. RES-8941) or email..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
            />
          </motion.div>

          {actionNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono text-center max-w-2xl mx-auto w-full"
            >
              {actionNotice}
            </motion.div>
          )}

          {/* ACTIVE CONSULTATION DOSSIER */}
          <div className="flex flex-col gap-6">
            <h2 className="font-nexa text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">event_available</span>
              <span>Active Consultations &amp; Packages</span>
            </h2>

            {activeReservations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeReservations.map((res) => (
                  <motion.div
                    key={res.id}
                    whileHover={{ y: -4 }}
                    className="group relative p-6 sm:p-8 rounded-3xl bg-surface-container-low/40 hover:bg-surface-container-low/65 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(160,120,255,0.3)] transition-all duration-300 flex flex-col justify-between gap-6"
                  >
                    {/* Top Specular Rim Light */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

                    <div className="flex flex-col gap-4">
                      {/* Top Row */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/40 dark:bg-surface-container-high border border-primary/30 text-primary font-mono text-xs font-bold">
                          {res.id}
                        </span>
                        <span
                          className={`px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            res.status === 'confirmed'
                              ? 'bg-secondary/20 text-secondary border border-secondary/30'
                              : 'bg-primary/20 text-primary border border-primary/30'
                          }`}
                        >
                          {res.status}
                        </span>
                      </div>

                      {/* Item Info */}
                      <div>
                        <h3 className="font-nexa text-lg sm:text-xl font-bold text-on-surface">
                          {res.itemName}
                        </h3>
                        <p className="text-xs text-on-surface-variant font-mono mt-1">
                          Client: <strong className="text-on-surface">{res.clientName}</strong> ({res.company})
                        </p>
                      </div>

                      {/* Scheduled Time & Details Box */}
                      <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 flex flex-col gap-1 text-xs font-mono">
                        <div className="text-primary font-bold">
                          {res.scheduledDate} @ {res.scheduledTime}
                        </div>
                        <div className="text-on-surface-variant">
                          Zone: {res.timezone} &bull; Amount: {res.amount}
                        </div>
                        {res.notes && (
                          <div className="text-on-surface-variant text-[11px] mt-1 pt-1 border-t border-surface-container-high">
                            Agenda: &ldquo;{res.notes}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-surface-container-high/60">
                      <a
                        href={res.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-[0_0_16px_rgba(160,120,255,0.4)] transition-all"
                      >
                        <span className="material-symbols-outlined text-base">video_call</span>
                        <span>Launch Google Meet</span>
                      </a>

                      <button
                        onClick={() => setRescheduleTarget(res)}
                        className="px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-all"
                      >
                        Reschedule
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 text-center">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">
                  calendar_today
                </span>
                <p className="text-sm font-semibold text-on-surface">No active bookings found</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Ready to schedule an advisory session or reserve a project milestone?
                </p>
                <a
                  href="/book"
                  className="mt-4 inline-block px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-semibold"
                >
                  Book New Session
                </a>
              </div>
            )}
          </div>

          {/* PAST CONSULTATION ARCHIVE */}
          {pastReservations.length > 0 && (
            <div className="flex flex-col gap-4 pt-6">
              <h3 className="font-headline-sm text-base font-bold text-on-surface-variant">
                Session History &amp; Archived Engagements
              </h3>
              <div className="rounded-2xl bg-surface-container-low/60 border border-outline-variant/20 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-container-high/60 text-on-surface-variant uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">ID</th>
                      <th className="p-3.5">Track / Item</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Fee</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high/40">
                    {pastReservations.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-container-high/30">
                        <td className="p-3.5 text-primary font-bold">{r.id}</td>
                        <td className="p-3.5 text-on-surface">{r.itemName}</td>
                        <td className="p-3.5 text-on-surface-variant">{r.scheduledDate}</td>
                        <td className="p-3.5 text-on-surface">{r.amount}</td>
                        <td className="p-3.5 text-secondary uppercase text-[10px]">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {rescheduleTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRescheduleTarget(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl bg-surface-container-low/95 border border-primary/40 p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-4"
            >
              <h3 className="font-display-xl text-lg font-bold text-on-surface">
                Reschedule Session {rescheduleTarget.id}
              </h3>
              <p className="text-xs text-on-surface-variant">
                Select a revised date and time slot. Our automated calendar dispatcher will verify availability.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface">Target Date</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface">Target Time Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-container-high">
                <button
                  onClick={handleReschedule}
                  className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary hover:text-on-primary shadow-md"
                >
                  Submit Reschedule
                </button>
                <button
                  onClick={() => setRescheduleTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-high text-xs text-on-surface-variant"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}

