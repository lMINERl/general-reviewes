import { Action } from "../../types/types";

export interface IUser {
  id: string;
  name: string;
  salary: number;
}

export interface UserState {
  data: IUser[];
  selected: IUser | undefined;
  loading: boolean;
}

export enum UserActions {
  AddUser,
  RemoveUser,
  SelectUser,
  SetUsers,
  EditUser,
  SetLoading,
}

export type UserActionsTypes =
  | Action<UserActions.AddUser, IUser>
  | Action<UserActions.SetUsers, IUser[]>
  | Action<UserActions.SelectUser, IUser>
  | Action<UserActions.RemoveUser, string>
  | Action<UserActions.EditUser, IUser>
  | Action<UserActions.SetLoading, boolean>;

const initalState: UserState = {
  data: [],
  selected: undefined,
  loading: false,
};

// initial state should always default to a copy of object in case if you want to dublicate reducers
function reducer(
  state: UserState = { ...initalState },
  action: UserActionsTypes,
): UserState {
  switch (action.type) {
    case "@@INIT": {
      return { ...initalState };
    }
    case UserActions.AddUser: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case UserActions.RemoveUser: {
      const index = state.data.findIndex((v) => v.id == action.payload);
      if (index == -1) {
        return state;
      }
      const { [index]: _, ...rest } = state.data;
      state.data = Object.values(rest) as IUser[];
      return state;
    }
    case UserActions.SelectUser: {
      state.selected = action.payload;
      return state;
    }
    case UserActions.SetUsers: {
      return { ...state, data: action.payload };
    }
    case UserActions.EditUser: {
      const index = state.data.findIndex((v) => v.id == action.payload.id);
      if (index == -1) {
        return state;
      }
      const { [index]:_,...rest } = state.data;
      return {
        ...state,
        data: Object.values({ ...rest, [index]: action.payload }),
      };
      // state.data[index] = action.payload;
      // return state;
    }
    case UserActions.SetLoading: {
      state.loading = action.payload;
      return state;
    }
    default:
      return state;
  }
}

export default reducer;
