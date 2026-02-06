import { groq } from "next-sanity";

// AJUSTE ESTE IMPORT para o padrão real do seu repo (descoberto no Gate 1)
// Exemplo comum:
// import { sanityFetch } from "../../src/lib/sanity/fetch";
import { sanityFetch } from "../../src/lib/sanity/fetch";

export const HUB_PAGE_SIZE = 10;

export async function getHubPosts(page: number) {
  const pageSafe = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const start = (pageSafe - 1) * HUB_PAGE_SIZE;
  const end = start + HUB_PAGE_SIZE;

  const query = groq`*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) [${start}...${end}]{
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _createdAt
  }`;

  return sanityFetch(query);
}

export async function getHubPostsCount() {
  const query = groq`count(*[_type == "post"])`;
  return sanityFetch(query);
}