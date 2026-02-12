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
import {
  forgotPassword,
  newPassword,
} from "../../../network/phoneVerificationApi";
import { StackActions } from "@react-navigation/native";

const NewPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState({ text: "", error: "" });
  const [password2, setPassword2] = useState({ text: "", error: "" });
  const [disabledCheck, setDisabledCheck] = useState(true);
  const [scrollEnable, setScrollEnable] = useState(false);
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  console.log("p1", route.params.token);
  const Send = async () => {
    if (password1.text.length < 6) {
      //   showMessage({
      //     type: "danger",
      //     message: "Password should not less than 6 digit",
      //   });
    } else if (password1.text !== password2.text) {
      //   showMessage({ type: "danger", message: "Password mismatch" });
    } else {
      dispatch(setAppLoading(true));
      newPassword(route?.params?.token, password1.text)
        .then((res) => {
          dispatch(setAppLoading(false));
          if (res?.accessToken) {
            // showMessage({
            // 	type: "success",
            // 	message: "New Password Created Successfully",
            // });
            navigation.dispatch(StackActions.pop(3));
          }
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
        });
    }
  };

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
                  Create New Password
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: hp("6%") }}>
                <InputContainer
                  value={password1}
                  passwordField={true}
                  placeHolder={"Password"}
                  onChangeText={(text) => {
                    setPassword1(text);
                  }}
                  contentContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: R.colors.LightGreyShade,
                  }}
                />
                <InputContainer
                  value={password2}
                  passwordField={true}
                  placeHolder={"Confirm Password"}
                  onChangeText={(text) => {
                    setPassword2(text);
                  }}
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

export default NewPassword;
