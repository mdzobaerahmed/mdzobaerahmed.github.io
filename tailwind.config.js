/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F17',
          surface: '#111726',
          card: '#161F33',
          border: '#1F293D',
          muted: '#64748B',
          text: '#F1F5F9'
        },
        light: {
          bg: '#FAFAFA',
          surface: '#F1F5F9',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          text: '#0F172A'
        },
        accent: {
          amber: '#F59E0B',
          amberGlow: '#D97706',
          silver: '#94A3B8',
          cyan: '#38BDF8'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
