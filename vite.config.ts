import path from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Rsw from "vite-plugin-rsw";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import VueComponents from "unplugin-vue-components/vite";
import { VitePWA as PWA } from "vite-plugin-pwa";

// See: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "./src")}/`,
    },
  },

  plugins: [
    // See: https://vitejs.dev/plugins/
    Vue(),
    // See: https://windicss.org/integrations/vite.html
    WindiCSS(),
    // See: https://github.com/lencx/vite-plugin-rsw
    Rsw({
      cli: "pnpm",
      root: "./src/wasm",
      crates: ["universe"],
    }),
    // See: https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "@vueuse/core", { "@vueuse/core": ["get", "set"] }],
    }),
    // See: https://github.com/antfu/unplugin-icons
    Icons(),
    // See: https://github.com/antfu/unplugin-vue-components
    VueComponents({
      directoryAsNamespace: true,
      dts: true,
      resolvers: [IconsResolver()],
    }),
    // See: https://vite-plugin-pwa.netlify.app/
    PWA({
      manifest: {
        name: "Conway's Game of Life",
        short_name: "Game of Life",
        description:
          "A fast, modern and mobile-friendly implementation of Conway's Game of Life.",
        theme_color: "#41b883",
        background_color: "#0b1015",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
