import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
// Components
import { Ionicons } from "@expo/vector-icons";
// Styles
import { styles } from "./style";

// most of the function to manipulate the data are provided from the container to have all the data manipulation on
// one place.
// all parameter are important other than the check by default is false.
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
  }, [checked]);

  const handleChangeCheckBox = (value: boolean) => {
    updateCheck(value, id);
  };

  return (
    <View style={styles.item}>
      {/* Wrapped in two group so you can use justifyContent: "space-between" to make
      the remove buttom to be far on right while keeping the checkBox and text on the left. */}
      <View style={styles.todoItemWrapper}>
        <CheckBox value={isChecked} onValueChange={handleChangeCheckBox} />
        <View style={styles.todoItem}>
          {/* Added a style TouchableOpacity to add more with to cover more space and not just the word
          to trigger the edit function */}
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
