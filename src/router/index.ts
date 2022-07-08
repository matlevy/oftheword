import TestView from "@/views/TestView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: TestView,
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
    path: "/scripture/:book/:chapter/:verse",
    name: "scripture",
    component: () => import("../views/ScriptureView.vue"),
  },
  {
    path: "/alphabet",
    name: "alphabet",
    component: () => import("../views/AlphabetView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/ExistanceSearch.vue"),
  },
  {
    path: "/word/:word",
    name: "word",
    component: () => import("../views/WordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
