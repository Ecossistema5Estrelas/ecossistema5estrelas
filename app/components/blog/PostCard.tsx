'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

type PostCardProps = {
  post: {
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
    categories?: { title: string }[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  // 🚨 Blindagem para slug null ou vazio
  if (!post?.slug?.current) {
    return null // Não renderiza se o slug não existir
  }

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-shadow duration-300 border border-zinc-800">
      {post.mainImage?.asset?.url && (
        <Image
          src={urlForImage(post.mainImage).width(800).height(400).url()}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{post.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{post.description}</p>
        {post.categories && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-emerald-600 text-xs text-black px-2 py-0.5 rounded-full font-semibold"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug.current}`}
          className="inline-block mt-4 text-emerald-400 hover:underline text-sm font-medium"
        >
          Ler mais →
        </Link>
      </div>
    </div>
  )
}