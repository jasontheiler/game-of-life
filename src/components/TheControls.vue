<script setup lang="ts">
import { useUniverseStore } from "~/store";

const universeStore = useUniverseStore();
</script>

<template>
  <div
    class="w-full max-w-128 mx-auto p-6 flex justify-around items-center xl:(w-auto h-full max-h-128 my-auto flex-col)"
  >
    <AppIconButton aria-label="Reset" @click="universeStore.reset()">
      <IFaSolidUndoAlt />
    </AppIconButton>

    <AppIconButton
      :aria-label="universeStore.isRunning ? 'Pause' : 'Play'"
      size="lg"
      @click="
        universeStore.isRunning ? universeStore.stop() : universeStore.start()
      "
    >
      <IFaSolidPause v-if="universeStore.isRunning" />

      <IFaSolidPlay v-else />
    </AppIconButton>

    <TheToolToggle v-model="universeStore.areToolsSwitched" />
  </div>
</template>
