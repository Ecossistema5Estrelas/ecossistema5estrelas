import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: { brandstart: "#2563eb", brandend: "#7c3aed" }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
