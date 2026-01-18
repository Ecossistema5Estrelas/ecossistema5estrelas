import type { SanityImageRef, SanitySlug } from "./client";

// --- category.ts (schema)
// fields: title, slug, description
export type Category = {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
  description?: string;
};

// --- post.ts (schema)
// fields: title, slug, author, mainImage, categories, publishedAt, body
export type AuthorRef = { _type: "reference"; _ref: string };
export type CategoryRef = { _type: "reference"; _ref: string };

export type Post = {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  author?: AuthorRef;
  mainImage?: SanityImageRef;
  categories?: CategoryRef[];
  publishedAt?: string;
  body?: unknown; // PortableText blocks (blockContent)
};

// Projeções usadas no frontend
export type CategoryProjected = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: any;
  categories?: { _id: string; title: string; slug: { current: string } }[];
};
