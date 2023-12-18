export type Action<T, P> =
  | { type: T; payload: P }
  | { type: "@@INIT"; payload: undefined };
