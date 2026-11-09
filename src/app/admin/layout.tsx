'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/hooks';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, loading } = useAdminAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAdmin && pathname !== '/admin/login') {
      router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, isAdmin, loading, pathname, router]);

  // Always permit access to the login gateway
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // During SSR or initial hydration on client, render minimal wrapper
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-on-surface">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="font-mono text-xs text-secondary tracking-widest uppercase animate-pulse">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  // If not admin on client, show access-restricted message while redirecting
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-on-surface p-4">
        <div className="p-8 rounded-3xl bg-surface-container-low border border-error/30 flex flex-col items-center gap-4 max-w-sm text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-error/15 border border-error/30 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h2 className="font-headline-sm text-lg font-bold text-on-surface">Admin Access Required</h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            This dashboard is private. Only authorized administrators can access this console.
          </p>
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mt-1" />
          <p className="font-mono text-[11px] text-secondary">
            Redirecting to Admin Security Gateway...
          </p>
        </div>
      </div>
    );
  }

  // Admin authenticated: allow full access to dashboard
  return <>{children}</>;
}
