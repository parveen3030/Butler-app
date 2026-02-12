import { StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import React, { useRef, useState } from "react";
import R from "../../assets";
import { screenHeightInPercent } from "../../utils/screenDimensions";
import moment from "moment";

const MonthYearInput = ({
	containerStyle,
	titleTextStyle,
	title,
	contentContainerStyle,
	valueMonth,
	valueYear,
	onChangeMonth,
	onChangeYear,
	error,
}) => {
	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);

	const handleTxt = (text, index) => {
		let year = moment(new Date()).format("YY");
		if (index == 1) {
			if (text.length == 2) {
				inputRef2.current.focus();
			}
			if (parseInt(text) > 12) {
				onChangeMonth({ text: text, error: "wrong input" });
			} else {
				onChangeMonth({ text: text, error: "" });
			}
		}
		if (index == 2) {
			if (text.length == 0) {
				inputRef1.current.focus();
			}
			if (parseInt(text) < parseInt(year) || isNaN(text)) {
				onChangeYear({ text: text, error: "wrong input" });
			} else {
				onChangeYear({ text: text, error: "" });
			}
		}
	};
	return (
		<View style={containerStyle}>
			<Text
				numberOfLines={1}
				style={[
					{
						marginBottom: 5,
						marginTop: 5,
						fontSize: screenHeightInPercent(1.4),
						color: R.colors.Grey,
						fontFamily: R.fonts.defaultSemiBold,
					},
					titleTextStyle,
				]}
			>
				{title}
			</Text>
			<View
				style={[
					{
						flexDirection: "row",
						alignItems: "center",
						color: "rgba(255, 255, 255, 1)",
						borderColor: R.colors.GreenOutlineColor,
						borderWidth: 1,
						// color: "#353635",
						borderRadius: 12,
						paddingHorizontal: 15,
					},
					contentContainerStyle,
				]}
			>
				<TextInput
					ref={inputRef1}
					placeholder="MM"
					value={valueMonth.text}
					maxLength={2}
					keyboardType="numeric"
					onChangeText={(t) => handleTxt(t, 1)}
					placeholderTextColor={R.colors.LightGrey}
					blurOnSubmit={false}
					style={() => ({
						color: R.colors.DefaultTextColor,
						height: 50,
						fontSize: screenHeightInPercent(1.8),
						fontFamily: R.fonts.ArialRegular,
						backgroundColor: "transparent",
						width: screenHeightInPercent(3.5),
					})}
				/>
				<Text
					style={{
						color: R.colors.DefaultTextColor,
						fontSize: screenHeightInPercent(1.8),
						fontFamily: R.fonts.ArialRegular,
					}}
				>
					/
				</Text>
				<TextInput
					ref={inputRef2}
					placeholder="YY"
					placeholderTextColor={R.colors.LightGrey}
					value={valueYear.text}
					maxLength={2}
					keyboardType="numeric"
					onChangeText={(t) => handleTxt(t, 2)}
					style={{
						color: R.colors.DefaultTextColor,
						height: 50,
						marginLeft: 2,
						flex: 1,
						fontSize: screenHeightInPercent(1.8),
						backgroundColor: "transparent",
						fontFamily: R.fonts.ArialRegular,
					}}
				/>
			</View>
			{error ? (
				<Text
					style={{
						marginLeft: 10,
						marginBottom: 10,
						marginTop: 5,
						height: screenHeightInPercent(2),
						fontSize: screenHeightInPercent(1.5),
						color: "#C70039",
						fontFamily: R.fonts.montserratRegular,
					}}
				>
					{error}
				</Text>
			) : (
				<View style={{ height: screenHeightInPercent(2), marginTop: 5 }}></View>
			)}
		</View>
	);
};

export default MonthYearInput;

const styles = StyleSheet.create({});
