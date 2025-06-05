# Color Audit Report

**Date:** June 5, 2025

## Introduction

This document details the audit of color usage across the Luis Miguel Montoya portfolio website. It identifies color definitions, usage patterns, and adherence to the project's color guidelines. The key guidelines include:

*   Preferring semantic color tokens defined in `tailwind.config.mjs` or `src/styles/theme/colors.css`.
*   Ensuring semantic tokens automatically adapt to light/dark themes.
*   Using the `oklch` format for custom color definitions as per `dev_component_overhaul_guide.md`.
*   Avoiding hardcoded color values (hex, rgb, named colors) directly in components or utility stylesheets.
*   Ensuring colors in `src/utils/variants.ts` use Tailwind classes derived from the theme or CSS variables.

## File-by-File Analysis

This section will be populated as files are analyzed.

### `src/utils/variants.ts`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/utils/variants.ts`
*   **Overall Assessment:** This file is central to the component styling and demonstrates a mix of good practices (use of semantic tokens) and areas needing immediate attention to align with project guidelines.
*   **Guideline Adherence & Violations:**
    *   **Mostly Good:** The file heavily relies on `cva` to create component variants using Tailwind utility classes, which is the correct approach. Many classes are semantic tokens (e.g., `bg-interactive-blue`, `text-primary`, `border-subtle`).
    *   **Violation (`buttonVariants`):** The `primary` variant uses `text-white`. This is a non-semantic, hardcoded color name. It should be replaced with a semantic token like `text-on-interactive` or `text-inverse` to ensure it adapts correctly with themes.
    *   **Violation (`literatureCardVariants`):** The `type` variants use hardcoded default Tailwind colors for gradients (e.g., `to-blue-500/5`, `to-green-500/5`). These are not part of the defined design system palette and will not adapt to themes. They should be replaced with semantic CSS variables (e.g., `to-[rgb(var(--color-interactive-blue)/0.05)]`).
    *   **Critical Violation (`blogCardVariants`):** The `category` variants for `Tutorial` and `Update` use hardcoded, arbitrary RGB values: `border-l-[rgb(134,25,143)]` and `border-l-[rgb(6,182,212)]`. This is a major violation of the design system principles. These colors must be replaced with new semantic CSS variables defined in `colors.css` (e.g., `--color-accent-tutorial`, `--color-accent-update`).
    *   **Good (with caveat):** `projectCardVariants` and `blogCardVariants` correctly use CSS variables for status borders (e.g., `border-l-[rgb(var(--color-status-success))]`). However, the `rgb()` function wrapper will need to be updated to `oklch()` once the color variables in `colors.css` are migrated to the `oklch` color space. This is a systematic change required across the project.
    *   **Needs Investigation:** `updateCardVariants` uses custom hover classes: `hover-milestone`, `hover-project`, `hover-resource`. Their definitions must be located (likely in `src/styles/utilities/semantic-colors.css`) and audited to ensure they use semantic tokens correctly.
*   **Recommendations:**
    1.  **Immediate:** Replace the hardcoded `rgb(...)` values in `blogCardVariants` with new semantic color variables.
    2.  **Immediate:** Replace the hardcoded Tailwind gradient colors in `literatureCardVariants` with semantic variables.
    3.  Replace `text-white` in `buttonVariants` with a semantic token.
    4.  Plan for the systematic replacement of the `rgb()` wrapper with `oklch()` across this file after the `colors.css` migration is complete.
    5.  Locate and audit the definitions of custom `hover-*` classes.

### Initial Analysis based on Provided Context:

#### `src/utils/variants.ts` (from attachment `variants.ts`)

*   **Overall:** Primarily uses Tailwind utility classes, which is good. Many classes appear to be semantic theme tokens (e.g., `bg-interactive-blue`, `text-primary`, `border-subtle`, `text-milestone`, `bg-surface-secondary`). It also correctly uses CSS variables for status colors in `projectCardVariants` (e.g., `border-l-[rgb(var(--color-status-success))]`).
*   **Points to Investigate:**
    *   `text-white`: Used in `buttonVariants.primary`. Check if a semantic equivalent like `text-content-inverse` or `text-on-interactive` is available or should be created.
    *   Classes like `hover-milestone`, `hover-project`, `hover-resource`: These are not standard Tailwind classes and imply custom CSS. Their color definitions need to be located and checked for adherence to guidelines.
    *   The `dev_component_overhaul_guide.md` mentions migrating colors to `oklch`. The CSS variables like `--color-status-success` are used with `rgb()`. Their definitions in `colors.css` need to be checked for `oklch` format.
*   **Recommendations (Preliminary):**
    *   Ensure all color-defining classes like `bg-interactive-blue`, `text-milestone`, etc., are defined in `tailwind.config.mjs` and ultimately derive their values from `oklch` CSS variables in `src/styles/theme/colors.css`.
    *   Review `text-white` usage for potential replacement with a semantic token.
    *   Locate and analyze the CSS for `hover-milestone`, `hover-project`, etc.

### `src/styles/theme/colors.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/colors.css`
*   **Format:** Colors are defined as CSS custom properties (e.g., `--color-text-primary`) with RGB channel values (e.g., `28 42 77`).
*   **Guideline Adherence:**
    *   The `dev_component_overhaul_guide.md` specifies migrating to `oklch` color space. The current RGB definitions do **not** meet this requirement.
    *   Semantic naming is used (e.g., `--color-text-primary`, `--color-surface-secondary`), which is good.
    *   Dark mode overrides are handled via an `html.dark` selector.
*   **Hardcoded Values:** RGB values are direct numerical representations, centralized in this file.
*   **Completeness:** Covers text, surface, interactive, accent, status, and border colors.
*   **Recommendations:**
    *   **Critical:** Convert all RGB color definitions to the `oklch` format. E.g., `--color-text-primary: 28 42 77;` should be converted to its `oklch` equivalent.
    *   The variable `--color-shadow-rgb` should also be converted to `oklch`.

### `src/styles/theme/shadows.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/shadows.css`
*   **Format:** Shadows are defined as CSS custom properties (e.g., `--shadow-xs`) using `rgba()` with hardcoded RGB values for the color and an alpha channel.
*   **Guideline Adherence:**
    *   Uses `rgba()` with numerical RGB values (e.g., `rgba(0, 0, 0, 0.6)`). This does **not** align with the `oklch` migration strategy.
    *   Defines separate light (`--shadow-xs-light`) and dark (`--shadow-xs`) theme shadows, which is less dynamic than the HSL-based approach suggested in `dev_component_overhaul_guide.md`.
*   **Hardcoded Values:** RGB values within `rgba()` are hardcoded.
*   **Recommendations:**
    *   **Critical:** Modify shadow definitions to use `oklch` for the color component, ideally referencing an `oklch` color variable (e.g., the converted `--color-shadow-rgb`).
    *   Consider revising the shadow strategy for more dynamic theme adaptation.

### `src/styles/theme/gradients.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/gradients.css`
*   **Status:** File not found.
*   **Guideline Adherence:** `dev_component_overhaul_guide.md` (section 2.2, item 8) mentions this file for a "Modern Gradient System" using CSS custom properties and modern gradient syntax.
*   **Recommendations:**
    *   Create this file if it's part of the planned architecture.
    *   Ensure its color definitions adhere to the `oklch` standard and use CSS custom properties.

### `src/styles/global.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/global.css`
*   **Color Usage:**
    *   `scrollbar-color: rgb(var(--color-border-primary) / 0.5) transparent;`
    *   `background: rgb(var(--color-border-primary) / 0.5);` (for scrollbar thumb)
    *   `background: rgb(var(--color-border-primary) / 0.7);` (for scrollbar thumb hover)
*   **Guideline Adherence:**
    *   Correctly uses CSS variables (`--color-border-primary`).
    *   Uses `rgb(var(...) / <alpha-value>)`. This will need testing after `--color-border-primary` is converted to `oklch` in `colors.css`. The syntax might need to change to `oklch(var(...) / alpha)`.
*   **Recommendations:**
    *   Verify scrollbar styling after `oklch` conversion of `--color-border-primary`.

### `src/styles/transitions.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/transitions.css`
*   **Color Usage:** No direct color definitions or usage. This file focuses on `animation-name`, `animation-duration`, `animation-timing-function`, `transform`, and `opacity` for view transitions.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/styles/animations/keyframes.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/animations/keyframes.css`
*   **Color Usage:**
    *   The `@keyframes glow` uses hardcoded `rgba(59, 130, 246, var(--glow-shadow-opacity))`. The RGB value `59, 130, 246` corresponds to a blue color.
*   **Guideline Adherence:**
    *   The hardcoded RGB value does **not** meet the `oklch` migration guideline.
    *   It should ideally reference a CSS variable for the color itself (e.g., `var(--color-interactive-blue)` or a specific glow color variable) which is then defined in `oklch` in `colors.css`.
*   **Hardcoded Values:** `59, 130, 246` is hardcoded.
*   **Recommendations:**
    *   Replace the hardcoded RGB `59, 130, 246` with a CSS variable (e.g., `var(--color-glow-accent)` or similar).
    *   Ensure this new variable is defined in `src/styles/theme/colors.css` using the `oklch` format.

### `src/styles/animations/properties.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/animations/properties.css`
*   **Color Usage:** No direct color definitions. This file uses `@property` to define syntax for custom properties related to animation timings, transformations, and opacity, not colors.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/styles/utilities/components.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/utilities/components.css`
*   **Overall Assessment:** This file has significant and numerous violations of the color system guidelines. It is a major source of hardcoded colors, particularly for shadows and states. The initial audit of this file was incomplete.
*   **Guideline Adherence & Violations:**
    *   **Good:** The file makes good use of `rgb(var(...))` for many base component styles, such as gradients and accent colors.
    *   **Violation:** The `.container-background:hover` rule contains a hardcoded `rgba(0, 0, 0, 0.04)` shadow for light mode and `rgba(0, 0, 0, 0.3)` for dark mode.
    *   **Violation:** The `.update-card:hover` rule contains a hardcoded `rgba(0, 0, 0, ...)` shadow. The dark mode override `:global(html.dark) .update-card:hover` also contains a hardcoded shadow.
    *   **Violation:** The `.status-pill-all.active` rule uses a hardcoded `color: white;`. This should be a semantic token like `text-on-interactive`.
    *   **Violation:** The `.hero-button-ripple` background uses a hardcoded white `rgba(255,255,255,0.3)`.
    *   **Violation:** The `.update-card:hover svg` rule uses a hardcoded `drop-shadow` with `rgba(0,0,0,0.1)`.
    *   **Violation:** The `.update-card:hover .text-primary` rule uses a hardcoded `text-shadow` with `rgba(255, 255, 255, 0.1)` for light mode and a different hardcoded value for dark mode.
*   **Recommendations:**
    *   **Urgent:** This file requires a complete refactor to eliminate all hardcoded color values.
    *   All `box-shadow`, `drop-shadow`, and `text-shadow` properties must be updated to use the theme's semantic shadow system (e.g., `var(--shadow-sm)`) or be constructed with color variables (e.g., `rgb(var(--color-shadow-rgb) / 0.1)`).
    *   Replace hardcoded color names like `white` with their corresponding semantic tokens (e.g., `text-on-interactive`).
    *   This file, along with `Hero.astro`, should be prioritized for remediation.

### `src/styles/utilities/modern-layout.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/utilities/modern-layout.css`
*   **Color Usage:** No direct color definitions or usage. This file focuses on spacing, padding, and margins using CSS variables like `--spacing-container-sm`.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/styles/utilities/semantic-colors.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/utilities/semantic-colors.css`
*   **Color Usage:** This file defines utility classes that apply colors using CSS variables.
    *   Examples: `.text-primary { color: rgb(var(--color-text-primary)); }`, `.bg-surface-primary { background-color: rgb(var(--color-surface-primary)); }`, `.border-primary { border-color: rgb(var(--color-border-primary)); }`.
    *   Hover utilities like `.hover-milestone:hover { background-color: rgb(var(--color-accent-milestone) / 0.1); }` also use this pattern.
*   **Guideline Adherence:**
    *   Excellent use of CSS variables for defining semantic color utilities.
    *   The `rgb(var(...))` and `rgb(var(...) / alpha)` syntax will need to be tested and potentially updated after the color variables in `colors.css` are converted to `oklch` (e.g., to `oklch(var(...))` or `oklch(var(...) / alpha)`).
*   **Hardcoded Values:** None. All colors are derived from CSS variables.
*   **Recommendations:**
    *   After `colors.css` is updated to `oklch`, thoroughly test all utilities in this file and update the syntax if necessary.

### `src/styles/utilities/interactive.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/utilities/interactive.css`
*   **Color Usage:**
    *   `.focus-ring`: `outline: 2px solid rgb(var(--color-interactive-focus));`
    *   `.focus-ring-inset`: `outline: 2px solid rgb(var(--color-interactive-focus));`
*   **Guideline Adherence:**
    *   Correctly uses a CSS variable (`--color-interactive-focus`) for the focus ring color.
    *   The `rgb(var(...))` syntax will need testing after `--color-interactive-focus` (expected to be in `colors.css`) is converted to `oklch`.
*   **Hardcoded Values:** None.
*   **Recommendations:**
    *   Verify focus ring styling after `oklch` conversion of `--color-interactive-focus`.

### `src/styles/base/main.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/base/main.css`
*   **Color Usage:**
    *   `body`: `background-color: rgb(var(--color-surface-primary)); color: rgb(var(--color-text-primary));`
    *   `body` background-image grid lines: `rgb(var(--color-interactive-blue) / 0.06)`
    *   `html.dark body` background-image grid lines: `rgb(var(--color-border-primary) / 0.15)`
*   **Guideline Adherence:**
    *   Correctly uses CSS variables for base text, background, and grid line colors.
    *   The `rgb(var(...) / alpha)` syntax will need testing after the variables in `colors.css` are converted to `oklch`.
*   **Hardcoded Values:** None.
*   **Recommendations:**
    *   Verify all base styles after `oklch` conversion in `colors.css`.

### `src/styles/base/reset.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/base/reset.css`
*   **Color Usage:**
    *   `:focus-visible`: `outline: 2px solid rgb(59 130 246);` The RGB value `59 130 246` is a blue color.
*   **Guideline Adherence:**
    *   The hardcoded RGB value for `:focus-visible` does **not** meet guidelines. It should use a CSS variable like `var(--color-interactive-focus)` or `var(--color-interactive-blue)`.
*   **Hardcoded Values:** `rgb(59 130 246)`.
*   **Recommendations:**
    *   Replace the hardcoded `rgb(59 130 246)` with a CSS variable (e.g., `var(--color-interactive-focus)`).

### `src/styles/theme/index.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/index.css`
*   **Color Usage:** No direct color definitions. This file imports other theme CSS files.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/styles/theme/animations.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/animations.css`
*   **Color Usage:** No direct color definitions. Defines animation durations and timing functions.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/styles/theme/spacing.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/spacing.css`
*   **Color Usage:** No direct color definitions. Defines spacing and radius tokens.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/styles/theme/typography.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/theme/typography.css`
*   **Color Usage:** No direct color definitions. Intended to use Tailwind's default typography scale.
*   **Guideline Adherence:** N/A for color audit.
*   **Recommendations:** None regarding colors.

### `src/components/ui/ThemeToggle.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/ThemeToggle.astro`
*   **Overall Assessment:** The component is well-structured and mostly uses semantic tokens correctly. However, there is one clear violation in the scoped style block.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component's template correctly uses semantic utility classes for background, text, and focus states (e.g., `bg-surface-secondary`, `text-secondary`, `from-interactive-blue/5`, `focus-ring`).
    *   **Good:** The SVG icons correctly use `stroke="currentColor"`, inheriting their color from the parent element's text color.
    *   **Good:** The light mode hover `box-shadow` uses a proper CSS variable: `rgb(var(--color-interactive-blue) / 0.15)`.
    *   **Violation:** The dark mode hover `box-shadow` in the `<style>` block is hardcoded: `.dark #themeToggle:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }`. This bypasses the project's theming system for shadows.
*   **Recommendations:**
    *   Replace the hardcoded dark mode `box-shadow` with a semantic CSS variable. It should reference the theme's shadow system, for example, by using a variable like `var(--shadow-md)` which should be defined in `shadows.css` or by using the base shadow color variable like `rgb(var(--color-shadow-rgb) / 0.3)`.

### `src/components/ui/Button.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/Button.astro`
*   **Overall Assessment:** This component relies on `cva` variants but also introduces its own inline styles for specific variants, which contain hardcoded colors.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses `buttonVariants` and semantic classes/variables for most of its styling, such as `bg-interactive-blue` and `--color-interactive-gold`.
    *   **Violation (Inherited):** Through `buttonVariants` from `src/utils/variants.ts`, the `primary` variant uses the non-semantic `text-white` class. (This is documented in the `variants.ts` audit section).
    *   **Violation:** The hover glow `box-shadow` for both the `primary` and `roadmap` variants contains a hardcoded color: `..., 0 4px 8px rgba(0, 0, 0, 0.1);`. This hardcoded black shadow with alpha transparency bypasses the theme's shadow system.
*   **Recommendations:**
    *   Replace the hardcoded `rgba(0, 0, 0, 0.1)` in the `box-shadow` style with a semantic CSS variable that references the project's shadow system (e.g., `var(--shadow-xs)` or similar).
    *   The `text-white` issue should be addressed by modifying the `buttonVariants` definition in `src/utils/variants.ts`.

### `src/components/ui/Card.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/Card.astro`
*   **Overall Assessment:** This is a well-built component that almost perfectly adheres to the color system guidelines. It makes excellent use of semantic utility classes and CSS variables.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component correctly uses semantic tokens for backgrounds, text, and interactive states (e.g., `bg-interactive-primary`, `text-content-secondary`, `group-hover:text-interactive-primary`).
    *   **Excellent:** Colors within the gradient border effect are correctly defined using CSS variables (`--color-interactive-primary`, `--color-interactive-secondary`).
    *   **Violation:** The `style` attribute for the gradient border effect contains a hardcoded color within its `mask` property: `mask: linear-gradient(#fff 0 0) ...`. While white is often a special case for masks, it is still a hardcoded value and should ideally be replaced with a variable for consistency, even if that variable just resolves to `255 255 255`.
*   **Recommendations:**
    *   To be 100% compliant, replace the hardcoded `#fff` in the `mask` property with a CSS variable. A new variable like `--color-mask-light` could be created, or an existing one like `--color-surface-primary-light-theme` could be used if appropriate.

### `src/components/ui/Hero.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/Hero.astro`
*   **Overall Assessment:** This component is a critical source of design system violations. While the template uses semantic classes correctly, the associated `<style>` block is filled with hardcoded colors that completely bypass the established theme.
*   **Guideline Adherence & Violations:**
    *   **Good (Template):** The Astro template itself correctly uses semantic Tailwind classes for text, backgrounds, and gradients (e.g., `bg-surface-primary`, `text-interactive-blue`, `from-interactive-blue/5`).
    *   **Critical Violation (Scoped Styles):** The `<style>` block contains numerous `:global` rules with hardcoded colors. This is a major issue that undermines the entire color system. Specific violations include:
        *   **Button Hovers:** `:global(.hero-button-primary:hover)` and `:global(.hero-button-secondary:hover)` use multiple hardcoded `rgba()` values for `box-shadow`, for both light and dark themes.
        *   **Focus Outline:** `:global(.hero-button-primary:focus-visible)` uses a hardcoded `rgb(77, 139, 247)` for its outline instead of a semantic focus variable.
        *   **Filter & Text Shadows:** `filter: drop-shadow()` and `text-shadow` properties use hardcoded `rgba()` values.
        *   **Hero Banner:** The `.hero-banner` styles for background, border, and shadows are all constructed from hardcoded `rgba()` values, with separate hardcoded rules for the dark theme, instead of using semantic variables.
*   **Recommendations:**
    *   **Urgent:** The entire `<style>` block must be refactored.
    *   Replace all hardcoded `rgba()` and `rgb()` values with the appropriate CSS variables from the theme (e.g., `var(--color-interactive-gold)`, `var(--color-shadow-rgb)`, `var(--color-interactive-focus)`).
    *   Color values should be composed using the `rgb(var(...) / alpha)` or `oklch(var(...) / alpha)` syntax to maintain the connection to the theme. For example, `rgba(245, 158, 11, 0.25)` should become something like `rgb(var(--color-interactive-gold) / 0.25)`.
    *   This file should be a top priority for remediation to restore design system integrity.

### `src/components/ui/Breadcrumbs.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/Breadcrumbs.astro`
*   **Overall Assessment:** This component is an excellent example of adherence to the design system.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component exclusively uses semantic color tokens from the theme for all text and icon elements (`text-secondary`, `hover:text-primary`, `text-tertiary`, `text-primary`).
    *   **No Violations:** There are no hardcoded colors or deviations from the guidelines.
*   **Recommendations:**
    *   None. This component can be used as a reference for best practices.

### `src/components/ui/NavLink.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/NavLink.astro`
*   **Overall Assessment:** Another excellent component that perfectly follows the design system guidelines.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component makes correct use of semantic color tokens for all its states and variants, including text, borders, and background colors (e.g., `text-interactive-blue`, `text-primary`, `border-subtle`, `bg-interactive-blue`).
    *   **No Violations:** There are no hardcoded colors or any other deviations from the guidelines.
*   **Recommendations:**
    *   None. This is a model component for navigation elements.

### `src/components/ui/UpdatesContainer.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/UpdatesContainer.astro`
*   **Overall Assessment:** This component is well-structured and uses semantic colors correctly. It introduces several custom utility classes that need to be verified.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses semantic tokens for text, links, and backgrounds (e.g., `text-primary`, `hover:text-interactive-blue`, `bg-interactive-blue`).
    *   **Needs Investigation:** It relies on custom utility classes such as `shadow-themed-md`, `backdrop-blur-themed`, `container-background`, and `container-header-background`. While this is a good pattern, the definitions of these classes must be checked to ensure they use semantic CSS variables.
    *   **Minor Inconsistency:** The "See All" link uses `focus-visible:outline-interactive-blue` directly. While it uses a semantic color, it deviates from the project's established `focus-ring` utility class, leading to potential inconsistency in focus styling.
    *   **No Hardcoded Colors:** The file contains no hardcoded color values.
*   **Recommendations:**
    *   Locate the definitions for the custom container classes and ensure they are built with semantic CSS variables.
    *   Refactor the focus style on the "See All" link to use the standard `focus-ring` utility class for consistency.

### `src/components/ui/UpdateCard.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/UpdateCard.astro`
*   **Overall Assessment:** The component file itself is clean and correctly delegates its styling to CVA variants. However, it is affected by violations in its dependent CSS files.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component template contains no hardcoded colors. It correctly uses semantic tokens (`text-secondary`, `text-tertiary`) and relies on `cva` variants from `src/utils/variants.ts` for its primary styling.
    *   **Violation (Inherited):** This component uses the `update-card` class as its base. The styles for this class, defined in `src/styles/utilities/components.css`, contain multiple hardcoded `box-shadow` and `text-shadow` colors for hover states. Therefore, while this file is clean, the rendered component will have hardcoded colors.
*   **Recommendations:**
    *   No changes are needed in this file itself.
    *   The violations will be resolved by fixing the `.update-card` styles in `src/styles/utilities/components.css` as previously recommended.

### `src/components/ui/SearchInput.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/ui/SearchInput.astro`
*   **Overall Assessment:** A very clean component with excellent adherence to the color system.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component correctly uses semantic color tokens for its background, border, text, and icons (e.g., `bg-surface-secondary`, `border-primary`, `text-tertiary`, `hover:text-primary`).
    *   **No Hardcoded Colors:** The file contains no hardcoded color values.
    *   **Minor Inconsistency:** The component implements focus styling directly with `focus:border-interactive-blue` and `focus:ring-interactive-blue/20`. This deviates from the project's standardized `focus-ring` utility class, which could lead to inconsistencies.
*   **Recommendations:**
    *   Refactor the input's focus styles to use the project's `focus-ring` utility class to ensure consistent focus behavior across the application.

### `src/components/roadmap/RoadmapCard.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/roadmap/RoadmapCard.astro`
*   **Overall Assessment:** This is a model component that demonstrates excellent adherence to the color system and best practices for creating dynamic, status-aware components.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component makes correct use of CVA variants (`projectCardVariants`), semantic utility classes (`bg-status-success/10`, `text-secondary`), and CSS variables within Tailwind's arbitrary value syntax (`hover:border-[rgb(var(--color-status-success))]/30`).
    *   **No Violations:** There are no hardcoded colors or deviations from the design guidelines. This component serves as a strong example of how to build complex, theme-aware components correctly.
*   **Recommendations:**
    *   None. This component is a reference for best practices.

### `src/components/roadmap/RoadmapHorizontal.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/roadmap/RoadmapHorizontal.astro`
*   **Overall Assessment:** This is another model component that correctly implements a complex UI while strictly adhering to the design system.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component reuses the compliant `RoadmapCard` pattern for its main content.
    *   **Excellent:** The custom scrollbar styling in the `<style>` block is implemented perfectly using semantic CSS variables (`--color-surface-secondary`, `--color-interactive-blue`) for all parts.
    *   **No Violations:** There are no hardcoded colors or deviations from the design guidelines.
*   **Recommendations:**
    *   None. This component can be used as a reference for implementing custom styled elements like scrollbars.

### `src/components/layout/Header.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/layout/Header.astro`
*   **Overall Assessment:** A mostly compliant component, but it contains a few distinct violations that need to be addressed.
*   **Guideline Adherence & Violations:**
    *   **Good:** The majority of the component correctly uses semantic tokens for borders, backgrounds, and text (e.g., `border-primary`, `via-interactive-blue/40`, `text-secondary`).
    *   **Violation:** The "View All Projects" button in the mobile menu uses a hardcoded `text-white` class. This should be a semantic token like `text-on-interactive`.
    *   **Violation:** The `<style>` block contains a rule for `.header-brand:hover` with a hardcoded `color: rgb(77, 139, 247) !important;`. This should be replaced with `rgb(var(--color-interactive-blue))`.
    *   **Needs Investigation:** The component uses a `bg-gradient-primary` class. This was not found in the CSS files, so it is assumed to be a custom gradient defined in `tailwind.config.mjs`. This should be verified, but if it is defined in the theme, its usage here is correct.
*   **Recommendations:**
    *   Replace the `text-white` class with a semantic equivalent.
    *   Update the hardcoded `rgb()` color in the `<style>` block to use the corresponding CSS variable.
    *   Verify the definition of `bg-gradient-primary` in the Tailwind configuration.

### `src/components/layout/Footer.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/layout/Footer.astro`
*   **Overall Assessment:** A very well-structured component that is almost fully compliant.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component correctly uses a wide range of semantic tokens for backgrounds, text, and interactive elements (e.g., `bg-surface-tertiary`, `border-primary`, `text-secondary`, `hover:text-interactive-blue`).
    *   **Excellent:** The use of `bg-grid-fine` is correct, as this class is defined semantically in `src/styles/utilities/semantic-colors.css`.
    *   **Minor Violation:** The component defines a `gradient-brand` class locally using Tailwind's gradient utilities (`from-interactive-blue`, `to-interactive-gold`). While it uses semantic colors, this creates a one-off gradient that should ideally be a reusable, semantic class defined in CSS (like `.gradient-accent` in `components.css`).
    *   **Violation (Inherited):** The component uses the `bg-gradient-primary` class, which is not a valid Tailwind utility and has no definition in the project's CSS. The intended class is likely `.gradient-primary`, which is defined in `semantic-colors.css`. This is a naming mismatch.
*   **Recommendations:**
    *   Replace the `text-white` class with a semantic equivalent like `text-on-interactive`.
    *   Update the hardcoded `rgb()` color in the `<style>` block to use the corresponding CSS variable.
    *   Correct the usage of `bg-gradient-primary` to `gradient-primary` to apply the intended gradient style.

### `src/styles/utilities/semantic-colors.css`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/styles/utilities/semantic-colors.css`
*   **Overall Assessment:** This file is the core of the utility-class-based theming and is mostly well-implemented, but contains a significant violation.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The file correctly defines most text, background, border, and grid pattern utilities using the `@utility` rule and semantic CSS variables.
    *   **Violation:** The `.gradient-hero` class is defined with hardcoded hex color values (`#13263C`, `#0B141F`) instead of using the corresponding CSS variables (`--color-hero-gradient-start`, `--color-hero-gradient-end`). This breaks theme adaptability.
*   **Recommendations:**
    *   **Urgent:** Refactor the `.gradient-hero` class to use the semantic CSS variables for its gradient definition.

### `src/components/layout/PostPageHeader.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/layout/PostPageHeader.astro`
*   **Overall Assessment:** This component is a variant of the main `Header.astro` and shares the exact same color system violations.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses semantic tokens for most of its base styling (e.g., `border-primary`, `text-secondary`).
    *   **Violation:** The mobile menu's "View All Projects" button uses the hardcoded `text-white` class.
    *   **Violation:** The `<style>` block contains a `.header-brand:hover` rule with a hardcoded `rgb()` color.
    *   **Violation (Inherited):** The component uses the `bg-gradient-primary` class, which is incorrectly defined with hardcoded colors in `src/styles/utilities/semantic-colors.css`.
*   **Recommendations:**
    *   Replace the `text-white` class with a semantic equivalent like `text-on-interactive`.
    *   Update the hardcoded `rgb()` color in the `<style>` block to use the corresponding CSS variable.
    *   The `bg-gradient-primary` issue will be resolved when its definition is fixed in the CSS file.

### `src/components/post/TableOfContents.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/post/TableOfContents.astro`
*   **Overall Assessment:** A mostly compliant component that introduces several new, undefined color tokens.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses many standard semantic tokens like `bg-bg-secondary`, `border-border-primary`, and `text-content-tertiary`.
    *   **Needs Investigation:** It uses `hover:text-brand-primary` and `bg-brand-primary/40`. The `brand-primary` color token is not part of the standard theme; its definition must be located and verified for compliance.
    *   **Violation:** The custom scrollbar styles in the `<style>` block use undefined CSS variables: `--color-border-secondary` and `--color-content-tertiary`. These are not valid tokens in the color system and must be corrected to use existing, valid tokens (e.g., `--color-border-subtle`, `--color-text-tertiary`).
*   **Recommendations:**
    *   Locate the definition of the `brand-primary` color token or add it to `colors.css` if it is a valid, new color for the system.
    *   Replace the undefined CSS variables in the scrollbar styles with valid tokens from `colors.css`.

### `src/components/post/PostHeader.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/post/PostHeader.astro`
*   **Overall Assessment:** A well-structured component that is mostly compliant but relies on several new, undefined color tokens.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses many standard semantic tokens for status indicators and text (e.g., `bg-status-warning/10`, `text-status-warning`, `text-content-primary`).
    *   **Needs Investigation:** The `accentStyles` object introduces `brand-primary` and `brand-secondary` color tokens (e.g., `text-brand-primary`, `bg-brand-secondary/10`). These are not part of the standard theme defined in `colors.css`. Their definitions must be located and verified, or they should be added to the official color system if they are deemed necessary.
    *   **No Hardcoded Colors:** The file contains no direct hardcoded color values.
*   **Recommendations:**
    *   Locate the definitions for the `brand-primary` and `brand-secondary` color tokens. If they are intended to be part of the design system, they should be formally defined in `src/styles/theme/colors.css`. Otherwise, they should be replaced with existing semantic tokens.

### `src/components/post/Sidebar.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/post/Sidebar.astro`
*   **Overall Assessment:** A mostly compliant component that suffers from using several undefined color tokens.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses a variety of standard semantic tokens (e.g., `bg-bg-primary/95`, `text-content-tertiary/80`, `hover:text-content-primary`).
    *   **Needs Investigation:** The `accentClasses` object uses `border-brand-primary` and `border-brand-secondary`, which are not standard theme colors. This is the same issue found in `PostHeader.astro`. Their definitions must be located and verified.
    *   **Violation:** The `aside` element uses `shadow-border-secondary/20`. The `--color-border-secondary` token is not defined in the color system and must be replaced with a valid token like `--color-border-subtle` or `--color-border-primary`.
    *   **No Hardcoded Colors:** The file contains no direct hardcoded color values.
*   **Recommendations:**
    *   Replace the undefined `--color-border-secondary` token with a valid one.
    *   Resolve the undefined `brand-primary` and `brand-secondary` tokens as previously recommended in the `PostHeader.astro` audit.

### `src/components/post/PostFooter.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/post/PostFooter.astro`
*   **Overall Assessment:** This component has multiple, significant violations of the color system.
*   **Guideline Adherence & Violations:**
    *   **Good:** The social sharing buttons and related post containers correctly use standard semantic tokens like `bg-bg-secondary`, `text-content-secondary`, and `border-border-secondary`.
    *   **Needs Investigation:** The `accentStyles` object uses the same undefined `brand-primary` and `brand-secondary` tokens seen in other post-related components.
    *   **Critical Violation:** The `categoryStyles` object uses a wide range of hardcoded, non-theme Tailwind colors (e.g., `bg-purple-500/10`, `text-blue-400`, `border-amber-500/20`). This completely bypasses the established design system and will not adapt to theme changes.
    *   **Violation:** The component uses `border-border-secondary` which relies on an undefined `--color-border-secondary` token.
*   **Recommendations:**
    *   **Urgent:** The `categoryStyles` must be refactored to use semantic color tokens from the theme. This will likely require adding new accent color variables to `colors.css` (e.g., `--color-accent-purple`, `--color-accent-amber`).
    *   Replace the undefined `border-border-secondary` with a valid token like `border-subtle` or `border-primary`.
    *   Resolve the undefined `brand-*` tokens as previously recommended.

### `src/components/cards/ProjectCard.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/cards/ProjectCard.astro`
*   **Overall Assessment:** A very strong, compliant component that correctly implements status-dependent theming.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component makes exemplary use of CVA variants, semantic utility classes, and CSS variables within arbitrary value syntax (e.g., `hover:border-[rgb(var(--color-status-success))]/30`).
    *   **Needs Investigation:** The status badges for "draft" and "archived" use the color tokens `subtle` and `tertiary` (e.g., `bg-subtle/10`, `text-tertiary`). While `tertiary` is a valid text color, its use as a background and border is inconsistent. The `subtle` token is not a standard theme color and must be located and verified.
*   **Recommendations:**
    *   Locate the definition of the `subtle` color token, or replace it with a valid theme token (e.g., `text-tertiary`, `border-subtle`).
    *   Ensure the use of `tertiary` for backgrounds is intentional and consistent with the design system.

### `src/components/cards/BlogCard.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/components/cards/BlogCard.astro`
*   **Overall Assessment:** This component has critical violations, inheriting issues from `variants.ts` and adding more of its own.
*   **Guideline Adherence & Violations:**
    *   **Good:** The component correctly uses semantic tokens for compliant categories like "Research" and "Technical" (e.g., `bg-interactive-blue/10`, `text-status-success`).
    *   **Critical Violation:** The component styles the "Tutorial" and "Update" categories with hardcoded, non-theme colors. This happens in three places:
        1.  In the `classes` constant, it inherits hardcoded `border-l-[rgb(...)]` from `blogCardVariants` in `variants.ts`.
        2.  It applies local classes for icons using non-theme colors (e.g., `bg-purple-500/10`, `text-cyan-500`).
        3.  It applies hardcoded `rgb()` colors for the `group-hover:text` and gradient overlay effects.
*   **Recommendations:**
    *   **Urgent:** This component requires a major refactor to align with the design system.
    *   The hardcoded colors for the "Tutorial" and "Update" categories must be replaced with new, semantic accent color tokens defined in `src/styles/theme/colors.css`.
    *   The `blogCardVariants` definition in `src/utils/variants.ts` must be updated to use these new semantic tokens.

### `src/layouts/Layout.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/layouts/Layout.astro`
*   **Overall Assessment:** A clean, foundational layout file with one minor violation in its global styles.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component's template correctly uses semantic tokens for the body (`bg-surface`, `text-primary`) and the grid overlay (`bg-grid-pattern`).
    *   **Violation:** The `<style>` block contains a selector for `.border-border-secondary`. The `border-secondary` token is not a valid theme token, as `--color-border-secondary` is not defined in `colors.css`. This will result in no border color being applied.
    *   **No Hardcoded Colors:** The file contains no direct hardcoded color values.
*   **Recommendations:**
    *   Remove the `.border-border-secondary` selector from the `<style>` block or replace it with a valid border token class (e.g., `.border-subtle`).

### `src/layouts/PostLayout.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/layouts/PostLayout.astro`
*   **Overall Assessment:** A complex layout file with several distinct violations, including undefined tokens and hardcoded colors in scoped and global styles.
*   **Guideline Adherence & Violations:**
    *   **Good:** The `prose` classes, which control the main article styling, are well-defined and correctly use semantic tokens like `text-interactive-blue`, `bg-surface-secondary`, and `border-border-primary`.
    *   **Needs Investigation:** The `accentClasses` object uses the undefined `border-brand-primary` and `border-brand-secondary` tokens, an issue seen across multiple components.
    *   **Violation:** The `<style>` block includes a selector for `.border-border-secondary`, which relies on an undefined CSS variable.
    *   **Violation:** The print styles (`@media print`) contain hardcoded `background: white !important;` and `color: black !important;`. These should ideally use root variables that can be controlled, although hardcoding for print is a common exception.
    *   **Violation:** The global styles in the `<style>` block for `.interactive-demo` and `article a:focus-visible` use `rgb(var(...))` to apply colors. This is an unnecessary use of global styles when Tailwind utility classes (`bg-surface-secondary`, `border-primary`, `focus-ring`) would achieve the same result in a more maintainable way.
*   **Recommendations:**
    *   Resolve the undefined `brand-*` and `border-secondary` tokens.
    *   Refactor the global styles for `.interactive-demo` and `a:focus-visible` to use Tailwind utility classes directly on the target elements instead of defining global CSS rules.
    *   Consider creating print-specific variables for the print styles to avoid hardcoding `white` and `black`.

### `src/pages/index.astro`

*   **Path:** `/Users/lumontoya/Documents/lmmontoya/portfolio/lmmontoya-ai.github.io/src/pages/index.astro`
*   **Overall Assessment:** A clean page-level component that correctly reuses audited components but contains one unnecessary style override.
*   **Guideline Adherence & Violations:**
    *   **Excellent:** The component correctly reuses other audited components (`Layout`, `Hero`, `UpdateCard`, etc.) for its structure, which is a great practice.
    *   **Violation:** The `<style>` block contains a redundant definition for the `.bg-grid-pattern` utility class. While it correctly uses a CSS variable (`--color-primary`), this utility is already defined globally in `src/styles/utilities/semantic-colors.css`. This local override is unnecessary and could lead to future inconsistencies.
*   **Recommendations:**
    *   Remove the local `<style>` block entirely. The global grid pattern style from `semantic-colors.css` should be used instead.

---
