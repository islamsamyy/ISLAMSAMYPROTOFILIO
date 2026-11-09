'use client';

import { useState, useEffect } from 'react';

/**
 * Hydration-safe React hook to detect if the user has requested reduced motion
 * via operating system or browser accessibility settings.
 *
 * Compliant with WCAG 2.1 Success Criteria 2.2.2 (Pause, Stop, Hide)
 * and 2.3.3 (Animation from Interactions).
 *
 * Defaults to `false` during SSR to ensure server-client markup consistency,
 * and updates on client mount.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      // Fallback for older Safari / legacy browsers
      (mediaQuery as MediaQueryList).addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        (mediaQuery as MediaQueryList).removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;
