import { StyleSheet } from "react-native";
// Utils
import colors from "../../../assets/colors/color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskWrapper: {
    paddingTop: 120,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {},
  inputTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputTask: {
    width: 250,
    backgroundColor: colors.secondary,
    borderRadius: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: colors.third,
    borderWidth: 1,
  },
  addText: {
    color: colors.third,
    fontSize: 60,
  },
});
