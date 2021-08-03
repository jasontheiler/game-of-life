<template>
  <TheReloadPrompt />

  <div class="w-full h-screen flex flex-col-reverse xl:(flex-row-reverse)">
    <TheControls />

    <TheConfiguration />

    <TheUniverse class="bg-darkGray shadow" />
  </div>
</template>

<style>
*:focus {
  @apply !outline-none;
}

body {
  @apply bg-green text-darkGray;
  -webkit-tap-highlight-color: transparent;
}
</style>

<style scoped>
.shadow {
  box-shadow: 0 0 32px #000000;
}
</style>
