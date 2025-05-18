module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          teal: '#38B2AC',
          lavender: '#9F7AEA',
        },
        background: {
          dark: '#121212',
          light: '#F9FAFB',
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
