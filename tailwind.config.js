/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ef233c",
        secondary: "#2b2d42",
      },
    },
  },
  plugins: [],
};
