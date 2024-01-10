import { Action } from "../../types/types";

export interface TaskData {
  id: string;
  name: string;
  done?: boolean;
  percent?: boolean;
  time?: number; // in Seconds
  selected?: boolean;
  type:TaskType;
  description?: string;
  category?: string;
  subTasks?: TaskData[];
}

export enum TaskType{
  TimedActivation,
  Interval,
  General,
  Software,
} 

export enum TimedActivationModes{
  Random,
  Priority,
  Balance,
  Activation,
}

export interface TaskState {
  data: TaskData[];
  categories: string[];
  selected: TaskData | undefined; // you can select 1 or more
  loading: boolean;
}

export enum TaskActions {
  AddTask,
  RemoveTasks,
  SelectTask,
  SetTasks,
  EditTask,
  SetLoading,
}

export type TaskActionsTypes =
  | Action<TaskActions.AddTask, TaskData>
  | Action<TaskActions.SetTasks, TaskData[]>
  | Action<TaskActions.SelectTask, TaskData>
  | Action<TaskActions.RemoveTasks, string[]>
  | Action<
      TaskActions.EditTask,
      { id: string; transform: (oldTask: TaskData) => TaskData }
    >
  | Action<TaskActions.SetLoading, boolean>;

const initalState: TaskState = {
  data: [],
  categories:[],
  selected: undefined,
  loading: false,
};

// initial state should always default to a copy of object in case if you want to dublicate reducers
function reducer(
  state: TaskState = { ...initalState },
  action: TaskActionsTypes,
): TaskState {
  switch (action.type) {
    case "@@INIT": {
      return { ...initalState };
    }
    case TaskActions.AddTask: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case TaskActions.RemoveTasks: {
      const tasks = state.data.filter((v) => !action.payload.includes(v.id));
      if (!tasks.length) {
        return state;
      }
      state.data = tasks;
      return state;
    }
    case TaskActions.SelectTask: {
      return { ...state, selected: action.payload };
    }
    case TaskActions.SetTasks: {
      return { ...state, data: action.payload };
    }
    case TaskActions.EditTask: {
      const index = state.data.findIndex((v) => v.id == action.payload.id);
      if (index == -1) {
        return state;
      }
      const { [index]: task, ...rest } = state.data;

      return {
        ...state,
        data: Object.values({
          ...rest,
          [index]: action.payload.transform(task),
        }) as TaskData[],
      };
    }
    case TaskActions.SetLoading: {
      return { ...state, loading: action.payload };
    }
    default:
      return state;
  }
}

export default reducer;
