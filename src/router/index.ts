import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/features/home/HomeView.vue";
import DepositCalculatorView from "@/features/deposit-calculator/DepositCalculatorView.vue";
import DepositInfoView from "@/features/deposit-calculator/DepositInfoView.vue";
import DepositAddView from "@/features/deposit-calculator/DepositAddView.vue";
import BondsCalculatorView from "@/features/bonds-calculator/BondsCalculatorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: HomeView,
    },
    {
      path: "/lokaty/dodaj",
      name: "deposit-add",
      component: DepositAddView,
    },
    {
      path: "/lokaty/:id",
      name: "deposit-info",
      component: DepositInfoView,
    },
    {
      path: "/kalkulator/lokata",
      name: "deposit-calculator",
      component: DepositCalculatorView,
    },
    {
      path: "/kalkulator/obligacje",
      name: "bonds-calculator",
      component: BondsCalculatorView,
    },
  ],
});

export default router;
