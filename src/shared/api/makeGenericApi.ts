import { apiUrl } from "@/shared/const/apiUrl";
import type { FetchInfo } from "@/shared/types/FetchInfo";

type GenericApi<TData extends { id: string }> = {
  getAll: () => Promise<TData[]>;
  getById: (id: string) => Promise<FetchInfo<TData>>;
  post: (payload: TData) => Promise<TData>;
  patch: (id: string, payload: Partial<Omit<TData, "id">>) => Promise<TData>;
  delete: (id: string) => Promise<TData>;
};

export const makeGenericApi = <TData extends { id: string }>(
  resource: string,
): GenericApi<TData> => ({
  getAll: () => fetch(`${apiUrl}/${resource}`).then((x) => x.json()),

  getById: (id) =>
    fetch(`${apiUrl}/${resource}/${id}`)
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

  post: (payload) =>
    fetch(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((x) => x.json()),

  patch: (id, payload) =>
    fetch(`${apiUrl}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  delete: (id) =>
    fetch(`${apiUrl}/${resource}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json()),
});
