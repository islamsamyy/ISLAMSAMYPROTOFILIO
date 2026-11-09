'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { CairoTelemetry } from './CairoTelemetry';
import { MobileNavDrawer } from './MobileNavDrawer';
import { cn } from '@/lib/utils';

export interface NavLinkItem {
  href: string;
  label: string;
  badge?: string;
  highlight?: boolean;
}

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/book', label: 'Advisory' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/my-bookings', label: 'Portal' },
];
// Compatibility reference: href: '/#reviews'

function checkIsActive(href: string, pathname: string, currentHash: string): boolean {
  if (href.includes('#')) {
    const [pathPart, hashPart] = href.split('#');
    const targetPath = pathPart || '/';
    return pathname === targetPath && currentHash === `#${hashPart}`;
  }

  if (href === '/') {
    return pathname === '/' && (!currentHash || currentHash === '#');
  }

  if (pathname === href) {
    return true;
  }

  if (pathname.startsWith(`${href}/`)) {
    return true;
  }

  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/60 dark:bg-[#070913]/70 backdrop-blur-2xl border-b border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent backdrop-blur-sm border-b border-white/[0.06]"
      )}
    >
      {/* Top Specular Rim Reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-primary/40 to-transparent pointer-events-none" />

      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 relative z-10">
        
        {/* Brand & Monogram / Official Artboard Crest */}
        <Link
          href="/"
          onClick={() => setCurrentHash('')}
          className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        >
          {/* Transparent Logo Crest without frame */}
          <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/artboard-mark.png"
              alt="Islam Samy"
              className="h-7 sm:h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(123,208,255,0.9)] brightness-110 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-nexa text-sm sm:text-base font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors tracking-tight whitespace-nowrap">
                Islam Samy
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[9px] font-semibold tracking-wider uppercase border border-secondary/30 shadow-[0_0_8px_rgba(123,208,255,0.2)]">
                6 Yrs Exp
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-[10px] leading-tight">
              <span className="font-medium text-zinc-400 dark:text-zinc-400 whitespace-nowrap">
                Data Engineer &amp; Software Developer
              </span>
              <span className="text-[9px] text-zinc-500 dark:text-zinc-500 hidden 2xl:block whitespace-nowrap">
                Business Development &amp; Performance Marketing
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation with Frosted Glass Active Pill (visible from lg: 1024px) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/40 dark:bg-white/[0.04] backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.1] shadow-[0_4px_24px_rgba(0,0,0,0.12)] shrink-0"
        >
          {navLinks.map((item) => {
            const isActive = checkIsActive(item.href, pathname, currentHash);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  if (item.href.includes('#')) {
                    setCurrentHash(item.href.slice(item.href.indexOf('#')));
                  } else {
                    setCurrentHash('');
                  }
                }}
                className={cn(
                  "relative isolate px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap",
                  isActive
                    ? "text-primary font-bold shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium hover:bg-white/30 dark:hover:bg-white/[0.04]"
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 rounded-full bg-white/90 dark:bg-white/[0.12] border border-primary/30 dark:border-primary/40 shadow-[0_2px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(160,120,255,0.35)] -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Live Cairo Telemetry Clock (visible from xl: 1280px) */}
          <CairoTelemetry className="hidden xl:inline-flex" />

          {/* Book Consultation CTA Button */}
          <Link
            href="/book"
            onClick={() => setCurrentHash('')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-white font-nexa font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(160,120,255,0.4)] hover:shadow-[0_0_30px_rgba(123,208,255,0.6)] border border-white/25 backdrop-blur-md transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[15px]">calendar_month</span>
            <span>Book Advisory</span>
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Admin Command Center Link */}
          <Link
            href="/admin"
            title="Admin Command Center"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/40 dark:bg-white/[0.06] hover:bg-white/70 dark:hover:bg-white/[0.14] border border-white/50 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-secondary shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
          >
            <Shield className="w-4 h-4 text-primary" />
          </Link>

          {/* Mobile Menu Trigger (visible on < lg: 1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 dark:bg-white/[0.08] hover:bg-white/20 dark:hover:bg-white/[0.14] border border-white/20 dark:border-white/10 text-zinc-800 dark:text-zinc-100 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm shrink-0"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-zinc-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}

export default SiteHeader;

