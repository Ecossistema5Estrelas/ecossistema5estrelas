import SobreContent from './SobreContent'
import CardApp from '@/components/CardApp'
import { appsDisponiveis, appsMeta } from '@/lib/appsDisponiveis'

export const metadata = {
  title: 'Sobre | ECOSSISTEMA 5ESTRELAS',
  description: 'Conheça a missão, visão e valores do Ecossistema 5ESTRELAS.',
}

export const viewport = {
  themeColor: '#6D28D9',
}

export default function SobrePage() {
  return (
    <div className="min-h-screen px-6 py-12 text-white bg-gradient-main">
      <SobreContent />

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appsMeta.map((app) =>
          appsDisponiveis[app.chave] ? (
            <CardApp
              key={app.chave}
              titulo={app.titulo}
              descricao={app.descricao}
              emoji={app.emoji}
              href={app.href}
            />
          ) : null
        )}
      </div>
    </div>
  )
}
