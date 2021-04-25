const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

// Tailwind CSS configuration
// See: https://tailwindcss.com/docs/configuration
module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
      },

      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },

      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
      },
    },
  },
};
