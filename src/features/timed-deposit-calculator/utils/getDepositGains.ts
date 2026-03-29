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

  const daysRemaining = dateDiffInDays(new Date(), endDate);
  const daysSoFar = totalDays - daysRemaining;
  const currentGrossGain = roundCurrency(grossGain * (daysSoFar / totalDays));
  // This is kinda fake, because if you close the timed deposit, you don't get this money.
  // But it kinda shows the progress of your gains and bankings account show this number.
  const currentNetGain = roundCurrency(currentGrossGain - getCapitalGainsTax(currentGrossGain));

  return {
    taxes,
    netGain,

    currentNetGain,
    daysRemaining,
    totalDays,
  };
};

const daysInYear = 365;
