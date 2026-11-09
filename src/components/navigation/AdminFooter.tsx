import React from 'react';
import Link from 'next/link';

export function AdminFooter() {
  return (
    <footer className="w-full mt-16 border-t border-outline-variant/20 bg-surface-container-lowest/80 py-8 px-gutter">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant font-mono">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 group">
            <img
              src="/images/artboard-mark.png"
              alt="Islam Samy"
              className="h-6 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(123,208,255,0.7)] group-hover:scale-105 transition-transform"
            />
            <span className="font-nexa font-bold text-on-surface group-hover:text-primary transition-colors">
              Islam Samy Command Center
            </span>
          </Link>
          <span className="text-outline-variant">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Cloud Connected
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span>Public Website</span>
            <span className="material-symbols-outlined text-xs">arrow_outward</span>
          </Link>
          <Link href="/admin/crm" className="hover:text-primary transition-colors">CRM Pipeline</Link>
          <Link href="/admin/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="/admin/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <span className="text-outline-variant">•</span>
          <span className="text-on-surface-variant/70">Admin Node v2.5</span>
        </div>
      </div>
    </footer>
  );
}
