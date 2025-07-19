// app/blog/page.tsx
import { client } from '@/sanity/lib/clients'
import Link from 'next/link'
import { groq } from 'next-sanity'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

const query = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt
}`

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(query)

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">📚 Blog 5ESTRELAS</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`} className="text-xl text-indigo-500 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-400">Publicado em {new Date(post.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
