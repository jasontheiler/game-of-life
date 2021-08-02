<template>
  <div class="w-full h-screen flex flex-col-reverse xl:flex-row-reverse">
    <TheControls />

    <TheDrawer />

    <TheUniverse class="bg-gray shadow" />
  </div>
</template>

<style>
*:focus {
  @apply !outline-none;
}

body {
  @apply bg-green text-gray;
  -webkit-tap-highlight-color: transparent;
}
</style>

<style scoped>
.shadow {
  box-shadow: 0 0 32px #000000;
}
</style>
