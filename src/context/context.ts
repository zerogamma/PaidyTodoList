import React from "react";
import { taskType } from "./context.interface";

// Context with access of the main data and different function to update the data.
// the function can be replaced with a hook if there is a actual access using apollo
export default React.createContext({
  todoList: [] as taskType[],
  addNewTask: (task: taskType) => {},
  deleteTask: (taskId: number) => {},
  updateTask: (taskText: string, taskId: number) => {},
  updateTaskState: (status: boolean, taskId: number) => {},
});
