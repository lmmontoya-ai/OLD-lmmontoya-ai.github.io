import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const RoadmapEntry = defineDocumentType(() => ({
  name: "RoadmapEntry",
  filePathPattern: `roadmap/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    status: { type: "enum", options: ["done", "now", "next"], required: true },
    excerpt: { type: "string", required: true },
    x: { type: "number", required: true },
    y: { type: "number", required: true },
    dependencies: { type: "list", of: { type: "string" }, required: false },
    outcomes: { type: "list", of: { type: "string" }, required: false },
    link: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^roadmap\//, ""),
    },
  },
}));

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    area: {
      type: "enum",
      options: ["Interpretability", "Alignment", "Tooling", "Safety"],
      required: true,
    },
    collaborators: { type: "list", of: { type: "string" }, required: false },
    organization: { type: "string", required: false },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    github_link: { type: "string", required: false },
    paper_link: { type: "string", required: false },
    hero_image: { type: "string", required: true },
    featured: { type: "boolean", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^projects\//, ""),
    },
  },
}));

const LiteratureItem = defineDocumentType(() => ({
  name: "LiteratureItem",
  filePathPattern: `literature/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    year: { type: "number", required: true },
    link: { type: "string", required: true },
    category: {
      type: "enum",
      options: ["Paper", "Blog", "Video", "Book", "Course"],
      required: true,
    },
    tags: { type: "list", of: { type: "string" }, required: true },
    rating: { type: "number", required: true },
    difficulty: {
      type: "enum",
      options: ["Introductory", "Intermediate", "Advanced"],
      required: true,
    },
    note: { type: "string", required: true },
    recommended_for: { type: "list", of: { type: "string" }, required: false },
    related_items: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^literature\//, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [RoadmapEntry, Project, LiteratureItem],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex],
  },
});
