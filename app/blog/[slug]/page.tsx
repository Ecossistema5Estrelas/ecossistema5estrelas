import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/clients'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug.current)][].slug.current`
  const slugs: string[] = await client.fetch(query)
  return slugs.map((slug) => ({ slug }))
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body
  }`
  const post = await client.fetch(query, { slug: params.slug })

  return (
    <article className="prose prose-invert max-w-3xl mx-auto py-10">
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </article>
  )
}
