# Search System for GitHub Pages

This directory contains the search index generation script for GitHub Pages deployment.

## How It Works

### 1. Build-Time Index Generation
- `scripts/generate-search-index.js` processes all MDX files in `src/content/posts/`
- Extracts frontmatter and content from published posts
- Generates `/public/api/posts.json` for client-side search

### 2. Client-Side Search
- `src/utils/search.ts` provides SearchManager class
- Uses Fuse.js for fuzzy search functionality
- `src/components/ui/SearchInput.astro` provides search UI

### 3. Usage

#### Build Integration
```bash
# Generate search index only
npm run build:search

# Build everything (includes search index)
npm run build
```

#### Adding Content
1. Create MDX files in `src/content/posts/`
2. Set `status: "published"` in frontmatter
3. Run build to update search index

#### Search Features
- **Fuzzy search** - finds partial matches
- **Multi-field search** - searches title, content, tags, etc.
- **Keyboard shortcuts** - Cmd/Ctrl+K to focus search
- **Debounced input** - smooth user experience
- **Graceful fallback** - works without search if needed

### 4. Configuration

#### Search Index Script
- `CONFIG.contentDir` - where to find MDX files
- `CONFIG.outputDir` - where to write JSON
- `CONFIG.excerptLength` - maximum excerpt length

#### Search Manager
- `threshold` - search sensitivity (0.4 = more lenient)
- `keys` - fields to search with weights
- `includeScore` - return relevance scores
- `includeMatches` - highlight matched terms

### 5. Performance

#### Index Size Optimization
- Content limited to 1000 characters per post
- Markdown stripped to plain text
- Array fields normalized for consistency

#### Client Performance
- Lazy initialization of search
- Debounced search input (300ms)
- Limited results (20 max)
- Cache-friendly JSON requests

### 6. GitHub Pages Compatibility

This system is designed specifically for GitHub Pages static hosting:

- ✅ **No server-side processing** - everything runs in browser
- ✅ **Build-time generation** - search index created during build
- ✅ **Static JSON files** - no dynamic API endpoints needed
- ✅ **Progressive enhancement** - works without JavaScript
- ✅ **Cache-friendly** - static assets can be cached

## File Structure

```
scripts/
├── generate-search-index.js     # Build-time index generation
src/
├── utils/
│   └── search.ts               # Client-side search manager
├── components/
│   └── ui/
│       └── SearchInput.astro   # Search input component
public/
└── api/
    └── posts.json             # Generated search index
```

## Example Content

```yaml
---
title: "My Blog Post"
slug: "my-blog-post"
date: 2024-12-01
excerpt: "A brief description of the post"
types: ["blog"]
category: "Technical"
status: "published"
tags: ["search", "astro"]
---

# My Blog Post

Content here will be searchable...
```

This will generate a search entry accessible via the client-side search interface.
