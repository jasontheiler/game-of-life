import { defineConfig, transform } from "windicss/helpers";
import defaultTheme from "windicss/defaultTheme";

// See: https://windicss.org/guide/configuration.html
export default defineConfig({
  plugins: [
    // See: https://windicss.org/plugins/community/interaction-variants.html
    require("@windicss/plugin-interaction-variants"),
    // See: https://github.com/sambeevors/tailwindcss-neumorphism
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
