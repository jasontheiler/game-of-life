const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

// Tailwind CSS configuration
// See: https://tailwindcss.com/docs/configuration
module.exports = {
  mode: "jit",

  darkMode: "class",

  plugins: [require("tailwindcss-neumorphism")],

  theme: {
    extend: {
      colors: {
        ...colors,
      },

      fontFamily: {
        sans: ["'Roboto Mono'", ...fontFamily.sans],
      },

      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
      },
    },
  },
};
