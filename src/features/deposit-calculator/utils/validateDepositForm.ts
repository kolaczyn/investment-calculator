import type { DepositDto } from "@/shared/types/DepositDto";

export const validateDepositForm = (form: DepositDto) => ({
  amount: form.amount < 1000 ? "Minimalna kwota to 1000 zł" : null,
  startDate: null,
  interest: form.interest <= 0 ? "Oprocentowanie musi być dodatnie" : null,
  periodMonths: form.periodMonths <= 0 ? "Miesiące muszą być dodatnie" : null,
});
