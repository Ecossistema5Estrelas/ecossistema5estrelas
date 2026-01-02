import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/lib/sanityImage'

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const imageUrl = urlForImage(value).url()

      return (
        <div className="my-6">
          <Image
            src={imageUrl}
            alt={value.alt || 'Imagem do post'}
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      )
    },

    // ⚠️ SOMENTE blocos explicitamente do tipo "code"
    code: ({ value }) => (
      <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm my-6">
        <code>{value?.code}</code>
      </pre>
    ),
  },

  block: {
    // 🔒 TEXTO NORMAL — NUNCA <pre>
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4 text-zinc-200">
        {children}
      </p>
    ),

    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-6 text-white">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-yellow-400 pl-4 italic my-6 text-zinc-300">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-yellow-300">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-zinc-400">
        {children}
      </em>
    ),

    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="underline text-blue-400 hover:text-blue-600 transition"
        >
          {children}
        </a>
      )
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-200">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-200">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">
        {children}
      </li>
    ),

    number: ({ children }) => (
      <li className="text-base leading-relaxed">
        {children}
      </li>
    ),
  },
}

export default portableTextComponents
