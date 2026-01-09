import type { Metadata } from 'next'
import type { AnchorHTMLAttributes } from 'react'

export const metadata: Metadata = {
  title: 'Sobre o ECOSSISTEMA 5ESTRELAS',
  description:
    'Conheça a missão, visão, valores e princípios de governança do ECOSSISTEMA 5ESTRELAS.',
  alternates: {
    canonical: 'https://ecossistema5estrelas.org/sobre',
  },
  openGraph: {
    title: 'Sobre o ECOSSISTEMA 5ESTRELAS',
    description:
      'Missão, visão e princípios do ECOSSISTEMA 5ESTRELAS — portal institucional e ecossistema digital.',
    url: 'https://ecossistema5estrelas.org/sobre',
    siteName: 'ECOSSISTEMA 5ESTRELAS',
    type: 'website',
  },
}

function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = '#', children, ...rest } = props
  const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href)

  return (
    <a
      href={href}
      {...rest}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export default function SobrePage() {
  return (
    <main
      id="content"
      role="main"
      className="max-w-3xl mx-auto px-4 py-16 space-y-16"
    >
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold">
          Sobre o ECOSSISTEMA 5ESTRELAS
        </h1>
        <p className="text-white/70 leading-relaxed">
          Esta página apresenta os fundamentos institucionais do{' '}
          <strong>ECOSSISTEMA 5ESTRELAS</strong>, cujo portal principal está em{' '}
          <ExternalLink href="https://ecossistema5estrelas.org">
            ecossistema5estrelas.org
          </ExternalLink>.
        </p>
      </header>

      <section aria-labelledby="missao" className="space-y-2">
        <h2 id="missao" className="text-xl font-medium">
          Missão
        </h2>
        <p>
          Entregar experiências digitais com{' '}
          <strong>qualidade estrutural</strong>, acessibilidade nativa e
          performance real.
        </p>
      </section>

      <section aria-labelledby="visao" className="space-y-2">
        <h2 id="visao" className="text-xl font-medium">
          Visão
        </h2>
        <p>
          Ser um ecossistema compreendido por humanos, buscadores e IAs, sem criar
          dívida técnica, financeira ou arquitetural.
        </p>
      </section>

      <section aria-labelledby="valores" className="space-y-4">
        <h2 id="valores" className="text-xl font-medium">
          Valores
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Governança &gt; velocidade</strong>
          </li>
          <li>
            <em>Faturar → observar → investir</em>
          </li>
          <li>Semântica, acessibilidade e ética como padrão</li>
        </ul>

        <p className="text-sm text-white/60">
          Todas as decisões são auditáveis, reversíveis e sustentáveis.
        </p>
      </section>

      <section aria-labelledby="transparencia" className="space-y-4">
        <h2 id="transparencia" className="text-xl font-medium">
          Transparência
        </h2>

        <details>
          <summary>Como o projeto evita dívida?</summary>
          <p>
            Apenas decisões estruturais entram. Nada provisório vira permanente.
          </p>
        </details>

        <details>
          <summary>Como validar o SEO?</summary>
          <p>
            Conferindo <strong>&lt;title&gt;</strong>, description e canonical no
            HTML servido.
          </p>
        </details>
      </section>
    </main>
  )
}