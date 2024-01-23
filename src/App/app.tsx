import { Component, JSX, createEffect, createSignal } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "../routes";
import Navbar from "../layouts/Navbar";
import AppDrawer from "../layouts/AppDrawer";
import useNotification from "../hooks/useNotification";

const App: Component = () => {
  const [open, setOpen] = createSignal(false);
  // const location = useLocation();
  const Route = useRoutes(routes);
  const { makeNotification } = useNotification();
  setTimeout(() => {
    makeNotification(
      "hi",
      { body: "this notification boyd", icon: "" },
      (notification) => {
        document.title = "hii from notification";
        notification.close();
      },
    );
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
