import type { TimedDeposit } from "@/shared/types/TimedDeposit";
import { formatDate } from "@/shared/utils/formatDate";

export const depositInit = (id: string): TimedDeposit => ({
  id,
  amount: 1000,
  annualInterest: 2,
  periodMonths: 6,
  startDate: formatDate(new Date()),
});
