import type { TimedDeposit } from "./types/TimedDeposit";

const mockTimedDeposits: TimedDeposit[] = [
  {
    id: "1",
    amount: 1000,
    annualInterest: 0.02,
    periodMonths: 6,
    startDate: "2026-01-19",
  },
];

export const mockData = {
  timedDeposits: mockTimedDeposits,
};
