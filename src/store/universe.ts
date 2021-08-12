import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

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
      this.config = useLocalStorage("universeConfig", this.config).value;

      watch(
        () => this.config.cellSize,
        (nextCellSize) => {
          this.isRunning = false;
          this.universe?.setCellSize(getDevicePixels(nextCellSize));
        }
      );

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
