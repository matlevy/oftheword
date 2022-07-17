import { createApp } from "vue";
import App from "./App.vue";
import { Root } from "./root";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightToBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRightToBracket);
library.add(faTrashCan);

Root.getInstance().init();

createApp(App).use(store).use(router).mount("#app");
