import { ToastAndroid } from "react-native";

export const showToast = (title: string) => {
  ToastAndroid.showWithGravityAndOffset(
    title,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    50,
    50
  );
};
