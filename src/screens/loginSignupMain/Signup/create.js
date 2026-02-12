import React, { Component, useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../containers/input";
import {
  setUserPhoneNumber,
  signUpWithEmail,
} from "../../../redux/auth/actions";
// import { showMessage } from "react-native-flash-message";
import R from "../../../assets";
import EnvelopeOpen from "../../../assets/images/envelope_open.svg";
import Lock from "../../../assets/images/lock.svg";
import { setAppLoading } from "../../../redux/app/actions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ text: "", error: "" });
  const [password, setPassword] = useState({ text: "", error: "" });
  const [scrollEnable, setScrollEnable] = useState(false);
  const [phone, setPhone] = useState({
    text: "",
    error: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    text: "",
    error: "",
  });
  const [disabledCheck, setDisabledCheck] = useState(true);
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];
  const { userType } = props.route.params;
  const signup = async () => {
    if (email.text == "" || email.error) {
      // showMessage({ type: "danger", message: "Email cant be empty" });
    } else if (password.text == "" || password.error) {
      // showMessage({ type: "danger", message: "Password cant be empty" });
    } else if (confirmPassword.text != password.text) {
      // showMessage({ type: "danger", message: "Passwords do not match" });
    } else if (phone.text == "" || phone.error) {
      // showMessage({
      //   type: "danger",
      //   message: "Please input a valid phone number",
      // });
    } else {      
      const phoneNumber = "+20"+phone.text;
      dispatch(setAppLoading(true));
      dispatch(setUserPhoneNumber(phoneNumber));

      const signupData = {
        email: email.text,
        password: password.text,
        password_confirmation: confirmPassword.text,
        step: 0,
        userType: userType || "client",
      };
      dispatch(signUpWithEmail(signupData));
    }
  };

  useEffect(() => {
    if (
      email.error ||
      password.error ||
      confirmPassword.error ||
      !email.text ||
      !password.text ||
      !confirmPassword.text
    ) {
      setDisabledCheck(true);
    } else {
      setDisabledCheck(false);
    }
  }, [password, email, confirmPassword]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setScrollEnable(true));
    Keyboard.addListener("keyboardDidHide", () => setScrollEnable(false));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: R.colors.PrimaryColorDark,
        paddingTop: Platform.OS == "ios" ? 50 : 0,
      }}
    >
      {/* <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: R.colors.PrimaryColorDark }}
      > */}
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          scrollEnabled={scrollEnable}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            <View style={{ alignItems: "center", marginVertical: hp("7%") }}>
              <Image
                source={R.images.butlerLogo}
                style={{
                  width: screenWidthInPercent(50),
                  height: screenHeightInPercent(13),
                }}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{
              padding: 20,
              flex: 1,
              paddingTop: hp("8%"),
              backgroundColor: R.colors.White,
              borderTopLeftRadius: hp("5.5%"),
              borderTopRightRadius: hp("5.5%"),
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <InputContainer
                leftIcon={<EnvelopeOpen width={hp("2%")} />}
                value={email}
                emailField={true}
                placeHolder={"Jane@doe.com"}
                keyboardType={"email-address"}
                contentContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: R.colors.LightGreyShade,
                  borderRadius: 17,
                }}
                onChangeText={(text) => setEmail(text)}
                title={"Email"}
                titleTextStyle={{
                  fontFamily: R.fonts.BalooBhai_regular,
                  fontSize: hp("1.7%"),
                  marginLeft: 10,
                  marginBottom: -2,
                }}
              />
              <InputContainer
                leftIcon={<Lock width={hp("2%")} />}
                value={password}
                passwordField={true}
                placeHolder={"••••••••"}
                contentContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: R.colors.LightGreyShade,
                  borderRadius: 17,
                }}
                onChangeText={(text) => setPassword(text)}
                title={"Password"}
                titleTextStyle={{
                  fontFamily: R.fonts.BalooBhai_regular,
                  fontSize: hp("1.7%"),
                  marginBottom: -2,
                  marginTop: -12,
                  marginLeft: 10,
                }}
              />
              <InputContainer
                leftIcon={<Lock width={hp("2%")} />}
                value={confirmPassword}
                passwordField={true}
                placeHolder={"••••••••"}
                contentContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: R.colors.LightGreyShade,
                  borderRadius: 17,
                }}
                onChangeText={(text) => setConfirmPassword(text)}
                title={"Confirm Password"}
                titleTextStyle={{
                  fontFamily: R.fonts.BalooBhai_regular,
                  fontSize: hp("1.7%"),
                  marginBottom: -2,
                  marginTop: -12,
                  marginLeft: 10,
                }}
              />
              <InputContainer
                showError={true}
                // required={true}
                title={"Phone Number"}
                value={phone.text}
                phoneField={true}
                keyboardType="phone-pad"
                defultText="+20"
                placeHolder={"123456..."}
                onChangeText={(text) => setPhone(text)}
                contentContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: R.colors.LightGreyShade,
                  borderRadius: 17,
                }}
                titleTextStyle={{
                  fontFamily: R.fonts.BalooBhai_regular,
                  fontSize: hp("1.7%"),
                  marginBottom: -2,
                  marginTop: -12,
                  marginLeft: 10,
                }}
              />
            </View>
            <SubmitButtonContainer
              containerStyle={{
                width: "100%",
                height: hp("7%"),
                borderRadius: 18,
                marginTop: 5,
              }}
              contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
              gradientColors={[
                R.colors.PrimaryColorDark,
                R.colors.PrimaryColorDark,
              ]}
              titleTextStyle={{
                fontSize: hp("2.1%"),
                color: R.colors.White,
                fontFamily: R.fonts.BalooBhai_bold,
              }}
              title={"Register"}
              onPress={() => signup()}
            />
          </View>

          {/* <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 10,
                flexDirection: "row",
                backgroundColor: R.colors.White,
              }}
            > */}
          {/* <Text
                onPress={() => props.navigation.navigate("Login")}
                suppressHighlighting={true}
                style={{
                  fontSize: hp("1.5%"),
                  fontFamily: R.fonts.defaultMedium,
                  color: R.colors.Grey,
                }}
              >
                Already have an account?
              </Text>
              <Text
                onPress={() => props.navigation.navigate("Login")}
                suppressHighlighting={true}
                style={{
                  fontSize: hp("1.5%"),
                  fontFamily: R.fonts.defaultMedium,
                  textDecorationColor: R.colors.PrimaryColorDark,
                  textDecorationLine: "underline",
                  color: R.colors.PrimaryColorDark,
                }}
              >
                {" "}
                Sign In
              </Text> */}
          {/* </View> */}
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      {/* </SafeAreaView> */}

      {/* <SafeAreaView
        edges={["Bottom"]}
        style={{ flex: 0, backgroundColor: R.colors.White }}
      /> */}
    </View>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Signup);
