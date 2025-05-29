x# 🚦 Unified Content System – Detailed PRD

## Overview

We will build a **Unified Content System** for the portfolio that enables seamless creation and display of all content types (blog posts, roadmap milestones, literature summaries, projects) through a single, flexible schema. The system will feature an elegant left sidebar navigation and a spacious content area, maintaining the portfolio's modern aesthetic while being highly reusable and author-friendly.

### Core Philosophy
- **Write once, display anywhere**: A roadmap milestone can also be a project showcase or a blog post
- **Media-rich content**: Support for text, images, videos, animations, and interactive JS components
- **Effortless authoring**: Simple MDX files with intelligent frontmatter
- **Elegant presentation**: Split-view layout with navigation sidebar and content area

---

## 1. System Architecture

### 1.1 Content Schema Design

```typescript
// src/content/config.ts
const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // === CORE METADATA ===
    title: z.string(),
    slug: z.string(), // Custom URL slug
    date: z.date(),
    lastModified: z.date().optional(),
    excerpt: z.string().max(280), // For cards and SEO

    // === CONTENT TYPES (Multiple Selection) ===
    // A single piece can be multiple types
    types: z.array(z.enum([
      'blog',
      'roadmap',
      'project',
      'literature',
      'note',
      'guide'
    ])),

    // === CATEGORIZATION ===
    category: z.enum([
      'Research',
      'Technical',
      'Reflection',
      'Resource',
      'Tutorial',
      'Update'
    ]),
    tags: z.array(z.string()).default([]),

    // === STATUS & PROGRESS ===
    status: z.enum([
      'draft',
      'published',
      'archived',
      'in-progress',
      'completed',
      'planned'
    ]).default('draft'),

    // === ROADMAP SPECIFIC ===
    roadmap: z.object({
      phase: z.number().optional(), // 1, 2, 3...
      dependencies: z.array(z.string()).optional(), // Other post slugs
      outcomes: z.array(z.string()).optional(),
      timeline: z.string().optional(), // "Q1 2024", "2 months"
    }).optional(),

    // === PROJECT SPECIFIC ===
    project: z.object({
      area: z.enum(['Interpretability', 'Alignment', 'Tooling', 'Safety']),
      stack: z.array(z.string()).optional(), // ["Python", "PyTorch", "React"]
      collaborators: z.array(z.object({
        name: z.string(),
        url: z.string().url().optional(),
        role: z.string().optional(),
      })).optional(),
      links: z.object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        paper: z.string().url().optional(),
        video: z.string().url().optional(),
      }).optional(),
    }).optional(),

    // === LITERATURE SPECIFIC ===
    literature: z.object({
      authors: z.array(z.string()),
      year: z.number(),
      source: z.string(), // "NeurIPS", "arXiv", "Blog"
      sourceUrl: z.string().url(),
      type: z.enum(['Paper', 'Blog', 'Book', 'Video', 'Course']),
      difficulty: z.enum(['Introductory', 'Intermediate', 'Advanced']),
      rating: z.number().min(1).max(5).optional(),
      keyTakeaways: z.array(z.string()).optional(),
    }).optional(),

    // === MEDIA & VISUAL ===
    media: z.object({
      hero: image().optional(), // Hero image
      thumbnail: image().optional(), // Card thumbnail
      gallery: z.array(image()).optional(), // Image gallery
      videos: z.array(z.object({
        url: z.string().url(),
        title: z.string(),
        platform: z.enum(['youtube', 'vimeo', 'custom']),
      })).optional(),
    }).optional(),

    // === INTERACTIVE ELEMENTS ===
    interactive: z.object({
      hasDemo: z.boolean().default(false),
      hasAnimation: z.boolean().default(false),
      hasCodePlayground: z.boolean().default(false),
      requirements: z.array(z.string()).optional(), // ["D3.js", "WebGL"]
    }).optional(),

    // === SEO & DISPLAY ===
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: image().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),

    // === UI CONFIGURATION ===
    display: z.object({
      showToc: z.boolean().default(true), // Table of contents
      showRelated: z.boolean().default(true),
      showComments: z.boolean().default(false),
      layout: z.enum(['default', 'wide', 'centered']).default('default'),
      accent: z.enum(['blue', 'gold', 'green']).optional(), // Override default
    }).optional(),

    // === COMPUTED FIELDS (Added at build) ===
    readingTime: z.number().optional(), // Minutes
    wordCount: z.number().optional(),
    headings: z.array(z.object({
      depth: z.number(),
      text: z.string(),
      slug: z.string(),
    })).optional(),
  })
});
```

### 1.2 Layout Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Header                             │
├─────────────────┬───────────────────────────────────────┤
│                 │                                       │
│   Sidebar       │         Content Area                 │
│                 │                                       │
│  - Navigation   │    - Article/Post Content            │
│  - TOC          │    - Media Elements                  │
│  - Filters      │    - Interactive Components          │
│  - Search       │    - Related Content                 │
│                 │                                       │
│                 │                                       │
└─────────────────┴───────────────────────────────────────┘
```

---

## 2. Implementation Tasks

### Phase 1: Schema & Collection Setup

#### Task 1.1: Create Unified Schema
**File**: `src/content/config.ts`
**Time**: 45 minutes

```typescript
// Implementation details:
// 1. Remove existing collections (roadmap, projects, literature)
// 2. Create single 'posts' collection with comprehensive schema
// 3. Add schema validation helpers
// 4. Export TypeScript types for components

import { defineCollection, z, reference } from 'astro:content';
import { readingTime } from 'reading-time';

// Define the unified posts collection
export const collections = {
  posts: defineCollection({
    type: 'content',
    schema: ({ image }) => postsSchema(image),
  }),
};

// Helper to compute reading time
export async function computeReadingTime(content: string) {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

// Helper to extract headings
export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      depth: match[1].length,
      text: match[2],
      slug: slugify(match[2]),
    });
  }

  return headings;
}
```

#### Task 1.2: Create Content Utilities
**File**: `src/utils/content.ts`
**Time**: 60 minutes

```typescript
// Utility functions for content management
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

// Get all posts of specific type(s)
export async function getPostsByType(types: string | string[]) {
  const typeArray = Array.isArray(types) ? types : [types];
  const posts = await getCollection('posts');

  return posts.filter(post =>
    post.data.status === 'published' &&
    typeArray.some(type => post.data.types.includes(type))
  );
}

// Get related posts based on tags and category
export async function getRelatedPosts(
  currentPost: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getCollection('posts');

  // Score posts based on similarity
  const scored = posts
    .filter(p => p.slug !== currentPost.slug && p.data.status === 'published')
    .map(post => {
      let score = 0;

      // Same category = 3 points
      if (post.data.category === currentPost.data.category) score += 3;

      // Shared tags = 1 point each
      const sharedTags = post.data.tags.filter(tag =>
        currentPost.data.tags.includes(tag)
      );
      score += sharedTags.length;

      // Shared types = 2 points each
      const sharedTypes = post.data.types.filter(type =>
        currentPost.data.types.includes(type)
      );
      score += sharedTypes.length * 2;

      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(item => item.post);
}

// Get posts for sidebar navigation
export async function getNavigationPosts() {
  const posts = await getCollection('posts', ({ data }) =>
    data.status === 'published'
  );

  // Group by primary type (first type in array)
  const grouped = posts.reduce((acc, post) => {
    const primaryType = post.data.types[0];
    if (!acc[primaryType]) acc[primaryType] = [];
    acc[primaryType].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Sort each group by date
  Object.keys(grouped).forEach(type => {
    grouped[type].sort((a, b) =>
      b.data.date.getTime() - a.data.date.getTime()
    );
  });

  return grouped;
}

// Build breadcrumb trail
export function getBreadcrumbs(post: Post) {
  const crumbs = [
    { label: 'Home', href: '/' },
  ];

  // Add primary type as main section
  const primaryType = post.data.types[0];
  crumbs.push({
    label: primaryType.charAt(0).toUpperCase() + primaryType.slice(1),
    href: `/${primaryType}`,
  });

  // Add current post
  crumbs.push({
    label: post.data.title,
    href: `/posts/${post.slug}`,
  });

  return crumbs;
}
```

### Phase 2: Layout Components

#### Task 2.1: Create Unified Post Layout
**File**: `src/layouts/PostLayout.astro`
**Time**: 120 minutes

```astro
---
import Layout from './Layout.astro';
import Sidebar from '../components/post/Sidebar.astro';
import TableOfContents from '../components/post/TableOfContents.astro';
import PostHeader from '../components/post/PostHeader.astro';
import PostFooter from '../components/post/PostFooter.astro';
import Breadcrumbs from '../components/ui/Breadcrumbs.astro';
import { getRelatedPosts, getBreadcrumbs } from '../utils/content';
import type { Post } from '../utils/content';

interface Props {
  post: Post;
}

const { post } = Astro.props;
const { Content, headings } = await post.render();

// Get related posts
const relatedPosts = await getRelatedPosts(post);
const breadcrumbs = getBreadcrumbs(post);

// Determine accent color based on primary type
const accentColors = {
  roadmap: 'gold',
  project: 'blue',
  literature: 'green',
  blog: 'blue',
};
const primaryType = post.data.types[0];
const accentColor = post.data.display?.accent || accentColors[primaryType] || 'blue';

// Layout classes
const layoutClasses = {
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
  centered: 'max-w-3xl',
};
const contentWidth = layoutClasses[post.data.display?.layout || 'default'];
---

<Layout
  title={post.data.seo?.metaTitle || post.data.title}
  description={post.data.seo?.metaDescription || post.data.excerpt}
>
  <div class="min-h-screen relative">
    <!-- Background pattern specific to content type -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none"></div>

    <!-- Main container -->
    <div class="relative z-10 pt-20">
      <!-- Breadcrumbs -->
      <div class="container mx-auto px-6 mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <!-- Split layout -->
      <div class="container mx-auto px-6 flex gap-8 lg:gap-12">
        <!-- Sidebar (Desktop: 1/4, Mobile: Hidden) -->
        <aside class="hidden lg:block w-72 flex-shrink-0">
          <div class="sticky top-24 space-y-6">
            <Sidebar currentPost={post} accentColor={accentColor} />

            {post.data.display?.showToc && headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}
          </div>
        </aside>

        <!-- Content area -->
        <main class="flex-1 min-w-0">
          <article class={`mx-auto ${contentWidth}`}>
            <!-- Post header -->
            <PostHeader post={post} accentColor={accentColor} />

            <!-- Post content with prose styling -->
            <div class="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:font-sans prose-headings:font-semibold
                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-secondary prose-p:leading-relaxed
                        prose-a:text-interactive-blue prose-a:no-underline
                        prose-a:border-b prose-a:border-interactive-blue/30
                        prose-a:hover:border-interactive-blue
                        prose-code:text-sm prose-code:bg-surface-secondary
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-surface-secondary prose-pre:border
                        prose-pre:border-primary">
              <Content />
            </div>

            <!-- Post footer -->
            <PostFooter
              post={post}
              relatedPosts={relatedPosts}
              accentColor={accentColor}
            />
          </article>
        </main>
      </div>
    </div>
  </div>

  <!-- Mobile TOC (Fixed bottom sheet) -->
  {post.data.display?.showToc && headings.length > 0 && (
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <TableOfContents headings={headings} variant="mobile" />
    </div>
  )}
</Layout>

<style>
  /* Custom prose overrides for interactive content */
  article :global(.interactive-demo) {
    margin: 2rem -1rem;
    padding: 2rem;
    background: rgb(var(--color-surface-secondary));
    border-radius: 1rem;
    border: 1px solid rgb(var(--color-border-primary));
  }

  article :global(.full-bleed) {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
  }

  /* Smooth scroll for anchor links */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
  }
</style>
```

#### Task 2.2: Create Sidebar Component
**File**: `src/components/post/Sidebar.astro`
**Time**: 90 minutes

```astro
---
import { getNavigationPosts } from '../../utils/content';
import type { Post } from '../../utils/content';
import SearchInput from '../ui/SearchInput.astro';

interface Props {
  currentPost: Post;
  accentColor: 'blue' | 'gold' | 'green';
}

const { currentPost, accentColor } = Astro.props;
const groupedPosts = await getNavigationPosts();

// Type labels
const typeLabels = {
  blog: 'Blog Posts',
  roadmap: 'Roadmap',
  project: 'Projects',
  literature: 'Literature',
  note: 'Notes',
  guide: 'Guides',
};

// Accent classes
const accentClasses = {
  blue: 'text-interactive-blue border-interactive-blue',
  gold: 'text-interactive-gold border-interactive-gold',
  green: 'text-resource border-resource',
};
---

<nav class="space-y-8">
  <!-- Search -->
  <div>
    <SearchInput placeholder="Search posts..." />
  </div>

  <!-- Navigation groups -->
  <div class="space-y-6">
    {Object.entries(groupedPosts).map(([type, posts]) => (
      <div>
        <h3 class="text-sm font-mono font-medium text-tertiary uppercase tracking-wider mb-3">
          {typeLabels[type] || type}
        </h3>

        <ul class="space-y-1">
          {posts.slice(0, 10).map((post) => {
            const isActive = post.slug === currentPost.slug;
            const baseClasses = "block py-2 px-3 rounded-lg text-sm transition-spring relative";
            const stateClasses = isActive
              ? `bg-surface-secondary ${accentClasses[accentColor]} font-medium`
              : "text-secondary hover:text-primary hover:bg-surface-secondary/50";

            return (
              <li>
                <a
                  href={`/posts/${post.slug}`}
                  class={`${baseClasses} ${stateClasses} group`}
                >
                  {isActive && (
                    <span class={`absolute left-0 top-2 bottom-2 w-0.5 ${accentClasses[accentColor]} bg-current`} />
                  )}

                  <span class="line-clamp-2">{post.data.title}</span>

                  {/* Status indicator for roadmap items */}
                  {post.data.roadmap && post.data.status !== 'completed' && (
                    <span class="inline-block w-2 h-2 rounded-full bg-interactive-gold opacity-60 ml-2" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {posts.length > 10 && (
          <a
            href={`/${type}`}
            class="inline-flex items-center mt-2 text-xs text-tertiary hover:text-primary transition-theme"
          >
            View all {posts.length} {typeLabels[type]?.toLowerCase()}
            <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    ))}
  </div>

  <!-- Filters -->
  <div class="pt-6 border-t border-subtle">
    <h3 class="text-sm font-mono font-medium text-tertiary uppercase tracking-wider mb-3">
      Filter by
    </h3>

    <div class="space-y-2">
      <button class="filter-chip" data-filter="recent">
        Recent
      </button>
      <button class="filter-chip" data-filter="featured">
        Featured
      </button>
      <button class="filter-chip" data-filter="in-progress">
        In Progress
      </button>
    </div>
  </div>
</nav>

<style>
  .filter-chip {
    @apply inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium;
    @apply bg-surface-secondary text-secondary border border-subtle;
    @apply hover:border-primary hover:text-primary transition-spring;
  }

  .filter-chip[data-active="true"] {
    @apply bg-interactive-blue text-white border-interactive-blue;
  }
</style>

<script>
  // Filter functionality
  document.addEventListener('astro:page-load', () => {
    const filterButtons = document.querySelectorAll('.filter-chip');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const isActive = button.getAttribute('data-active') === 'true';

        // Toggle active state
        filterButtons.forEach(b => b.setAttribute('data-active', 'false'));
        if (!isActive) {
          button.setAttribute('data-active', 'true');
        }

        // Emit filter event
        const filter = button.getAttribute('data-filter');
        window.dispatchEvent(new CustomEvent('filter-posts', {
          detail: { filter: isActive ? null : filter }
        }));
      });
    });
  });
</script>
```

#### Task 2.3: Create Table of Contents Component
**File**: `src/components/post/TableOfContents.astro`
**Time**: 60 minutes

```astro
---
interface Heading {
  depth: number;
  text: string;
  slug: string;
}

interface Props {
  headings: Heading[];
  variant?: 'desktop' | 'mobile';
}

const { headings, variant = 'desktop' } = Astro.props;

// Filter to only show h2 and h3
const tocHeadings = headings.filter(h => h.depth === 2 || h.depth === 3);

const containerClasses = variant === 'mobile'
  ? 'bg-surface-secondary backdrop-blur-lg border-t border-primary p-4'
  : 'bg-surface-secondary/50 backdrop-blur-sm rounded-xl border border-subtle p-6';
---

{tocHeadings.length > 0 && (
  <div class={containerClasses} id="table-of-contents">
    <h3 class="text-sm font-mono font-medium text-tertiary uppercase tracking-wider mb-4">
      {variant === 'mobile' ? 'Contents' : 'On this page'}
    </h3>

    <nav>
      <ul class={variant === 'mobile' ? 'flex gap-4 overflow-x-auto' : 'space-y-2'}>
        {tocHeadings.map((heading) => (
          <li
            class={heading.depth === 3 ? 'ml-4' : ''}
            style={variant === 'mobile' ? 'flex-shrink: 0' : ''}
          >
            <a
              href={`#${heading.slug}`}
              class="toc-link block py-1 text-sm text-secondary hover:text-primary transition-theme"
              data-depth={heading.depth}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
)}

<style>
  .toc-link[data-active="true"] {
    @apply text-interactive-blue font-medium;
  }

  /* Depth indentation for desktop */
  @media (min-width: 1024px) {
    .toc-link[data-depth="3"] {
      @apply pl-4 text-xs;
    }
  }
</style>

<script>
  // Scroll spy for active heading
  document.addEventListener('astro:page-load', () => {
    const tocLinks = document.querySelectorAll('.toc-link');
    const headings = document.querySelectorAll('h2, h3');

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            // Update active states
            tocLinks.forEach((link) => {
              const href = link.getAttribute('href');
              link.setAttribute('data-active', href === `#${id}` ? 'true' : 'false');
            });
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 1.0,
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });

    // Smooth scroll on click
    tocLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
</script>
```

#### Task 2.4: Create Post Header Component
**File**: `src/components/post/PostHeader.astro`
**Time**: 45 minutes

```astro
---
import type { Post } from '../../utils/content';
import { formatRelativeDate } from '../../utils/dateUtils';

interface Props {
  post: Post;
  accentColor: 'blue' | 'gold' | 'green';
}

const { post, accentColor } = Astro.props;

// Type badges configuration
const typeBadges = {
  blog: { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', label: 'Blog' },
  roadmap: { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', label: 'Roadmap' },
  project: { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', label: 'Project' },
  literature: { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Literature' },
};

const accentStyles = {
  blue: 'bg-interactive-blue/10 text-interactive-blue border-interactive-blue/20',
  gold: 'bg-interactive-gold/10 text-interactive-gold border-interactive-gold/20',
  green: 'bg-resource/10 text-resource border-resource/20',
};
---

<header class="mb-12">
  <!-- Type badges -->
  <div class="flex flex-wrap gap-2 mb-6">
    {post.data.types.map((type) => {
      const badge = typeBadges[type as keyof typeof typeBadges];
      if (!badge) return null;

      return (
        <span class={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${accentStyles[accentColor]}`}>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={badge.icon} />
          </svg>
          {badge.label}
        </span>
      );
    })}

    {/* Status badge for non-completed items */}
    {post.data.status === 'in-progress' && (
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-status-warning/10 text-status-warning border border-status-warning/20">
        <span class="w-2 h-2 rounded-full bg-current animate-pulse" />
        In Progress
      </span>
    )}
  </div>

  <!-- Title -->
  <h1 class="text-4xl md:text-5xl font-sans font-bold text-primary leading-tight mb-4">
    {post.data.title}
  </h1>

  <!-- Excerpt -->
  <p class="text-xl text-secondary leading-relaxed mb-6">
    {post.data.excerpt}
  </p>

  <!-- Metadata bar -->
  <div class="flex flex-wrap items-center gap-4 text-sm text-tertiary font-mono">
    <time datetime={post.data.date.toISOString()} class="flex items-center gap-1.5">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {post.data.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      <span class="opacity-60">•</span>
      <span class="opacity-80">{formatRelativeDate(post.data.date.toISOString())}</span>
    </time>

    {post.data.readingTime && (
      <>
        <span class="opacity-60">•</span>
        <span class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {post.data.readingTime} min read
        </span>
      </>
    )}

    {post.data.wordCount && (
      <>
        <span class="opacity-60">•</span>
        <span>{post.data.wordCount.toLocaleString()} words</span>
      </>
    )}
  </div>

  <!-- Hero image -->
  {post.data.media?.hero && (
    <div class="mt-8 -mx-6 md:-mx-12 lg:-mx-16">
      <img
        src={post.data.media.hero.src}
        alt={post.data.title}
        class="w-full h-auto rounded-xl shadow-themed-lg"
      />
    </div>
  )}
</header>
```

#### Task 2.5: Create Post Footer Component
**File**: `src/components/post/PostFooter.astro`
**Time**: 45 minutes

```astro
---
import type { Post } from '../../utils/content';
import Card from '../ui/Card.astro';

interface Props {
  post: Post;
  relatedPosts: Post[];
  accentColor: 'blue' | 'gold' | 'green';
}

const { post, relatedPosts, accentColor } = Astro.props;

// Share URLs
const shareUrl = Astro.url.href;
const shareTitle = encodeURIComponent(post.data.title);
const shareText = encodeURIComponent(post.data.excerpt);

const shareLinks = [
  {
    name: 'Twitter',
    url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
    icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
  },
  {
    name: 'LinkedIn',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    icon: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z',
  },
];
---

<footer class="mt-16 pt-8 border-t border-subtle">
  <!-- Tags -->
  {post.data.tags.length > 0 && (
    <div class="mb-8">
      <h3 class="text-sm font-mono font-medium text-tertiary uppercase tracking-wider mb-3">
        Tags
      </h3>
      <div class="flex flex-wrap gap-2">
        {post.data.tags.map((tag) => (
          <a
            href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
            class="inline-flex items-center px-3 py-1 rounded-full text-sm
                   bg-surface-secondary text-secondary border border-subtle
                   hover:border-primary hover:text-primary transition-spring"
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  )}

  <!-- Share section -->
  <div class="mb-8">
    <h3 class="text-sm font-mono font-medium text-tertiary uppercase tracking-wider mb-3">
      Share
    </h3>
    <div class="flex gap-3">
      {shareLinks.map((link) => (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center w-10 h-10 rounded-lg
                 bg-surface-secondary text-secondary border border-subtle
                 hover:border-primary hover:text-primary transition-spring group"
          aria-label={`Share on ${link.name}`}
        >
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
            <path d={link.icon} />
          </svg>
        </a>
      ))}

      <!-- Copy link button -->
      <button
        id="copy-link"
        class="inline-flex items-center justify-center w-10 h-10 rounded-lg
               bg-surface-secondary text-secondary border border-subtle
               hover:border-primary hover:text-primary transition-spring group"
        aria-label="Copy link"
        data-url={shareUrl}
      >
        <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Related posts -->
  {post.data.display?.showRelated && relatedPosts.length > 0 && (
    <div class="mt-12">
      <h3 class="text-2xl font-sans font-semibold text-primary mb-6">
        Related Content
      </h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((relatedPost) => (
          <Card
            title={relatedPost.data.title}
            description={relatedPost.data.excerpt}
            href={`/posts/${relatedPost.slug}`}
            tag={relatedPost.data.category}
            date={relatedPost.data.date.toLocaleDateString()}
            imageSrc={relatedPost.data.media?.thumbnail?.src}
          />
        ))}
      </div>
    </div>
  )}
</footer>

<script>
  // Copy link functionality
  document.addEventListener('astro:page-load', () => {
    const copyButton = document.getElementById('copy-link');

    copyButton?.addEventListener('click', async () => {
      const url = copyButton.getAttribute('data-url') || '';

      try {
        await navigator.clipboard.writeText(url);

        // Show success feedback
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg class="w-5 h-5 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `;

        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
</script>
```

### Phase 3: Page Routes

#### Task 3.1: Create Dynamic Post Route
**File**: `src/pages/posts/[slug].astro`
**Time**: 30 minutes

```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';
import { computeReadingTime, extractHeadings } from '../../content/config';

export async function getStaticPaths() {
  const posts = await getCollection('posts');

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;

// Compute additional metadata
const { Content, headings: rawHeadings } = await post.render();
const content = await post.body;

// Add computed fields
post.data.readingTime = await computeReadingTime(content);
post.data.wordCount = content.split(/\s+/g).length;
post.data.headings = extractHeadings(content);

// Check if we should redirect to a primary section
const primaryType = post.data.types[0];
const sectionRoutes = ['blog', 'roadmap', 'projects', 'literature'];

// If the post has a single type that matches a section route, redirect
if (post.data.types.length === 1 && sectionRoutes.includes(primaryType)) {
  return Astro.redirect(`/${primaryType}/${post.slug}`, 301);
}
---

<PostLayout post={post} />
```

#### Task 3.2: Update Section Index Pages
**File**: `src/pages/blog/index.astro`
**Time**: 45 minutes

```astro
---
import Layout from '../../layouts/Layout.astro';
import UpdateCard from '../../components/ui/UpdateCard.astro';
import { getPostsByType } from '../../utils/content';

// Get all blog posts
const posts = await getPostsByType('blog');
const sortedPosts = posts.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);

// Group by year
const postsByYear = sortedPosts.reduce((acc, post) => {
  const year = post.data.date.getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(post);
  return acc;
}, {} as Record<number, typeof posts>);

const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
---

<Layout
  title="Blog — Luis Miguel Montoya"
  description="Thoughts on AI interpretability, alignment, and the journey from physics to machine learning."
>
  <div class="min-h-screen pt-20">
    <div class="container mx-auto px-6 lg:px-16 xl:px-24">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-sans font-bold text-primary mb-4">
          Blog
        </h1>
        <p class="text-xl text-secondary leading-relaxed max-w-3xl">
          Reflections on AI interpretability research, technical deep-dives, and
          thoughts on the path to understanding artificial minds.
        </p>
      </header>

      <!-- Posts by year -->
      <div class="max-w-4xl">
        {years.map((year) => (
          <section class="mb-12">
            <h2 class="text-2xl font-sans font-semibold text-primary mb-6
                       sticky top-20 bg-surface-primary/90 backdrop-blur-sm py-2 -mx-2 px-2">
              {year}
            </h2>

            <div class="space-y-4">
              {postsByYear[Number(year)].map((post) => (
                <UpdateCard
                  title={post.data.title}
                  date={post.data.date.toISOString().split('T')[0]}
                  tag={post.data.category}
                  description={post.data.excerpt}
                  href={`/posts/${post.slug}`}
                  icon="blog"
                  variant="project"
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div class="text-center py-12">
          <p class="text-secondary text-lg">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  </div>
</Layout>
```

### Phase 4: Search & Filtering

#### Task 4.1: Create Search Component
**File**: `src/components/ui/SearchInput.astro`
**Time**: 45 minutes

```astro
---
interface Props {
  placeholder?: string;
  class?: string;
}

const { placeholder = "Search...", class: className = "" } = Astro.props;
---

<div class={`relative ${className}`}>
  <input
    type="search"
    id="post-search"
    placeholder={placeholder}
    class="w-full px-4 py-2 pl-10 text-sm bg-surface-secondary border border-subtle rounded-lg
           placeholder:text-tertiary text-primary
           focus:outline-none focus:border-interactive-blue focus:ring-1 focus:ring-interactive-blue/20
           transition-spring"
  />

  <svg
    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>

  <!-- Clear button -->
  <button
    id="clear-search"
    class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md
           text-tertiary hover:text-primary transition-theme
           opacity-0 pointer-events-none"
    aria-label="Clear search"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

<script>
  import Fuse from 'fuse.js';

  // Initialize search functionality
  document.addEventListener('astro:page-load', async () => {
    const searchInput = document.getElementById('post-search') as HTMLInputElement;
    const clearButton = document.getElementById('clear-search');

    if (!searchInput) return;

    // Fetch all posts for searching
    const response = await fetch('/api/posts.json');
    const posts = await response.json();

    // Configure Fuse.js
    const fuse = new Fuse(posts, {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'excerpt', weight: 0.2 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.15 },
        { name: 'content', weight: 0.15 },
      ],
      threshold: 0.3,
      includeScore: true,
    });

    // Handle search input
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;

      // Show/hide clear button
      if (clearButton) {
        clearButton.classList.toggle('opacity-0', !query);
        clearButton.classList.toggle('pointer-events-none', !query);
        clearButton.classList.toggle('opacity-100', !!query);
        clearButton.classList.toggle('pointer-events-auto', !!query);
      }

      // Perform search
      if (query) {
        const results = fuse.search(query);
        window.dispatchEvent(new CustomEvent('search-results', {
          detail: { results: results.map(r => r.item) }
        }));
      } else {
        window.dispatchEvent(new CustomEvent('search-results', {
          detail: { results: posts }
        }));
      }
    });

    // Handle clear button
    clearButton?.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.focus();
    });
  });
</script>
```

### Phase 5: Content Templates

#### Task 5.1: Create MDX Templates
**File**: `src/content/posts/_templates/blog-post.mdx`
**Time**: 15 minutes

```mdx
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
date: 2024-03-20
excerpt: "A compelling summary of your blog post that captures the main idea in under 280 characters."
types: ["blog"]
category: "Technical"
tags: ["AI", "Interpretability", "Research"]
status: "published"
display:
  showToc: true
  showRelated: true
  layout: "default"
---

## Introduction

Start with a compelling introduction that sets the context for your post.

## Main Content

### Subsection with Code

```python
def example_function():
    """Example code block with syntax highlighting."""
    return "Hello, World!"
```

### Subsection with Media

```jsx
import InteractiveDemo from '../../components/demos/YourDemo.astro';

<InteractiveDemo />
```

## Conclusion

Wrap up with key takeaways and next steps.

## References

- [Reference Title](https://example.com)
- [Another reference](https://example.com)
```

#### Task 5.2: Create Roadmap Milestone Template
**File**: `src/content/posts/_templates/roadmap-milestone.mdx`
**Time**: 15 minutes

```mdx
---
title: "Milestone: Understanding Transformer Architectures"
slug: "milestone-transformer-architectures"
date: 2024-03-15
excerpt: "Deep dive into transformer architecture internals and attention mechanisms."
types: ["roadmap", "blog"]
category: "Research"
tags: ["Transformers", "Deep Learning", "Milestone"]
status: "in-progress"
roadmap:
  phase: 1
  dependencies: ["milestone-linear-algebra", "milestone-neural-networks"]
  outcomes:
    - "Understand multi-head attention mechanism"
    - "Implement transformer from scratch"
    - "Analyze attention patterns in real models"
  timeline: "2 months"
project:
  area: "Interpretability"
  stack: ["Python", "PyTorch", "Jupyter"]
  links:
    github: "https://github.com/yourusername/transformer-exploration"
display:
  showToc: true
  accent: "gold"
---

## Overview

Brief description of what this milestone covers and why it's important.

## Background

### Prerequisites
- Linear algebra fundamentals
- Basic neural network understanding
- Python programming experience

## Progress Log

### Week 1-2: Foundation
- ✅ Reviewed "Attention is All You Need" paper
- ✅ Implemented basic attention mechanism
- 🔄 Working through positional encoding

### Week 3-4: Implementation
- [ ] Build transformer encoder from scratch
- [ ] Test on simple sequence tasks
- [ ] Visualize attention patterns

## Key Learnings

### Attention Mechanism
The attention mechanism allows the model to focus on different parts of the input...

```python
def scaled_dot_product_attention(Q, K, V):
    """Implementation of scaled dot-product attention."""
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V), weights
```

## Resources

- [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Attention is All You Need - Original Paper](https://arxiv.org/abs/1706.03762)

## Next Steps

- Move to multi-head attention implementation
- Study layer normalization placement
- Begin work on decoder architecture
```

### Phase 6: Supporting Components

#### Task 6.1: Create Breadcrumbs Component
**File**: `src/components/ui/Breadcrumbs.astro`
**Time**: 30 minutes

```astro
---
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="text-sm font-mono">
  <ol class="flex items-center space-x-2">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <li class="flex items-center">
          {!isLast ? (
            <>
              <a
                href={item.href}
                class="text-secondary hover:text-primary transition-theme"
              >
                {item.label}
              </a>
              <svg
                class="w-4 h-4 mx-2 text-tertiary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          ) : (
            <span class="text-primary font-medium">{item.label}</span>
          )}
        </li>
      );
    })}
  </ol>
</nav>
```

#### Task 6.2: Create API Endpoint for Search
**File**: `src/pages/api/posts.json.ts`
**Time**: 30 minutes

```typescript
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) =>
    data.status === 'published'
  );

  // Return simplified post data for search
  const searchData = posts.map(post => ({
    slug: post.slug,
    title: post.data.title,
    excerpt: post.data.excerpt,
    category: post.data.category,
    tags: post.data.tags,
    types: post.data.types,
    date: post.data.date.toISOString(),
    // Include first 500 chars of content for search
    content: post.body.substring(0, 500),
  }));

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};
```

### Phase 7: Documentation

#### Task 7.1: Create Author Guide
**File**: `docs/content-authoring-guide.md`
**Time**: 30 minutes

```markdown
# Content Authoring Guide

## Quick Start

1. Create a new MDX file in `src/content/posts/`
2. Copy a template from `src/content/posts/_templates/`
3. Fill in the frontmatter
4. Write your content
5. Run `npm run dev` to preview

## Frontmatter Reference

### Required Fields

- `title`: Post title (used in headers and cards)
- `slug`: URL-friendly identifier
- `date`: Publication date (YYYY-MM-DD)
- `excerpt`: Summary under 280 characters
- `types`: Array of content types (blog, roadmap, project, literature)
- `category`: Main category (Research, Technical, etc.)
- `status`: Publication status (draft, published, archived)

### Optional Fields

See schema in `src/content/config.ts` for all available fields.

## Content Guidelines

### Writing Style
- Use clear, concise language
- Break up long sections with subheadings
- Include code examples where relevant
- Add images to illustrate complex concepts

### Media
- Images: Use Astro's Image component for optimization
- Videos: Embed YouTube/Vimeo or host locally
- Interactive demos: Create as separate components

### MDX Components

Available components:
- `<Callout type="info|warning|tip">`: Highlighted information boxes
- `<CodePlayground>`: Interactive code examples
- `<Gallery>`: Image galleries
- `<Timeline>`: Progress timelines

## SEO Best Practices

1. Use descriptive titles (50-60 characters)
2. Write compelling excerpts (meta descriptions)
3. Include relevant tags and categories
4. Add alt text to all images
5. Use semantic heading structure

## Publishing Workflow

1. **Draft**: Set `status: "draft"` while writing
2. **Review**: Preview at `/posts/[slug]`
3. **Publish**: Change to `status: "published"`
4. **Update**: Modify `lastModified` date for updates
```

---

## 3. Success Metrics

- **Build Performance**: < 10s for 100 posts
- **Search Speed**: < 100ms for full-text search
- **Content Creation**: < 5 minutes from file creation to published
- **Navigation**: < 2 clicks to any content
- **Mobile Experience**: Full functionality on all devices

## 4. Future Enhancements

- **Version Control**: Track content changes
- **Collaborative Editing**: Multiple author support
- **AI Features**: Auto-tagging, related content suggestions
- **Analytics**: Reading patterns, popular content
- **RSS/Newsletter**: Automated distribution

---

**Last Updated**: 2024-03-20
**Owner**: Luis Miguel Montoya