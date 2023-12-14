import { createStore } from "solid-js/store";

import CountReducer from "./CountReducer";

type RootState = { count: ReturnType<typeof CountReducer> };

interface reducerType {
  count: (action: Parameters<typeof CountReducer>[1]) => void;
}

const [state, setState] = createStore<RootState>(undefined);

const reducers: reducerType = {
  count: function (action) {
    setState(["count"], (old) => {
      return CountReducer(old, action);
    });
  },
};

export function useAppDispatch(key: keyof typeof reducers) {
  return function (action: Parameters<(typeof reducers)[typeof key]>[0]) {
    return reducers[key](action as any);
  };
}

export function useAppSelector<T>(fn: (state: RootState) => T): () => T {
  return () => fn(state);
}

Object.values(reducers).forEach((fn) => {
  fn({ type: "@@INIT", payload: undefined } as any);
});
