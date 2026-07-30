import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurora: {
          teal: '#17B4A6',
          violet: '#7C5CFC',
          pink: '#D81B6B',
          pinklight: '#FF4D94',
        },
        ink: {
          950: '#08090D',
          900: '#0E1015',
          800: '#15171F',
          700: '#1D2029',
          600: '#2A2E3A',
        },
        cloud: {
          50: '#FBFAFE',
          100: '#F4F2FB',
          200: '#E9E6F5',
          300: '#D8D3ED',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora-dark':
          'radial-gradient(60% 50% at 15% 10%, rgba(23,180,166,0.35) 0%, rgba(23,180,166,0) 60%), radial-gradient(55% 45% at 85% 15%, rgba(124,92,252,0.30) 0%, rgba(124,92,252,0) 60%), radial-gradient(70% 60% at 50% 100%, rgba(216,27,107,0.28) 0%, rgba(216,27,107,0) 60%)',
        'aurora-light':
          'radial-gradient(60% 50% at 15% 10%, rgba(23,180,166,0.20) 0%, rgba(23,180,166,0) 60%), radial-gradient(55% 45% at 85% 15%, rgba(124,92,252,0.16) 0%, rgba(124,92,252,0) 60%), radial-gradient(70% 60% at 50% 100%, rgba(216,27,107,0.14) 0%, rgba(216,27,107,0) 60%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(216,27,107,0.45)',
        'glow-teal': '0 0 40px -8px rgba(23,180,166,0.45)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config
