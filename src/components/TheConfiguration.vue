<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";
import { animate, spring } from "motion";

import { useUniverseStore } from "~/store";

const breakpoints = useBreakpoints(breakpointsTailwind);
const gtXl = breakpoints.greater("xl");

const universeStore = useUniverseStore();

const [isOpen, toggleOpen] = useToggle(false);
useEventListener("resize", () => set(isOpen, false));
</script>

<template>
  <div
    class="flex-shrink-0 w-full flex flex-col items-center xl:(w-auto h-full flex-row)"
  >
    <button
      :aria-label="`${isOpen ? 'Close' : 'Open'} configuration`"
      class="w-full h-10 flex justify-center items-center text-lg focus-visible:(outline-none ring-4 ring-current) xl:(w-10 h-full)"
      @click="toggleOpen()"
    >
      <IFaSolidChevronUp
        :class="[isOpen ? 'rotate-180 xl:(rotate-90)' : 'xl:(-rotate-90)']"
        class="transform-gpu transition-transform duration-200"
      />
    </button>

    <Transition
      :css="false"
      @enter="
        (element, done) =>
          animate(
            element,
            {
              width: gtXl ? ['0rem', '32rem'] : ['0%', '100%'],
              maxWidth: gtXl ? '' : ['0rem', '32rem'],
              height: ['0rem', '20rem'],
            },
            { easing: spring() }
          ).finished.then(done)
      "
      @leave="
        (element, done) =>
          animate(
            element,
            {
              width: gtXl ? '0rem' : '0%',
              maxWidth: gtXl ? '' : '0rem',
              height: '0rem',
            },
            { easing: spring() }
          ).finished.then(done)
      "
    >
      <div v-if="isOpen" class="w-full overflow-hidden">
        <div class="w-full h-full p-6 flex flex-col gap-4">
          <AppSlider
            v-model.number="universeStore.config.cellSize"
            :min="1"
            :max="32"
            label="cell_size"
            unit="px"
          />

          <AppSlider
            v-model.number="universeStore.config.targetFramerate"
            :min="1"
            :max="250"
            :scaling-exponent="3"
            label="target_framerate"
            unit="fps"
          />

          <AppCheckbox
            v-model="universeStore.config.displayFramerate"
            label="display_framerate"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
