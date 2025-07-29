'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useMemo, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface Post {
  _id: string
  title: string
  description: string
  slug: { current: string }
  mainImage?: string
  categories?: Category[]
}

interface Props {
  categories: Category[]
  allPosts: Post[]
}

export default function FiltroCategoriasMultiplo({ categories, allPosts }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selecionadas, setSelecionadas] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const param = searchParams.get('categorias')
    if (param) {
      const lista = param.split(',').map((s) => s.trim())
      setSelecionadas(lista)
    } else {
      setSelecionadas([])
    }

    // ✅ Finaliza o loading após transição
    setIsLoading(false)
  }, [searchParams])

  const toggleCategoria = (slug: string) => {
    let atualizadas = [...selecionadas]
    if (atualizadas.includes(slug)) {
      atualizadas = atualizadas.filter((s) => s !== slug)
    } else {
      atualizadas.push(slug)
    }

    const query = atualizadas.length > 0 ? `?categorias=${atualizadas.join(',')}` : ''
    setIsLoading(true)
    startTransition(() => {
      router.push(`/blog${query}`)
    })
  }

  const postsFiltrados = useMemo(() => {
    if (selecionadas.length === 0) return allPosts
    return allPosts.filter((post) =>
      post.categories?.some((cat) => selecionadas.includes(cat.slug.current))
    )
  }, [selecionadas, allPosts])

  return (
    <>
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 mb-6">
        <motion.div
          layout
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {categories.map((cat) => (
            <motion.label
              key={cat._id}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm border transition-all
                ${
                  selecionadas.includes(cat.slug.current)
                    ? 'bg-yellow-400 text-black border-yellow-400'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
            >
              <input
                type="checkbox"
                checked={selecionadas.includes(cat.slug.current)}
                onChange={() => toggleCategoria(cat.slug.current)}
                className="hidden"
              />
              {cat.title}
            </motion.label>
          ))}
        </motion.div>

        <AnimatePresence>
          {selecionadas.length > 0 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => {
                setSelecionadas([])
                setIsLoading(true)
                router.push('/blog')
              }}
              className="text-sm text-red-400 hover:text-red-500 underline ml-auto"
            >
              Limpar filtros
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ✅ Contagem visível de resultados */}
      <p className="text-sm text-gray-400 mb-4">
        {selecionadas.length > 0
          ? `🔎 ${postsFiltrados.length} resultado${postsFiltrados.length !== 1 ? 's' : ''} encontrado${postsFiltrados.length !== 1 ? 's' : ''}`
          : `📰 ${allPosts.length} post${allPosts.length !== 1 ? 's' : ''} no total`}
      </p>

      {/* 💀 Skeleton Loader enquanto carrega */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="animate-pulse bg-white/5 p-4 rounded">
              <div className="bg-white/20 h-48 w-full mb-4 rounded" />
              <div className="h-4 bg-white/20 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {postsFiltrados.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug?.current}`}
              className="bg-white/5 hover:bg-white/10 p-4 rounded transition block"
            >
              {post.mainImage && (
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="rounded mb-4 object-cover h-48 w-full"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-300">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}