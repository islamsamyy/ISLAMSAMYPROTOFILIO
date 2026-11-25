'use client';

import React from 'react';

export const WHATSAPP_NUMBER = '01042472743';
export const WHATSAPP_INTERNATIONAL = '+20 104 247 2743';
export const WHATSAPP_URL = 'https://wa.me/201042472743?text=Hello%20Islam%2C%20I%20would%20like%20to%20discuss%20a%20project%20or%20consultation.';

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex items-center group">
      <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 mr-3 rounded-full bg-surface-container-high/90 text-on-surface backdrop-blur-xl border border-emerald-500/30 text-xs font-mono shadow-[0_8px_32px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-emerald-400">Direct WhatsApp</span>
        <span className="text-on-surface-variant">• {WHATSAPP_NUMBER}</span>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact at 01042472743"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_24px_rgba(16,185,129,0.55)] hover:shadow-[0_0_36px_rgba(16,185,129,0.85)] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping -z-10" />
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </aside>
  );
}

export function WhatsAppBanner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-surface-container-low/70 to-emerald-950/30 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_8px_32px_rgba(16,185,129,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(16,185,129,0.35)]">
          <WhatsAppIcon className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
              Immediate Response
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h3 className="font-nexa text-base sm:text-lg font-bold text-on-surface mt-1">
            Need an Immediate Answer or Prefer Direct Chat?
          </h3>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            Message Islam directly on WhatsApp on{' '}
            <strong className="text-emerald-400 font-mono font-bold">{WHATSAPP_NUMBER}</strong> ({WHATSAPP_INTERNATIONAL}) for urgent architecture requests, scope reviews, or rapid consultation.
          </p>
        </div>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-nexa text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(16,185,129,0.5)] hover:shadow-[0_0_36px_rgba(16,185,129,0.8)] transition-all hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span>Chat on WhatsApp ({WHATSAPP_NUMBER})</span>
      </a>
    </div>
  );
}
