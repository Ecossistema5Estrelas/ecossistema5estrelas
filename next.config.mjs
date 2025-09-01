/** @type {import("next").NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: { optimizeCss: true },
};

export default nextConfig;
