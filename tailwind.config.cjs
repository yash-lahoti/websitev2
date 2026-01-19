/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/Admissions/**/*.{js,jsx,ts,tsx}"
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Admissions component colors (using CSS variables)
        background: "var(--background, oklch(0.12 0.01 260))",
        foreground: "var(--foreground, oklch(0.98 0 0))",
        card: "var(--card, oklch(0.16 0.01 260))",
        "card-foreground": "var(--card-foreground, oklch(0.98 0 0))",
        popover: "var(--popover, oklch(0.16 0.01 260))",
        "popover-foreground": "var(--popover-foreground, oklch(0.98 0 0))",
        primary: "var(--primary, oklch(0.7 0.18 180))",
        "primary-foreground": "var(--primary-foreground, oklch(0.12 0.01 260))",
        secondary: "var(--secondary, oklch(0.22 0.01 260))",
        "secondary-foreground": "var(--secondary-foreground, oklch(0.98 0 0))",
        muted: "var(--muted, oklch(0.22 0.01 260))",
        "muted-foreground": "var(--muted-foreground, oklch(0.65 0 0))",
        accent: "var(--accent, oklch(0.7 0.18 180))",
        "accent-foreground": "var(--accent-foreground, oklch(0.12 0.01 260))",
        destructive: "var(--destructive, oklch(0.577 0.245 27.325))",
        "destructive-foreground": "var(--destructive-foreground, oklch(0.577 0.245 27.325))",
        border: "var(--border, oklch(0.28 0.01 260))",
        input: "var(--input, oklch(0.22 0.01 260))",
        ring: "var(--ring, oklch(0.7 0.18 180))",
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
