'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ScrollRevealSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  staggerChildren?: number;
  viewportMargin?: string;
}

export function ScrollRevealSection({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
  staggerChildren,
  viewportMargin = '-60px',
  ...props
}: ScrollRevealSectionProps) {
  const prefersReduced = useReducedMotion();

  const getOffset = () => {
    if (prefersReduced || direction === 'none') return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: 32 };
      case 'down':
        return { x: 0, y: -32 };
      case 'left':
        return { x: 32, y: 0 };
      case 'right':
        return { x: -32, y: 0 };
      default:
        return { x: 0, y: 32 };
    }
  };

  const offset = getOffset();

  return (
    <motion.section
      id={id}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: prefersReduced ? 0.01 : 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
          ...(staggerChildren && !prefersReduced
            ? {
                staggerChildren,
                delayChildren: delay + 0.1,
              }
            : {}),
        },
      }}
      viewport={{ once: true, margin: viewportMargin }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export interface ScrollRevealItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollRevealItem({
  children,
  className = '',
  delay = 0,
  ...props
}: ScrollRevealItemProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReduced ? 0 : 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReduced ? 0.01 : 0.5,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
