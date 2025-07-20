// app/blog/[slug]/page.tsx
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/clients'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{ title }`,
    { slug: params.slug }
  )

  if (!post) return { title: 'Post não encontrado | Blog 5ESTRELAS' }

  return { title: `${post.title} | Blog 5ESTRELAS` }
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage {
    asset->{url}
  }
}`

export default async function PostPage({ params }: Props) {
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-zinc-900 text-white px-6 py-12 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        {post.mainImage?.asset?.url && (
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg mb-8"
          />
        )}

        <div className="prose prose-invert max-w-none leading-relaxed text-lg">
          <PortableText value={post.body} />
        </div>
      </div>
    </main>
  )
}
