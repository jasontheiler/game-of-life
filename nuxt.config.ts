import { resolve } from "path";
import { NuxtConfig } from "@nuxt/types";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";
import normalizeUrl from "normalize-url";

// Reads environment variables.
const { BASE_URL, NODE_ENV } = process.env;
const baseUrl =
  BASE_URL && normalizeUrl(BASE_URL, { forceHttps: NODE_ENV === "production" });

const config: NuxtConfig = {
  // Directories configuration
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-dir
  dir: {
    static: "public",
  },

  // Target configuration
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-target
  target: "static",

  // Default metadata
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-head/
  head: {
    meta: [
      {
        hid: "viewport",
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      },
    ],
  },

  // Global CSS
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-css/
  css: ["@fontsource/roboto-mono/latin.css"],

  // Plugins to load before mounting the app
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-plugins/
  plugins: [{ src: "~/plugins/polyfills.ts", mode: "client" }],

  // Components auto import
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-components/
  components: true,

  // Build modules
  // See:
  //   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
  //   - https://typescript.nuxtjs.org/
  //   - https://composition-api.nuxtjs.org/
  //   - https://pinia.esm.dev/
  //   - https://tailwindcss.nuxtjs.org/
  //   - https://github.com/nuxt-community/fontawesome-module
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/composition-api/module",
    "pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontawesome",
  ],

  // Build configuration
  // See: https://nuxtjs.org/guides/configuration-glossary/configuration-build/
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

  // Font Awesome Icons configuration
  // See: https://github.com/nuxt-community/fontawesome-module#module-options
  fontawesome: {
    icons: {
      solid: [
        "faChevronUp",
        "faUndoAlt",
        "faPlay",
        "faPause",
        "faPaintBrush",
        "faEraser",
      ],
    },
  },

  // Modules
  // See:
  //   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
  //   - https://pwa.nuxtjs.org/
  //   - https://github.com/nuxt-community/robots-module/
  modules: ["@nuxtjs/pwa", "@nuxtjs/robots"],

  // PWA configuration
  // See: https://pwa.nuxtjs.org/setup/#configuration
  pwa: {
    manifest: {
      name: "Conway's Game of Life",
      short_name: "Game of Life",
      description:
        "A fast, aesthetic and mobile-friendly implementation of Conway's Game of Life.",
      background_color: "#0F172A",
    },

    meta: {
      name: "Conway's Game of Life",
      author: "Jason Theiler",
      description:
        "A fast, aesthetic and mobile-friendly implementation of Conway's Game of Life.",
      ogHost: baseUrl,
      ogImage: "/image.png",
      twitterCard: "summary_large_image",
      theme_color: "#0F172A",
    },
  },
};

export default config;
