module.exports = {
  root: true,
  env: { browser: true, node: true, es2023: true },
  extends: ['next/core-web-vitals'],
  plugins: ['unused-imports', 'import'],
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn'],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal'],
      'newlines-between': 'always'
    }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
