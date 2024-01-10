import { Component, createEffect, createSignal } from "solid-js";
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

const App: Component = () => {
  const [open, setOpen] = createSignal(false);
  const users = () => appState.user.data;
  const data = useSelector((s) => s.user.data);
  const tasks = useSelector((s) => s.task.data);
  // const location = useLocation();
  const Route = useRoutes(routes);

  setTasks([
    {
      id: "1",
      name: "task1",
      type: TaskType.General,
      subTasks: [
        {
          id: "1-1",
          name: "task1-1",
          type: TaskType.General,
        },
      ],
    },
  ]);

  getAllUsers();

  createEffect(() => {
    console.log("u", data());
  });

  createEffect(() => {
    console.log("u", tasks());
  });

  return (
    <>
      <Navbar collabseClick={setOpen} open={open()} />
      <AppDrawer open={open()}>
        <main>
          <Accordion
            data={[
              {
                title: "a",
                onOpen: function () {
                  console.log("titleA opend");
                },
                content: (
                  <>
                    <p>A content</p>
                    <Accordion
                      data={[
                        {
                          title: "b",
                          content: "nested",
                          onOpen: function () {
                            console.log("titleB opend");
                          },
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          />
          <button
            onClick={() => {
              editSubTask(
                // { id: "1-2", name: "task1-2", type: TaskType.General },
                (task) => {
                  return { ...task, type: TaskType.Software };
                },
                ["1", "1-1"],
              );
            }}
          >
            some casual name
          </button>
          <Route />
        </main>
      </AppDrawer>
    </>
  );
};

export default App;
