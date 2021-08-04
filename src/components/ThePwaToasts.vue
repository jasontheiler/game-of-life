<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
</script>

<template>
  <AppToast :is-shown="offlineReady">
    <p>App is ready to work offline!</p>

    <div class="w-full mt-6 flex justify-end">
      <AppButton variant="secondary" @click="offlineReady = false">
        Dismiss
      </AppButton>
    </div>
  </AppToast>

  <AppToast :is-shown="needRefresh">
    <p>New updates available! Click reload to update.</p>

    <div class="w-full mt-6 flex justify-end gap-6">
      <AppButton variant="secondary" @click="updateServiceWorker()">
        Reload
      </AppButton>

      <AppButton variant="secondary" @click="needRefresh = false">
        Dismiss
      </AppButton>
    </div>
  </AppToast>
</template>
