'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = scrollYProgress;

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const prevShowRef = React.useRef(false);
  const prevPercentRef = React.useRef(-1);

  useEffect(() => {
    const unsubscribeScrollY = scrollY.on('change', (latest) => {
      const shouldShow = latest > 350;
      if (shouldShow !== prevShowRef.current) {
        prevShowRef.current = shouldShow;
        setShowBackToTop(shouldShow);
      }
    });

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      const rounded = Math.round(latest * 100);
      // Only trigger React re-render every 5% step or at extremes (0 or 100)
      if (Math.abs(rounded - prevPercentRef.current) >= 5 || rounded === 100 || rounded === 0) {
        prevPercentRef.current = rounded;
        setScrollPercentage(rounded);
      }
    });

    return () => {
      unsubscribeScrollY();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Top Cybernetic Glowing Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-[60] pointer-events-none">
        <motion.div
          style={{ scaleX }}
          className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary-fixed origin-left shadow-[0_0_12px_rgba(208,188,255,0.7)]"
        />
      </div>

      {/* Floating Back to Top Telemetry HUD Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={scrollToTop}
            aria-label={`Back to top (${scrollPercentage}% scrolled)`}
            title={`Scroll to Top (${scrollPercentage}%)`}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-high/90 dark:bg-[#191c24]/90 backdrop-blur-xl border border-primary/30 hover:border-primary/60 text-on-surface shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(208,188,255,0.35)] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Circular SVG Progress Ring */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-highest dark:text-white/10 stroke-current"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary stroke-current"
                  strokeWidth="3.5"
                  strokeDasharray={`${scrollPercentage}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="material-symbols-outlined text-[15px] text-primary group-hover:-translate-y-0.5 transition-transform absolute">
                keyboard_arrow_up
              </span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-on-surface-variant group-hover:text-primary transition-colors pr-1">
              {scrollPercentage}%
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
