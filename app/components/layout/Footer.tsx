export default function Footer(): JSX.Element {
  return (
    <footer
      className="w-full border-t border-white/10 mt-24"
      role="contentinfo"
    >
      <div className="w-full py-8 flex justify-center">
        <p className="text-xs text-white/50 text-center">
          © {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS • Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}