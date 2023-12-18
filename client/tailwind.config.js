/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontFamily: { sans: ['Josefin Slab', 'Helvetica', 'Arial', 'sans-serif'] },
    extend: {
      colors: {
        primary: '#f5eceb',
        secondary: '#584646',
        accent: '#a24d44'
      }
    }
  },
  plugins: [require('tailwindcss-bg-patterns')]
}
