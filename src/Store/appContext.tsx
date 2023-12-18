import { SetStoreFunction, createStore } from "solid-js/store";
import CountReducer from "./CountReducer";
import ProductReducer from "./productReducer";
import { MapObjectToReturn, ParametersType } from "../types/types";


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

export type RootState = MapObjectToReturn<typeof reducers>;

const [state, setState] = createStore<RootState>(undefined);

export function useAppDispatch<K extends keyof typeof reducers>(key: K) {
  return function (action: ParametersType<(typeof reducers)[K]>) {
    return reducers[key](undefined, action as any);
  };
}


export function useAppSelector<T>(fn: (state: RootState) => T): () => T {
  return () => fn(state);
}

export { setState as setAppState };

//INIT all reducers
Object.keys(reducers).forEach((k: keyof typeof reducers) => {
  useAppDispatch(k)({ type: "@@INIT", payload: undefined });
});
