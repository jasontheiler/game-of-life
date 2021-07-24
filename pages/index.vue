<template>
  <div
    class="
      w-full
      h-screen
      flex flex-col-reverse
      xl:flex-row-reverse
      overflow-hidden
    "
  >
    <aside class="flex flex-col-reverse xl:flex-row-reverse">
      <TheControls />

      <TheDrawer />
    </aside>

    <main class="w-full h-full bg-white dark:bg-gray shadow">
      <TheUniverse />
    </main>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0 0 32px #000000;
}
</style>
