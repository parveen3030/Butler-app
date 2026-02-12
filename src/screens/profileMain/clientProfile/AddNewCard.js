import { StyleSheet, Text, View, BackHandler, Platform } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MainBackground from "../../../containers/common/MainBackground";
import RoundedBG from "../../../containers/common/RoundedBG";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import R from "../../../assets";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import { inputContainers } from "../../../containers/input";
import { BottomSheet } from "react-native-sheet";
import { Image } from "react-native";
import TogleBtn from "../../../containers/common/TogleBtn";
import creditcardutils from "creditcardutils";
// import { showMessage } from "react-native-flash-message";
import { containsOnlyNumbers } from "../../../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { setAppLoading } from "../../../redux/app/actions";
import { getAllCards, postCard } from "../../../network/paymentApi";
import { setCardsList } from "../../../redux/job/actions";
import MonthYearInput from "../../../containers/input/monthYearInput";
import RoundedBG2 from "../../../containers/common/RoundedBG2";

const AddNewCard = ({ navigation }) => {
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [CardNumber, setCardNumber] = useState({ text: "", error: false });
  const [billingAddress, setBillingAddress] = useState({
    text: "",
    error: false,
  });
  const [fullName, setFullName] = useState({ text: "", error: false });
  const [CVC, setCVC] = useState({ text: "", error: false });
  const [month, setMonth] = useState({ text: "", error: false });
  const [year, setYear] = useState({ text: "", error: false });
  const [ExpDate, setExpDate] = useState("");
  const sheetRef = useRef(null);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const submit = () => {
    if (!creditcardutils.validateCardNumber(CardNumber.text)) {
      // showMessage({
      // 	type: "danger",
      // 	message: `Please input a valid card number`,
      // });
    } else if (!month) {
      // showMessage({ type: "danger", message: `Please select expiry date` });
    } else if (!year) {
      // showMessage({ type: "danger", message: `Please select expiry date` });
    } else if (
      !containsOnlyNumbers(CVC.text) ||
      CVC.text.length < 3 ||
      !creditcardutils.validateCardCVC(CVC.text)
    ) {
      // showMessage({
      // 	type: "danger",
      // 	message: `Please enter a valid CVC number`,
      // });
    } else if (!billingAddress.text) {
      // showMessage({ type: "danger", message: `Billing address is required` });
    } else {
      let postData = {
        cardNumber: CardNumber.text,
        cvv: CVC.text,
        expMonth: month.text, // ExpDate.slice(0, 2),
        expYear: "20" + year.text, // ExpDate.slice(3),
        user: user._id,
        isPrimary: isSwitchOn,
        billing_address: billingAddress.text,
      };
      console.log("first", postData);
      dispatch(setAppLoading(true));
      postCard(postData)
        .then((res) => {
          getAllCards(user?._id)
            .then((res) => {
              dispatch(setAppLoading(false));
              dispatch(setCardsList(res));
            })
            .catch(() => {
              dispatch(setAppLoading(false));
            });
          // showMessage({
          // 	type: "success",
          // 	message: res?.message,
          // });
          setTimeout(() => {
            sheetRef.current.show();
          }, 1000);
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
        });
    }
    var formdata = new FormData();
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <MainBackground
      showButler
      // showBackIcon
      // onBackPress={() => navigation.goBack()}
    >
      <Text style={styles.headTxt}>Payments</Text>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <RoundedBG2
          marginTop={screenHeightInPercent(Platform.OS == "ios" ? 22 : 28)}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={styles.userHeadTxt}>User Detail</Text>
            <InputContainer
              type="creditcard"
              titleTextStyle={{ marginLeft: 5 }}
              containerStyle={{ marginTop: 10 }}
              title={"CARD NUMBER"}
              keyboardType="number-pad"
              value={CardNumber}
              placeHolder={"5555 5555 5555 4444"}
              onChangeText={(text) => setCardNumber(text)}
            />
            <View style={[R.appStyles.rowSpaceBtwn]}>
              <InputContainer
                titleTextStyle={{ marginLeft: 5 }}
                containerStyle={{
                  marginTop: -10,
                  width: screenWidthInPercent(42),
                }}
                title={"CVC"}
                type="cvc"
                value={CVC}
                placeHolder={"Jane"}
                keyboardType="number-pad"
                onChangeText={(text) => setCVC(text)}
              />
              <MonthYearInput
                title="EXPIRY"
                containerStyle={{
                  marginTop: -10,
                  width: screenWidthInPercent(42),
                }}
                valueMonth={month}
                valueYear={year}
                error={month.error || year.error ? "wrong input" : ""}
                onChangeMonth={(text) => setMonth(text)}
                onChangeYear={(text) => setYear(text)}
              />
            </View>
            <InputContainer
              // type="creditcard"
              titleTextStyle={{ marginLeft: 5 }}
              containerStyle={{ marginTop: -10 }}
              title={"BILLING ADDRESS"}
              value={billingAddress}
              placeHolder={"Address"}
              onChangeText={(text) => setBillingAddress(text)}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: screenHeightInPercent(4),
              }}
            >
              <TogleBtn onValueChange={onToggleSwitch} value={isSwitchOn} />
              <Text style={styles.toggleTxt}>Set as a Primary Card</Text>
            </View>
          </View>
        </RoundedBG2>
        <View style={{ flex: 1 }} />
        <View style={styles.btnView}>
          <SubmitButtonContainer
            containerStyle={styles.btnBG}
            // disabled={Disable}
            contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
            gradientColors={[
              R.colors.PrimaryColorDark,
              R.colors.PrimaryColorDark,
            ]}
            titleTextStyle={{
              fontSize: screenHeightInPercent(2.4),
              color: R.colors.White,
              fontFamily: R.fonts.BalooBhai_bold,
            }}
            onPress={() => submit()}
            title={"ADD"}
          />
          <SubmitButtonContainer
            containerStyle={[{ padding: 2 }, styles.btnBG]}
            contentContainerStyle={[
              R.appStyles.rowCenter,
              {
                flex: 1,
                backgroundColor: R.colors.BackgroundLightGrey,
                borderRadius: 8,
              },
            ]}
            activeOpacity={1}
            titleTextStyle={{
              fontSize: screenHeightInPercent(2.4),
              color: R.colors.PrimaryColorDark,
              fontFamily: R.fonts.BalooBhai_bold,
            }}
            onPress={() => navigation.goBack()}
            title={"CANCEL"}
          />
        </View>
      </KeyboardAwareScrollView>
      <BottomSheet
        backdropClosesSheet={false}
        draggable={false}
        onRequestClose={() => navigation.goBack()}
        borderRadius={20}
        height={screenHeightInPercent(60)}
        dragIconStyle={{ width: screenWidthInPercent(35), height: 4 }}
        ref={sheetRef}
        colorScheme="light"
        sheetStyle={{ backgroundColor: R.colors.White }}
      >
        <View
          style={{
            flex: 1,
            // justifyContent: "center",
            alignItems: "center",
            marginTop: screenHeightInPercent(2),
            marginBottom: screenHeightInPercent(4),
          }}
        >
          <Image style={styles.sheetImg} source={R.images.paymentThankU} />
          <View>
            <Text style={styles.sheetHtxt}>
              Your card has been successfully added!
            </Text>
          </View>
          <SubmitButtonContainer
            backdropClosesSheet={false}
            draggable={false}
            containerStyle={[
              {
                padding: 2,
                width: "75%",
                height: screenHeightInPercent(7),
                borderRadius: 10,
                alignSelf: "center",
                marginTop: screenHeightInPercent(2),
              },
            ]}
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
              navigation.navigate("ProfileHome");
            }}
            title={"BACK TO PROFILE"}
          />
        </View>
      </BottomSheet>
    </MainBackground>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  headTxt: {
    fontSize: screenHeightInPercent(2.5),
    fontFamily: R.fonts.BalooBhai_regular,
    color: R.colors.Black,
    position: "absolute",
    textAlign: "center",
    flex: 1,
    alignSelf: "center",
    marginTop: screenHeightInPercent(23),
  },
  userHeadTxt: {
    fontSize: screenHeightInPercent(1.9),
    color: R.colors.Black,
    fontFamily: R.fonts.Inter_medium,
  },
  btnBG: {
    width: "45%",
    height: screenHeightInPercent(7),
    borderRadius: 10,
    alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  sheetImg: {
    height: screenHeightInPercent(30),
    width: screenHeightInPercent(30),
    resizeMode: "contain",
  },
  sheetHtxt: {
    fontSize: screenHeightInPercent(3.5),
    color: R.colors.Black,
    textAlign: "center",
    fontFamily: R.fonts.Inter_light,
  },
  toggleTxt: {
    fontFamily: R.fonts.Inter_regular,
    color: R.colors.Black,
    fontSize: screenHeightInPercent(1.8),
    marginLeft: screenWidthInPercent(2),
  },
});
