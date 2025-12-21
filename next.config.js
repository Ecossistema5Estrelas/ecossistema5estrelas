/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    // Mantido conforme seu estado atual
    ignoreBuildErrors: true,
  },

  experimental: {
    // Compatível com Next.js 15+
    serverActions: {},
    typedRoutes: true,
  },

  images: {
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig