/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#01172a",       // Dark Blue
        secondary: "#b2bfcb",     // Dark Slate Blue for text
        tertiary: "#1e272e",      // Dark Gray-Blue
        quart: "#1e272e",
        "black-100": "#090909",   // Black
        "black-200": "#01172a",   // Dark Blue (same as primary for uniformity)
        "white-100": "#ffffff",   // Default white for light text
      },
      boxShadow: {
        card: "0px 35px 100px -15px #1e272e",
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
