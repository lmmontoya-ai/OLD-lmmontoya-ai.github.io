// src/utils/variants.ts
// Component variant utilities using class-variance-authority
// Centralizes variant logic and removes conditional class logic from components

import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";

// Utility function to merge classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Button component variants
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
    "transition-all",
    "duration-spring",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        primary: [
          // Background and text (background set via inline style for CSS variable)
          "text-slate-900",
          "border",
          "border-transparent",
          "shadow-themed-sm",
          "focus-visible:ring-amber-500",
          // Hover effects
          "hover:-translate-y-0.5",
          "hover:brightness-105",
          "hover:shadow-themed-lg",
          // Active state
          "active:-translate-y-px",
          "active:transition-all",
          "active:duration-100",
        ],
        secondary: [
          // Background and text
          "bg-transparent",
          "text-white",
          "border-2",
          "border-white/50",
          "backdrop-blur-button",
          "focus-visible:ring-blue-500",
          // Hover effects
          "hover:text-blue-500",
          "hover:border-blue-500",
          "hover:bg-blue-500/5",
          "hover:-translate-y-px",
          "hover:shadow-themed-md",
        ],
        outline: [
          // Background and text
          "bg-transparent",
          "text-themed-secondary",
          "border",
          "border-slate-500/20",
          "focus-visible:ring-blue-500",
          // Hover effects
          "hover:border-blue-500/30",
          "hover:text-themed",
          "hover:-translate-y-px",
        ],
      },
      size: {
        sm: ["text-sm", "px-3", "py-1.5", "rounded-lg"],
        md: ["px-4", "py-2", "rounded-lg"],
        lg: ["text-lg", "px-6", "py-3", "rounded-xl"],
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
    "transition-all",
    "duration-spring",
    // Background and backdrop
    "bg-card-themed/80",
    "backdrop-blur-card",
    // Border and shadow
    "border",
    "border-themed",
    "shadow-themed-sm",
    // Padding
    "p-8",
    "lg:p-10",
  ],
  {
    variants: {
      interactive: {
        true: [
          "group",
          "hover:-translate-y-1",
          "hover:shadow-themed-xl",
          "hover:border-blue-500/20",
        ],
        false: "",
      },
      featured: {
        true: ["border-l-4", "border-l-blue-500"],
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
    "rounded-xl",
    "m-px",
    "transition-all",
    "duration-theme",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-blue-500",
    "focus-visible:outline-offset-2",
    // Hover effects
    "hover:translate-x-1",
  ],
  {
    variants: {
      variant: {
        milestone: "", // Special handling with inline styles for theme awareness
        project: "hover:bg-blue-500/3",
        resource: "hover:bg-emerald-500/3",
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
    "transition-all",
    "duration-theme",
  ],
  {
    variants: {
      variant: {
        milestone: "", // Will be set with inline styles for theme awareness
        project: "text-blue-500",
        resource: "text-emerald-500",
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
    "transition-all",
    "duration-theme",
  ],
  {
    variants: {
      variant: {
        milestone: "", // Will be set with inline styles for theme awareness
        project: "text-blue-500",
        resource: "text-emerald-500",
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
    "text-themed",
    "mb-1.5",
    "font-sans",
    "leading-tight",
    "text-base",
  ],
  {
    variants: {
      variant: {
        milestone: "group-hover:text-blue-500", // Special handling for milestone
        project: "group-hover:text-blue-500",
        resource: "group-hover:text-emerald-500",
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
