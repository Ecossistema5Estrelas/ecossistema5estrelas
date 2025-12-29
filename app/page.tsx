import type { Metadata } from 'next'
import Link from 'next/link'

import { baseMetadata } from './metadata'

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Portal Institucional',
  description:
    'Portal público e institucional dedicado à apresentação, organização e desenvolvimento de iniciativas digitais orientadas por governança, impacto social e visão de longo prazo.',
  alternates: {
    canonical: 'https://ecossistema5estrelas.org/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          ECOSSISTEMA 5ESTRELAS
        </h1>

        <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">
          Portal público e institucional dedicado à apresentação, organização
          e desenvolvimento de iniciativas digitais orientadas por governança,
          impacto social e visão de longo prazo.
        </p>

        <div className="mt-12 text-sm text-white/60 leading-relaxed space-y-6 text-left">
          <p>
            O ECOSSISTEMA 5ESTRELAS é um ambiente aberto, acessível e transparente,
            concebido para dialogar com o público em geral sobre tecnologia,
            inovação, cultura digital e organização de sistemas complexos.
          </p>

          <p>
            Este portal funciona como a porta de entrada institucional do
            ecossistema, reunindo princípios, diretrizes, informações públicas
            e acesso aos aplicativos que o compõem.
          </p>

          <p>
            Critérios específicos de acesso, regras internas, níveis de
            participação ou funcionalidades avançadas são definidos
            exclusivamente no escopo de cada aplicativo.
          </p>

          <p>
            O conteúdo editorial ativo encontra-se concentrado no Blog
            ArqFuturum, espaço dedicado à reflexão, análise e registro de
            fundamentos que orientam a evolução do ecossistema.
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-block text-sm text-white/70 hover:text-white transition"
          >
            Acessar o Blog ArqFuturum →
          </Link>
        </div>

      </div>
    </section>
  )
}