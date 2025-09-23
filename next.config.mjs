/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
export default { images: { unoptimized: true } }
