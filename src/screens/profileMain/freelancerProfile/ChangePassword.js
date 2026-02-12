import { StyleSheet, Text, View, Alert, Platform } from "react-native";
import React, { useState } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RoundedBG from "../../../containers/common/RoundedBG";
import Icons from "../../../containers/common/Icons";
import MainBackground from "../../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import { inputContainers } from "../../../containers/input";
import { useDispatch, useSelector } from "react-redux";
import { setAppLoading, testAction } from "../../../redux/app/actions";
import { resetPassword } from "../../../network/userApi";
// import { showMessage } from "react-native-flash-message";
import { useEffect } from "react";
import { logout } from "../../../redux/auth/actions";
import RoundedBG2 from "../../../containers/common/RoundedBG2";
import { Image } from "react-native";

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState({ text: "", error: true });
  const [password, setPassword] = useState({ text: "", error: true });
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState({
    text: "",
    error: true,
  });
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const submit = () => {
    if (oldPassword.text.trim() == "" || oldPassword.error) {
      setMessage("Old Password can't be empty");
    } else if (password.text.trim() == "" || password.error) {
      setMessage("Password can't be empty");
    } else if (confirmPassword.text.trim() == "" || confirmPassword.error) {
      setMessage("Confirm Password can't be empty");
    } else if (confirmPassword.text != password.text) {
      setMessage("Passwords do not match");
    } else {
      dispatch(setAppLoading(true));
      resetPassword(user.token, oldPassword.text, password.text)
        .then((data) => {
          dispatch(setAppLoading(false));
          setPassword({ text: "", error: true });
          setOldPassword({ text: "", error: true });
          setConfirmPassword({ text: "", error: true });
          // showMessage({ type: "success", message: "Password updated" });
          setShowAlert(true);
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          setMessage(err.message);
        });
    }
  };

  showAlert &&
    Alert.alert(
      "Password Updated",
      "Your password has been updated successfully",
      [
        {
          text: "Ok",
          onPress: () => {
            dispatch(logout());
          },
        },
      ],
      { cancelable: true }
    );

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message, setMessage]);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
        dispatch(logout());
      }, 4000);
    }
  }, [showAlert]);

  return (
    <MainBackground showButler={true}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: R.fonts.Maven_semiBold,
            fontSize: screenHeightInPercent(4.2),
            color: R.colors.Grey,
            marginTop:
              Platform.OS == "ios"
                ? screenHeightInPercent(15)
                : screenHeightInPercent(20),
          }}
        >
          Password
        </Text>
        <RoundedBG2 marginTop={screenHeightInPercent(4)}>
          <View style={{ paddingHorizontal: 17 }}>
            <Text style={styles.mainTxt}>Change your password </Text>
            {message ? (
              <View style={[R.appStyles.rowHCenter, styles.errBG]}>
                <Icons
                  family={"Feather"}
                  name="alert-circle"
                  size={25}
                  color={R.colors.Red}
                />
                <Text numberOfLines={1} style={styles.errTxt}>
                  {message}
                </Text>
              </View>
            ) : (
              <View></View>
            )}

            <InputContainer
              title={"Old Password"}
              containerStyle={{ marginTop: 15 }}
              leftIcon={
                <Icons
                  family={"Ionicons"}
                  name="lock-closed-outline"
                  size={20}
                  color={R.colors.Grey}
                />
              }
              fontSize={16}
              showError={true}
              passwordField={true}
              value={oldPassword}
              placeHolder={"Old Password"}
              onChangeText={(text) => setOldPassword(text)}
            />
            <InputContainer
              title={"New Password"}
              leftIcon={
                <Icons
                  family={"Ionicons"}
                  name="lock-closed-outline"
                  size={20}
                  color={R.colors.Grey}
                />
              }
              titleTextStyle={{ marginTop: 0, marginBottom: 5 }}
              fontSize={16}
              showError={true}
              passwordField={true}
              value={password}
              placeHolder={"New Password"}
              onChangeText={(text) => setPassword(text)}
            />
            <InputContainer
              title={"Confirm Password"}
              leftIcon={
                <Icons
                  family={"Ionicons"}
                  name="lock-closed-outline"
                  size={20}
                  color={R.colors.Grey}
                />
              }
              titleTextStyle={{ marginTop: 0, marginBottom: 5 }}
              fontSize={16}
              showError={true}
              passwordField={true}
              value={confirmPassword}
              placeHolder={"Confirm Password"}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </RoundedBG2>
        <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
        <View style={styles.btnView}>
          <SubmitButtonContainer
            containerStyle={styles.btnBG}
            contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
            gradientColors={[
              R.colors.PrimaryColorDark,
              R.colors.PrimaryColorDark,
            ]}
            titleTextStyle={{
              fontSize: screenHeightInPercent(1.6),
              color: R.colors.White,
              fontFamily: R.fonts.Maven_semiBold,
            }}
            onPress={submit}
            title={"UPDATE"}
          />
          <View style={{ width: "5%" }} />
          <SubmitButtonContainer
            containerStyle={[{ padding: 2 }, styles.btnBG]}
            contentContainerStyle={[
              R.appStyles.rowCenter,
              {
                flex: 1,
                backgroundColor: R.colors.BackgroundLightGrey,
                borderRadius: 8,
              },
            ]}
            activeOpacity={1}
            titleTextStyle={{
              fontSize: screenHeightInPercent(1.6),
              color: R.colors.PrimaryColorDark,
              fontFamily: R.fonts.Maven_semiBold,
            }}
            onPress={() => navigation.goBack()}
            title={"CANCEL"}
          />
        </View>
      </KeyboardAwareScrollView>
    </MainBackground>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  mainTxt: {
    color: R.colors.Black,
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(1.7),
    textAlign: "center",
    marginTop: screenHeightInPercent(1.5),
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 7,
  },
  errTxt: {
    marginLeft: 10,
    fontSize: screenHeightInPercent(1.5),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_medium,
  },
  errBG: {
    backgroundColor: "#fd37451f",
    padding: 10,
    borderRadius: 8,
    marginTop: screenHeightInPercent(4),
  },
  btnBG: {
    width: "33%",
    height: screenHeightInPercent(5),
    borderRadius: 10,
    // alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
