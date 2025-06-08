import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/**/*.ts', // Scan TS files for CVA variants
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Only add shadcn-specific utilities that don't conflict with our color system
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Keep shadcn colors separate from our main color system
      colors: {
        // shadcn component colors (for component usage only)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'oklch(var(--color-content-secondary))',
            '--tw-prose-headings': 'oklch(var(--color-content-primary))',
            '--tw-prose-lead': 'oklch(var(--color-content-secondary))',
            '--tw-prose-links': 'oklch(var(--color-interactive-blue))',
            '--tw-prose-bold': 'oklch(var(--color-content-primary))',
            '--tw-prose-counters': 'oklch(var(--color-content-tertiary))',
            '--tw-prose-bullets': 'oklch(var(--color-border-primary))',
            '--tw-prose-hr': 'oklch(var(--color-border-secondary))',
            '--tw-prose-quotes': 'oklch(var(--color-content-primary))',
            '--tw-prose-quote-borders': 'oklch(var(--color-interactive-blue))',
            '--tw-prose-captions': 'oklch(var(--color-content-tertiary))',
            '--tw-prose-code': 'oklch(var(--color-interactive-blue))',
            '--tw-prose-pre-code': 'oklch(var(--color-content-secondary))',
            '--tw-prose-pre-bg': 'oklch(var(--color-surface-secondary))',
            '--tw-prose-th-borders': 'oklch(var(--color-border-primary))',
            '--tw-prose-td-borders': 'oklch(var(--color-border-secondary))',
            '--tw-prose-invert-body': 'oklch(var(--color-content-secondary))',
            '--tw-prose-invert-headings': 'oklch(var(--color-content-primary))',
            '--tw-prose-invert-lead': 'oklch(var(--color-content-secondary))',
            '--tw-prose-invert-links': 'oklch(var(--color-interactive-blue))',
            '--tw-prose-invert-bold': 'oklch(var(--color-content-primary))',
            '--tw-prose-invert-counters': 'oklch(var(--color-content-tertiary))',
            '--tw-prose-invert-bullets': 'oklch(var(--color-border-primary))',
            '--tw-prose-invert-hr': 'oklch(var(--color-border-secondary))',
            '--tw-prose-invert-quotes': 'oklch(var(--color-content-primary))',
            '--tw-prose-invert-quote-borders': 'oklch(var(--color-interactive-blue))',
            '--tw-prose-invert-captions': 'oklch(var(--color-content-tertiary))',
            '--tw-prose-invert-code': 'oklch(var(--color-interactive-blue))',
            '--tw-prose-invert-pre-code': 'oklch(var(--color-content-secondary))',
            '--tw-prose-invert-pre-bg': 'oklch(var(--color-surface-secondary))',
            '--tw-prose-invert-th-borders': 'oklch(var(--color-border-primary))',
            '--tw-prose-invert-td-borders': 'oklch(var(--color-border-secondary))',
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.heading'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
}