<template>
  <Nuxt />
</template>

<style>
body {
  @apply bg-gradient-to-r from-purple-600 to-indigo-600;
  /* @apply from-cyan-600 to-blue-600; */
  /* @apply from-green-600 to-teal-600; */
  /* @apply from-yellow-600 to-orange-600; */
  /* @apply from-pink-600 to-red-600; */
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>
