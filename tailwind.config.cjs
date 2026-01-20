/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/Admissions/**/*.{js,jsx,ts,tsx}",
    "./src/components/MedicalStudent/**/*.{js,jsx,ts,tsx}"
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Main app colors - use CSS variables with fallbacks
        // Main app doesn't define these variables, so uses fallback values
        // Admissions defines them in .admissions-page scope, so uses those values
        primary: "var(--primary, #0a192f)",
        secondary: "var(--secondary, #b4c0da)",
        background: "var(--background, #0a192f)",
        foreground: "var(--foreground, #e6f1ff)",
        card: "var(--card, #112240)",
        "card-foreground": "var(--card-foreground, #e6f1ff)",
        popover: "var(--popover, #112240)",
        "popover-foreground": "var(--popover-foreground, #e6f1ff)",
        "primary-foreground": "var(--primary-foreground, #e6f1ff)",
        "secondary-foreground": "var(--secondary-foreground, #0a192f)",
        muted: "var(--muted, #233554)",
        "muted-foreground": "var(--muted-foreground, #8892b0)",
        accent: "var(--accent, #FFB400)",
        "accent-foreground": "var(--accent-foreground, #0a192f)",
        destructive: "var(--destructive, #f12711)",
        "destructive-foreground": "var(--destructive-foreground, #ffffff)",
        border: "var(--border, #233554)",
        input: "var(--input, #233554)",
        ring: "var(--ring, #FFB400)",
        // Original colors (for backward compatibility)
        tertiary: "#464f69",
        quart: "#4a5986",
        "black-100": "#121212",
        "black-200": "#1a202c",
        "white-100": "#edf2f7",
        "dark-navy": "#020c1b",
        navy: "#0a192f",
        "light-navy": "#112240",
        "lightest-navy": "#233554",
        "navy-shadow": "rgba(2, 12, 27, 0.7)",
        slate: "#8892b0",
        "light-slate": "#a8b2d1",
        "lightest-slate": "#ccd6f6",
        white: "#e6f1ff",
        "green-tint": "rgba(100, 255, 218, 0.1)",
        boldText: "#FFBF69"
      },
      fontFamily: {
        sans: [
          "Geist",
          "Geist Fallback",
          "Calibre",
          "San Francisco",
          "SF Pro Text",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "Geist Mono",
          "Geist Mono Fallback",
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
