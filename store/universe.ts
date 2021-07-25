import { watch, watchEffect } from "@nuxtjs/composition-api";
import { defineStore } from "pinia";

import { getDevicePixels } from "~/utils";

let animationFrameHandle: number;

export const useUniverseStore = defineStore({
  id: "universe",

  state() {
    return {
      universe: null as any,
      isRunning: false,
      areToolsSwitched: false,
      config: {
        cellSize: 16,
      },
    };
  },

  actions: {
    init() {
      const config = localStorage.getItem("universeConfig");
      if (config) this.config = JSON.parse(config);

      watch(
        () => this.config.cellSize,
        (nextCellSize) => {
          this.stop();
          this.universe?.setCellSize(getDevicePixels(nextCellSize));
        }
      );
      watchEffect(() =>
        localStorage.setItem("universeConfig", JSON.stringify(this.config))
      );
    },

    start() {
      if (this.isRunning) return;

      const render = () => {
        this.universe?.tick();
        animationFrameHandle = requestAnimationFrame(render);
      };

      this.isRunning = true;
      animationFrameHandle = requestAnimationFrame(render);
    },

    stop() {
      if (!this.isRunning) return;

      this.isRunning = false;
      cancelAnimationFrame(animationFrameHandle);
    },

    reset() {
      this.stop();
      this.universe?.killAllCells();
    },
  },
});
