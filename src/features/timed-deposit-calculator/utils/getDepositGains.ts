import { getCapitalGainsTax } from "@/shared/utils/getCapitalGainsTax";
import { dateDiffInDays } from "./dateDiffInDays";
import { getDepositEndDate } from "./getDepositEndDate";
import { roundCurrency } from "@/shared/utils/roundCurrency";

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
  const taxes = getCapitalGainsTax(grossGain);
  const netGain = roundCurrency(grossGain - taxes);
  return {
    taxes,
    netGain,
  };
};

const daysInYear = 365;
