import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// Components
import { Ionicons } from "@expo/vector-icons";
// Styles
import { styles } from "./style";

export const Task = ({ todo, position, remove , update}: taskProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.todoItem}>
        <TouchableOpacity style={styles.check}
          onPress={()=> update(position, todo)}
        >
          <Text style={styles.todoText}>{todo}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => remove(position)}
      >
        <Ionicons name="ios-trash" style={styles.button}></Ionicons>
      </TouchableOpacity>
    </View>
  );
};
