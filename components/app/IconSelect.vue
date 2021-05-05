<template>
  <div class="relative">
    <AppIconButton :icon="value.icon" @click="isOpen = !isOpen" />

    <ul v-if="isOpen">
      <li
        v-for="option in options"
        :key="option.value"
        @click="setValue(option)"
      >
        <FontAwesomeIcon :icon="option.icon" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api";
import { IconName } from "@fortawesome/free-solid-svg-icons";

export type Option = {
  value: any;
  icon: IconName;
};

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },

    value: {
      type: Object as PropType<Option>,
      required: true,
    },
  },

  setup(_props, { emit }) {
    let isOpen = ref(false);
    let setValue = (option: any) => emit("input", option);

    return {
      isOpen,
      setValue,
    };
  },
});
</script>
