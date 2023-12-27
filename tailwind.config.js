/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans"],
      },
      backgroundImage: {
        "positive-radial": "radial-gradient(circle, #0b2f19 0%, #04180c 100%)",
        "negative-radial": "radial-gradient(circle, #2b0606 0%, #0c0202 100%)",
      },
    },
  },
  plugins: [],
};
