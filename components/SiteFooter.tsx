export default function SiteFooter(){
  return (
    <footer className="mt-14 border-t border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-slate-600">
          <li>Privacidade</li><li>Termos</li><li>Cookies</li><li>Comunidade</li>
          <li>Copyright</li><li>Anúncios</li><li>Suporte</li><li>Contato</li><li>Sobre</li>
        </ul>
        <div className="mt-3 text-slate-600">© 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</div>
        <div className="mt-1">📧 <a href="mailto:atendimento@ecossistema5estrelas.org" className="underline">atendimento@ecossistema5estrelas.org</a></div>
      </div>
    </footer>
  );
}
