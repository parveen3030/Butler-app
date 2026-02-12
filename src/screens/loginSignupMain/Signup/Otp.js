import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import PatternBg from "../../../assets/images/patternBg.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PhoneVerification } from "../../../containers/input/phoneVerification";
import { connect, useDispatch, useSelector } from "react-redux";
import { signUpProcessDataSelector } from "../../../redux/auth/selectors";
import { setAppLoading } from "../../../redux/app/actions";
import {
  phoneVerificationCode,
  verifyOTP,
} from "../../../network/phoneVerificationApi";
// import { showMessage } from "react-native-flash-message";
import { signUpProcessNavigate } from "../../../redux/auth/actions";

const Otp = (props) => {
  const dispatch = useDispatch();
  const { userPhoneNumber } = useSelector((state) => state.auth);

  const verifyCode = async (code) => {
    dispatch(setAppLoading(true));
    verifyOTP(code)
      .then((data) => {
        dispatch(setAppLoading(false));
        if (data.success) {
          // console.log("data success", data);
          // showMessage({ type: "success", message: "Phone number is verified" });
          let signUpProcessDataUpdated = {
            ...props.signUpProcessData,
            phone: userPhoneNumber,
            userSignupStepConfigured: 1,
          };
          dispatch(
            signUpProcessNavigate({ step: 1 }, signUpProcessDataUpdated)
          );
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

  useEffect(() => {
    dispatch(setAppLoading(true));
    sendVerificationCode();
    // phoneVerificationCode(userPhoneNumber)
    //   .then((data) => {
    //     console.log("phone vari data", data);
    //     dispatch(setAppLoading(false));
    //   })
    //   .catch((err) => {
    //     dispatch(setAppLoading(false));
    //   })
    //   .finally(() => {
    //     dispatch(setAppLoading(false));
    //   });
  }, []);

  const sendVerificationCode  = () => {
    phoneVerificationCode(userPhoneNumber)
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ position: "absolute", marginBottom: -12, zIndex: -1 }}>
        <PatternBg width={wp("100%")} />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              padding: 20,
              flex: 1,
              paddingTop: 0,
              marginTop: 0,
              justifyContent: "flex-start",
            }}
          >
            <PhoneVerification
              phoneNumber={userPhoneNumber}
              onCodeFilled={verifyCode}
              onResend={sendVerificationCode}
              codeContainerStyle={{ width: "80%", alignSelf: "center" }}
            />
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

export default connect(mapStateToProps)(Otp);
// export default Otp;

const styles = StyleSheet.create({});
