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
  Search,
  Plus,
  Command,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { signOut } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCommandOpen(false);
  }, [pathname]);

  // Keyboard shortcuts: Escape & Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (commandOpen) setCommandOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, commandOpen]);

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

  const QUICK_ACTIONS = [
    { label: 'New Enterprise Project', href: '/admin/projects?create=true', tag: 'Create' },
    { label: 'New Pricing Package', href: '/admin/pricing?create=true', tag: 'Create' },
    { label: 'New Engineering Article', href: '/admin/blog?create=true', tag: 'Create' },
    { label: 'New CRM Lead', href: '/admin/crm?create=true', tag: 'Create' },
    { label: 'New Client Review', href: '/admin/reviews?create=true', tag: 'Create' },
    { label: 'View Public Projects Page', href: '/projects', tag: 'Public' },
  ];

  const normalizedQuery = commandQuery.trim().toLowerCase();
  const filteredNav = ADMIN_NAV_LINKS.filter((item) =>
    item.label.toLowerCase().includes(normalizedQuery)
  );
  const filteredQuick = QUICK_ACTIONS.filter((item) =>
    item.label.toLowerCase().includes(normalizedQuery)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-primary/20 shadow-lg">
      <div className="h-16 max-w-[1440px] mx-auto px-gutter flex items-center justify-between gap-3">
        
        {/* Brand Link */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/artboard-mark.png"
                alt="Islam Samy"
                className="h-7 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(123,208,255,0.85)] brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-nexa text-xs font-extrabold text-primary tracking-wide uppercase whitespace-nowrap">
                  Islam Samy
                </span>
                <span className="hidden xl:inline text-[10px] text-on-surface-variant font-mono">/</span>
                <span className="hidden xl:inline font-headline-sm text-xs font-bold text-on-surface leading-tight group-hover:text-primary transition-colors whitespace-nowrap">
                  Command Center
                </span>
              </div>
              <span className="hidden 2xl:flex text-[10px] font-mono text-secondary items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Executive Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Admin Navigation Pills (scrollable without scrollbar for 1024px+ safety) */}
        <nav
          aria-label="Admin Navigation"
          className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-surface-container-low/90 border border-outline-variant/30 overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  'relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 transition-all duration-200',
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
          {/* Quick Command Palette Trigger */}
          <button
            type="button"
            onClick={() => {
              setCommandQuery('');
              setCommandOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-[11px] font-mono border border-outline-variant/30 transition-colors"
            title="Quick Jump & Actions (Ctrl+K / Cmd+K)"
            aria-label="Open admin quick command palette"
          >
            <Search className="w-3.5 h-3.5 text-primary" />
            <span className="hidden xl:inline">Jump</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] text-on-surface-variant border border-outline-variant/30">
              ⌘K
            </kbd>
          </button>

          {/* Integrated Theme Toggle */}
          <ThemeToggle
            className="w-8 h-8"
            aria-label="Toggle visual theme mode"
          />

          {/* Live Public Site Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold border border-outline-variant/20 transition-all hover:border-primary/40 whitespace-nowrap"
            title="View Live Public Portfolio Site"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Live Site</span>
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
      {/* Quick Command Palette Modal (Cmd+K / Ctrl+K) */}
      <AnimatePresence>
        {commandOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Admin Quick Command Palette"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.16 }}
              className="relative w-full max-w-lg rounded-2xl bg-surface-container-low border border-primary/40 shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/20 bg-surface-container-lowest/80">
                <Command className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  placeholder="Jump to admin console or trigger quick create..."
                  className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCommandOpen(false)}
                  className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-mono text-on-surface-variant hover:text-on-surface"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-3 flex flex-col gap-3">
                {filteredNav.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">
                      Admin Consoles
                    </span>
                    {filteredNav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={() => {
                            setCommandOpen(false);
                            router.push(item.href);
                          }}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container-high text-left text-xs font-medium text-on-surface transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-primary" />
                            <span>{item.label}</span>
                          </span>
                          <span className="text-[10px] font-mono text-on-surface-variant">{item.href}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {filteredQuick.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">
                      Quick Actions
                    </span>
                    {filteredQuick.map((act) => (
                      <button
                        key={act.href}
                        type="button"
                        onClick={() => {
                          setCommandOpen(false);
                          router.push(act.href);
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container-high text-left text-xs font-medium text-on-surface transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <Plus className="w-4 h-4 text-secondary" />
                          <span>{act.label}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-mono">
                          {act.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {filteredNav.length === 0 && filteredQuick.length === 0 && (
                  <p className="py-6 text-center text-xs text-on-surface-variant font-mono">
                    No matching consoles or actions for &ldquo;{commandQuery}&rdquo;.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Support both named and default export for 100% compatibility
export default AdminNav;
