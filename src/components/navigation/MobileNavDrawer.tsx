'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  Layers,
  CreditCard,
  BookOpen,
  Calendar,
  Star,
  UserCheck,
  Shield,
  ExternalLink,
  Globe,
  Compass,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
  labelAr?: string;
  badge?: string;
  badgeAr?: string;
  icon?: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

export const DEFAULT_NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home', labelAr: 'الرئيسية', icon: Home },
  { href: '/projects', label: 'Projects & Case Studies', labelAr: 'المشاريع والأنظمة المنفّذة', badge: '40+', badgeAr: '+40', icon: Layers },
  { href: '/pricing', label: 'Pricing & Packages', labelAr: 'الباقات وضمان العائد', icon: CreditCard },
  { href: '/blog', label: 'Engineering Blog', labelAr: 'المدونة ودراسات الجدوى', badge: 'WireCut OS', badgeAr: 'WireCut OS', icon: BookOpen },
  { href: '/book', label: 'Book ROI Consultation', labelAr: 'احجز استشارة العائد', highlight: true, icon: Calendar },
  { href: '/reviews', label: 'Client Reviews', labelAr: 'شهادات العملاء', icon: Star },
  { href: '/my-bookings', label: 'Client Portal', labelAr: 'بوابة العملاء والمواعيد', icon: UserCheck },
  { href: '/admin', label: 'Admin Command Center', labelAr: 'لوحة التحكم الإدارية', icon: Shield },
];

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks?: NavItem[];
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  navLinks = DEFAULT_NAV_LINKS,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const isAr = language === 'ar';
  const [mounted, setMounted] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key dismiss listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close drawer if window is resized to desktop breakpoint (>= 1024px)
  useEffect(() => {
    if (!isOpen) return;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [isOpen, onClose]);

  // Close drawer only when route actually changes
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (isOpen) onClose();
    }
  }, [pathname, isOpen, onClose]);

  // Touch swipe-to-dismiss gestures (swipe right in LTR, swipe left in RTL)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if ((!isAr && deltaX > 70) || (isAr && deltaX < -70)) {
      onClose();
    }
    touchStartXRef.current = null;
  };

  if (!mounted) return null;

  const slideOffset = isAr ? '-100%' : '100%';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[9999] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? 'قائمة التنقل الجانبية' : 'Mobile Navigation Menu'}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Slide-over Side Menu Drawer */}
          <motion.aside
            initial={{ x: slideOffset }}
            animate={{ x: 0 }}
            exit={{ x: slideOffset }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={cn(
              'relative z-10 flex flex-col justify-between w-[86vw] sm:w-[380px] max-w-[400px] h-full bg-[#0a0d18]/98 text-zinc-100 backdrop-blur-2xl shadow-[-10px_0_40px_rgba(0,0,0,0.85)] overflow-y-auto',
              isAr ? 'border-r border-white/10' : 'border-l border-white/10'
            )}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 group min-w-0">
                <div className="relative flex items-center justify-center shrink-0">
                  <img
                    src="/images/artboard-mark.png"
                    alt="Islam Samy"
                    className="h-9 w-auto object-contain filter drop-shadow-[0_0_14px_rgba(123,208,255,0.9)] brightness-110"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-nexa text-base font-extrabold text-white group-hover:text-primary transition-colors truncate">
                    {t('header.name', 'Islam Samy')}
                  </span>
                  <span className="text-[10px] text-secondary font-medium tracking-wide truncate">
                    {t('header.role', 'Data Engineer & ERP Systems Architect')}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label={isAr ? 'إغلاق القائمة' : 'Close navigation menu'}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-200 hover:text-white transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 px-4 sm:px-5 py-4 flex flex-col gap-4">
              {/* All Pages Navigation Links */}
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 px-1">
                {isAr ? 'صفحات المنصة' : 'Pages & Navigation'}
              </div>
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : item.href.startsWith('/#')
                      ? pathname === '/'
                      : pathname === item.href || pathname.startsWith(item.href + '/');

                  const Icon = item.icon;
                  const displayLabel = isAr && item.labelAr ? item.labelAr : item.label;
                  const displayBadge = isAr && item.badgeAr ? item.badgeAr : item.badge;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all min-h-[46px]',
                        isActive
                          ? 'bg-primary/20 text-white border border-primary/40 font-semibold shadow-sm'
                          : 'text-zinc-200 hover:text-white hover:bg-white/[0.07] border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {Icon && (
                          <Icon
                            className={cn(
                              'w-4 h-4 shrink-0',
                              isActive ? 'text-primary' : 'text-zinc-400'
                            )}
                          />
                        )}
                        <span className="truncate">{displayLabel}</span>
                      </div>
                      {displayBadge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-secondary border border-secondary/30 font-bold shrink-0">
                          {displayBadge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Homepage Sections */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 px-1 mb-2">
                  <Compass className="w-3 h-3 text-secondary" />
                  <span>{isAr ? 'أقسام الصفحة الرئيسية' : 'Quick Jump Sections'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { href: '/#operations-research', label: isAr ? 'بحوث العمليات' : 'Operations Research' },
                    { href: '/#project-cards', label: isAr ? 'بطاقات المشاريع' : 'Project Cards' },
                    { href: '/#process', label: isAr ? 'منهجية التنفيذ' : 'Delivery Process' },
                    { href: '/#contact', label: isAr ? 'تواصل مباشر' : 'Direct Contact' },
                  ].map((sec) => (
                    <Link
                      key={sec.href}
                      href={sec.href}
                      onClick={onClose}
                      className="px-2.5 py-2 rounded-lg bg-white/[0.05] hover:bg-primary/20 border border-white/10 text-[11px] font-medium text-zinc-200 hover:text-white text-center transition-colors truncate"
                    >
                      {sec.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Actions Cluster */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                {/* Language Switcher Row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">Language / اللغة</span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {isAr ? 'العربية (RTL)' : 'English (LTR)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    aria-label={t('header.switchAria', isAr ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-secondary text-xs font-bold transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{t('header.switchLanguage', isAr ? 'English' : 'العربية')}</span>
                  </button>
                </div>

                {/* Theme Switcher Row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">
                      {isAr ? 'المظهر' : 'Appearance'}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {resolvedTheme === 'dark' ? 'Cybernetic Dark' : 'High-Contrast Light'}
                    </span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Book Advisory Primary CTA */}
                <Link
                  href="/book"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary text-white font-semibold text-sm shadow-[0_0_18px_rgba(160,120,255,0.4)] transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('header.bookAdvisory', 'Book ROI Consultation')}</span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-black/30 flex flex-col gap-2 text-xs text-zinc-400 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-secondary">
                  {isAr ? 'أنظمة ERP وبحوث العمليات' : 'ERP & Operations Research'}
                </span>
                <span className="text-[10px] text-zinc-500">v2.0</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <a
                  href="https://www.linkedin.com/in/islam-samy-3b72061a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-secondary" />
                </a>
                <span>&bull;</span>
                <a
                  href="https://github.com/islamsamyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-primary" />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default MobileNavDrawer;
