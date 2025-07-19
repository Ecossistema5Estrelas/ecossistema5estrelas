'use client'

import { useEffect, useState } from 'react'
import { MobileView, DesktopView } from './components'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      console.log('📱 WIDTH DETECTADO:', width)
      setIsMobile(width < 768)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  console.log('🔍 RENDER MOBILE?', isMobile)

  return isMobile ? <MobileView /> : <DesktopView />
}
