import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high/40 shadow-[0_-1px_16px_rgba(0,0,0,0.6)] relative z-20">
      <div className="max-w-[1280px] mx-auto px-gutter py-14 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Identity & Scope */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/artboard-mark.png"
                  alt="Islam Samy"
                  className="h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(123,208,255,0.85)] brightness-110"
                />
              </div>
              <span className="font-headline-sm text-lg text-on-surface font-semibold group-hover:text-primary transition-colors">
                Islam Samy
              </span>
            </Link>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Senior Software Engineer &amp; Solutions Architect with 6 years of enterprise experience specializing in high-throughput distributed architectures, real-time lakehouses, and mission-critical machine learning systems.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
              <span className="font-label-sm text-xs text-secondary font-medium">
                Advisory Openings: Q3/Q4 Available
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-xs text-on-surface tracking-wider uppercase font-semibold text-primary">
              Core Platform
            </span>
            <Link href="/" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Portfolio Home
            </Link>
            <Link href="/projects" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5">
              <span>Projects &amp; Case Studies</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-secondary/10 text-secondary rounded font-bold">Logos</span>
            </Link>
            <Link href="/pricing" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5">
              <span>Pricing &amp; Packages</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-primary/10 text-primary rounded font-bold">Tiered</span>
            </Link>
            <Link href="/blog" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Engineering Blog
            </Link>
            <Link href="/book" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Book Package / Advisory
            </Link>
            <Link href="/reviews" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Client Reviews &amp; Testimonials
            </Link>
            <Link href="/my-bookings" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Client Portal Dossier
            </Link>
          </div>

          {/* Engagement Tracks */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-xs text-on-surface tracking-wider uppercase font-semibold text-secondary">
              Advisory Tracks
            </span>
            <Link href="/book" className="font-body-sm text-xs text-on-surface-variant hover:text-secondary transition-colors">
              Distributed Systems Triage (60m)
            </Link>
            <Link href="/book" className="font-body-sm text-xs text-on-surface-variant hover:text-secondary transition-colors">
              OPERA PMS Lakehouse Scaffolding
            </Link>
            <Link href="/book" className="font-body-sm text-xs text-on-surface-variant hover:text-secondary transition-colors">
              Sub-20ms ML Feature Store Build
            </Link>
            <Link href="/book" className="font-body-sm text-xs text-on-surface-variant hover:text-secondary transition-colors">
              Fractional Staff Architect Retainer
            </Link>
            <Link href="/admin" className="font-body-sm text-xs text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">lock</span>
              <span>Admin Management Hub</span>
            </Link>
          </div>

          {/* Verified Direct Channels */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-xs text-on-surface tracking-wider uppercase font-semibold text-tertiary">
              Verified Direct Channels
            </span>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-sm text-primary">schedule</span>
              <span>Cairo EET (UTC+2) / Global Remote</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-sm text-secondary">shield</span>
              <span>Mutual NDA &amp; Encrypted Meets</span>
            </div>
            <a
              href="https://www.linkedin.com/in/islam-samy-3b72061a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-secondary">open_in_new</span>
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="https://github.com/islam-samy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-primary">code</span>
              <span>GitHub Organization</span>
            </a>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <span>&copy; {new Date().getFullYear()} Islam Samy. All Rights Reserved. Engineered for Precision.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-on-surface cursor-pointer">SLA &amp; Confidentiality</span>
            <span>&bull;</span>
            <span className="hover:text-on-surface cursor-pointer">Security Attestation</span>
            <span>&bull;</span>
            <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
              <span>Admin Console</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

