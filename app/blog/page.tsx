export default function BlogPage() {
  const posts = [
    {id:1,title:"IA & Fractais: padrões em múltiplas escalas",excerpt:"Um olhar sobre como geometrias fractais inspiram redes neurais."},
    {id:2,title:"Energia, circuitos e sinapses digitais",excerpt:"Design de interfaces que lembram redes neurais biológicas."},
    {id:3,title:"Guia rápido de AdSense para conteúdo de IA",excerpt:"Boas práticas para aprovação e layout responsivo."}
  ];
  return (
    <section>
      <h1 className="text-3xl md:text-5xl mb-6">Blog</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {posts.map(p=>(
          <article key={p.id} className="card-estrela">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="opacity-80 text-sm mt-1">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
