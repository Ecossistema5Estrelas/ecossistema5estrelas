"use client"

import { useEffect, useState } from "react"

export default function CookieConsent() {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie-consent")
      if (stored !== null) {
        setAccepted(stored === "true")
      }
    } catch {
      // intentionally empty: localStorage pode falhar em sandbox/SSR
    }
  }, [])

  if (accepted !== null) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 p-4 text-sm text-white">
      <p>Este site utiliza cookies para melhorar sua experiência.</p>
      <button
        onClick={() => {
          localStorage.setItem("cookie-consent", "true")
          setAccepted(true)
        }}
        className="mt-2 rounded bg-emerald-600 px-3 py-1 text-black"
      >
        Aceitar
      </button>
    </div>
  )
}