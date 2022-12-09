/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'slate-350': '#b7c1d1'
      },

      fontFamily: {
        'LexendDeca': ['Lexend Deca', 'sans-serif']
      }
    },
  },
  plugins: [],
}
