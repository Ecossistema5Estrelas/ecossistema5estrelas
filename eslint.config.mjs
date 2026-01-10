import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import unusedImports from "eslint-plugin-unused-imports"
import importPlugin from "eslint-plugin-import"

export default [
  // ================================
  // 🔒 IGNORADOS POR GOVERNANÇA
  // ================================
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "test-results/**",
      ".vercel/**",

      "_archive/**",
      ".sandbox/**",
      "backups/**",

      "public/workbox-*.js",
      "public/sw.js",
      "**/.sanity/**",
    ],
  },

  js.configs.recommended,

  // ================================
  // 🌐 UI / BROWSER / REACT
  // ================================
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },

      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        alert: "readonly",

        URL: "readonly",
        URLSearchParams: "readonly",

        JSX: "readonly",
        React: "readonly",
        console: "readonly",

        HTMLElement: "readonly",
        HTMLAnchorElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLFormElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLLabelElement: "readonly",
        HTMLTextAreaElement: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      "unused-imports": unusedImports,
      import: importPlugin,
    },

    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
          "newlines-between": "always",
        },
      ],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // ================================
  // 🧠 SERVER / NODE (TypeScript + ESM)
  // ================================
  {
    files: [
      "app/**/route.ts",
      "app/api/**/*.{ts,tsx}",
      "app/instrumentation.ts",
      "instrumentation-client.ts",
      "lib/firebase.ts",
      "next.config.ts",
      "app/sentry.*.config.ts",
      "components/performance/SpeculationRules.tsx",
      "app/components/analytics/Analytics.tsx",
    ],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        process: "readonly",
        global: "readonly",
        console: "readonly",
      },
    },

    rules: {
      "no-console": "off",
      "no-undef": "off",
    },
  },

  // ================================
  // 🧰 SCRIPTS (Node ESM)
  // ================================
  {
    files: ["scripts/**/*.{js,mjs}", "**/*.mjs", "*.mjs"],

    languageOptions: {
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        global: "readonly",
      },
    },

    rules: {
      "no-console": "off",
      "no-undef": "off",
    },
  },

  // ================================
  // ⚙️ sanity.cli.ts (ESM)
  // ================================
  {
    files: ["sanity.cli.ts"],

    languageOptions: {
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },

    rules: {
      "no-undef": "off",
    },
  },

  // ================================
  // ⚙️ COMMONJS CONFIGS
  // ================================
  {
    files: [
      "**/*.config.cjs",
      "*.cjs",
      "postcss.config.cjs",
      "tailwind.config.cjs",
      "studio/postcss.config.cjs",
    ],

    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },

    rules: {
      "no-undef": "off",
    },
  },
]