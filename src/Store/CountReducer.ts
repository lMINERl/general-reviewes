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

function reducer(
  state: CountState = initalState,
  action: CounterActionsTypes,
): CountState {
  switch (action.type) {
    case CounterActions.Increment:
      // state.count = action.payload.count + 1;
      return { count: action.payload.count + 1 };
    default:
      return state;
  }
}

export default reducer;
