import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import ViteAutoImport from "unplugin-auto-import/vite";
import ViteComponents from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import ViteRsw from "vite-plugin-rsw";
import ViteWindiCSS from "vite-plugin-windicss";
import ViteVue from "@vitejs/plugin-vue";

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
    ViteAutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        {
          "@vueuse/core": ["get", "set"],
        },
      ],
    }),
    ViteVue(),
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
  ],
});
