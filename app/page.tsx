export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="hero-5e">
        <h1 className="hero-5e__title">Acesso inteligente aos aplicativos que transformam a sociedade.</h1>
        <p className="hero-5e__subtitle">Bastidores, inovação e impacto social — com IA, ética e criatividade.</p>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-lg shadow-black/40"><div className="text-3xl mb-2">📚</div><h3 className="text-lg font-semibold">Blog Oficial</h3><p className="text-sm text-zinc-300">Bastidores da inovação e novas ideias.</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-lg shadow-black/40"><div className="text-3xl mb-2">📬</div><h3 className="text-lg font-semibold">Contato</h3><p className="text-sm text-zinc-300">Fale conosco e envie sua proposta.</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-lg shadow-black/40"><div className="text-3xl mb-2">ℹ️</div><h3 className="text-lg font-semibold">Sobre</h3><p className="text-sm text-zinc-300">Missão, visão e propósito do projeto.</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-lg shadow-black/40"><div className="text-3xl mb-2">👤</div><h3 className="text-lg font-semibold">Dashboard</h3><p className="text-sm text-zinc-300">Acompanhe seu progresso e recompensas.</p></div>
        </div>
      </section>
    </main>
  )
}

