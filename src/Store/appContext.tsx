import {
  createContext,
  createEffect,
  createRenderEffect,
  createSignal,
  onMount,
  ParentProps,
  useContext,
} from "solid-js";

import { createStore } from "solid-js/store";

import CountReducer, {
  CountState,
  CounterActions,
  CounterActionsTypes,
} from "./CountReducer";

type RootState = { count: ReturnType<typeof CountReducer> };

interface reducerType {
  count: (action: Parameters<typeof CountReducer>[1]) => void;
}

export const AppContext = createContext<{
  useAppDispatch: (
    key: keyof reducerType,
  ) => (action: Parameters<reducerType[keyof reducerType]>[0]) => void;
  useAppSelector: <T>(fn: (state: RootState) => T) => () => T;
}>();
function AppProvider(props: any) {
  const [state, setState] = createStore<RootState>(undefined);

  const reducers: reducerType = {
    count: function (action) {
      setState(["count"], (old) => {
        return CountReducer(old, action);
      });
    },
  };

  createRenderEffect(() => {
    Object.values(reducers).forEach((fn) => {
      fn({ type: "@@INIT", payload: undefined } as any);
    });
  });

  function useAppDispatch(key: keyof typeof reducers) {
    return function (action: Parameters<(typeof reducers)[typeof key]>[0]) {
      return reducers[key](action as any);
    };
  }

  function useAppSelector<T>(fn: (state: RootState) => T): () => T {
    return () => fn(state);
  }

  return (
    <AppContext.Provider value={{ useAppDispatch, useAppSelector }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export function useAppContext() {
  return useContext(AppContext);
}
