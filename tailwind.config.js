/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5faff",
          100: "#e0f2ff",
          200: "#b9e0ff",
          300: "#8ecbff",
          400: "#5fb4ff",
          500: "#369aff",
          600: "#1a7fe6",
          700: "#0c63b8",
          800: "#074889",
          900: "#042d5b",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "Inter", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      spacing: {
        18: "4.5rem",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
