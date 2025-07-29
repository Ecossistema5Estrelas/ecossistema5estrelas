/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // ⚠️ ESSENCIAL PARA NÃO QUEBRAR NO DEV
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // habilita experimental server actions do Next.js 14+
  },
  images: {
    domains: ['cdn.sanity.io'], // você pode adicionar outros domínios aqui se precisar
  },
}

module.exports = withPWA(nextConfig)