'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

type FiltroCategoriaMultiploProps = {
  categorias: string[]
}

export default function FiltroCategoriaMultiplo({
  categorias,
}: FiltroCategoriaMultiploProps): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleToggleCategoria = useCallback(
    (categoria: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const selecionadas = params.getAll('categoria')

      if (selecionadas.includes(categoria)) {
        const restantes = selecionadas.filter((cat) => cat !== categoria)
        params.delete('categoria')
        restantes.forEach((cat) => params.append('categoria', cat))
      } else {
        params.append('categoria', categoria)
      }

      const query = params.toString()
      const url = query ? `${pathname}?${query}` : pathname

      router.replace(url)
    },
    [searchParams, pathname, router]
  )

  const categoriasAtivas = searchParams.getAll('categoria')

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      {categorias.map((categoria) => {
        const ativa = categoriasAtivas.includes(categoria)

        return (
          <button
            key={categoria}
            type="button"
            aria-pressed={ativa}
            onClick={() => handleToggleCategoria(categoria)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              ativa
                ? 'bg-emerald-400 font-semibold text-black'
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