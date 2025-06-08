// src/utils/variants.ts
// Semantic component variants using custom color tokens

import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";

// =====================
// Utility Functions
// =====================

/**
 * Utility function to merge classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// =====================
// Button Variants
// =====================

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-semibold",
    "tracking-tight",
    "relative",
    "overflow-hidden",
    "transition-theme",
    "focus-ring",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-interactive-blue",
          "text-content-inverse",
          "border",
          "border-transparent",
          "shadow-themed-sm",
          "transition-spring",
          "hover:shadow-themed-md",
          "focus-ring",
          "button-glow",
        ],
        secondary: [
          "bg-transparent",
          "text-primary",
          "border-2",
          "border-primary",
          "backdrop-blur-sm",
          "hover:text-interactive-blue",
          "hover:border-interactive-blue",
          "hover:bg-interactive-blue/5",
          "transition-spring",
          "hover:shadow-themed-sm",
          "focus-ring",
        ],
        outline: [
          "bg-transparent",
          "text-secondary",
          "border",
          "border-subtle",
          "hover:border-interactive-blue",
          "hover:text-primary",
          "transition-spring",
          "focus-ring",
        ],
        roadmap: [
          "bg-interactive-gold",
          "text-content-inverse",
          "border",
          "border-transparent",
          "transition-spring",
          "hover:shadow-themed-md",
          "font-semibold",
          "focus-ring",
          "button-glow",
        ],
      },
      size: {
        sm: ["text-sm", "px-3", "py-1.5", "rounded-md"],
        md: ["px-4", "py-2", "rounded-lg"],
        lg: ["text-lg", "px-6", "py-3", "rounded-lg"],
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


// =====================
// Update Card Variants
// =====================

export const updateCardVariants = cva(
  [
    "update-card",
    "relative",
    "block",
    "group",
    "p-4",
    "px-5",
    "rounded-lg",
    "transition-spring",
    "focus-ring",
    "bg-surface-secondary/50",
    "backdrop-blur-sm",
  ],
  {
    variants: {
      variant: {
        milestone: "hover-milestone",
        project: "hover-project",
        resource: "hover-resource",
        literature: "hover-resource",
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Icon variants for UpdateCard - Using semantic utilities with enhanced animations
export const updateCardIconVariants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "w-9",
    "h-9",
    "flex-shrink-0",
    "transition-spring",
    "group-hover:scale-110",
    "group-hover:rotate-3",
  ],
  {
    variants: {
      variant: {
        milestone: "text-milestone",
        project: "text-project",
        resource: "text-resource",
        literature: "text-resource",
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Tag variants for UpdateCard - Using semantic utilities
export const updateCardTagVariants = cva(
  [
    "font-mono",
    "text-xs",
    "font-medium",
    "tracking-wide",
    "uppercase",
    "inline-block",
    "mb-1.5",
    "transition-theme",
    "bg-surface-primary",
  ],
  {
    variants: {
      variant: {
        milestone: "text-milestone",
        project: "text-project",
        resource: "text-resource",
        literature: "text-resource",
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// Title variants for UpdateCard - Using semantic utilities with enhanced hover effects
export const updateCardTitleVariants = cva(
  [
    "font-semibold",
    "mb-1.5",
    "font-sans",
    "leading-tight",
    "text-base",
    "text-primary",
    "transition-spring",
    "group-hover:translate-x-1",
  ],
  {
    variants: {
      variant: {
        milestone: "group-hover:text-milestone",
        project: "group-hover:text-project",
        resource: "group-hover:text-resource",
        literature: "group-hover:text-resource",
      },
    },
    defaultVariants: {
      variant: "milestone",
    },
  }
);

// =====================
// Project Card Variants
// =====================

export const projectCardVariants = cva(
  [
    "group",
    "relative",
    "overflow-hidden",
    "rounded-xl",
    "bg-surface-primary",
    "backdrop-blur-sm",
    "border",
    "border-primary",
    "p-6",
    "min-h-80", // Standardized minimum height for consistent sizing
    "flex",
    "flex-col",
    "transition-spring",
    "hover:shadow-themed-lg",
    "hover:-translate-y-1",
  ],
  {
    variants: {
      status: {
        completed: ["border-l-4", "border-l-[oklch(var(--color-status-success))]"],
        "in-progress": ["border-l-4", "border-l-[oklch(var(--color-status-warning))]"],
        planned: ["border-l-4", "border-l-[oklch(var(--color-interactive-blue))]"],
        published: ["border-l-4", "border-l-[oklch(var(--color-interactive-blue))]"],
        draft: ["border-l-4", "border-l-[oklch(var(--color-border-subtle))]"],
        archived: ["border-l-4", "border-l-[oklch(var(--color-text-tertiary))]"],
      },
    },
    defaultVariants: {
      status: "in-progress",
    },
  }
);

// Literature Card Variants
export const literatureCardVariants = cva(
  [
    "group",
    "relative",
    "overflow-hidden",
    "rounded-xl",
    "bg-surface-primary",
    "backdrop-blur-sm",
    "border",
    "border-primary",
    "p-6",
    "min-h-80", // Standardized minimum height for consistent sizing
    "flex",
    "flex-col",
    "transition-spring",
    "hover:shadow-themed-lg",
    "hover:border-interactive-blue/30",
    "hover:-translate-y-1",
  ],
  {
    variants: {
      type: {
        Paper: ["bg-gradient-to-br", "from-surface-primary", "to-[oklch(var(--color-interactive-blue)/0.05)]"],
        Book: ["bg-gradient-to-br", "from-surface-primary", "to-[oklch(var(--color-status-success)/0.05)]"],
        Video: ["bg-gradient-to-br", "from-surface-primary", "to-[oklch(var(--color-accent-tutorial)/0.05)]"],
        Blog: ["bg-gradient-to-br", "from-surface-primary", "to-[oklch(var(--color-status-warning)/0.05)]"],
        Course: ["bg-gradient-to-br", "from-surface-primary", "to-[oklch(var(--color-accent-update)/0.05)]"],
      },
    },
    defaultVariants: {
      type: "Paper",
    },
  }
);

// Blog Card Variants
export const blogCardVariants = cva(
  [
    "group",
    "relative",
    "overflow-hidden",
    "rounded-xl",
    "bg-surface-primary",
    "backdrop-blur-sm",
    "border",
    "border-primary",
    "p-6",
    "min-h-80", // Standardized minimum height for consistent sizing
    "flex",
    "flex-col",
    "transition-spring",
    "hover:shadow-themed-lg",
    "hover:-translate-y-1",
  ],
  {
    variants: {
      category: {
        Research: ["border-l-4", "border-l-[oklch(var(--color-interactive-blue))]"],
        Technical: ["border-l-4", "border-l-[oklch(var(--color-status-success))]"],
        Reflection: ["border-l-4", "border-l-[oklch(var(--color-interactive-gold))]"],
        Resource: ["border-l-4", "border-l-[oklch(var(--color-status-warning))]"],
        Tutorial: ["border-l-4", "border-l-[oklch(var(--color-accent-tutorial))]"],
        Update: ["border-l-4", "border-l-[oklch(var(--color-accent-update))]"],
      },
    },
    defaultVariants: {
      category: "Research",
    },
  }
);

// Export types for component props
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type UpdateCardVariants = VariantProps<typeof updateCardVariants>;
export type UpdateCardIconVariants = VariantProps<typeof updateCardIconVariants>;
export type UpdateCardTagVariants = VariantProps<typeof updateCardTagVariants>;
export type UpdateCardTitleVariants = VariantProps<typeof updateCardTitleVariants>;
export type ProjectCardVariants = VariantProps<typeof projectCardVariants>;
export type LiteratureCardVariants = VariantProps<typeof literatureCardVariants>;
export type BlogCardVariants = VariantProps<typeof blogCardVariants>;

// =====================
// Pill Variants
// =====================

export const pillVariants = cva(
  [
    "inline-flex",
    "items-center",
    "px-3",
    "py-1.5",
    "font-mono",
    "text-xs",
    "font-semibold",
    "uppercase",
    "rounded-full",
    "border",
    "transition-all",
    "duration-200",
    "ease-in-out",
    "focus-ring",
    "cursor-pointer",
    "hover:-translate-y-px",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-secondary",
          "text-text-secondary",
          "border-border-primary",
          "hover:bg-surface-tertiary",
          "hover:text-text-primary",
          "hover:border-interactive-blue",
        ],
        completed: [
          "bg-[oklch(var(--color-status-success)/0.1)]",
          "text-status-success",
          "border-[oklch(var(--color-status-success)/0.2)]",
          "hover:bg-[oklch(var(--color-status-success)/0.2)]",
          "hover:border-status-success",
        ],
        "in-progress": [
          "bg-[oklch(var(--color-status-warning)/0.1)]",
          "text-status-warning",
          "border-[oklch(var(--color-status-warning)/0.2)]",
          "hover:bg-[oklch(var(--color-status-warning)/0.2)]",
          "hover:border-status-warning",
        ],
        planned: [
          "bg-[oklch(var(--color-interactive-blue)/0.1)]",
          "text-interactive-blue",
          "border-[oklch(var(--color-interactive-blue)/0.2)]",
          "hover:bg-[oklch(var(--color-interactive-blue)/0.2)]",
          "hover:border-interactive-blue",
        ],
        research: [
          "bg-accent-research/10",
          "text-accent-research",
          "border-accent-research/20",
          "hover:bg-accent-research/20",
          "hover:border-accent-research",
        ],
        technical: [
          "bg-accent-technical/10",
          "text-accent-technical",
          "border-accent-technical/20",
          "hover:bg-accent-technical/20",
          "hover:border-accent-technical",
        ],
        reflection: [
          "bg-accent-reflection/10",
          "text-accent-reflection",
          "border-accent-reflection/20",
          "hover:bg-accent-reflection/20",
          "hover:border-accent-reflection",
        ],
        resource: [
          "bg-accent-resource/10",
          "text-accent-resource",
          "border-accent-resource/20",
          "hover:bg-accent-resource/20",
          "hover:border-accent-resource",
        ],
        tutorial: [
          "bg-accent-tutorial/10",
          "text-accent-tutorial",
          "border-accent-tutorial/20",
          "hover:bg-accent-tutorial/20",
          "hover:border-accent-tutorial",
        ],
        update: [
          "bg-accent-update/10",
          "text-accent-update",
          "border-accent-update/20",
          "hover:bg-accent-update/20",
          "hover:border-accent-update",
        ],
        roadmap: [
          "bg-transparent",
          "text-text-primary",
          "border-text-primary",
          "hover:bg-surface-tertiary",
          "hover:text-text-primary",
          "hover:border-interactive-blue",
        ],
      },
      active: {
        true: "shadow-md",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        active: true,
        class:
          "bg-surface-tertiary text-interactive-blue border-interactive-blue",
      },
      {
        variant: "completed",
        active: true,
        class: "bg-status-success text-surface-primary border-status-success",
      },
      {
        variant: "in-progress",
        active: true,
        class: "bg-status-warning text-surface-primary border-status-warning",
      },
      {
        variant: "planned",
        active: true,
        class: "bg-interactive-blue text-surface-primary border-interactive-blue",
      },
      {
        variant: "research",
        active: true,
        class: "bg-accent-research text-surface-primary border-accent-research",
      },
      {
        variant: "technical",
        active: true,
        class: "bg-accent-technical text-surface-primary border-accent-technical",
      },
      {
        variant: "reflection",
        active: true,
        class:
          "bg-accent-reflection text-interactive-gold-contrast border-accent-reflection",
      },
      {
        variant: "resource",
        active: true,
        class: "bg-accent-resource text-surface-primary border-accent-resource",
      },
      {
        variant: "tutorial",
        active: true,
        class: "bg-accent-tutorial text-surface-primary border-accent-tutorial",
      },
      {
        variant: "update",
        active: true,
        class: "bg-accent-update text-surface-primary border-accent-update",
      },
      {
        variant: "roadmap",
        active: true,
        class: "bg-text-primary text-surface-primary border-text-primary",
      },
    ],
    defaultVariants: {
      variant: "default",
      active: false,
    },
  }
);

export type PillVariants = VariantProps<typeof pillVariants>;

// NavLink component variants - Using semantic utilities
export const navLinkVariants = cva(
  [
    "relative",
    "group",
    "transition-spring",
  ],
  {
    variants: {
      variant: {
        desktop: [
          "flex",
          "items-center",
          "h-10",
          "px-3",
          "font-medium",
          "font-mono",
          "text-sm",
          "rounded-lg",
        ],
        mobile: [
          "py-3",
          "border-b",
          "border-subtle",
          "flex",
          "items-center",
          "justify-between",
          "font-mono",
          "transform",
          "hover:translate-x-1",
        ],
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "desktop",
        active: true,
        class: "text-interactive-blue",
      },
      {
        variant: "desktop",
        active: false,
        class: "text-primary hover:text-interactive-blue",
      },
      {
        variant: "mobile",
        active: true,
        class: "text-interactive-blue border-interactive-blue/30",
      },
      {
        variant: "mobile",
        active: false,
        class: "text-primary hover:text-interactive-blue",
      },
    ],
    defaultVariants: {
      variant: "desktop",
      active: false,
    },
  }
);

export type NavLinkVariants = VariantProps<typeof navLinkVariants>;