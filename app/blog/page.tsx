import type { Metadata } from "next";
import { parseBlogNav } from "@/lib/blog/e4-nav";
import Link from "next/link";

import { Q } from "@/src/lib/sanity/queries";
import { sanityFetch } from "@/src/lib/sanity/fetch";
import Pagination from "@/components/Pagination";
import CategoryChips from "@/app/components/blog/CategoryChips";
import BlogEmptyState from "@/app/components/blog/BlogEmptyState";

import type { PostCard } from "@/src/lib/sanity/types";

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
  const nav = parseBlogNav(searchParams);
}: {
  searchParams?: { page?: string };
}) {
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

      <section className="grid gap-6">
        {posts.map((p) => (
          <article
            key={p._id}
            className="rounded-2xl border border-white/10 p-4"
          >
            <Link href={`/blog/${p.slug?.current || ""}`}>
              <h2 className="text-lg font-semibold">{p.title}</h2>
            </Link>

            <CategoryChips
              categories={p.categories}
              className="mt-2"
            />

            {p.publishedAt ? (
              <p className="mt-2 text-sm opacity-60">
                {new Date(p.publishedAt).toLocaleDateString("pt-BR")}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/blog"
      />
    </main>
  );
}

