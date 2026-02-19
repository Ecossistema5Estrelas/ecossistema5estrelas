import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/lib/sanityImage'

const portableTextComponents: PortableTextComponents = {

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const imageUrl = urlForImage(value).url()

      return (
        <div className="my-6 select-text">
          <Image
            src={imageUrl}
            alt={value.alt || 'Imagem do post'}
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full h-auto object-cover select-text"
          />
        </div>
      )
    },

    code: ({ value }) => (
      <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm my-6 select-text">
        <code className="select-text">{value?.code}</code>
      </pre>
    ),
  },


  block: {

    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4 text-zinc-200 select-text">
        {children}
      </p>
    ),

    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-6 text-white select-text">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white select-text">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-white select-text">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-yellow-400 pl-4 italic my-6 text-zinc-300 select-text">
        {children}
      </blockquote>
    ),
  },


  marks: {

    strong: ({ children }) => (
      <strong className="font-bold text-yellow-300 select-text">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-zinc-400 select-text">
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
          className="underline text-blue-400 hover:text-blue-600 transition select-text"
        >
          {children}
        </a>
      )
    },
  },


  list: {

    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-200 select-text">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-200 select-text">
        {children}
      </ol>
    ),
  },


  listItem: {

    bullet: ({ children }) => (
      <li className="text-base leading-relaxed select-text">
        {children}
      </li>
    ),

    number: ({ children }) => (
      <li className="text-base leading-relaxed select-text">
        {children}
      </li>
    ),
  },
}

export default portableTextComponents

