<template>
  <section class="w-full py-6 flex justify-around items-center">
    <AppIconButton icon="undo-alt" @click="$emit('reset')" />

    <AppIconButton
      :icon="isPlaying ? 'pause' : 'play'"
      size="lg"
      @click="$emit('togglePlay')"
    />

    <AppIconButton icon="pen-square" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    isPlaying: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
