# AI Coding Agent Implementation Prompt

## Your Mission
You are an AI coding agent tasked with implementing the Unified Content System for a portfolio website. Your job is to systematically work through the PRD tasks, checking progress and implementing only the next incomplete task.

## Step 1: Analyze Current State
Before making any changes, perform a comprehensive audit:

### File Structure Analysis
Check if these files/directories exist and assess their completion status:

**Phase 1 - Schema & Collection Setup:**
- [ ] `src/content/config.ts` - Unified schema implementation
- [ ] `src/utils/content.ts` - Content utility functions

**Phase 2 - Layout Components:**
- [ ] `src/layouts/PostLayout.astro` - Main post layout
- [ ] `src/components/post/Sidebar.astro` - Navigation sidebar
- [ ] `src/components/post/TableOfContents.astro` - TOC component
- [ ] `src/components/post/PostHeader.astro` - Post header
- [ ] `src/components/post/PostFooter.astro` - Post footer

**Phase 3 - Page Routes:**
- [ ] `src/pages/posts/[slug].astro` - Dynamic post route
- [ ] `src/pages/blog/index.astro` - Blog section index

**Phase 4 - Search & Filtering:**
- [ ] `src/components/ui/SearchInput.astro` - Search component

**Phase 5 - Content Templates:**
- [ ] `src/content/posts/_templates/blog-post.mdx` - Blog template
- [ ] `src/content/posts/_templates/roadmap-milestone.mdx` - Roadmap template

**Phase 6 - Supporting Components:**
- [ ] `src/components/ui/Breadcrumbs.astro` - Breadcrumb navigation
- [ ] `src/pages/api/posts.json.ts` - Search API endpoint

**Phase 7 - Documentation:**
- [ ] `docs/content-authoring-guide.md` - Author documentation

### Completion Assessment Criteria
For each file, determine its status:
- ✅ **Complete**: File exists and matches PRD specifications (>90% implementation)
- 🔄 **Partial**: File exists but incomplete or missing key features
- ❌ **Missing**: File doesn't exist
- 🚫 **Blocked**: Cannot proceed due to dependencies

### Dependency Mapping
Understand the task dependencies:
1. **Phase 1** must be complete before Phase 2
2. **Phase 2** components are needed for Phase 3 routes
3. **Phase 4** requires API endpoint from Phase 6
4. **Phase 5** templates can be done independently
5. **Phase 7** documentation can be done anytime

## Step 2: Identify Next Task
Based on your analysis:

1. **Find the earliest incomplete task** following the dependency order
2. **Verify all dependencies** for that task are completed
3. **If dependencies are missing**, work on those first
4. **Select exactly ONE task** to implement

## Step 3: Implementation Guidelines

### Code Quality Standards
- Follow existing code patterns and naming conventions
- Use TypeScript with proper type definitions
- Implement responsive design with Tailwind CSS
- Add proper error handling and accessibility
- Include JSDoc comments for complex functions

### PRD Reference Schema
When implementing, refer to this unified content schema structure:
```typescript
// Core fields that MUST be implemented
title: string
slug: string
date: Date
excerpt: string (max 280 chars)
types: Array<'blog'|'roadmap'|'project'|'literature'|'note'|'guide'>
category: 'Research'|'Technical'|'Reflection'|'Resource'|'Tutorial'|'Update'
status: 'draft'|'published'|'archived'|'in-progress'|'completed'|'planned'

// Optional specialized fields
roadmap?: { phase, dependencies, outcomes, timeline }
project?: { area, stack, collaborators, links }
literature?: { authors, year, source, type, difficulty, rating }
media?: { hero, thumbnail, gallery, videos }
display?: { showToc, showRelated, layout, accent }
```

### Implementation Checklist for Each Task
Before marking a task complete, verify:
- [ ] Code compiles without errors
- [ ] TypeScript types are properly defined
- [ ] Component renders correctly
- [ ] Responsive design works on mobile/desktop
- [ ] Accessibility attributes are included
- [ ] Error states are handled
- [ ] Code follows existing patterns

## Step 4: Task Execution Protocol

### Output Format
Start your response with:
```
## Current Progress Analysis
[Your file-by-file analysis]

## Next Task Identified
**Task:** [Phase X.Y: Task Name]
**File:** [file path]
**Status:** [Missing/Partial]
**Dependencies:** [List any dependencies and their status]

## Implementation
[Your code implementation]
```

### Specific Task Instructions

**If implementing Schema (Task 1.1):**
- Remove old collections first
- Implement the complete schema with all optional fields
- Add helper functions for reading time and heading extraction
- Export proper TypeScript types

**If implementing Components (Phase 2):**
- Use Astro component syntax
- Implement proper prop interfaces
- Add interactive JavaScript where needed
- Follow the existing design system

**If implementing Routes (Phase 3):**
- Handle static path generation correctly
- Implement proper error handling
- Add metadata computation
- Handle redirects as specified

**If implementing Search (Phase 4):**
- Use Fuse.js for fuzzy search
- Implement proper debouncing
- Add keyboard navigation
- Handle empty states

## Step 5: Testing & Validation
After implementation:
1. **Verify the component/file works in isolation**
2. **Test integration with existing components**
3. **Check mobile responsiveness**
4. **Validate TypeScript compilation**
5. **Test with sample content**

## Critical Rules
- ❗ **ONLY implement ONE task at a time**
- ❗ **DO NOT modify files outside the current task scope**
- ❗ **MUST check dependencies before starting**
- ❗ **MUST follow exact PRD specifications**
- ❗ **MUST maintain existing code style and patterns**

## Reference PRD Tasks Summary
```
Phase 1: Schema & Collection Setup (45min + 60min)
├── Task 1.1: Create Unified Schema
└── Task 1.2: Create Content Utilities

Phase 2: Layout Components (120min + 90min + 60min + 45min + 45min)
├── Task 2.1: Create Unified Post Layout
├── Task 2.2: Create Sidebar Component
├── Task 2.3: Create Table of Contents Component
├── Task 2.4: Create Post Header Component
└── Task 2.5: Create Post Footer Component

Phase 3: Page Routes (30min + 45min)
├── Task 3.1: Create Dynamic Post Route
└── Task 3.2: Update Section Index Pages

Phase 4: Search & Filtering (45min)
└── Task 4.1: Create Search Component

Phase 5: Content Templates (15min + 15min)
├── Task 5.1: Create MDX Templates
└── Task 5.2: Create Roadmap Milestone Template

Phase 6: Supporting Components (30min + 30min)
├── Task 6.1: Create Breadcrumbs Component
└── Task 6.2: Create API Endpoint for Search

Phase 7: Documentation (30min)
└── Task 7.1: Create Author Guide
```

---

**Your task**: Analyze the current implementation state, identify the next incomplete task, and implement ONLY that task according to the PRD specifications.