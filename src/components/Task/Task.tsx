import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
// Components
import { Ionicons } from "@expo/vector-icons";
// Styles
import { styles } from "./style";

export const Task = ({
  todo,
  id,
  remove,
  update,
  checked = false,
  updateCheck,
}: taskProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, []);

  const handleChangeCheckBox = (value: boolean) => {
    setIsChecked(value);
    updateCheck(value, id);
  };

  return (
    <View style={styles.item}>
      <View style={styles.todoItemWrapper}>
        <CheckBox value={isChecked} onValueChange={handleChangeCheckBox} />
        <View style={styles.todoItem}>
          <TouchableOpacity
            style={styles.check}
            testID="updateTO"
            onPress={() => update(id, todo)}
          >
            <Text style={styles.todoText}>{todo}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => remove(id)}
        testID="removeTO"
      >
        <Ionicons name="ios-trash" style={styles.button}></Ionicons>
      </TouchableOpacity>
    </View>
  );
};
