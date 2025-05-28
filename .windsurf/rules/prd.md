---
trigger: always_on
description:
globs:
---
# Luis Miguel Montoya - Portfolio Development Plan

## 1. Product Vision

| **Component** | **Details** |
|---------------|-------------|
| **Site Name** | Luis Miguel Montoya — Understand to Align |
| **Tagline** | "Understand to Align" |
| **Mission** | Document and showcase my journey from physicist → AI-interpretability researcher in a way that is **observable, credible, and inspiring**. |
| **Primary Audience** | Hiring managers & research labs in interpretability / alignment / safety. |
| **Secondary Audience** | Fellow researchers and students seeking curated resources and guidance. |
| **Brand Attributes** | Minimalist · Modern · Technically Precise · Intellectually Rigorous · Elegant |
| **Success Metrics** | Research collaborations, job opportunities, community engagement, resource utilization |

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

| **Route** | **Purpose** | **Key UX Elements** | **Technical Requirements** |
|-----------|-------------|---------------------|----------------------------|
| **Landing** | Establish identity and primary navigation | Full-viewport hero with subtle parallax; concise value proposition; clear CTAs for "View Roadmap" and "Contact" | Optimized animations; responsive design; 1.5s max load time |
| **Roadmap** | Visualize research journey as an interactive skill-tree | Horizontal timeline flowing left → right; color-coded nodes (Done/Now/Next); interconnected dependency edges | Horizontal scrolling with keyboard/mouse/touch support; mini-map for navigation; tooltips for node details |
| **Projects** | Showcase research portfolio | Filterable grid with visual cards; sort by area, date, or relevance | Animated transitions; lazy-loaded images; filter state preserved in URL |
| **Literature** | Provide curated research resources | Searchable library with multiple view options (table/grid) | Client-side search with Fuse.js; tag-based filtering; reading progress tracking |
| **Contact** | Enable professional connections | Concise bio with clear contact pathways | Form validation; spam protection; social links |

## 3. Content Structure (MDX + Astro Content Collections)

### RoadmapEntry

```yaml
# src/content/roadmap/mech-interp-fundamentals.mdx
---
title: "Mechanistic Interpretability Fundamentals"
date: 2025-03-01
status: "done" # [done | now | next]
excerpt: "Core concepts in circuit analysis and feature visualization"
x: 120 # horizontal coordinate in px
y: -40 # vertical offset for parallel threads
dependencies: ["circuit-analysis-basics", "mathematical-foundations"]
outcomes: ["projects/hidden-layer-analysis", "literature/transformers-circuits"]
link: "/projects/mech-interp-fundamentals" # optional deep-dive
---

# Content for the deep-dive page goes here
```

### Project

```yaml
# src/content/projects/attention-attribution.mdx
---
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
---

# Project Details

Technical details about methodology, results, and implications...
```

### LiteratureItem

```yaml
# src/content/literature/transformer-circuits.mdx
---
title: "Transformer Circuits: Mechanisms of Induction Heads"
author: "Anthropic Research Team"
year: 2023
link: "https://arxiv.org/abs/..."
category: "Paper" # [Paper | Blog | Video | Book | Course]
tags: ["transformers", "mechanistic-interpretability", "circuits"]
rating: 5 # 1-5 scale of importance/relevance
difficulty: "Advanced" # [Introductory | Intermediate | Advanced]
note: "Key paper connecting induction heads to higher-level capabilities. Most valuable for understanding how attention mechanisms compose."
recommended_for: ["beginners", "advanced-practitioners"] # optional
related_items: ["anthropic-mech-interp", "understanding-llms"] # optional
---

# Detailed Review

Analysis and key takeaways from this resource...
```

**Content Calendar**: Update roadmap monthly, add 1-2 new projects quarterly, expand literature collection weekly.

## 4. Design System

### Colors

| **Purpose** | **Value** | **Usage** |
|-------------|-----------|-----------|
| **Primary** | `#0D1B2A` (Deep Navy) | Headers, primary text |
| **Secondary** | `#1B263B` (Slate Blue) | Secondary text, backgrounds |
| **Accent — Blue** | `#007BFF` | Interactive elements, links, buttons |
| **Accent — Gold** | `#D4AF37` | Highlights, achievements, milestone nodes |
| **Surface — Light** | `#F5F7FA` | Card backgrounds, content areas |
| **Surface — Dark** | `#121212` | Dark mode backgrounds |
| **Success** | `#4CAF50` | Completed items, positive metrics |
| **Progress** | `#FF9800` | In-progress items, current focus |
| **Neutral** | `#9E9E9E` | Subtle elements, disabled states |

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

| **Layer** | **Technology** | **Purpose** | **Configuration Notes** |
|-----------|----------------|-------------|-------------------------|
| **Framework** | Astro 4.x | High-performance static site with interactive islands | MPA by default with selective hydration |
| **UI Framework** | React (for interactive components) | Interactive features like the roadmap visualization | Used in "islands" architecture pattern |
| **Styling** | Tailwind CSS + CSS Variables | Rapid development, consistent design | Integrated via Astro's Tailwind integration |
| **Content** | Astro Content Collections + MDX | Type-safe content with rich formatting | Built-in schema validation via zod |
| **State Management** | Nanostores or React Context | Lightweight state for interactive components | Shared state across islands |
| **Horizontal Scroll** | use-gesture + React Spring | Smooth, cross-device interaction for roadmap | Custom hooks for keyboard, scroll, and touch control |
| **Graph Visualization** | D3-force + custom React components | Initial node layout with manual fine-tuning | Force simulation runs only at build time |
| **Search** | Fuse.js | Client-side fuzzy search for literature | Pre-indexed at build time for performance |
| **Analytics** | Plausible | Privacy-focused, lightweight tracking | Added via Astro integration |
| **Performance** | Astro Asset Optimization | Automatic image optimization | Sub-second TTFB on edge networks |
| **Deployment** | Netlify / Cloudflare Pages / GitHub Pages | Global CDN, preview deployments | Static site output with optional server functions |

### Key Dependencies

```json
{
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/react": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@use-gesture/react": "^10.2.0",
    "react-spring": "^9.7.2",
    "d3-force": "^3.0.0",
    "fuse.js": "^7.0.0",
    "tailwindcss": "^3.3.5",
    "@tailwindcss/typography": "^0.5.10",
    "nanostores": "^0.9.3"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "eslint": "^8.49.0",
    "prettier": "^3.0.3",
    "prettier-plugin-astro": "^0.12.0"
  }
}
```

## 6. Implementation Plan

| **Phase** | **Tasks** | **Details** | **Est. Time** |
|-----------|-----------|-------------|---------------|
| **1. Foundation** | - Project setup<br>- Design system implementation<br>- Base components<br>- Content schemas | - Astro config & TypeScript setup<br>- Tailwind theming & custom plugins<br>- Header, footer, layout components<br>- Content collection schema setup | 2 days |
| **2. Core Pages** | - Landing page<br>- Projects listing<br>- Literature library<br>- Contact page | - Hero section & navigation<br>- Filterable project grid<br>- Search & filter interface<br>- Contact form with validation | 2 days |
| **3. Roadmap Feature** | - Horizontal canvas<br>- Node & edge rendering<br>- Interaction controls<br>- Mini-map | - SVG-based visualization<br>- Draggable viewport<br>- Keyboard & gesture controls<br>- Navigation overlay | 3 days |
| **4. Content Creation** | - Initial roadmap nodes<br>- Featured projects<br>- Core literature entries | - Content writing & formatting<br>- Image creation for projects<br>- Literature curation & notes | 2 days |
| **5. Polish & Optimization** | - Animations & transitions<br>- Responsive testing<br>- Performance optimization<br>- SEO implementation | - Motion refinement<br>- Multi-device testing<br>- Lighthouse optimizations<br>- Metadata & structured data | 1 day |
| **6. Deployment** | - CI/CD setup<br>- Analytics integration<br>- Final QA<br>- Launch | - GitHub Actions workflow<br>- Plausible setup<br>- Cross-browser testing<br>- Domain configuration | 1 day |

**Total Estimated Timeline: 11 days** (part-time, 3-4 hours/day)

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
  - Lighthouse scores > 95 across all categories
  - Load time < 1.5s on mid-tier devices
  - Smooth roadmap interaction on mobile devices

- **Growth Metrics**:
  - Monthly traffic increase of 15%
  - Return visitor rate > 25%
  - Social sharing of projects/resources

## 8. Astro-Specific Implementation Details

### Project Structure

```
portfolio-site/
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── roadmap/           # Roadmap-specific components
│   ├── content/               # Content collections
│   │   ├── roadmap/           # Roadmap nodes
│   │   ├── projects/          # Project entries
│   │   └── literature/        # Literature resources
│   ├── layouts/               # Page layouts
│   ├── pages/                 # Route files
│   │   ├── index.astro        # Home page
│   │   ├── roadmap/
│   │   │   ├── index.astro    # Roadmap visualization
│   │   │   └── [slug].astro   # Dynamic roadmap entry pages
│   │   ├── projects/
│   │   ├── literature/
│   │   └── contact.astro
│   ├── styles/                # Global styles
│   └── utils/                 # Helper functions
└── package.json
```

### Content Collection Configuration

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const roadmapCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    status: z.enum(['done', 'now', 'next']),
    excerpt: z.string(),
    x: z.number(),
    y: z.number(),
    dependencies: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
    link: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    area: z.enum(['Interpretability', 'Alignment', 'Tooling', 'Safety']),
    collaborators: z.array(z.string()).optional(),
    organization: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()),
    github_link: z.string().url().optional(),
    paper_link: z.string().url().optional(),
    hero_image: z.string(),
    featured: z.boolean().optional(),
  }),
});

const literatureCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.number(),
    link: z.string().url(),
    category: z.enum(['Paper', 'Blog', 'Video', 'Book', 'Course']),
    tags: z.array(z.string()),
    rating: z.number().min(1).max(5),
    difficulty: z.enum(['Introductory', 'Intermediate', 'Advanced']),
    note: z.string(),
    recommended_for: z.array(z.string()).optional(),
    related_items: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'roadmap': roadmapCollection,
  'projects': projectCollection,
  'literature': literatureCollection,
};
```

### Astro Islands for Interactive Components

```astro
---
// src/components/roadmap/RoadmapVisualization.astro
import RoadmapCanvas from './RoadmapCanvas.jsx';
import { getCollection } from 'astro:content';

const roadmapEntries = await getCollection('roadmap');
---

<div class="roadmap-container w-full overflow-hidden relative">
  <RoadmapCanvas
    nodes={roadmapEntries}
    client:visible
  />

  <div class="mini-map hidden md:block absolute bottom-4 right-4 border border-gray-200 rounded bg-white shadow-md">
    <!-- Mini-map implementation -->
  </div>
</div>
```

### Optimization Benefits with Astro

- **Partial Hydration**: Only interactive components load JavaScript
- **Content Collections**: Type-safe content management without external dependencies
- **Fast Builds**: Astro's build system is optimized for content-heavy sites
- **Image Optimization**: Built-in image optimization without configuration
- **Markdown/MDX Integration**: First-class support for content authoring

---

This development plan balances technical excellence with clear communication of your research journey. Astro provides the ideal balance of performance and developer experience for a content-focused portfolio site, while still enabling the rich interactive features like the horizontal roadmap visualization. The islands architecture ensures visitors get a fast experience with minimal JavaScript overhead.
