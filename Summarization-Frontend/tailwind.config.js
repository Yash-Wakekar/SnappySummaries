/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif"],
    },
    height: {
      custom: "28rem",
    },
    extend: {
      colors: {
        green: "#00df9a", // Replace this with your desired green color value
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
