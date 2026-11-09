'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw, Home, LifeBuoy } from 'lucide-react';

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalErrorBoundary caught exception]:', error);
  }, [error]);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-gutter relative overflow-hidden">
      {/* Background Specular Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-error/10 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl border border-error/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col items-center text-center gap-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-error/15 border border-error/30 text-error flex items-center justify-center shadow-[0_0_24px_rgba(255,100,100,0.3)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase text-error font-bold tracking-wider">
            Runtime Kernel Fault
          </span>
          <h1 className="font-nexa text-2xl sm:text-3xl font-extrabold text-on-surface">
            Execution Interrupted
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            An unhandled state occurred during component lifecycle execution. You can attempt to re-initialize the node or navigate to safe system coordinates.
          </p>
        </div>

        {error?.message && (
          <div className="w-full p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-left overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-on-surface-variant block mb-1">
              Diagnostic Digest:
            </span>
            <code className="text-xs font-mono text-error break-all">
              {error.message}
            </code>
          </div>
        )}

        <div className="flex items-center gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-nexa font-bold text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Re-initialize Node</span>
          </button>

          <Link
            href="/"
            className="py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-all border border-outline-variant/30 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
