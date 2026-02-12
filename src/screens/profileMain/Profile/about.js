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
import {
  signUpProcessNavigate,
  updateUser,
} from "../../../redux/auth/actions";
import Lock from "../../../assets/images/lock.svg";
import { updateUserProfile } from "../../../network/userApi";
import { userDataSelector } from "../../../redux/auth/selectors";

const About = (props) => {
  const { userData } = props;
  const dispatch = useDispatch();
  const [about, setAbout] = useState({
    text: userData?.aboutMe,
    error: false,
  });
  let SubmitButtonContainer = inputContainers["submitButton"];
  let TextArea = inputContainers["textArea"];

  const submit = async () => {
    if (about?.text?.trim() == "" || about?.error) {
      // showMessage({ type: "danger", message: `About can't be empty` });
    } else {
      const userData = {
        aboutMe: about.text, // about?.text,
      };
      updateUserProfile(userData).then((data) => {
        if (data?.updatedUser) {
          dispatch(updateUser(data.updatedUser));
          props.navigation.goBack();
        }
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: R.colors.BackgroundLightGrey }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
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
              <Text style={{ textAlignVertical: "top" }}>dkf</Text>
              <TextArea
                inputStyle={{ textAlignVertical: "top" }}
                required={true}
                value={about}
                placeHolder={"About me"}
                onChangeText={(text) => setAbout(text)}
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
              disabled={about?.text?.trim() == "" || about?.error}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    userData: userDataSelector(state),
  };
}

export default connect(mapStateToProps)(About);
