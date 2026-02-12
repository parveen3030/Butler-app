import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RoundedBG from "../../containers/common/RoundedBG";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainBackground from "../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import { BottomSheet } from "react-native-sheet";
import { Image } from "react-native";
import { inputContainers } from "../../containers/input";

const PaymentCard = ({ navigation }) => {
  const sheetRef = useRef(null);
  let SubmitButtonContainer = inputContainers["submitButton"];
  return (
    <MainBackground showButler>
      <RoundedBG>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            onPress={() => sheetRef.current.show()}
            style={styles.sheetBtn}
          >
            <Text style={styles.btnTxt}>Share a Feedback</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </RoundedBG>
      <BottomSheet
        borderRadius={20}
        height={screenHeightInPercent(60)}
        dragIconStyle={{ width: screenWidthInPercent(35), height: 4 }}
        ref={sheetRef}
        colorScheme="light"
        sheetStyle={{ backgroundColor: R.colors.White }}
      >
        <View style={styles.sheetContainer}>
          <Image style={styles.sheetImg} source={R.images.FeedBack} />

          <View>
            <Text style={styles.sheetHtxt}>Share a Feedback!</Text>
            <Text style={styles.sheetSubtxt}>
              Please give us feedback about the experience you've had with us
            </Text>
          </View>

          <SubmitButtonContainer
            containerStyle={[{ padding: 2 }, styles.btnBG]}
            contentContainerStyle={[
              R.appStyles.rowCenter,
              { flex: 1, backgroundColor: R.colors.White, borderRadius: 8 },
            ]}
            activeOpacity={1}
            titleTextStyle={{
              fontSize: screenHeightInPercent(2.5),
              color: R.colors.PrimaryColorDark,
              fontFamily: R.fonts.BalooBhai_medium,
            }}
            onPress={() => {
              navigation.navigate("Rating");
              sheetRef.current.hide();
            }}
            title={"GIVE A REVIEW"}
          />
        </View>
      </BottomSheet>
    </MainBackground>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: R.fonts.BalooBhai_bold,
    color: R.colors.White,
    fontSize: screenWidthInPercent(5),
    textAlign: "center",
  },
  sheetBtn: {
    backgroundColor: R.colors.PrimaryColorDark,
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    marginBottom: 20,
  },
  sheetImg: {
    height: screenHeightInPercent(25),
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  sheetHtxt: {
    fontSize: screenHeightInPercent(3.5),
    color: R.colors.Black,
    textAlign: "center",
    fontFamily: R.fonts.Inter_light,
  },
  sheetSubtxt: {
    fontSize: screenHeightInPercent(2),
    color: R.colors.Black,
    textAlign: "center",
    fontFamily: R.fonts.Inter_light,
    paddingHorizontal: screenWidthInPercent(7),
  },
  btnBG: {
    width: "80%",
    height: screenHeightInPercent(7),
    borderRadius: 10,
    alignSelf: "center",
  },
  sheetContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: screenHeightInPercent(2),
    marginBottom: screenHeightInPercent(4),
  },
});
