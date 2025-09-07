export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl p-8 md:p-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-amber-400 opacity-20 dark:opacity-25" />
      <div className="flex flex-col gap-4">
        <div className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="align-middle">✨ ECOSSISTEMA </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400">
            5ESTRELAS
          </span>
        </div>
        <p className="max-w-2xl text-lg md:text-xl opacity-90">
          Plataforma unificada para apps, conteúdo e monetização. IA, reputação, banco digital e UGC — tudo num só lugar.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a href="/blog" className="rounded-xl px-4 py-2 border border-amber-400 hover:bg-amber-50 dark:hover:bg-zinc-900">
            📚 Ir para o Blog
          </a>
          <a href="/loja" className="rounded-xl px-4 py-2 border border-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-zinc-900">
            🛍 Entrar na Loja
          </a>
          <a href="/sobre" className="rounded-xl px-4 py-2 border border-emerald-400 hover:bg-emerald-50 dark:hover:bg-zinc-900">
            🏛 Sobre o Projeto
          </a>
        </div>
      </div>
    </section>
  );
}
