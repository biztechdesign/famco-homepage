import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY — Al-Futtaim Famco deep blue (logo dark blue)
        primary: {
          DEFAULT: "#0D4F8B",
          50: "#EAF2FA",
          100: "#CDDDF0",
          200: "#99BAE0",
          300: "#5E8FCB",
          400: "#2E6BB1",
          500: "#0D4F8B",
          600: "#0A406F",
          700: "#082F52",
          800: "#051F37",
          900: "#02101D",
        },
        // SECONDARY — Al-Futtaim Famco cyan-blue (logo light blue)
        secondary: {
          DEFAULT: "#00A0E0",
          50: "#E6F6FD",
          100: "#BFEAFA",
          200: "#80D5F5",
          300: "#40C0EF",
          400: "#1DB0E8",
          500: "#00A0E0",
          600: "#0083B7",
          700: "#00658C",
          800: "#004862",
          900: "#002937",
        },
        // Black & white-grayscale only for typography / surfaces
        ink: "#0F172A",          // body text on light
        muted: "#6B7280",        // secondary body text (neutral gray)
        line: "#E5E7EB",         // borders / dividers
        bgalt: "#F5F6F7",        // subtle off-white section bg
        // Charcoal black — BAS-style, never pure #000
        charcoal: {
          DEFAULT: "#1A1A1F",
          50: "#F4F4F5",
          100: "#E4E4E7",
          200: "#C9C9D0",
          300: "#9F9FA8",
          400: "#5C5C65",
          500: "#3A3A42",
          600: "#262630",
          700: "#1A1A1F",
          800: "#101015",
          900: "#08080B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04)",
        lift: "0 8px 24px rgba(0,0,0,.10)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", lg: "1.5rem" },
        screens: { "2xl": "1280px" },
      },
    },
  },
  plugins: [],
};

export default config;
