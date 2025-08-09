import type { Config } from 'tailwindcss'
import { designTokens } from './src/config/design-tokens'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...designTokens.colors,
        // Backward compatibility
        dark: designTokens.colors.background.primary,
        'shadow-gray': designTokens.colors.background.secondary,
        'neutral-light': designTokens.colors.text.primary,
        'accent-green': designTokens.colors.primary[600],
        border: designTokens.colors.neutral[700],
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'noto': ['Noto Sans KR', 'sans-serif'],
      },
      fontSize: designTokens.typography.fontSizes,
      fontWeight: designTokens.typography.fontWeights,
      lineHeight: designTokens.typography.lineHeights,
      letterSpacing: designTokens.typography.letterSpacing,
      spacing: {
        ...designTokens.spacing,
        '18': '4.5rem', // 72px for navbar height
      },
      borderRadius: designTokens.borderRadius,
      boxShadow: designTokens.boxShadow,
      zIndex: designTokens.zIndex,
      transitionDuration: designTokens.motion.durations,
      transitionTimingFunction: designTokens.motion.easings,
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'counter': 'counter 2s ease-out',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        counter: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config