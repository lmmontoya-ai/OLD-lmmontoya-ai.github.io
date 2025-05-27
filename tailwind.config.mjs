/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // === SEMANTIC COLOR TOKENS ===
        // These provide meaningful names that map to the design system colors

        // Brand Colors
        brand: {
          primary: "59 130 246", // Blue - main brand color
          secondary: "212 175 55", // Gold - accent brand color
        },

        // Content Colors
        content: {
          primary: "248 250 252", // Main text (dark theme)
          secondary: "203 213 225", // Secondary text (dark theme)
          tertiary: "148 163 184", // Muted text
          inverse: "28 42 77", // Text for light backgrounds
        },

        // Background Colors
        bg: {
          primary: "15 27 43", // Main background (dark theme)
          secondary: "30 41 59", // Card/surface background (dark theme)
          tertiary: "11 20 31", // Footer/deeper background (dark theme)
          inverse: "248 250 253", // Light theme background
          "inverse-secondary": "255 255 255", // Light theme cards
        },

        // Interactive Colors
        interactive: {
          primary: "59 130 246", // Primary buttons, links
          secondary: "212 175 55", // Secondary buttons, highlights
          hover: "77 139 247", // Hover states
          focus: "59 130 246", // Focus rings
          disabled: "100 116 139", // Disabled states
        },

        // Status Colors
        status: {
          success: "34 197 94", // Success states, completed items
          warning: "249 115 22", // Warning states, in-progress items
          error: "239 68 68", // Error states
          info: "59 130 246", // Info states
        },

        // Border Colors
        border: {
          primary: "100 116 139", // Default borders (dark theme)
          secondary: "51 65 85", // Subtle borders
          accent: "59 130 246", // Accent borders
          inverse: "228 231 235", // Light theme borders
        },

        // === ORIGINAL COLOR SYSTEM (for backward compatibility) ===
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
        heading: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Base responsive sizes
        base: ["1rem", { lineHeight: "1.6" }],
        "base-lg": ["1.125rem", { lineHeight: "1.7" }],

        // Typography scale - 1.25 ratio (mobile), 1.333 ratio (desktop)
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        md: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],

        // Custom heading sizes matching design system
        "heading-1": ["2.75rem", { lineHeight: "1.1", fontWeight: "700" }],
        "heading-2": ["2.25rem", { lineHeight: "1.2", fontWeight: "650" }],
        "heading-3": ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-4": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],

        // Code and small text
        code: ["0.875rem", { lineHeight: "1.4" }],
        caption: ["0.6875rem", { lineHeight: "1.5" }],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
        // Custom weights for design system
        heading: "600",
        "heading-bold": "700",
        "heading-medium": "650",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        none: "1",
        tight: "1.1",
        snug: "1.2",
        normal: "1.3",
        relaxed: "1.4",
        loose: "1.5",
        "extra-loose": "1.6",
        "super-loose": "1.7",
        // Custom line heights
        base: "1.6",
        "base-lg": "1.7",
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
        // Custom radius for components
        button: "0.75rem",
        card: "1.25rem",
        icon: "0.625rem",
      },
      boxShadow: {
        // Enhanced shadow system for both themes
        // Dark theme shadows (default)
        xs: "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        sm: "0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)",
        md: "0 4px 8px -1px rgba(0, 0, 0, 0.7), 0 2px 6px -2px rgba(0, 0, 0, 0.7)",
        lg: "0 12px 20px -3px rgba(0, 0, 0, 0.8), 0 6px 10px -4px rgba(0, 0, 0, 0.7)",
        xl: "0 24px 32px -5px rgba(0, 0, 0, 0.9), 0 12px 16px -6px rgba(0, 0, 0, 0.8)",
        "2xl":
          "0 32px 48px -8px rgba(0, 0, 0, 0.95), 0 20px 32px -8px rgba(0, 0, 0, 0.9)",

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
        "2xl-light":
          "0 32px 64px -12px rgba(28, 42, 77, 0.3), 0 20px 40px -12px rgba(28, 42, 77, 0.26)",

        // Glow effects
        "glow-accent": "0 0 20px rgba(59, 130, 246, 0.2)",
        "glow-accent-lg": "0 0 40px rgba(59, 130, 246, 0.3)",
        "glow-highlight": "0 0 20px rgba(212, 175, 55, 0.2)",
        "glow-highlight-lg": "0 0 40px rgba(212, 175, 55, 0.3)",
        "glow-success": "0 0 20px rgba(34, 197, 94, 0.2)",
        "glow-success-lg": "0 0 40px rgba(34, 197, 94, 0.3)",

        // Component-specific shadows
        button:
          "0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)",
        "button-hover":
          "0 12px 20px -3px rgba(0, 0, 0, 0.8), 0 6px 10px -4px rgba(0, 0, 0, 0.7)",
        card: "0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)",
        "card-hover":
          "0 24px 32px -5px rgba(0, 0, 0, 0.9), 0 12px 16px -6px rgba(0, 0, 0, 0.8)",

        // Special effects
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        none: "0 0 #0000",
      },
      dropShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.6)",
        md: "0 4px 6px rgba(0, 0, 0, 0.7)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.8)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.9)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.95)",
        none: "0 0 #0000",
      },
      transitionDuration: {
        0: "0ms",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
        // Custom durations from design system
        base: "200ms",
        page: "150ms",
        scroll: "500ms",
        spring: "300ms",
        fast: "100ms",
        slow: "700ms",
        // Theme switching duration - standardized across all components
        theme: "200ms",
      },
      transitionTimingFunction: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        // Custom timing functions from design system
        base: "cubic-bezier(0.4, 0, 0.2, 1)",
        page: "ease",
        scroll: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        // Custom animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-left": "slideLeft 0.5s ease-out",
        "slide-right": "slideRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-in",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        pulse: {
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      spacing: {
        // Default Tailwind spacing preserved
        px: "1px",
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",

        // Custom spacing for design system
        "section-sm": "5rem",
        "section-lg": "7rem",
        "container-sm": "1rem",
        "container-md": "1.5rem",
        "container-lg": "2rem",
        "container-xl": "2.5rem",

        // Component-specific spacing
        "button-sm": "0.75rem",
        "button-md": "1rem",
        "button-lg": "1.25rem",
        "card-sm": "1.5rem",
        "card-md": "2rem",
        "card-lg": "2.5rem",
        "icon-sm": "1.5rem",
        "icon-md": "2rem",
        "icon-lg": "2.5rem",

        // Layout spacing
        header: "4rem",
        footer: "3rem",
        sidebar: "16rem",
        content: "48rem",
      },
      backdropBlur: {
        none: "0",
        sm: "4px",
        md: "12px",
        lg: "20px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        // Custom blur values
        xs: "2px",
        button: "4px",
        card: "12px",
        overlay: "20px",
      },
      backdropBrightness: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2",
      },
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        40: "0.4",
        50: "0.5",
        60: "0.6",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        90: "0.9",
        95: "0.95",
        100: "1",
        // Custom opacity values
        grid: "0.1",
        "grid-light": "0.4",
        border: "0.25",
        "border-light": "1",
        "text-secondary": "1",
        "text-secondary-light": "1",
        "card-bg": "0.8",
        overlay: "0.9",
      },
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        auto: "auto",
        // Custom z-index values
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        modal: "1040",
        popover: "1050",
        tooltip: "1060",
        toast: "1070",
      },
      scale: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        // Custom scale values
        102: "1.02",
        103: "1.03",
        hover: "1.05",
        active: "0.98",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    // Custom plugin to add theme-aware utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // === SEMANTIC THEME-AWARE UTILITIES WITH PROPER TRANSITIONS ===

        // Content/Text utilities - WITH TRANSITIONS
        ".text-content-primary": {
          color: "rgb(248 250 252)", // Dark theme
          transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)", // Match global timing
          ":not(.dark) &": {
            color: "rgb(28 42 77)", // Light theme
          },
        },
        ".text-content-secondary": {
          color: "rgb(203 213 225)", // Dark theme
          transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)", // Match global timing
          ":not(.dark) &": {
            color: "rgb(74 74 74)", // Light theme
          },
        },
        ".text-content-tertiary": {
          color: "rgb(148 163 184)", // Dark theme
          transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)", // Match global timing
          ":not(.dark) &": {
            color: "rgb(100 116 139)", // Light theme
          },
        },

        // Background utilities - WITH TRANSITIONS
        ".bg-primary": {
          backgroundColor: "rgb(15 27 43)", // Dark theme
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            backgroundColor: "rgb(248 250 253)", // Light theme
          },
        },
        ".bg-secondary": {
          backgroundColor: "rgb(30 41 59)", // Dark theme
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            backgroundColor: "rgb(255 255 255)", // Light theme
          },
        },
        ".bg-tertiary": {
          backgroundColor: "rgb(11 20 31)", // Dark theme
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            backgroundColor: "rgb(248 250 253)", // Light theme
          },
        },

        // Border utilities - WITH TRANSITIONS
        ".border-primary": {
          borderColor: "rgba(100 116 139 / 0.25)", // Dark theme
          transition: "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            borderColor: "rgb(228 231 235)", // Light theme
          },
        },
        ".border-secondary": {
          borderColor: "rgba(51 65 85 / 0.3)", // Dark theme
          transition: "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            borderColor: "rgba(228 231 235 / 0.6)", // Light theme
          },
        },

        // Interactive utilities - NO TRANSITIONS (these are for hover states)
        ".text-interactive-primary": {
          color: "rgb(59 130 246)", // Same in both themes
        },
        ".text-interactive-secondary": {
          color: "rgb(212 175 55)", // Dark theme
          ":not(.dark) &": {
            color: "rgb(208 124 92)", // Light theme
          },
        },
        ".bg-interactive-primary": {
          backgroundColor: "rgb(59 130 246)", // Same in both themes
        },
        ".bg-interactive-secondary": {
          backgroundColor: "rgb(212 175 55)", // Dark theme
          ":not(.dark) &": {
            backgroundColor: "rgb(208 124 92)", // Light theme
          },
        },

        // Status utilities - NO TRANSITIONS
        ".text-status-success": {
          color: "rgb(34 197 94)", // Dark theme
          ":not(.dark) &": {
            color: "rgb(28 141 76)", // Light theme
          },
        },
        ".text-status-warning": {
          color: "rgb(249 115 22)", // Dark theme
          ":not(.dark) &": {
            color: "rgb(234 88 12)", // Light theme
          },
        },
        ".bg-status-success": {
          backgroundColor: "rgb(34 197 94)", // Dark theme
          ":not(.dark) &": {
            backgroundColor: "rgb(28 141 76)", // Light theme
          },
        },
        ".bg-status-warning": {
          backgroundColor: "rgb(249 115 22)", // Dark theme
          ":not(.dark) &": {
            backgroundColor: "rgb(234 88 12)", // Light theme
          },
        },

        // === LEGACY THEME-AWARE UTILITIES WITH TRANSITIONS (for backward compatibility) ===

        // Theme-aware text colors - WITH TRANSITIONS
        ".text-themed": {
          color: "rgb(248 250 252)",
          transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            color: "rgb(28 42 77)",
          },
        },
        ".text-themed-secondary": {
          color: "rgb(203 213 225)",
          transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            color: "rgb(74 74 74)",
          },
        },
        ".text-highlight-themed": {
          color: "rgb(212 175 55)",
          transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            color: "rgb(208 124 92)",
          },
        },
        // Theme-aware background colors - WITH TRANSITIONS
        ".bg-themed": {
          backgroundColor: "rgb(15 27 43)",
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            backgroundColor: "rgb(248 250 253)",
          },
        },
        ".bg-card-themed": {
          backgroundColor: "rgba(30 41 59 / 0.8)",
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            backgroundColor: "rgb(255 255 255)",
          },
        },
        // Theme-aware borders - WITH TRANSITIONS
        ".border-themed": {
          borderColor: "rgba(100 116 139 / 0.25)",
          transition: "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          ":not(.dark) &": {
            borderColor: "rgb(228 231 235)",
          },
        },
        // Theme-aware shadows
        ".shadow-themed-sm": {
          boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)",
          ":not(.dark) &": {
            boxShadow:
              "0 3px 6px 0 rgba(28, 42, 77, 0.15), 0 2px 4px -1px rgba(28, 42, 77, 0.12)",
          },
        },
        ".shadow-themed-md": {
          boxShadow:
            "0 4px 8px -1px rgba(0, 0, 0, 0.7), 0 2px 6px -2px rgba(0, 0, 0, 0.7)",
          ":not(.dark) &": {
            boxShadow:
              "0 6px 12px -2px rgba(28, 42, 77, 0.18), 0 3px 6px -2px rgba(28, 42, 77, 0.15)",
          },
        },
        ".shadow-themed-lg": {
          boxShadow:
            "0 12px 20px -3px rgba(0, 0, 0, 0.8), 0 6px 10px -4px rgba(0, 0, 0, 0.7)",
          ":not(.dark) &": {
            boxShadow:
              "0 12px 32px -4px rgba(28, 42, 77, 0.22), 0 6px 12px -4px rgba(28, 42, 77, 0.18)",
          },
        },
        ".shadow-themed-xl": {
          boxShadow:
            "0 24px 32px -5px rgba(0, 0, 0, 0.9), 0 12px 16px -6px rgba(0, 0, 0, 0.8)",
          ":not(.dark) &": {
            boxShadow:
              "0 20px 40px -8px rgba(28, 42, 77, 0.26), 0 12px 20px -8px rgba(28, 42, 77, 0.22)",
          },
        },
        // Gradient utilities
        ".gradient-hero": {
          background:
            "linear-gradient(135deg, rgb(19 38 60) 0%, rgb(11 20 31) 100%)",
        },
        ".gradient-accent": {
          background:
            "linear-gradient(135deg, rgb(59 130 246) 0%, rgb(212 175 55) 100%)",
        },
        // Text utilities
        ".text-balance": {
          textWrap: "balance",
        },
        // Focus utilities
        ".focus-ring": {
          "&:focus-visible": {
            outline: "2px solid rgb(59 130 246)",
            outlineOffset: "2px",
            borderRadius: "4px",
          },
        },
      };

      addUtilities(newUtilities);
    },
    // Custom plugin for theme transition utilities
    function({ addUtilities }) {
      const themeTransitionUtilities = {
        // Base theme transition for color changes
        '.transition-theme': {
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '200ms',
        },
        // Theme transition including shadows
        '.transition-theme-all': {
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow, opacity',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '200ms',
        },
        // Theme transition for opacity only
        '.transition-theme-opacity': {
          transitionProperty: 'opacity',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '200ms',
        },
        // Theme transition for transform (for elements that move on theme change)
        '.transition-theme-transform': {
          transitionProperty: 'transform, color, background-color',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '200ms',
        },
      }
      addUtilities(themeTransitionUtilities)
    }
  ],
};