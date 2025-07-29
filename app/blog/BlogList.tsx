'use client'

import { useEffect, useState } from 'react'
import { getPosts } from '@/sanity/lib/queries'
import { Post } from '@/lib/types'

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getPosts()
      setPosts(allPosts)
    }

    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map((post: Post, index: number) => (
        <div key={post._id} className="mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.description}</p>
        </div>
      ))}
    </div>
  )
}