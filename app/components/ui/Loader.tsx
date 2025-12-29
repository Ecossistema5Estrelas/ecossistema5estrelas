'use client'

import { Loader2 } from 'lucide-react'

export default function Loader(): JSX.Element {
  return (
    <div
      className="flex items-center justify-center py-10"
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <Loader2
        className="h-6 w-6 animate-spin text-white"
        aria-hidden="true"
      />
    </div>
  )
}