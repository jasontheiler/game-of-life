<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <main>
      <canvas class="w-full shadow-lg" ref="canvas" />
    </main>

    <aside>
      <button>Play</button>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

import { useUniverse } from "~/composables";

const WIDTH = 10;
const HEIGHT = 10;
const CELL_SIZE = 10;
const GRID_COLOR = "#CCCCCC";
const CELL_COLOR = "#000000";

export default defineComponent({
  setup() {
    const { canvas } = useUniverse(WIDTH, HEIGHT);

    return {
      canvas,
    };
  },
});
</script>
