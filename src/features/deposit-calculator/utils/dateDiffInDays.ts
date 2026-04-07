// Taken from https://stackoverflow.com/a/15289883
export const dateDiffInDays = (a: Date, b: Date) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / DAY_IN_MS)
}

const DAY_IN_MS = 1000 * 60 * 60 * 24
