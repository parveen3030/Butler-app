import React from "react";
import { ActivityIndicator, View } from "react-native";
import { screenHeightInPercent } from "../../utils/screenDimensions";
import R from "../../assets";

const Loader = () => {
  return (
    <ActivityIndicator
      style={{
        height: screenHeightInPercent(100),
        backgroundColor: "#00000000",
      }}
      size="large"
      color={R.colors.PrimaryColorDark}
    />
  );
};
export default Loader;
