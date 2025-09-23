export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/55 backdrop-blur">
      <div className="container-estrela py-8 text-center text-sm">
        <p>© {year} ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</p>
        <p className="mt-2">
          <a href="/privacidade">Privacidade</a> • <a href="/termos">Termos</a> • <a href="/politica">Política</a>
        </p>
      </div>
    </footer>
  );
}


