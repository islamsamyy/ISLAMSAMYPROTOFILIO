'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Format a Date object into Cairo time (Africa/Cairo) in 24h HH:MM EET format.
 */
export function formatCairoTime(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${formatter.format(date)} EET`;
  } catch {
    // Robust fallback for environments without IANA Africa/Cairo support (UTC+2)
    const utcHours = date.getUTCHours();
    const utcMins = date.getUTCMinutes();
    const cairoHours = (utcHours + 2) % 24;
    return `${String(cairoHours).padStart(2, '0')}:${String(utcMins).padStart(2, '0')} EET`;
  }
}

export interface CairoTelemetryProps {
  className?: string;
  showStatus?: boolean;
  showPulse?: boolean;
}

export function CairoTelemetry({
  className,
  showStatus = true,
  showPulse = true,
}: CairoTelemetryProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [cairoTime, setCairoTime] = useState<string>('--:-- EET');

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setCairoTime(formatCairoTime(new Date()));
    };
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-secondary/20 shadow-sm font-mono text-[11px] text-on-surface-variant select-none transition-colors",
        className
      )}
      title="Live Cairo Telemetry (Africa/Cairo EET UTC+2)"
    >
      {showPulse && (
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </span>
      )}

      <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1.5">
        <span className="text-on-surface font-semibold">Cairo</span>
        <span
          suppressHydrationWarning
          className="text-secondary font-medium tracking-tight font-mono"
        >
          {mounted ? cairoTime : '--:-- EET'}
        </span>
        {showStatus && (
          <>
            <span className="text-outline-variant/60 hidden 2xl:inline" aria-hidden="true">
              •
            </span>
            <span className="text-secondary font-medium hidden 2xl:inline">Accepting Q3/Q4</span>
          </>
        )}
      </span>
    </div>
  );
}

export default CairoTelemetry;
