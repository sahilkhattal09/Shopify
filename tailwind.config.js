/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "custom-gradient":
        "linear-gradient(246.28deg, #F197F4 -27.32%, #5B6AAA 86.32%)",
    },
    extend: {
      fontFamily: {
        cursive: ['"Dancing Script"', "cursive"], // Example of a cursive font
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
