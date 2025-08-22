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

// Bar fill animation for progress/KPI displays
export const barFill: Variants = {
  hidden: {
    width: prefersReducedMotion ? "var(--final-width)" : "0%",
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  visible: {
    width: "var(--final-width)",
    transition: {
      duration: DURATIONS.slow,
      ease: EASING,
      delay: 0.2,
    },
  },
}

// Reveal animation for values/numbers
export const numberReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.8,
    y: prefersReducedMotion ? 0 : 10,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.medium,
      ease: EASING,
      delay: 0.4,
    },
  },
}

// Card hover/focus animations
export const cardInteraction: Variants = {
  idle: {
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  hover: prefersReducedMotion ? {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  } : {
    scale: 1.02,
    y: -4,
    rotateX: 2,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
}

// Service card tilt animation
export const serviceTilt: Variants = {
  idle: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  hover: prefersReducedMotion ? {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  } : {
    rotateX: 2,
    rotateY: 1,
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  focus: prefersReducedMotion ? {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  } : {
    rotateX: 1,
    rotateY: 0.5,
    scale: 1.01,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
}

// Micro interaction for icons and buttons
export const microBounce: Variants = {
  idle: {
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  hover: prefersReducedMotion ? {
    scale: 1.05,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  } : {
    scale: 1.1,
    y: -2,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: EASING,
    },
  },
}