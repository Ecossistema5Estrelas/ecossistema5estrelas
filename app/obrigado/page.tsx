import BotaoVoltar from "../components/BotaoVoltar";
import ObrigadoContent from './ObrigadoContent'
export const metadata = {
  title: 'Obrigado | ECOSSISTEMA 5ESTRELAS',
  description: 'Agradecimento pela sua participação no ECOSSISTEMA 5ESTRELAS.',
}
export default function ObrigadoPage() {
  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <section className="max-w-4xl mx-auto space-y-10">
        <ObrigadoContent />
        <div className="text-center">
          <BotaoVoltar href="/">Voltar ao Início</BotaoVoltar>
        </div>
      </section>
    </main>
  )
}








