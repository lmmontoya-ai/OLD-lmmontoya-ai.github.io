import { getCollection, type CollectionEntry } from 'astro:content';

export interface GraphNode {
  id: string;
  label: string;
  data: CollectionEntry<'posts'>;
  position: { x: number; y: number };
  className?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

/**
 * Build roadmap graph data from posts collection.
 */
export async function getRoadmapGraph() {
  const posts = await getCollection('posts');
  const roadmapPosts = posts.filter(p => p.data.types.includes('roadmap'));

  const nodes: GraphNode[] = roadmapPosts.map(post => {
    const phase = post.data.roadmap?.phase ?? 0;
    const index = roadmapPosts.filter(p => (p.data.roadmap?.phase ?? 0) === phase).indexOf(post);
    const x = post.data.roadmap?.x ?? phase * 300;
    const y = post.data.roadmap?.y ?? 100 + index * 150;

    const className = post.data.status;
    return {
      id: post.data.slug,
      label: post.data.title,
      data: post,
      position: { x, y },
      className,
    };
  });

  const edges: GraphEdge[] = [];
  roadmapPosts.forEach(post => {
    const deps = post.data.roadmap?.dependencies || [];
    deps.forEach(dep => {
      edges.push({
        id: `${dep}->${post.data.slug}`,
        source: dep,
        target: post.data.slug,
      });
    });
  });

  return { nodes, edges, posts: roadmapPosts };
}
