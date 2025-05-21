/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
          progress: 'rgb(var(--color-progress) / <alpha-value>)',
          neutral: 'rgb(var(--color-neutral) / <alpha-value>)',
          background: 'rgb(var(--color-background) / <alpha-value>)',
          "themed-text": 'rgb(var(--color-text) / <alpha-value>)',
          "themed-text-secondary": 'rgba(var(--color-text-secondary), var(--color-text-secondary-alpha))',
          "themed-border": 'rgba(var(--color-border), var(--color-border-alpha))',
          "card-bg": 'rgb(var(--color-card-bg) / <alpha-value>)',
          "footer-bg": 'rgb(var(--color-footer-bg) / <alpha-value>)',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
          mono: ['IBM Plex Mono', 'monospace']
        },
        borderRadius: {
          '2xl': '1rem'
        }
      }
    },
    plugins: [require('@tailwindcss/typography')]
  }
