import {
	StyleSheet,
	Text,
	View,
	Platform,
	ScrollView,
	Image,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React from "react";
import MainBackground from "../../../containers/common/MainBackground";
import RoundedBG from "../../../containers/common/RoundedBG";
import {
	screenHeightInPercent,
	screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets"; //
import { useSelector } from "react-redux";

const PaymentCardsList = ({ navigation }) => {
	const { cards } = useSelector((state) => state.cards);
	return (
		<MainBackground
			// showBackIcon
			showButler={true}
			// onBackPress={() => navigation.goBack()}
		>
			<View style={styles.balanceSection}>
				<Text style={styles.balanceTxt}>$0.00</Text>
				<Text style={styles.balanceDetail}>Total balance in your account</Text>
				<Text style={styles.txtPress}>Charge</Text>
			</View>
			<RoundedBG
				paddingHorizontal={0.000001}
				marginTop={
					Platform.OS == "ios"
						? screenHeightInPercent(30)
						: screenHeightInPercent(37)
				}
			>
				<View style={styles.topRow}>
					<Text style={styles.leftTxt}>Cards</Text>
					<TouchableOpacity onPress={() => navigation.navigate("AddNewCard")}>
						<Text
							style={[
								styles.leftTxt,
								{
									color: R.colors.PrimaryColorDark,
									textDecorationLine: "underline",
								},
							]}
						>
							+ Add card
						</Text>
					</TouchableOpacity>
				</View>

				<View>
					<ScrollView
						contentContainerStyle={{
							paddingBottom: screenHeightInPercent(7),
							paddingTop: screenHeightInPercent(4),
						}}
					>
						{cards?.map((val, key) => {
							return (
								<ImageBackground
									key={key}
									source={R.images.creditCard}
									style={styles.cardImgBG}
									imageStyle={styles.cardImg}
								>
									<View style={styles.cardBG}>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												marginTop: screenHeightInPercent(5),
												alignItems: "flex-end",
											}}
										>
											<Image
												source={R.images.sim}
												style={{
													width: screenWidthInPercent(8),
													marginLeft: screenWidthInPercent(6),
													marginTop: screenHeightInPercent(1),
													height: screenHeightInPercent(4),
													resizeMode: "contain",
												}}
											/>
											<View style={styles.imgBG}>
												<Image
													source={{ uri: val.cardLogo }}
													style={styles.cardLogo}
												/>
											</View>
										</View>
										<View style={styles.cardNmbrRow}>
											<View style={styles.dotRow}>
												{[
													1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
												].map((v, k) => {
													return (
														<View
															key={v}
															style={{
																height: screenHeightInPercent(1),
																width: screenHeightInPercent(1),
																borderRadius: 10,
																backgroundColor:
																	k % 5 == 0 ? "transparent" : R.colors.White,
															}}
														/>
													);
												})}
											</View>
											{/* <Text style={styles.cardDots}>•••• •••• ••••</Text> */}
											<Text style={styles.cardTxt}>{val.lastFourDigits}</Text>
										</View>
										<Text style={styles.cardDate}>
											{val.expMonth}/{val.expYear}
										</Text>
									</View>
								</ImageBackground>
							);
						})}
					</ScrollView>
				</View>
				<View
					style={{ backgroundColor: R.colors.BackgroundLightGrey, flex: 1 }}
				></View>
			</RoundedBG>
		</MainBackground>
	);
};

export default PaymentCardsList;

const styles = StyleSheet.create({
	balanceSection: {
		alignSelf: "center",
		marginTop: screenHeightInPercent(25),
		position: "absolute",
		alignItems: "center",
	},
	balanceTxt: {
		fontFamily: R.fonts.Maven_medium,
		color: R.colors.Black,
		fontSize: screenHeightInPercent(2.8),
	},
	balanceDetail: {
		fontFamily: R.fonts.Maven_regular,
		color: R.colors.DarkGrey,
		fontSize: screenHeightInPercent(1.4),
	},
	txtPress: {
		fontFamily: R.fonts.Maven_black,
		color: R.colors.PrimaryColorDark,
		fontSize: screenHeightInPercent(1.5),
		textDecorationLine: "underline",
		marginTop: screenHeightInPercent(3),
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 17,
		marginBottom: 10,
	},
	leftTxt: {
		fontFamily: R.fonts.Maven_regular,
		color: R.colors.Black,
		fontSize: screenHeightInPercent(1.6),
		color: R.colors.DarkGrey,
	},
	cardImg: {
		resizeMode: "contain",
	},
	cardImgBG: {
		width: screenWidthInPercent(90),
		height: screenHeightInPercent(22),
		alignSelf: "center",
	},
	cardBG: {
		flex: 1,
	},
	cardLogo: {
		alignSelf: "flex-end",
		height: screenHeightInPercent(4),
		width: screenWidthInPercent(13),
		resizeMode: "contain",
	},
	imgBG: {
		// marginTop: screenHeightInPercent(5),
		marginTop: screenHeightInPercent(-5),
		marginRight: screenWidthInPercent(10),
		backgroundColor: R.colors.White,
		alignSelf: "flex-end",
		paddingHorizontal: screenWidthInPercent(1.6),
		paddingVertical: 4,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	cardDots: {
		color: R.colors.White,
		fontWeight: "700",
		fontFamily: R.fonts.Inter_regular,
		fontSize: screenHeightInPercent(4),
	},
	cardTxt: {
		fontSize: screenHeightInPercent(2),
		color: R.colors.White,
		fontWeight: "700",
		fontFamily: R.fonts.Inter_regular,
	},
	cardDate: {
		alignSelf: "flex-end",
		marginRight: screenWidthInPercent(8),
		marginTop: screenHeightInPercent(2),
		color: R.colors.White,
		fontWeight: "500",
		fontFamily: R.fonts.Inter_medium,
		fontSize: screenHeightInPercent(1.6),
	},
	cardNmbrRow: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: screenWidthInPercent(5),
		marginTop: screenHeightInPercent(1),
	},
	dotRow: {
		flexDirection: "row",
		width: "52%",
		justifyContent: "space-between",
		marginLeft: screenWidthInPercent(-2),
		marginRight: 8,
	},
});
