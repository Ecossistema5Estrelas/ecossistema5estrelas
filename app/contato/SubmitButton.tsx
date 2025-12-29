'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export default function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      aria-live="polite"
      className="w-full mt-4 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-300 text-black font-bold shadow-lg transition-all duration-300 hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin w-5 h-5" aria-hidden="true" />
          <span>Enviando...</span>
        </span>
      ) : (
        'Enviar'
      )}
    </button>
  )
}