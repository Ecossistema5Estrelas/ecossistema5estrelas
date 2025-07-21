'use client'

import { useLayoutEffect, useState } from 'react'
import MobileView from './components/MobileView'
import DesktopView from './components/DesktopView'

export default function HomePage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768)
      }

      checkMobile()
      window.addEventListener('resize', checkMobile)

      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-2">🚀</div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return isMobile ? <MobileView /> : <DesktopView />
}
