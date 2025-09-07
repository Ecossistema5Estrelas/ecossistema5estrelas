export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  cover?: string;
  author?: string;
  categories?: { title: string; slug: string }[];
  tags?: string[];
};

export type PostFull = PostCard & {
  body?: any[];
  audioUrl?: string;
  videoUrl?: string;
  gallery?: { url: string }[];
};

export const MOCK_POSTS: PostFull[] = [
  {
    _id: "mock-1",
    title: "Bem-vindo ao ECOSSISTEMA 5ESTRELAS",
    slug: "bem-vindo-ao-ecossistema",
    excerpt: "Visão geral do projeto, apps e plano de monetização.",
    publishedAt: new Date().toISOString(),
    cover: "",
    author: "Equipe 5⭐",
    categories: [{ title: "Institucional", slug: "institucional" }],
    tags: ["apresentacao", "ecosistema"],
    body: [
      { _type: "block", children: [{ _type: "span", text: "Olá, mundo 5⭐!" }] },
    ],
  },
  {
    _id: "mock-2",
    title: "Segurança Digital — Primeiros Passos",
    slug: "seguranca-digital",
    excerpt: "Guia básico de proteção de contas, senhas e 2FA.",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    cover: "",
    author: "Equipe 5⭐",
    categories: [{ title: "Segurança", slug: "seguranca" }],
    tags: ["seguranca", "guia"],
    body: [
      { _type: "block", children: [{ _type: "span", text: "Ative 2FA agora!" }] },
    ],
    audioUrl: "",
    videoUrl: "",
    gallery: [],
  },
];

export function mockFindBySlug(slug: string) {
  return MOCK_POSTS.find((p) => p.slug === slug) || null;
}
