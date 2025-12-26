'use client'

import { useState } from 'react'

import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Button from '@/components/ui/button'

export default function PerfilContent() {
  const [nome, setNome] = useState('')
  const [bio, setBio] = useState('')

  function handleSalvar() {
    alert('✅ Dados salvos com sucesso!')
  }

  return (
    <div className="space-y-6 bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-800">
      <h2 className="text-xl font-semibold text-white">
        📝 Editar Perfil
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Nome completo
          </label>
          <Input
            id="nome"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Biografia
          </label>
          <Textarea
            id="bio"
            placeholder="Conte um pouco sobre você..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <Button onClick={handleSalvar} className="w-full mt-2">
          💾 Salvar alterações
        </Button>
      </div>
    </div>
  )
}