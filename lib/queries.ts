import { groq } from "next-sanity";
import { sanityClient } from "./sanity";

/**
 * 🔍 Lista de posts do blog
 * Shape CANÔNICO (slug estrutural)
 */
export async function getPosts() {
  return sanityClient.fetch(
    groq`*[
      _type == "post" &&
      defined(slug.current) &&
      defined(title) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ]
    | order(publishedAt desc) {
      _id,
      title,
      slug,           // ⚠️ NÃO achatar
      publishedAt
    }`,
    {},
    { cache: "no-store" }
  );
}

/**
 * 🔎 Post individual por slug
 * Usado em /blog/[slug]
 */
export async function getPost(slug: string) {
  return sanityClient.fetch(
    groq`*[
      _type == "post" &&
      slug.current == $slug &&
      defined(title) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ][0] {
      _id,
      title,
      slug,
      publishedAt,
      body,
      excerpt,
      seo
    }`,
    { slug },
    { cache: "no-store" }
  );
}