<template>
  <Nuxt />
</template>

<style>
body {
  @apply bg-gradient-to-r from-blueGray-800  to-blueGray-900 text-white;
  -webkit-tap-highlight-color: transparent;
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>
