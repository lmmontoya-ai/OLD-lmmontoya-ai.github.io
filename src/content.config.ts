// src/content.config.ts
// Content collection configuration using the new Content Layer API (Astro v5.0+)

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { date } from 'astro:schema';

/**
 * Unified content schema supporting all content types:
 * blog, roadmap, project, literature, note, guide
 */
const postsCollection = defineCollection({
  loader: glob({
    pattern: ["**/*.{md,mdx}", "!_templates/**"],
    base: "./src/content/posts"
  }),
  schema: z.object({
   // === CORE FIELDS (Required) ===
   title: z.string(),
   description: z.string(), // This replaces 'excerpt'
   date: z.string()
     .or(z.date())
     .transform((val) => {
       const date = new Date(val);
       return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
       });
     }),

   // === TYPE IDENTIFICATION ===
   type: z.enum(['blog', 'roadmap', 'project', 'literature']),

   // === COMMON OPTIONAL FIELDS ===
   tags: z.array(z.string()).optional().default([]),
   cover: z.string().optional(), // Hero image
   status: z.enum([
     'draft',
     'published',
     'archived',
     'in-progress',
     'completed',
     'planned'
   ]).optional().default('published'),

   category: z.enum([
     'Research',
     'Technical',
     'Reflection',
     'Resource',
     'Tutorial',
     'Update'
   ]).optional(),

   // === TYPE-SPECIFIC FIELDS ===
   // Project-specific
   project: z.object({
     area: z.enum([
       'Interpretability',
       'Alignment',
       'Research',
       'Safety'
     ]).optional(),
     stack: z.array(z.string()).optional(),
     collaborators: z.array(z.string()).optional(),
     links: z.object({
       github: z.string().url().optional(),
       demo: z.string().url().optional(),
       paper: z.string().url().optional(),
       website: z.string().url().optional(),
     }).optional(),
   }).optional(),

   // Literature-specific
   literature: z.object({
     authors: z.array(z.string()).optional(),
     year: z.number().min(1900).max(2100).optional(),
     source: z.string().url().optional(),
     type: z.enum(['Paper', 'Book', 'Video', 'Blog', 'Course']).optional(),
     key_insights: z.array(z.string()).optional(),
   }).optional(),

   // Roadmap-specific
   roadmap: z.object({
     phase: z.number().min(1).optional(),
     dependencies: z.array(z.string()).optional(),
     outcomes: z.array(z.string()).optional(),
     timeline: z.string().optional(), // e.g., "Q1 2024"
   }).optional(),

   // === METADATA ===
   lastModified: z.string().optional(),
   featured: z.boolean().optional().default(false),
   draft: z.boolean().optional().default(false),
   slug: z.string().optional(),
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

// Helper function to compute word count
export function computeWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
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
