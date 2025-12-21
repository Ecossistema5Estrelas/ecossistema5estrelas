'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type CardAppProps = {
  emoji: string
  titulo: string
  descricao: string
  href: string
}

export default function CardApp({ emoji, titulo, descricao, href }: CardAppProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-md transition-colors hover:border-yellow-500 hover:bg-zinc-800"
    >
      <Link href={href as any} className="flex flex-col h-full justify-between">
        <div>
          <div className="text-5xl">{emoji}</div>
          <h2 className="mt-2 text-xl font-bold text-white group-hover:text-yellow-300">
            {titulo}
          </h2>
          <p className="mt-1 text-sm text-gray-400">{descricao}</p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-yellow-400 group-hover:underline">
          Acessar
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}