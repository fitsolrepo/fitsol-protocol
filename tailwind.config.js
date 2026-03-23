/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black:  '#080a08',
        card:   '#0d110d',
        card2:  '#111611',
        // All accent colors now read from CSS variables — theme toggle works instantly
        green: {
          DEFAULT: 'var(--accent)',
          dim:     'var(--accent-dim)',
          mid:     'var(--accent-mid)',
        },
        border: 'var(--color-border)',
        muted:  'var(--color-muted)',
        amber:  'var(--color-amber)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        pulse2: 'pulse2 2s infinite',
        fadeUp: 'fadeUp 0.6s ease both',
        fadeIn: 'fadeIn 0.8s ease both',
        floatY: 'floatY 4s ease-in-out infinite',
        glow:   'glow 3s ease-in-out infinite',
      },
      keyframes: {
        pulse2: { '0%,100%': { opacity: '1' },   '50%': { opacity: '0.4' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' },         to:   { opacity: '1' } },
        floatY: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        glow:   { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}
