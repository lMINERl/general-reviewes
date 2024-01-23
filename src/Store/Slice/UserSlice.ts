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
  notificationPermission: NotificationPermission;
}

export enum UserActions {
  AddUser,
  RemoveUser,
  SelectUser,
  SetUsers,
  EditUser,
  SetLoading,
  SetNotification,
}

export type UserActionsTypes =
  | Action<UserActions.AddUser, IUser>
  | Action<UserActions.SetUsers, IUser[]>
  | Action<UserActions.SelectUser, IUser>
  | Action<UserActions.RemoveUser, string>
  | Action<UserActions.EditUser, IUser>
  | Action<UserActions.SetLoading, boolean>
  | Action<UserActions.SetNotification, NotificationPermission>;

const initalState: UserState = {
  data: [],
  selected: undefined,
  loading: false,
  notificationPermission: "default",
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
      return { ...state, selected: action.payload };
    }
    case UserActions.SetUsers: {
      return { ...state, data: action.payload };
    }
    case UserActions.EditUser: {
      const index = state.data.findIndex((v) => v.id == action.payload.id);
      if (index == -1) {
        return state;
      }
      const { [index]: _, ...rest } = state.data;
      return {
        ...state,
        data: Object.values({ ...rest, [index]: action.payload }) as IUser[],
      };
    }
    case UserActions.SetLoading: {
      return { ...state, loading: action.payload };
    }
    case UserActions.SetNotification: {
      return { ...state, notificationPermission: action.payload };
    }
    default:
      return state;
  }
}

export default reducer;
