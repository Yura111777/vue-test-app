import HomeView from "./components/HomeView.vue";
import MapView from "./components/MapView.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "HomeView",
    component: HomeView,
    path: "/",
  },

  {
    name: "MapView",
    component: MapView,
    path: "/map",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
