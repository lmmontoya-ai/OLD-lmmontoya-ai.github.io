# Tailwind CSS Patterns Documentation

**Project**: Luis Miguel Montoya Portfolio
**Created**: 2024-12-19
**Purpose**: Document Tailwind CSS patterns and best practices used in this project

---

## 🎯 Core Principles

### 1. Utility-First Approach

- **Always** prefer utility classes over custom CSS
- **Never** create custom CSS that duplicates Tailwind functionality
- **Minimize** use of `@apply` directive - only for truly reusable patterns

### 2. Component Composition

- Use **class-variance-authority (CVA)** for component variants
- Keep variant logic centralized in `src/utils/variants.ts`
- Compose complex components from smaller, reusable pieces

### 3. Theme-Aware Design

- Use Tailwind's `dark:` modifier for dark mode styles
- Leverage CSS variables only for dynamic theme values
- Prefer semantic color tokens over hardcoded values

---

## 📋 Pattern Library

### Button Patterns

**Implementation**: `src/components/ui/Button.astro`

```typescript
// Variant system using CVA
buttonVariants({
  variant: "primary" | "secondary" | "outline",
  size: "sm" | "md" | "lg",
  fullWidth: boolean,
  rounded: boolean,
});
```

**Key Patterns**:

- Base classes shared across all variants
- Variant-specific modifiers for different states
- Size variants control padding and text size
- Optional modifiers (fullWidth, rounded) as boolean variants

**Special Handling**:

- Primary buttons use inline styles for theme-aware backgrounds
- Glow effects preserved with CSS variables for complex shadows

### Card Patterns

**Implementation**: `src/components/ui/Card.astro`

```typescript
// Variant system using CVA
cardVariants({
  interactive: boolean, // Adds hover effects for clickable cards
  featured: boolean, // Adds accent border for emphasis
});
```

**Key Patterns**:

- Glassmorphism effect with `backdrop-blur` and opacity
- Interactive cards get group hover effects
- Featured cards have left border accent

**Special Effects**:

- Gradient border on hover using absolute positioned div
- Mask composite for complex border effects

### Update Card Patterns

**Implementation**: `src/components/ui/UpdateCard.astro`

```typescript
// Multiple variant systems for different parts
updateCardVariants({ variant: "milestone" | "project" | "resource" });
updateCardIconVariants({ variant: "milestone" | "project" | "resource" });
updateCardTagVariants({ variant: "milestone" | "project" | "resource" });
updateCardTitleVariants({ variant: "milestone" | "project" | "resource" });
```

**Key Patterns**:

- Separate variant systems for granular control
- Theme-aware milestone variant with conditional rendering
- Left border indicator with scale animation on hover

---

## 🎨 Color System

### Semantic Color Tokens

**Usage Pattern**:

```html
<!-- Text colors -->
<p class="text-content-primary">Primary text</p>
<p class="text-content-secondary">Secondary text</p>
<p class="text-interactive-secondary">Interactive/highlight text</p>

<!-- Background colors -->
<div class="bg-surface">Surface background</div>
<div class="bg-secondary">Card background</div>

<!-- Border colors -->
<div class="border-primary">Primary border</div>
```

### Theme-Aware Utilities

**Modern Semantic Utilities**:

- `.text-content-primary` - Primary text color
- `.text-content-secondary` - Secondary text color
- `.text-interactive-secondary` - Interactive/highlight color
- `.shadow-themed-*` - Theme-aware shadow system
- `.bg-secondary` - Theme-aware card backgrounds

### CSS Variables for Theming (Tailwind v4+)

With the move to Tailwind CSS v4 and a modular CSS structure, theme colors are primarily defined as CSS custom properties (variables) in `src/styles/theme/colors.css`. This allows for greater flexibility and easier management of themes.

**Definition Example (`src/styles/theme/colors.css`):**

```css
/* Light theme variables */
:root {
  --color-text-primary: 28 42 77; /* #1C2A4D */
  --color-background: 248 250 253; /* #F8FAFD */
  /* ... more light theme variables ... */
}

/* Dark theme variables */
.dark {
  --color-text-primary: 248 250 252; /* #F8FAFC */
  --color-background: 15 27 43; /* #0F1B2B */
  /* ... more dark theme variables ... */
}
```

**Usage in Tailwind Configuration (Conceptual for v4):**

While Tailwind v4 aims to simplify configuration, you might still reference these CSS variables within your `tailwind.config.mjs` if you need to extend Tailwind's default theme with these variables for utility class generation.

```javascript
// tailwind.config.mjs (example)
export default {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
      },
    },
  },
};
```

**Usage in Custom CSS or Components:**

When writing custom CSS (e.g., for complex components or utilities not covered by Tailwind), or when needing to apply these colors directly (e.g., in Astro components via style attributes for dynamic scenarios), use the `rgb(var(...) / <alpha-value>)` syntax for opacity control.

```html
<!-- Example in an Astro component -->
<div style=`color: rgb(var(--color-text-primary)); background-color: rgb(var(--color-background) / 0.5)`>
  This text uses theme variables.
</div>
```

**Key Advantages:**

- **Centralized Definitions**: Theme colors are managed in one place.
- **Dynamic Theming**: Easily switch themes by changing the class on the root element (e.g., `<html>` or `<body>`).
- **Opacity Control**: The `rgb(var(...) / <alpha-value>)` syntax allows for applying alpha transparency directly where the color is used.
- **Interoperability**: CSS variables can be used by Tailwind, custom CSS, and JavaScript if needed.

Always prefer using Tailwind utility classes generated from these variables (e.g., `text-primary`, `bg-background`) where possible. Fall back to direct CSS variable usage only when necessary.

---

## 🚫 Anti-Patterns to Avoid

### ❌ Don't Use @apply for Simple Utilities

```css
/* BAD - Don't do this */
.my-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
```

```html
<!-- GOOD - Use utilities directly -->
<button class="px-4 py-2 bg-blue-500 text-white rounded"></button>
```

### ❌ Don't Create Custom CSS for Existing Utilities

```css
/* BAD - Tailwind already has these */
.text-large {
  font-size: 1.25rem;
}
.mt-large {
  margin-top: 2rem;
}
```

```html
<!-- GOOD - Use Tailwind's scale -->
<p class="text-xl mt-8"></p>
```

### ❌ Don't Mix Approaches

```html
<!-- BAD - Mixing inline styles with utilities -->
<div class="p-4" style="background-color: #f0f0f0;"></div>
```

```html
<!-- GOOD - Use consistent approach -->
<div class="p-4 bg-gray-100"></div>
```

---

## ✅ When to Use Inline Styles

Inline styles are acceptable ONLY for:

1. **Dynamic theme values** that can't be expressed as utilities
2. **Complex gradients** not available in Tailwind
3. **CSS variables** for advanced effects (shadows, glows)
4. **Mask composites** and other advanced CSS features

**Current Valid Uses**:

- Theme-aware button backgrounds (Button.astro)
- Complex gradient borders (Card.astro)
- Theme-aware milestone colors (UpdateCard.astro)
- Gradient backgrounds (UpdatesContainer.astro)

---

## 🔧 Maintenance Guidelines

### Adding New Components

1. **Start with utilities** - Write all styles using Tailwind classes
2. **Identify variants** - Extract common patterns into CVA variants
3. **Centralize logic** - Add variants to `src/utils/variants.ts`
4. **Document patterns** - Update this file with new patterns

### Modifying Existing Components

1. **Preserve functionality** - Don't break existing features
2. **Follow established patterns** - Use CVA for variants
3. **Maintain consistency** - Use same naming conventions
4. **Test thoroughly** - Check both themes and all breakpoints

### Performance Considerations

1.  **Leverage Tailwind v4 JIT**: The new engine is designed for performance, generating only the CSS that is actually used.
2.  **Modular CSS Imports**: Ensure `global.css` correctly imports all necessary modular files. Astro will handle bundling and optimization.
3.  **Minimize Custom CSS**: Stick to utility classes and CSS variables as much as possible. Custom CSS should be minimal and well-justified.
4.  **CSS Variable Usage**: While powerful, excessive use of CSS variables in highly dynamic contexts *could* have performance implications. Profile if unsure.
5.  **Purging (Handled by Tailwind v4)**: Tailwind v4 inherently includes only the CSS needed, so manual PurgeCSS configuration is less of a concern for basic setups.

---

## 📚 Resources

- [Tailwind CSS v4 Alpha Documentation](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [class-variance-authority](https://cva.style/docs)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/utility-first)

---

## 🎯 Component Class Guidelines

### When Component Classes ARE Acceptable

Component classes should ONLY be created when:

1. **Complex pseudo-elements** that can't be achieved with utilities
2. **Animation keyframes** that require `@keyframes` definitions
3. **Third-party integration** that requires specific class names

### Current Component Classes

Currently, this project uses **ZERO component classes** in CSS. All styling is achieved through:

- Tailwind utility classes
- CVA variant systems
- Minimal inline styles for dynamic values

This approach should be maintained going forward.

---

**Last Updated**: 2024-12-19
**Maintainer**: Development Team
