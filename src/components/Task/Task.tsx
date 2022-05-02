import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// Components
import { Ionicons } from "@expo/vector-icons";
// Styles
import { styles } from "./style";

export const Task = ({ todo, id , position, remove, update }: taskProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.todoItem}>
        <TouchableOpacity
          style={styles.check}
          testID="updateTO"
          onPress={() => update(id, todo)} //here is you dont want to use a external data replace with position.
        >
          <Text style={styles.todoText}>{todo}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => remove(id)} //here is you dont want to use a external data replace with position.
        testID="removeTO"
      >
        <Ionicons name="ios-trash" style={styles.button}></Ionicons>
      </TouchableOpacity>
    </View>
  );
};
