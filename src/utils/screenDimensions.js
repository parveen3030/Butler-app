import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const screenHeightInPercent = (val) => {
  return (val / 100) * windowHeight;
};

const screenWidthInPercent = (val) => {
  return (val / 100) * windowWidth;
};

export { screenWidthInPercent, screenHeightInPercent };
