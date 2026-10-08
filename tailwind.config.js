/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#F4F4F5',
          card: '#FFFFFF',
          subtle: '#F1F1F3',
        },
        border: {
          DEFAULT: '#E4E4E7',
          subtle: '#F1F1F3',
          bright: '#D4D4D8',
        },
        dexy: {
          blue: '#0066FF',
          blueHover: '#0052CC',
          blueSubtle: 'rgba(0, 102, 255, 0.08)',
          cyan: '#00E5FF',
        },
        foreground: '#09090B',
        muted: '#52525B',
        dim: '#71717A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        technical: '0.08em',
      },
    },
  },
  plugins: [],
}
