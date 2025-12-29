'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

type FiltroCategoriaProps = {
  categorias: string[]
}

export default function FiltroCategoria({
  categorias,
}: FiltroCategoriaProps): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleFiltro = useCallback(
    (categoria: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (params.get('categoria') === categoria) {
        params.delete('categoria')
      } else {
        params.set('categoria', categoria)
      }

      const query = params.toString()
      const url = query ? `${pathname}?${query}` : pathname

      router.replace(url)
    },
    [searchParams, pathname, router]
  )

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      {categorias.map((categoria) => {
        const ativa = searchParams.get('categoria') === categoria

        return (
          <button
            key={categoria}
            type="button"
            aria-pressed={ativa}
            onClick={() => handleFiltro(categoria)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              ativa
                ? 'bg-yellow-500 font-semibold text-black'
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