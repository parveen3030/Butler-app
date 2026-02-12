import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import R from "../../assets";
import { screenHeightInPercent } from "../../utils/screenDimensions";

const TogleBtn = ({ onValueChange, value }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.bg}
      onPress={() => {
        onValueChange();
      }}
    >
      <View
        style={[
          styles.offStyle,
          {
            alignSelf: value ? "flex-end" : "flex-start",
            backgroundColor: value ? R.colors.White : R.colors.ExtraLightGrey,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default TogleBtn;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: R.colors.PrimaryColorDark,
    height: screenHeightInPercent(2.4),
    width: screenHeightInPercent(4),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    paddingHorizontal: screenHeightInPercent(0.3),
  },
  offStyle: {
    height: screenHeightInPercent(2),
    width: screenHeightInPercent(2),
    borderRadius: 20,
  },
});
