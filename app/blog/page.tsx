import Link from "next/link";

import { Q } from "../../src/lib/sanity/queries";
import { sanityFetch } from "../../src/lib/sanity/fetch";
import { parseBlogNav } from "../../src/lib/blog/e4-nav";
import Pagination from "../../components/Pagination";
import CategoryChips from "../components/blog/CategoryChips";
import BlogEmptyState from "../components/blog/BlogEmptyState";

import type { Metadata } from "next";
import type { PostCard } from "../../src/lib/sanity/types";

const LIMIT = 10;

function parsePage(input: unknown) {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 1) return 1;
  return n;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Publicações do Ecossistema 5⭐",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  parseBlogNav(searchParams ?? {});

  const page = parsePage(searchParams?.page);
  const offset = (page - 1) * LIMIT;

  const posts = await sanityFetch<PostCard[]>(
    Q.postsLatest,
    { limit: LIMIT, offset },
    60
  );

  const totalCount = await sanityFetch<number>(
    /* groq */ `count(*[_type=="post"])`,
    {},
    60
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / LIMIT));

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">BLOG</h1>
        <BlogEmptyState variant="no-posts" />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">BLOG</h1>

      <CategoryChips />

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-xl font-medium">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Pagination basePath="/blog" currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
