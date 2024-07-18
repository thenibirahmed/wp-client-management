/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.js",
    "./src/frontend.js",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "rgba(31, 42, 55, 1)",
        siderbarBG: "rgba(0, 0, 0, 1)",
        customBlue: " rgba(28, 100, 242, 1)",
        separatorColor: "rgba(55, 65, 81, 1)",
        iconColor: "rgba(107, 114, 128, 1)",
        iconColor2: "rgba(156, 163, 175, 1)",
      },
      fontFamily: {
        metropolis: ["Metropolis", "sans-serif"],
      },
      // margin: {
      //   "-px4": "-1rem",
      // },
    },
  },
  plugins: [],
};
