'use client'
import { useState } from 'react'
export default function CadastroForm() {
  const [loading, setLoading] = useState(false)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    try { await new Promise(r => setTimeout(r, 800)); alert('Perfil salvo!') }
    finally { setLoading(false) }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block"><span className="block text-sm text-zinc-300 mb-1">Nome</span>
          <input type="text" required className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-300/50" placeholder="Seu nome" />
        </label>
        <label className="block"><span className="block text-sm text-zinc-300 mb-1">E-mail</span>
          <input type="email" required className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-300/50" placeholder="voce@exemplo.com" />
        </label>
      </div>
      <label className="block"><span className="block text-sm text-zinc-300 mb-1">Senha</span>
        <input type="password" required className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-300/50" placeholder="••••••••" />
      </label>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" className="rounded-2xl bg-black/40 hover:bg-black/55 px-4 py-2 border border-white/10 shadow-lg shadow-black/40">Cancelar</button>
        <button type="submit" disabled={loading} className="rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 px-5 py-2.5 font-semibold shadow-lg shadow-black/40 focus:outline-none focus:ring-2 focus:ring-purple-300/50">
          {loading ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}

