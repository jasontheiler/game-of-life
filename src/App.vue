<template>
  <ThePwaToasts />

  <div
    class="w-full h-screen flex flex-col-reverse items-center overflow-hidden xl:(flex-row-reverse)"
  >
    <TheControls />

    <TheConfiguration />

    <TheUniverse />
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
