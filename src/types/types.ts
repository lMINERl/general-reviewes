// gets the 2nd argument of function params
export type ParametersType<T> = T extends (arg1: any, arg2: infer U) => any
  ? U
  : never;

// map object to it's value of type function return;
export type MapObjectToReturn<T extends { [key: string]: (...args: any[]) => any }> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
};

export type Action<T, P> =
  | { type: T; payload: P }
  | { type: "@@INIT"; payload: undefined };
