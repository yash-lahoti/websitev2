/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a192f",
        secondary: "#b4c0da",
        tertiary: "#464f69",
        quart: "#4a5986",
        "black-100": "#121212",
        "black-200": "#1a202c",
        "white-100": "#edf2f7",
        accent: "#805ad5",
        "dark-navy": "#020c1b",
        navy: "#0a192f",
        "light-navy": "#112240",
        "lightest-navy": "#233554",
        "navy-shadow": "rgba(2, 12, 27, 0.7)",
        slate: "#8892b0",
        "light-slate": "#a8b2d1",
        "lightest-slate": "#ccd6f6",
        white: "#e6f1ff",
        accent: "#FFBF69",
        "green-tint": "rgba(100, 255, 218, 0.1)",
        boldText: "#FFBF69"
      },
      fontFamily: {
        sans: [
          "Calibre",
          "San Francisco",
          "SF Pro Text",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "Fira Code",
          "Fira Mono",
          "Roboto Mono",
          "monospace",
        ],
      },
      fontSize: {
        xxs: "12px",
        xs: "13px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        xxl: "22px",
        heading: "32px",
      },
      lineHeight: {
        tight: "1.3",
        relaxed: "1.6",
      },
      spacing: {
        "nav-height": "100px",
        "nav-scroll-height": "70px",
        "tab-height": "42px",
        "tab-width": "120px",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      boxShadow: {
        card: "0px 30px 80px -10px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        xs: "450px",
      },
      transitionTimingFunction: {
        easing: "cubic-bezier(0.645,0.045,0.355,1)",
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
