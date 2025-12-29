import PostCard from './PostCard'
import type { Post } from '@/lib/types'

type PostListProps = {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Nenhum post encontrado.
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}