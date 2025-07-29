'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'
import { motion } from 'framer-motion'

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow hover:shadow-xl transition-all"
    >
      <Link href={`/blog/${post.slug.current}`} className="block">
        {/* Imagem de capa com fallback */}
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          {post.mainImage ? (
            <Image
              src={post.mainImage}
              alt={post.title ?? 'Imagem do post'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-sm">
              📷 Imagem não disponível
            </div>
          )}
        </div>

        {/* Conteúdo do card */}
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-bold text-purple-200 group-hover:text-yellow-400 transition line-clamp-2">
            {post.title ?? 'Sem título'}
          </h2>

          <p className="text-sm text-zinc-300 line-clamp-3">
            {post.description ?? 'Este post ainda não possui descrição.'}
          </p>

          {/* Categorias */}
          {Array.isArray(post.categories) && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-yellow-300">
              {post.categories.map((cat) => (
                <span
                  key={cat._id}
                  className="px-2 py-1 rounded-full bg-black/30 border border-yellow-500/20"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Autor */}
          {post.author?.name && (
            <p className="text-sm text-zinc-400 italic mt-2">
              Por {post.author.name}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}