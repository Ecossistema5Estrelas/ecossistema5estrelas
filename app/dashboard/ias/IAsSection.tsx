export default function IAsSection() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">🧠 IAs do Ecossistema</h2>
        <p className="text-sm text-zinc-400">
          Assistentes inteligentes que operam o ECOSSISTEMA 5ESTRELAS
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card nome="Hydra" descricao="Segurança, integridade e verificação" emoji="🛡️" />
        <Card nome="Midas" descricao="Recompensas, métricas e monetização" emoji="💰" />
        <Card nome="Vulcano" descricao="Criação de apps e soluções" emoji="🔥" />
        <Card nome="Atena" descricao="Orientação, estratégia e difusão" emoji="📣" />
        <Card nome="Mnemosine" descricao="Memória, histórico e continuidade" emoji="🧠" />
      </div>
    </section>
  )
}

function Card({
  nome,
  descricao,
  emoji,
}: {
  nome: string
  descricao: string
  emoji: string
}) {
  return (
    <div className="rounded-lg border border-white/10 p-4 hover:bg-white/5 transition">
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="font-semibold">{nome}</h3>
      <p className="text-sm text-zinc-400">{descricao}</p>
    </div>
  )
}