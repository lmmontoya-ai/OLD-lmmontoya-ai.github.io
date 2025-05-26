/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark theme colors (default)
        primary: {
          DEFAULT: "15 23 42", // Slate 900
          light: "28 42 77", // Deep Navy Blue for light theme
        },
        secondary: {
          DEFAULT: "51 65 85", // Slate 600
          light: "74 74 74", // Charcoal Grey for light theme
        },
        accent: {
          DEFAULT: "59 130 246", // Blue 500
          light: "77 139 247", // Sky Blue for light theme
        },
        highlight: {
          DEFAULT: "212 175 55", // Gold
          light: "208 124 92", // Pastel Golden Beige for light theme
        },
        surface: {
          DEFAULT: "30 41 59", // Slate 700
          light: "124 111 156", // Muted Purple for light theme
        },
        success: {
          DEFAULT: "34 197 94", // Emerald 500
          light: "28 141 76", // Forest Green for light theme
        },
        progress: {
          DEFAULT: "249 115 22", // Orange 500
          light: "234 88 12", // Amber Orange for light theme
        },
        neutral: {
          DEFAULT: "148 163 184", // Slate 400
          light: "228 231 235", // Soft Grey for light theme
        },
        background: {
          DEFAULT: "15 27 43", // Deep Navy
          light: "248 250 253", // Soft White
        },
        "hero-gradient": {
          start: "19 38 60", // #13263C
          end: "11 20 31", // #0B141F
        },
        text: {
          DEFAULT: "248 250 252", // Slate 50 (white-ish)
          secondary: "203 213 225", // Slate 300
          light: "28 42 77", // Deep Navy Blue for light theme
          "secondary-light": "74 74 74", // Charcoal Grey for light theme
        },
        border: {
          DEFAULT: "100 116 139", // Slate 500
          light: "228 231 235", // Soft Grey for light theme
        },
        card: {
          DEFAULT: "30 41 59", // Slate 700
          light: "255 255 255", // Pure white for light theme
        },
        footer: {
          DEFAULT: "11 20 31", // Deep navy dark
          light: "248 250 253", // Soft White for light theme
        },
        grid: {
          DEFAULT: "255 255 255", // White for dark theme
          light: "228 231 235", // Soft Grey for light theme
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        body: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        base: ["1rem", { lineHeight: "1.6" }],
        "base-lg": ["1.125rem", { lineHeight: "1.7" }],
      },
      letterSpacing: {
        tight: "-0.025em",
        wide: "0.025em",
      },
      lineHeight: {
        base: "1.6",
        "base-lg": "1.7",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        // Dark theme shadows
        xs: "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        sm: "0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)",
        md: "0 4px 8px -1px rgba(0, 0, 0, 0.7), 0 2px 6px -2px rgba(0, 0, 0, 0.7)",
        lg: "0 12px 20px -3px rgba(0, 0, 0, 0.8), 0 6px 10px -4px rgba(0, 0, 0, 0.7)",
        xl: "0 24px 32px -5px rgba(0, 0, 0, 0.9), 0 12px 16px -6px rgba(0, 0, 0, 0.8)",
        // Light theme shadows
        "xs-light": "0 1px 3px 0 rgba(28, 42, 77, 0.12)",
        "sm-light":
          "0 3px 6px 0 rgba(28, 42, 77, 0.15), 0 2px 4px -1px rgba(28, 42, 77, 0.12)",
        "md-light":
          "0 6px 12px -2px rgba(28, 42, 77, 0.18), 0 3px 6px -2px rgba(28, 42, 77, 0.15)",
        "lg-light":
          "0 12px 32px -4px rgba(28, 42, 77, 0.22), 0 6px 12px -4px rgba(28, 42, 77, 0.18)",
        "xl-light":
          "0 20px 40px -8px rgba(28, 42, 77, 0.26), 0 12px 20px -8px rgba(28, 42, 77, 0.22)",
        // Glow effects
        "glow-accent": "0 0 20px rgba(59, 130, 246, 0.2)",
        "glow-highlight": "0 0 20px rgba(212, 175, 55, 0.2)",
        "glow-success": "0 0 20px rgba(34, 197, 94, 0.2)",
      },
      transitionDuration: {
        base: "200ms",
        page: "150ms",
        scroll: "500ms",
        spring: "300ms",
      },
      transitionTimingFunction: {
        base: "cubic-bezier(0.4, 0, 0.2, 1)",
        page: "ease",
        scroll: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      spacing: {
        "section-sm": "5rem",
        "section-lg": "7rem",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "20px",
      },
      opacity: {
        grid: "0.1",
        "grid-light": "0.4",
        border: "0.25",
        "border-light": "1",
        "text-secondary": "1",
        "text-secondary-light": "1",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // Custom plugin to add theme-aware utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // Theme-aware text colors
        ".text-themed": {
          color: "rgb(248 250 252)",
          ".light-theme &": {
            color: "rgb(28 42 77)",
          },
        },
        ".text-themed-secondary": {
          color: "rgb(203 213 225)",
          ".light-theme &": {
            color: "rgb(74 74 74)",
          },
        },
        // Theme-aware background colors
        ".bg-themed": {
          backgroundColor: "rgb(15 27 43)",
          ".light-theme &": {
            backgroundColor: "rgb(248 250 253)",
          },
        },
        ".bg-card-themed": {
          backgroundColor: "rgba(30 41 59 / 0.8)",
          ".light-theme &": {
            backgroundColor: "rgb(255 255 255)",
          },
        },
        // Theme-aware borders
        ".border-themed": {
          borderColor: "rgba(100 116 139 / 0.25)",
          ".light-theme &": {
            borderColor: "rgb(228 231 235)",
          },
        },
        // Theme-aware shadows
        ".shadow-themed-sm": {
          boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)",
          ".light-theme &": {
            boxShadow:
              "0 3px 6px 0 rgba(28, 42, 77, 0.15), 0 2px 4px -1px rgba(28, 42, 77, 0.12)",
          },
        },
        ".shadow-themed-md": {
          boxShadow:
            "0 4px 8px -1px rgba(0, 0, 0, 0.7), 0 2px 6px -2px rgba(0, 0, 0, 0.7)",
          ".light-theme &": {
            boxShadow:
              "0 6px 12px -2px rgba(28, 42, 77, 0.18), 0 3px 6px -2px rgba(28, 42, 77, 0.15)",
          },
        },
        ".shadow-themed-lg": {
          boxShadow:
            "0 12px 20px -3px rgba(0, 0, 0, 0.8), 0 6px 10px -4px rgba(0, 0, 0, 0.7)",
          ".light-theme &": {
            boxShadow:
              "0 12px 32px -4px rgba(28, 42, 77, 0.22), 0 6px 12px -4px rgba(28, 42, 77, 0.18)",
          },
        },
        ".shadow-themed-xl": {
          boxShadow:
            "0 24px 32px -5px rgba(0, 0, 0, 0.9), 0 12px 16px -6px rgba(0, 0, 0, 0.8)",
          ".light-theme &": {
            boxShadow:
              "0 20px 40px -8px rgba(28, 42, 77, 0.26), 0 12px 20px -8px rgba(28, 42, 77, 0.22)",
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
