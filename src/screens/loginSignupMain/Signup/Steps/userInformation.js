import React, { Component, useState, useEffect } from "react";
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
import { connect, useDispatch, useSelector } from "react-redux";
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

const UserInformation = (props) => {
  // console.log("usngladkfja;=======,", props.signUpProcessData);
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state?.auth);
  // console.log("user", props?.signUpProcessData?.userType);
  const [firstName, setFirstName] = useState({
    text: props?.signUpProcessData?.firstName,
    error: !props?.signUpProcessData?.firstName || true,
  });
  const [lastName, setLastName] = useState({
    text: props?.signUpProcessData?.lastName,
    error: !props?.signUpProcessData?.lastName || true,
  });
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const submit = async () => {
    if (firstName.text == "" || firstName.error) {
      // showMessage({ type: "danger", message: `First name can't be empty` });
    } else if (lastName.text == "" || lastName.error) {
      // showMessage({ type: "danger", message: `Last name can't be empty` });
    } else {
      let signUpProcessDataUpdated = {
        ...props.signUpProcessData,
        firstName: firstName.text,
        lastName: lastName.text,
        userSignupStepConfigured: 2,
      };
      dispatch(signUpProcessNavigate({ step: 2 }, signUpProcessDataUpdated));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        enabled={true}
        style={{ flex: 1, paddingBottom: 5 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{ padding: 20, flex: 1, paddingTop: 0, marginTop: hp("2%") }}
          >
            {/* <SignupStepsHeader /> */}
            <Text
              style={{
                fontSize: hp("1.8%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_semiBold,
                marginBottom: 5,
              }}
            >
              {props?.signUpProcessData?.userType == "freelancer"
                ? "1/5"
                : "1/3"}{" "}
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
                What is your first & last name?
              </Text>
              <InputContainer
                containerStyle={{ marginTop: 8 }}
                autoCapitalize={true}
                showError={false}
                required={true}
                value={firstName}
                placeHolder={"First Name"}
                onChangeText={(text) => setFirstName(text)}
              />
              <InputContainer
                autoCapitalize={true}
                showError={false}
                required={true}
                value={lastName}
                placeHolder={"Last Name"}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <SubmitButtonContainer
              containerStyle={{
                width: "95%",
                height: hp("7%"),
                borderRadius: hp("2%"),
                alignSelf: "center",
              }}
              contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
              disabled={firstName.error || lastName.error}
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

export default connect(mapStateToProps)(UserInformation);
