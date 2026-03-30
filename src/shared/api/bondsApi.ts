import type { BondDto } from "../types/BondsDto";
import { makeGenericApi } from "./makeGenericApi";

export const bondsApi = makeGenericApi<BondDto>("bonds");
