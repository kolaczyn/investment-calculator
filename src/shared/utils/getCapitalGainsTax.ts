import { roundCurrency } from './roundCurrency'

const taxRate = 0.19

export const getCapitalGainsTax = (grossGains: number) =>
  roundCurrency(grossGains * taxRate, 'ceil')
