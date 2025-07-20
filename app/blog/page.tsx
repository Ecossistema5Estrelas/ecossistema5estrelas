// app/blog/page.tsx
'use client'

import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/clients'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: { asset: { url: string } }
}

const query = groq`*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  mainImage {
    asset->{url}
  }
}`

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(query)

  return (
    <main className="min-h-screen bg-zinc-900 text-white py-12 px-4 md:px-12">
      <h1 className="text-4xl font-bold mb-8 text-center">📰 Blog 5ESTRELAS</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <Link href={`/blog/${post.slug.current}`} className="block group">
              {post.mainImage?.asset?.url && (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:underline">{post.title}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
