import { defineConfig, transform } from "windicss/helpers";

// Windi CSS configuration
// See: https://windicss.org/guide/configuration.html
export default defineConfig({
  plugins: [
    require("@windicss/plugin-interaction-variants"),
    transform("tailwindcss-neumorphism"),
  ],

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
        body: ["'Roboto Mono'"],
      },
    },
  },
});
