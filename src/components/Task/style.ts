import { StyleSheet } from "react-native";

// Utils
import colors from "../../../assets/colors/color";

export const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  todoItemWrapper: {
    flexDirection: "row",
  },
  todoItem: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  check: {
    width: "80%",
  },
  todoText: {},
  button: {
    color: colors.secondary,
    fontSize: 18,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    backgroundColor: colors.third,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
