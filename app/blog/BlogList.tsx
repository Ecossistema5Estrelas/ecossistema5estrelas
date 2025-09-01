import { useEffect, useState } from 'react'
import Link from 'next/link'

type Post = { _id: string; slug?: { current: string }; title: string; excerpt?: string; publishedAt?: string }

export default function BlogList() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let aborted = false
    ;(async () => {
      try {
        const res = await fetch('/api/posts', { next: { revalidate: 60 } })
        const data = res.ok ? await res.json() : { posts: [] }
        if (!aborted) setPosts(data.posts ?? [])
      } finally {
        if (!aborted) setLoading(false)
      }
    })()
    return () => { aborted = true }
  }, [])

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-8 text-zinc-300">Carregando publicações…</div>
  if (!posts || posts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 shadow-lg shadow-black/40">
          <h2 className="text-xl font-bold mb-2">📚 Blog</h2>
          <p className="text-zinc-300">Nenhum post disponível no momento.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      {posts.map((post) => {
        const href = post.slug?.current ? `/blog/${post.slug.current}` : '#'
        return (
          <article key={post._id} className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-lg shadow-black/40 hover:bg-black/40 transition">
            <h3 className="text-lg font-semibold"><Link href={href} className="hover:underline">{post.title}</Link></h3>
            {post.excerpt && <p className="mt-2 text-sm text-zinc-300 line-clamp-3">{post.excerpt}</p>}
            {post.publishedAt && <time className="mt-3 block text-xs text-zinc-400">{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</time>}
          </article>
        )
      })}
    </div>
  )
}


