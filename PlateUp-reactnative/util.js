import { AlertIOS, ToastAndroid } from "react-native";

export const SERVER_URL = "http://192.168.0.18:5000";

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(msg);
  }
}