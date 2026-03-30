import type { DepositDto } from "@/shared/types/DepositDto";
import { formatDate } from "@/shared/utils/formatDate";

export const depositInit = (id: string): DepositDto => ({
  id,
  amount: 1000,
  interest: 2,
  periodMonths: 6,
  startDate: formatDate(new Date()),
});
