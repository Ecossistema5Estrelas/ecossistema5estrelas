'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Route } from 'next'

type MobileLink = {
  href: Route
  label: string
  emoji: string
  hoverClass: string
}

const links: MobileLink[] = [
  {
    href: '/blog',
    label: 'Blog',
    emoji: '📚',
    hoverClass: 'hover:text-yellow-300',
  },
  {
    href: '/contato',
    label: 'Contato',
    emoji: '📬',
    hoverClass: 'hover:text-blue-400',
  },
  {
    href: '/sobre',
    label: 'Sobre',
    emoji: 'ℹ️',
    hoverClass: 'hover:text-green-400',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    emoji: '👤',
    hoverClass: 'hover:text-pink-400',
  },
]

export default function MobileView(): JSX.Element {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Navegação mobile"
      className="flex flex-col items-center gap-4 rounded-2xl bg-black/90 p-6 text-white shadow-md"
    >
      {links.map(({ href, label, emoji, hoverClass }) => (
        <Link
          key={href}
          href={href}
          className={`text-xl transition-colors ${hoverClass}`}
        >
          <span aria-hidden="true">{emoji}</span> {label}
        </Link>
      ))}
    </motion.nav>
  )
}