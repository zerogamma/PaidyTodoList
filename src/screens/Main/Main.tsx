import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Context
import todoContext from "../../context/context";
// Components
import { Ionicons } from "@expo/vector-icons";
// Custom Components
import Task from "../../components/Task";
// Styles
import { styles } from "./style";
import { todoType } from "./Main.interface";

const UPDATE_INITIAL_STATE = {
  state: false,
  id: 0,
};

export function Main() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [newItemId, setNewItemId] = useState<number>(0);
  const [update, setUpdate] = useState<{ state: boolean; id: number }>(
    UPDATE_INITIAL_STATE
  );
  const apiTask = useContext(todoContext);
  const TEXT_REF = useRef<TextInput>(null);

  useEffect(() => {
    if (todoList.length) {
      setNewItemId(todoList[todoList.length - 1].id + 1);
    }
  }, [todoList]);

  useEffect(() => {
    if (apiTask.todoList) setTodoList(apiTask.todoList);
  }, [apiTask.todoList]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (update.state) {
      apiTask.updateTask({ id: update.id, text: task });
      // use of internal state to update task.
      // let copyList = [...todoList];
      // copyList[update.id].text = task;
      // setTodoList(copyList);
      setTask("");
      setUpdate(UPDATE_INITIAL_STATE);
      return;
    }
    
    apiTask.addNewTask({ id: newItemId, text: task });

    // use of internal state to add task.
    // setTodoList([...todoList, { id: newItemId, text: task }]);

    setNewItemId(newItemId + 1);
    setTask("");
  };

  const handleRemoveTask = (id: number) => {
    apiTask.deleteTask(id);
    // use of internal state to remove task.
    // const copyList = [...todoList];
    // copyList.splice(id, 1);
    // setTodoList(copyList);
  };

  const handleUpdateTask = (index: number, todo: string) => {
    setTask(todo);
    setUpdate({ state: true, id: index });
    TEXT_REF?.current && TEXT_REF.current.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.items}>
          {todoList.map((todo, index) => (
            <Task
              key={todo.id}
              todo={todo.text}
              position={index} // for internal state use.
              id={todo.id}
              remove={handleRemoveTask}
              update={handleUpdateTask}
            />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputTaskWrapper}
      >
        <TextInput
          ref={TEXT_REF}
          style={styles.inputTask}
          placeholder={"Enter new task"}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask} testID="addTask">
          <Ionicons
            name={update.state ? "create" : "add-circle"}
            style={styles.addText}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
