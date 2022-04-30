import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Components
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
// Custom Components
import Task from "../../components/Task";
// Styles
import { styles } from "./style";
// Utils
import colors from "../../assets/colors/color";
import { useState } from "react";
import { todoType } from "./Main.interface";
import { useEffect } from "react";
import { useRef } from "react";

const UPDATE_INITIAL_STATE = {
  state: false,
  position: 0,
};

export default function Main() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [newItemId, setNewItemId] = useState<number>(0);
  const [update, setUpdate] = useState<{ state: boolean; position: number }>(
    UPDATE_INITIAL_STATE
  );
  const TEXT_REF = useRef<TextInput>(null);

  useEffect(() => {
    setNewItemId(todoList.length + 1);
  }, []);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (update.state) {
      let copyList = [...todoList];
      copyList[update.position].text = task;
      setTodoList(copyList);
      setTask("");
      setUpdate(UPDATE_INITIAL_STATE)
      return;
    }
    setTodoList([...todoList, { id: newItemId, text: task }]);
    setNewItemId(newItemId + 1);
    setTask("");
  };

  const handleRemoveTask = (index: number) => {
    const copyList = [...todoList];
    copyList.splice(index, 1);
    setTodoList(copyList);
  };

  const handleUpdateTask = (index: number, todo: string) => {
    setTask(todo);
    setUpdate({ state: true, position: index });
    TEXT_REF?.current && TEXT_REF.current.focus();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.background}
      />
      <View style={styles.taskWrapper}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.items}>
          {todoList.map((todo, index) => (
            <Task
              key={todo.id}
              todo={todo.text}
              position={index}
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
        <TouchableOpacity onPress={handleAddTask}>
          <Ionicons
            name={update.state ? "create" : "add-circle"}
            style={styles.addText}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
