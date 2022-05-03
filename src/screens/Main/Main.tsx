import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
  Dimensions,
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
import { orderDesc } from "../../utils/utils";

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
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const apiTask = useContext(todoContext);
  const TEXT_REF = useRef<TextInput>(null);
  const FLATLIST_REF = useRef<FlatList>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        FLATLIST_REF?.current?.scrollToEnd();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (todoList.length) {
      setNewItemId(todoList[0].id + 1);
    }
  }, [todoList]);

  useEffect(() => {
    if (apiTask.todoList) {
      setTodoList(apiTask.todoList.sort(orderDesc));
    }
  }, [apiTask.todoList]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (update.state) {
      apiTask.updateTask(task, update.id);
      setTask("");
      setUpdate(UPDATE_INITIAL_STATE);
      return;
    }
    apiTask.addNewTask({ id: newItemId, text: task, status: false });
    setTask("");
  };

  const handleRemoveTask = (id: number) => {
    apiTask.deleteTask(id);
  };

  const handleStatusUpdate = (status: boolean, taskId: number) => {
    apiTask.updateTaskState(status,taskId);
  };

  const handleUpdateTask = (index: number, todo: string) => {
    setTask(todo);
    setUpdate({ state: true, id: index });
    TEXT_REF?.current && TEXT_REF.current.focus();
  };

  const translateX = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  });

  const ItemView = ({ item, index }: { item: todoType; index: number }) => {
    return (
      <Animated.View style={{ transform: [{ translateY: translateX }] }}>
        <Task
          key={item.id}
          todo={item.text}
          id={item.id}
          checked={item.status}
          remove={handleRemoveTask}
          update={handleUpdateTask}
          updateCheck={handleStatusUpdate}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.title}>Todo List</Text>
        <View
          style={[styles.items, { height: isKeyboardVisible ? "80%" : "88%" }]}
        >
          <FlatList
            ref={FLATLIST_REF}
            data={todoList}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
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
          <View style={styles.iconWrapper}>
            <Ionicons
              name={update.state ? "create" : "add-circle"}
              style={styles.addText}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
