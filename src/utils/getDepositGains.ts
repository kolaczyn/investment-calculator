import { dateDiffInDays } from "./dateDiffInDays";
import { getCapitalGainsTax } from "./getCapitalGainsTax";
import { getDepositEndDate } from "./getDepositEndDate";
import { roundCurrency } from "./roundCurrency";

type Args = {
  capital: number;
  startDate: Date;
  periodMonths: number;
  annualGain: number;
};

// TODO compound interests
export const getDepositGains = (args: Args) => {
  console.log(args);
  const { capital, startDate, periodMonths, annualGain } = args;
  const endDate = getDepositEndDate(startDate, periodMonths);
  const totalDays = dateDiffInDays(startDate, endDate);
  const percantageDuringDays = annualGain * (totalDays / daysInYear);

  const grossGain = roundCurrency(capital * percantageDuringDays);
  const taxes = getCapitalGainsTax(capital, grossGain);
  const netGain = roundCurrency(grossGain - taxes);
  return {
    taxes,
    netGain,
  };
};

const daysInYear = 365;
