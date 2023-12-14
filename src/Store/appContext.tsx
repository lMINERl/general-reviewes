import { createStore } from "solid-js/store";

import CountReducer from "./CountReducer";

interface reducerType {
  count: (action: Parameters<typeof CountReducer>[1]) => void;
}

const [state, setState] = createStore(undefined);

const combineReducers = function <
  T extends string,
  V extends (...args: any) => any,
>(rd: {
  [key in T]: V;
}): {
  [key in T]: (action: Parameters<V>[1], _state?: Parameters<V>[0]) => void;
} {
  return Object.fromEntries(
    Object.entries(rd).map(([k, v]: any) => [
      k,
      function (action: any) {
        setState([k as any], (old: any) => {
          return v(old, action);
        });
      },
    ]),
  ) as any;
};

const reducers = combineReducers({
  count: CountReducer,
  product: CountReducer,
});
//
// const reducers: reducerType = {
//   count: function (action) {
//     setState(["count"], (old) => {
//       return CountReducer(old, action);
//     });
//   },
// };

export function useAppDispatch(key: keyof typeof reducers) {
  return function (action: Parameters<(typeof reducers)[typeof key]>[0]) {
    return reducers[key](action as any);
  };
}
export type RootState = {
  [key in keyof typeof reducers]: Parameters<
    (typeof reducers)[keyof typeof reducers]
  >[1];
};

export function useAppSelector<T>(fn: (state: RootState) => T): () => T {
  return () => fn(state);
}

Object.values(reducers).forEach((fn) => {
  fn({ type: "@@INIT", payload: undefined } as any);
});
