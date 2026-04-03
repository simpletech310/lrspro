import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Playfair Display', 'Georgia', 'serif'], body: ['DM Sans', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      colors: { navy: { DEFAULT: '#0A1628', mid: '#112240', light: '#1B3A6B' }, gold: { DEFAULT: '#C9A84C', light: '#E8C96A' }, cream: '#F8F5EE' },
      boxShadow: { card: '0 4px 24px rgba(10,22,40,0.08)', elevated: '0 8px 40px rgba(10,22,40,0.16)' },
    },
  },
  plugins: [],
}
export default config