/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Mont": ["Montserrat", "sans-serif"],
        "Lato": ["Lato", "sans-serif"]
      },
      backgroundColor: {
        btnColor: "#6F86AD",
        primaryColor: "#c1e1c5"
      },
      colors: {
        primary: "#6F86AD",
      }
      ,gridTemplateColumns: {
        '2-auto': 'auto auto',
      },
    },
  },
  plugins: [],
}

