export default function TesteGradientePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-black via-zinc-900 to-zinc-950 px-4 py-12">
      <div className="text-6xl mb-4">🌌</div>
      <h1 className="text-3xl font-bold mb-2">Teste de Gradiente</h1>
      <p className="text-zinc-400 text-center max-w-md mt-2">
        Esta página usa o gradiente oficial do ECOSSISTEMA 5ESTRELAS: <br />
        <code className="text-xs text-zinc-500">from-black via-zinc-900 to-zinc-950</code>
      </p>
    </main>
  )
}
