'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Route } from 'next'

import { urlForImage } from '@/lib/sanityImage'

type PostCategory = {
  title: string
}

type PostCardPost = {
  _id: string
  title: string
  description: string
  slug: {
    current: string
  }
  mainImage?: {
    asset?: {
      _ref?: string
      _id?: string
      url?: string
    }
  }
  categories?: PostCategory[]
}

type PostCardProps = {
  post: PostCardPost
}

export default function PostCard({
  post,
}: PostCardProps): JSX.Element | null {
  // ðŸš¨ Blindagem: slug Ã© obrigatÃ³rio para navegaÃ§Ã£o
  if (!post?.slug?.current) {
    return null
  }

  const href = `/blog/${post.slug.current}` as Route

  return (
    <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg transition-shadow duration-300 hover:shadow-emerald-500/20">
      {post.mainImage?.asset?.url && (
        <Image
          src={urlForImage(post.mainImage).width(800).height(400).url()}
          alt={post.title}
          width={800}
          height={400}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="space-y-3 p-4">
        <h2 className="text-xl font-semibold text-white">{post.title}</h2>

        <p className="text-sm text-gray-400">{post.description}</p>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.categories.map((cat) => (
              <span
                key={cat.title}
                className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-black"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <Link
          href={href}
          aria-label={`Ler o post ${post.title}`}
          className="inline-block text-sm font-medium text-emerald-400 hover:underline"
        >
          Ler mais â†’
        </Link>
      </div>
    </article>
  )
}
