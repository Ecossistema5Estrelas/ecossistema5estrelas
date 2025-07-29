'use client'

import {
  Facebook,
  Twitter,
  Send,
  Copy,
  Share2,
  Check,
  MessageCircleMore, // usado como ícone compatível para WhatsApp
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

type SocialShareProps = {
  slug: string
  title: string
}

export default function SocialShare({ slug, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const url = `https://ecossistema5estrelas.org/blog/${slug}`
  const encodedURL = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareOptions = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: <Facebook size={20} />,
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
      icon: <Twitter size={20} />,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedURL}`,
      icon: <MessageCircleMore size={20} />,
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedURL}&text=${encodedTitle}`,
      icon: <Send size={20} />,
    },
  ]

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link copiado!')
    setTimeout(() => setCopied(false), 3000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch (err) {
        toast.error('Compartilhamento cancelado.')
      }
    } else {
      toast.error('Compartilhamento nativo não suportado.')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-zinc-300">
      {shareOptions.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-purple-400 transition-colors"
        >
          {icon}
          <span>{name}</span>
        </a>
      ))}

      <button
        onClick={copyToClipboard}
        className="flex items-center gap-1 hover:text-green-400 transition-colors"
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
        <span>{copied ? 'Copiado!' : 'Copiar link'}</span>
      </button>

      <button
        onClick={handleNativeShare}
        className="flex items-center gap-1 hover:text-blue-400 transition-colors"
      >
        <Share2 size={20} />
        <span>Compartilhar</span>
      </button>
    </div>
  )
}