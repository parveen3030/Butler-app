import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import R from "../../assets";
import { screenHeightInPercent } from "../../utils/screenDimensions";

const RoundedBG = ({
	children,
	marginTop,
	backgroundColor,
	paddingHorizontal,
	paddingTop,
	borderRadius,
	borderTopColor,
}) => {
	return (
		<View
			style={{
				backgroundColor: backgroundColor ? backgroundColor : R.colors.White,
				flex: 1,
				borderTopLeftRadius: borderRadius ? borderRadius : 40,
				borderTopRightRadius: borderRadius ? borderRadius : 40,
				borderTopColor: borderTopColor ? borderTopColor : "transparent",
				borderTopWidth: borderTopColor ? 1 : 0,
				overflow: "hidden",
				marginTop: marginTop
					? marginTop
					: screenHeightInPercent(Platform.OS == "ios" ? 17 : 23),
				paddingHorizontal: 17,
				paddingHorizontal: paddingHorizontal ? paddingHorizontal : 17,
				paddingTop: paddingTop ? paddingTop : 20,
			}}
		>
			{children}
		</View>
	);
};

export default RoundedBG;

const styles = StyleSheet.create({});
