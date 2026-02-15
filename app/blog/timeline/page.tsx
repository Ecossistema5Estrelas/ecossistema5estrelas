import Link from "next/link";

import { sanityQuery } from "@/lib/sanityFetch.mjs";

export const revalidate = 3600;

export default async function TimelinePage() {
  const posts = await sanityQuery(
    `*[_type=="post"]|order(coalesce(publishedAt,_createdAt) desc)[0...25]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _createdAt
    }`,
    {},
    { revalidate: 3600 }
  );

  return (
    <main style={{ padding: 24 }}>
      <h1>Timeline</h1>
      <p>Modo de visualização temporal (não é a estrutura do blog).</p>
      <p><Link href="/blog">← Voltar ao Blog</Link></p>

      <h2>Últimos 25</h2>
      <ul>
        {(posts || []).map((p: any) => (
          <li key={p._id}>
            <span>{p.title || "(sem título)"} </span>
            <small>
              · {p.publishedAt || p._createdAt || ""}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
