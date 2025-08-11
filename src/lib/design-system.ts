export const colors = {
  primary: '#1DB954', // Spotify Green
  background: {
    dark: '#0E1111',
    darker: '#0A0C0C',
    overlay: 'rgba(14, 17, 17, 0.8)',
  },
  text: {
    primary: '#F5F7FA',
    secondary: '#C9CFD6',
    muted: '#8B949E',
  },
  border: {
    default: '#1A1F1F',
    light: '#2D3333',
  },
  accent: {
    green: '#1DB954',
    greenHover: '#1ED760',
    greenMuted: 'rgba(29, 185, 84, 0.1)',
  },
} as const

export const typography = {
  display: {
    desktop: {
      fontSize: '72px',
      lineHeight: '1.1',
      fontWeight: '700',
      letterSpacing: '-0.04em',
    },
    mobile: {
      fontSize: '40px',
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.03em',
    },
  },
  h1: {
    desktop: {
      fontSize: '56px',
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.03em',
    },
    mobile: {
      fontSize: '34px',
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
  },
  h2: {
    desktop: {
      fontSize: '40px',
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    mobile: {
      fontSize: '28px',
      lineHeight: '1.4',
      fontWeight: '700',
      letterSpacing: '-0.01em',
    },
  },
  h3: {
    desktop: {
      fontSize: '32px',
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    mobile: {
      fontSize: '24px',
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
  },
  body: {
    large: {
      fontSize: '20px',
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '-0.002em',
    },
    default: {
      fontSize: '18px',
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '-0.002em',
    },
    small: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
} as const

export const spacing = {
  section: {
    desktop: '120px',
    tablet: '96px',
    mobile: '64px',
  },
  container: {
    maxWidth: '1320px',
    padding: {
      desktop: '0 48px',
      tablet: '0 32px',
      mobile: '0 20px',
    },
  },
  grid: {
    columns: 12,
    gap: {
      desktop: '32px',
      mobile: '20px',
    },
  },
} as const

export const motion = {
  duration: {
    instant: '120ms',
    fast: '200ms',
    default: '300ms',
    slow: '500ms',
    verySlow: '800ms',
  },
  easing: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)', // easeOutQuint
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  scrollReveal: {
    duration: '300ms',
    distance: '12px',
    stagger: '50ms',
  },
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  glow: {
    green: '0 0 40px rgba(29, 185, 84, 0.3)',
    greenSubtle: '0 0 20px rgba(29, 185, 84, 0.15)',
  },
} as const