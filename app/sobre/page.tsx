import type { Metadata } from "next";
import type { AnchorHTMLAttributes } from "react";

/**
 * ⚠️ QUEBRA DE CACHE CONTROLADA
 * Força re-renderização para invalidar snapshot antigo do Edge.
 * (Remover após validação final.)
 */
export const dynamic = "force-dynamic";

/**
 * 🧭 Metadata canônica da página /sobre
 * Deve SOBRESCREVER o layout raiz após invalidação.
 */
export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o ECOSSISTEMA 5ESTRELAS: missão, visão, valores e governança ética do portal premium.",
  alternates: {
    canonical: "https://ecossistema5estrelas.org/sobre",
  },
  openGraph: {
    title: "Sobre | ECOSSISTEMA 5ESTRELAS",
    description:
      "Missão, visão e princípios do ECOSSISTEMA 5ESTRELAS — portal premium e ecossistema digital integrado.",
    url: "https://ecossistema5estrelas.org/sobre",
    siteName: "ECOSSISTEMA 5ESTRELAS",
    type: "website",
  },
};

/**
 * 🔗 Link externo seguro (noopener / noreferrer)
 */
function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = "#", children, ...rest } = props;
  const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      {...rest}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function SobrePage() {
  return (
    <main>
      <header>
        <h1>Sobre</h1>
        <p>
          O <strong>ECOSSISTEMA 5ESTRELAS</strong> é um portal premium construído
          sobre governança, ética e escala sustentável.
        </p>
      </header>

      <section aria-labelledby="missao">
        <h2 id="missao">Missão</h2>
        <p>
          Entregar experiências digitais com{" "}
          <strong>qualidade estrutural</strong>, acessibilidade nativa e
          performance real.
        </p>
      </section>

      <section aria-labelledby="visao">
        <h2 id="visao">Visão</h2>
        <p>
          Ser um ecossistema compreendido por humanos, buscadores e IAs, sem criar
          dívida técnica, financeira ou arquitetural.
        </p>
      </section>

      <section aria-labelledby="valores">
        <h2 id="valores">Valores</h2>
        <article>
          <ul>
            <li>
              <strong>Governança &gt; velocidade</strong>
            </li>
            <li>
              <em>Faturar → observar → investir</em>
            </li>
            <li>Semântica, acessibilidade e ética como padrão</li>
          </ul>
          <p>
            <small>
              Todas as decisões são auditáveis, reversíveis e sustentáveis.
            </small>
          </p>
        </article>
      </section>

      <section aria-labelledby="transparencia">
        <h2 id="transparencia">Transparência</h2>

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

      <footer>
        <p>
          <ExternalLink href="https://ecossistema5estrelas.org">
            Site oficial
          </ExternalLink>
        </p>
      </footer>
    </main>
  );
}