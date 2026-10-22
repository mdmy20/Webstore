/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#5B3825",
        tertiary: "#FFFFFF",
        neutral: "#E5E7EB",
        surface: "#FFFFFF",
        "on-surface": "#111827",
        error: "#D92D20",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      spacing: {
        xs: "6px",
        sm: "20px",
        md: "60px",
        lg: "80px",
        xl: "190px",
      },
      fontFamily: {
        hardbop: ["Hardbop", "Syne", "Montserrat", "sans-serif"],
        heading: ["HeadingNow", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
