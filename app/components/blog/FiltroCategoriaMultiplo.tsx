'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

type FiltroCategoriaMultiploProps = {
  categorias: string[]
}

export default function FiltroCategoriaMultiplo({ categorias }: FiltroCategoriaMultiploProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleToggleCategoria = useCallback(
    (categoria: string) => {
      const params = new URLSearchParams(searchParams)
      const selecionadas = params.getAll('categoria')

      if (selecionadas.includes(categoria)) {
        const filtradas = selecionadas.filter((cat) => cat !== categoria)
        params.delete('categoria')
        filtradas.forEach((cat) => params.append('categoria', cat))
      } else {
        params.append('categoria', categoria)
      }

      replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, replace]
  )

  const categoriasAtivas = searchParams.getAll('categoria')

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {categorias.map((categoria) => {
        const ativa = categoriasAtivas.includes(categoria)
        return (
          <button
            key={categoria}
            onClick={() => handleToggleCategoria(categoria)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              ativa
                ? 'bg-emerald-400 text-black font-semibold'
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

