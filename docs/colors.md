# Color System Documentation — Luis Miguel Montoya Portfolio

## Overview

This project uses a custom, accessible color palette with Tailwind CSS and CSS variables for dynamic light/dark theming. All colors are available as Tailwind classes (e.g., `bg-primary-500`, `text-accent-gold-400`).

## Color Palette

| Name          | Variable              | Light Value | Dark Value | Usage                                |
| ------------- | --------------------- | ----------- | ---------- | ------------------------------------ |
| Primary       | --color-primary       | #0D1B2A     | #F5F7FA    | Headers, primary text                |
| Secondary     | --color-secondary     | #1B263B     | #121212    | Secondary text, backgrounds          |
| Accent Blue   | --color-accent-blue   | #007BFF     | #80b3ff    | Interactive elements, links, buttons |
| Accent Gold   | --color-accent-gold   | #D4AF37     | #e1b51a    | Highlights, achievements, milestones |
| Surface Light | --color-surface-light | #F5F7FA     | #121212    | Card backgrounds, content areas      |
| Surface Dark  | --color-surface-dark  | #121212     | #F5F7FA    | Dark mode backgrounds                |
| Success       | --color-success       | #4CAF50     | #4CAF50    | Completed items, positive metrics    |
| Progress      | --color-progress      | #FF9800     | #FF9800    | In-progress items, current focus     |
| Neutral       | --color-neutral       | #9E9E9E     | #9E9E9E    | Subtle elements, disabled states     |

### Shade Variants

Each color (except surface) has 100–900 variants (e.g., `--color-primary-100` ... `--color-primary-900`). Use these for hover, border, and background states.

## Usage in Tailwind

- `bg-primary-700` — background color
- `text-accent-gold` — text color
- `border-neutral-200` — border color
- `hover:bg-accent-blue-400` — hover state

## Light/Dark Mode

- Colors are set via CSS variables in `globals.css` for both modes.
- Tailwind classes reference these variables, so switching mode updates all colors instantly.
- Use the `ColorSchemeToggle` component to allow users to switch modes (manual override + system preference).

## Accessibility

- All color pairs meet or exceed WCAG AA contrast (4.5:1 for text).
- Use `text-surface-light` on dark backgrounds and `text-primary` on light backgrounds for best contrast.
- Test new color combinations with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

## Adding/Modifying Colors

1. Add new CSS variables (with shade variants) in `globals.css` under `:root` and dark mode.
2. Map them in `tailwind.config.mjs` under `theme.extend.colors`.
3. Document usage and accessibility in this file.

## Example

```tsx
<button className="bg-accent-blue-600 text-surface-light hover:bg-accent-gold-400">
  Contact Me
</button>
```

---

For questions, contact Luis Miguel Montoya.
