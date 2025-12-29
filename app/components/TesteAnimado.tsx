'use client'

import { motion } from 'framer-motion'

export default function TesteAnimado(): JSX.Element {
  return (
    <div
      className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900 px-4 py-16 text-white"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-5xl font-bold">🌟 Teste Animado</h1>
        <p className="text-lg text-zinc-400">
          Exemplo isolado de animação suave com Framer Motion.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer rounded-xl bg-zinc-800 px-6 py-3 shadow-lg"
      >
        <p className="font-semibold text-white">Interaja comigo!</p>
      </motion.div>
    </div>
  )
}