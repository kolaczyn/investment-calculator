export type TimedDeposit = {
  id: string;
  amount: number;
  annualInterest: number;
  periodMonths: number;
  // in yyyy-mm-dd format (for example 2026-02-27)
  startDate: string;
};
