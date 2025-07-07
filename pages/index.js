import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 p-6">
      <Head>
        <title>ECOSSISTEMA 5ESTRELAS</title>
        <meta name="description" content="Plataforma digital para inclusão, inovação e impacto social." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-center py-10">
        <h1 className="text-4xl font-extrabold mb-2">🌍 ECOSSISTEMA 5ESTRELAS</h1>
        <p className="text-lg text-gray-600">Inovação, inclusão e impacto real para todos</p>
      </header>

      <main className="max-w-4xl mx-auto grid gap-10">
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">🚀 Nossa Missão</h2>
          <p className="text-gray-700">
            Unir tecnologia, acessibilidade e ética para transformar vidas em áreas como mecânica, beleza,
            moda, agricultura e educação.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">🛠️ Mecânica 5ESTRELAS</h3>
            <p>Oficinas, avaliações, geolocalização e agendamentos.</p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">💇 Beleza 5ESTRELAS</h3>
            <p>Salões, profissionais, cupons e agendamentos.</p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">👗 Moda 5ESTRELAS</h3>
            <p>Moda afro, pet, LGBTQIA+, brechós e tendências.</p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-xl font-bold mb-3">📲 Entre em contato</h2>
          <p className="mb-4">contato@ecossistema5estrelas.org</p>
        </section>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        © 2025 ECOSSISTEMA 5ESTRELAS. Todos os direitos reservados.
      </footer>
    </div>
  );
}
