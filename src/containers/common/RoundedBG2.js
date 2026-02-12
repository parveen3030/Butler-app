import { StyleSheet, Text, View } from "react-native";
import React from "react";
import R from "../../assets";
import { screenHeightInPercent } from "../../utils/screenDimensions";

const RoundedBG2 = ({
	children,
	marginTop,
	backgroundColor,
	paddingHorizontal,
	borderRadius,
	paddingTop,
	marginHorizontal = 0,
}) => {
	return (
		<View
			style={{
				backgroundColor: backgroundColor ? backgroundColor : R.colors.White,
				borderRadius: borderRadius ? borderRadius : 44,
				borderColor: "#00000014",
				borderWidth: 1,
				overflow: "hidden",
				marginTop: marginTop
					? marginTop
					: screenHeightInPercent(Platform.OS == "ios" ? 17 : 23),
				paddingHorizontal: paddingHorizontal ? paddingHorizontal : 17,
				paddingTop: paddingTop ? paddingTop : 20,
				marginHorizontal: marginHorizontal,
			}}
		>
			{children}
		</View>
	);
};

export default RoundedBG2;

const styles = StyleSheet.create({});
