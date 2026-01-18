import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Q } from "@/src/lib/sanity/queries";
import { sanityFetch } from "@/src/lib/sanity/fetch";
import Pagination from "@/components/Pagination";
import CategoryChips from "@/app/components/blog/CategoryChips";
import BlogEmptyState from "@/app/components/blog/BlogEmptyState";

import type { CategoryProjected, PostCard } from "@/src/lib/sanity/types";

type PageProps = {
  params: { slug: string };
  searchParams?: { page?: string };
};

const LIMIT = 10;

function isValidSlug(input: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input);
}

function parsePage(input: unknown) {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 1) return 1;
  return n;
}

type CategoryWithPosts = CategoryProjected & {
  posts: PostCard[];
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params?.slug || "";
  if (!isValidSlug(slug)) return { title: "TEMA INVÁLIDO" };

  const data = await sanityFetch<CategoryWithPosts | null>(
    Q.categoryBySlugWithPosts,
    { slug },
    60
  );

  if (!data?._id) return { title: "TEMA NÃO ENCONTRADO" };

  return {
    title: (data.title || "TEMA").toUpperCase(),
    description: data.description || `Posts em ${data.title}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const slug = params?.slug || "";
  if (!isValidSlug(slug)) notFound();

  const page = parsePage(searchParams?.page);
  const offset = (page - 1) * LIMIT;

  const category = await sanityFetch<CategoryWithPosts | null>(
    Q.categoryBySlugWithPosts,
    { slug },
    60
  );

  if (!category?._id) notFound();

  const totalCount = await sanityFetch<number>(
    /* groq */ `count(*[_type=="post" && references($catId)])`,
    { catId: category._id },
    60
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / LIMIT));

  const pagedPosts = Array.isArray(category.posts)
    ? category.posts.slice(offset, offset + LIMIT)
    : [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {(category.title || "TEMA").toUpperCase()}
        </h1>

        {category.description ? (
          <p className="mt-3 opacity-80">{category.description}</p>
        ) : null}
      </header>

      {pagedPosts.length === 0 ? (
        <BlogEmptyState
          variant="no-posts"
          title="SEM POSTS NESTE TEMA"
        />
      ) : (
        <section className="grid gap-6">
          {pagedPosts.map((p) => (
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
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={`/blog/temas/${slug}`}
      />
    </main>
  );
}