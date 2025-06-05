# AI Research Roadmap - Development Guide

## 1. Product Vision

### Purpose
> "A beautiful, interactive visualization of my journey towards AI research, showcasing completed milestones, current focus areas, and future plans in Interpretability, Alignment, and Safety."

### Success Metrics
- **Instant Understanding**: Visitors grasp my research trajectory in < 10 seconds
- **Depth on Demand**: Each node reveals rich context without overwhelming the initial view
- **Professional Polish**: Demonstrates technical capability through thoughtful implementation

### Design Principles
- **Static but Engaging**: No dragging needed - focus on content discovery through hover and click
- **Visual Hierarchy**: Current work prominently featured, completed work celebrated, future plans clearly mapped
- **Contextual Connections**: Dependencies and relationships visible but not cluttered

## 2. Core Features

| Feature | Description | Priority |
|:--------|:------------|:---------|
| **Interactive DAG Visualization** | Nodes represent posts, edges show learning dependencies | Must |
| **Hover Previews** | Rich tooltips with excerpt, tags, and progress indicators | Must |
| **Status-based Styling** | Visual differentiation: completed (solid), in-progress (pulsing), planned (outlined) | Must |
| **Area Branches** | Color-coded paths: Interpretability, Alignment, Safety, Fundamentals | Must |
| **Click-through Navigation** | Nodes link to full post content | Must |
| **Responsive Design** | Elegant degradation from desktop to mobile | Must |
| **Keyboard Navigation** | Tab through nodes, enter to visit | Should |
| **Legend & Controls** | Area filter toggles, status key, zoom controls | Should |
| **Progress Indicators** | Subtle animations for active/recent work | Nice |

## 3. Technical Architecture

### Stack Overview
- **Framework**: Astro with MDX content
- **Graph Rendering**: React Flow (static mode)
- **Styling**: Tailwind v4 with custom design tokens
- **Layout Algorithm**: d3-dag for automatic positioning
- **Interactions**: Framer Motion for animations

### Data Flow
```
MDX Posts → Content Collection → Transform → React Flow → Static Roadmap
    ↓              ↓                ↓            ↓              ↓
  types:      getCollection    roadmap.ts   nodes/edges   hover/click
 [roadmap]     filter by       position      render      interactions
               roadmap type    calculate
```

## 4. Visual Design System

### Color Palette
```css
/* app.css - Tailwind v4 CSS-first configuration */
@import "tailwindcss";

@theme {
  /* Area colors - inspired by AI safety visualization */
  --color-area-interpretability: #60A5FA; /* Sky blue */
  --color-area-alignment: #A78BFA;        /* Purple */
  --color-area-safety: #F59E0B;           /* Amber */
  --color-area-fundamentals: #10B981;     /* Emerald */

  /* Define color tokens */
  --color-interpretability-*: initial;
  --color-alignment-*: initial;
  --color-safety-*: initial;
  --color-fundamentals-*: initial;
}

/* Custom color utilities */
@utility bg-area-* {
  background-color: var(--color-area-*);
}

@utility ring-area-* {
  --tw-ring-color: var(--color-area-*);
}

@utility text-area-* {
  color: var(--color-area-*);
}

@utility shadow-area-* {
  --tw-shadow-color: var(--color-area-*);
}
```

### Node Design
```jsx
// Visual states for static roadmap
const nodeStates = {
  default: "scale-100 opacity-100",
  hover: "scale-105 opacity-100 shadow-lg shadow-area-*/20",
  completed: "ring-2 ring-area-* bg-area-*/10",
  inProgress: "ring-2 ring-area-* ring-offset-2 animate-pulse-subtle",
  planned: "ring-1 ring-area-*/50 ring-dashed bg-white/50 dark:bg-gray-900/50"
};
```

## 5. Implementation Plan

### 5.1 Data Model Integration

Your existing content schema is perfect. We'll use these fields:

```yaml
# Example roadmap post
---
title: "Transformer Mechanistic Interpretability"
types: ["roadmap", "project"]
status: "in-progress"  # Key for visual state
roadmap:
  phase: 2  # Vertical positioning
  dependencies: ["attention-mechanisms", "linear-algebra-basics"]
  outcomes: ["Built GPT-2 interpretability tools", "Identified attention patterns"]
project:
  area: "Interpretability"  # Branch/color
  links:
    github: "https://github.com/..."
---
```

### 5.2 Core Components

#### `RoadmapView.astro`
```astro
---
import { getCollection } from 'astro:content';
import RoadmapGraph from './RoadmapGraph.tsx';
import { transformToGraph } from '@/lib/roadmap';

const roadmapPosts = await getCollection('posts',
  ({ data }) => data.types.includes('roadmap')
);

const { nodes, edges } = transformToGraph(roadmapPosts);
---

<section class="roadmap-container">
  <header class="roadmap-header">
    <h1>AI Research Journey</h1>
    <p>My path through Interpretability, Alignment, and Safety research</p>
  </header>

  <RoadmapGraph
    nodes={nodes}
    edges={edges}
    client:load
  />

  <!-- Fallback for no-JS -->
  <noscript>
    <ol class="roadmap-list">
      {roadmapPosts.map(post => (
        <li data-status={post.data.status}>
          <a href={`/posts/${post.slug}`}>{post.data.title}</a>
        </li>
      ))}
    </ol>
  </noscript>
</section>
```

#### `RoadmapGraph.tsx`
```tsx
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge
} from '@xyflow/react';
import { RoadmapNode } from './RoadmapNode';
import { motion } from 'framer-motion';

const nodeTypes = {
  roadmap: RoadmapNode,
};

export default function RoadmapGraph({ nodes, edges }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[600px] w-full rounded-lg border"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}  // Static roadmap
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
      >
        <Background variant="dots" gap={20} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={node => {
            const area = node.data?.area || 'fundamentals';
            return `var(--color-area-${area})`;
          }}
        />
      </ReactFlow>
    </motion.div>
  );
}
```

#### `RoadmapNode.tsx`
```tsx
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function RoadmapNode({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  const statusStyles = {
    completed: 'bg-white dark:bg-gray-900 ring-2',
    'in-progress': 'bg-white dark:bg-gray-900 ring-2 ring-offset-2 animate-pulse-subtle',
    planned: 'bg-white/70 dark:bg-gray-900/70 ring-1 ring-dashed'
  };

  // Tailwind v4 requires static classes, so we map areas to their classes
  const areaColorClasses = {
    interpretability: 'ring-area-interpretability bg-status-interpretability',
    alignment: 'ring-area-alignment bg-status-alignment',
    safety: 'ring-area-safety bg-status-safety',
    fundamentals: 'ring-area-fundamentals bg-status-fundamentals',
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />

      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          roadmap-node relative cursor-pointer
          rounded-lg px-4 py-3 min-w-[200px]
          ${statusStyles[data.status]}
          ${areaColorClasses[data.area]}
          transition-all duration-200
        `}
      >
        {/* Status indicator */}
        {data.status === 'in-progress' && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-area-${data.area}`} />
            <span className={`relative inline-flex rounded-full h-3 w-3 bg-area-${data.area}`} />
          </span>
        )}

        {/* Content */}
        <h3 className="font-medium text-sm">{data.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {data.phase === 0 ? 'Current' : `Phase ${data.phase}`}
        </p>

        {/* Hover preview */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 top-full mt-2 z-50
                     bg-white dark:bg-gray-800 rounded-lg shadow-xl
                     p-4 min-w-[300px] pointer-events-none"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {data.excerpt}
            </p>
            {data.outcomes && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-medium mb-1">Outcomes:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400">
                  {data.outcomes.map((outcome, i) => (
                    <li key={i}>• {outcome}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-3 flex gap-2">
              {data.tags?.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
```

### 5.3 Transform Function

```typescript
// lib/roadmap.ts
import { sugiyama, decrossOpt, coordCenter } from 'd3-dag';
import type { Node, Edge } from '@xyflow/react';

export function transformToGraph(posts) {
  // Group by area for column-based layout
  const areaGroups = {
    fundamentals: [],
    interpretability: [],
    alignment: [],
    safety: [],
  };

  // Build nodes
  const nodes: Node[] = posts.map(post => {
    const area = post.data.project?.area?.toLowerCase() || 'fundamentals';
    const node = {
      id: post.slug,
      type: 'roadmap',
      position: { x: 0, y: 0 }, // Will calculate
      data: {
        title: post.data.title,
        slug: post.slug,
        status: post.data.status,
        area,
        phase: post.data.roadmap?.phase || 0,
        excerpt: post.data.excerpt,
        outcomes: post.data.roadmap?.outcomes,
        tags: post.data.tags,
        links: post.data.project?.links,
      },
    };

    areaGroups[area].push(node);
    return node;
  });

  // Calculate positions
  const COLUMN_WIDTH = 300;
  const ROW_HEIGHT = 120;
  const areas = Object.keys(areaGroups);

  areas.forEach((area, areaIndex) => {
    const nodesInArea = areaGroups[area];

    // Sort by phase (lower phase = higher on screen)
    nodesInArea.sort((a, b) => a.data.phase - b.data.phase);

    nodesInArea.forEach((node, nodeIndex) => {
      node.position = {
        x: areaIndex * COLUMN_WIDTH,
        y: node.data.phase * ROW_HEIGHT,
      };
    });
  });

  // Build edges
  const edges: Edge[] = posts.flatMap(post =>
    (post.data.roadmap?.dependencies || []).map(dep => ({
      id: `${dep}-${post.slug}`,
      source: dep,
      target: post.slug,
      type: 'smoothstep',
      animated: post.data.status === 'in-progress',
      style: {
        stroke: `var(--color-area-${post.data.project?.area?.toLowerCase() || 'fundamentals'})`,
        strokeWidth: 2,
      },
    }))
  );

  return { nodes, edges };
}
```

### 5.4 Styling Details

```css
/* app.css - Tailwind v4 additions */

/* Custom animations */
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@utility animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Status-based background utilities */
@utility bg-status-completed {
  background-color: color-mix(in oklch, var(--color-area-*) 10%, white);
}

@utility bg-status-progress {
  background-color: color-mix(in oklch, var(--color-area-*) 15%, white);
}

@utility bg-status-planned {
  background-color: color-mix(in oklch, var(--color-area-*) 5%, white);
}

/* Dark mode variants */
@media (prefers-color-scheme: dark) {
  @utility bg-status-completed {
    background-color: color-mix(in oklch, var(--color-area-*) 15%, black);
  }

  @utility bg-status-progress {
    background-color: color-mix(in oklch, var(--color-area-*) 20%, black);
  }

  @utility bg-status-planned {
    background-color: color-mix(in oklch, var(--color-area-*) 8%, black);
  }
}

/* React Flow customization */
.react-flow__node-roadmap {
  padding: 0;
  background: transparent;
  border: none;
}

.react-flow__edge-path {
  stroke-opacity: 0.5;
  transition: all 0.2s ease;
}

.react-flow__edge-path:hover {
  stroke-opacity: 1;
  stroke-width: 3px !important;
}

/* Ensure minimap uses our colors */
.react-flow__minimap-node {
  fill: var(--color-area-*);
  stroke: none;
}
```

## 6. User Experience Polish

### Interaction Details

1. **Hover Effects**
   - Subtle scale transformation (1.05x)
   - Rich tooltip with excerpt and outcomes
   - Edge highlighting on connected nodes
   - Smooth 200ms transitions

2. **Click Behavior**
   - Navigate to full post on node click
   - Visual feedback with brief scale animation
   - Maintain scroll position for back navigation

3. **Visual Feedback**
   - Current/active nodes with pulsing indicators
   - Completed nodes with solid styling
   - Planned nodes with dashed borders
   - Connected edges highlight on hover

### Responsive Behavior

```css
/* Mobile-first responsive design */
@media (max-width: 768px) {
  .roadmap-container {
    height: 100vh;
    padding: 1rem;
  }

  /* Zoom out further on mobile for overview */
  .react-flow__viewport {
    transform: scale(0.7) !important;
  }
}

@media (min-width: 769px) {
  .roadmap-container {
    height: 600px;
  }
}
```

## 7. Implementation Checklist

### Phase 1: Foundation (Days 1-2)
- [ ] Install dependencies: `pnpm add @xyflow/react d3-dag framer-motion`
- [ ] Create roadmap page route at `src/pages/roadmap.astro`
- [ ] Set up CSS-first Tailwind v4 utilities in `app.css`
- [ ] Create component directory structure

### Phase 2: Core Components (Days 3-4)
- [ ] Implement `transformToGraph` function in `lib/roadmap.ts`
- [ ] Build `RoadmapGraph.tsx` with React Flow setup
- [ ] Create `RoadmapNode.tsx` with hover states
- [ ] Add keyboard navigation support

### Phase 3: Content & Polish (Days 5-6)
- [ ] Tag existing posts with roadmap metadata
- [ ] Create 2-3 example posts per research area
- [ ] Implement area filtering
- [ ] Add legend component
- [ ] Test responsive behavior

### Phase 4: Optimization (Day 7)
- [ ] Add loading states with skeleton UI
- [ ] Implement error boundaries
- [ ] Optimize bundle size (lazy load React Flow)
- [ ] Add performance monitoring

## 8. Example Content Structure

### Sample Roadmap Posts

#### 1. Fundamentals Phase
```yaml
---
title: "Attention Mechanisms Deep Dive"
slug: "attention-mechanisms"
types: ["roadmap", "literature"]
status: "completed"
excerpt: "Comprehensive study of attention in transformers, from scaled dot-product to multi-head attention."
roadmap:
  phase: 1
  dependencies: ["linear-algebra-basics"]
  outcomes:
    - "Implemented attention from scratch"
    - "Visualized attention patterns in GPT-2"
project:
  area: "Fundamentals"
tags: ["transformers", "attention", "deep-learning"]
---
```

#### 2. Current Focus
```yaml
---
title: "Building SAE for GPT-2 Small"
slug: "sae-gpt2-small"
types: ["roadmap", "project"]
status: "in-progress"
excerpt: "Training sparse autoencoders to find interpretable features in GPT-2 small's residual stream."
roadmap:
  phase: 0  # Current work
  dependencies: ["attention-mechanisms", "residual-stream-analysis"]
  outcomes:
    - "Identified 50+ interpretable features"
    - "Open-sourced training code"
project:
  area: "Interpretability"
  links:
    github: "https://github.com/..."
tags: ["SAE", "mechanistic-interpretability", "GPT-2"]
---
```

#### 3. Future Plans
```yaml
---
title: "Automated Interpretability Research"
slug: "automated-interpretability"
types: ["roadmap"]
status: "planned"
excerpt: "Developing automated methods for discovering and validating interpretable features at scale."
roadmap:
  phase: 3
  dependencies: ["sae-gpt2-small", "feature-validation"]
  outcomes:
    - "Scale to larger models"
    - "Reduce human annotation needs"
project:
  area: "Interpretability"
tags: ["automation", "scaling", "future-work"]
---
```

## 9. Navigation & Discovery

### Legend Component
```tsx
export function RoadmapLegend() {
  const areas = [
    { name: 'Fundamentals', color: 'fundamentals' },
    { name: 'Interpretability', color: 'interpretability' },
    { name: 'Alignment', color: 'alignment' },
    { name: 'Safety', color: 'safety' },
  ];

  const statuses = [
    { name: 'Completed', style: 'ring-2 ring-gray-400' },
    { name: 'In Progress', style: 'ring-2 ring-offset-2 animate-pulse-subtle' },
    { name: 'Planned', style: 'ring-1 ring-dashed' },
  ];

  return (
    <div className="flex flex-wrap gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div>
        <h3 className="text-sm font-medium mb-2">Research Areas</h3>
        <div className="flex flex-wrap gap-2">
          {areas.map(area => (
            <div key={area.name} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded bg-area-${area.color}`} />
              <span className="text-sm">{area.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Status</h3>
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <div key={status.name} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${status.style} bg-white dark:bg-gray-800`} />
              <span className="text-sm">{status.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Keyboard Navigation
```typescript
// In RoadmapGraph.tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Let React Flow handle tab navigation
      return;
    }

    if (e.key === 'Enter' && document.activeElement?.classList.contains('roadmap-node')) {
      // Navigate to post
      const slug = document.activeElement.getAttribute('data-slug');
      if (slug) window.location.href = `/posts/${slug}`;
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

## 10. Performance Considerations

### Bundle Optimization
```tsx
// Lazy load React Flow for better initial page load
const RoadmapGraph = lazy(() => import('./RoadmapGraph'));

// In RoadmapView.astro
<Suspense fallback={<RoadmapSkeleton />}>
  <RoadmapGraph nodes={nodes} edges={edges} client:visible />
</Suspense>
```

### Loading State
```tsx
export function RoadmapSkeleton() {
  return (
    <div className="h-[600px] w-full rounded-lg border bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="w-32 h-4 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
```

## 11. Accessibility Features

### ARIA Labels and Roles
```tsx
// In RoadmapNode.tsx
<motion.div
  role="button"
  tabIndex={0}
  aria-label={`${data.title} - ${data.status} - ${data.area} research`}
  aria-describedby={isHovered ? `tooltip-${data.slug}` : undefined}
  data-slug={data.slug}
  // ... rest of props
>
  {/* Tooltip with ID for aria-describedby */}
  {isHovered && (
    <motion.div id={`tooltip-${data.slug}`} role="tooltip">
      {/* Tooltip content */}
    </motion.div>
  )}
</motion.div>
```

### Screen Reader Announcements
```tsx
// Announce area changes when filtering
const announceFilter = (area: string) => {
  const announcement = area
    ? `Showing ${area} research nodes`
    : 'Showing all research nodes';

  const liveRegion = document.getElementById('roadmap-live-region');
  if (liveRegion) liveRegion.textContent = announcement;
};
```

## 12. Final Polish & Launch

### Pre-launch Checklist
- [ ] Test all node interactions (hover, click, keyboard)
- [ ] Verify responsive design on multiple devices
- [ ] Check dark mode styling
- [ ] Validate all internal links
- [ ] Test with screen reader
- [ ] Optimize images in linked posts
- [ ] Add meta tags for social sharing

### Social Sharing Setup
```astro
<!-- In roadmap.astro -->
<meta property="og:title" content="AI Research Roadmap - Your Name" />
<meta property="og:description" content="Interactive visualization of my journey in AI interpretability, alignment, and safety research" />
<meta property="og:image" content="/roadmap-preview.png" />
<meta property="og:type" content="website" />
```

### Launch Announcement Template
```markdown
🚀 Just launched my interactive AI Research Roadmap!

✨ Features:
- Visual journey through interpretability & alignment research
- Live progress tracking on current projects
- Rich previews of each milestone
- Fully accessible and responsive

🔍 Explore my path from fundamentals to cutting-edge research

[Live Demo Link] | [GitHub Link]

#AIResearch #Interpretability #MachineLearning #WebDev
```

## Conclusion

This roadmap visualization will serve as a dynamic showcase of your AI research journey, making it easy for recruiters and collaborators to understand your progression and current focus areas. The static design with thoughtful interactions keeps the focus on your content while demonstrating technical proficiency.

The implementation leverages modern web technologies (Astro, React Flow, Tailwind v4) while maintaining excellent performance and accessibility. Most importantly, it tells your story in a visually compelling way that sets you apart from traditional portfolios.

Good luck with the implementation! This roadmap will be a fantastic addition to your portfolio and a great demonstration of both your research journey and technical skills. 🚀