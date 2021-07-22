import { watch } from "@nuxtjs/composition-api";
import { defineStore } from "pinia";

export const useUniverseStore = defineStore({
  id: "universe",

  state() {
    return {
      universe: null as any,
      isPlaying: false,
      areToolsSwitched: false,
      config: {
        cellSize: 16,
      },
    };
  },

  actions: {
    resetUniverse() {
      this.isPlaying = false;
      this.universe?.killAllCells();
    },
  },
});

const universeStore = useUniverseStore();

watch(
  () => universeStore.config,
  (newConfig) =>
    localStorage.setItem("universeConfig", JSON.stringify(newConfig)),
  { deep: true }
);

watch(
  () => universeStore.config.cellSize,
  (newCellSize) => universeStore.universe.setCellSize(newCellSize)
);
