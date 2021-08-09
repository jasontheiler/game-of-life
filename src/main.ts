import "vue-global-api";
import "virtual:windi.css";
import "@fontsource/roboto-mono/latin.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";

import App from "~/App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(MotionPlugin);

app.mount("#app");
