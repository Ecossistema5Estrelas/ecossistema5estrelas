// eslint.config.mjs
import eslintPlugin from 'eslint-plugin';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import next from 'eslint-config-next';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  next,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/jsx-key': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
];