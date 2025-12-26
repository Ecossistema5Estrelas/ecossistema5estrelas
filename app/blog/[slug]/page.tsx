import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

import { getPost } from '@/sanity/lib/queries'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  return {
    title: post.title,
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-14 mb-6 text-2xl font-semibold">
        {children}
      </h2>
    ),
    normal: ({ children }: any) => (
      <p className="mt-6 leading-relaxed text-white/90">
        {children}
      </p>
    ),
  },
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <Link
            href="/blog"
            className="text-sm text-white/60 hover:text-white transition"
          >
            ← Voltar para o Blog
          </Link>
        </div>

        <article
          className="
            prose prose-invert
            max-w-none
            prose-h2:text-2xl
            prose-h2:font-semibold
            prose-h2:mt-14
            prose-h2:mb-6
            prose-p:leading-relaxed
            prose-p:mt-6
            prose-p:text-white/90
          "
        >
          <h1 className="mb-10 text-3xl font-extrabold tracking-tight text-white">
            {post.title}
          </h1>

          {post.body && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
        </article>

      </div>
    </section>
  )
}