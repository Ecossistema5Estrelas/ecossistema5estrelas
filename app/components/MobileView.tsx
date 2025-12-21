'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const MobileView = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 p-6 bg-black/90 text-white shadow-md rounded-2xl"
    >
      <Link href="/blog" className="text-xl hover:text-yellow-300 transition-colors">
        📚 Blog
      </Link>
      <Link href="/contato" className="text-xl hover:text-blue-400 transition-colors">
        📬 Contato
      </Link>
      <Link href="/sobre" className="text-xl hover:text-green-400 transition-colors">
        ℹ️ Sobre
      </Link>
      <Link href="/dashboard" className="text-xl hover:text-pink-400 transition-colors">
        👤 Dashboard
      </Link>
    </motion.nav>
  )
}

export default MobileView