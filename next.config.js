/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {}, // ✅ CORRETO
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}

module.exports = withPWA(nextConfig)