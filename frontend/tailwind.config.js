/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'legal-blue': '#1a365d',
        'legal-gold': '#d4af37',
        'legal-dark': '#0f172a',
      }
    },
  },
  plugins: [],
}
