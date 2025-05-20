import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Tailwind CSS Configuration for Luis Miguel Montoya Portfolio
 * - Custom color palette with shade variants (100-900)
 * - Uses CSS variables for light/dark mode
 * - Modern, minimalist, accessible design
 */

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
        },
        "accent-blue": {
          DEFAULT: "var(--color-accent-blue)",
          100: "var(--color-accent-blue-100)",
          200: "var(--color-accent-blue-200)",
          300: "var(--color-accent-blue-300)",
          400: "var(--color-accent-blue-400)",
          500: "var(--color-accent-blue-500)",
          600: "var(--color-accent-blue-600)",
          700: "var(--color-accent-blue-700)",
          800: "var(--color-accent-blue-800)",
          900: "var(--color-accent-blue-900)",
        },
        "accent-gold": {
          DEFAULT: "var(--color-accent-gold)",
          100: "var(--color-accent-gold-100)",
          200: "var(--color-accent-gold-200)",
          300: "var(--color-accent-gold-300)",
          400: "var(--color-accent-gold-400)",
          500: "var(--color-accent-gold-500)",
          600: "var(--color-accent-gold-600)",
          700: "var(--color-accent-gold-700)",
          800: "var(--color-accent-gold-800)",
          900: "var(--color-accent-gold-900)",
        },
        surface: {
          light: "var(--color-surface-light)",
          dark: "var(--color-surface-dark)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          100: "var(--color-success-100)",
          200: "var(--color-success-200)",
          300: "var(--color-success-300)",
          400: "var(--color-success-400)",
          500: "var(--color-success-500)",
          600: "var(--color-success-600)",
          700: "var(--color-success-700)",
          800: "var(--color-success-800)",
          900: "var(--color-success-900)",
        },
        progress: {
          DEFAULT: "var(--color-progress)",
          100: "var(--color-progress-100)",
          200: "var(--color-progress-200)",
          300: "var(--color-progress-300)",
          400: "var(--color-progress-400)",
          500: "var(--color-progress-500)",
          600: "var(--color-progress-600)",
          700: "var(--color-progress-700)",
          800: "var(--color-progress-800)",
          900: "var(--color-progress-900)",
        },
        neutral: {
          DEFAULT: "var(--color-neutral)",
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
        heading: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
