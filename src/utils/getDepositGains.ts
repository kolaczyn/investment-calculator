import { dateDiffInDays } from "./dateDiffInDays";
import { getCapitalGainsTax } from "./getCapitalGainsTax";
import { getDepositEndDate } from "./getDepositEndDate";
import { roundCurrency } from "./roundCurrency";

type Args = {
  amount: number;
  startDate: Date;
  periodMonths: number;
  annualGain: number;
};

export const getDepositGains = ({ amount, startDate, periodMonths, annualGain }: Args) => {
  const endDate = getDepositEndDate(startDate, periodMonths);
  const totalDays = dateDiffInDays(startDate, endDate);
  const percantageDuringDays = annualGain * (totalDays / daysInYear);

  const grossGain = roundCurrency(amount * percantageDuringDays);
  const taxes = getCapitalGainsTax(amount, grossGain);
  const netGain = roundCurrency(grossGain - taxes);
  return {
    taxes,
    netGain,
  };
};

const daysInYear = 365;
