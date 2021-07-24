<template>
  <section
    class="
      w-full
      xl:w-auto
      max-w-[32rem]
      xl:h-full xl:max-h-[32rem]
      mx-auto
      xl:my-auto
      p-6
      flex
      xl:flex-col
      justify-around
      items-center
    "
  >
    <AppIconButton icon="undo-alt" @click="universeStore.reset()" />

    <AppIconButton
      :icon="universeStore.isRunning ? 'pause' : 'play'"
      size="lg"
      @click="
        universeStore.isRunning ? universeStore.stop() : universeStore.start()
      "
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
