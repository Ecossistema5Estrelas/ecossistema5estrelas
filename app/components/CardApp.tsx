'use client'

import Link from 'next/link'

interface CardAppProps {
  titulo: string
  descricao: string
  emoji: string
  href: string
}

export default function CardApp({ titulo, descricao, emoji, href }: CardAppProps) {
  return (
    <Link
      href={href}
      className="bg-white/5 hover:bg-white/10 transition p-6 rounded-xl shadow-md text-white flex flex-col items-start gap-2"
    >
      <span className="text-3xl">{emoji}</span>
      <h3 className="text-xl font-bold">{titulo}</h3>
      <p className="text-sm text-gray-300">{descricao}</p>
    </Link>
  )
}