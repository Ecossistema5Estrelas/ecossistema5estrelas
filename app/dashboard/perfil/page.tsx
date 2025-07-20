// app/dashboard/perfil/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import Image from 'next/image'

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [uploading, setUploading] = useState(false)

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setName(user.displayName || '')
        setPhotoURL(user.photoURL || '')
      }
    })
    return () => unsubscribe()
  }, [auth])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    const storageRef = ref(storage, `profileImages/${user.uid}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    setUploading(true)
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error(error)
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        await updateProfile(user, { photoURL: url })
        setPhotoURL(url)
        setUploading(false)
      }
    )
  }

  const handleNameUpdate = async () => {
    if (!user || !name) return
    await updateProfile(user, { displayName: name })
    alert('Nome atualizado com sucesso!')
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white px-6 py-12 md:px-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-4">👤 Seu Perfil</h1>

        <div className="flex items-center gap-4">
          {photoURL ? (
            <Image
              src={photoURL}
              alt="Foto de perfil"
              width={80}
              height={80}
              className="rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-2xl">
              👤
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Atualizar foto</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
            {uploading && <p className="text-yellow-400 text-sm mt-1">Enviando imagem...</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-600"
          />
          <button
            onClick={handleNameUpdate}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded font-semibold"
          >
            Salvar Nome
          </button>
        </div>

        <div className="mt-6 p-4 border border-yellow-500 rounded-lg bg-zinc-800 text-yellow-300">
          Status da conta: <strong>{user?.email ? '✅ Autenticado' : '⛔ Não autenticado'}</strong>
          <br />
          Premium: <strong>{user?.email?.includes('vip') ? '⭐ VIP' : '🆓 Gratuito'}</strong>
        </div>
      </div>
    </main>
  )
}
