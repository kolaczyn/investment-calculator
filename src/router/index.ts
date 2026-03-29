import { createRouter, createWebHistory } from "vue-router";
import DepositCalculatorVue from "@/components/deposit/DepositCalculatorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: DepositCalculatorVue,
    },
  ],
});

export default router;
