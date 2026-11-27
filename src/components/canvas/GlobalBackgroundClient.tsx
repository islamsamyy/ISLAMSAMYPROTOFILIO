'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ThreeBackgroundCanvas = dynamic(
  () => import('./ThreeBackgroundCanvas').then((m) => m.ThreeBackgroundCanvas),
  { ssr: false }
);

export function GlobalBackgroundClient() {
  const [enableWebGL, setEnableWebGL] = useState(false);

  useEffect(() => {
    // Skip heavy Three.js WebGL canvas on mobile phones (< 768px) or reduced-motion
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isDesktop && !prefersReduced) {
      setEnableWebGL(true);
    }
  }, []);

  if (!enableWebGL) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(160,120,255,0.12)_0%,_rgba(123,208,255,0.04)_45%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_transparent_65%)]"
      />
    );
  }

  return <ThreeBackgroundCanvas className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
