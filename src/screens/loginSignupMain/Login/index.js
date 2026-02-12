import React, { Component, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../containers/input";
import { signInWithEmail } from "../../../redux/auth/actions";
// import { showMessage } from "react-native-flash-message";
import R from "../../../assets";
import LoginBanner from "../../../assets/images/loginBanner.svg";
import { setAppLoading } from "../../../redux/app/actions";
import { screenHeightInPercent } from "../../../utils/screenDimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ text: "", error: "" });
  const [password, setPassword] = useState({ text: "", error: "" });
  const [disabledCheck, setDisabledCheck] = useState(true);
  const [scrollEnable, setScrollEnable] = useState(false);
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const login = async () => {
    if (email.text == "" || email.error) {
      // showMessage({ type: "danger", message: "Email cant be empty" });
    } else if (password.text == "" || password.error) {
      // showMessage({ type: "danger", message: "Password cant be empty" });
    } else {
      const loginData = {
        email: email.text,
        password: password.text,
      };
      dispatch(signInWithEmail(loginData));
    }
  };
  useEffect(() => {
    if (email.error || password.error || !email.text || !password.text) {
      setDisabledCheck(true);
    } else {
      setDisabledCheck(false);
    }
  }, [password, email]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setScrollEnable(true));
    Keyboard.addListener("keyboardDidHide", () => setScrollEnable(false));
  }, []);

  return (
    <>
      <View
        // edges={["top"]}
        style={{
          paddingTop: 50,
          flex: 1,
          backgroundColor: R.colors.PrimaryColorDark,
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            scrollEnabled={scrollEnable}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View
              style={{ alignItems: "center", marginBottom: -12, zIndex: 1000 }}
            >
              <LoginBanner width={wp("60%")} />
            </View>
            <View
              style={{
                padding: 20,
                flex: 1,
                justifyContent: "space-between",
                paddingTop: 0,
                backgroundColor: R.colors.White,
                borderTopLeftRadius: screenHeightInPercent(5.5),
                borderTopRightRadius: screenHeightInPercent(5.5),
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: hp("5%"),
                }}
              >
                <Text
                  style={{
                    fontSize: hp("3.6%"),
                    fontStyle: "normal",
                    color: R.colors.DefaultTextColor,
                    fontFamily: R.fonts.Maven_regular,
                  }}
                >
                  Sign In
                </Text>
                <Text
                  style={{
                    fontSize: hp("1.8%"),
                    fontStyle: "normal",
                    color: R.colors.Grey,
                    fontFamily: R.fonts.Maven_regular,
                  }}
                >
                  We’ve already met!
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: hp("6%") }}>
                <InputContainer
                  value={email}
                  emailField={true}
                  placeHolder={"Username"}
                  keyboardType={"email-address"}
                  onChangeText={(text) => {
                    setEmail(text);
                  }} //setEmail(text)}
                  contentContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: R.colors.LightGreyShade,
                  }}
                />
                {Platform.OS == "ios" && (
                  <TextInput
                    keyboardType="email-address"
                    style={{ backgroundColor: R.colors.White, height: 1 }}
                  />
                )}
                <InputContainer
                  value={password}
                  passwordField={true}
                  placeHolder={"Password"}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  contentContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: R.colors.LightGreyShade,
                  }}
                />
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("ForgotPassword")}
                  style={{ alignSelf: "flex-end" }}
                >
                  <Text
                    style={{
                      fontFamily: R.fonts.Maven_regular,
                      fontSize: screenHeightInPercent(1.5),
                      color: R.colors.DarkGrey,
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <SubmitButtonContainer
                  containerStyle={{
                    width: "100%",
                    height: hp("7%"),
                    borderRadius: hp("2.1%"),
                    marginTop: hp("5%"),
                    overflow: "hidden",
                  }}
                  contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
                  gradientColors={[
                    R.colors.PrimaryColorDark,
                    R.colors.PrimaryColorDark,
                  ]}
                  titleTextStyle={{
                    fontSize: hp("2.1%"),
                    color: R.colors.White,
                    fontFamily: R.fonts.Maven_bold,
                  }}
                  title={"LOGIN"}
                  onPress={() => login()}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginBottom: 10,
                  backgroundColor: R.colors.White,
                }}
              >
                <Text
                  onPress={() => props.navigation.navigate("Signup")}
                  suppressHighlighting={true}
                  style={{
                    fontSize: hp("1.5%"),
                    fontFamily: R.fonts.Inter_regular,
                    color: R.colors.Grey,
                  }}
                >
                  Don't have an account?
                </Text>
                <Text
                  onPress={() => props.navigation.navigate("SignupType")}
                  suppressHighlighting={true}
                  style={{
                    fontSize: hp("1.5%"),
                    fontFamily: R.fonts.Inter_medium,
                    textDecorationColor: R.colors.PrimaryColorDark,

                    // textDecorationLine: "underline",
                    color: R.colors.PrimaryColorDark,
                  }}
                >
                  {" "}
                  Register
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* <SafeAreaView
        edges={["Bottom"]}
        style={{ flex: 0, backgroundColor: R.colors.White }}
      /> */}
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
