import "vue-global-api";
import "virtual:windi.css";
import "@fontsource/roboto-mono/latin.css"

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "~/App.vue";

createApp(App).use(createPinia()).mount("#app");
