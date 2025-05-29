// src/content/config.ts
// Unified content collection schema for all content types

import { defineCollection, z } from 'astro:content';

/**
 * Unified content schema supporting all content types:
 * blog, roadmap, project, literature, note, guide
 */
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core required fields
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    excerpt: z.string().max(280),
    types: z.array(z.enum(['blog', 'roadmap', 'project', 'literature', 'note', 'guide'])),
    category: z.enum(['Research', 'Technical', 'Reflection', 'Resource', 'Tutorial', 'Update']),
    status: z.enum(['draft', 'published', 'archived', 'in-progress', 'completed', 'planned']),

    // Optional core fields
    tags: z.array(z.string()).optional(),

    // Roadmap-specific fields
    roadmap: z.object({
      phase: z.number(),
      dependencies: z.array(z.string()).optional(),
      outcomes: z.array(z.string()).optional(),
      timeline: z.string().optional(),
      x: z.number().optional(),
      y: z.number().optional(),
    }).optional(),

    // Project-specific fields
    project: z.object({
      area: z.enum(['Interpretability', 'Alignment', 'Tooling', 'Safety']).optional(),
      stack: z.array(z.string()).optional(),
      collaborators: z.array(z.string()).optional(),
      organization: z.string().optional(),
      links: z.object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        paper: z.string().url().optional(),
        website: z.string().url().optional(),
      }).optional(),
    }).optional(),

    // Literature-specific fields
    literature: z.object({
      authors: z.array(z.string()).optional(),
      year: z.number().optional(),
      source: z.string().url().optional(),
      type: z.enum(['Paper', 'Blog', 'Video', 'Book', 'Course']).optional(),
      difficulty: z.enum(['Introductory', 'Intermediate', 'Advanced']).optional(),
      rating: z.number().min(1).max(5).optional(),
      recommendedFor: z.array(z.string()).optional(),
    }).optional(),

    // Media fields
    media: z.object({
      hero: z.string().optional(),
      thumbnail: z.string().optional(),
      gallery: z.array(z.string()).optional(),
      videos: z.array(z.object({
        url: z.string().url(),
        title: z.string(),
        thumbnail: z.string().optional(),
      })).optional(),
    }).optional(),

    // Display configuration
    display: z.object({
      showToc: z.boolean().optional(),
      showRelated: z.boolean().optional(),
      layout: z.enum(['default', 'wide', 'centered']).optional(),
      accent: z.enum(['blue', 'gold', 'green']).optional(),
    }).optional(),

    // SEO fields
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
    }).optional(),

    // Legacy fields for backward compatibility
    featured: z.boolean().optional(),
    hero_image: z.string().optional(),
    github_link: z.string().url().optional(),
    paper_link: z.string().url().optional(),
    summary: z.string().optional(),
    author: z.string().optional(),
    link: z.string().url().optional(),
    note: z.string().optional(),
    recommended_for: z.array(z.string()).optional(),
    related_items: z.array(z.string()).optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    dependencies: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};

// Helper function to compute reading time
export async function computeReadingTime(content: string): Promise<number> {
  // Simple word count based estimation (average 200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const minutes = words / 200;
  return Math.ceil(minutes);
}

// Helper function to extract headings from markdown content
export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ depth: number; text: string; slug: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({ depth, text, slug });
  }

  return headings;
}
