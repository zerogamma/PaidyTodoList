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

// initial update value used to reset after the update is completed.
const UPDATE_INITIAL_STATE = {
  state: false,
  id: 0,
};

export function Main() {
  // Global state mainly data
  const apiTask = useContext(todoContext);
  // inner state management
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [newItemId, setNewItemId] = useState<number>(0);
  const [update, setUpdate] = useState<{ state: boolean; id: number }>(
    UPDATE_INITIAL_STATE
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  // reference to get control specific component in this case the input to trigger is there and update
  const TEXT_REF = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
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

  // useEffect used to get ids for the new item. this if there is API no need to do it.
  // just using number to not make super complex the ID the ideal is have a better type or use an UUID
  useEffect(() => {
    if (todoList.length) {
      setNewItemId(todoList[0].id + 1);
    }
  }, [todoList]);

  // useEffect that check if there are any change on the data from the context
  // and added a sorting desc to always display the new item at the top.
  useEffect(() => {
    if (apiTask.todoList) {
      setTodoList(apiTask.todoList.sort(orderDesc));
    }
  }, [apiTask.todoList]);

  // sharring logic of the AddTask they can be separete but if I separate the component of the icon
  // but in this case for simplicity just used the same one and changed the icon look
  // thats why when the tigger of the update i made a state update to let know to the component is in update mode
  // every array manipulation is done in the context to make it close to what would happend if you have apollo/graph or
  // API where is more clean to have persistency layer.
  const handleAddTask = () => {
    // close the keyboard
    Keyboard.dismiss();
    // cancel if there is no text in the input.
    if(!task) return
    
    // the update function with a return to separate with the add logic.
    if (update.state) {
      apiTask.updateTask(task, update.id);
      setTask("");
      setUpdate(UPDATE_INITIAL_STATE);
      return;
    }
    apiTask.addNewTask({ id: newItemId, text: task, status: false });
    setTask("");
  };

  // remove
  const handleRemoveTask = (id: number) => {
    apiTask.deleteTask(id);
  };

  // check
  const handleStatusUpdate = (status: boolean, taskId: number) => {
    apiTask.updateTaskState(status,taskId);
  };

  // update
  const handleUpdateTask = (index: number, todo: string) => {
    setTask(todo);
    setUpdate({ state: true, id: index });
    TEXT_REF?.current && TEXT_REF.current.focus();
  };

  // code to give animation loading of the list.
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

  // function to add animation view and used by FlatList to populate himself.
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
