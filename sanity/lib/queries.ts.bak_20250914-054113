// @ts-nocheck
import { groq } from "next-sanity";
import { sanityFetch } from "./sanityFetch";
import type { Post, Category } from "@/lib/types";

export async function getAllPosts(): Promise<Post[]> {
  const query = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
    _id,
    title,
    slug,
    publishedAt,
    _updatedAt,
    _createdAt,
    excerpt,
    mainImage,
    author->{_id, name, image},
    categories[]->{_id, title, slug}
  } | order(coalesce(_updatedAt, _createdAt, publishedAt) desc)`;
  return sanityFetch<Post[]>(query);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    _updatedAt,
    _createdAt,
    excerpt,
    body,
    mainImage,
    author->{_id, name, image},
    categories[]->{_id, title, slug}
  }`;
  return sanityFetch<Post | null>(query, { slug });
}

export async function getAllCategories(): Promise<Category[]> {
  const query = groq`*[_type == "category"]{
    _id, title, slug, description
  } | order(title asc)`;
  return sanityFetch<Category[]>(query);
}

