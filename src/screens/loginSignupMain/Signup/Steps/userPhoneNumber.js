import React, { Component, useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { showMessage } from "react-native-flash-message";
import R from "../../../../assets";
import SignupStepsHeader from "./header";
import { PhoneVerification } from "../../../../containers/input/phoneVerification";
import { signUpProcessNavigate } from "../../../../redux/auth/actions";
import { signUpProcessDataSelector } from "../../../../redux/auth/selectors";
import {
  phoneVerificationCode,
  verifyOTP,
} from "../../../../network/phoneVerificationApi";
import { updateUserProfile } from "../../../../network/userApi";
import PatternBg from "../../../../assets/images/patternBg.svg";
import { inputContainers } from "../../../../containers/input";
import { setAppLoading } from "../../../../redux/app/actions";

const UserPhoneNumber = (props) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneVerificationProcess, setPhoneVerificationProcess] =
    useState(false);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
  let PhoneNumber = inputContainers["phoneNumber"];
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const submit = async () => {
    dispatch(setAppLoading(true));
    phoneVerificationCode(phoneNumber)
      .then((data) => {
        dispatch(setAppLoading(false));
        console.log("data", data);
        setPhoneNumberVerified(false);
        setPhoneVerificationProcess(true);
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
      })
      .finally(() => {
        dispatch(setAppLoading(false));
      });
  };

  console.log("ph", phoneNumber);

  const next = async () => {
    let signUpProcessDataUpdated = {
      ...props.signUpProcessData,
      phone: phoneNumber,
      userSignupStepConfigured: 3,
    };
    setPhoneVerificationProcess(false);
    dispatch(
      signUpProcessNavigate(
        { step: props.signUpProcessData.userType !== "freelancer" ? 4 : 3 },
        signUpProcessDataUpdated
      )
    );
  };

  const back = async () => {
    dispatch(signUpProcessNavigate({ step: 1 }));
  };

  const verifyCode = async (code) => {
    dispatch(setAppLoading(true));
    verifyOTP(code)
      .then((data) => {
        dispatch(setAppLoading(false));
        if (data.success) {
          console.log("data success", data);
          // showMessage({ type: "success", message: "Phone number is verified" });
          const userData = {
            firstName: props.signUpProcessData.firstName,
            lastName: props.signUpProcessData.lastName,
            dob: props.signUpProcessData.dob,
            phone: phoneNumber,
          };
          updateUserProfile(userData).then((data) => {
            setPhoneNumberVerified(true);
            next();
          });
        }
      })
      .catch((err) => {
        console.log("otp eerr", err);
        dispatch(setAppLoading(false));
      })
      .finally(() => {
        dispatch(setAppLoading(false));
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {phoneVerificationProcess && (
        <View style={{ position: "absolute", marginBottom: -12, zIndex: -1 }}>
          <PatternBg width={wp("100%")} />
        </View>
      )}
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              padding: 20,
              flex: 1,
              paddingTop: 0,
              marginTop: !phoneVerificationProcess ? hp("2%") : 0,
            }}
          >
            {!phoneVerificationProcess && <SignupStepsHeader />}
            <View
              style={{
                justifyContent: "flex-start",
                marginTop: !phoneVerificationProcess ? hp("5%") : 0,
                flex: 1,
              }}
            >
              {!phoneVerificationProcess ? (
                <>
                  <Text
                    style={{
                      fontSize: hp("2%"),
                      fontStyle: "normal",
                      color: R.colors.DarkBlack,
                      fontFamily: R.fonts.BalooBhai_semiBold,
                    }}
                  >
                    What is your phone number? 🇪🇬
                  </Text>
                  <InputContainer
                    containerStyle={{ marginTop: 8 }}
                    autoCapitalize={true}
                    showError={false}
                    required={true}
                    showFlag={true}
                    value={phoneNumber}
                    keyboardType="phone-pad"
                    placeHolder={"+20 123456..."}
                    onChangeText={(num) => setPhoneNumber(num.text)}
                  />

                  {/* <PhoneNumber
                    containerStyle={{ marginTop: 15 }}
                    maxDate={new Date()}
                    value={phoneNumber}
                    placeHolder={"e.g.  September 21, 1995"}
                    onChangeNumber={(text) => {
                      setPhoneNumber(text);
                    }}
                  /> */}
                </>
              ) : (
                <PhoneVerification
                  phoneNumber={phoneNumber}
                  onCodeFilled={verifyCode}
                  codeContainerStyle={{ width: "80%", alignSelf: "center" }}
                />
              )}
            </View>
            {!phoneVerificationProcess && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <SubmitButtonContainer
                  containerStyle={{
                    width: "45%",
                    height: hp("7%"),
                    borderRadius: 10,
                    alignSelf: "center",
                    padding: 2,
                  }}
                  contentContainerStyle={[
                    R.appStyles.rowCenter,
                    {
                      flex: 1,
                      backgroundColor: R.colors.White,
                      borderRadius: 8,
                    },
                  ]}
                  activeOpacity={1}
                  titleTextStyle={{
                    fontSize: hp("2.4%"),
                    color: R.colors.PrimaryColorDark,
                    fontFamily: R.fonts.BalooBhai_bold,
                  }}
                  title={"BACK"}
                  onPress={() =>
                    phoneVerificationProcess
                      ? setPhoneVerificationProcess(false)
                      : back()
                  }
                />
                <SubmitButtonContainer
                  containerStyle={{
                    width: "45%",
                    height: hp("7%"),
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
                  disabled={phoneNumber.length > 9 ? false : true}
                  gradientColors={[
                    R.colors.PrimaryColorDark,
                    R.colors.PrimaryColorDark,
                  ]}
                  titleTextStyle={{
                    fontSize: hp("2.4%"),
                    color: R.colors.White,
                    fontFamily: R.fonts.BalooBhai_bold,
                  }}
                  title={"NEXT"}
                  onPress={() => (phoneNumberVerified ? next() : submit())}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    signUpProcessData: signUpProcessDataSelector(state),
  };
}

export default connect(mapStateToProps)(UserPhoneNumber);
