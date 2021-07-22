<template>
  <Nuxt />
</template>

<style>
body {
  @apply bg-white dark:bg-black text-black dark:text-white;
  -webkit-tap-highlight-color: transparent;
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>
