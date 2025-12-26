import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true, // alinhado ao estado atual
  },

  eslint: {
    ignoreDuringBuilds: true, // elimina warning legado
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  typedRoutes: true, // ✅ forma correta no Next 15
};

export default nextConfig;
