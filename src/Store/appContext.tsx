import { createStore } from "solid-js/store";
import CountReducer, { CounterActions } from "./CountReducer";
import ProductReducer, { ProductActions } from "./productReducer";

interface reducerType {
  count: (action: Parameters<typeof CountReducer>[1]) => void;
}

const [state, setState] = createStore(undefined);

// map 
type ParametersType<T> = T extends (arg1: any, arg2: infer U) => any
  ? U
  : never;

// map object to it's value of type function return;
type MapObjectToReturn<T extends { [key: string]: (...args: any[]) => any }> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
};

const combineReducers = function <T extends object>(rd: T): T {
  return Object.fromEntries(
    Object.entries(rd).map(([k, v]: any) => [
      k,
      function (_state: any, action: any) {
        setState([k as any], (old: any) => {
          return v(old, action);
        });
      },
    ]),
  ) as any;
};

const reducers = combineReducers({
  count: CountReducer,
  product: ProductReducer,
});

export function useAppDispatch<K extends keyof typeof reducers>(key: K) {
  return function (action: ParametersType<(typeof reducers)[K]>) {
    return reducers[key](state?.[key], action as any);
  };
}

export type RootState = MapObjectToReturn<typeof reducers>;

export function useAppSelector<T>(fn: (state: RootState) => T): () => T {
  return () => fn(state);
}

Object.keys(reducers).forEach((k: keyof typeof reducers) => {
  useAppDispatch(k)({ type: "@@INIT", payload: undefined } as any);
});
