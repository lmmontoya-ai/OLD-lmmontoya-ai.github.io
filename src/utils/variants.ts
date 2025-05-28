// src/utils/variants.ts
// Component variant utilities using class-variance-authority
// Centralizes variant logic and removes conditional class logic from components

import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";

// Utility function to merge classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Button component variants - Updated for Tailwind v4
export const buttonVariants = cva(
  // Base classes - common to all button variants
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-semibold",
    "font-heading",
    "tracking-tight",
    "relative",
    "overflow-hidden",
    "transition-spring", // Using modern transition utility
    "focus:outline-none",
    "focus-visible:ring-3", // v4 requires explicit ring width
    "focus-visible:ring-offset-2",
    "focus-ring", // Using modern focus ring utility
  ],
  {
    variants: {
      variant: {
        primary: [
          // Background and text (background set via inline style for CSS variable)
          "text-content-inverse", // Using semantic color utility
          "border",
          "border-transparent",
          "shadow-xs", // v4 shadow naming (shadow-sm → shadow-xs)
          "focus-visible:ring-amber-500",
          // Hover effects
          "hover-lift", // Using modern hover utility
          "hover:brightness-105",
          "hover:shadow-lg", // v4 shadow naming
          // Active state
          "active:-translate-y-px",
          "active:transition-all",
          "active:duration-100",
        ],
        secondary: [
          // Background and text
          "bg-transparent",
          "text-content-primary", // Using semantic color utility
          "border-2",
          "border-content-primary/50", // Using semantic color with opacity
          "backdrop-blur-xs", // v4 backdrop naming (sm → xs)
          "focus-visible:ring-blue-500",
          // Hover effects
          "hover:text-interactive-primary", // Using semantic color utility
          "hover:border-interactive-primary", // Using semantic color utility
          "hover:bg-interactive-primary/5",
          "hover:-translate-y-px",
          "hover:shadow-sm", // v4 shadow naming (shadow-themed-md → shadow-sm)
        ],
        outline: [
          // Background and text
          "bg-transparent",
          "text-content-secondary", // Using semantic color utility
          "border",
          "border-border-primary/20", // Using semantic color utility
          "focus-visible:ring-blue-500",
          // Hover effects
          "hover:border-interactive-primary/30", // Using semantic color utility
          "hover:text-content-primary", // Using semantic color utility
          "hover:-translate-y-px",
        ],
      },
      size: {
        sm: ["text-sm", "px-3", "py-1.5", "rounded-sm"], // v4 border radius (rounded-lg → rounded-sm)
        md: ["px-4", "py-2", "rounded-sm"], // v4 border radius (rounded-lg → rounded-sm)
        lg: ["text-lg", "px-6", "py-3", "rounded-lg"], // v4 border radius (rounded-xl → rounded-lg)
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      rounded: false,
    },
  }
);

// Card component variants
export const cardVariants = cva(
  // Base classes - common to all card variants
  [
    "relative",
    "overflow-hidden",
    "rounded-2xl",
    "transition-spring",
    // Background and backdrop
    "bg-secondary/80",
    "backdrop-blur-lg",
    // Border and shadow
    "border",
    "border-primary",
    "shadow-sm",
    // Padding
    "p-8",
    "lg:p-10",
  ],
  {
    variants: {
      interactive: {
        true: [
          "group",
          "hover-lift",
          "hover:shadow-xl",
          "hover:border-interactive-primary/20",
        ],
        false: "",
      },
      featured: {
        true: ["border-l-4", "border-l-interactive-primary"],
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
      featured: false,
    },
  }
);

// UpdateCard component variants
export const updateCardVariants = cva(
  // Base classes - common to all update card variants
  [
    "relative",
    "block",
    "group",
    "p-4",
    "px-5",
    "rounded-lg",         // v4: rounded-xl to rounded-lg
    "m-px",
    "transition-spring",   // Changed from transition-theme for smoother movement
    "focus-ring",         // Using modern focus-ring utility
    // Hover effects
    "hover:translate-x-1",
    "bg-secondary/80", // Matching background from the image provided by user
    "backdrop-blur-md" // Adding blur consistent with the image
  ],
  {
    variants: {
      variant: {
        milestone: "hover:bg-accent-milestone-hover", // Use new theme-aware hover utility
        project: "hover:bg-accent-project-hover",   // Use new theme-aware hover utility
        resource: "hover:bg-accent-resource-hover",  // Use new theme-aware hover utility
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Icon container variants for UpdateCard
export const updateCardIconVariants = cva(
  // Base classes for icon containers
  [
    "flex",
    "items-center",
    "justify-center",
    "w-9",
    "h-9",
    "flex-shrink-0",
    "relative",
    "transition-theme", // Using modern transition utility
  ],
  {
    variants: {
      variant: {
        milestone: "text-accent-milestone", // Use new theme-aware text utility
        project: "text-accent-project",     // Use new theme-aware text utility
        resource: "text-accent-resource",  // Use new theme-aware text utility
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Tag variants for UpdateCard
export const updateCardTagVariants = cva(
  // Base classes for tags
  [
    "font-mono",
    "text-caption",
    "font-medium",
    "tracking-wide",
    "uppercase",
    "inline-block",
    "mb-1.5",
    "transition-theme", // Using modern transition utility
  ],
  {
    variants: {
      variant: {
        milestone: "text-accent-milestone", // Use new theme-aware text utility
        project: "text-accent-project",     // Use new theme-aware text utility
        resource: "text-accent-resource",  // Use new theme-aware text utility
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Title hover variants for UpdateCard
export const updateCardTitleVariants = cva(
  // Base classes for titles
  [
    "font-semibold",
    "mb-1.5",
    "font-sans",
    "leading-tight",
    "text-base",
    "transition-theme" // Added transition for title color change
  ],
  {
    variants: {
      variant: {
        milestone: "text-accent-milestone group-hover:brightness-110", // Use new theme-aware text utility
        project: "text-accent-project group-hover:brightness-110",     // Use new theme-aware text utility
        resource: "text-accent-resource group-hover:brightness-110",  // Use new theme-aware text utility
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Export types for component props
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type UpdateCardVariants = VariantProps<typeof updateCardVariants>;
export type UpdateCardIconVariants = VariantProps<
  typeof updateCardIconVariants
>;
export type UpdateCardTagVariants = VariantProps<typeof updateCardTagVariants>;
export type UpdateCardTitleVariants = VariantProps<
  typeof updateCardTitleVariants
>;
