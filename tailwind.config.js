/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.js",
    "./src/frontend.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        metropolis: ["Metropolis", "sans-serif"],
      },
    },
  },
  plugins: [],
};
