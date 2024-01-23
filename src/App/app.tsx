import { Component, JSX, createEffect, createSignal } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "../routes";
import { appState, useSelector } from "../Store";
import Navbar from "../layouts/Navbar";
import AppDrawer from "../layouts/AppDrawer";
import { getAllUsers } from "../Store/Thunk/UserThunk";
import {
  addSubTask,
  addTask,
  editSubTask,
  removeSubTask,
  removeTask,
  setTasks,
} from "../Store/Thunk/TaskThunk";
import { TaskType } from "../Store/Slice/TaskSlice";
import Accordion from "../components/Accordion";
import Input from "../components/Input";
import Form from "../layouts/Form";
import { isEmail, isStrongPassword } from "validator";
import useForm from "../hooks/useForm";

const App: Component = () => {
  const [open, setOpen] = createSignal(false);
  // const location = useLocation();
  const Route = useRoutes(routes);

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
