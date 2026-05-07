/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,mjs,ts,md,mdx}",
    "./public/**/*.html",
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
        // SECONDARY — driven by CSS variables so a runtime theme picker
        // can swap the whole site's accent color in one click.
        // Defaults are set on :root in globals.css.
        secondary: {
          DEFAULT: "rgb(var(--secondary-500) / <alpha-value>)",
          50: "rgb(var(--secondary-50) / <alpha-value>)",
          100: "rgb(var(--secondary-100) / <alpha-value>)",
          200: "rgb(var(--secondary-200) / <alpha-value>)",
          300: "rgb(var(--secondary-300) / <alpha-value>)",
          400: "rgb(var(--secondary-400) / <alpha-value>)",
          500: "rgb(var(--secondary-500) / <alpha-value>)",
          600: "rgb(var(--secondary-600) / <alpha-value>)",
          700: "rgb(var(--secondary-700) / <alpha-value>)",
          800: "rgb(var(--secondary-800) / <alpha-value>)",
          900: "rgb(var(--secondary-900) / <alpha-value>)",
        },
        ink: "#0F172A",
        muted: "#6B7280",
        line: "#E5E7EB",
        bgalt: "#F5F6F7",
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
        screens: { "2xl": "1440px" },
      },
    },
  },
  plugins: [],
};
