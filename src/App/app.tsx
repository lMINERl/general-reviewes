import { Component, createEffect, createSignal } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "../routes";
import { appState, useSelector } from "../Store/appContext";
import Navbar from "../layouts/Navbar";
import AppDrawer from "../layouts/AppDrawer";
import { getAllUsers } from "../Store/Thunk/UserThunk";

const App: Component = () => {
  const [open, setOpen] = createSignal(false);
  const users = () => appState.user.data;
  const data = useSelector((s) => s.user.data);
  // const location = useLocation();
  const Route = useRoutes(routes);

  getAllUsers();

  createEffect(() => {
    console.log("u", data());
  });

  return (
    <>
      <Navbar collabseClick={setOpen} open={open()} />
      <AppDrawer open={open()}>
        <main>
          <Route />
        </main>
      </AppDrawer>
    </>
  );
};

export default App;
