<script setup lang="ts">
const props = defineProps({
  value: Boolean,
});
</script>

<template>
  <button
    class="
      w-[5.5rem]
      xl:w-12
      h-12
      xl:h-[5.5rem]
      -m-6
      rounded-full
      nm-concave-green-lg
      active:nm-inset-green-lg
      focus-visible:outline-none
    "
    @click="$emit('input', !props.value)"
  >
    <div
      class="
        relative
        w-full
        h-full
        p-1
        rounded-full
        flex
        xl:flex-col
        justify-around
        items-center
        group-focus-visible:ring-4 group-focus-visible:ring-current
        transition-shadow
        duration-100
      "
    >
      <div
        :class="[
          props.value
            ? 'left-1/2 xl:left-1 right-1 top-1 xl:top-1/2 bottom-1 activate'
            : 'left-1 right-1/2 xl:right-1 top-1 bottom-1 xl:bottom-1/2 deactivate',
        ]"
        class="absolute z-0 rounded-full bg-purple shadow-md"
      />

      <!-- <FontAwesomeIcon icon="paint-brush" class="z-10" /> -->

      <!-- <FontAwesomeIcon icon="eraser" class="z-10" /> -->
    </div>
  </button>
</template>

<style scoped>
.activate {
  animation: switch-right 200ms;
}

@screen xl {
  .activate {
    animation: switch-down 200ms;
  }
}

.deactivate {
  animation: switch-left 200ms;
}

@screen xl {
  .deactivate {
    animation: switch-up 200ms;
  }
}

@keyframes switch-right {
  0% {
    @apply left-1 right-1/2;
  }
  50% {
    @apply left-1 right-1;
  }
  100% {
    @apply left-1/2 right-1;
  }
}

@keyframes switch-left {
  0% {
    @apply left-1/2 right-1;
  }
  50% {
    @apply left-1 right-1;
  }
  100% {
    @apply left-1 right-1/2;
  }
}

@keyframes switch-down {
  0% {
    @apply top-1 bottom-1/2;
  }
  50% {
    @apply top-1 bottom-1;
  }
  100% {
    @apply top-1/2 bottom-1;
  }
}
@keyframes switch-up {
  0% {
    @apply top-1/2 bottom-1;
  }
  50% {
    @apply top-1 bottom-1;
  }
  100% {
    @apply top-1 bottom-1/2;
  }
}
</style>
