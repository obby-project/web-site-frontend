/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    colors: {
      "primary-blue": "var(--primary-blue)",
      "primary-red": "var(--primary-red)",
      "primary-green": "var(--primary-green)",
    },
  },
};
