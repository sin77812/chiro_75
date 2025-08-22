import { Variants } from 'framer-motion'

// Reduced motion queries
const prefersReducedMotion = (typeof window !== 'undefined') 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Core durations and easing
export const DURATIONS = {
  fast: 0.6,
  medium: 0.9,
  slow: 1.2,
} as const

export const EASING = [0.22, 1, 0.36, 1] as const

// Fade up animation with stagger support
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 24,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
}

// Stagger container for sequential animations
export const stagger: Variants = {
  hidden: {
    opacity: prefersReducedMotion ? 1 : 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Shake effect for emphasis
export const shake: Variants = {
  idle: {
    x: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  active: prefersReducedMotion ? {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  } : {
    x: [-2, 2, -2, 2, 0],
    transition: {
      duration: DURATIONS.medium,
      ease: EASING,
    },
  },
}

// Kinetic typography - character split animation
export const kineticChar: Variants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 20,
    rotateX: prefersReducedMotion ? 0 : -15,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: DURATIONS.medium,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -20,
    x: prefersReducedMotion ? 0 : -24,
    rotateX: prefersReducedMotion ? 0 : 15,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
}

// Slide out animation for section transitions
export const slideOut: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.medium,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : -24,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
}