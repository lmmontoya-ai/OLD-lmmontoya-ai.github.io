# Content Templates

This directory contains MDX templates for creating different types of content in the unified content system.

## Available Templates

### 📝 Blog Post Template
**File**: `blog-post.mdx`
**Use for**: Technical articles, tutorials, research insights

**Key Features**:
- Standard blog post structure
- Code syntax highlighting
- Interactive component embedding
- Table of contents support

### 🗺️ Roadmap Milestone Template
**File**: `roadmap-milestone.mdx`
**Use for**: Learning milestones, research progress, project phases

**Key Features**:
- Progress tracking with checkboxes
- Dependency management
- Timeline and outcome specification
- Phase organization

### 🚀 Project Showcase Template
**File**: `project-showcase.mdx`
**Use for**: Completed projects, tools, applications

**Key Features**:
- Technical stack documentation
- Links to demos and repositories
- Media gallery support
- Impact metrics and results

### 📚 Literature Review Template
**File**: `literature-review.mdx`
**Use for**: Paper reviews, book summaries, course notes

**Key Features**:
- Author and publication metadata
- Difficulty and rating system
- Technical deep dives
- Critical analysis sections

## How to Use Templates

1. **Copy** the appropriate template to `src/content/posts/`
2. **Rename** the file with your desired slug (e.g., `my-new-post.mdx`)
3. **Update** the frontmatter with your content details
4. **Replace** the template content with your actual content
5. **Preview** using `npm run dev`

## Frontmatter Reference

### Required Fields
```yaml
title: "Your Post Title"           # Post title
slug: "your-post-slug"            # URL slug (must be unique)
date: 2024-03-20                  # Publication date
excerpt: "Brief description..."   # Max 280 characters
types: ["blog"]                   # Content types array
category: "Technical"             # Content category
status: "published"               # Publication status
```

### Content Types
- `blog` - Blog posts and articles
- `roadmap` - Learning milestones and progress
- `project` - Project showcases and portfolios
- `literature` - Paper reviews and summaries
- `note` - Quick notes and observations
- `guide` - How-to guides and tutorials

### Categories
- `Research` - Academic research and papers
- `Technical` - Technical tutorials and deep dives
- `Reflection` - Personal insights and thoughts
- `Resource` - Tools and resource collections
- `Tutorial` - Step-by-step guides
- `Update` - Progress updates and announcements

### Status Options
- `draft` - Work in progress, not published
- `published` - Live and visible to users
- `archived` - Old content kept for reference
- `in-progress` - Active work (for roadmap items)
- `completed` - Finished work (for projects/milestones)
- `planned` - Future content planned

## Advanced Features

### Multi-Type Content
Content can have multiple types for cross-categorization:
```yaml
types: ["roadmap", "blog", "project"]
```

### Display Options
```yaml
display:
  showToc: true              # Show table of contents
  showRelated: true          # Show related posts
  layout: "wide"             # Layout variant
  accent: "gold"             # Theme accent color
```

### SEO Configuration
```yaml
seo:
  metaTitle: "Custom Title"           # Override page title
  metaDescription: "Custom desc..."   # Meta description
  canonicalUrl: "https://..."         # Canonical URL
  noIndex: false                      # Search engine indexing
```

## Tips for Great Content

1. **Write compelling excerpts** - They appear in listings and search results
2. **Use descriptive tags** - Helps with discoverability and filtering
3. **Include code examples** - Syntax highlighting is automatically applied
4. **Add interactive elements** - Embed Astro components for demos
5. **Optimize for mobile** - Content automatically adapts to mobile screens
6. **Link related content** - Use internal links to build content connections

## Need Help?

- Check the [Content Authoring Guide](../../docs/content-authoring-guide.md) for detailed instructions
- Look at existing content in `src/content/posts/` for examples
- Join our content creator discussion in the team chat
