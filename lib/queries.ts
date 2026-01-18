import { groq } from "next-sanity";

import { sanityClient } from "./sanity";

/**
 * ðŸ” Lista de posts do blog
 * Shape CANÃ”NICO Â· frontend-safe Â· anti-post-fantasma
 */
export async function getPosts() {
  return sanityClient.fetch(
    groq`
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(title) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ]
      | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        publishedAt
      }
    `,
    {},
    { cache: "no-store" }
  );
}

/**
 * ðŸ”Ž Post individual por slug
 * Uso exclusivo em /blog/[slug]
 */
export async function getPost(slug: string) {
  return sanityClient.fetch(
    groq`
      *[
        _type == "post" &&
        slug.current == $slug &&
        defined(title) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ][0] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        body,
        excerpt,
        seo
      }
    `,
    { slug },
    { cache: "no-store" }
  );
}
/**
 * 📄 Lista de posts paginada (P1)
 * - mantém o mesmo contrato do PostSummary usado em BlogList.tsx
 * - usa slice GROQ [$start...$end]
 */
export async function getPostsPaginated(opts: { start: number; end: number }) {
  const { start, end } = opts

  return sanityClient.fetch(
    groq`
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(title) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ]
      | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        "slug": slug.current,
        publishedAt
      }
    `,
    { start, end },
    { cache: "no-store" }
  );
}

/**
 * 🔢 Total de posts publicados (P1)
 */
export async function getPostsCount() {
  return sanityClient.fetch(
    groq`
      count(*[
        _type == "post" &&
        defined(slug.current) &&
        defined(title) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ])
    `,
    {},
    { cache: "no-store" }
  );
}