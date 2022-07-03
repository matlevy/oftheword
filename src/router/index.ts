import TestView from "@/views/TestView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: TestView,
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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
