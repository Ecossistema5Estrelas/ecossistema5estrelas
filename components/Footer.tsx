import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-700 dark:text-gray-300 p-6 mt-12">
      <nav className="flex flex-wrap justify-center gap-4 mb-3">
        <Link href="/privacidade">Privacidade</Link>
        <Link href="/termos">Termos</Link>
        <Link href="/cookies">Cookies</Link>
        <Link href="/comunidade">Comunidade</Link>
        <Link href="/copyright">Copyright</Link>
        <Link href="/anuncios">Anúncios</Link>
        <Link href="/suporte">Suporte</Link>
        <Link href="/contato">Contato</Link>
        <Link href="/sobre">Sobre</Link>
      </nav>
      <p>© {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados.</p>
      <p>📧 atendimento@ecossistema5estrelas.org</p>
    </footer>
  );
}





