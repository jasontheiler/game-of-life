<template>
  <Nuxt />
</template>

<style>
body {
  @apply bg-green text-gray;
  -webkit-tap-highlight-color: transparent;
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>
