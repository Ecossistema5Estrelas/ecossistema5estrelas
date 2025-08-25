// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // também corrige aquele warning do boolean
  },
  async redirects() {
    return [
      { source: '/investidor', destination: '/', permanent: false },
      { source: '/investidores', destination: '/', permanent: false },
    ]
  },
}

module.exports = nextConfig