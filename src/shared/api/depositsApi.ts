import type {DepositDto} from "@/shared/types/DepositDto.ts";
import { makeGenericApi } from "./makeGenericApi";

export const depositsApi = makeGenericApi<DepositDto>("deposits");
