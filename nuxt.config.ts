import { NuxtConfig } from "@nuxt/types";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";
import { resolve } from "path";

import { fixUrl } from "./utils";

// Reads environment variables.
const { BASE_URL } = process.env;
const baseUrl = fixUrl(BASE_URL ?? "");

const config: NuxtConfig = {
  /*
   * Dir configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-dir
   */
  dir: {
    static: "public",
  },

  /*
   * Target configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-target
   */
  target: "static",

  /*
   * Generate configuration
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-generate/
   *   - https://composition-api.nuxtjs.org/getting-started/setup#quick-start
   */
  generate: {
    interval: 2000,
  },

  /*
   * Public runtime configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-runtime-config/
   */
  publicRuntimeConfig: {
    baseUrl,
  },

  /*
   * Global CSS
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-css/
   */
  css: ["@fontsource/inter/latin.css"],

  /*
   * Plugins to load before mounting the app
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-plugins/
   */
  plugins: [{ src: "~/plugins/polyfills.ts", mode: "client" }],

  /*
   * Auto import components
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-components/
   */
  components: true,

  /*
   * Build modules
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
   *   - https://typescript.nuxtjs.org/
   *   - https://composition-api.nuxtjs.org/
   *   - https://color-mode.nuxtjs.org/
   *   - https://tailwindcss.nuxtjs.org/
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/composition-api/module",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
  ],

  /*
   * Build configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-build/
   */
  build: {
    plugins: [
      new WasmPackPlugin({
        crateDirectory: resolve(__dirname, "./wasm/universe"),
        outDir: resolve(__dirname, "./wasm/universe/pkg"),
      }),
    ],

    postcss: {
      plugins: {
        "postcss-focus-visible": {},
      },
    },
  },

  /*
   * Color mode configuration
   * See: https://color-mode.nuxtjs.org/#configuration
   */
  colorMode: {
    classSuffix: "",
  },

  /*
   * Tailwind CSS configuration
   * See: https://tailwindcss.nuxtjs.org/options
   */
  tailwindcss: {
    jit: true,
  },

  /*
   * Modules
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
   *   - https://pwa.nuxtjs.org/
   *   - https://github.com/nuxt-community/robots-module/
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/robots"],

  /*
   * PWA configuration
   * See: https://pwa.nuxtjs.org/setup/#configuration
   */
  pwa: {
    manifest: {
      name: "Conway's Game of Life",
      short_name: "Game of Life",
      description: "Work in progress!",
      background_color: "#000000",
    },

    meta: {
      name: "Conway's Game of Life",
      author: "Jason Theiler",
      description: "Work in progress!",
      ogHost: baseUrl,
      ogImage: "/image.png",
      twitterCard: "summary_large_image",
      theme_color: "#000000",
    },
  },
};

export default config;
