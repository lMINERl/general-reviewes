import { SetStoreFunction, createStore } from "solid-js/store";

import UserSlice from "./Slice/UserSlice";
import TaskSlice from "./Slice/TaskSlice";

import { MapObjectToReturn, ParametersType } from "../types/types";
import { Accessor, createMemo } from "solid-js";

export type RootState = MapObjectToReturn<typeof reducers>;

const [state, setState] = createStore<RootState>(undefined);

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
  task: TaskSlice,
  user: UserSlice,
});

export function useDispatch<K extends keyof typeof reducers>(key: K) {
  return async function (action: ParametersType<(typeof reducers)[K]>) {
    return reducers[key](undefined, action as any);
  };
}

export function useSelector<T>(fn: (state: RootState) => T): Accessor<T> {
  return createMemo(() => fn(state));
}

export { state as appState, setState as setAppState };

//INIT all reducers
Object.keys(reducers).forEach((k: keyof typeof reducers) => {
  useDispatch(k)({ type: "@@INIT", payload: undefined });
});
