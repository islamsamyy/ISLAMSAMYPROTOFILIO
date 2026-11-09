import type { Variants, Transition } from 'framer-motion';

/**
 * Snappy cybernetic spring curve for UI controls, pills, and interactive triggers.
 */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
};

/**
 * High-precision cubic-bezier easing curve modeled after high-tech telemetry interfaces.
 */
export const easeCybernetic: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Smooth opacity fade-in / fade-out variant.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * Vertical entrance variant from below with cybernetic easing.
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

/**
 * Vertical entrance variant from above.
 */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

/**
 * Horizontal entrance variant from right to left.
 */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

/**
 * Horizontal entrance variant from left to right.
 */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
};

/**
 * Scaling entrance for dialogs, cards, and modal elements.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: easeCybernetic },
  },
};

/**
 * Staggered container variant for coordinating child list animations.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Factory for creating custom-timed stagger containers.
 */
export function createStaggerContainer(staggerDelay = 0.08, initialDelay = 0.05): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/**
 * Micro-interaction card hover variant with subtle lift and tap compression.
 */
export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    y: -2,
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

/**
 * Keyframe pulsing glow for cybernetic focus rings and featured telemetry indicators.
 */
export const cyberneticGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(123, 208, 255, 0)',
    borderColor: 'rgba(208, 188, 255, 0.2)',
  },
  pulse: {
    boxShadow: [
      '0 0 10px rgba(123, 208, 255, 0.2)',
      '0 0 25px rgba(208, 188, 255, 0.4)',
      '0 0 10px rgba(123, 208, 255, 0.2)',
    ],
    borderColor: [
      'rgba(123, 208, 255, 0.3)',
      'rgba(208, 188, 255, 0.6)',
      'rgba(123, 208, 255, 0.3)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Route transition variant for template.tsx page level navigation.
 */
export const routeTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Dialog / Modal backdrop overlay variant.
 */
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/**
 * Dialog / Modal content panel variant.
 */
export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: easeCybernetic },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: easeCybernetic },
  },
};

/**
 * Strips spatial translation/scaling transformations from variants to respect prefers-reduced-motion,
 * converting them into pure instant or subtle opacity crossfades.
 */
export function toReducedMotion(variant: Variants): Variants {
  const reduced: Variants = {};
  for (const [key, val] of Object.entries(variant)) {
    if (typeof val === 'object' && val !== null) {
      const copy = { ...val } as Record<string, any>;
      delete copy.x;
      delete copy.y;
      delete copy.z;
      delete copy.scale;
      delete copy.rotate;
      delete copy.rotateX;
      delete copy.rotateY;
      copy.transition = {
        ...(copy.transition || {}),
        duration: 0.01,
      };
      reduced[key] = copy;
    } else {
      reduced[key] = val;
    }
  }
  return reduced;
}
