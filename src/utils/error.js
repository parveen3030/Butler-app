// import { showMessage } from "react-native-flash-message";

import { Alert } from "react-native";

export function handleError(e) {
  // showMessage({
  //   message:
  //     e && e.message
  //       ? e.message
  //       : "Unable to process request at the moment, try again later",
  //   type: "danger",
  // });
  Alert.alert(
    "Error",
    e && e.message
      ? e.message
      : "Unable to process request at the moment, try again later",
    [{ text: "OK", onPress: () => console.log(""), style: "cancel" }],
    { cancelable: false }
  );
}

export function notificationMessage(data) {
  const type = data && data.type ? data.type : "error";
  const message = data && data.message ? data.message : "Fail";
  const errors = data && data.errors ? data.errors : {};
  return {
    type,
    message,
    errors,
  };
}

export function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
