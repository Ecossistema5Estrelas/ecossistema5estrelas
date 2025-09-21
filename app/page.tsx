import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-12">
      {/* Hero com fractal e logomarca */}
      <div className="relative rounded-2xl overflow-hidden shadow border border-black/10">
        <Image
          src="/brain-fractal.png"
          alt="Rede Neural Fractal"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-brightness-50 p-8">
          <Image
            src="/logo-5estrelas.png"
            alt="ECOSSISTEMA 5ESTRELAS"
            width={280}
            height={280}
          />
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-white text-center">
            ECOSSISTEMA 5ESTRELAS
          </h1>
          <p className="mt-2 text-base md:text-xl text-white text-center">
            IA • Comunidade • Inovação
          </p>
        </div>
      </div>

      {/* Introdução */}
      <div className="card-estrela space-y-3">
        <h2 className="text-2xl font-semibold">Quem Somos</h2>
        <p>
          Bem-vindo à nossa plataforma de inteligência artificial inspirada
          pela geometria fractal e pelas redes neurais. Oferecemos soluções
          de IA seguras e inovadoras, unindo tecnologia e comunidade.
        </p>
      </div>

      {/* Loja */}
      <div className="card-estrela space-y-3">
        <h2 className="text-2xl font-semibold">Loja</h2>
        <p>
          Disponibilizamos softwares, APIs, cursos e assinaturas premium,
          cuidadosamente selecionados para entusiastas e profissionais de IA.
        </p>
        <Link href="/loja" className="btn-estrela w-max">Visitar Loja</Link>
      </div>

      {/* Dashboard em Breve */}
      <div className="card-estrela space-y-3">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p>
          Em breve, você poderá acompanhar métricas em tempo real e gerenciar
          seus recursos de IA em um painel unificado e personalizável.
        </p>
      </div>

      {/* Contato */}
      <div className="card-estrela space-y-3">
        <h2 className="text-2xl font-semibold">Contato</h2>
        <p>
          Para dúvidas ou sugestões, envie um e-mail para
          <strong> suporte@ecossistema5estrelas.org</strong>.
        </p>
        <Link href="/contato" className="btn-estrela w-max">Fale Conosco</Link>
      </div>
    </section>
  );
}
