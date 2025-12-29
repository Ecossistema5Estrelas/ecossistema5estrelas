'use client'

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
} from 'react-share'

type SocialShareProps = {
  url: string
  title?: string
}

export default function SocialShare({
  url,
  title,
}: SocialShareProps): JSX.Element {
  return (
    <div
      className="mt-6 flex flex-wrap items-center gap-3"
      aria-label="Compartilhar este conteúdo"
    >
      <FacebookShareButton url={url} aria-label="Compartilhar no Facebook">
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        aria-label="Compartilhar no Twitter"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton
        url={url}
        title={title}
        separator=" - "
        aria-label="Compartilhar no WhatsApp"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <TelegramShareButton
        url={url}
        title={title}
        aria-label="Compartilhar no Telegram"
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        aria-label="Compartilhar no LinkedIn"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  )
}