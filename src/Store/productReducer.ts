import { Action } from "../types/types";

export enum ProductActions {
  AddProduct,
  RemoveProduct,
  Increment,
}

interface ProductData {
  id: string;
  name: string;
  description: string;
}

export type ProductActionsTypes =
  | Action<ProductActions.AddProduct, ProductData>
  | Action<ProductActions.Increment, { count: number }>;

export interface ProductState {
  data: ProductData[];
  count: number;
}

const initalState: ProductState = {
  data: [] as ProductData[],
  count: 0,
};

// initial state should always default to a copy of object in case if you want to dublicate reducers
function reducer(
  state: ProductState = { ...initalState },
  action: ProductActionsTypes,
): ProductState {
  switch (action.type) {
    case "@@INIT": {
      return { ...initalState };
    }
    case ProductActions.AddProduct: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case ProductActions.Increment:
      return { ...state, count: action.payload.count };
    default:
      return state;
  }
}

export default reducer;
