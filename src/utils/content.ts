// src/utils/content.ts
// Utility functions for content management

import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type PostType = 'blog' | 'roadmap' | 'project' | 'literature' | 'note' | 'guide';

/**
 * Get all posts of specific type(s)
 * @param types - Single type or array of types to filter by
 * @returns Array of posts matching the specified types
 */
export async function getPostsByType(types: string | string[]): Promise<Post[]> {
  const typeArray = Array.isArray(types) ? types : [types];
  const posts = await getCollection('posts');

  return posts.filter(post => {
    // Check if post matches the requested types
    const matchingTypes = post.data.types.filter((type: PostType) => typeArray.includes(type));
    if (matchingTypes.length === 0) return false;

    // Define valid statuses per content type
    const validStatusesByType: Record<string, string[]> = {
      blog: ['published'],
      literature: ['published'],
      note: ['published'],
      guide: ['published'],
      roadmap: ['published', 'in-progress', 'completed'],
      project: ['published', 'in-progress', 'completed', 'planned'],
    };

    // Collect statuses allowed for the matching types only
    const validStatuses = new Set<string>();
    matchingTypes.forEach((type: string) => {
      const statuses = validStatusesByType[type];
      if (statuses) {
        statuses.forEach((status: string) => validStatuses.add(status));
      }
    });

    // Default to published only if no rules found
    if (validStatuses.size === 0) {
      validStatuses.add('published');
    }

    return validStatuses.has(post.data.status);
  });
}

/**
 * Get related posts based on tags and category
 * @param currentPost - The current post to find related content for
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts
 */
export async function getRelatedPosts(
  currentPost: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getCollection('posts');

  // Score posts based on similarity
  const scored = posts
    .filter(p => p.id !== currentPost.id && p.data.status === 'published')
    .map(post => {
      let score = 0;

      // Score based on shared types
      const sharedTypes = post.data.types.filter((type) =>
        currentPost.data.types.includes(type)
      );
      score += sharedTypes.length * 3;

      // Score based on shared category
      if (post.data.category === currentPost.data.category) {
        score += 2;
      }

      // Score based on shared tags
      if (post.data.tags && currentPost.data.tags) {
        const sharedTags = post.data.tags.filter((tag: string) =>
          currentPost.data.tags?.includes(tag)
        );
        score += sharedTags.length;
      }

      // Boost recent posts slightly
      const daysSincePublished = Math.floor(
        (Date.now() - new Date(post.data.date).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSincePublished < 30) {
        score += 0.5;
      }

      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(item => item.post);
}

/**
 * Get posts grouped by type for sidebar navigation
 * @returns Object with posts grouped by their primary type
 */
export async function getNavigationPosts(): Promise<Record<string, Post[]>> {
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

  // Sort each group by date (newest first)
  Object.keys(grouped).forEach(type => {
    grouped[type].sort((a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  });

  return grouped;
}

/**
 * Build breadcrumb trail for a post
 * @param post - The post to build breadcrumbs for
 * @returns Array of breadcrumb items
 */
export function getBreadcrumbs(post: Post): Array<{ label: string; href: string }> {
  const crumbs = [
    { label: 'Home', href: '/' },
  ];

  // Add primary type as main section
  const primaryType = post.data.types[0];
  const typeLabels: Record<string, string> = {
    blog: 'Blog',
    roadmap: 'Roadmap',
    project: 'Projects',
    literature: 'Literature',
    note: 'Notes',
    guide: 'Guides',
  };

  crumbs.push({
    label: typeLabels[primaryType] || primaryType.charAt(0).toUpperCase() + primaryType.slice(1),
    href: `/${primaryType}`,
  });

  // Add current post
  crumbs.push({
    label: post.data.title,
    href: `/posts/${post.id}`,
  });

  return crumbs;
}

/**
 * Get posts filtered by status
 * @param status - Status to filter by
 * @returns Array of posts with the specified status
 */
export async function getPostsByStatus(
  status: 'draft' | 'published' | 'archived' | 'in-progress' | 'completed' | 'planned'
): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.filter(post => post.data.status === status);
}

/**
 * Get posts by category
 * @param category - Category to filter by
 * @returns Array of posts in the specified category
 */
export async function getPostsByCategory(
  category: 'Research' | 'Technical' | 'Reflection' | 'Resource' | 'Tutorial' | 'Update'
): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.filter(post =>
    post.data.status === 'published' &&
    post.data.category === category
  );
}

/**
 * Get featured posts (posts with featured flag or high engagement)
 * @param limit - Maximum number of featured posts to return
 * @returns Array of featured posts
 */
export async function getFeaturedPosts(limit: number = 5): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) =>
    data.status === 'published'
  );

  // Sort by featured flag, then by date
  const sorted = posts.sort((a, b) => {
    // Check legacy featured field
    const aFeatured = a.data.featured || false;
    const bFeatured = b.data.featured || false;

    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;

    // If both are featured or both are not, sort by date
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sorted.slice(0, limit);
}

/**
 * Get posts for a specific roadmap phase
 * @param phase - Phase number to filter by
 * @returns Array of roadmap posts in the specified phase
 */
export async function getRoadmapPostsByPhase(phase: number): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.filter(post =>
    post.data.status === 'published' &&
    post.data.types.includes('roadmap') &&
    post.data.roadmap?.phase === phase
  );
}

/**
 * Search posts by text query
 * @param query - Search query string
 * @returns Array of posts matching the query
 */
export async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return [];

  const posts = await getCollection('posts', ({ data }) =>
    data.status === 'published'
  );

  const searchTerm = query.toLowerCase();

  return posts.filter(post => {
    const searchableText = [
      post.data.title,
      post.data.description,
      ...(post.data.tags || []),
      post.data.category,
      ...post.data.types,
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}

/**
 * Get post statistics
 * @returns Object containing various statistics about the posts
 */
export async function getPostStats(): Promise<{
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
}> {
  const posts = await getCollection('posts');

  const stats = {
    total: posts.length,
    byType: {} as Record<string, number>,
    byStatus: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
  };

  posts.forEach(post => {
    // Count by type (posts can have multiple types)
    post.data.types.forEach((type: string) => {
      stats.byType[type] = (stats.byType[type] || 0) + 1;
    });

    // Count by status
    stats.byStatus[post.data.status] = (stats.byStatus[post.data.status] || 0) + 1;

    // Count by category
    const category = post.data.category || "Uncategorized";
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
  });

  return stats;
}
