import {
  Component,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "../routes";
import Navbar from "../layouts/Navbar";
import AppDrawer from "../layouts/AppDrawer";
import useNotification from "../hooks/useNotification";
import { CreateWebWorker } from "../Store/Thunk/WebWorkerThunk";
import Accordion from "../components/Accordion";
import useAccordion from "../components/Accordion/useAccordion";
import SvgComponent, { SvgName } from "../components/Icons/Bars";
import Snackbar from "../components/SnackBar/Snackbar";
import useSnackbar from "../components/SnackBar/useSnackbar";
import { durationMilliSeconds } from "../utils/time";

export const App: Component = () => {
  const [open, setOpen] = createSignal(false);
  // const location = useLocation();
  const Route = useRoutes(routes);
  const { makeNotification } = useNotification();
  const worker = new CreateWebWorker();

  worker.onMessageFromWorker((data) => {
    if (data.command == "finished") {
      makeNotification(
        "hi",
        {
          body: "this notification boyd",
          icon: "",
        },
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
      time: durationMilliSeconds({ seconds: 5 }),
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

