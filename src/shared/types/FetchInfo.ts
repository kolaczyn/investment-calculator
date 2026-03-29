export type FetchInfo<T> =
  | {
      type: "error";
      value: string;
    }
  | {
      type: "loading";
      value: null;
    }
  | {
      type: "resolved";
      value: T;
    };
