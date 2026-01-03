export const metadata = {
  title: "Loja | ECOSSISTEMA 5ESTRELAS",
  description: "Loja 5⭐ — página em preparação.",
};

export default function LojaPage() {
  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-5xl">🛍️</div>
        <h1 className="text-3xl font-semibold">Loja 5⭐</h1>
        <p className="text-zinc-300 text-lg">
          Esta área está em preparação. Em breve, produtos, assinaturas e experiências do ecossistema estarão disponíveis aqui.
        </p>
        <p className="text-zinc-500">
          Status: <span className="text-zinc-200">Em preparação</span>
        </p>
      </section>
    </main>
  );
}
