export interface CountState {
  count: number;
}

export enum CounterActions {
  Increment,
  Decrement,
}

type Action<T, P> = { type: T; payload: P };

export type CounterActionsTypes = Action<
  CounterActions.Increment,
  { count: number }
>;

const initalState: CountState = {
  count: 0,
};

// initial state shoul auto default to a copy of object in case if you want to dublicate reducers
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
