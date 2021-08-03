import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import ViteComponents from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import ViteRsw from "vite-plugin-rsw";
import ViteWindiCSS from "vite-plugin-windicss";
import Vue from "@vitejs/plugin-vue";

// Vite configuration
// See: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "./src")}/`,
    },
  },

  plugins: [
    VitePWA({
      manifest: {
        name: "Conway's Game of Life",
        short_name: "Game of Life",
        description:
          "A fast, aesthetic and mobile-friendly implementation of Conway's Game of Life.",
        theme_color: "#41b883",
        background_color: "#0f172a",
      },
    }),
    ViteComponents({
      directoryAsNamespace: true,
      globalComponentsDeclaration: true,
      customComponentResolvers: [ViteIconsResolver()],
    }),
    ViteIcons(),
    ViteRsw({
      cli: "pnpm",
      root: "./src/wasm",
      crates: ["universe"],
    }),
    ViteWindiCSS(),
    Vue(),
  ],
});
