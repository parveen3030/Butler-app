import React, { Component, useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../../containers/input";
// import { showMessage } from "react-native-flash-message";
import R from "../../../../assets";
import SignupStepsHeader from "./header";
import { signUpProcessNavigate } from "../../../../redux/auth/actions";
import { signUpProcessDataSelector } from "../../../../redux/auth/selectors";
import { updateUserProfile } from "../../../../network/userApi";
import { setAppLoading } from "../../../../redux/app/actions";

const UserBirthDate = (props) => {
  console.log("user", props?.signUpProcessData?.userType);
  const dispatch = useDispatch();
  const [birthDate, setBirthDate] = useState(null);
  let DatePicker = inputContainers["datePicker"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const next = async () => {
    let signUpProcessDataUpdated = {
      ...props.signUpProcessData,
      dob: birthDate,
      userSignupStepConfigured: 3,
    };
    dispatch(
      signUpProcessNavigate(
        { step: props.signUpProcessData.userType !== "freelancer" ? 5 : 3 },
        signUpProcessDataUpdated
      )
    );
  };

  const submit = async () => {
    if (!birthDate) {
      // showMessage({ type: "danger", message: `Date of birth can't be empty` });
    } else {
      dispatch(setAppLoading(true));
      const userData = {
        firstName: props.signUpProcessData.firstName,
        lastName: props.signUpProcessData.lastName,
        dob: birthDate,
        phone: props.signUpProcessData.phone,
      };
      updateUserProfile(userData)
        .then((data) => {
          next();
        })
        .then((res) => {
          dispatch(setAppLoading(false));
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
        });
    }
  };

  const back = async () => {
    dispatch(signUpProcessNavigate({ step: 0 }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <View
          style={{ padding: 20, flex: 1, paddingTop: 0, marginTop: hp("2%") }}
        >
          <Text
            style={{
              fontSize: hp("1.8%"),
              fontStyle: "normal",
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.Maven_semiBold,
              marginBottom: 5,
            }}
          >
            {props?.signUpProcessData?.userType == "freelancer" ? "2/5" : "2/3"}{" "}
            STEPS
          </Text>
          <View
            style={{
              justifyContent: "flex-start",
              marginTop: hp("1%"),
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: hp("2.4%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
              }}
            >
              Tell us about yourself!
            </Text>
            <Text
              style={{
                fontSize: hp("1.6%"),
                fontStyle: "normal",
                marginTop: 5,
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
              }}
            >
              Let’s fill this out to complete your account.
            </Text>
            <Text
              style={{
                fontSize: hp("2.4%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
                marginTop: 40,
              }}
            >
              What is your birthday?
            </Text>
            <DatePicker
              containerStyle={{ marginTop: 8 }}
              maxDate={new Date()}
              value={birthDate}
              placeHolder={"e.g.  September 21, 1995"}
              onChangeDate={(text) => setBirthDate(text)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <SubmitButtonContainer
              containerStyle={{
                width: "95%",
                height: hp("7%"),
                borderRadius: hp("2%"),
                alignSelf: "center",
              }}
              contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
              disabled={!birthDate}
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
              onPress={() => submit()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    signUpProcessData: signUpProcessDataSelector(state),
  };
}

export default connect(mapStateToProps)(UserBirthDate);
