<template>
  <Nuxt />
</template>

<style>
body {
  @apply bg-gradient-to-r from-emerald-600 to-cyan-600 text-lg text-teal-100;
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>
