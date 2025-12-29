'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type DesktopViewProps = {
  children: ReactNode
}

export default function DesktopView({
  children,
}: DesktopViewProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="hidden rounded-2xl border border-white/10 bg-zinc-900 p-6 text-white shadow-xl md:block lg:p-8"
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}