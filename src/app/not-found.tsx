'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
  Layers,
  BookOpen,
  CreditCard,
  ArrowRight,
  ShieldAlert,
  Compass,
} from 'lucide-react';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';

export default function NotFoundPage() {
  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-32 pb-24 flex-1 flex items-center justify-center relative z-10 px-gutter">
        <div className="max-w-2xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Official Crest Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <img
              src="/images/artboard-mark.png"
              alt="Islam Samy"
              className="h-11 w-auto object-contain filter drop-shadow-[0_0_16px_rgba(123,208,255,0.75)] brightness-110"
            />
          </motion.div>

          {/* Cybernetic Error Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error/15 border border-error/30 text-error text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(255,100,100,0.2)]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Error 404 &bull; Node Coordinate Missing</span>
          </motion.div>

          {/* Glitch / Holographic Number */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative select-none my-2"
          >
            <span className="font-nexa text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(160,120,255,0.4)]">
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-nexa text-2xl sm:text-4xl font-extrabold text-on-surface mt-2"
          >
            System Blueprint Relocated or Offline.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-on-surface-variant max-w-md mt-3 leading-relaxed"
          >
            The requested network route or publication is not cataloged in the active registry. Use the navigation launchpad below to re-enter verified telemetry.
          </motion.p>

          {/* Navigational Recovery Launchpad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-10"
          >
            <Link
              href="/"
              className="p-4 rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-high/90 border border-white/15 dark:border-white/[0.08] hover:border-primary/50 transition-all flex items-center justify-between text-left group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-nexa text-sm font-bold text-on-surface block group-hover:text-primary transition-colors">
                    Portfolio Home
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">
                    Executive overview &amp; credentials
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/projects"
              className="p-4 rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-high/90 border border-white/15 dark:border-white/[0.08] hover:border-secondary/50 transition-all flex items-center justify-between text-left group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-nexa text-sm font-bold text-on-surface block group-hover:text-secondary transition-colors">
                    Production Systems
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">
                    Lakehouses &amp; architecture blueprints
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/pricing"
              className="p-4 rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-high/90 border border-white/15 dark:border-white/[0.08] hover:border-tertiary/50 transition-all flex items-center justify-between text-left group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/15 text-tertiary flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-nexa text-sm font-bold text-on-surface block group-hover:text-tertiary transition-colors">
                    Pricing &amp; Packages
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">
                    Transparent milestones &amp; retainers
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-tertiary group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/blog"
              className="p-4 rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-high/90 border border-white/15 dark:border-white/[0.08] hover:border-primary-fixed/50 transition-all flex items-center justify-between text-left group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed/15 text-primary-fixed flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-nexa text-sm font-bold text-on-surface block group-hover:text-primary-fixed transition-colors">
                    Engineering Blog
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">
                    Technical architecture publications
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary-fixed group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
