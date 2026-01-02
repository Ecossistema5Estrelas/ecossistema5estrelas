export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity'
import portableTextComponents from '@/components/portableTextComponents'

const query = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  publishedAt
}
`

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await sanityClient.fetch(
    query,
    { slug: params.slug },
    { cache: 'no-store' }
  )

  // 🔒 Post inexistente
  if (!post) {
    notFound()
  }

  // 🔒 BODY INVÁLIDO → NÃO RENDERIZA
  if (!Array.isArray(post.body)) {
    console.error('[BLOG] Body inválido para slug:', params.slug, post.body)
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        {post.title}
      </h1>

      <PortableText
        value={post.body}
        components={portableTextComponents}
      />
    </article>
  )
}
