---
trigger: always_on
description:
globs:
---
# Design System - Luis Miguel Montoya Portfolio

## Overview

This design system documents the visual language, color palettes, typography, and component specifications for Luis Miguel Montoya's AI interpretability research portfolio. The system emphasizes **minimalist elegance**, **technical precision**, and **intellectual rigor** while maintaining accessibility and professional aesthetics.

## Brand Attributes

- **Minimalist** — Clean, uncluttered design with purposeful use of white space
- **Modern** — Contemporary design patterns and interactions
- **Technically Precise** — Clear information hierarchy and structured layouts
- **Intellectually Rigorous** — Professional aesthetic suitable for academic/research contexts
- **Elegant** — Refined visual details and smooth interactions

---

## Color Palettes

### Dark Theme (Primary)
The dark theme uses a deep navy foundation with carefully calibrated contrast ratios for optimal readability and visual hierarchy.

#### Core Colors
| Purpose | Color | RGB | Hex | Usage |
|---------|--------|-----|-----|-------|
| **Background** | Deep Navy | `15 27 43` | `#0F1B2B` | Primary page background |
| **Text Primary** | Soft White | `248 250 252` | `#F8FAFC` | Headers, primary text |
| **Text Secondary** | Light Slate | `203 213 225` | `#CBD5E1` | Secondary text, descriptions |
| **Accent** | Vibrant Blue | `59 130 246` | `#3B82F6` | Interactive elements, links |
| **Highlight** | Warm Gold | `212 175 55` | `#D4AF37` | CTAs, achievements, milestones |
| **Success** | Emerald Green | `34 197 94` | `#22C55E` | Completed items, success states |
| **Progress** | Warm Orange | `249 115 22` | `#F97316` | In-progress items, active states |

#### Surface Colors
| Purpose | Color | RGB | Hex | Usage |
|---------|--------|-----|-----|-------|
| **Card Background** | Slate 700 | `30 41 59` | `#1E293B` | Card backgrounds, elevated surfaces |
| **Footer Background** | Deep Navy Dark | `11 20 31` | `#0B141F` | Footer, deepest backgrounds |
| **Border** | Slate 500 | `100 116 139` | `#64748B` | Borders (25% opacity) |

#### Gradient Colors
| Purpose | Start Color | End Color | Usage |
|---------|-------------|-----------|-------|
| **Hero Gradient** | `#13263C` | `#0B141F` | Hero section backgrounds |

### Light Theme
The light theme provides industry-standard colors optimized for readability and professional presentation.

#### Core Colors
| Purpose | Color | RGB | Hex | Usage |
|---------|--------|-----|-----|-------|
| **Background** | Soft White | `248 250 253` | `#F8FAFD` | Primary page background |
| **Text Primary** | Deep Navy Blue | `28 42 77` | `#1C2A4D` | Headers, primary text |
| **Text Secondary** | Charcoal Grey | `74 74 74` | `#4A4A4A` | Secondary text, descriptions |
| **Accent** | Sky Blue | `77 139 247` | `#4D8BF7` | Interactive elements, links |
| **Highlight** | Pastel Golden Beige | `208 124 92` | `#D07C5C` | CTAs, buttons (muted) |
| **Surface** | Muted Purple | `124 111 156` | `#7C6F9C` | Special highlights, distinctive sections |
| **Success** | Forest Green | `28 141 76` | `#1C8D4C` | Success states |
| **Progress** | Amber Orange | `234 88 12` | `#EA580C` | Progress indicators |

#### Surface Colors
| Purpose | Color | RGB | Hex | Usage |
|---------|--------|-----|-----|-------|
| **Card Background** | Pure White | `255 255 255` | `#FFFFFF` | Card backgrounds |
| **Neutral** | Soft Grey | `228 231 235` | `#E4E7EB` | Borders, dividers |

---

## Typography

### Font Families
- **Headings**: Inter (semi-bold, tracking -0.025em)
- **Body Text**: IBM Plex Sans (regular, leading-relaxed)
- **Code/Monospace**: IBM Plex Mono

### Scale & Hierarchy
Base font size adapts responsively:
- **Mobile**: 16px base with 1.25 ratio
- **Desktop**: 18px base with 1.333 ratio

| Element | Size | Line Height | Weight | Usage |
|---------|------|-------------|--------|-------|
| **H1** | 2.75rem | 1.1 | 700 | Page titles, hero headings |
| **H2** | 2.25rem | 1.2 | 650 | Section headings |
| **H3** | 1.75rem | 1.3 | 600 | Subsection headings |
| **H4** | 1.25rem | 1.4 | 600 | Card titles, component headings |
| **Body** | 1rem | 1.6 | 400 | Main text content |
| **Small** | 0.875rem | 1.5 | 400 | Captions, metadata |
| **Code** | 0.875rem | 1.4 | 400 | Code snippets, technical text |

### Letter Spacing
- **Tight**: -0.025em (headings)
- **Wide**: 0.025em (uppercase tags, labels)

---

## Shadow System

Shadows provide depth and hierarchy with different levels of elevation.

### Dark Theme Shadows
| Level | CSS Value | Usage |
|-------|-----------|-------|
| **XS** | `0 1px 3px 0 rgba(0, 0, 0, 0.6)` | Subtle elements |
| **SM** | `0 2px 4px 0 rgba(0, 0, 0, 0.7), 0 1px 3px -1px rgba(0, 0, 0, 0.7)` | Cards at rest |
| **MD** | `0 4px 8px -1px rgba(0, 0, 0, 0.7), 0 2px 6px -2px rgba(0, 0, 0, 0.7)` | Buttons, interactive elements |
| **LG** | `0 12px 20px -3px rgba(0, 0, 0, 0.8), 0 6px 10px -4px rgba(0, 0, 0, 0.7)` | Cards on hover |
| **XL** | `0 24px 32px -5px rgba(0, 0, 0, 0.9), 0 12px 16px -6px rgba(0, 0, 0, 0.8)` | Modals, overlays |

### Light Theme Shadows
| Level | CSS Value | Usage |
|-------|-----------|-------|
| **XS** | `0 1px 3px 0 rgba(28, 42, 77, 0.12)` | Subtle elements |
| **SM** | `0 3px 6px 0 rgba(28, 42, 77, 0.15), 0 2px 4px -1px rgba(28, 42, 77, 0.12)` | Cards at rest |
| **MD** | `0 6px 12px -2px rgba(28, 42, 77, 0.18), 0 3px 6px -2px rgba(28, 42, 77, 0.15)` | Buttons, interactive elements |
| **LG** | `0 12px 32px -4px rgba(28, 42, 77, 0.22), 0 6px 12px -4px rgba(28, 42, 77, 0.18)` | Cards on hover |
| **XL** | `0 20px 40px -8px rgba(28, 42, 77, 0.26), 0 12px 20px -8px rgba(28, 42, 77, 0.22)` | Modals, overlays |

---

## Animation & Motion

### Timing Functions
- **Base Transition**: 200ms cubic-bezier(0.4, 0, 0.2, 1) - UI state changes
- **Page Transition**: 150ms ease - Page navigation
- **Scroll Transition**: 500ms cubic-bezier(0.4, 0, 0.2, 1) - Smooth scrolling
- **Spring Transition**: 300ms cubic-bezier(0.34, 1.56, 0.64, 1) - Interactive elements

### Motion Principles
- **Purposeful**: Every animation serves a functional purpose
- **Subtle**: Gentle transitions that don't distract from content
- **Responsive**: Respects `prefers-reduced-motion` settings
- **Consistent**: Uniform timing and easing across components

---

## Component Specifications

### Buttons

#### Primary Button
- **Background**: Highlight color with glow effect
- **Text**: Primary color (contrasting)
- **Hover**: Brightness increase (1.05), upward translation (-2px)
- **Border Radius**: 0.75rem
- **Padding**: 0.75rem 1.5rem (mobile), 1rem 2rem (desktop)

#### Secondary Button
- **Background**: Transparent with backdrop blur
- **Border**: 2px border with themed border color
- **Hover**: Accent color border and background tint
- **Text**: Themed text color

### Cards

#### Standard Card
- **Background**: Card background color with 80% opacity
- **Backdrop Filter**: 12px blur
- **Border Radius**: 1.25rem
- **Border**: 1px themed border
- **Padding**: 2rem (mobile), 2.5rem (desktop)
- **Hover**: Upward translation (-4px), enhanced shadow

#### Update Cards
- **Padding**: 1rem 1.25rem (optimized for space efficiency)
- **Left Border**: 3px accent-colored indicator
- **Hover**: 4px translation right, enhanced border glow

### Tags

#### Styling
- **Font**: IBM Plex Mono, 0.6875rem
- **Transform**: Uppercase
- **Padding**: 0.1875rem 0.375rem 0.1875rem 0 (aligned with title)
- **Border Radius**: 0.25rem

#### Variants
- **Milestone**: Gold highlight color
- **Project**: Blue accent color
- **Resource**: Green success color

---

## Layout & Spacing

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Wide**: > 1440px

### Container Spacing
- **Section Padding**: 5rem vertical (mobile), 7rem vertical (desktop)
- **Container Padding**: 6px horizontal (mobile), responsive scaling

### Grid System
- **Background Grid**: 2rem × 2rem pattern
- **Opacity**: 3.5% (dark), 4% (light)
- **Purpose**: Subtle technical aesthetic

---

## Accessibility Guidelines

### Contrast Ratios
- **WCAG AA**: All text meets 4.5:1 minimum contrast
- **WCAG AAA**: Large text exceeds 7:1 where possible

### Focus States
- **Outline**: 2px solid accent color
- **Offset**: 2px
- **Border Radius**: 4px

### Reduced Motion
- Comprehensive support for `prefers-reduced-motion`
- Alternative static displays for users with vestibular disorders

---

## Usage Guidelines

### Color Application
1. **Never** use accent and highlight colors together in high contrast
2. **Always** ensure sufficient contrast for text readability
3. **Prefer** themed color variables over hardcoded values
4. **Test** both light and dark themes for consistency

### Typography Best Practices
1. **Maintain** vertical rhythm with consistent line heights
2. **Use** appropriate heading hierarchy (h1 → h2 → h3 → h4)
3. **Limit** line length to 45-75 characters for readability
4. **Apply** `text-wrap: balance` for headlines

### Component Consistency
1. **Use** established component variants rather than custom styling
2. **Maintain** consistent spacing using the defined scale
3. **Apply** hover states consistently across interactive elements
4. **Ensure** all components work in both light and dark themes

---

## Implementation Notes

### CSS Custom Properties
All colors are implemented as RGB values in CSS custom properties, allowing for opacity modulation:
```css
color: rgb(var(--color-accent) / 0.8); /* 80% opacity */
```

### Theme Switching
The design system supports seamless theme switching through the `.light-theme` class applied to the document root.

### Browser Support
- **Modern Browsers**: Full feature support
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Enhanced features for capable browsers

---

This design system serves as the foundational specification for maintaining visual consistency and professional quality throughout the Luis Miguel Montoya portfolio website.
