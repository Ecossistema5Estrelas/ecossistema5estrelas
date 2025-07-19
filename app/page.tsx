'use client'

import { useEffect, useState } from 'react'
import { MobileView, DesktopView } from './components'

export default function HomePage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      console.log('📱 LARGURA DETECTADA:', width)
      setIsMobile(width < 768)
    }

    if (typeof window !== 'undefined') {
      checkDevice()
      window.addEventListener('resize', checkDevice)
      return () => window.removeEventListener('resize', checkDevice)
    }
  }, [])

  useEffect(() => {
    console.log('📦 isMobile ATUALIZADO:', isMobile)
  }, [isMobile])

  // Fallback manual com userAgent
  useEffect(() => {
    if (isMobile === null && typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      const isMobileUA =
        /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(ua)
      if (isMobileUA) {
        console.log('📦 UA DETECTADO: MOBILE')
        setIsMobile(true)
      } else {
        console.log('📦 UA DETECTADO: DESKTOP')
        setIsMobile(false)
      }
    }
  }, [isMobile])

  if (isMobile === null) {
    return (
      <main className="flex justify-center items-center min-h-screen text-white">
        <p>Detectando dispositivo...</p>
      </main>
    )
  }

  return isMobile ? <MobileView /> : <DesktopView />
}
