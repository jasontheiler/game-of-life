<template>
  <button @click="$emit('input', !value)">
    <div>
      <FontAwesomeIcon icon="paint-brush" />
    </div>

    <div>
      <FontAwesomeIcon icon="eraser" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
