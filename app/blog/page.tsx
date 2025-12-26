import Link from 'next/link'

import { getPosts } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPosts()

  if (!posts || posts.length === 0) {
    return <p>Nenhum post publicado.</p>
  }

  return (
    <main className="mx-auto max-w-3xl py-16 px-4">
      <h1 className="mb-8 text-3xl font-bold">
        Blog
      </h1>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug.current}>
            <Link
              href={`/blog/${post.slug.current}`}
              className="text-xl font-semibold text-white hover:underline"
            >
              {post.title}
            </Link>

            <div className="mt-1 text-sm text-white/60">
              {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}