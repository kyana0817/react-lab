import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.slate[900],
        secondary: colors.slate[700]
      },
      borderColor: {
        DEFAULT: colors.slate[400]
      }
    },
  },
  plugins: [],
}

