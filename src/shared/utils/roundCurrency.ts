type RoundType = 'floor' | 'regular' | 'ceil'

const getMethodToUse = (type: RoundType) => {
  if (type === 'floor') return Math.floor
  if (type === 'regular') return Math.round
  return Math.ceil
}

export const roundCurrency = (amount: number, type: RoundType = 'regular') => {
  const roundMethod = getMethodToUse(type)
  return roundMethod(amount * 100) / 100
}
