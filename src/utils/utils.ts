import { todoType } from "../screens/Main/Main.interface";

export const orderDesc = (a: todoType, b: todoType) => {
  if (b.id < a.id) return -1;
  if (b.id > a.id) return 1;
  return 0;
};
