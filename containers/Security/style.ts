import { StyleSheet } from "react-native";
// Utils
import colors from "../../assets/colors/color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignContent: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  authWrapper: {},
});
