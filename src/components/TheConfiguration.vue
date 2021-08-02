<script setup lang="ts">
import { useToggle } from "@vueuse/core";

import { useUniverseStore } from "~/store";

const universeStore = useUniverseStore();

const isOpen = ref(false);
const toggleOpen = useToggle(isOpen);
</script>

<template>
  <div class="relative flex flex-col justify-center items-center xl:(flex-row)">
    <button
      :aria-label="`${isOpen ? 'Close' : 'Open'} configuration`"
      class="w-full flex justify-center items-center text-lg xl:(w-auto h-auto)"
      @click="toggleOpen()"
    >
      <IFaSolidEllipsisH class="m-2 transform-gpu xl:(rotate-90)" />
    </button>

    <Transition>
      <div
        v-if="isOpen"
        class="left-0 right-0 bottom-0 h-full overflow-hidden xl:(left-auto top-0 w-96 h-auto)"
      >
        <div class="xl:(w-96)">
          <AppSlider
            v-model.number="universeStore.config.cellSize"
            :min="1"
            :max="24"
            id="cell-size"
            label="cell_size"
            unit="px"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
