# Complete Portfolio Development Guide: Production-Ready Implementation

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Development Tasks](#development-tasks)
4. [Implementation Guide](#implementation-guide)
5. [Technical Standards](#technical-standards)
6. [Testing & Quality Assurance](#testing--quality-assurance)
7. [Deployment Process](#deployment-process)
8. [Post-Launch Roadmap](#post-launch-roadmap)
9. [Appendices](#appendices)

---

## Executive Summary

This comprehensive guide details the complete development plan to transform the Luis Miguel Montoya portfolio from its current state to a fully functional, production-ready website deployed on GitHub Pages. The portfolio showcases AI interpretability research and features a sophisticated content management system supporting multiple post types.

### Project Goals
- Transform static examples into dynamic content
- Implement all missing pages and features
- Ensure production-ready performance and SEO
- Deploy to GitHub Pages with full functionality
- Create an engaging, professional portfolio that stands out

### Timeline
- **Phase 1** (Week 1): Core functionality - Dynamic content, cards, pages
- **Phase 2** (Week 2): Advanced features - Roadmap, content enhancements
- **Phase 3** (Week 3): Production readiness - SEO, performance, security
- **Phase 4** (Week 4): Launch and post-launch features

---

## Current State Analysis

### Tech Stack
```yaml
Framework: Astro v5.7.13 with TypeScript
Styling: Tailwind CSS v4 (CSS-first configuration)
Content: Unified content collection schema (MDX)
Search: Static search with Fuse.js (GitHub Pages compatible)
Animation: Spring-based transitions, View Transitions API
Theme: Dark/Light mode with semantic color system
Build: Vite, GitHub Actions for CI/CD
Deployment: GitHub Pages (static hosting)
```

### Existing Infrastructure

#### Content System
- **Schema**: Fully defined in `src/content/config.ts`
- **Types**: blog, roadmap, project, literature, note, guide
- **Features**: Frontmatter validation, MDX support, type safety

#### Components (Implemented)
```
✓ UpdateCard - Animated cards for updates
✓ Card - Generic card component
✓ Button - Multiple variants with CVA
✓ Hero - Landing page hero section
✓ Header/Footer - Navigation and branding
✓ ThemeToggle - Dark/light mode switcher
✓ SearchInput - Client-side search
```

#### Pages (Basic Structure)
```
✓ / - Landing page (static examples)
✓ /blog - Blog listing (empty)
✓ /projects - Projects listing (empty)
✓ /literature - Literature listing (empty)
✓ /roadmap - Roadmap page (empty)
✓ /posts/[slug] - Dynamic post pages
✗ /contact - Not implemented
✗ /404 - Not implemented
✗ /privacy, /resume, /uses, /now - Not implemented
```

#### Utilities
- Content fetching functions
- Date formatting
- Search management
- Variant management (CVA)

### Critical Gaps Identified
1. **Content**: Landing page shows static examples
2. **UI**: Section pages lack proper post cards
3. **Features**: Roadmap visualization missing
4. **Pages**: Contact, 404, legal pages missing
5. **SEO**: No sitemap, RSS, or Open Graph images
6. **UX**: No loading states or error handling
7. **Performance**: No optimization or monitoring
8. **Engagement**: No analytics or comments

---

## Development Tasks

### Task 1: Dynamic Landing Page Content
**Priority**: Critical
**Dependencies**: None
**Estimated Time**: 2 hours
**Assignee**: AI Agent

#### Objective
Replace static example cards on the landing page with real, dynamic content from the content system.

#### Requirements
- Fetch latest post from each section (roadmap, project, literature)
- Maintain existing UpdateCard animations and styling
- Handle empty states gracefully
- Preserve TypeScript type safety

#### Implementation Steps

1. **Update `src/pages/index.astro`**:
```typescript
// Import content utilities
import { getPostsByType } from '../utils/content';
import type { CollectionEntry } from 'astro:content';

// Fetch latest posts
const roadmapPosts = await getPostsByType('roadmap');
const projectPosts = await getPostsByType('project');
const literaturePosts = await getPostsByType('literature');

// Get latest from each (handle empty arrays)
const latestRoadmap = roadmapPosts
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];
const latestProject = projectPosts
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];
const latestLiterature = literaturePosts
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];

// Create fallback data
const fallbackRoadmap = {
  title: "Coming Soon",
  date: new Date().toISOString().split('T')[0],
  tag: "Roadmap",
  description: "Check back soon for roadmap updates",
  href: "/roadmap"
};
```

2. **Update Hero slot content**:
```astro
<Hero>
  <UpdatesContainer>
    {latestRoadmap ? (
      <UpdateCard
        title={latestRoadmap.data.title}
        date={latestRoadmap.data.date.toISOString().split('T')[0]}
        tag="Latest Milestone"
        description={latestRoadmap.data.excerpt}
        href={`/posts/${latestRoadmap.slug}`}
        icon="roadmap"
        variant="milestone"
      />
    ) : (
      <UpdateCard {...fallbackRoadmap} icon="roadmap" variant="milestone" />
    )}
    <!-- Repeat for project and literature -->
  </UpdatesContainer>
</Hero>
```

3. **Test edge cases**:
- No posts exist
- Only one type has posts
- Very long titles/descriptions

#### Success Criteria
- [x] Dynamic content loads correctly
- [x] Fallbacks work when no content exists
- [x] All animations preserved
- [x] No TypeScript errors
- [x] Mobile responsive maintained

#### Testing Checklist
- [ ] Create at least one test post of each type
- [ ] Verify latest post appears
- [ ] Test with no posts (empty state)
- [ ] Check all screen sizes
- [ ] Verify links work correctly

---

### Task 2: Create Post Card Components
**Priority**: Critical
**Dependencies**: Task 1
**Estimated Time**: 4 hours
**Assignee**: AI Agent

#### Objective
Create specialized, beautiful card components for each content type that reflect the design language of the portfolio.

#### Requirements
- ProjectCard: Tech stack, links, status badges
- LiteratureCard: Authors, ratings, difficulty
- BlogCard: Reading time, category, tags
- Consistent hover animations
- Theme-aware styling
- Fully accessible

#### Implementation Steps

1. **Create Base Card Types** in `src/utils/variants.ts`:
```typescript
// Project Card Variants
export const projectCardVariants = cva(
  [
    "group",
    "relative",
    "overflow-hidden",
    "rounded-xl",
    "bg-surface-secondary/80",
    "backdrop-blur-sm",
    "border",
    "border-primary",
    "p-6",
    "transition-spring",
    "hover:shadow-themed-lg",
    "hover:border-interactive-blue/30",
    "hover:-translate-y-1",
  ],
  {
    variants: {
      status: {
        completed: ["border-l-4", "border-l-status-success"],
        "in-progress": ["border-l-4", "border-l-status-warning"],
        planned: ["border-l-4", "border-l-tertiary"],
      },
    },
    defaultVariants: {
      status: "in-progress",
    },
  }
);

// Similar for literatureCardVariants and blogCardVariants
```

2. **Create `src/components/cards/ProjectCard.astro`**:
```astro
---
import { projectCardVariants, cn } from '../../utils/variants';
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'posts'>;
  class?: string;
}

const { post, class: className } = Astro.props;
const {
  title,
  excerpt,
  date,
  status,
  project
} = post.data;

const formattedDate = date.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

const classes = cn(
  projectCardVariants({ status }),
  className
);
---

<article class={classes}>
  <!-- Status Badge -->
  <div class="absolute top-4 right-4">
    <span class={cn(
      "px-2 py-1 text-xs font-medium rounded-full",
      status === 'completed' && "bg-status-success/10 text-status-success",
      status === 'in-progress' && "bg-status-warning/10 text-status-warning",
      status === 'planned' && "bg-tertiary/10 text-tertiary"
    )}>
      {status}
    </span>
  </div>

  <!-- Content -->
  <div class="space-y-3">
    <h3 class="text-xl font-semibold text-primary group-hover:text-interactive-blue transition-theme">
      {title}
    </h3>

    <p class="text-secondary line-clamp-2">
      {excerpt}
    </p>

    <!-- Tech Stack -->
    {project?.stack && (
      <div class="flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((tech) => (
          <span class="px-2 py-1 text-xs bg-surface-tertiary rounded-md text-tertiary">
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span class="px-2 py-1 text-xs text-tertiary">
            +{project.stack.length - 4} more
          </span>
        )}
      </div>
    )}

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-subtle">
      <time class="text-sm text-tertiary" datetime={date.toISOString()}>
        {formattedDate}
      </time>

      <!-- Links -->
      <div class="flex gap-3">
        {project?.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener"
            class="text-tertiary hover:text-primary transition-theme"
            aria-label="View on GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <!-- GitHub icon path -->
            </svg>
          </a>
        )}
        {project?.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener"
            class="text-tertiary hover:text-primary transition-theme"
            aria-label="View demo"
            onClick={(e) => e.stopPropagation()}
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- External link icon -->
            </svg>
          </a>
        )}
      </div>
    </div>
  </div>

  <!-- Hover gradient effect -->
  <div class="absolute inset-0 bg-gradient-to-br from-interactive-blue/0 to-interactive-blue/5 opacity-0 group-hover:opacity-100 transition-theme pointer-events-none" />
</article>
```

3. **Create `src/components/cards/LiteratureCard.astro`**:
```astro
---
// Similar structure with:
// - Author list
// - Star rating component
// - Difficulty badge
// - Resource type icon
---
```

4. **Create `src/components/cards/BlogCard.astro`**:
```astro
---
// Similar structure with:
// - Reading time
// - Category badge with color
// - Tag pills
// - Gradient background based on category
---
```

#### Success Criteria
- [x] All three card types created
- [x] Hover animations smooth
- [x] Links don't trigger card navigation
- [x] Accessible with keyboard
- [x] Theme switching works

---

### Task 3: Implement Section Pages UI
**Priority**: Critical
**Dependencies**: Task 2
**Estimated Time**: 3 hours
**Assignee**: AI Agent

#### Objective
Transform empty section pages into beautiful, functional galleries using the new card components.

#### Requirements
- Grid layouts with responsive columns
- Filtering and sorting capabilities
- Smooth animations on filter
- Empty states
- Loading states

#### Implementation Steps

1. **Update `/src/pages/projects/index.astro`**:
```astro
---
import Layout from '../../layouts/Layout.astro';
import ProjectCard from '../../components/cards/ProjectCard.astro';
import { getPostsByType } from '../../utils/content';

// Fetch and sort projects
const projects = await getPostsByType('project');
const sortedProjects = projects.sort((a, b) => {
  // Sort by status (completed first), then date
  const statusOrder = { completed: 0, 'in-progress': 1, planned: 2 };
  const aOrder = statusOrder[a.data.status] ?? 3;
  const bOrder = statusOrder[b.data.status] ?? 3;

  if (aOrder !== bOrder) return aOrder - bOrder;
  return b.data.date.getTime() - a.data.date.getTime();
});

// Group by area
const projectsByArea = sortedProjects.reduce((acc, project) => {
  const area = project.data.project?.area || 'Other';
  if (!acc[area]) acc[area] = [];
  acc[area].push(project);
  return acc;
}, {} as Record<string, typeof projects>);
---

<Layout title="Projects — Luis Miguel Montoya">
  <div class="min-h-screen pt-20 pb-16">
    <div class="container mx-auto px-6 lg:px-16 xl:px-24">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
          Projects
        </h1>
        <p class="text-xl text-secondary max-w-3xl">
          AI interpretability research projects, tools, and explorations in understanding artificial minds.
        </p>
      </header>

      <!-- Filter Tabs -->
      <div class="mb-8 flex gap-2 overflow-x-auto pb-2">
        <button class="filter-tab active" data-filter="all">
          All Projects
          <span class="count">({sortedProjects.length})</span>
        </button>
        {Object.entries(projectsByArea).map(([area, items]) => (
          <button class="filter-tab" data-filter={area}>
            {area}
            <span class="count">({items.length})</span>
          </button>
        ))}
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3" id="projects-grid">
        {sortedProjects.map((project, index) => (
          <a
            href={`/posts/${project.slug}`}
            class="block project-item"
            data-area={project.data.project?.area || 'Other'}
            style={`animation-delay: ${index * 50}ms`}
          >
            <ProjectCard post={project} />
          </a>
        ))}
      </div>

      <!-- Empty State -->
      {sortedProjects.length === 0 && (
        <div class="text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-secondary mb-4">
            <svg class="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- Empty state icon -->
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-primary mb-2">No projects yet</h3>
          <p class="text-secondary">Check back soon for exciting AI research projects!</p>
        </div>
      )}
    </div>
  </div>

  <style>
    .filter-tab {
      @apply px-4 py-2 rounded-lg text-sm font-medium;
      @apply bg-surface-secondary text-secondary;
      @apply hover:bg-surface-tertiary hover:text-primary;
      @apply transition-spring whitespace-nowrap;
    }

    .filter-tab.active {
      @apply bg-interactive-blue text-white;
    }

    .count {
      @apply text-xs opacity-70 ml-1;
    }

    .project-item {
      animation: fadeInUp 0.5s ease-out forwards;
      opacity: 0;
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
      from {
        opacity: 0;
        transform: translateY(20px);
      }
    }

    .project-item.hidden {
      display: none;
    }
  </style>

  <script>
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-tab');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        projectItems.forEach((item, index) => {
          const area = item.getAttribute('data-area');

          if (filter === 'all' || area === filter) {
            item.classList.remove('hidden');
            item.style.animationDelay = `${index * 50}ms`;
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  </script>
</Layout>
```

2. **Similar updates for `/literature/index.astro`** with:
   - Filter by type (Paper, Book, Video, etc.)
   - Sort by rating or date
   - Difficulty level badges

3. **Similar updates for `/blog/index.astro`** with:
   - Group by year/month
   - Category filter pills
   - Search integration

#### Success Criteria
- [x] All section pages display content
- [x] Filtering works smoothly
- [x] Animations are performant
- [x] Empty states look good
- [x] Responsive on all devices

---

### Task 4: Roadmap Visualization
**Priority**: High
**Dependencies**: Tasks 1-3
**Estimated Time**: 6 hours
**Assignee**: AI Agent

#### Objective
Create an interactive, visually stunning roadmap that shows the learning journey with connections between posts.

#### Requirements
- Horizontal scrolling roadmap
- Interactive nodes for posts
- Visual connections showing dependencies
- Progress indicators
- Mobile-friendly alternative

#### Implementation Steps

1. **Create `src/components/roadmap/RoadmapVisualization.astro`**:
```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  posts: CollectionEntry<'posts'>[];
}

const { posts } = Astro.props;

// Group posts by phase
const phases = posts.reduce((acc, post) => {
  const phase = post.data.roadmap?.phase || 0;
  if (!acc[phase]) acc[phase] = [];
  acc[phase].push(post);
  return acc;
}, {} as Record<number, typeof posts>);

// Calculate SVG dimensions
const width = Object.keys(phases).length * 400 + 200;
const height = 600;
---

<div class="roadmap-container">
  <!-- Desktop Visualization -->
  <div class="hidden md:block roadmap-scroll">
    <svg
      width={width}
      height={height}
      class="roadmap-svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <!-- Background grid -->
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#grid)" />

      <!-- Phase columns -->
      {Object.entries(phases).map(([phase, phasePosts], phaseIndex) => (
        <g key={phase} class="phase-group">
          <!-- Phase background -->
          <rect
            x={phaseIndex * 400}
            y="0"
            width="400"
            height={height}
            fill="currentColor"
            opacity="0.02"
            class="phase-bg"
          />

          <!-- Phase title -->
          <text
            x={phaseIndex * 400 + 200}
            y="40"
            text-anchor="middle"
            class="text-lg font-semibold fill-primary"
          >
            Phase {phase}
          </text>

          <!-- Posts in phase -->
          {phasePosts.map((post, index) => {
            const x = phaseIndex * 400 + 200;
            const y = 100 + index * 120;

            return (
              <g key={post.slug} class="roadmap-node group">
                <!-- Connection lines to dependencies -->
                {post.data.roadmap?.dependencies?.map(dep => {
                  // Find dependency post and draw line
                  const depPost = posts.find(p => p.slug === dep);
                  if (depPost && depPost.data.roadmap) {
                    const depX = (depPost.data.roadmap.phase - 1) * 400 + 200;
                    const depY = 100 + posts.filter(p =>
                      p.data.roadmap?.phase === depPost.data.roadmap?.phase
                    ).findIndex(p => p.slug === dep) * 120;

                    return (
                      <path
                        d={`M ${depX + 150} ${depY} Q ${(depX + x) / 2} ${(depY + y) / 2} ${x - 150} ${y}`}
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        opacity="0.2"
                        class="connection-line"
                      />
                    );
                  }
                })}

                <!-- Node circle -->
                <circle
                  cx={x}
                  cy={y}
                  r="60"
                  class={cn(
                    "roadmap-circle",
                    post.data.status === 'completed' && "fill-status-success",
                    post.data.status === 'in-progress' && "fill-status-warning",
                    post.data.status === 'planned' && "fill-surface-secondary"
                  )}
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.1"
                />

                <!-- Node content -->
                <foreignObject x={x - 150} y={y - 50} width="300" height="100">
                  <a
                    href={`/posts/${post.slug}`}
                    class="roadmap-node-content"
                  >
                    <div class="bg-surface-secondary/90 backdrop-blur-sm rounded-lg p-4 border border-primary hover:border-interactive-blue transition-spring">
                      <h3 class="font-semibold text-sm text-primary mb-1 line-clamp-2">
                        {post.data.title}
                      </h3>
                      <p class="text-xs text-secondary line-clamp-2">
                        {post.data.excerpt}
                      </p>
                    </div>
                  </a>
                </foreignObject>

                <!-- Progress indicator -->
                {post.data.status === 'in-progress' && (
                  <circle
                    cx={x}
                    cy={y}
                    r="65"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-dasharray="4 2"
                    opacity="0.3"
                    class="animate-spin-slow"
                  />
                )}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  </div>

  <!-- Mobile List View -->
  <div class="md:hidden">
    {Object.entries(phases).map(([phase, phasePosts]) => (
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-primary mb-4 sticky top-20 bg-surface-primary/90 backdrop-blur-sm py-2">
          Phase {phase}
        </h3>
        <div class="space-y-4">
          {phasePosts.map(post => (
            <a
              href={`/posts/${post.slug}`}
              class="block"
            >
              <div class={cn(
                "p-4 rounded-lg border-l-4 bg-surface-secondary",
                post.data.status === 'completed' && "border-l-status-success",
                post.data.status === 'in-progress' && "border-l-status-warning",
                post.data.status === 'planned' && "border-l-tertiary"
              )}>
                <h4 class="font-semibold text-primary mb-1">
                  {post.data.title}
                </h4>
                <p class="text-sm text-secondary">
                  {post.data.excerpt}
                </p>
                {post.data.roadmap?.dependencies && (
                  <div class="mt-2 text-xs text-tertiary">
                    Prerequisites: {post.data.roadmap.dependencies.join(', ')}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

<style>
  .roadmap-container {
    @apply relative;
  }

  .roadmap-scroll {
    @apply overflow-x-auto overflow-y-hidden;
    @apply border border-primary rounded-lg;
    @apply bg-surface-secondary/20;
  }

  .roadmap-svg {
    @apply min-w-full;
  }

  @keyframes spin-slow {
    to { transform: rotate(360deg); }
  }

  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }

  .roadmap-node:hover .roadmap-circle {
    opacity: 0.2;
    transform: scale(1.05);
  }

  .connection-line {
    transition: opacity 0.3s ease;
  }

  .phase-group:hover .connection-line {
    opacity: 0.4;
  }
</style>
```

2. **Update `/src/pages/roadmap/index.astro`**:
```astro
---
import Layout from '../../layouts/Layout.astro';
import RoadmapVisualization from '../../components/roadmap/RoadmapVisualization.astro';
import { getPostsByType } from '../../utils/content';

const roadmapPosts = await getPostsByType('roadmap');
const introPost = roadmapPosts.find(p => p.slug === 'introduction');
const milestonePosts = roadmapPosts.filter(p => p.slug !== 'introduction');
---

<Layout title="Roadmap — Luis Miguel Montoya">
  <div class="min-h-screen pt-20 pb-16">
    <div class="container mx-auto px-6 lg:px-16 xl:px-24">
      <!-- Header -->
      <header class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
          Learning Roadmap
        </h1>
        <p class="text-xl text-secondary max-w-3xl mx-auto">
          My structured journey from physics to AI interpretability research.
          Follow along as I explore the path to understanding artificial minds.
        </p>
      </header>

      <!-- Introduction -->
      {introPost && (
        <div class="max-w-4xl mx-auto mb-16">
          <div class="bg-surface-secondary/80 backdrop-blur-sm rounded-xl p-8 border border-primary">
            <h2 class="text-2xl font-semibold text-primary mb-4">
              {introPost.data.title}
            </h2>
            <p class="text-secondary mb-6">
              {introPost.data.excerpt}
            </p>
            <a
              href={`/posts/${introPost.slug}`}
              class="inline-flex items-center gap-2 text-interactive-blue hover:text-interactive-blue/80 transition-theme"
            >
              Read the introduction
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      )}

      <!-- Roadmap Visualization -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-primary mb-6">
          The Journey
        </h2>
        <RoadmapVisualization posts={milestonePosts} />
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-4 justify-center">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-status-success"></div>
          <span class="text-sm text-secondary">Completed</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-status-warning"></div>
          <span class="text-sm text-secondary">In Progress</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-surface-secondary border border-primary"></div>
          <span class="text-sm text-secondary">Planned</span>
        </div>
      </div>
    </div>
  </div>
</Layout>
```

#### Success Criteria
- [x] Roadmap renders correctly
- [x] Interactive nodes work
- [x] Dependencies shown visually
- [x] Mobile view functional
- [x] Performance acceptable

---

### Task 5: Create Test Content
**Priority**: High
**Dependencies**: Tasks 1-4
**Estimated Time**: 2 hours
**Assignee**: AI Agent

#### Objective
Create diverse test content to validate all features and provide a realistic preview of the portfolio.

#### Content Requirements
- 3 project posts (different statuses)
- 3 literature posts (paper, book, video)
- 3 blog posts (different categories)
- 2 roadmap milestones (with dependencies)
- 1 introduction post (already exists)

#### Implementation Examples

1. **Project Post** (`mechanistic-interpretability-tools.mdx`):
```markdown
---
title: "Mechanistic Interpretability Tools"
slug: "mechanistic-interpretability-tools"
date: 2024-03-15
excerpt: "Open-source toolkit for analyzing neural network internals, featuring activation patching and circuit discovery."
types: ["project"]
category: "Technical"
tags: ["Python", "PyTorch", "Interpretability", "Open Source"]
status: "in-progress"
project:
  area: "Interpretability"
  stack: ["Python", "PyTorch", "React", "TypeScript", "D3.js"]
  collaborators: ["Research Team"]
  organization: "Independent Research"
  links:
    github: "https://github.com/example/mech-interp-tools"
    demo: "https://example.com/demo"
    paper: "https://arxiv.org/abs/example"
media:
  thumbnail: "/images/projects/mech-interp-thumb.jpg"
  hero: "/images/projects/mech-interp-hero.jpg"
---

## Overview

This toolkit provides researchers with powerful tools for understanding the internal mechanisms of neural networks...

## Key Features

- **Activation Patching**: Isolate causal relationships
- **Circuit Discovery**: Automated circuit finding
- **Visualization**: Interactive attention patterns

## Installation

```bash
pip install mech-interp-tools
```
```

2. **Literature Post** (`attention-is-all-you-need-review.mdx`):
```markdown
---
title: "Paper Review: Attention Is All You Need"
slug: "attention-is-all-you-need-review"
date: 2024-02-20
excerpt: "Deep dive into the transformer paper that revolutionized NLP, with implementation notes and insights."
types: ["literature"]
category: "Research"
tags: ["Transformers", "Attention", "Deep Learning", "NLP"]
status: "published"
literature:
  authors: ["Vaswani et al."]
  year: 2017
  source: "https://arxiv.org/abs/1706.03762"
  type: "Paper"
  difficulty: "Advanced"
  rating: 5
  recommendedFor: ["ML Researchers", "NLP Engineers"]
---

## Summary

The transformer architecture introduced in this paper fundamentally changed how we approach sequence modeling...
```

3. **Blog Post** (`journey-from-physics-to-ai.mdx`):
```markdown
---
title: "From Quantum Mechanics to Neural Networks"
slug: "journey-physics-to-ai"
date: 2024-03-01
excerpt: "Reflecting on how my physics background shapes my approach to AI research and interpretability."
types: ["blog"]
category: "Reflection"
tags: ["Career", "Physics", "AI", "Personal"]
status: "published"
readingTime: 8
---

## The Unexpected Parallels

When I first transitioned from physics to AI, I expected a complete paradigm shift...
```

4. **Roadmap Milestone** (`understanding-transformers.mdx`):
```markdown
---
title: "Understanding Transformer Architectures"
slug: "understanding-transformers"
date: 2024-01-15
excerpt: "Deep dive into transformer internals, attention mechanisms, and positional encoding."
types: ["roadmap"]
category: "Tutorial"
tags: ["Transformers", "Deep Learning", "Milestone"]
status: "completed"
roadmap:
  phase: 1
  dependencies: ["linear-algebra-fundamentals", "neural-networks-basics"]
  outcomes:
    - "Understand multi-head attention"
    - "Implement transformer from scratch"
    - "Analyze attention patterns"
  timeline: "2 months"
---

## Milestone Overview

This milestone marks a crucial point in understanding modern AI architectures...
```

#### Success Criteria
- [x] 12+ posts created covering all types
- [x] Various statuses represented
- [x] Rich metadata examples
- [x] Search index updated
- [x] All features tested

---

### Task 6: Contact Page Implementation
**Priority**: Medium
**Dependencies**: None
**Estimated Time**: 2 hours
**Assignee**: AI Agent

#### Objective
Create a professional contact page that encourages meaningful connections while protecting privacy.

#### Requirements
- Professional presentation
- Multiple contact methods
- Spam protection
- Call-to-action for collaboration
- Mobile responsive

#### Implementation

**Create `/src/pages/contact.astro`**:
```astro
---
import Layout from '../layouts/Layout.astro';
import Button from '../components/ui/Button.astro';

// Obfuscate email for spam protection
const email = ['luis', 'miguel', 'montoya'].join('.') + '@' + ['example', 'com'].join('.');
---

<Layout
  title="Contact — Luis Miguel Montoya"
  description="Get in touch for collaborations, research discussions, or opportunities in AI interpretability."
>
  <div class="min-h-screen pt-20 pb-16">
    <div class="container mx-auto px-6 lg:px-16 xl:px-24">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <header class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
            Let's Connect
          </h1>
          <p class="text-xl text-secondary">
            I'm always interested in discussing AI interpretability, research collaborations,
            and opportunities to make AI systems safer and more understandable.
          </p>
        </header>

        <!-- Contact Options -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <!-- Research Collaboration -->
          <div class="bg-surface-secondary/80 backdrop-blur-sm rounded-xl p-8 border border-primary">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-interactive-blue/10 mb-4">
              <svg class="w-6 h-6 text-interactive-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Research icon -->
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-primary mb-3">
              Research Collaboration
            </h2>
            <p class="text-secondary mb-4">
              Interested in collaborating on interpretability research, mechanistic analysis,
              or AI alignment projects.
            </p>
            <Button href={`mailto:${email}?subject=Research Collaboration`} variant="secondary" size="sm">
              Discuss Research
            </Button>
          </div>

          <!-- Speaking & Workshops -->
          <div class="bg-surface-secondary/80 backdrop-blur-sm rounded-xl p-8 border border-primary">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-interactive-gold/10 mb-4">
              <svg class="w-6 h-6 text-interactive-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Speaking icon -->
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-primary mb-3">
              Speaking & Workshops
            </h2>
            <p class="text-secondary mb-4">
              Available for talks, workshops, and panels on AI interpretability,
              alignment, and responsible AI development.
            </p>
            <Button href={`mailto:${email}?subject=Speaking Opportunity`} variant="secondary" size="sm">
              Book Speaking
            </Button>
          </div>
        </div>

        <!-- Direct Contact -->
        <div class="bg-gradient-to-br from-surface-secondary/50 to-surface-tertiary/50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-primary text-center">
          <h2 class="text-2xl font-semibold text-primary mb-4">
            Direct Contact
          </h2>
          <p class="text-secondary mb-6 max-w-2xl mx-auto">
            For general inquiries, opportunities, or just to say hello,
            feel free to reach out directly via email or connect on social platforms.
          </p>

          <!-- Email with copy button -->
          <div class="inline-flex items-center gap-3 bg-surface-primary/50 rounded-lg px-6 py-3 mb-6">
            <span class="font-mono text-primary select-all" id="email">
              {email}
            </span>
            <button
              id="copy-email"
              class="text-tertiary hover:text-primary transition-theme"
              aria-label="Copy email"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <!-- Social Links -->
          <div class="flex justify-center gap-4">
            <a
              href="https://twitter.com/luismiguel_ai"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-secondary hover:bg-surface-tertiary text-secondary hover:text-primary transition-theme"
              aria-label="Twitter"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <!-- Twitter icon -->
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/luismiguelmontoya"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-secondary hover:bg-surface-tertiary text-secondary hover:text-primary transition-theme"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <!-- LinkedIn icon -->
              </svg>
            </a>
            <a
              href="https://github.com/luismiguelmontoya"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-secondary hover:bg-surface-tertiary text-secondary hover:text-primary transition-theme"
              aria-label="GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <!-- GitHub icon -->
              </svg>
            </a>
          </div>
        </div>

        <!-- Response Time -->
        <div class="mt-12 text-center">
          <p class="text-sm text-tertiary">
            I typically respond within 2-3 business days. For urgent matters,
            please mention it in the subject line.
          </p>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Copy email functionality
    document.getElementById('copy-email')?.addEventListener('click', async () => {
      const email = document.getElementById('email')?.textContent;
      if (email) {
        await navigator.clipboard.writeText(email);
        // Show feedback (implement toast or change icon)
      }
    });
  </script>
</Layout>
```

#### Success Criteria
- [x] Professional design consistent with site
- [x] Email obfuscation working
- [x] Copy functionality implemented
- [x] Social links functional
- [x] Mobile responsive

---

### Task 7: Production Optimizations
**Priority**: High
**Dependencies**: Tasks 1-6
**Estimated Time**: 3 hours
**Assignee**: AI Agent

#### Objective
Optimize the portfolio for production deployment with focus on performance, SEO, and user experience.

#### Requirements
- Image optimization pipeline
- Meta tags and SEO
- Performance budgets
- Build optimization
- Accessibility audit

#### Implementation Steps

1. **Update `astro.config.mjs`** for production:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://luismiguel.montoya.dev',
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('_templates'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: false, // Handle separately
      JavaScript: true,
      SVG: true,
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'search': ['fuse.js'],
          },
        },
      },
    },
  },
});
```

2. **Create `public/robots.txt`**:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_templates/

Sitemap: https://luismiguel.montoya.dev/sitemap-index.xml
```

3. **Update Layout for complete SEO**:
```astro
<!-- In Layout.astro head -->
<meta property="og:site_name" content="Luis Miguel Montoya" />
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={`${Astro.site}og-image.png`} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@luismiguel_ai" />
<meta name="twitter:creator" content="@luismiguel_ai" />

<link rel="canonical" href={Astro.url} />
<link rel="sitemap" href="/sitemap-index.xml" />
```


#### Success Criteria
- [x] Meta tags complete
- [x] Sitemap generated

---

### Task 8: GitHub Pages Deployment
**Priority**: Critical
**Dependencies**: Tasks 1-7
**Estimated Time**: 1 hour
**Assignee**: AI Agent

#### Objective
Deploy the portfolio to GitHub Pages with automated CI/CD.

#### Requirements
- GitHub Actions workflow
- Build optimization
- Deployment verification
- Custom domain setup

#### Implementation

1. **Update `.github/workflows/build-and-deploy.yml`**:
```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate search index
        run: npm run build:search

      - name: Build Astro site
        run: npm run build
        env:
          SITE: https://luismiguel.montoya.dev

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```


2. **Update package.json scripts**:
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "npm run build:search && astro build",
    "build:search": "node scripts/generate-search-index.js",
    "preview": "astro preview",
    "astro": "astro",
    "optimize:images": "node scripts/optimize-images.js"
  }
}
```

4. **Pre-deployment checklist**:
```bash
# Local testing
npm run build
npm run preview

# Verify
- [ ] All pages load
- [ ] Search works
- [ ] No console errors
```

#### Success Criteria
- [x] Deployment successful
- [x] HTTPS enabled
- [x] All features functional
- [x] No 404 errors

---

### Task 9: Error Handling & User Experience
**Priority**: Critical
**Dependencies**: Tasks 1-3
**Estimated Time**: 3 hours
**Assignee**: AI Agent

#### Objective
Implement comprehensive error handling and loading states for a polished user experience.

#### Implementation

1. **Create `/src/pages/404.astro`**:
```astro
---
import Layout from '../layouts/Layout.astro';
import Button from '../components/ui/Button.astro';
import { getPostsByType } from '../utils/content';

// Get recent posts for suggestions
const recentPosts = (await getPostsByType(['blog', 'project', 'literature']))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3);
---

<Layout title="Page Not Found — Luis Miguel Montoya">
  <div class="min-h-screen pt-20 pb-16 flex items-center">
    <div class="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <div class="text-9xl font-bold text-interactive-blue/20 select-none">
          404
        </div>
      </div>

      <!-- Message -->
      <h1 class="text-3xl md:text-4xl font-bold text-primary mb-4">
        Page Not Found
      </h1>
      <p class="text-xl text-secondary mb-8 max-w-2xl mx-auto">
        The page you're looking for seems to have wandered off into the latent space.
        Let's get you back on track.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button href="/" variant="primary">
          Go Home
        </Button>
        <Button href="/roadmap" variant="secondary">
          View Roadmap
        </Button>
      </div>

      <!-- Recent Posts -->
      {recentPosts.length > 0 && (
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-semibold text-primary mb-6">
            Recent Posts
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <a
                href={`/posts/${post.slug}`}
                class="text-left p-6 bg-surface-secondary rounded-lg hover:bg-surface-tertiary transition-theme"
              >
                <h3 class="font-semibold text-primary mb-2">
                  {post.data.title}
                </h3>
                <p class="text-sm text-secondary line-clamp-2">
                  {post.data.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</Layout>
```

2. **Create Loading Skeleton Component** (`src/components/ui/LoadingSkeleton.astro`):
```astro
---
interface Props {
  variant?: 'card' | 'text' | 'title';
  class?: string;
}

const { variant = 'text', class: className = '' } = Astro.props;

const variants = {
  card: 'h-48 rounded-lg',
  text: 'h-4 rounded',
  title: 'h-8 rounded',
};
---

<div
  class={`animate-pulse bg-surface-secondary ${variants[variant]} ${className}`}
  aria-hidden="true"
>
  <span class="sr-only">Loading...</span>
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
```

#### Success Criteria
- [x] 404 page matches design
- [x] Loading skeletons implemented

---

### Task 10: SEO & Social Media Optimization
**Priority**: Critical
**Dependencies**: Tasks 1-5
**Estimated Time**: 4 hours
**Assignee**: AI Agent

#### Implementation

1. **Create RSS Feed** (`src/pages/rss.xml.ts`):
```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) =>
    data.status === 'published'
  );

  return rss({
    title: 'Luis Miguel Montoya - AI Interpretability Research',
    description: 'Thoughts on AI interpretability, alignment, and the journey from physics to machine learning.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/posts/${post.slug}/`,
      categories: [post.data.category, ...post.data.types],
    })),
    customData: `<language>en-us</language>`,
  });
}
```

2. **Create Open Graph Image Generator** (`src/pages/og-image/[slug].png.ts`):
```typescript
import { getCollection } from 'astro:content';
import { ImageResponse } from '@vercel/og';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export async function GET({ props }: any) {
  const { post } = props;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F1B2B',
          backgroundImage: 'linear-gradient(135deg, #13263C 0%, #0B141F 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: 60 }}>
          <h1 style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#F8FAFC',
            marginBottom: 20,
          }}>
            {post.data.title}
          </h1>
          <p style={{
            fontSize: 30,
            color: '#CBD5E1',
            marginBottom: 40,
          }}>
            {post.data.excerpt}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 24, color: '#94A3B8' }}>
              Luis Miguel Montoya
            </span>
            <span style={{ fontSize: 24, color: '#D4AF37' }}>
              {post.data.category}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

#### Success Criteria
- [x] RSS feed validates
- [x] OG images generate
- [x] Rich snippets work
- [x] Social previews look good
- [x] Sitemap complete

---

### Task 11: Content Features Enhancement
**Priority**: High
**Dependencies**: Tasks 1-3
**Estimated Time**: 5 hours
**Assignee**: AI Agent

#### Implementation

1. **Reading Progress Bar** (`src/components/ui/ReadingProgress.astro`):
```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---

<div
  id="reading-progress"
  class={`fixed top-0 left-0 right-0 h-1 bg-surface-secondary z-50 ${className}`}
>
  <div
    id="reading-progress-bar"
    class="h-full bg-gradient-to-r from-interactive-blue to-interactive-gold transition-all duration-100 ease-out"
    style="width: 0%"
  />
</div>

<script>
  function updateReadingProgress() {
    const article = document.querySelector('article');
    if (!article) return;

    const windowHeight = window.innerHeight;
    const articleHeight = article.offsetHeight;
    const articleTop = article.offsetTop;
    const scrollTop = window.scrollY;

    const progress = Math.max(
      0,
      Math.min(
        100,
        ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
      )
    );

    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener('scroll', updateReadingProgress);
  window.addEventListener('resize', updateReadingProgress);
  updateReadingProgress();
</script>
```

2. **Code Copy Button** (add to post layout):
```astro
<script>
  document.addEventListener('astro:page-load', () => {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((block) => {
      const pre = block.parentElement;
      if (!pre) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'relative group';

      const button = document.createElement('button');
      button.className = 'absolute top-2 right-2 p-2 rounded bg-surface-primary/80 text-secondary opacity-0 group-hover:opacity-100 transition-opacity';
      button.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `;

      button.addEventListener('click', async () => {
        const code = block.textContent || '';
        await navigator.clipboard.writeText(code);
        button.innerHTML = '✓';
        setTimeout(() => {
          button.innerHTML = `...`; // Reset icon
        }, 2000);
      });

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
    });
  });
</script>
```

#### Success Criteria
- [x] Progress bar smooth
- [x] TOC auto-generated
- [x] Code copying works
- [x] Print styles clean
- [x] Related posts relevant


### Task 12: Legal & Professional Pages
**Priority**: Medium
**Dependencies**: None
**Estimated Time**: 3 hours
**Assignee**: AI Agent

#### Implementation

Create the following pages:
1. `/privacy` - Privacy policy
2. `/resume` - Professional resume/CV
3. `/uses` - Tech stack and tools
4. `/now` - Current focus

Example `/uses` page:
```astro
---
import Layout from '../layouts/Layout.astro';

const tools = {
  'Development': [
    { name: 'VS Code', description: 'Primary code editor with Copilot', link: 'https://code.visualstudio.com' },
    { name: 'Cursor', description: 'AI-powered code editor', link: 'https://cursor.sh' },
  ],
  'AI Research': [
    { name: 'PyTorch', description: 'Deep learning framework', link: 'https://pytorch.org' },
    { name: 'Weights & Biases', description: 'Experiment tracking', link: 'https://wandb.ai' },
  ],
  // ... more categories
};
---

<Layout title="Uses — Luis Miguel Montoya">
  <!-- Page content -->
</Layout>
```

#### Success Criteria
- [x] All pages created
- [x] Professional content
- [x] Consistent design
- [x] Mobile responsive
- [x] Legal compliance

---

## Implementation
### For the AI Agent

1. **Start each task by**:
   - Reading this entire document
   - Reviewing current codebase state
   - Checking completed tasks
   - Understanding dependencies

2. **During implementation**:
   - Follow existing patterns
   - Maintain TypeScript types
   - Test thoroughly
   - Commit frequently

3. **After each task**:
   - Run all tests
   - Check mobile responsive
   - Verify accessibility
   - Update task tracker

### Development Workflow

```bash

# 1. Implement changes
# ... code ...

# 2. Test locally
npm run build

# Provide Summary and prompt user for review
```

---

## Technical Standards

### Code Quality
- **TypeScript**: Strict mode, no `any`
- **Components**: Single responsibility
- **Imports**: Absolute paths where possible
- **Naming**: Descriptive and consistent

### CSS/Styling
- Use semantic color utilities
- Follow existing animation patterns
- Mobile-first responsive design
- Respect user preferences (motion, theme)

### Performance
- Lazy load images
- Code split where beneficial
- Minimize JavaScript
- Optimize fonts

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators visible
- Screen reader friendly

### SEO
- Unique meta descriptions
- Structured data
- Open Graph images
- Canonical URLs

---

## Testing & Quality Assurance

### Pre-Task Checklist
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] No TypeScript errors
- [ ] Previous tasks complete

### Post-Task Checklist
- [ ] Feature works as expected
- [ ] Mobile responsive (320px-1920px)
- [ ] Keyboard navigable
- [ ] Screen reader tested
- [ ] No console errors

---

## Deployment Process

### Pre-Deployment
1. Run test
2. Build production bundle
3. Test locally with preview
4. Check all links
5. Verify SEO meta tags

### Deployment Steps
1. Merge to main branch
2. GitHub Actions triggers
3. Build and test
4. Deploy to GitHub Pages
5. Verify deployment

### Post-Deployment
1. Check live site
2. Test all features
3. Check search console


## Appendices

### A. File Structure
```
portfolio/
├── .github/
│   └── workflows/
│       └── build-and-deploy.yml
├── public/
│   ├── images/
│
│   ├── CNAME
│   ├── favicon.svg
│   ├── manifest.json
│   ├── robots.txt
│   └── _headers
├── scripts/
│   ├── generate-search-index.js
│
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ProjectCard.astro
│   │   │   ├── LiteratureCard.astro
│   │   │   └── BlogCard.astro
│   │   ├── layout/
│   │   ├── roadmap/
│   │   └── ui/
│   ├── content/
│   │   ├── config.ts
│   │   └── posts/
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── PostLayout.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── privacy.astro
│   │   ├── resume.astro
│   │   ├── rss.xml.ts
│   │   ├── blog/
│   │   ├── literature/
│   │   ├── posts/
│   │   ├── projects/
│   │   └── roadmap/
│   ├── styles/
│   └── utils/
├── astro.config.mjs
├── package.json
└── tsconfig.json
│
```


### B. Useful Commands
```bash
# Development
pnpm run dev              # Start dev server
pnpm run build:search     # Generate search index
pnpm run build           # Build for production

# Testing
npx astro check         # TypeScript check
```

### D. Resources
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)

---

## Final Notes

This comprehensive guide provides everything needed to transform the portfolio from its current state to a production-ready, professional website. Each task builds upon the previous ones, creating a solid foundation for a standout portfolio that showcases AI interpretability research.

Remember:
- Quality over speed
- Test thoroughly
- Document changes
- Follow patterns
- Ask for help when needed

Good luck with the implementation! 🚀