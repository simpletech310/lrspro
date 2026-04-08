import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Playfair Display', 'Georgia', 'serif'], body: ['DM Sans', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      colors: {
        navy: { DEFAULT: '#0A1628', mid: '#112240', light: '#1B3A6B' },
        gold: { DEFAULT: '#C9A84C', light: '#E8C96A' },
        cream: '#F8F5EE',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      boxShadow: { card: '0 4px 24px rgba(10,22,40,0.08)', elevated: '0 8px 40px rgba(10,22,40,0.16)' },
    },
  },
  plugins: [],
}
export default config