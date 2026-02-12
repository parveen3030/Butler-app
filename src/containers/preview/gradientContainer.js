import LinearGradient from "react-native-linear-gradient";
import R from "../../assets";
import React from "react";

const GradientContainer = ({
  item,
  index,
  navigation,
  children,
  containerStyle,
  direction = "vertical",
  disabled = false,
  colors = [R.colors.PrimaryColorDark, R.colors.PrimaryColorLight],
}) => {
  const gradientColors = disabled ? ["#bbbbbb", "#d4d4d4"] : colors;
  return direction == "vertical" ? (
    <LinearGradient colors={gradientColors} style={containerStyle}>
      {children}
    </LinearGradient>
  ) : (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={gradientColors}
      style={containerStyle}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientContainer;
