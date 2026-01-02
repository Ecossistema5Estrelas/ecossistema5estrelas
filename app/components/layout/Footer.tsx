export default function Footer(): JSX.Element {
  return (
    <footer
      className="w-full border-t border-white/10 mt-24"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* COLUNA 1 — Identidade */}
        <section>
          <h3 className="text-sm font-semibold text-white/90">
            ECOSSISTEMA 5ESTRELAS
          </h3>
          <p className="mt-3 text-sm text-white/60 leading-relaxed">
            Portal premium de conteúdos, aplicações e experiências digitais.
            Arquitetura segura, governança ética e foco em valor real para humanos.
          </p>
        </section>

        {/* COLUNA 2 — Navegação */}
        <section>
          <h3 className="text-sm font-semibold text-white/90">
            Navegação
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="/" className="hover:text-white transition">
                Início
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white transition">
                Blog ArqFuturum
              </a>
            </li>
            <li>
              <a href="/sobre" className="hover:text-white transition">
                Sobre
              </a>
            </li>
            <li>
              <a href="/contato" className="hover:text-white transition">
                Contato
              </a>
            </li>
          </ul>
        </section>

        {/* COLUNA 3 — Legal (SPRINT 1 CRÍTICO) */}
        <section>
          <h3 className="text-sm font-semibold text-white/90">
            Legal
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a
                href="/politica-de-privacidade"
                className="hover:text-white transition"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a
                href="/termos-de-uso"
                className="hover:text-white transition"
              >
                Termos de Uso
              </a>
            </li>
            <li>
              <a
                href="/politica-de-cookies"
                className="hover:text-white transition"
              >
                Política de Cookies
              </a>
            </li>
          </ul>
        </section>

      </div>

      {/* BARRA FINAL */}
      <div className="border-t border-white/10 py-6">
        <p className="text-xs text-white/50 text-center">
          © {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS • Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}