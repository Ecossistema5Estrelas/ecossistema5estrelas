'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { Category } from '@/lib/types'

const emojiMap: Record<string, string> = {
  tecnologia: '💻',
  arte: '🎨',
  noticias: '📰',
  educacao: '📚',
  default: '🏷️',
}

type Props = {
  categorias: Category[]
  multiple?: boolean
}

export default function FiltroCategorias({ categorias, multiple = false }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const categoriaAtual = searchParams.get('categoria') || ''
  const categoriasAtuais = searchParams.get('categorias')?.split(',') || []

  const gerarURL = (slug: string) => {
    if (!multiple) return `/blog?categoria=${slug}`
    let novas = new Set(categoriasAtuais)
    novas.has(slug) ? novas.delete(slug) : novas.add(slug)
    return `/blog?categorias=${[...novas].join(',')}`
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center w-full max-w-5xl">
      <Link
        href="/blog"
        aria-current={!categoriaAtual && categoriasAtuais.length === 0 ? 'true' : undefined}
        className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
          !categoriaAtual && categoriasAtuais.length === 0
            ? 'bg-yellow-400 text-black font-bold shadow-lg scale-105'
            : 'border-white text-white hover:bg-white/10'
        }`}
      >
        🌐 Todos
      </Link>
      {categorias.map((cat) => {
        const slug = cat.slug.current
        const emoji = emojiMap[slug] || emojiMap.default
        const isActive = multiple
          ? categoriasAtuais.includes(slug)
          : categoriaAtual === slug

        return (
          <Link
            key={cat._id}
            href={gerarURL(slug)}
            aria-current={isActive ? 'true' : undefined}
            className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
              isActive
                ? 'bg-yellow-400 text-black font-bold shadow-lg scale-105'
                : 'border-white text-white hover:bg-white/10'
            }`}
          >
            <span className="mr-1">{emoji}</span>
            {cat.title}
          </Link>
        )
      })}
    </div>
  )
}