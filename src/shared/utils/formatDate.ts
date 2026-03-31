const leftPad = (num: number) => {
  const str = num.toString()
  if (str.length === 1) return `0${str}`
  return str
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${leftPad(month)}-${leftPad(day)}`
}
