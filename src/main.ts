import { createApp } from "vue";
import App from "./App.vue";
import { Root } from "./root";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRightToBracket);

Root.getInstance().init();

createApp(App).use(store).use(router).mount("#app");
