import React, { useEffect, useState } from "react";
import Context from "./context";
import { taskType } from "./context.interface";
import { dummyData } from "./mock";
export const ContextProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    // Here is where we can fetch data from a API or DB
    setTasks(dummyData);
  }, []);

  const addNewTask = (task: taskType) => {
    const list = [...tasks, task];
    setTasks(list);
  };

  const updateTask = (task: taskType) => {
    const list = [...tasks];
    setTasks(
      list.map((listTask) =>
        task.id === listTask.id ? { ...listTask, text: task.text } : listTask
      )
    );
  };

  const deleteTask = (taskId: number) => {
    const list = [...tasks];
    setTasks(list.filter((task) => task.id !== taskId));
  };

  return (
    <Context.Provider
      value={{
        todoList: tasks,
        addNewTask: addNewTask,
        deleteTask: deleteTask,
        updateTask: updateTask,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
