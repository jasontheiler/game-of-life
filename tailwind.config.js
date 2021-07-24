const { fontFamily } = require("tailwindcss/defaultTheme");

// Tailwind CSS configuration
// See: https://tailwindcss.com/docs/configuration
module.exports = {
  mode: "jit",

  darkMode: "class",

  plugins: [require("tailwindcss-neumorphism")],

  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      black: "#000000",
      white: "#FFFFFF",
      gray: "#0B1015",
      green: "#41B883",
      purple: "#D6AAFF",
    },

    extend: {
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
