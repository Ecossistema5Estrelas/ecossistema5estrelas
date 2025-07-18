/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #1e1e2f 0%, #431d78 100%)',
      },
    },
  },
  plugins: [],
}
