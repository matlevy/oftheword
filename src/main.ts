import { createApp } from "vue";
import App from "./App.vue";
import { Root } from "./root";
import router from "./router";
import store from "./store";

Root.getInstance().init();

createApp(App).use(store).use(router).mount("#app");
