import { apiUrl } from "@/shared/const/apiUrl";
import type { DepositDto } from "@/shared/types/DepositDto";
import type { FetchInfo } from "@/shared/types/FetchInfo";

export const depositsApi = {
  getAll: (): Promise<DepositDto[]> => fetch(`${apiUrl}/deposits`).then((x) => x.json()),

  getById: (id: string): Promise<FetchInfo<DepositDto>> =>
    fetch(`${apiUrl}/deposits/${id}`)
      .then((x) => x.json())
      .then((x) =>
        x.error
          ? {
              type: "error",
              value: null,
            }
          : {
              type: "resolved",
              value: x,
            },
      ),

  post: (payload: DepositDto): Promise<DepositDto> =>
    fetch(`${apiUrl}/deposits`, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((x) => x.json()),

  patch: (id: string, payload: Partial<DepositDto>): Promise<DepositDto> =>
    fetch(`${apiUrl}/deposits/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  delete: (id: string): Promise<DepositDto> =>
    fetch(`${apiUrl}/deposits/${id}`, {
      method: "DELETE",
    }).then((res) => res.json()),
};
