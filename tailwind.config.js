/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      lightBlue: "hsl(var(--light-blue))",
      darkRed: "hsl(var(--dark-red))",
      lightRed: "hsl(var(--light-red))",
      coolGray: "hsl(var(--cool-gray))",
      pureWhite: "hsl(var(--pure-white))",
    },
  },
  plugins: [],
};
