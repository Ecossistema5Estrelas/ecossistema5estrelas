'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import SubmitButton from './SubmitButton'

import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'

type FormData = {
  nome: string
  email: string
  mensagem: string
}

export default function FormularioContato(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    mensagem: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 🔒 Pronto para integração futura (API / Action / Server)
    // Nenhum efeito colateral aqui
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto space-y-6 bg-zinc-900 p-6 rounded-2xl shadow-xl"
    >
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          aria-describedby="nome-descricao"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-describedby="email-descricao"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          rows={5}
          required
          aria-describedby="mensagem-descricao"
        />
      </div>

      <SubmitButton />
    </motion.form>
  )
}