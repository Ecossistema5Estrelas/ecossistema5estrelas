import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/clients'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  body: PortableTextBlock[]
}

export const revalidate = 60

const query = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  body
}`

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1>Post não encontrado ❌</h1>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-white">
      <Link href="/blog" className="text-yellow-400 underline hover:text-yellow-200 mb-4 inline-block">
        ← Voltar para o Blog
      </Link>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        📅 {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
      </p>

      <article className="prose prose-invert">
        <PortableText value={post.body} />
      </article>
    </main>
  )
}
