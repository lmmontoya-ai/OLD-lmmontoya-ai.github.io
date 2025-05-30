#!/usr/bin/env node
/**
 * Generate Static Search Index for GitHub Pages
 * Creates a searchable JSON index of all published posts
 * Compatible with Fuse.js search expectations
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  contentDir: join(__dirname, '../src/content/posts'),
  outputDir: join(__dirname, '../public/api'),
  outputFile: 'posts.json',
  excerptLength: 280, // Match schema constraint
};

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('No frontmatter found');
  }

  const frontmatter = match[1];
  const body = content.slice(match[0].length).trim();

  // Simple YAML parsing for our use case
  const data = {};
  const lines = frontmatter.split('\n');
  let currentKey = null;
  let arrayBuffer = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle array items
    if (trimmed.startsWith('- ')) {
      if (currentKey) {
        arrayBuffer.push(trimmed.slice(2).trim().replace(/['"]/g, ''));
      }
      continue;
    }

    // Flush array buffer
    if (arrayBuffer.length > 0 && currentKey) {
      data[currentKey] = arrayBuffer;
      arrayBuffer = [];
      currentKey = null;
    }

    // Handle key-value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex).trim();
      let value = trimmed.slice(colonIndex + 1).trim();

      // Remove quotes
      value = value.replace(/^['"]|['"]$/g, '');

      if (value === '') {
        // This might be an array start
        currentKey = key;
        continue;
      }

      // Type conversion
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value) && value !== '') value = Number(value);
      else if (value.match(/^\d{4}-\d{2}-\d{2}/)) {
        // Parse date
        value = new Date(value);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Parse JSON arrays
        try {
          value = JSON.parse(value);
        } catch {
          // Keep as string if not valid JSON
        }
      }

      data[key] = value;
    }
  }

  // Flush final array buffer
  if (arrayBuffer.length > 0 && currentKey) {
    data[currentKey] = arrayBuffer;
  }

  return { data, body };
}

/**
 * Extract searchable text content from markdown
 */
function extractContent(markdown) {
  // Remove markdown syntax but keep the text
  return markdown
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/#{1,6}\s/g, '') // Remove heading markers
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove emphasis
    .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s/gm, '') // Remove numbered list markers
    .replace(/\n\s*\n/g, '\n') // Normalize line breaks
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Generate excerpt from content
 */
function generateExcerpt(content, maxLength = CONFIG.excerptLength) {
  const cleaned = extractContent(content);

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Find the last complete sentence within the limit
  const truncated = cleaned.slice(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastExclamation = truncated.lastIndexOf('!');

  const lastPunctuation = Math.max(lastSentence, lastQuestion, lastExclamation);

  if (lastPunctuation > maxLength * 0.7) {
    return truncated.slice(0, lastPunctuation + 1);
  }

  // Fallback to word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Process a single MDX file
 */
function processPost(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { data, body } = parseFrontmatter(content);

    // Skip if not published
    if (data.status !== 'published') {
      return null;
    }

    // Extract filename as slug if not provided
    const filename = filePath.split('/').pop().replace('.mdx', '');
    const slug = data.slug || filename;

    // Generate excerpt if not provided
    const excerpt = data.excerpt || generateExcerpt(body);

    // Extract searchable content
    const searchableContent = extractContent(body);

    // Build search index entry
    const searchEntry = {
      title: data.title,
      slug: slug,
      excerpt: excerpt,
      content: searchableContent.slice(0, 1000), // Limit content for performance
      types: Array.isArray(data.types) ? data.types : (data.types ? [data.types] : []),
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      date: data.date ? new Date(data.date).toISOString() : null,
      href: `/posts/${slug}`,

      // Additional searchable fields
      ...(data.project?.area && { projectArea: data.project.area }),
      ...(data.literature?.authors && { authors: data.literature.authors }),
      ...(data.roadmap?.phase && { roadmapPhase: data.roadmap.phase }),
    };

    return searchEntry;
  } catch (error) {
    console.warn(`Warning: Failed to process ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Main function to generate search index
 */
async function generateSearchIndex() {
  try {
    console.log('🔍 Generating search index...');

    // Find all MDX files in content directory
    const pattern = join(CONFIG.contentDir, '**/*.mdx').replace(/\\/g, '/');
    const files = await glob(pattern);

    console.log(`📄 Found ${files.length} content files`);

    // Process all files
    const searchEntries = [];
    for (const file of files) {
      // Skip template files
      if (file.includes('_templates/')) {
        continue;
      }

      const entry = processPost(file);
      if (entry) {
        searchEntries.push(entry);
      }
    }

    console.log(`✅ Processed ${searchEntries.length} published posts`);

    // Sort by date (newest first)
    searchEntries.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Ensure output directory exists
    mkdirSync(CONFIG.outputDir, { recursive: true });

    // Write search index
    const outputPath = join(CONFIG.outputDir, CONFIG.outputFile);
    writeFileSync(outputPath, JSON.stringify(searchEntries, null, 2));

    console.log(`🎯 Search index generated: ${outputPath}`);
    console.log(`📊 Index contains ${searchEntries.length} searchable posts`);

    // Generate summary stats
    const stats = {
      total: searchEntries.length,
      byType: {},
      byCategory: {},
    };

    searchEntries.forEach(post => {
      // Ensure types is an array
      const types = Array.isArray(post.types) ? post.types : [];
      types.forEach(type => {
        stats.byType[type] = (stats.byType[type] || 0) + 1;
      });

      if (post.category) {
        stats.byCategory[post.category] = (stats.byCategory[post.category] || 0) + 1;
      }
    });

    console.log('📈 Content Statistics:');
    console.log('  By Type:', stats.byType);
    console.log('  By Category:', stats.byCategory);

  } catch (error) {
    console.error('❌ Failed to generate search index:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSearchIndex();
}

export { generateSearchIndex };
