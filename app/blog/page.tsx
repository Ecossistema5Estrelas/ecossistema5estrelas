import Link from 'next/link'
import { getPosts } from '@/sanity/lib/queries'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <h1 className="text-2xl font-semibold text-white mb-12">
          Blog ArqFuturum
        </h1>

        <div className="space-y-12">
          {posts?.map((post: any) => (
            <article key={post._id} className="space-y-3">

              <h2 className="text-xl font-medium leading-snug">
                <Link
                  href={`/blog/${post.slug?.current}`}
                  className="text-white hover:underline"
                >
                  {post.title || 'Sem título'}
                </Link>
              </h2>

              {post.description && (
                <p className="text-sm text-white/60 leading-relaxed">
                  {post.description}
                </p>
              )}

              {post._createdAt && (
                <p className="text-xs text-white/40">
                  {new Date(post._createdAt).toLocaleDateString('pt-BR')}
                </p>
              )}

            </article>
          ))}
        </div>

      </div>
    </section>
  )
}