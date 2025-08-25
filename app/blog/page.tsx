import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  readingTime?: string;
  publishedAt?: string;
};

const POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc)[0..19]{
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  "coverImage": coalesce(coverImage.asset->url, ""),
  "readingTime": coalesce(readingTime, "4 min"),
  publishedAt
}`;

export default async function Page() {
  const posts: Post[] = await client.fetch(POSTS_QUERY);

  return (
    <main className="container mx-auto max-w-3xl p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-zinc-400">Últimos artigos</p>
      </header>

      <ul className="space-y-6">
        {posts.map((post: Post) => (
          <li key={post._id} className="p-4 rounded-lg bg-zinc-800">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.excerpt && (
              <p className="text-zinc-400 mt-1">{post.excerpt}</p>
            )}
            <div className="text-xs text-zinc-500 mt-2">
              {post.publishedAt ?? ""} · {post.readingTime ?? "4 min"}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
