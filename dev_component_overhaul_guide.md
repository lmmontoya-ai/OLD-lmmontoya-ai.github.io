Component System Overhaul: Strategic Development Guide
1. Executive Summary & Guiding Principles
Vision Statement
Transform the portfolio website into a world-class digital presence that exemplifies modern frontend architecture while pioneering AI-agent-friendly development practices. This initiative establishes a component system that is both elegantly simple for human developers and semantically rich for AI parsing.
Core Principles
1. "Semantic & Structured for AI"
Every component, prop, and class name must be predictable and self-documenting. AI agents should understand component purpose and relationships without additional context.
2. "Consistency over Customization"
Leverage shadcn-ui's proven patterns. Customize only where brand identity demands it, never for mere preference.
3. "Accessibility by Default"
Built on Radix UI primitives, every interaction must meet WCAG 2.1 AAA standards. Accessibility is non-negotiable.
4. "Performance as a Feature"
Sub-50ms interaction times, 98+ Lighthouse scores, and optimal Core Web Vitals are baseline requirements, not aspirations.
2. Phase 1: Foundation & CSS Modernization
2.1 shadcn-ui/astro Integration Plan
Step 1: Initial Setup
bash# Install required dependencies
npm install -D tailwindcss@next @tailwindcss/vite
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot

# Install shadcn-ui CLI
npx shadcn-ui@latest init
Step 2: Configure components.json
json{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.mjs",
    "css": "src/styles/global.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
Step 3: Create Astro-Compatible Component Structure
typescript// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
Step 4: Astro Component Wrapper Pattern
astro---
// src/components/ui/Button.astro
import { Button as ReactButton } from './button.tsx'
import type { ButtonProps } from './button.tsx'

export type Props = ButtonProps

const props = Astro.props
---

<ReactButton client:load {...props}>
  <slot />
</ReactButton>
2.2 CSS Modernization Playbook
1. Simplify Color System
Why: Modern CSS color functions provide better color manipulation and reduce token complexity.
How: Migrate from RGB components to oklch color space.
Before:
css/* src/styles/theme/colors.css */
@theme {
  --color-text-primary: 28 42 77;
  --color-interactive-blue: 77 139 247;
}

/* Usage */
color: rgb(var(--color-text-primary));
After:
css/* src/styles/theme/colors.css */
@theme {
  /* Base colors in oklch for better manipulation */
  --color-brand-blue: oklch(62.3% 0.246 264.1deg);
  --color-brand-gold: oklch(75.5% 0.153 92.4deg);

  /* Semantic tokens with relative color syntax */
  --color-text-primary: oklch(from var(--color-brand-blue) l c h);
  --color-text-primary-muted: oklch(from var(--color-text-primary) calc(l * 0.8) c h);

  /* Interactive states */
  --color-interactive-blue: var(--color-brand-blue);
  --color-interactive-blue-hover: oklch(from var(--color-interactive-blue) calc(l * 0.9) c h);

  /* Dark mode overrides */
  &:is(.dark *) {
    --color-text-primary: oklch(95.5% 0.02 264.1deg);
    --color-brand-blue: oklch(72.3% 0.20 264.1deg);
  }
}
2. Leverage Tailwind v4 Features
Why: Reduce custom code and leverage native Tailwind capabilities.
How: Use Tailwind's new theme configuration system.
After:
javascript// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        // Direct CSS variable references
        brand: {
          blue: 'var(--color-brand-blue)',
          gold: 'var(--color-brand-gold)',
        },
        interactive: {
          DEFAULT: 'var(--color-interactive-blue)',
          hover: 'var(--color-interactive-blue-hover)',
        }
      },
      // Container queries
      containers: {
        card: '20rem',
        sidebar: '16rem',
      }
    }
  },
  plugins: [
    function({ addVariant }) {
      // Add custom variants for container queries
      addVariant('card-sm', '@container card (min-width: 20rem)')
      addVariant('card-lg', '@container card (min-width: 30rem)')
    }
  ]
}
3. Optimize Animation System
Why: Better performance and reduced complexity.
How: Use CSS View Transitions API and optimize keyframes.
After:
css/* src/styles/animations/modern.css */
@layer base {
  /* Enable view transitions */
  @view-transition {
    navigation: auto;
  }

  /* Optimized entrance animations */
  @starting-style {
    .animate-in {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  .animate-in {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s, transform 0.3s;
  }

  /* GPU-optimized animations */
  @keyframes slide-up {
    from {
      transform: translate3d(0, 100%, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
}
4. Reduce Utility Redundancy
Why: Cleaner codebase and better maintainability.
How: Use data attributes and CSS custom properties.
After:
css/* src/styles/utilities/interactive.css */
@layer utilities {
  /* Single utility with data attribute variants */
  .interactive-accent {
    --accent: var(--color-interactive-blue);
    position: relative;
    transition: all 0.2s;

    &[data-accent="gold"] {
      --accent: var(--color-brand-gold);
    }

    &[data-accent="success"] {
      --accent: var(--color-status-success);
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: color-mix(in oklch, var(--accent) 10%, transparent);
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover::before {
      opacity: 1;
    }
  }
}
5. Better Container Query Support
Why: Responsive components independent of viewport.
How: Implement systematic container query strategy.
After:
css/* src/styles/base/containers.css */
@layer base {
  /* Define container contexts */
  .container-root {
    container-type: inline-size;
    container-name: root;
  }

  .container-card {
    container-type: inline-size;
    container-name: card;
  }

  .container-sidebar {
    container-type: inline-size;
    container-name: sidebar;
  }
}

/* src/styles/utilities/container-responsive.css */
@layer utilities {
  /* Container query utilities */
  @container card (width > 400px) {
    .card\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card\:flex-row {
      flex-direction: row;
    }
  }

  @container sidebar (width < 200px) {
    .sidebar\:hidden {
      display: none;
    }
  }
}
6. Implement CSS Layers Properly
Why: Predictable specificity and style ordering.
How: Define explicit layer hierarchy.
After:
css/* src/styles/global.css */
/* Define layer order explicitly */
@layer reset, theme, base, shadcn, components, utilities;

/* Import in correct layers */
@import "tailwindcss/base" layer(base);
@import "./theme/index.css" layer(theme);
@import "./base/reset.css" layer(reset);
@import "./components/index.css" layer(components);
@import "tailwindcss/components" layer(components);
@import "tailwindcss/utilities" layer(utilities);

/* shadcn components go in their own layer */
@layer shadcn {
  :root {
    --radius: 0.5rem;
  }
}
7. Consolidate Shadow System
Why: Consistent, maintainable shadow system.
How: Use CSS custom properties with hsl shadows.
After:
css/* src/styles/theme/shadows.css */
@theme {
  /* Dynamic shadow color */
  --shadow-color: 220deg 13% 50%;

  /* Shadow elevation system */
  --shadow-elevation-low:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px hsl(var(--shadow-color) / 0.34),
    0.8px 1.5px 1.9px hsl(var(--shadow-color) / 0.34);

  --shadow-elevation-medium:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px hsl(var(--shadow-color) / 0.36),
    2px 4px 5px hsl(var(--shadow-color) / 0.36);

  --shadow-elevation-high:
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    1.5px 3px 3.8px hsl(var(--shadow-color) / 0.34),
    3px 6px 7.5px hsl(var(--shadow-color) / 0.34),
    5px 10px 12.6px hsl(var(--shadow-color) / 0.34),
    8.3px 16.7px 21px hsl(var(--shadow-color) / 0.34);

  /* Dark mode adjustment */
  &:is(.dark *) {
    --shadow-color: 220deg 40% 10%;
  }
}
8. Modern Gradient System
Why: Flexible, animatable gradients.
How: Use CSS custom properties and modern gradient syntax.
After:
css/* src/styles/theme/gradients.css */
@theme {
  /* Gradient stops as custom properties */
  --gradient-brand-start: var(--color-brand-blue);
  --gradient-brand-end: var(--color-brand-gold);

  /* Animatable gradient angle */
  @property --gradient-angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 135deg;
  }

  /* Gradient definitions */
  --gradient-brand: linear-gradient(
    var(--gradient-angle),
    var(--gradient-brand-start) 0%,
    var(--gradient-brand-end) 100%
  );

  --gradient-mesh:
    radial-gradient(at 40% 20%, var(--color-brand-blue) 0px, transparent 50%),
    radial-gradient(at 80% 0%, var(--color-brand-gold) 0px, transparent 50%),
    radial-gradient(at 0% 50%, var(--color-interactive-blue) 0px, transparent 50%);

  /* Animated gradient class */
  .gradient-animated {
    background: var(--gradient-brand);
    animation: gradient-rotate 8s linear infinite;
  }

  @keyframes gradient-rotate {
    to {
      --gradient-angle: 495deg;
    }
  }
}
2.3 CSS Layers Strategy
css/* src/styles/layers.css */
/* Layer hierarchy definition */
@layer reset {
  /* Minimal reset - only what's needed */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }
}

@layer theme {
  /* Design tokens only - no component styles */
  :root {
    /* Colors, spacing, typography tokens */
  }
}

@layer base {
  /* Element defaults */
  body {
    font-family: var(--font-sans);
    color: var(--color-text-primary);
  }
}

@layer shadcn {
  /* shadcn component overrides */
  /* This layer sits between base and components */
}

@layer components {
  /* Custom component styles */
  /* Higher specificity than shadcn */
}

@layer utilities {
  /* Utility classes - highest specificity */
}
3. Phase 2: Component Migration & Development
3.1 Component Migration Strategy
Priority Order (4-Week Sprint)
Week 1: Atoms

Button
Badge
Input
Label
Separator

Week 2: Molecules

Card
Alert
Avatar
Tooltip
Select

Week 3: Organisms

Dialog/Modal
Dropdown Menu
Navigation Menu
Sheet/Drawer

Week 4: Templates

Form layouts
Grid systems
Page templates

Migration Workflow
bash# For each component:
# 1. Add shadcn component
npx shadcn-ui@latest add button

# 2. Create Astro wrapper
touch src/components/ui/Button.astro

# 3. Test in isolation
touch src/pages/test/button.astro

# 4. Replace all instances
# 5. Remove old component
3.2 Guide to Customizing Shadcn Components
Standard Customization Workflow
tsx// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define custom variants aligned with brand
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-elevation-low hover:shadow-elevation-medium",
        destructive: "bg-status-error text-white hover:bg-status-error/90",
        outline: "border-2 border-border-primary bg-transparent hover:bg-surface-secondary",
        secondary: "bg-surface-secondary text-text-primary hover:bg-surface-tertiary",
        ghost: "hover:bg-surface-secondary hover:text-text-primary",
        link: "text-brand-blue underline-offset-4 hover:underline",
        // Custom brand variants
        gold: "bg-brand-gold text-brand-gold-contrast hover:bg-brand-gold/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      // Custom property for AI readability
      intent: {
        primary: "",
        secondary: "",
        danger: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      intent: "primary",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean // Custom loading state
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, intent, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, intent, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        data-intent={intent} // For AI parsing
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
3.3 Component-Specific Guides
Button Component
astro---
// src/components/ui/Button.astro
import { Button as ReactButton } from './button.tsx'
import type { ButtonProps } from './button.tsx'

export interface Props extends ButtonProps {
  href?: string
}

const { href, ...props } = Astro.props
const Component = href ? 'a' : ReactButton
---

{href ? (
  <a href={href} class={props.className}>
    <ReactButton {...props} asChild>
      <slot />
    </ReactButton>
  </a>
) : (
  <ReactButton client:load {...props}>
    <slot />
  </ReactButton>
)}
Usage in Astro:
astro---
import Button from '@/components/ui/Button.astro'
---

<!-- Standard button -->
<Button variant="default" size="lg">
  Click me
</Button>

<!-- Link button -->
<Button href="/about" variant="link">
  Learn more
</Button>

<!-- Loading state -->
<Button variant="gold" loading={true}>
  Processing...
</Button>
Card Component
astro---
// src/components/ui/Card.astro
import {
  Card as ReactCard,
  CardHeader as ReactCardHeader,
  CardTitle as ReactCardTitle,
  CardDescription as ReactCardDescription,
  CardContent as ReactCardContent,
  CardFooter as ReactCardFooter
} from './card.tsx'

export interface Props {
  class?: string
  interactive?: boolean
  featured?: boolean
}

const { class: className, interactive = false, featured = false } = Astro.props
---

<ReactCard
  client:visible
  className={cn(
    className,
    interactive && "hover:shadow-elevation-high transition-shadow cursor-pointer",
    featured && "border-l-4 border-l-brand-gold"
  )}
  data-interactive={interactive}
  data-featured={featured}
>
  <slot />
</ReactCard>

<!-- Export sub-components -->
<Fragment slot="CardHeader">
  <ReactCardHeader client:visible>
    <slot name="header" />
  </ReactCardHeader>
</Fragment>

<Fragment slot="CardContent">
  <ReactCardContent client:visible>
    <slot name="content" />
  </ReactCardContent>
</Fragment>
Best practices for Card usage:
astro---
import Card from '@/components/ui/Card.astro'
---

<Card interactive featured>
  <div slot="header">
    <h3 class="text-xl font-semibold">Project Title</h3>
    <p class="text-sm text-text-secondary">AI Safety Research</p>
  </div>

  <div slot="content">
    <p>Project description...</p>
  </div>

  <div slot="footer">
    <Button size="sm">View Project</Button>
  </div>
</Card>
Dialog/Drawer Component
astro---
// src/components/ui/Dialog.astro
import { Dialog as ReactDialog } from './dialog.tsx'

export interface Props {
  id: string
  title: string
  description?: string
}

const { id, title, description } = Astro.props

// Use Astro's unique ID for island hydration
const dialogId = `dialog-${id}-${Astro.self.moduleId}`
---

<react-dialog-wrapper
  id={dialogId}
  client:visible
  data-dialog-id={id}
>
  <ReactDialog>
    <slot name="trigger" />

    <div slot="content">
      <h2 class="text-lg font-semibold">{title}</h2>
      {description && <p class="text-sm text-text-secondary mt-2">{description}</p>}
      <div class="mt-4">
        <slot name="content" />
      </div>
    </div>
  </ReactDialog>
</react-dialog-wrapper>

<script define:vars={{ dialogId }}>
  // Handle dialog state in Astro's island architecture
  class DialogManager {
    constructor(id) {
      this.id = id
      this.dialog = document.getElementById(id)
      this.setupEventListeners()
    }

    setupEventListeners() {
      // Global event bus for dialog control
      window.addEventListener(`open-dialog-${this.id}`, () => {
        this.open()
      })

      window.addEventListener(`close-dialog-${this.id}`, () => {
        this.close()
      })
    }

    open() {
      this.dialog?.setAttribute('data-state', 'open')
    }

    close() {
      this.dialog?.setAttribute('data-state', 'closed')
    }
  }

  // Initialize when hydrated
  if (document.getElementById(dialogId)) {
    new DialogManager(dialogId)
  }
</script>
4. Phase 3: Validation, Polish & Governance
4.1 The "AI Agent Readability" Checklist
typescript// src/utils/ai-readability-audit.ts
export interface AIReadabilityChecklist {
  component: string
  checks: {
    stronglyTyped: boolean
    predictableStructure: boolean
    semanticAria: boolean
    cleanCVA: boolean
    documentedProps: boolean
    testable: boolean
  }
}

// Example audit for Button component
const buttonAudit: AIReadabilityChecklist = {
  component: 'Button',
  checks: {
    stronglyTyped: true, // ✓ All props have TypeScript types
    predictableStructure: true, // ✓ Consistent file naming and exports
    semanticAria: true, // ✓ Uses aria-busy, aria-disabled appropriately
    cleanCVA: true, // ✓ Variant logic is declarative and parseable
    documentedProps: true, // ✓ JSDoc comments on all public props
    testable: true, // ✓ data-testid and data-intent attributes
  }
}
Component Audit Template
tsx/**
 * Button component for primary user interactions
 * @ai-purpose Primary CTA and navigation actions
 * @ai-variants default, destructive, outline, secondary, ghost, link, gold
 * @ai-states default, hover, focus, disabled, loading
 */
export interface ButtonProps {
  /**
   * Visual style variant
   * @ai-semantic Indicates button importance and context
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gold'

  /**
   * Size variant
   * @ai-semantic Indicates touch target and hierarchy
   */
  size?: 'default' | 'sm' | 'lg' | 'icon'

  /**
   * Semantic intent for AI understanding
   * @ai-semantic Maps to user action type
   */
  intent?: 'primary' | 'secondary' | 'danger'

  /**
   * Loading state indicator
   * @ai-state Indicates async operation in progress
   */
  loading?: boolean
}
4.2 Performance & Accessibility Audit Plan
Automated Testing Suite
json// lighthouse.config.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "url": [
        "/",
        "/projects",
        "/blog",
        "/contact"
      ]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.98}],
        "categories:accessibility": ["error", {"minScore": 0.98}],
        "categories:best-practices": ["error", {"minScore": 0.98}],
        "categories:seo": ["error", {"minScore": 0.98}],
        "interactive": ["error", {"maxNumericValue": 2000}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1000}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.05}]
      }
    }
  }
}
Manual Audit Checklist
markdown## Performance Audit
- [ ] All images optimized and using modern formats (WebP/AVIF)
- [ ] Fonts subset and preloaded
- [ ] Critical CSS inlined
- [ ] JavaScript bundle < 100KB gzipped
- [ ] No layout shifts visible during navigation

## Accessibility Audit
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces all state changes
- [ ] Color contrast ratios meet WCAG AAA
- [ ] Focus indicators visible and consistent
- [ ] Reduced motion preferences respected
4.3 Long-term Governance
Update Protocol
yaml# .github/shadcn-update.yml
name: Shadcn Component Update Protocol

triggers:
  - monthly
  - security-advisory

process:
  1. Check for updates:
     - npx shadcn-ui@latest diff

  2. Test in isolation:
     - Create test branch
     - Update component
     - Run visual regression tests
     - Run accessibility tests

  3. Verify customizations:
     - Check variant modifications
     - Verify theme token usage
     - Test AI readability compliance

  4. Deploy:
     - Merge to main
     - Monitor metrics for 24h
Component Creation Rules
typescript// src/components/COMPONENT_RULES.md
## New Component Checklist

### Before Creating:
1. Does shadcn-ui have this component? → Use it
2. Can existing components compose this? → Compose it
3. Is this truly unique to our domain? → Build it

### If Building:
1. Follow shadcn patterns exactly
2. Use Radix UI primitives if applicable
3. Include AI documentation comments
4. Add to component library tests
5. Document in Storybook
CSS Utility Governance
css/* src/styles/UTILITY_RULES.css */

/*
 * Before adding any utility:
 * 1. Can Tailwind v4 handle this? → Use Tailwind
 * 2. Is this component-specific? → Use component styles
 * 3. Will multiple components use this? → Create utility
 *
 * Utility naming convention:
 * - Semantic, not visual: `text-primary` not `text-blue`
 * - Predictable: `hover-*`, `focus-*` patterns
 * - AI-parseable: Clear purpose from name alone
 */
Implementation Timeline
Month 1: Foundation

Week 1-2: CSS Modernization
Week 3-4: Shadcn setup and atom components

Month 2: Migration

Week 1-2: Molecule components
Week 3-4: Organism components and templates

Month 3: Polish

Week 1-2: Performance optimization
Week 3-4: AI readability audit and documentation

Success Metrics

Performance: All pages achieve 98+ Lighthouse scores
Accessibility: Zero WCAG violations at AAA level
Developer Experience: 50% reduction in component development time
AI Readability: 100% of components pass AI audit checklist
Maintenance: < 2 hours monthly for updates and governance

This plan provides a comprehensive, immediately actionable path to transform your portfolio's component system while maintaining the highest standards of quality and future-proofing for both human and AI consumers.