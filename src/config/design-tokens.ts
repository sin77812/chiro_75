// CHIRO Design System Tokens
export const designTokens = {
  // Color Palette
  colors: {
    // Primary Brand Colors
    primary: {
      DEFAULT: '#1DB954',
      50: '#E8F8F0',
      100: '#C6EED9', 
      200: '#8BDDB0',
      300: '#4FCC87',
      400: '#30C26B',
      500: '#1DB954',
      600: '#18A349',
      700: '#148A3D',
      800: '#107231',
      900: '#0A4C20'
    },
    
    // Background Colors
    background: {
      primary: '#0E1111',
      secondary: '#1A1F1F',
      tertiary: '#242929',
      surface: '#2D3333',
      elevated: '#363D3D'
    },
    
    // Text Colors
    text: {
      primary: '#F5F7FA',
      secondary: '#D1D5D9',
      tertiary: '#9CA3AF',
      muted: '#6B7280',
      inverse: '#111827'
    },
    
    // Semantic Colors
    success: {
      DEFAULT: '#10B981',
      light: '#D1FAE5',
      dark: '#047857'
    },
    warning: {
      DEFAULT: '#F59E0B',
      light: '#FEF3C7',
      dark: '#D97706'
    },
    error: {
      DEFAULT: '#EF4444',
      light: '#FEE2E2',
      dark: '#DC2626'
    },
    info: {
      DEFAULT: '#3B82F6',
      light: '#DBEAFE',
      dark: '#1D4ED8'
    },
    
    // Neutral Colors
    neutral: {
      0: '#FFFFFF',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      950: '#030712'
    }
  },
  
  // Typography Scale
  typography: {
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem',    // 96px
      '9xl': '8rem'     // 128px
    },
    
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
  
  // Spacing Scale
  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    7: '1.75rem',   // 28px
    8: '2rem',      // 32px
    9: '2.25rem',   // 36px
    10: '2.5rem',   // 40px
    11: '2.75rem',  // 44px
    12: '3rem',     // 48px
    14: '3.5rem',   // 56px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    28: '7rem',     // 112px
    32: '8rem',     // 128px
    36: '9rem',     // 144px
    40: '10rem',    // 160px
    44: '11rem',    // 176px
    48: '12rem',    // 192px
    52: '13rem',    // 208px
    56: '14rem',    // 224px
    60: '15rem',    // 240px
    64: '16rem',    // 256px
    72: '18rem',    // 288px
    80: '20rem',    // 320px
    96: '24rem'     // 384px
  },
  
  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px - Design Token Requirement
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadows
  boxShadow: {
    // Subtle Shadow - Design Token Requirement
    soft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000'
  },
  
  // Motion & Animations
  motion: {
    // Base Motion - Design Token Requirement
    base: {
      duration: '200ms',
      timing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    },
    
    durations: {
      fast: '150ms',
      base: '200ms',
      medium: '250ms',
      slow: '300ms',
      slower: '500ms'
    },
    
    easings: {
      // Design Token Requirement
      base: 'cubic-bezier(0.22, 1, 0.36, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-Index Scale
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '100',
    sticky: '200',
    fixed: '300',
    modalBackdrop: '400',
    modal: '500',
    popover: '600',
    tooltip: '700',
    toast: '800',
    overlay: '900'
  }
} as const

// Theme Configuration
export const themes = {
  dark: {
    background: designTokens.colors.background.primary,
    text: designTokens.colors.text.primary,
    primary: designTokens.colors.primary.DEFAULT,
    secondary: designTokens.colors.background.secondary,
    accent: designTokens.colors.primary[400],
    muted: designTokens.colors.text.tertiary,
    border: designTokens.colors.neutral[700]
  },
  
  light: {
    background: designTokens.colors.neutral[0],
    text: designTokens.colors.text.inverse,
    primary: designTokens.colors.primary.DEFAULT,
    secondary: designTokens.colors.neutral[50],
    accent: designTokens.colors.primary[600],
    muted: designTokens.colors.neutral[500],
    border: designTokens.colors.neutral[200]
  }
} as const

// Utility Functions
export const getColorValue = (colorPath: string) => {
  const paths = colorPath.split('.')
  let current: any = designTokens.colors
  
  for (const path of paths) {
    current = current?.[path]
  }
  
  return current
}

export const getSpacingValue = (size: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[size]
}

export const getMotionValue = (property: 'duration' | 'timing') => {
  return designTokens.motion.base[property]
}

// CSS Custom Properties for runtime theme switching
export const cssCustomProperties = {
  '--color-primary': designTokens.colors.primary.DEFAULT,
  '--color-background': designTokens.colors.background.primary,
  '--color-text': designTokens.colors.text.primary,
  '--radius-lg': designTokens.borderRadius['2xl'],
  '--shadow-soft': designTokens.boxShadow.soft,
  '--motion-base-duration': designTokens.motion.base.duration,
  '--motion-base-timing': designTokens.motion.base.timing
} as const