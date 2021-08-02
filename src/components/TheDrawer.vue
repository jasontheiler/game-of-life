<script setup lang="ts">
import { useUniverseStore } from "~/store";

const universeStore = useUniverseStore();

const isOpen = ref(false);
</script>

<template>
  <div class="relative flex flex-col xl:flex-row justify-center items-center">
    <button
      class="
        w-full
        xl:w-auto xl:h-full
        flex
        justify-center
        items-center
        text-lg
      "
      @click="isOpen = !isOpen"
    >
      <!-- <FontAwesomeIcon icon="ellipsis-h" class="m-2 xl:rotate-90" /> -->
    </button>

    <Transition>
      <div
        v-if="isOpen"
        class="
          left-0
          xl:left-auto
          right-0
          xl:top-0
          bottom-0
          xl:w-96
          h-full
          xl:h-auto
          overflow-hidden
        "
      >
        <div class="xl:w-96">
          <AppSlider
            v-model="universeStore.config.cellSize"
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
