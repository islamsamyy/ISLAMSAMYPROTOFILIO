'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/lib/hooks';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, demoLogin } = useAdminAuth();
  const [identifier, setIdentifier] = useState('islamsamydev@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedPwd = password.trim();
    if (!trimmedPwd) {
      setErrorMsg('Please enter your admin PIN or password.');
      return;
    }

    setLoading(true);

    try {
      const res = await signIn(identifier, trimmedPwd);

      if (res.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect') || '/admin';
        router.push(redirect);
      } else {
        setErrorMsg(res.error || 'Access denied. Invalid credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickUnlock = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await demoLogin();
      if (res.success) {
        router.push('/admin');
      } else {
        router.push('/admin');
      }
    } catch {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-container/15 rounded-full blur-[140px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-surface-container-low/95 backdrop-blur-xl border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col gap-6"
      >
        {/* Gateway Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-container/30 to-secondary/20 border border-primary/40 flex items-center justify-center p-2.5 shadow-[0_0_28px_rgba(160,120,255,0.35)]">
            <img
              src="/images/artboard-mark.png"
              alt="Islam Samy"
              className="h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(123,208,255,0.9)] brightness-110"
            />
          </div>
          <span className="font-mono text-xs uppercase text-secondary font-semibold tracking-wider">
            Supabase Auth &bull; Admin: islam
          </span>
          <h1 className="font-display-xl text-2xl font-bold text-on-surface">
            Admin Security Gateway
          </h1>
          <p className="font-body-sm text-xs text-on-surface-variant max-w-xs">
            Authenticated command center for <span className="text-primary font-semibold">Islam Samy</span> with Supabase Postgres &amp; RLS policies.
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Admin Username / Email</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="islam or islamsamydev@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Master Password or Admin PIN</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin PIN or password"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              required
            />
            {errorMsg && (
              <span className="text-[11px] text-error font-mono text-center mt-1">
                {errorMsg}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs uppercase tracking-wider hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(160,120,255,0.4)] transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying Admin Credentials...' : 'Authenticate & Enter Console'}
          </button>
        </form>

        <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-between text-xs text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Return to Portfolio</span>
          </Link>
          <span className="font-mono text-[11px] text-outline">Supabase Protected</span>
        </div>
      </motion.div>
    </div>
  );
}
