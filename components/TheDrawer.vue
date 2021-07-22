<template>
  <section class="w-full py-6">
    <AppSlider
      v-model="universeStore.config.cellSize"
      :min="2"
      :max="24"
      :step="2"
      label="cell_size"
      unit="px"
      isLazy
    />
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
