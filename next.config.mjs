import path from "node:path";
import withPWA from "next-pwa";
const isProd = process.env.NODE_ENV === "production";

/** @type {import("next").NextConfig} */
const base = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "styled-components": path.resolve(process.cwd(), "stubs/styled-components.js"),
      // Se ainda vier algo de visual editing, desvie também:
      "@sanity/visual-editing": path.resolve(process.cwd(), "stubs/empty.js"),
      "@sanity/visual-editing/react": path.resolve(process.cwd(), "stubs/empty.js"),
    };
    return config;
  },
};

export default withPWA({ dest: "public", disable: !isProd })(base);
