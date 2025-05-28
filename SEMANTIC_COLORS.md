# 🎨 Semantic Color Token System

## Overview

This document describes the semantic color token system implemented in the Luis Miguel Montoya portfolio. The system provides meaningful, context-aware color names that automatically adapt to light and dark themes.

## Design Philosophy

### ✅ Semantic Naming

Instead of generic names like `primary` or `blue-500`, use meaningful names that describe the **purpose** of the color:

```html
<!-- ❌ Generic naming -->
<div class="text-primary bg-secondary border-accent">
  <!-- ✅ Semantic naming -->
  <div class="text-content-primary bg-secondary border-primary"></div>
</div>
```

### ✅ Theme Awareness

All semantic tokens automatically adapt between light and dark themes without additional classes:

```html
<!-- ✅ Automatically theme-aware -->
<div class="text-content-primary">
  This text is white in dark mode, navy in light mode
</div>

<!-- ❌ Manual theme switching (old way) -->
<div class="text-white dark:text-navy">Manual theme switching</div>
```

## Color Token Categories

### 1. Brand Colors

Core brand identity colors that remain consistent across themes.

```css
brand: {
  primary: "59 130 246",    // Blue - main brand color
  secondary: "212 175 55",  // Gold - accent brand color
}
```

**Usage:**

```html
<div class="text-brand-primary">Brand blue text</div>
<div class="bg-brand-secondary">Brand gold background</div>
```

### 2. Content Colors

Text and content colors that adapt to theme backgrounds.

```css
content: {
  primary: "248 250 252",    // Main text (white in dark, navy in light)
  secondary: "203 213 225",  // Secondary text (light gray in dark, dark gray in light)
  tertiary: "148 163 184",   // Muted text
  inverse: "28 42 77",       // Text for light backgrounds
}
```

**Usage:**

```html
<h1 class="text-content-primary">Main heading</h1>
<p class="text-content-secondary">Secondary text</p>
<span class="text-content-tertiary">Muted text</span>
```

### 3. Background Colors

Surface and background colors that create proper contrast.

```css
bg: {
  primary: "15 27 43",           // Main background
  secondary: "30 41 59",         // Card/surface background
  tertiary: "11 20 31",          // Footer/deeper background
  inverse: "248 250 253",        // Light theme background
  "inverse-secondary": "255 255 255", // Light theme cards
}
```

**Usage:**

```html
<div class="bg-primary">Main page background</div>
<div class="bg-secondary">Card background</div>
<footer class="bg-tertiary">Footer background</footer>
```

### 4. Interactive Colors

Colors for buttons, links, and interactive elements.

```css
interactive: {
  primary: "59 130 246",     // Primary buttons, links
  secondary: "212 175 55",   // Secondary buttons, highlights
  hover: "77 139 247",       // Hover states
  focus: "59 130 246",       // Focus rings
  disabled: "100 116 139",   // Disabled states
}
```

**Usage:**

```html
<button class="bg-interactive-primary">Primary button</button>
<button class="bg-interactive-secondary">Secondary button</button>
<a class="text-interactive-primary hover:text-interactive-hover">Link</a>
```

### 5. Status Colors

Colors that communicate state and status.

```css
status: {
  success: "34 197 94",      // Success states, completed items
  warning: "249 115 22",     // Warning states, in-progress items
  error: "239 68 68",        // Error states
  info: "59 130 246",        // Info states
}
```

**Usage:**

```html
<div class="text-status-success">✓ Completed</div>
<div class="text-status-warning">⚠ In Progress</div>
<div class="text-status-error">✗ Error</div>
```

### 6. Border Colors

Border colors that provide proper contrast and hierarchy.

```css
border: {
  primary: "100 116 139",    // Default borders
  secondary: "51 65 85",     // Subtle borders
  accent: "59 130 246",      // Accent borders
  inverse: "228 231 235",    // Light theme borders
}
```

**Usage:**

```html
<div class="border border-primary">Default border</div>
<div class="border border-secondary">Subtle border</div>
<div class="border border-accent">Accent border</div>
```

## Theme-Aware Utilities

The system includes custom utilities that automatically switch between themes:

### Content/Text Utilities

```css
.text-content-primary     /* Main text color */
/* Main text color */
/* Main text color */
/* Main text color */
.text-content-secondary   /* Secondary text color */
.text-content-tertiary; /* Muted text color */
```

### Background Utilities

```css
.bg-primary              /* Main background */
/* Main background */
/* Main background */
/* Main background */
.bg-secondary            /* Card/surface background */
.bg-tertiary; /* Footer/deeper background */
```

### Border Utilities

```css
.border-primary          /* Default border color */
/* Default border color */
/* Default border color */
/* Default border color */
.border-secondary; /* Subtle border color */
```

### Interactive Utilities

```css
.text-interactive-primary     /* Primary interactive text */
/* Primary interactive text */
/* Primary interactive text */
/* Primary interactive text */
.text-interactive-secondary   /* Secondary interactive text */
.bg-interactive-primary       /* Primary interactive background */
.bg-interactive-secondary; /* Secondary interactive background */
```

### Status Utilities

```css
.text-status-success     /* Success text color */
/* Success text color */
/* Success text color */
/* Success text color */
.text-status-warning     /* Warning text color */
.bg-status-success       /* Success background color */
.bg-status-warning; /* Warning background color */
```

## Migration Guide

### From Generic Colors

```html
<!-- ❌ Before -->
<div class="text-white bg-slate-700 border-slate-500">
  <!-- ✅ After -->
  <div class="text-content-primary bg-secondary border-primary"></div>
</div>
```

### From Manual Theme Classes

```html
<!-- ❌ Before -->
<div class="text-white dark:text-slate-900 bg-slate-900 dark:bg-white">
  <!-- ✅ After -->
  <div class="text-content-primary bg-primary"></div>
</div>
```

### From CSS Variables

```html
<!-- ❌ Before -->
<div style="color: rgb(var(--color-text));">
  <!-- ✅ After -->
  <div class="text-content-primary"></div>
</div>
```

## Best Practices

### 1. Use Semantic Names

Always choose the most semantic name for your use case:

```html
<!-- ✅ Good -->
<h1 class="text-content-primary">Page Title</h1>
<p class="text-content-secondary">Description</p>
<button class="bg-interactive-primary">Action</button>

<!-- ❌ Avoid -->
<h1 class="text-white">Page Title</h1>
<p class="text-gray-300">Description</p>
<button class="bg-blue-500">Action</button>
```

### 2. Leverage Theme Awareness

Let the system handle theme switching automatically:

```html
<!-- ✅ Good - automatic theme switching -->
<div class="text-content-primary bg-secondary">
  Content that adapts to theme
</div>

<!-- ❌ Avoid - manual theme classes -->
<div class="text-white dark:text-slate-900 bg-slate-700 dark:bg-white">
  Manual theme switching
</div>
```

### 3. Use Status Colors Appropriately

Use status colors to communicate meaning:

```html
<!-- ✅ Good -->
<div class="text-status-success">Task completed</div>
<div class="text-status-warning">In progress</div>
<div class="text-status-error">Failed</div>

<!-- ❌ Avoid -->
<div class="text-green-500">Task completed</div>
<div class="text-orange-500">In progress</div>
<div class="text-red-500">Failed</div>
```

### 4. Maintain Consistency

Use the same semantic tokens for similar UI elements:

```html
<!-- ✅ Good - consistent card styling -->
<div class="bg-secondary border border-primary text-content-primary">
  Card 1
</div>
<div class="bg-secondary border border-primary text-content-primary">
  Card 2
</div>

<!-- ❌ Avoid - inconsistent styling -->
<div class="bg-slate-700 border border-slate-500 text-white">Card 1</div>
<div class="bg-gray-800 border border-gray-600 text-gray-100">Card 2</div>
```

## Backward Compatibility

The original color system remains available for backward compatibility:

```css
// Legacy colors still work
primary: { DEFAULT: "15 23 42", light: "28 42 77" }
accent: { DEFAULT: "59 130 246", light: "77 139 247" }
highlight: { DEFAULT: "212 175 55", light: "208 124 92" }
```

**All legacy utilities have been migrated to modern semantic utilities:**

- `text-themed` → `text-content-primary`
- `text-themed-secondary` → `text-content-secondary`
- `text-highlight-themed` → `text-interactive-secondary`
- `bg-themed` → `bg-primary`
- `bg-card-themed` → `bg-secondary`

## Examples

### Card Component

```html
<div class="bg-secondary border border-primary rounded-card p-6">
  <h3 class="text-content-primary font-semibold mb-2">Card Title</h3>
  <p class="text-content-secondary mb-4">Card description text</p>
  <button class="bg-interactive-primary text-white px-4 py-2 rounded">
    Action
  </button>
</div>
```

### Status Badge

```html
<span class="bg-status-success text-white px-2 py-1 rounded text-sm">
  Completed
</span>
<span class="bg-status-warning text-white px-2 py-1 rounded text-sm">
  In Progress
</span>
```

### Navigation Link

```html
<a
  class="text-content-secondary hover:text-interactive-primary transition-colors"
>
  Navigation Link
</a>
```

This semantic color system provides a more maintainable, intuitive, and theme-aware approach to styling the portfolio while preserving all existing functionality.
