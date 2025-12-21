import { getPosts } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/PostCard'

export default async function BlogList() {
  const posts = await getPosts()

  if (!posts.length) {
    return (
      <p className="text-center text-gray-400">
        Nenhum post encontrado.
      </p>
    )
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}