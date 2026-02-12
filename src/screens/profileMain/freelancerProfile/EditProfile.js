import { StyleSheet, Text, View, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
import RoundedBG from "../../../containers/common/RoundedBG";
import MainBackground from "../../../containers/common/MainBackground";
import { inputContainers } from "../../../containers/input";
// import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../network/userApi";
import { updateUser } from "../../../redux/auth/actions";
import { setAppLoading } from "../../../redux/app/actions";
import { changePhoneNumber } from "../../../network/phoneVerificationApi";
import {countryCode} from "../../../utils/data";
import RoundedBG2 from "../../../containers/common/RoundedBG2";

const EditProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [Disable, setDisable] = useState(true);
  const [firstName, setFirstName] = useState({
    text: user.firstName,
    error: false,
  });
  const [lastName, setLastName] = useState({
    text: user.lastName,
    error: false,
  });
  const [email, setEmail] = useState({
    text: user.email,
    error: false,
  });
  const [phone, setPhone] = useState({
    text: user.phone.slice(3),
    error: false,
  });

  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const submit = () => {
    if (firstName.text.trim() == "" || firstName.error) {
      // showMessage({ type: "danger", message: `First Name can't be empty` });
    } else if (lastName.text.trim() == "" || lastName.error) {
      // showMessage({ type: "danger", message: `Last Name can't be empty` });
    } else if (email.text.trim() == "" || email.error) {
      // showMessage({ type: "danger", message: `Invalid email input` });
    } else if (phone.text.trim() == "" ||  phone.error) {      
      // showMessage({ type: "danger", message: `Invalid phone number` });
    } else if (phone.text == user.phone.slice(3)) {
      // if phone number is not changed
      if (
        firstName?.text != user?.firstName ||
        lastName?.text != user?.lastName ||
        email?.text != user?.email
      ) {
        var formdata = new FormData();
        formdata.append("firstName", firstName.text);
        formdata.append("lastName", lastName.text);
        formdata.append("email", email.text);
        dispatch(setAppLoading(true));
        updateUserProfile({ formdata: formdata, type: "formdata" })
          .then((data) => {
            dispatch(setAppLoading(false));
            let d = JSON.parse(data);
            if (d?.updatedUser) {
              dispatch(updateUser(d.updatedUser));
              // showMessage({ type: "success", message: "Profile updated" });
              navigation.goBack();
            }
          })
          .catch((err) => {
            // showMessage({ type: "danger", message: err.message });
            dispatch(setAppLoading(false));
          })
          .finally((ee) => {
            dispatch(setAppLoading(false));
          });
      }
    } else if (phone.text != user.phone.slice(3)) {
      // if phone number is changed
      var formdata = new FormData();
      formdata.append("firstName", firstName.text);
      formdata.append("lastName", lastName.text);
      formdata.append("email", email.text);

      dispatch(setAppLoading(true));
      changePhoneNumber({
        phoneNumber: countryCode + phone.text,
        id: user?._id,
      })
        .then((res) => {
          dispatch(setAppLoading(false));
          let r = JSON.parse(res);
          // showMessage({ type: "success", message: r?.message });
          if (r.message == "Please proceed for otp verification") {
            navigation.navigate("ProfileOtp", {
              data: formdata,
              phoneNumber: countryCode + phone.text,
            });
          }
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          // showMessage({ type: "success", message: err?.message });
        });
    }
  };

  useEffect(() => {
    if ( !firstName?.error && !lastName?.error && !email?.error && !phone?.error && 
      (firstName?.text != user?.firstName ||
      lastName?.text != user?.lastName ||
      email?.text != user?.email ||
      phone?.text != user?.phone.slice(3))
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [firstName, lastName, email, phone]);

  return (
    <MainBackground
      // heading={"Profile"}
      // showBackIcon
      // onBackPress={() => navigation.goBack()}
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
        Profile
      </Text>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <RoundedBG2
          paddingHorizontal={0.001}
          marginTop={screenHeightInPercent(3)}
        >
          <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
            <View style={[R.appStyles.rowSpaceBtwn]}>
              <View style={[R.appStyles.rowHCenter]}>
                <Icons
                  family={"FontAwesome5"}
                  name={"id-card"}
                  color={R.colors.MediumGrey}
                  size={20}
                />
                <Text style={styles.userH}>User Detail</Text>
              </View>
            </View>

            {/* <Text style={styles.userH}>User Detail</Text> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <InputContainer
                titleTextStyle={{ marginLeft: 5 }}
                containerStyle={{ width: screenWidthInPercent(42) }}
                title={"First Name"}
                showError={true}
                required={true}
                value={firstName}
                placeHolder={"Jane"}
                onChangeText={(text) => setFirstName(text)}
              />
              <InputContainer
                titleTextStyle={{ marginLeft: 5 }}
                containerStyle={{ width: screenWidthInPercent(42) }}
                title={"Last Name"}
                showError={false}
                required={true}
                value={lastName}
                placeHolder={"Doe"}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <InputContainer
              titleTextStyle={{ marginLeft: 5, marginTop: -5 }}
              title={"Email"}
              // showError={false}
              // required={true}
              value={email}
              emailField={true}
              placeHolder={"Email"}
              onChangeText={(text) => setEmail(text)}
            />

            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // marginTop: 10,
              }}
            >
              <InputContainer
                titleTextStyle={{ marginLeft: 5, marginTop: -5 }}
                containerStyle={{ width: screenWidthInPercent(25) }}
                title={"Phone Number"}
                showError={true}
                required={true}
                value={"phoneNumber"}
                disabled={true}
                placeHolder={"🇪🇬 +20"}
                // onChangeText={(text) => setFirstName(text)}
              /> */}

              <InputContainer
                title={"Phone Number"}
                phoneField={true}  
                value={phone}
                keyboardType="phone-pad"
                defultText="🇪🇬 +20"
                placeHolder={"123456..."}
                onChangeText={(text) => setPhone(text)}
                titleTextStyle={{ marginLeft: 5, marginTop: -5 }}
              />
            {/* </View> */}
          </View>
        </RoundedBG2>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Image
            style={{
              width: screenWidthInPercent(100),
              resizeMode: "contain",
              height: screenHeightInPercent(10),
            }}
            source={R.images.birds}
          />
        </View>
        <View style={styles.btnView}>
          <SubmitButtonContainer
            containerStyle={styles.btnBG}
            disabled={Disable}
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

export default EditProfile;

const styles = StyleSheet.create({
  userH: {
    marginLeft: 10,
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.Grey,
    fontFamily: R.fonts.Maven_medium,
    textDecorationLine: "underline",
    textAlign: "center",
    marginVertical: 10,
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
