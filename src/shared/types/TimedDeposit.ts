export type TimedDeposit = {
  id: string;
  amount: number;
  // in yyyy-mm-dd format (for example 2026-02-27)
  startDate: string;
  annualInterest: number;
  periodMonths: number;
};
