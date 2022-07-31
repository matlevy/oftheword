import AlphabetView from "../views/AlphabetView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AlphabetFullGrid from "@/views/AlphabetFullGrid.vue";
import GenesisOpeningVue from "@/views/GenesisOpening.vue";
import MathematicalPhen from "@/views/MathematicalPhenomenom.vue";
import FibonacciViewVue from "@/views/FibonacciView.vue";
import PrimesView from "@/views/PrimesView.vue";
import { Book } from "@/types/Book";
import { Chapter } from "@/types/Chapter";
import { Root } from "@/root";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: AlphabetFullGrid,
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
    props: (route) => {
      const chapterNumber = Number(route.params.chapter) - 1;
      const bookNum = Number(route.params.book) - 1;
      const books: Book[] = Root.getInstance().currentSource?.books as Book[];
      const chapter: Chapter = books[bookNum].chapters[chapterNumber];
      return {
        chapter,
      };
    },
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
    path: "/alphabet/grid/:book/:chapter/:verse/:stream",
    name: "alphabetgrid-by-stream",
    component: AlphabetFullGrid,
  },
  {
    path: "/alphabet/grid",
    name: "alphabetgrid",
    component: AlphabetFullGrid,
  },
  {
    path: "/alphabet/mathandscience",
    name: "alphabetmath",
    component: MathematicalPhen,
  },
  {
    path: "/alphabet",
    name: "alphabet",
    component: AlphabetView,
  },
  {
    path: "/fibonacci",
    name: "fibonacci",
    component: FibonacciViewVue,
  },
  {
    path: "/primes",
    name: "primes",
    component: PrimesView,
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
