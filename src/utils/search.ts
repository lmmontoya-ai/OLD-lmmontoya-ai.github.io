// src/utils/search.ts
// Client-side search utility for GitHub Pages static deployment

import Fuse, { type FuseResult, type FuseResultMatch } from 'fuse.js';

export interface SearchDocument {
  title: string;
  slug: string;
  description: string;
  content: string;
  types: string[];
  category: string;
  tags: string[];
  date: string | null;
  href: string;
  // Optional specialized fields
  projectArea?: string;
  authors?: string[];
  roadmapPhase?: number;
}

export interface SearchResult {
  item: SearchDocument;
  score?: number;
  matches?: readonly FuseResultMatch[];
}

class SearchManager {
  private fuse: Fuse<SearchDocument> | null = null;
  private documents: SearchDocument[] = [];
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;
  private isInitialized = false;

  /**
   * Initialize the search manager by loading the search index
   */
  async initialize(): Promise<void> {
    // Prevent multiple simultaneous loads
    if (this.loadPromise) {
      return this.loadPromise;
    }

    if (this.isInitialized) {
      return;
    }

    this.loadPromise = this.loadDocuments();
    await this.loadPromise;
    this.loadPromise = null;
    this.isInitialized = true;
  }

  /**
   * Load search documents from the static JSON file
   */
  private async loadDocuments(): Promise<void> {
    try {
      this.isLoading = true;

      // Fetch the search index with cache busting
      const response = await fetch(`/api/posts.json?v=${Date.now()}`, {
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.status}`);
      }

      this.documents = await response.json();

      // Configure Fuse.js with optimized settings for content search
      this.fuse = new Fuse(this.documents, {
        keys: [
          { name: 'title', weight: 0.3 },
          { name: 'description', weight: 0.25 },
          { name: 'content', weight: 0.2 },
          { name: 'tags', weight: 0.15 },
          { name: 'category', weight: 0.1 },
        ],
        threshold: 0.4, // More lenient for better matches
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true,
        ignoreLocation: true, // Better for long content
        findAllMatches: true,
      });

      console.log(`🔍 Search initialized with ${this.documents.length} documents`);

    } catch (error) {
      console.warn('⚠️ Failed to initialize search:', error);
      // Graceful fallback - search will be disabled but won't break the site
      this.documents = [];
      this.fuse = null;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Perform a search query
   */
  search(query: string): SearchResult[] {
    if (!this.fuse || !query.trim()) {
      return [];
    }

    const results = this.fuse.search(query);

    // Return up to 20 results to avoid overwhelming the UI
    return results.slice(0, 20) as SearchResult[];
  }

  /**
   * Get all documents for browsing/filtering
   */
  getAllDocuments(): SearchDocument[] {
    return this.documents;
  }

  /**
   * Filter documents by type
   */
  getDocumentsByType(type: string): SearchDocument[] {
    return this.documents.filter(doc => doc.types.includes(type));
  }

  /**
   * Filter documents by category
   */
  getDocumentsByCategory(category: string): SearchDocument[] {
    return this.documents.filter(doc => doc.category === category);
  }

  /**
   * Filter documents by tag
   */
  getDocumentsByTag(tag: string): SearchDocument[] {
    return this.documents.filter(doc => doc.tags.includes(tag));
  }

  /**
   * Get recent documents
   */
  getRecentDocuments(limit: number = 10): SearchDocument[] {
    return this.documents
      .filter(doc => doc.date)
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
      .slice(0, limit);
  }

  /**
   * Get search suggestions based on partial query
   */
  getSuggestions(partialQuery: string, limit: number = 5): string[] {
    if (!partialQuery.trim() || partialQuery.length < 2) {
      return [];
    }

    const query = partialQuery.toLowerCase();
    const suggestions = new Set<string>();

    // Add title matches
    this.documents.forEach(doc => {
      if (doc.title.toLowerCase().includes(query)) {
        suggestions.add(doc.title);
      }
    });

    // Add tag matches
    this.documents.forEach(doc => {
      doc.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Check if search is available
   */
  isAvailable(): boolean {
    return this.fuse !== null && this.isInitialized;
  }

  /**
   * Check if search is currently loading
   */
  isLoadingData(): boolean {
    return this.isLoading;
  }

  /**
   * Get search statistics
   */
  getStats(): {
    totalDocuments: number;
    byType: Record<string, number>;
    byCategory: Record<string, number>;
  } {
    const stats = {
      totalDocuments: this.documents.length,
      byType: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
    };

    this.documents.forEach(doc => {
      doc.types.forEach(type => {
        stats.byType[type] = (stats.byType[type] || 0) + 1;
      });
      stats.byCategory[doc.category] = (stats.byCategory[doc.category] || 0) + 1;
    });

    return stats;
  }
}

// Export singleton instance for global use
export const searchManager = new SearchManager();

// Export search utilities
export { SearchManager };
