import { defineConfig, transform } from "windicss/helpers";
import defaultTheme from "windicss/defaultTheme";

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
      white: "#ffffff",
      darkGray: "#0b1015",
      lightGray: "#1d2935",
      green: "#41b883",
      purple: "#997fff",
    },

    fontFamily: {
      sans: ["'Roboto Mono'", ...defaultTheme.fontFamily.sans],
    },
  },
});
