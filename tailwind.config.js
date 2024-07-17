const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.js",
    "./src/frontend.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundColor: {
        btnColor: "rgba(28, 100, 242, 1)",
        btnHoverColor: "rgba(20, 80, 200, 1)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

// "node_modules/flowbite-react/lib/esm/**/*.js",
// require("flowbite/plugin");
