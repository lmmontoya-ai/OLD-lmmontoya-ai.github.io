# 📖 Content Authoring Guide

**Project**: Luis Miguel Montoya Portfolio
**System**: Unified Content System
**Last Updated**: May 30, 2025

This guide provides comprehensive instructions for creating and managing content using the Unified Content System. Whether you're writing blog posts, documenting roadmap milestones, showcasing projects, or creating literature reviews, this system handles it all through a single, flexible schema.

---

## 🎯 Quick Start

### 1. Create a New Post

All content is created as MDX files in the `src/content/posts/` directory:

```bash
# Navigate to the posts directory
cd src/content/posts/

# Create a new post file
touch my-new-post.mdx
```

### 2. Basic Frontmatter Structure

Every post starts with YAML frontmatter that defines its metadata:

```yaml
---
title: "Your Post Title"
slug: "your-post-title"
date: 2025-05-30
description: "A brief description of your post (max 280 characters)"
types: ["blog"]
category: "Technical"
status: "published"
---

# Your content goes here...
```

### 3. Content Types

The system supports six content types that can be mixed and matched:

- **`blog`** - Traditional blog posts and articles
- **`roadmap`** - Project milestones and development updates
- **`project`** - Project showcases and portfolios
- **`literature`** - Research papers, book reviews, resource summaries
- **`note`** - Quick notes and thoughts
- **`guide`** - Tutorials and how-to content

---

## 📋 Complete Schema Reference

### Core Required Fields

Every post must include these fields:

```yaml
---
# Basic identification
title: "Post Title"           # String - The main title of your post
slug: "post-title"           # String - URL-friendly identifier (lowercase, hyphens)
date: 2025-05-30             # Date - Publication date (YYYY-MM-DD format)

# Content description
description: "Brief description"  # String - Maximum 280 characters for SEO and previews

# Classification
types: ["blog", "guide"]     # Array - One or more content types
category: "Technical"        # Enum - Research|Technical|Reflection|Resource|Tutorial|Update
status: "published"          # Enum - draft|published|archived|in-progress|completed|planned
---
```

### Optional Core Fields

```yaml
---
# Content metadata
tags: ["javascript", "tutorial", "web-dev"]  # Array of strings for categorization
readingTime: 5                               # Number - Auto-calculated if not provided
wordCount: 1200                              # Number - Auto-calculated if not provided
lastModified: 2025-05-30                     # Date - When content was last updated

# Display configuration
display:
  showToc: true              # Boolean - Show table of contents (default: true if headings exist)
  showRelated: true          # Boolean - Show related posts (default: true)
  layout: "default"          # Enum - default|wide|centered
  accent: "blue"             # Enum - blue|gold|green (auto-selected based on type if not set)
---
```

### Type-Specific Fields

#### Roadmap Posts

For development milestones and project phases:

```yaml
---
types: ["roadmap"]
roadmap:
  phase: 1                           # Number - Which phase this milestone belongs to
  dependencies: ["previous-task"]    # Array - Prerequisites for this milestone
  outcomes: ["Feature implemented"]  # Array - Expected deliverables
  timeline: "2 weeks"               # String - Expected completion time
  x: 100                            # Number - X coordinate for roadmap visualization
  y: 200                            # Number - Y coordinate for roadmap visualization
---
```

#### Project Posts

For showcasing completed work:

```yaml
---
types: ["project"]
project:
  area: "Interpretability"                    # Enum - Interpretability|Alignment|Tooling|Safety
  stack: ["React", "TypeScript", "Node.js"]  # Array - Technologies used
  collaborators: ["John Doe", "Jane Smith"]  # Array - Team members
  organization: "OpenAI"                      # String - Associated organization
  links:
    github: "https://github.com/user/repo"   # URL - Source code
    demo: "https://example.com"              # URL - Live demonstration
    paper: "https://arxiv.org/abs/123"       # URL - Associated research
    website: "https://project-site.com"      # URL - Project homepage
---
```

#### Literature Posts

For research summaries and reviews:

```yaml
---
types: ["literature"]
literature:
  authors: ["Author Name", "Co-Author"]           # Array - Paper/book authors
  year: 2025                                      # Number - Publication year
  source: "https://arxiv.org/abs/2501.12345"     # URL - Link to original source
  type: "Paper"                                   # Enum - Paper|Blog|Video|Book|Course
  rating: 4                                       # Number - 1-5 star rating
  recommendedFor: ["AI Researchers", "Students"] # Array - Target audience
---
```

### Media and Assets

```yaml
---
media:
  hero: "/images/post-hero.jpg"              # String - Main header image
  thumbnail: "/images/post-thumb.jpg"        # String - Preview image for cards
  gallery: ["/img1.jpg", "/img2.jpg"]       # Array - Image gallery
  videos:
    - url: "https://youtube.com/watch?v=123" # URL - Video link
      title: "Demo Video"                    # String - Video title
      thumbnail: "/video-thumb.jpg"          # String - Video thumbnail
---
```

### SEO and Metadata

```yaml
---
seo:
  metaTitle: "Custom Title for SEO"          # String - Override title for search engines
  metaDescription: "Custom meta description" # String - Override description for search engines
  canonicalUrl: "https://example.com"       # URL - Canonical URL if content exists elsewhere
  noIndex: false                             # Boolean - Prevent search engine indexing
---
```

---

## 🎨 Content Creation Guidelines

### Writing Effective descriptions

The description is crucial for SEO and content discovery:

- **Length**: Maximum 280 characters (like a tweet)
- **Purpose**: Summarize the main value or takeaway
- **Tone**: Match your content's style
- **Keywords**: Include relevant search terms naturally

**Examples:**

```yaml
# ✅ Good description
description: "Learn how to implement real-time collaborative editing in React using WebSockets, operational transforms, and conflict resolution strategies."

# ❌ Too generic
description: "This post talks about building web applications."

# ❌ Too long
description: "In this comprehensive tutorial, we'll walk through every single step needed to build a complete real-time collaborative text editor from scratch, including all the technical details and implementation considerations you need to know about."
```

### Choosing Content Types

Posts can have multiple types - choose all that apply:

```yaml
# Multi-type examples
types: ["blog", "tutorial"]      # A tutorial blog post
types: ["roadmap", "project"]    # A project milestone that showcases work
types: ["literature", "guide"]   # A literature review that serves as a guide
```

### Category Selection

Choose the category that best describes your content's nature:

- **Research** - Academic work, literature reviews, experimental findings
- **Technical** - Code tutorials, technical deep-dives, implementation guides
- **Reflection** - Personal insights, lessons learned, retrospectives
- **Resource** - Curated lists, tool recommendations, reference materials
- **Tutorial** - Step-by-step instructions, how-to guides
- **Update** - Progress reports, announcements, milestone updates

### Status Management

Use status to control content visibility and workflow:

- **`draft`** - Work in progress, visible only in development
- **`published`** - Live content visible to all users
- **`archived`** - Old content that's no longer current
- **`in-progress`** - Active work that's not ready for publication
- **`completed`** - Finished work (useful for projects and roadmap items)
- **`planned`** - Future content that's been outlined

---

## 🖼️ Working with Media

### Image Best Practices

1. **Store images** in the `public/` directory
2. **Use descriptive names**: `ai-interpretability-diagram.jpg` not `image1.jpg`
3. **Optimize file sizes** for web performance
4. **Include alt text** in your markdown: `![Alt text](image.jpg)`

```yaml
---
media:
  hero: "/images/posts/my-post-hero.jpg"        # Main header image
  thumbnail: "/images/posts/my-post-thumb.jpg"  # Card preview image
  gallery:
    - "/images/posts/diagram-1.jpg"
    - "/images/posts/screenshot-2.jpg"
    - "/images/posts/result-3.jpg"
---
```

### Video Integration

```yaml
---
media:
  videos:
    - url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      title: "Project Demo"
      thumbnail: "/images/demo-thumb.jpg"
    - url: "https://vimeo.com/123456789"
      title: "Technical Walkthrough"
---
```

---

## 🔍 SEO and Discoverability

### Search Engine Optimization

```yaml
---
# Basic SEO (auto-generated from title/description if not provided)
title: "How to Build AI-Powered Code Analysis Tools"
description: "Learn to create static analysis tools using machine learning for code quality, security scanning, and automated refactoring suggestions."

# Advanced SEO (optional overrides)
seo:
  metaTitle: "AI Code Analysis Tools Tutorial | Luis Miguel Montoya"
  metaDescription: "Complete guide to building ML-powered static analysis tools. Includes Python examples, security scanning, and automated refactoring."
  canonicalUrl: "https://lmmontoya.dev/posts/ai-code-analysis"
---
```

### Tag Strategy

Use tags strategically for content discovery:

```yaml
---
tags:
  # Technology tags
  - "python"
  - "machine-learning"
  - "static-analysis"

  # Topic tags
  - "code-quality"
  - "automation"
  - "developer-tools"

  # Audience tags
  - "intermediate"
  - "tutorial"
---
```

---

## 📝 Content Templates

The system provides templates for common content types. Use them as starting points:

### Blog Post Template

```bash
cp src/content/posts/_templates/blog-post.mdx src/content/posts/my-new-post.mdx
```

### Roadmap Milestone Template

```bash
cp src/content/posts/_templates/roadmap-milestone.mdx src/content/posts/milestone-1.mdx
```

### Project Showcase Template

```bash
cp src/content/posts/_templates/project-showcase.mdx src/content/posts/my-project.mdx
```

### Literature Review Template

```bash
cp src/content/posts/_templates/literature-review.mdx src/content/posts/paper-review.mdx
```

---

## 🔄 Content Workflow

### Development Process

1. **Create draft**
   ```yaml
   status: "draft"  # Only visible in development mode
   ```

2. **Write and iterate**
   - Use the templates as starting points
   - Preview using `npm run dev`
   - Test different layouts and accent colors

3. **Review and publish**
   ```yaml
   status: "published"  # Makes content live
   ```

4. **Update when needed**
   ```yaml
   lastModified: 2025-05-30  # Track content freshness
   ```

### Content Organization

```
src/content/posts/
├── _templates/           # Template files
├── 2025/                # Organize by year
│   ├── 01-january/      # Monthly folders (optional)
│   └── 02-february/
├── projects/            # Group by type (optional)
├── research/
└── standalone-posts.mdx # Or keep files at root level
```

---

## 🎛️ Advanced Features

### Custom Layouts

```yaml
---
display:
  layout: "wide"      # More horizontal space for code/diagrams
  layout: "centered"  # Focused reading experience
  layout: "default"   # Standard blog layout
---
```

### Accent Colors

```yaml
---
display:
  accent: "blue"   # Technology, coding, general content
  accent: "gold"   # Roadmap milestones, important updates
  accent: "green"  # Resources, guides, completed projects
---
```

### Table of Contents Control

```yaml
---
display:
  showToc: false  # Hide TOC even if headings exist
  showToc: true   # Force show TOC (default if headings exist)
---
```

### Related Content

```yaml
---
display:
  showRelated: false  # Hide related posts section
  showRelated: true   # Show related posts (default)
---
```

---

## 🛠️ Technical Details

### URL Structure

The system generates URLs based on content type and slug:

- **Multi-type content**: `/posts/{slug}` (unified route)
- **Single-type content**: `/{type}/{slug}` (redirects from `/posts/{slug}`)

Examples:
- `types: ["blog"]` → `/blog/my-post` (redirects from `/posts/my-post`)
- `types: ["blog", "tutorial"]` → `/posts/my-post` (no redirect)

### Search Integration

Content is automatically indexed for search:

- **Title and description** are searchable
- **Tags and categories** boost relevance
- **Content type** filters search results
- Search supports fuzzy matching and keyboard shortcuts (`Cmd/Ctrl + K`)

### Build Process

1. **Content validation** - Schema validation at build time
2. **Metadata computation** - Auto-calculate reading time, word count
3. **Search index** - Generate static search index for client-side search
4. **Static generation** - Pre-render all published content

---

## 🔧 Troubleshooting

### Common Issues

**Q: My post isn't showing up**
- Check that `status: "published"`
- Verify the file is in `src/content/posts/`
- Ensure required fields are present
- Check for YAML syntax errors

**Q: Images aren't loading**
- Images must be in the `public/` directory
- Use absolute paths starting with `/`
- Check file names match exactly (case-sensitive)

**Q: Search isn't working**
- Run `npm run build:search` to regenerate search index
- Check that `public/api/posts.json` exists
- Verify content has searchable text

**Q: Type errors in frontmatter**
- Check enum values match exactly (case-sensitive)
- Ensure arrays are properly formatted: `["item1", "item2"]`
- Validate date format: `YYYY-MM-DD`

### Schema Validation

The system validates all frontmatter at build time. Common validation errors:

```yaml
# ❌ Invalid enum value
category: "technical"  # Should be "Technical" (capitalized)

# ❌ Invalid date format
date: "May 30, 2025"  # Should be 2025-05-30

# ❌ description too long
description: "This is a very long description that exceeds the 280 character limit and will cause a validation error during the build process..."

# ❌ Invalid type
types: ["blogpost"]  # Should be "blog"
```

---

## 🎯 Best Practices Summary

1. **Start with templates** - Use provided templates as starting points
2. **Write clear descriptions** - Summarize value in 280 characters or less
3. **Choose meaningful tags** - Think about how readers will search
4. **Use semantic categories** - Pick the category that best describes content nature
5. **Optimize images** - Compress images and use descriptive filenames
6. **Preview before publishing** - Use development mode to test content
7. **Update modification dates** - Track content freshness with `lastModified`
8. **Test search integration** - Verify content appears in search results

---

## 📚 Quick Reference

### Required Fields Checklist
- [ ] `title` - Descriptive title
- [ ] `slug` - URL-friendly identifier
- [ ] `date` - Publication date (YYYY-MM-DD)
- [ ] `description` - Brief description (≤280 chars)
- [ ] `types` - Array of content types
- [ ] `category` - Content category
- [ ] `status` - Publication status

### Content Type Reference
- `blog` - Articles and posts
- `roadmap` - Milestones and updates
- `project` - Showcases and portfolios
- `literature` - Reviews and summaries
- `note` - Quick thoughts
- `guide` - Tutorials and how-tos

### Category Reference
- `Research` - Academic and experimental
- `Technical` - Code and implementation
- `Reflection` - Personal insights
- `Resource` - Tools and references
- `Tutorial` - Step-by-step guides
- `Update` - Progress and announcements

---

**Need help?** Check the template files in `src/content/posts/_templates/` for real examples, or refer to existing posts for inspiration.
