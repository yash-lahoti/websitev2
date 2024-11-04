/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1b1f3b",
        secondary: "#b4c0da",
        tertiary: "#2d3748",
        quart: "#4a5986",
        "black-100": "#121212",
        "black-200": "#1a202c",
        "white-100": "#edf2f7",
        accent: "#805ad5",
      },
      boxShadow: {
        card: "0px 30px 80px -10px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
