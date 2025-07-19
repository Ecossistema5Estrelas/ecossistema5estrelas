// /app/blog/page.tsx
import { client } from '@/sanity/lib/clients'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60 // Revalidação a cada 60 segundos

export default async function BlogPage() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...10]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset -> {
        url
      }
    }
  }`

  const posts = await client.fetch(query)

  return (
    <main className="min-h-screen p-6 bg-gradient-main text-white">
      <h1 className="text-4xl font-bold mb-8">📰 Blog 5ESTRELAS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-lg shadow hover:scale-105 transition"
          >
            {post.mainImage?.asset?.url && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-300 mt-1">
              🗓️ {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
