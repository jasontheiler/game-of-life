import { defineStore } from "pinia";
import { get, set, throttledWatch, useLocalStorage } from "@vueuse/core";

import { getDevicePixels } from "~/utils";
import { Universe } from "~/wasm/universe/pkg";

export const useUniverseStore = defineStore({
  id: "universe",

  state() {
    return {
      universe: null as Universe | null,
      isRunning: false,
      areToolsSwitched: false,
      realFramerate: 0,
      config: {
        cellSize: 16,
        targetFramerate: 30,
        displayFramerate: false,
      },
    };
  },

  actions: {
    init() {
      this.config = get(useLocalStorage("universeConfig", this.config));

      watch(
        () => this.config.cellSize,
        (nextCellSize) => {
          this.isRunning = false;
          this.universe?.setCellSize(getDevicePixels(nextCellSize));
        }
      );

      const frameTimes = ref<number[]>([]);

      throttledWatch(
        frameTimes,
        (nextFrameTimes) => {
          if (nextFrameTimes.length === 0) {
            this.realFramerate = 0;
            return;
          }

          const totalFrameTime = nextFrameTimes.reduce((a, b) => a + b);
          const meanFrameTime = totalFrameTime / nextFrameTimes.length;

          this.realFramerate = Math.round(1000 / meanFrameTime);
        },
        { throttle: 100 }
      );

      let interval: number;

      watchEffect(() => {
        clearInterval(interval);
        set(frameTimes, []);

        let prevTimestamp = performance.now();

        if (this.isRunning) {
          interval = window.setInterval(() => {
            this.universe?.tick();

            if (get(frameTimes).length >= 10) get(frameTimes).shift();

            const timestamp = performance.now();

            set(frameTimes, [...get(frameTimes), timestamp - prevTimestamp]);

            prevTimestamp = timestamp;
          }, 1000 / this.config.targetFramerate);
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
