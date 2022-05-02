import { StyleSheet } from "react-native";
// Utils
import colors from "../../../assets/colors/color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  authWrapper: {
    bottom: 30,
    width: "100%",
    paddingHorizontal: 35,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  description: {
    color: 'black',
    top: 200,
    fontSize: 30,
    position: "absolute"
  },
  buttonWrapper:{
    top: 450,
  },
  button: {
    width: 250,
    backgroundColor: colors.third,
    borderRadius: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 25,
  },
});
