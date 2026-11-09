'use client';

import React from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { routeTransition } from '@/components/animation/motion-variants';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={routeTransition}
        initial="hidden"
        animate="visible"
        className="w-full flex-1 flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
