export type DepositDto = {
  id: string;
  amount: number;
  // in percent (e.g. 2 means 2%)
  annualInterest: number;
  periodMonths: number;
  // in yyyy-mm-dd format (e.g. 2026-02-27)
  startDate: string;
};
