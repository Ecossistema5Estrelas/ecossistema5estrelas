import PerfilContent from './PerfilContent'

export const metadata = {
  title: 'Perfil | ECOSSISTEMA 5ESTRELAS',
  description: 'Gerencie seu perfil pessoal dentro do ECOSSISTEMA 5ESTRELAS.',
}

export default function PerfilPage() {
  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <section className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <div className="text-5xl mb-2">👤</div>
          <h1 className="text-3xl font-bold">Painel do Usuário</h1>
          <p className="text-zinc-400">Acesse e edite suas informações com segurança.</p>
        </header>

        <PerfilContent />
      </section>
    </main>
  )
}