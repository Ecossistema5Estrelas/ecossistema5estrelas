import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato | ECOSSISTEMA 5ESTRELAS',
  description:
    'Canal institucional oficial do ECOSSISTEMA 5ESTRELAS para comunicações formais, parcerias, imprensa e assuntos institucionais.',
}

export default function ContatoPage(): JSX.Element {
  return (
    <main className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-white">
          Contato
        </h1>

        <p className="mt-6 text-sm text-white/70 leading-relaxed">
          Este é o canal institucional oficial do ECOSSISTEMA 5ESTRELAS para
          comunicações formais, parcerias, imprensa e assuntos institucionais.
        </p>

        <section className="mt-12 text-sm text-white/70">
          <p className="leading-relaxed">
            Para contato institucional, utilize o e-mail abaixo:
          </p>

          <p className="mt-4 font-medium text-white">
            <a
              href="mailto:contato@ecossistema5estrelas.org"
              className="underline underline-offset-4 hover:opacity-80"
            >
              contato@ecossistema5estrelas.org
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}