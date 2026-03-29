import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/features/home/HomeView.vue";
import TimedDepositCalculatorView from "@/features/timed-deposit-calculator/TimedDepositCalculatorView.vue";

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
      name: "timed-deposit-calculator",
      component: TimedDepositCalculatorView,
    },
  ],
});

export default router;
