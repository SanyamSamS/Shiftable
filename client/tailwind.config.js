/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {

        '1/3': '33.333333%',
        '1/2': '50%',
         '2/3': '66.666667%',
         '3/4': '75%',
          '4/5': '80%',},
    },
  },
  plugins: [],
}

