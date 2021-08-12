import { defineStore } from "pinia";
import { get, useLocalStorage } from "@vueuse/core";

import { getDevicePixels } from "~/utils";
import { Universe } from "~/wasm/universe/pkg";

let interval: number;

export const useUniverseStore = defineStore({
  id: "universe",

  state() {
    return {
      universe: null as Universe | null,
      isRunning: false,
      areToolsSwitched: false,
      realTickrate: 0,
      config: {
        cellSize: 16,
        targetTickrate: 30,
      },
    };
  },

  actions: {
    init() {
      this.config = get(useLocalStorage("universeConfig", this.config));

      watchEffect(() => {
        this.isRunning = false;
        this.universe?.setCellSize(getDevicePixels(this.config.cellSize));
      });

      watchEffect(() => {
        clearInterval(interval);

        if (this.isRunning) {
          interval = window.setInterval(
            () => this.universe?.tick(),
            1000 / this.config.targetTickrate
          );
        }
      });
    },

    toggleRunning() {
      this.isRunning = !this.isRunning;
    },

    reset() {
      this.isRunning = false;
      this.universe?.killAllCells();
    },
  },
});
