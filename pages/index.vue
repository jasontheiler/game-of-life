<template>
  <main>
    <button @click="greet('there')">Alert</button>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const greet = ref((_s: string) => {});

    onMounted(async () => {
      const module = await import("~/wasm/universe/pkg");

      greet.value = module.greet;
    });

    return {
      greet,
    };
  },
});
</script>
