import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/features/home/HomeView.vue";
import DepositCalculator from "@/features/timed-deposit-calculator/TimedDepositCalculator.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: HomeView,
    },
    {
      path: "/kalkulator/lokata",
      name: "deposit-calculator",
      component: DepositCalculator,
    },
  ],
});

export default router;
