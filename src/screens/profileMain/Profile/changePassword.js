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
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../containers/input";
// import { showMessage } from "react-native-flash-message";
import R from "../../../assets";
import { logout, signUpProcessNavigate } from "../../../redux/auth/actions";
import Lock from "../../../assets/images/lock.svg";
import { tokenSelector } from "../../../redux/auth/selectors";
import { resetPassword } from "../../../network/userApi";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState({ text: "", error: true });
  const [password, setPassword] = useState({ text: "", error: true });
  const [confirmPassword, setConfirmPassword] = useState({
    text: "",
    error: true,
  });
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const submit = async () => {
    console.log(password, confirmPassword);
    if (oldPassword.text.trim() == "" || oldPassword.error) {
      // showMessage({ type: "danger", message: `Old Password can't be empty` });
    } else if (password.text.trim() == "" || password.error) {
      // showMessage({ type: "danger", message: `Password can't be empty` });
    } else if (confirmPassword.text.trim() == "" || confirmPassword.error) {
      // showMessage({
      //   type: "danger",
      //   message: `Confirm Password can't be empty`,
      // });
    } else if (confirmPassword.text != password.text) {
      // showMessage({ type: "danger", message: "Passwords do not match" });
    } else {
      resetPassword(props.token, oldPassword.text, password.text).then(
        (data) => {
          setPassword({ text: "", error: true });
          setOldPassword({ text: "", error: true });

          setConfirmPassword({ text: "", error: true });
          // showMessage({ type: "success", message: "Password updated" });
          dispatch(logout());
        }
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: R.colors.BackgroundLightGrey }}
    >
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <View
          style={{
            padding: 20,
            paddingTop: 0,
            marginTop: hp("2%"),
            backgroundColor: "#fff",
            borderTopColor: R.colors.BorderColor,
            borderTopWidth: 1,
            borderBottomColor: R.colors.BorderColor,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ justifyContent: "flex-start", marginTop: hp("2%") }}>
            <Text
              style={{
                fontSize: hp("1.8%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.defaultMedium,
              }}
            >
              Password Change
            </Text>
            <InputContainer
              title={"Old Password"}
              containerStyle={{ marginTop: 15 }}
              leftIcon={<Lock stroke={"#A0A0A0"} width={hp("1.8%")} />}
              showError={true}
              passwordField={true}
              value={oldPassword}
              placeHolder={"Old Password"}
              onChangeText={(text) => setOldPassword(text)}
            />
            <InputContainer
              title={"New Password"}
              containerStyle={{ marginTop: 15 }}
              leftIcon={<Lock stroke={"#A0A0A0"} width={hp("1.8%")} />}
              showError={true}
              passwordField={true}
              value={password}
              placeHolder={"New Password"}
              onChangeText={(text) => setPassword(text)}
            />
            <InputContainer
              title={"Confirm Password"}
              leftIcon={<Lock stroke={"#A0A0A0"} width={hp("1.8%")} />}
              showError={true}
              value={confirmPassword}
              passwordField={true}
              placeHolder={"Confirm Password"}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: 20,
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
              { flex: 1, backgroundColor: R.colors.White, borderRadius: 8 },
            ]}
            activeOpacity={1}
            titleTextStyle={{
              fontSize: hp("2.4%"),
              color: R.colors.PrimaryColorDark,
              fontFamily: R.fonts.defaultSemiBold,
            }}
            title={"CANCEL"}
            onPress={() => props.navigation.goBack()}
          />
          <SubmitButtonContainer
            containerStyle={{
              width: "45%",
              height: hp("7%"),
              borderRadius: 10,
              alignSelf: "center",
            }}
            contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
            gradientColors={[
              R.colors.PrimaryColorDark,
              R.colors.PrimaryColorDark,
            ]}
            titleTextStyle={{
              fontSize: hp("2.4%"),
              color: R.colors.White,
              fontFamily: R.fonts.defaultSemiBold,
            }}
            title={"UPDATE"}
            onPress={() => submit()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
  };
}

export default connect(mapStateToProps)(ChangePassword);
