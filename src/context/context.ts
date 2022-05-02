import React from "react";
import { taskType } from "./context.interface";

export default React.createContext({
  todoList: [] as taskType[],
  addNewTask: (task: taskType) => {},
  deleteTask: (taskId: number) => {},
  updateTask: (task: taskType) => {},
});
