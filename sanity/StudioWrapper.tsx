'use client'

export default function StudioWrapper() {
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-10">
        <h1 className="text-2xl font-bold text-red-500">
          Studio desativado na produção.
        </h1>
        <p className="mt-4 text-gray-400">
          Ative o Studio apenas em ambiente de desenvolvimento.
        </p>
      </div>
    )
  }

  // Importa dinamicamente só no ambiente de desenvolvimento
  const { NextStudio } = require('next-sanity/studio')
  const config = require('../sanity.config').default
  return <NextStudio config={config} />
}
