import { getCapitalGainsTax } from '@/shared/utils/getCapitalGainsTax'
import { dateDiffInDays } from './dateDiffInDays'
import { getDepositEndDate } from './getDepositEndDate'
import { roundCurrency } from '@/shared/utils/roundCurrency'

type Args = {
  amount: number
  startDate: Date
  periodMonths: number
  interest: number
}

export type DepositGains = {
  profitsProjected: {
    taxes: number
    net: number
    gross: number
  }
  profitsSoFar: {
    net: number
    gross: number
  }
  days: {
    remaining: number
    total: number
  }
}

export const getDepositGains = ({
  amount,
  startDate,
  periodMonths,
  interest,
}: Args): DepositGains => {
  const endDate = getDepositEndDate(startDate, periodMonths)
  const daysRemaining = dateDiffInDays(new Date(), endDate)
  const totalDays = dateDiffInDays(startDate, endDate)
  const daysSoFar = totalDays - daysRemaining

  const percantageDuringDays = interest * (totalDays / daysInYear)

  const projectedGross = roundCurrency(amount * percantageDuringDays)
  const projectedTaxes = getCapitalGainsTax(projectedGross)
  const projectedNet = roundCurrency(projectedGross - projectedTaxes)

  const profitsProjected = {
    taxes: projectedTaxes,
    net: projectedNet,
    gross: projectedGross,
  }

  const soFarGross = roundCurrency(projectedGross * (daysSoFar / totalDays))
  // This is kinda fake, because if you close the timed deposit, you don't get this money.
  // But it kinda shows the progress of your gains and bankings account show this number.
  const soFarNet = roundCurrency(soFarGross - getCapitalGainsTax(soFarGross))

  const profitsSoFar = {
    net: soFarNet,
    gross: soFarGross,
  }

  const days = {
    remaining: daysRemaining,
    soFar: daysSoFar,
    total: totalDays,
  }

  return {
    profitsProjected,
    profitsSoFar,
    days,
  }
}

const daysInYear = 365
