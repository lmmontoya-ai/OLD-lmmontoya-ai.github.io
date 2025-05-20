// src/content/config.ts
// Defines Astro content collections and schemas for roadmap, projects, and literature

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
