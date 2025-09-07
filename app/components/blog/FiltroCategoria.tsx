"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

type FiltroCategoriaProps = {
  categorias: string[]
}

export default function FiltroCategoria({ categorias }: FiltroCategoriaProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleFiltro = useCallback(
    (categoria: string) => {
      const params = new URLSearchParams(searchParams)
      if (params.get('categoria') === categoria) {
        params.delete('categoria')
      } else {
        params.set('categoria', categoria)
      }
      replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, replace]
  )

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {categorias.map((categoria) => {
        const ativa = searchParams.get('categoria') === categoria
        return (
          <button
            key={categoria}
            onClick={() => handleFiltro(categoria)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              ativa
                ? 'bg-yellow-500 text-black font-semibold'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            {categoria}
          </button>
        )
      })}
    </div>
  )
}


