import { createEffect, createSignal } from "solid-js";
import { SnackbarItem } from "./Snackbar";
import { createStore } from "solid-js/store";

const useSnackbar = () => {
  const [snackbarList, setSnackbarList] =
    createSignal<SnackbarItem[]>([]);
  
  createEffect(() => {
    // if (!snackbarList().length) {
    //   return;
    // }
    // setTimeout(() => {
    //   setSnackbarList([]);
    // }, 3000);

    console.log(snackbarList()) 
  });

  return {
    snackbarList,
    makeSnackNotification:setSnackbarList,
  };
};
export default useSnackbar;
