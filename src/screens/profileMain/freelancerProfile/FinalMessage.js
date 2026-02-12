import { StyleSheet, Text, View, Image, Platform } from "react-native";
import React from "react";
import MainBackground from "../../../containers/common/MainBackground";
import RoundedBG from "../../../containers/common/RoundedBG";
import {
	screenHeightInPercent,
	screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets";
import { inputContainers } from "../../../containers/input";

const FinalMessage = ({ navigation }) => {
	let SubmitButtonContainer = inputContainers["submitButton"];
	return (
		<MainBackground showButler>
			<View style={styles.mainBG}>
				<Image style={styles.imgBG} source={R.images.requestSent} />
				<View style={styles.contentBG}>
					<Text style={styles.headTxt}>Your request has been sent!</Text>
					<Text style={styles.subTxt}>Pending review.</Text>
					<SubmitButtonContainer
						containerStyle={[{ padding: 2 }, styles.btnBG]}
						contentContainerStyle={[
							R.appStyles.rowCenter,
							{ flex: 1, backgroundColor: R.colors.White, borderRadius: 8 },
						]}
						activeOpacity={1}
						titleTextStyle={{
							fontSize: screenHeightInPercent(2.4),
							color: R.colors.PrimaryColorDark,
							fontFamily: R.fonts.Maven_semiBold,
						}}
						onPress={() => {
							navigation.navigate("ProfileHome");
						}}
						title={"BACK TO PROFILE"}
					/>
				</View>
			</View>
		</MainBackground>
	);
};

export default FinalMessage;

const styles = StyleSheet.create({
	mainBG: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imgBG: {
		height: screenHeightInPercent(30),
		width: screenHeightInPercent(30),
		resizeMode: "contain",
		marginTop:
			Platform.OS == "ios"
				? screenHeightInPercent(15)
				: screenHeightInPercent(20),
	},
	contentBG: {
		height: screenHeightInPercent(30),
		width: "100%",
	},
	btnBG: {
		width: "65%",
		height: screenHeightInPercent(5.4),
		borderRadius: 10,
		alignSelf: "center",
		marginTop: screenHeightInPercent(6),
	},
	headTxt: {
		fontSize: screenHeightInPercent(2.2),
		color: R.colors.Black,
		fontFamily: R.fonts.Maven_regular,
		textAlign: "center",
		paddingHorizontal: screenWidthInPercent(5),
		marginTop: screenHeightInPercent(8),
	},
	subTxt: {
		fontSize: screenHeightInPercent(1.9),
		color: R.colors.Grey,
		fontFamily: R.fonts.Maven_regular,
		textAlign: "center",
		paddingHorizontal: screenWidthInPercent(5),
		marginTop: screenHeightInPercent(5),
	},
});
