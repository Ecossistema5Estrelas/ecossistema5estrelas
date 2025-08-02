'use client'

import { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, storage } from '../../../lib/firebase'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import BotaoVoltar from '../../components/BotaoVoltar'

export default function PerfilContent() {
  const [user, setUser] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [photoURL, setPhotoURL] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL)
      }
    })
    return () => unsubscribe()
  }, [])

  const handleUpload = async () => {
    if (file && user) {
      const storageRef = ref(storage, `avatars/${user.uid}`)
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
  }

  return (
    <main className="min-h-screen bg-gradient-main text-white px-6 py-16 flex flex-col items-center">
      {/* Botão de voltar */}
      <div className="w-full max-w-4xl mb-8 self-start">
        <BotaoVoltar />
      </div>

      {/* Cartão de perfil */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-purple-300">👤 Meu Perfil</h1>

        {photoURL && (
          <div className="flex justify-center">
            <img
              src={photoURL}
              alt={`Avatar de ${user?.email || 'usuário'}`}
              loading="lazy"
              className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
        />

        {uploading && (
          <p className="text-center text-yellow-300 text-sm">⏳ Enviando imagem...</p>
        )}

        <button
          onClick={handleUpload}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold transition duration-300"
        >
          Atualizar Foto de Perfil
        </button>

        {user && (
          <div className="mt-6 p-4 border border-yellow-500 rounded-lg bg-zinc-800 text-yellow-300 text-sm text-center">
            Status da conta: <strong>{user?.email ? '✅ Autenticado' : '⛔ Não autenticado'}</strong><br />
            Plano: <strong>{user?.email?.includes('vip') ? '⭐ VIP' : '🆓 Gratuito'}</strong>
          </div>
        )}
      </section>
    </main>
  )
}