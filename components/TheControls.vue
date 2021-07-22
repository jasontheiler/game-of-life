<template>
  <section class="w-full py-6 flex justify-around items-center">
    <AppIconButton icon="undo-alt" @click="universeStore.resetUniverse()" />

    <AppIconButton
      :icon="universeStore.isPlaying ? 'pause' : 'play'"
      size="lg"
      @click="universeStore.isPlaying = !universeStore.isPlaying"
    />

    <TheToolSwitch v-model="universeStore.areToolsSwitched" />
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
