import { Component, JSX, createEffect, createSignal } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "../routes";
import Navbar from "../layouts/Navbar";
import AppDrawer from "../layouts/AppDrawer";
import useNotification from "../hooks/useNotification";
import { CreateWebWorker } from "../Store/Thunk/WebWorkerThunk";

const App: Component = () => {
  const [open, setOpen] = createSignal(false);
  // const location = useLocation();
  const Route = useRoutes(routes);
  const { makeNotification } = useNotification();
  const worker = new CreateWebWorker();

  worker.onMessageFromWorker((data) => {
    if (data.command == "finished") {
      makeNotification(
        "hi",
        { body: "this notification boyd", icon: "" },
        (notification) => {
          document.title = "hii from notification";
          notification.close();
        },
      );
    }
  });

  createEffect(() => {
    worker.postMessageToWorker({
      command: "start",
      type: "timeout",
      time: 5000,
    });

    // const worker = new Worker("worker.js", { type: "classic" });
    // worker.postMessage("start");
    // worker.addEventListener("message", function (event) {
    //   if (event.data == "finished") {
    //     makeNotification(
    //       "hi",
    //       { body: "this notification boyd", icon: "" },
    //       (notification) => {
    //         document.title = "hii from notification";
    //         notification.close();
    //       },
    //     );
    //   }
    // });
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
