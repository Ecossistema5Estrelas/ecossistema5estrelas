'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type BotaoVoltarProps = {
  href?: string
  texto?: string
}

export default function BotaoVoltar({
  href,
  texto = 'Voltar',
}: BotaoVoltarProps) {
  const router = useRouter()

  const content = (
    <>
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {texto}
    </>
  )

  // Se href foi passado → navegação explícita
  if (href) {
    return (
      <Link
        href={href as any}
        className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        {content}
      </Link>
    )
  }

  // Caso contrário → voltar no histórico
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      {content}
    </button>
  )
}