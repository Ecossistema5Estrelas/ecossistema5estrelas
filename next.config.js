/** @type {import('next').NextConfig} */
const nextConfig = {
  // fora de "experimental"
  allowedDevOrigins: ['localhost', '127.0.0.1'],

  experimental: {
    optimizeCss: true,
  },

  // nÃ£o travar build por regras antigas
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig; // CommonJS

