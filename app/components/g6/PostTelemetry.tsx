"use client"

import { useEffect } from "react"

async function emit(payload: any) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    })
  } catch {}
}

type Props = {
  slug: string
  tema?: string
}

export default function PostTelemetry({ slug, tema }: Props) {
  useEffect(() => {
    emit({
      event_name: "page_view",
      post_slug: slug,
      tema,
      referrer: document.referrer || undefined
    })
  }, [slug, tema])

  return null
}
