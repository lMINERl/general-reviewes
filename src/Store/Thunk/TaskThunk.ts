import axios from "axios";
import { useDispatch } from "..";
import { TaskData, TaskActions } from "../Slice/TaskSlice";
import { updateMutable } from "../../utils/update";

const dispatch = useDispatch("task");

export const setSelectedTask = (task: TaskData) => {
  return dispatch({ type: TaskActions.SelectTask, payload: task });
};

export const setTasks = (tasks: TaskData[]) => {
  return dispatch({ type: TaskActions.SetTasks, payload: tasks });
};

export const removeTask = (taskIds: string[]) => {
  return dispatch({ type: TaskActions.RemoveTasks, payload: taskIds });
};

export const editTask = (
  taskId: string,
  transform: (oldTask: TaskData) => TaskData,
) => {
  return dispatch({
    type: TaskActions.EditTask,
    payload: { id: taskId, transform: transform },
  });
};

// add task to last child
export const addSubTask = (newTask: TaskData, pathIds: string[]) => {
  const [rootTaskId, ...rest] = pathIds;
  if (!rootTaskId || rest.length == 0) {
    throw "pathIds should have at least one element as root task id";
  }
  return dispatch({
    type: TaskActions.EditTask,
    payload: {
      id: rootTaskId,
      transform: (task) => {
        if (!rest?.length) {
          return { ...task, subTasks: [...(task.subTasks ?? []), newTask] };
        }
        return rest.reduce((p, c, i) => {
          if (!p.subTasks && i == rest.length - 1) {
            return { ...p, subTasks: [newTask] };
          }
          const index = p.subTasks.findIndex((v) => v.id == c);
          if (index == -1) {
            throw `id ${c} does not exist`;
          }
          if (i == rest.length - 1) {
            return updateMutable(p, ["subTasks", index], (old: TaskData) => {
              return { ...old, subTasks: [...(old?.subTasks ?? []), newTask] };
            });
          }
          return p.subTasks[index];
        }, task);
      },
    },
  });
};


// remove task associated with last id in tree
export const removeSubTask = (pathIds: string[]) => {
  const [rootTaskId, ...rest] = pathIds;
  if (!rootTaskId || rest.length == 0) {
    throw "pathIds should have at least one element as root task id";
  }
  return dispatch({
    type: TaskActions.EditTask,
    payload: {
      id: rootTaskId,
      transform: (task) => {
        if (!rest?.length) {
          throw `subTasks of id:<${rootTaskId}> is empty`;
        }
        return rest.reduce((p, c, i) => {
          if(!p.subTasks || !p?.subTasks?.length){
            throw `subTasks of id:<${c}> is empty`
          }
          const index = p.subTasks.findIndex((v) => v.id == c);
          if (index == -1) {
            throw `id ${c} does not exist`;
          }
          if (i == rest.length - 1) {
            const { [index]: _, ...restsub } = p.subTasks;
            return { ...p, subTasks: Object.values(restsub) as TaskData[] };
          }
          return p.subTasks[index];
        }, task);
      },
    },
  });
};

// edit the last task id from tree
export const editSubTask = (
  transform: (t: TaskData) => TaskData,
  pathIds: string[],
) => {
  const [rootTaskId, ...rest] = pathIds;
  if (!rootTaskId || rest.length == 0) {
    throw "pathIds should have at least one element as root task id";
  }
  return dispatch({
    type: TaskActions.EditTask,
    payload: {
      id: rootTaskId,
      transform: (task) => {
        if (!rest?.length) {
          throw `subTasks of id:<${rootTaskId}> is empty`;
        }
        return rest.reduce((p, c, i) => {
          if (!p.subTasks || !p?.subTasks?.length) {
            throw `subTasks of id:<${c}> is empty`;
          }
          const index = p.subTasks.findIndex((v) => v.id == c);
          if (index == -1) {
            throw `id ${c} does not exist`;
          }
          if (i == rest.length - 1) {
            const { [index]: oldTask, ...restsub } = p.subTasks;
            return {
              ...p,
              subTasks: Object.values({
                ...restsub,
                [index]: transform(oldTask),
              }) as TaskData[],
            };
          }
          return p.subTasks[index];
        }, task);
      },
    },
  });
};

export const addTask = (task: TaskData) => {
  return dispatch({ type: TaskActions.AddTask, payload: task });
};

export const setTaskLoading = (state: boolean) => {
  return dispatch({ type: TaskActions.SetLoading, payload: state });
};
