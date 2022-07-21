import CustomView from "@/views/CustomView.vue";
import AlphabetView from "../views/AlphabetView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AlphabetFullGrid from "@/views/AlphabetFullGrid.vue";
import GenesisOpeningVue from "@/views/GenesisOpening.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: CustomView,
  },
  {
    path: "/custom",
    name: "custom",
    component: () => import("../views/CustomView.vue"),
  },
  {
    path: "/book/:book/:chapter/:verse",
    name: "scripture",
    component: () => import("../views/ScriptureView.vue"),
  },
  {
    path: "/book/:book/:chapter",
    name: "chapter",
    component: () => import("../views/RawChapterView.vue"),
  },
  {
    path: "/book/:book",
    name: "book",
    component: () => import("../views/RawBookView.vue"),
  },
  {
    path: "/wc/:book/:chapter/:verse",
    name: "bowordcolumnok",
    component: () => import("../views/ScriptureWordColumnView.vue"),
  },
  {
    path: "/alphabet/grid",
    name: "alphabetgrid",
    component: AlphabetFullGrid,
  },
  {
    path: "/alphabet",
    name: "alphabet",
    component: AlphabetView,
  },
  {
    path: "/genesis/opening",
    name: "genesis-opening",
    component: GenesisOpeningVue,
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/ExistanceSearch.vue"),
  },
  {
    path: "/word/:search/:subsearch",
    name: "subword",
    props: true,
    component: () => import("../views/WordView.vue"),
  },
  {
    path: "/word/:search",
    name: "word",
    props: true,
    component: () => import("../views/WordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
