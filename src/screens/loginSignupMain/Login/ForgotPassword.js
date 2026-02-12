import React, { Component, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableOpacity,
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
import { forgotPassword } from "../../../network/phoneVerificationApi";

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ text: "", error: "" });
  const [disabledCheck, setDisabledCheck] = useState(true);
  const [scrollEnable, setScrollEnable] = useState(false);
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const Send = async () => {
    dispatch(setAppLoading(true));
    forgotPassword(email.text)
      .then((res) => {
        dispatch(setAppLoading(false));
        if (res?.OTP) {
          props.navigation.navigate("ProfileOtp", {
            res,
            email: email.text,
            forgot: true,
          });
        }
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
      });
  };
  useEffect(() => {
    if (email.error || !email.text) {
      setDisabledCheck(true);
    } else {
      setDisabledCheck(false);
    }
  }, [email]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setScrollEnable(true));
    Keyboard.addListener("keyboardDidHide", () => setScrollEnable(false));
  }, []);

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: R.colors.PrimaryColorDark }}
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
                  Forgot Password
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: hp("6%") }}>
                <InputContainer
                  value={email}
                  emailField={true}
                  placeHolder={"Email"}
                  onChangeText={(text) => {
                    setEmail(text);
                  }} //setEmail(text)}
                  contentContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: R.colors.LightGreyShade,
                  }}
                />

                <SubmitButtonContainer
                  containerStyle={{
                    width: "100%",
                    height: hp("7%"),
                    borderRadius: hp("2.1%"),
                    marginTop: hp("5%"),
                    overflow: "hidden",
                  }}
                  disabled={disabledCheck}
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
                  title={"Submit"}
                  onPress={() => Send()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <SafeAreaView
        edges={["Bottom"]}
        style={{ flex: 0, backgroundColor: R.colors.White }}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ForgotPassword);
