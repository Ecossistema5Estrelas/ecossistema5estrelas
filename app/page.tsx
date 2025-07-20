// app/page.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 px-6 py-20 text-white flex flex-col items-center justify-center text-center space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-emerald-400"
      >
        🛸 ECOSSISTEMA 5ESTRELAS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl text-lg md:text-xl text-zinc-300"
      >
        Um universo digital em construção. Em breve, os primeiros aplicativos 5⭐ serão revelados.
        Enquanto isso, acompanhe o nosso <Link href="/blog" className="text-emerald-400 underline hover:text-white">blog oficial</Link> para atualizações e bastidores da criação.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-zinc-500"
      >
        Versão beta institucional — Plataforma em desenvolvimento contínuo 🚀
      </motion.div>
    </main>
  )
}

