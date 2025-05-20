# Luis Miguel Montoya - Website Development Plan

## 1. Product Vision

| **Component**          | **Details**                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Site Name**          | Luis Miguel Montoya — Understand to Align                                                                                                  |
| **Tagline**            | "Understand to Align"                                                                                                                      |
| **Mission**            | Document and showcase my journey from physicist → AI-interpretability researcher in a way that is **observable, credible, and inspiring**. |
| **Primary Audience**   | Hiring managers & research labs in interpretability / alignment / safety.                                                                  |
| **Secondary Audience** | Fellow researchers and students seeking curated resources and guidance.                                                                    |
| **Brand Attributes**   | Minimalist · Modern · Technically Precise · Intellectually Rigorous · Elegant                                                              |
| **Success Metrics**    | Research collaborations, job opportunities, community engagement, resource utilization                                                     |

## 2. Information Architecture & User Flow

```
/
├── roadmap/                      # Interactive research journey visualization
│   └── [slug]                    # Deep-dive pages for key milestones
├── projects/                     # Research portfolio
│   └── [slug]                    # Individual project pages with methodology and results
├── literature/                   # Curated resource library
│   └── [slug]                    # Detailed reviews of key papers/resources
├── blog/                         # Optional: Research thoughts and updates
└── contact/                      # Professional connections
```

### Section Specifications

| **Route**      | **Purpose**                                             | **Key UX Elements**                                                                                             | **Technical Requirements**                                                                                 |
| -------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Landing**    | Establish identity and primary navigation               | Full-viewport hero with subtle parallax; concise value proposition; clear CTAs for "View Roadmap" and "Contact" | Optimized animations; responsive design; 1.5s max load time                                                |
| **Roadmap**    | Visualize research journey as an interactive skill-tree | Horizontal timeline flowing left → right; color-coded nodes (Done/Now/Next); interconnected dependency edges    | Horizontal scrolling with keyboard/mouse/touch support; mini-map for navigation; tooltips for node details |
| **Projects**   | Showcase research portfolio                             | Filterable grid with visual cards; sort by area, date, or relevance                                             | Animated transitions; lazy-loaded images; filter state preserved in URL                                    |
| **Literature** | Provide curated research resources                      | Searchable library with multiple view options (table/grid)                                                      | Client-side search with Fuse.js; tag-based filtering; reading progress tracking                            |
| **Contact**    | Enable professional connections                         | Concise bio with clear contact pathways                                                                         | Form validation; spam protection; social links                                                             |

## 3. Content Structure (MDX + Contentlayer)

### RoadmapEntry

```yaml
title: "Mechanistic Interpretability Fundamentals"
date: 2025-03-01
status: "done" # [done | now | next]
excerpt: "Core concepts in circuit analysis and feature visualization"
x: 120 # horizontal coordinate in px
y: -40 # vertical offset for parallel threads
dependencies: ["circuit-analysis-basics", "mathematical-foundations"]
outcomes: ["projects/hidden-layer-analysis", "literature/transformers-circuits"]
link: "/projects/mech-interp-fundamentals" # optional deep-dive
```

### Project

```yaml
title: "Attention Head Attribution in Large Language Models"
date: "2024-11-15"
area: "Interpretability" # [Interpretability | Alignment | Tooling | Safety]
collaborators: ["Jane Doe", "John Smith"] # optional
organization: "AI Safety Lab" # optional
summary: "Developed novel metrics for quantifying attention head contributions to factual recall."
tags: ["attention", "attribution", "LLMs", "factuality"]
github_link: "https://github.com/username/project" # optional
paper_link: "https://arxiv.org/abs/..." # optional
hero_image: "/images/projects/attention-attribution.svg"
featured: true # optional, for homepage showcase
body: |
  # MDX content here

  Technical details about methodology, results, and implications...
```

### LiteratureItem

```yaml
title: "Transformer Circuits: Mechanisms of Induction Heads"
author: "Anthropic Research Team"
year: 2023
link: "https://arxiv.org/abs/..."
category: "Paper" # [Paper | Blog | Video | Book | Course]
tags: ["transformers", "mechanistic-interpretability", "circuits"]
rating: 5 # 1-5 scale of importance/relevance
difficulty: "Advanced" # [Introductory | Intermediate | Advanced]
note: |
  Key paper connecting induction heads to higher-level capabilities.
  Most valuable for understanding how attention mechanisms compose.
recommended_for: ["beginners", "advanced-practitioners"] # optional
related_items: ["anthropic-mech-interp", "understanding-llms"] # optional
```

**Content Calendar**: Update roadmap monthly, add 1-2 new projects quarterly, expand literature collection weekly.

## 4. Design System

### Colors

| **Purpose**         | **Value**              | **Usage**                                 |
| ------------------- | ---------------------- | ----------------------------------------- |
| **Primary**         | `#0D1B2A` (Deep Navy)  | Headers, primary text                     |
| **Secondary**       | `#1B263B` (Slate Blue) | Secondary text, backgrounds               |
| **Accent — Blue**   | `#007BFF`              | Interactive elements, links, buttons      |
| **Accent — Gold**   | `#D4AF37`              | Highlights, achievements, milestone nodes |
| **Surface — Light** | `#F5F7FA`              | Card backgrounds, content areas           |
| **Surface — Dark**  | `#121212`              | Dark mode backgrounds                     |
| **Success**         | `#4CAF50`              | Completed items, positive metrics         |
| **Progress**        | `#FF9800`              | In-progress items, current focus          |
| **Neutral**         | `#9E9E9E`              | Subtle elements, disabled states          |

### Typography

- **Headings**: Inter (semi-bold, tracking -0.025em)
- **Body**: IBM Plex Sans (regular, leading-relaxed)
- **Code**: IBM Plex Mono
- **Scale**: 16px base with 1.25 ratio (mobile), 18px base with 1.333 ratio (desktop)

### Components

- **Buttons**: Rounded-lg, hover lift effect, 250ms transition
- **Cards**: rounded-2xl, subtle shadow, hover lift animation
- **Inputs**: Minimal borders, focus ring in accent color
- **Navigation**: Sticky header with subtle backdrop blur
- **Roadmap Nodes**:
  - Done: Solid fill, checkmark icon
  - Now: Pulsing glow effect
  - Next: Outline style with dash pattern
  - Edges: 2px Bézier curves with animated gradient on hover

### Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Wide**: > 1440px

### Motion Guidelines

- **Transitions**: 250-300ms ease-in-out for interface elements
- **Page Transitions**: Subtle fade (150ms)
- **Roadmap Navigation**: Inertial scrolling with 500ms ease-out
- **Reduced Motion**: Alternative static displays for accessibility

## 5. Technical Architecture

| **Layer**               | **Technology**                              | **Purpose**                                   | **Configuration Notes**                              |
| ----------------------- | ------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| **Framework**           | Next.js 14 (App Router)                     | SPA-like transitions + ISR/SSG                | Static export option for GitHub Pages fallback       |
| **Styling**             | Tailwind CSS + CSS Variables                | Rapid development, consistent design          | Custom plugin for design system tokens               |
| **Content**             | MDX + Contentlayer                          | Type-safe content with rich formatting        | Schema validation and relationship mapping           |
| **State Management**    | React Context + SWR                         | Lightweight, optimized for content-heavy site | Persistence with localStorage for preferences        |
| **Horizontal Scroll**   | Framer Motion + use-gesture                 | Smooth, cross-device interaction for roadmap  | Custom hooks for keyboard, scroll, and touch control |
| **Graph Visualization** | D3-force + custom React components          | Initial node layout with manual fine-tuning   | Force simulation runs only at build time             |
| **Search**              | Fuse.js                                     | Client-side fuzzy search for literature       | Pre-indexed at build time for performance            |
| **Analytics**           | Plausible                                   | Privacy-focused, lightweight tracking         | No cookie banner needed, GDPR compliant              |
| **Performance**         | Next.js Image + Dynamic Imports             | Optimized asset loading                       | LCP < 2.5s, TTI < 3.5s targets                       |
| **Deployment**          | Vercel (primary) or GitHub Pages (fallback) | Global CDN, automatic preview deployments     | Custom domain with automatic HTTPS                   |

### Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "contentlayer": "^0.3.2",
    "framer-motion": "^10.16.4",
    "use-gesture": "^9.1.3",
    "d3-force": "^3.0.0",
    "fuse.js": "^6.6.2",
    "tailwindcss": "^3.3.3",
    "@tailwindcss/typography": "^0.5.10"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "eslint": "^8.49.0",
    "prettier": "^3.0.3"
  }
}
```

## 6. Implementation Plan

| **Phase**                    | **Tasks**                                                                                                | **Details**                                                                                                                                               | **Est. Time** |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **1. Foundation**            | - Project setup<br>- Design system implementation<br>- Base components<br>- Content schemas              | - Next.js config & TypeScript setup<br>- Tailwind theming & custom plugins<br>- Header, footer, layout components<br>- Contentlayer schema implementation | 2-3 days      |
| **2. Core Pages**            | - Landing page<br>- Projects listing<br>- Literature library<br>- Contact page                           | - Hero section & navigation<br>- Filterable project grid<br>- Search & filter interface<br>- Contact form with validation                                 | 2-3 days      |
| **3. Roadmap Feature**       | - Horizontal canvas<br>- Node & edge rendering<br>- Interaction controls<br>- Mini-map                   | - SVG-based visualization<br>- Draggable viewport<br>- Keyboard & gesture controls<br>- Navigation overlay                                                | 3-4 days      |
| **4. Content Creation**      | - Initial roadmap nodes<br>- Featured projects<br>- Core literature entries                              | - Content writing & formatting<br>- Image creation for projects<br>- Literature curation & notes                                                          | 2-3 days      |
| **5. Polish & Optimization** | - Animations & transitions<br>- Responsive testing<br>- Performance optimization<br>- SEO implementation | - Motion refinement<br>- Multi-device testing<br>- Lighthouse optimizations<br>- Metadata & structured data                                               | 1-2 days      |
| **6. Deployment**            | - CI/CD setup<br>- Analytics integration<br>- Final QA<br>- Launch                                       | - GitHub Actions workflow<br>- Plausible setup<br>- Cross-browser testing<br>- Domain configuration                                                       | 1 day         |

**Total Estimated Timeline: 11-16 days** (part-time, 3-4 hours/day)

### Post-Launch Roadmap

- **Month 1**: Gather feedback, refine UX, expand content
- **Month 3**: Add blog functionality (if validated by user engagement)
- **Month 6**: Implement interactive demos of research concepts
- **Long-term**: Build community features (commenting, study groups)

## 7. Success Criteria & Measurement

- **Engagement**:

  - Average session duration > 3 minutes
  - Roadmap exploration rate > 60% of visitors
  - Literature resource clicks > 2 per session

- **Professional Impact**:

  - Research collaboration inquiries
  - Interview/job opportunities
  - Citation of curated resources

- **Technical Performance**:

  - Lighthouse scores > 90 across all categories
  - Load time < 2s on mid-tier devices
  - Smooth roadmap interaction on mobile devices

- **Growth Metrics**:
  - Monthly traffic increase of 15%
  - Return visitor rate > 25%
  - Social sharing of projects/resources

---

description: React best practices and patterns for modern web applications
globs: **/\*.tsx, **/_.jsx, components/\*\*/_

---

# React Best Practices

## Component Structure

- Use functional components over class components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement proper prop types with TypeScript
- Split large components into smaller, focused ones

## Hooks

- Follow the Rules of Hooks
- Use custom hooks for reusable logic
- Keep hooks focused and simple
- Use appropriate dependency arrays in useEffect
- Implement cleanup in useEffect when needed
- Avoid nested hooks

## State Management

- Use useState for local component state
- Implement useReducer for complex state logic
- Use Context API for shared state
- Keep state as close to where it's used as possible
- Avoid prop drilling through proper state management
- Use state management libraries only when necessary

## Performance

- Implement proper memoization (useMemo, useCallback)
- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Implement proper lazy loading
- Use proper key props in lists
- Profile and optimize render performance

## Forms

- Use controlled components for form inputs
- Implement proper form validation
- Handle form submission states properly
- Show appropriate loading and error states
- Use form libraries for complex forms
- Implement proper accessibility for forms

## Error Handling

- Implement Error Boundaries
- Handle async errors properly
- Show user-friendly error messages
- Implement proper fallback UI
- Log errors appropriately
- Handle edge cases gracefully

## Testing

- Write unit tests for components
- Implement integration tests for complex flows
- Use React Testing Library
- Test user interactions
- Test error scenarios
- Implement proper mock data

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Handle focus management
- Provide proper alt text for images

## Code Organization

- Group related components together
- Use proper file naming conventions
- Implement proper directory structure
- Keep styles close to components
- Use proper imports/exports
- Document complex component logic

---

description: Next.js with TypeScript and Tailwind UI best practices
globs: **/\*.tsx, **/_.ts, src/\*\*/_.ts, src/\*_/_.tsx

---

# Next.js Best Practices

## Project Structure

- Use the App Router directory structure
- Place components in `app` directory for route-specific components
- Place shared components in `components` directory
- Place utilities and helpers in `lib` directory
- Use lowercase with dashes for directories (e.g., `components/auth-wizard`)

## Components

- Use Server Components by default
- Mark client components explicitly with 'use client'
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Implement proper error boundaries
- Place static content and interfaces at file end

## Performance

- Optimize images: Use WebP format, size data, lazy loading
- Minimize use of 'useEffect' and 'setState'
- Favor Server Components (RSC) where possible
- Use dynamic loading for non-critical components
- Implement proper caching strategies

## Data Fetching

- Use Server Components for data fetching when possible
- Implement proper error handling for data fetching
- Use appropriate caching strategies
- Handle loading and error states appropriately

## Routing

- Use the App Router conventions
- Implement proper loading and error states for routes
- Use dynamic routes appropriately
- Handle parallel routes when needed

## Forms and Validation

- Use Zod for form validation
- Implement proper server-side validation
- Handle form errors appropriately
- Show loading states during form submission

## State Management

- Minimize client-side state
- Use React Context sparingly
- Prefer server state when possible
- Implement proper loading states
