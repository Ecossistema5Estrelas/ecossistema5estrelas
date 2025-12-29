import { getPosts } from '@/lib/queries'
import BlogList from './BlogList'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="mx-auto max-w-3xl py-16 px-4">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>

      {/* DEBUG CANÔNICO — remover depois */}
      <div className="mb-6 text-sm text-red-600">
        Total de posts recebidos: {posts.length}
      </div>

      <BlogList posts={posts} />
    </main>
  )
}