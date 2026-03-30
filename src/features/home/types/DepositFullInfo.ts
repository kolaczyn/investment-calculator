import type { DepositGains } from "@/features/deposit-calculator/utils/getDepositGains";
import type { DepositDto } from "@/shared/types/DepositDto";

export type DepositFullInfo = {
  info: DepositDto;
  results: DepositGains;
};
