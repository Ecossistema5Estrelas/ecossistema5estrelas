'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import SubmitButton from './SubmitButton'

export default function FormularioContato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
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
        />
      </div>

      <SubmitButton />
    </motion.form>
  )
}