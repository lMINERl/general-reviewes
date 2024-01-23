import axios from "axios";
import { useDispatch } from "../";
import { IUser, UserActions } from "../Slice/UserSlice";

const dispatch = useDispatch("user");

export const setSelectedUser = (user: IUser) => {
  return dispatch({ type: UserActions.SelectUser, payload: user });
};

export const setUsers = (users: IUser[]) => {
  return dispatch({ type: UserActions.SetUsers, payload: users });
};

export const removeUser = (userId: string) => {
  return dispatch({ type: UserActions.RemoveUser, payload: userId });
};

export const editUser = (user: IUser) => {
  return dispatch({ type: UserActions.EditUser, payload: user });
};

export const addUser = (user: IUser) => {
  return dispatch({ type: UserActions.AddUser, payload: user });
};

export const setUserLoading = (state: boolean) => {
  return dispatch({ type: UserActions.SetLoading, payload: state });
};

export const setUserNotification = (permission: NotificationPermission) => {
  return dispatch({ type: UserActions.SetNotification, payload: permission });
};

export const getAllUsers = () => {
  setUserLoading(true);

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      console.log("data come");
      setUsers(response.data);
    })
    .catch((err) => {
      setUsers([]);
      // TODO: make snackbar api to display snackbar
    })
    .finally(() => {
      setUserLoading(false);
    });
};
