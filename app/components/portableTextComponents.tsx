// /app/components/portableTextComponents.tsx
'use client'

import { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

const GalleryComponent = ({ value }: any) => {
  if (!value?.images?.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {value.images.map((img: any, i: number) => (
        <div key={i} className="relative">
          {img?.asset && (
            <Image
              src={urlForImage(img).width(800).url()}
              alt={img.alt || `Imagem ${i + 1}`}
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-auto"
            />
          )}
          {img?.caption && (
            <p className="mt-2 text-sm text-center text-zinc-300">{img.caption}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset?._ref ? (
        <Image
          src={urlForImage(value).width(800).url()}
          alt={value.alt || 'Imagem do post'}
          width={800}
          height={500}
          className="rounded-lg my-4"
        />
      ) : null,

    gallery: GalleryComponent,

    youtube: ({ value }) => (
      <div className="my-6 aspect-video">
        <iframe
          src={value.url.replace('watch?v=', 'embed/')}
          className="w-full h-full rounded-xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ),

    tiktok: ({ value }) => (
      <div className="my-6">
        <iframe
          src={value.url}
          className="w-full h-[600px] rounded-xl"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>
    ),

    instagram: ({ value }) => (
      <div className="my-6">
        <iframe
          src={`${value.url}embed`}
          className="w-full h-[600px] rounded-xl"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>
    ),

    x: ({ value }) => (
      <div className="my-6">
        <iframe
          src={value.url}
          className="w-full h-[500px] rounded-xl"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>
    ),

    audio: ({ value }) => (
      <div className="my-6">
        {value.file?.asset?.url && (
          <audio controls className="w-full">
            <source src={value.file.asset.url} />
            Seu navegador não suporta áudio.
          </audio>
        )}
        {value.legenda && (
          <p className="text-sm text-zinc-400 mt-2">{value.legenda}</p>
        )}
      </div>
    ),

    button: ({ value }) => (
      <div className="my-6">
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          {value.label}
        </a>
      </div>
    ),
  },

  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-purple-400 hover:text-purple-200"
      >
        {children}
      </a>
    ),
  },

  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-purple-200">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mt-6 mb-3 text-purple-300">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-medium mt-4 mb-2 text-purple-400">{children}</h3>,
    normal: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 italic text-zinc-300 my-6">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 my-4">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
}