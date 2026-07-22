import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Verde olivo dominante — construido alrededor de #524f27.
        olive: {
          50: '#f6f6ee',
          100: '#e9e9d4',
          200: '#d3d2ab',
          300: '#b7b57e',
          400: '#9c9958',
          500: '#7f7c3f',
          600: '#65632f',
          700: '#524f27', // ← el verde de la pareja (dominante)
          800: '#403e22',
          900: '#2f2d16',
          950: '#1c1b0d',
        },
        cream: '#f7f3ea', // fondo real, nunca #fff
        ink: '#2b2820', // texto, nunca #000
        sepia: '#a08e79', // acento botánico del liner del sobre
        gold: '#c9a961', // metálico, uso < 5%
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'Pinyon Script', 'cursive'],
      },
      letterSpacing: {
        overline: '0.25em',
      },
      maxWidth: {
        content: '32rem', // max-w-lg efectivo para el contenido
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
