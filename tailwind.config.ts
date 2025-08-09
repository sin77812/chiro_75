import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB954', // Spotify Green
          dark: '#0E1111',
          hover: '#0FAA44',
        },
        secondary: {
          DEFAULT: '#22272B',
          light: '#F5F7FA',
        },
        dark: '#0E1111',
        'shadow-gray': '#22272B',
        'neutral-light': '#F5F7FA',
        'accent-green': '#0FAA44',
        border: '#22272B', // Add border color
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'noto': ['Noto Sans KR', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'counter': 'counter 2s ease-out',
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
      },
      spacing: {
        '18': '4.5rem', // 72px for navbar height
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config