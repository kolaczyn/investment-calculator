// TODO remove usage of this type in favor of FirebaseDepositDto
export type DepositDto = {
  id: string
} & FirebaseDepositDto

export type FirebaseDepositCreateDto = FirebaseDepositDto & { userId: string }

export type FirebaseDepositDto = {
  amount: number
  // in percent (e.g. 2 means 2%)
  interest: number
  periodMonths: number
  // in yyyy-mm-dd format (e.g. 2026-02-27)
  startDate: string
}
