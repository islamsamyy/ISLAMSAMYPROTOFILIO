'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  FileText,
  MessageSquareQuote,
  Calendar,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  TrendingUp,
  Award,
  History,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/lib/hooks';

export interface AdminNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  materialIcon?: string;
}

export const ADMIN_NAV_LINKS: AdminNavItem[] = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, materialIcon: 'dashboard' },
  { href: '/admin/crm', label: 'CRM Pipeline', icon: TrendingUp, materialIcon: 'query_stats' },
  { href: '/admin/certifications', label: 'Certifications', icon: Award, materialIcon: 'verified' },
  { href: '/admin/experience', label: 'Experience', icon: History, materialIcon: 'history_edu' },
  { href: '/admin/blog', label: 'Blog CMS', icon: FileText, materialIcon: 'edit_note' },
  { href: '/admin/projects', label: 'Projects & Logos', icon: Briefcase, materialIcon: 'deployed_code' },
  { href: '/admin/pricing', label: 'Pricing & Packages', icon: CreditCard, materialIcon: 'payments' },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquareQuote, materialIcon: 'reviews' },
  { href: '/admin/reservations', label: 'Reservations', icon: Calendar, materialIcon: 'calendar_month' },
];

export function AdminNav() {
  const pathname = usePathname();
  const { signOut } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  const isRouteActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="h-16 max-w-[1400px] mx-auto px-gutter flex items-center justify-between gap-4">
        
        {/* Brand Link */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/artboard-mark.png"
                alt="Islam Samy"
                className="h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(123,208,255,0.85)] brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-nexa text-xs font-extrabold text-primary tracking-wide uppercase">
                  Islam Samy
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono">/</span>
                <span className="font-headline-sm text-xs font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                  Command Center
                </span>
              </div>
              <span className="text-[10px] font-mono text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Executive Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Admin Navigation Pills */}
        <nav
          aria-label="Admin Navigation"
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface-container-low border border-outline-variant/30"
        >
          {ADMIN_NAV_LINKS.map((item) => {
            const isActive = isRouteActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'text-on-primary-container'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary-container shadow-sm border border-primary/40 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions Cluster */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Integrated Theme Toggle */}
          <ThemeToggle
            className="w-8 h-8"
            aria-label="Toggle visual theme mode"
          />

          {/* Live Public Site Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant/20 transition-all hover:border-primary/40"
            title="View Live Public Portfolio Site"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Public Site</span>
          </Link>

          {/* Logout Link */}
          <Link
            href="/admin/login"
            onClick={async (e) => {
              e.preventDefault();
              await signOut();
              window.location.href = '/admin/login';
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-error-container/20 border border-error/30 text-error hover:bg-error hover:text-on-error transition-all"
            title="Log out of Admin Gateway"
            aria-label="Log out of Admin Gateway"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? 'Close admin navigation menu' : 'Open admin navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="admin-mobile-drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-over Drawer Sheet */}
            <motion.aside
              id="admin-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Admin Navigation Drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-surface-container-lowest border-l border-outline-variant/30 shadow-2xl p-6 flex flex-col justify-between z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/images/artboard-mark.png"
                      alt="Islam Samy"
                      className="h-7 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(123,208,255,0.85)] brightness-110"
                    />
                    <span className="font-headline-sm text-sm font-bold text-on-surface">
                      Admin Navigation
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                    aria-label="Close admin drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1.5" aria-label="Mobile Admin Navigation">
                  {ADMIN_NAV_LINKS.map((item) => {
                    const isActive = isRouteActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all',
                          isActive
                            ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm border border-primary/30'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                        )}
                      >
                        <Icon className={cn('w-4 h-4', isActive ? 'text-primary' : 'text-on-surface-variant')} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-mono text-on-surface-variant">Appearance</span>
                  <ThemeToggle showLabel={true} className="w-auto px-3 py-1.5 rounded-lg h-auto" />
                </div>

                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Return to Live Public Site</span>
                </Link>

                <Link
                  href="/admin/login"
                  onClick={async (e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    await signOut();
                    window.location.href = '/admin/login';
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-error-container/20 border border-error/30 text-error hover:bg-error hover:text-on-error text-xs font-semibold transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out of Command Center</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

// Support both named and default export for 100% compatibility
export default AdminNav;
