'use client';

import dynamic from 'next/dynamic';

const ThreeBackgroundCanvas = dynamic(
  () => import('./ThreeBackgroundCanvas').then((m) => m.ThreeBackgroundCanvas),
  { ssr: false }
);

export function GlobalBackgroundClient() {
  return <ThreeBackgroundCanvas className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
