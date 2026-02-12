import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import React, { useState } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import RoundedBG from "../../../containers/common/RoundedBG";
import MainBackground from "../../../containers/common/MainBackground";
import { inputContainers } from "../../../containers/input";
import { useDispatch, useSelector } from "react-redux";
// import { showMessage } from "react-native-flash-message";
import { updateUserProfile } from "../../../network/userApi";
import { setAppLoading } from "../../../redux/app/actions";
import { updateUser } from "../../../redux/auth/actions";
import RoundedBG2 from "../../../containers/common/RoundedBG2";
import { Image } from "react-native";

const About = ({ navigation, route }) => {
  let SubmitButtonContainer = inputContainers["submitButton"];
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [about, setAbout] = useState(user?.aboutMe);

  const submit = async () => {
    if (about == "") {
      //   showMessage({ type: "danger", message: `About can't be empty` });
    } else {
      const userData = {
        aboutMe: about, // about?.text,
      };
      dispatch(setAppLoading(true));
      updateUserProfile(userData)
        .then((data) => {
          // setShowButton(false);
          dispatch(setAppLoading(false));
          if (data?.updatedUser) {
            dispatch(updateUser(data.updatedUser));
            // showMessage({
            // 	type: "success",
            // 	message: "Data updated successfully",
            // });
            navigation.goBack();
          }
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          // showMessage({ type: "danger", message: err.message });
        });
    }
  };
  return (
    <MainBackground
      // showBackIcon
      // onBackPress={() => navigation.goBack()}
      // heading={"About"}
      showButler={true}
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
        About me
      </Text>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <RoundedBG2 marginTop={screenHeightInPercent(10)}>
          <View
            style={{
              paddingBottom: 20,
              paddingHorizontal: 7,
              marginVertical: 10,
            }}
          >
            <TextInput
              numberOfLines={7}
              style={styles.input}
              multiline={true}
              value={about}
              placeholder="About Yourself..."
              placeholderTextColor={R.colors.LightGrey}
              onChangeText={setAbout}
            />
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
            title={"UPDATE"}
            onPress={submit}
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

export default About;

const styles = StyleSheet.create({
  input: {
    borderColor: R.colors.GreenOutlineColor,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    textAlign: "justify",
    textAlignVertical: "top",
    color: R.colors.Black,
    fontSize: screenHeightInPercent(1.7),
    fontFamily: R.fonts.Maven_regular,
    minHeight: screenHeightInPercent(20),
    lineHeight: 22,
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
