/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "ph-primary": "#E1701A",
        "ph-primary-soft": "#E77D24",
        "ph-yellow-soft": "#F7A440",
        "ph-dark": "#232B2B",
        "ph-smoke": "#F5F5F5",
        "ph-white": "#FFFFFF",
        "primary-dark": "#994D1C",
      },
      ringWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};