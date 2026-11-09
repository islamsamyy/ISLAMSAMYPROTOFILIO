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
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/components/theme/ThemeProvider';
import { CairoTelemetry } from './CairoTelemetry';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

export const DEFAULT_NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects & Case Studies', badge: 'Company Logos', icon: Layers },
  { href: '/pricing', label: 'Pricing & Packages', icon: CreditCard },
  { href: '/blog', label: 'Engineering Blog', badge: 'New', icon: BookOpen },
  { href: '/book', label: 'Book Advisory / Package', highlight: true, icon: Calendar },
  { href: '/reviews', label: 'Client Reviews', icon: Star },
  { href: '/my-bookings', label: 'Client Portal Dossier', icon: UserCheck },
  { href: '/admin', label: 'Admin Command Center', icon: Shield },
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
  const [mounted, setMounted] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // SSR hydration safety guard
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
      if (e.key === 'Escape') {
        onClose();
      }
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

  // Close drawer when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Touch swipe-to-dismiss gestures (swipe right to dismiss)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 70) {
      onClose();
    }
    touchStartXRef.current = null;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Slide-over Sheet from Right */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 flex flex-col justify-between w-[85vw] sm:w-[380px] max-w-[420px] h-full bg-[#0a0d18]/98 dark:bg-[#070913]/98 text-zinc-100 backdrop-blur-2xl border-l border-white/10 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
                {/* Transparent Logo without frame, larger size */}
                <div className="relative flex items-center justify-center shrink-0">
                  <img
                    src="/images/artboard-mark.png"
                    alt="Islam Samy"
                    className="h-9 w-auto object-contain filter drop-shadow-[0_0_14px_rgba(123,208,255,0.9)] brightness-110"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-nexa text-base font-extrabold text-white group-hover:text-primary transition-colors">
                    Islam Samy
                  </span>
                  <span className="text-[10px] text-secondary font-medium tracking-wide">
                    Data Engineer &amp; Software Developer
                  </span>
                  <span className="text-[9px] text-zinc-400 font-medium">
                    Business Dev &amp; Performance Marketing
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 px-5 py-4 flex flex-col gap-4">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : item.href.startsWith('/#')
                      ? pathname === '/'
                      : pathname === item.href || pathname.startsWith(item.href + '/');

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px]",
                        isActive
                          ? "bg-primary-container/20 text-primary border border-primary/30 font-semibold shadow-sm"
                          : "text-on-surface hover:text-primary hover:bg-surface-container-high/60 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <Icon
                            className={cn(
                              "w-4 h-4",
                              isActive ? "text-primary" : "text-on-surface-variant"
                            )}
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Actions Cluster */}
              <div className="pt-3 border-t border-surface-container-high/60 flex flex-col gap-3">
                {/* Theme Switcher Row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface">Appearance</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {resolvedTheme === 'dark' ? 'Cybernetic Dark' : 'High-Contrast Light'}
                    </span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Book Advisory Primary CTA */}
                <Link
                  href="/book"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-semibold text-sm shadow-[0_0_16px_rgba(160,120,255,0.3)] hover:bg-primary hover:text-on-primary transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Advisory / Consultation</span>
                </Link>

                {/* Admin Gateway Secondary Link */}
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-xs font-medium border border-outline-variant/20 transition-all min-h-[40px]"
                >
                  <Shield className="w-3.5 h-3.5 text-secondary" />
                  <span>Admin Security Gateway</span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-surface-container-high/60 bg-surface-container-low/40 flex flex-col gap-2.5 text-xs text-on-surface-variant shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-secondary">
                  6 Yrs Exp • Data &amp; Dev
                </span>
                <span className="text-[10px] text-outline">v1.0.0</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <a
                  href="https://www.linkedin.com/in/islam-samy-3b72061a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-on-surface transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-secondary" />
                </a>
                <span>&bull;</span>
                <a
                  href="https://github.com/islam-samy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-on-surface transition-colors"
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
