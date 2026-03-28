import { roundCurrency } from "./roundCurrency";

const taxRate = 0.19;

export const getCapitalGainsTax = (capital: number, grossGains: number) => {
  const tax = grossGains * taxRate;
  return roundCurrency(tax, "ceil");
};
