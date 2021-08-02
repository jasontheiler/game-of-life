import path from "path";
import { defineConfig } from "vite";
import ViteComponents from "vite-plugin-components";
import { VitePWA } from "vite-plugin-pwa";
import ViteRsw from "vite-plugin-rsw";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

// Vite configuration
// See: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "./src")}/`,
    },
  },

  plugins: [
    ViteComponents({
      directoryAsNamespace: true,
      globalComponentsDeclaration: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Conway's Game of Life",
        short_name: "Game of Life",
        description:
          "A fast, aesthetic and mobile-friendly implementation of Conway's Game of Life.",
        theme_color: "#41b883",
        background_color: "#0f172a",
      },
    }),
    ViteRsw({
      cli: "pnpm",
      root: "./src/wasm",
      crates: ["universe"],
    }),
    Vue(),
    WindiCSS(),
  ],
});
