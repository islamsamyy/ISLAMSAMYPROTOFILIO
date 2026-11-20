'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { TiltCard } from '@/components/ui/TiltCard';
import { usePricing } from '@/lib/hooks';
import { saveReservation } from '@/lib/data-store';
import { PricingPackage } from '@/data/seedPricing';
import { WhatsAppBanner, WhatsAppFloatingButton, WHATSAPP_NUMBER, WHATSAPP_URL, WhatsAppIcon } from '@/components/ui/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export default function BookPage() {
  const { language, t } = useLanguage();
  const { packages, consultationRates, loaded } = usePricing();
  const [bookingMode, setBookingMode] = useState<'packages' | 'consultation'>('packages');

  // Package Form State
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);
  const [pkgClientName, setPkgClientName] = useState('');
  const [pkgClientEmail, setPkgClientEmail] = useState('');
  const [pkgCompany, setPkgCompany] = useState('');
  const [pkgNotes, setPkgNotes] = useState('');

  const dates = useMemo(() => {
    const result: { day: string; num: string; full: string }[] = [];
    const base = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let offset = 1;
    while (result.length < 5) {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + offset);
      offset++;
      if (d.getDay() === 5) continue; // Skip Friday
      result.push({
        day: dayNames[d.getDay()],
        num: String(d.getDate()),
        full: `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
      });
    }
    return result;
  }, []);

  // Consultation Form State
  const [consultDuration, setConsultDuration] = useState<'30' | '60'>('60');
  const [selectedDate, setSelectedDate] = useState(() => dates[0]?.full || 'Next Available Slot');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [selectedTz, setSelectedTz] = useState('Cairo EET (UTC+2)');
  const [consultName, setConsultName] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultCompany, setConsultCompany] = useState('');
  const [consultChallenge, setConsultChallenge] = useState('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    itemName: string;
    type: string;
    date: string;
    time: string;
    email: string;
    meetLink: string;
  } | null>(null);

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;

    const bookingId = `PKG-${Math.floor(1000 + Math.random() * 9000)}`;
    saveReservation({
      id: bookingId,
      type: 'package',
      clientName: pkgClientName,
      clientEmail: pkgClientEmail,
      company: pkgCompany,
      itemName: `${selectedPkg.name} (${selectedPkg.duration})`,
      scheduledDate: 'Flexible Kickoff',
      scheduledTime: 'To be scheduled',
      timezone: 'UTC+2',
      amount: selectedPkg.price,
      status: 'pending',
      notes: pkgNotes,
      meetLink: 'https://meet.google.com/isl-samy-adv',
      createdAt: new Date().toISOString().split('T')[0]
    });

    setConfirmedBooking({
      id: bookingId,
      itemName: selectedPkg.name,
      type: 'Engagement Package',
      date: 'Pending Intake Review',
      time: selectedPkg.duration,
      email: pkgClientEmail,
      meetLink: 'https://meet.google.com/isl-samy-adv'
    });
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingId = `CON-${Math.floor(1000 + Math.random() * 9000)}`;
    const fee = consultDuration === '30' ? (consultationRates?.session30Min || '$90') : (consultationRates?.session60Min || '$150');

    saveReservation({
      id: bookingId,
      type: 'consultation',
      clientName: consultName,
      clientEmail: consultEmail,
      company: consultCompany,
      itemName: `1-on-1 Technical Architecture Advisory (${consultDuration} Mins)`,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      timezone: selectedTz,
      amount: fee,
      status: 'confirmed',
      notes: consultChallenge,
      meetLink: 'https://meet.google.com/isl-samy-adv',
      createdAt: new Date().toISOString().split('T')[0]
    });

    setConfirmedBooking({
      id: bookingId,
      itemName: `${consultDuration}-Min Technical Advisory`,
      type: '1-on-1 Consultation',
      date: selectedDate,
      time: `${selectedTime} (${selectedTz})`,
      email: consultEmail,
      meetLink: 'https://meet.google.com/isl-samy-adv'
    });
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
            <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-primary/30 shadow-[0_0_24px_rgba(160,120,255,0.25)] mb-4 backdrop-blur-xl">
              <span className="material-symbols-outlined text-primary text-base">handshake</span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                {t('book.badge')}
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              {t('book.title')}
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
              {t('book.subtitle')}
            </p>

            {/* Mode Switcher Toggle */}
            <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-surface-container-low/80 dark:bg-surface-container-low/45 backdrop-blur-2xl border border-outline-variant/30 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <button
                onClick={() => setBookingMode('packages')}
                className={`relative px-6 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all ${
                  bookingMode === 'packages'
                    ? 'text-white bg-primary shadow-[0_0_16px_rgba(160,120,255,0.5)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{t('book.packagesTab')}</span>
              </button>
              <button
                onClick={() => setBookingMode('consultation')}
                className={`relative px-6 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all ${
                  bookingMode === 'consultation'
                    ? 'text-white bg-primary shadow-[0_0_16px_rgba(160,120,255,0.5)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{t('book.consultTab')}</span>
              </button>
            </div>
          </motion.div>

          {/* Direct Immediate WhatsApp Contact Banner */}
          <WhatsAppBanner />

          {/* MODE 1: ENGAGEMENT PACKAGES */}
          {bookingMode === 'packages' && (
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {packages.map((pkg) => {
                  const isSelected = selectedPkg?.id === pkg.id;
                  return (
                    <TiltCard key={pkg.id} maxTilt={6} depth={10} glare={true} className="h-full">
                      <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`relative h-full p-6 sm:p-8 rounded-3xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-surface-container-low/70 border-2 border-primary shadow-[0_0_35px_rgba(160,120,255,0.4)]'
                            : 'bg-surface-container-low/40 hover:bg-surface-container-low/65 border-white/20 dark:border-white/[0.08] hover:border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
                        }`}
                      >
                        {/* Top Specular Rim Light */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary/30 to-transparent pointer-events-none rounded-t-3xl" />

                        {pkg.isPopular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary-container font-label-sm text-[10px] font-bold uppercase tracking-wider shadow-md">
                            {t('book.mostRequested')}
                          </div>
                        )}

                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold">
                              {pkg.badge}
                            </span>
                            <span className="font-mono text-xs text-on-surface-variant">
                              {pkg.duration}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-nexa text-xl font-bold text-on-surface">
                              {pkg.name}
                            </h3>
                            <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                              {pkg.headline}
                            </p>
                          </div>

                          <div className="flex items-baseline gap-2 py-4 border-y border-surface-container-high/60">
                            <span className="font-display-xl text-3xl sm:text-4xl font-bold text-primary">
                              {pkg.price}
                            </span>
                            <span className="text-xs text-on-surface-variant font-mono">
                              {pkg.frequency}
                            </span>
                          </div>

                          <ul className="space-y-2 pt-2">
                            {pkg.deliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs text-on-surface leading-relaxed">
                                <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">
                                  check_circle
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedPkg(pkg)}
                          className={`w-full mt-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                            isSelected
                              ? 'bg-primary text-on-primary shadow-[0_0_16px_rgba(208,188,255,0.4)]'
                              : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                          }`}
                        >
                          {isSelected ? t('book.selectedForBooking') : t('book.selectPackage')}
                        </button>
                      </motion.div>
                    </TiltCard>
                  );
                })}
              </div>

              {/* Package Intake Form */}
              {selectedPkg && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 sm:p-10 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] max-w-2xl mx-auto w-full"
                >
                  <div className="flex items-center justify-between pb-5 border-b border-surface-container-high/60 mb-6">
                    <div>
                      <span className="text-xs font-mono text-secondary uppercase font-semibold">
                        {t('book.confirmReservation')}
                      </span>
                      <h3 className="font-nexa text-xl font-bold text-on-surface mt-1">
                        {selectedPkg.name} ({selectedPkg.price})
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedPkg(null)}
                      className="text-xs text-on-surface-variant hover:text-on-surface"
                    >
                      {t('book.changePackage')}
                    </button>
                  </div>

                  <form onSubmit={handlePackageSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-on-surface">{t('book.nameLabel')}</label>
                        <input
                          type="text"
                          required
                          value={pkgClientName}
                          onChange={(e) => setPkgClientName(e.target.value)}
                          placeholder={t('book.namePlaceholder')}
                          className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-on-surface">{t('book.emailLabel')}</label>
                        <input
                          type="email"
                          required
                          value={pkgClientEmail}
                          onChange={(e) => setPkgClientEmail(e.target.value)}
                          placeholder={t('book.emailPlaceholder')}
                          className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-on-surface">{t('book.companyLabel')}</label>
                      <input
                        type="text"
                        required
                        value={pkgCompany}
                        onChange={(e) => setPkgCompany(e.target.value)}
                        placeholder={t('book.companyPlaceholder')}
                        className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-on-surface">{t('book.notesLabel')}</label>
                      <textarea
                        rows={3}
                        value={pkgNotes}
                        onChange={(e) => setPkgNotes(e.target.value)}
                        placeholder={t('book.notesPlaceholder')}
                        className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs sm:text-sm hover:bg-primary hover:text-on-primary shadow-[0_0_24px_rgba(160,120,255,0.4)] transition-all"
                    >
                      {t('book.submitPackage')}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          )}

          {/* MODE 2: 1-ON-1 CONSULTATION */}
          {bookingMode === 'consultation' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Calendar & Time Selector */}
              <div className="lg:col-span-7 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                
                {/* Session Duration Tabs */}
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-high/60">
                  <span className="text-xs font-semibold text-on-surface">{t('book.sessionDuration')}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultDuration('30')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        consultDuration === '30'
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {t('book.mins30')} ({consultationRates?.session30Min || '$90'})
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultDuration('60')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        consultDuration === '60'
                          ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(208,188,255,0.3)]'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {t('book.mins60')} ({consultationRates?.session60Min || '$150'})
                    </button>
                  </div>
                </div>

                {/* Calendar Day Picker */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold text-on-surface">{t('book.selectDate')}</span>
                  <div className="grid grid-cols-5 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.num}
                        type="button"
                        onClick={() => setSelectedDate(d.full)}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center border transition-all ${
                          selectedDate === d.full
                            ? 'bg-primary text-on-primary border-primary shadow-[0_0_16px_rgba(208,188,255,0.4)]'
                            : 'bg-surface-container-lowest border-outline-variant/20 hover:border-primary/40 text-on-surface'
                        }`}
                      >
                        <span className="text-[10px] font-mono opacity-80">{d.day}</span>
                        <span className="text-base font-bold mt-0.5">{d.num}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold text-on-surface">{t('book.selectSlot')}</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(consultationRates?.availableSlots || ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM']).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border ${
                          selectedTime === slot
                            ? 'bg-secondary text-on-secondary border-secondary shadow-[0_0_12px_rgba(123,208,255,0.4)]'
                            : 'bg-surface-container-lowest border-outline-variant/20 hover:border-secondary/40 text-on-surface'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timezone Selector */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-xs font-semibold text-on-surface">{t('book.selectTz')}</span>
                  <select
                    value={selectedTz}
                    onChange={(e) => setSelectedTz(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {(consultationRates?.availableTimezones || ['Cairo EET (UTC+2)', 'London GMT (UTC+0)', 'New York EST (UTC-5)']).map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Intake & Instant Dispatch */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col gap-5">
                <div className="border-b border-surface-container-high/60 pb-4">
                  <span className="text-xs font-mono text-secondary uppercase font-semibold">
                    {t('book.liveDossier')}
                  </span>
                  <h3 className="font-nexa text-lg font-bold text-on-surface mt-1">
                    {selectedDate} @ {selectedTime}
                  </h3>
                  <span className="text-xs text-on-surface-variant font-mono">
                    {consultDuration} Mins &bull; {selectedTz}
                  </span>
                </div>

                <form onSubmit={handleConsultSubmit} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-on-surface">{t('book.nameLabel')}</label>
                    <input
                      type="text"
                      required
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      placeholder={t('book.namePlaceholder')}
                      className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-on-surface">{t('book.emailLabel')}</label>
                    <input
                      type="email"
                      required
                      value={consultEmail}
                      onChange={(e) => setConsultEmail(e.target.value)}
                      placeholder={t('book.emailPlaceholder')}
                      className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-on-surface">{t('book.companyLabel')}</label>
                    <input
                      type="text"
                      required
                      value={consultCompany}
                      onChange={(e) => setConsultCompany(e.target.value)}
                      placeholder={t('book.companyPlaceholder')}
                      className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-on-surface">{t('book.agendaLabel')}</label>
                    <textarea
                      rows={2}
                      value={consultChallenge}
                      onChange={(e) => setConsultChallenge(e.target.value)}
                      placeholder={t('book.agendaPlaceholder')}
                      className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary/90 shadow-[0_0_24px_rgba(160,120,255,0.4)] transition-all"
                  >
                    {t('book.confirmConsult')}
                  </button>

                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-on-surface-variant font-mono block mb-2">{t('book.reachDirect')}</span>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>{t('book.instantChat')} {WHATSAPP_NUMBER}</span>
                    </a>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedBooking(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-surface-container-low/95 border border-primary/40 p-8 shadow-2xl z-10 flex flex-col gap-5 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto border border-secondary/30 shadow-[0_0_20px_rgba(123,208,255,0.3)]">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>

              <div>
                <span className="text-xs font-mono text-secondary uppercase font-semibold">
                  {t('book.confirmedBadge')} {confirmedBooking.id}
                </span>
                <h3 className="font-display-xl text-2xl font-bold text-on-surface mt-1">
                  {confirmedBooking.itemName}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-xs space-y-1.5 text-left font-mono">
                <div>Time: <strong className="text-on-surface">{confirmedBooking.time}</strong></div>
                <div>Date: <strong className="text-on-surface">{confirmedBooking.date}</strong></div>
                <div>Recipient: <strong className="text-secondary">{confirmedBooking.email}</strong></div>
                <div>Google Meet: <strong className="text-primary">{confirmedBooking.meetLink}</strong></div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="/my-bookings"
                  className="py-3 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 shadow-md transition-all"
                >
                  {t('book.viewPortal')}
                </a>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="py-2 text-xs text-on-surface-variant hover:text-on-surface"
                >
                  {t('book.closeWindow')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <WhatsAppFloatingButton />
      <SiteFooter />
    </div>
  );
}

