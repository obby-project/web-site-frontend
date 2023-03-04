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
    extend: {
      keyframes: {
        scaling: {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.8)" },
        },
      },
      animation: {
        "scaling-mask": "scaling 3s linear infinite",
      },
    },
  },
};
