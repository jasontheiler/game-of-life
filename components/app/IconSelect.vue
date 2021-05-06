<template>
  <div class="relative">
    <AppIconButton :icon="value.icon" :size="size" @click="isOpen = !isOpen" />

    <ul
      v-if="isOpen"
      :class="{
        'left-0 bottom-[125%] flex-col': direction === 'up',
        'left-[125%] top-0': direction === 'right',
        'left-0 top-[125%] flex-col': direction === 'down',
        'right-[125%] top-0': direction === 'left',
      }"
      class="absolute rounded-xl flex items-center border border-black border-opacity-10 bg-black bg-opacity-20 backdrop-filter backdrop-blur-md shadow-lg"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="setValue(option)"
      >
        <button
          :class="{
            'w-8 h-8 text-xs': size === 'sm',
            'w-12 h-12 text-xl': size === 'md',
            'w-18 h-18 text-3xl': size === 'lg',
          }"
          class="rounded-xl hover:bg-black hover:bg-opacity-10 text-teal-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-100 transition duration-150"
        >
          <FontAwesomeIcon :icon="option.icon" />
        </button>
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
    value: {
      type: Object as PropType<Option>,
      required: true,
    },

    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },

    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      required: false,
      default: "md",
    },

    direction: {
      type: String as PropType<"up" | "right" | "down" | "left">,
      required: false,
      default: "down",
    },
  },

  setup(_props, { emit }) {
    let isOpen = ref(false);

    let setValue = (option: any) => {
      isOpen.value = false;
      emit("input", option);
    };

    return {
      isOpen,
      setValue,
    };
  },
});
</script>
