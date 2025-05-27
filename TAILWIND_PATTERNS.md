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
<p class="text-themed">Primary text</p>
<p class="text-themed-secondary">Secondary text</p>

<!-- Background colors -->
<div class="bg-surface">Surface background</div>
<div class="bg-card-themed">Card background</div>

<!-- Border colors -->
<div class="border-themed">Themed border</div>
```

### Theme-Aware Utilities

**Custom Utilities Created**:

- `.text-highlight-themed` - Theme-aware highlight color
- `.shadow-themed-*` - Theme-aware shadow system
- `.bg-card-themed` - Theme-aware card backgrounds

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

1. **Avoid arbitrary values** - Use Tailwind's scale when possible
2. **Minimize unique classes** - Reuse common patterns
3. **Leverage PurgeCSS** - Ensure unused styles are removed
4. **Use CSS variables sparingly** - Only for truly dynamic values

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
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
