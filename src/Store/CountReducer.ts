import { Action } from "../types/types";

export interface CountState {
  count: number;
}

export enum CounterActions {
  Increment,
  Decrement,
}


export type CounterActionsTypes = Action<
  CounterActions.Increment,
  { count: number }
>;

const initalState: CountState = {
  count: 0,
};

// initial state should always default to a copy of object in case if you want to dublicate reducers
function reducer(
  state: CountState = { ...initalState },
  action: CounterActionsTypes,
): CountState {
  switch (action.type) {
    case CounterActions.Increment:
      // state.count = action.payload.count + 1;
      return { count: state.count + action.payload.count };
    default:
      return state;
  }
}

export default reducer;
