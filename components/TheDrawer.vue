<template>
  <section>
    <button></button>

    <div>
      <AppSlider
        v-model="universeStore.config.cellSize"
        :min="1"
        :max="24"
        label="cell_size"
        unit="px"
        isLazy
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

import { useUniverseStore } from "~/store";

export default defineComponent({
  setup() {
    const universeStore = useUniverseStore();

    return {
      universeStore,
    };
  },
});
</script>
