/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#0D1B2A',
          secondary: '#1B263B',
          accent: '#007BFF',
          highlight: '#D4AF37',
          surface: '#F5F7FA',
          success: '#4CAF50',
          progress: '#FF9800',
          neutral: '#9E9E9E'
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
