/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Corrigido: precisa ser um objeto
  },
}

module.exports = withPWA(nextConfig)


module.exports = withPWA(nextConfig)
