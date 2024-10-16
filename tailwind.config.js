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
        textColor2: "rgba(75, 85, 99, 1)",
        textColor3: "rgba(17, 25, 40, 1)",
        siderbarBG: "rgba(0, 0, 0, 1)",
        customBlue: "rgba(28, 100, 242, 1)",
        invoiceColor: "rgba(5, 122, 85, 1)",
        customRed: "rgba(240, 82, 82, 1)",
        separatorColor: "rgba(55, 65, 81, 1)",
        iconColor: "rgba(107, 114, 128, 1)",
        iconColor2: "rgba(156, 163, 175, 1)",
        borderColor: "rgba(209, 213, 219, 1)",
        borderColor2: "rgba(249, 250, 251, 1)",
        skyBlue: "rgba(141, 162, 251, 1)",
        yellow: "rgba(227, 160, 8, 1)",
        red: "rgba(224, 36, 36, 1)",
        red2: " rgba(155, 28, 28, 1)",
        green: "rgba(3, 84, 63, 1)",
        purple: "rgba(66, 56, 157, 1)",
        customRed2: "rgba(114, 59, 19, 1)",
        customBg1: "rgba(222, 247, 236, 1)",
        customBg2: "rgba(243, 244, 246, 1)",
        customBg3: "rgba(253, 232, 232, 1)",
        customBg4: "rgba(229, 237, 255, 1)",
        customBg5: "rgba(253, 246, 178, 1)",
        customBg6: "rgba(225, 239, 254, 1)",
        customBg7: "rgba(253, 186, 140, 1)",
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
