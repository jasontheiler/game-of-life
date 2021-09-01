import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Rsw from "vite-plugin-rsw";
import AutoImport from "unplugin-auto-import/vite";
import VueComponents from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { VitePWA as PWA } from "vite-plugin-pwa";

// Vite configuration
// See: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "./src")}/`,
    },
  },

  plugins: [
    Vue(),
    WindiCSS(),
    Rsw({
      cli: "pnpm",
      root: "./src/wasm",
      crates: ["universe"],
    }),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        {
          "@vueuse/core": ["get", "set"],
        },
      ],
    }),
    VueComponents({
      directoryAsNamespace: true,
      dts: true,
      resolvers: [IconsResolver()],
    }),
    Icons(),
    PWA({
      manifest: {
        name: "Conway's Game of Life",
        short_name: "Game of Life",
        description:
          "A fast, modern and mobile-friendly implementation of Conway's Game of Life.",
        theme_color: "#41b883",
        background_color: "#0b1015",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
