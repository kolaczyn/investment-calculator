export type FetchInfo<T> =
  | {
      type: 'error'
      value: string | null
    }
  | {
      type: 'loading'
      value: null
    }
  | {
      type: 'resolved'
      value: T
    }
