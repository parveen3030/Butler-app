import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
import { useDispatch, useSelector } from "react-redux";
import RoundedBG from "../../../containers/common/RoundedBG";
import MainBackground from "../../../containers/common/MainBackground";
import { inputContainers } from "../../../containers/input";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { phoneVerificationCode, sendPhoneOtp } from "../../../network/phoneVerificationApi";
import { setAppLoading } from "../../../redux/app/actions";
import { CommonActions } from "@react-navigation/native";
import { updateUserProfile } from "../../../network/userApi";
import { updateUser } from "../../../redux/auth/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { showMessage } from "react-native-flash-message";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const ProfileOtp = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.auth);
  const { data } = route.params;
  const { phoneNumber } = route.params;
  const dispatch = useDispatch();
  let SubmitButtonContainer = inputContainers["submitButton"];
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;
  // console.log("props", route.params.res);

  const [isResendButtonVisible, setIsResendButtonVisible] = useState(false);
  const [code, setCode] = useState("");
  const RESEND_OTP_TIME_LIMIT = 120;
  const resendIntervalRef = useRef(null);
  const timerRef = useRef(RESEND_OTP_TIME_LIMIT);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState( RESEND_OTP_TIME_LIMIT );

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendIntervalRef.current) {
        clearInterval(resendIntervalRef.current);
      }
    };
  }, []);
  
  const startResendOtpTimer = () => {
    setIsResendButtonVisible(false);
    timerRef.current = RESEND_OTP_TIME_LIMIT;
    setResendButtonDisabledTime(timerRef.current);

    if (resendIntervalRef.current) {
      clearInterval(resendIntervalRef.current);
    }

    resendIntervalRef.current = setInterval(() => {
      if (timerRef.current <= 1) {
        clearInterval(resendIntervalRef.current);
        setIsResendButtonVisible(true);
        setResendButtonDisabledTime(0);
      } else {
        timerRef.current -= 1;
        setResendButtonDisabledTime(timerRef.current);
      }
    }, 1000);
  };
  
  const onResendButtonClicked = () => {
    setIsResendButtonVisible(false);
    startResendOtpTimer();
    onResend();
  };
  
  const onResend  = () => {
    phoneVerificationCode(phoneNumber)
      .then((data) => {
        console.log("phone vari data", data);
        dispatch(setAppLoading(false));
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
      })
      .finally(() => {
        dispatch(setAppLoading(false));
      }
    );
  }

  const Send = () => {
    if (route?.params?.res?.OTP == value) {
      navigation.navigate("NewPassword", {
        token: route?.params?.res?.accessToken,
      });
    } else {
      //   showMessage({ type: "danger", message: "You enter a Wrong OTP" });
    }
  };

  const submit = () => {
    console.log(value);
    dispatch(setAppLoading(true));
    sendPhoneOtp({ otp: value, id: user?._id })
      .then((res) => {
        let response = JSON.parse(res);
        if (response.success) {
          //   showMessage({
          //     type: "success",
          //     message: "Phone varified successfully",
          //   });
          // next update your profile
          updateUserProfile({ formdata: data, type: "formdata" })
            .then((resp) => {
              dispatch(setAppLoading(false));
              let d = JSON.parse(resp);
              if (d?.updatedUser) {
                dispatch(updateUser(d.updatedUser));
                // showMessage({
                //   type: "success",
                //   message: "Profile Updated",
                // });
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "ProfileHome" }],
                  })
                );
              }
            })
            .catch((err) => {
              //   showMessage({
              //     type: "danger",
              //     message: err.message,
              //   });
              dispatch(setAppLoading(false));
            });
        } else {
          dispatch(setAppLoading(false));
          //   showMessage({
          //     type: "success",
          //     message: response.message,
          //   });
        }
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
        // showMessage({
        // 	type: "danger",
        // 	message: err.message,
        // });
      });
  };
  return (
    <MainBackground showButler={true}>
      <RoundedBG>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 7 }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.TxtView}>
              {/* <Text style={styles.HeadTxt}>Update Phone Number Request</Text> */}

              <Text style={styles.detailTxt}>
                Please enter the verification code that was sent to{" "}
                <Text style={{ fontFamily: R.fonts.Inter_bold }}>
                  {route.params?.forgot ? route.params?.email : phoneNumber}
                </Text>
              </Text>
              {!route.params?.forgot && (
                !isResendButtonVisible ? (
                  <View style={{ flex: 2 }}>
                    <Text style={[styles.detailTxt, styles.userUnderLineTxt]}>
                      Resend code in {resendButtonDisabledTime}s
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity style={{ flex: 2 }} onPress={onResendButtonClicked}>
                    <Text style={[styles.detailTxt, styles.userUnderLineTxt]}>
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                )
              )}

            </View>

            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={{ margin: 20 }}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              onChange={() => {
                if (value.length == CELL_COUNT - 1) {
                  console.log("calling");
                  Keyboard.dismiss();
                }
              }}
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>

          <View style={styles.btnView}>
            {route.params?.forgot ? (
              <SubmitButtonContainer
                containerStyle={{
                  width: "100%",
                  height: hp("7%"),
                  borderRadius: hp("2.1%"),
                  marginTop: hp("5%"),
                  overflow: "hidden",
                }}
                disabled={value.length == 4 ? false : true}
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
                title={"Next"}
                onPress={() => Send()}
              />
            ) : (
              <>
                <SubmitButtonContainer
                  containerStyle={styles.btnBG}
                  contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
                  disabled={value.length == 4 ? false : true}
                  gradientColors={[
                    R.colors.PrimaryColorDark,
                    R.colors.PrimaryColorDark,
                  ]}
                  titleTextStyle={{
                    fontSize: screenHeightInPercent(
                      Platform.OS == "ios" ? 2.6 : 2.4
                    ),
                    color: R.colors.White,
                    fontFamily: R.fonts.BalooBhai_bold,
                  }}
                  onPress={submit}
                  title={"NEXT"}
                />

                <SubmitButtonContainer
                  containerStyle={[{ padding: 2 }, styles.btnBG]}
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
                    fontSize: screenHeightInPercent(
                      Platform.OS == "ios" ? 2.6 : 2.4
                    ),
                    color: R.colors.PrimaryColorDark,
                    fontFamily: R.fonts.BalooBhai_bold,
                  }}
                  onPress={() => navigation.goBack()}
                  title={"CANCEL"}
                />
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </RoundedBG>
    </MainBackground>
  );
};

export default ProfileOtp;

const styles = StyleSheet.create({
  TxtView: {
    alignItems: "center",
    marginTop: 10,
  },
  HeadTxt: {
    fontFamily: R.fonts.BalooBhai_bold,
    color: R.colors.Black,
    fontSize: screenHeightInPercent(2.1),
  },
  detailTxt: {
    fontFamily: R.fonts.Inter_regular,
    color: R.colors.Black,
    fontSize: screenHeightInPercent(2.1),
    textAlign: "center",
    marginTop: 15,
    marginHorizontal: 15,
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
  userUnderLineTxt: {
    fontFamily: R.fonts.Maven_regular,
    fontSize: screenHeightInPercent(1.8),
    marginTop: screenHeightInPercent(3),
    textDecorationColor: R.colors.PrimaryColorDark,
    textDecorationLine: "underline",
    color: R.colors.PrimaryColorDark,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    paddingTop: Platform.OS == "ios" ? 17 : 0,
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: R.colors.GreenOutlineColor,
    textAlign: "center",
    textAlignVertical: "center",
    color: R.colors.Black,
    fontFamily: R.fonts.Inter_regular,
    fontSize: 20,
    marginTop: 10,
  },
});
