'use client'

import { useEffect, useRef, useState } from 'react'
import PostCard from '@/components/blog/PostCard'
import type { Post } from '@/lib/types' // ✅ Usa o tipo centralizado

interface Props {
  allPosts: Post[]
  postsPerPage?: number
}

export default function PostList({ allPosts, postsPerPage = 6 }: Props) {
  const [visibleCount, setVisibleCount] = useState(postsPerPage)
  const [isMobile, setIsMobile] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  const visiblePosts = allPosts.slice(0, visibleCount)

  // Detecta mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll infinito para desktop
  useEffect(() => {
    if (isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + postsPerPage)
        }
      },
      { rootMargin: '200px' }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isMobile, postsPerPage])

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {visibleCount < allPosts.length && (
        <div className="flex justify-center mt-10">
          {isMobile ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + postsPerPage)}
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-500 transition"
            >
              Carregar mais posts
            </button>
          ) : (
            <div ref={loaderRef} className="text-gray-400 text-sm">
              Carregando mais posts...
            </div>
          )}
        </div>
      )}
    </div>
  )
}