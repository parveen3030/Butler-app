import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RoundedBG from "../../../containers/common/RoundedBG";
import MainBackground from "../../../containers/common/MainBackground";
import { logout } from "../../../redux/auth/actions";
// import { showMessage } from "react-native-flash-message";
import { setAppLoading } from "../../../redux/app/actions";
import { getAllCards } from "../../../network/paymentApi";
import { setCardsList } from "../../../redux/job/actions";
import RoundedBG2 from "../../../containers/common/RoundedBG2";

const ProfileHome = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <MainBackground showButler={true}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: R.fonts.Maven_semiBold,
          fontSize: screenHeightInPercent(4.2),
          color: R.colors.Grey,
          marginTop:
            Platform.OS == "ios"
              ? screenHeightInPercent(20)
              : screenHeightInPercent(25),
        }}
      >
        Account
      </Text>
      <RoundedBG2
        paddingHorizontal={0.001}
        marginTop={screenHeightInPercent(3)}
      >
        {/* User Data section */}
        <View
          style={{
            marginTop: 18,
            backgroundColor: "#fff",
            paddingHorizontal: screenWidthInPercent(4),
          }}
        >
          {/* user Heading */}
          <View
            style={[
              R.appStyles.rowSpaceBtwn,
              {
                borderBottomWidth: 1,
                borderBottomColor: R.colors.BorderPrimaryLight,
                paddingBottom: 10,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={R.images.userInfoIcon}
                style={{
                  width: screenHeightInPercent(3),
                  height: screenHeightInPercent(2),
                  resizeMode: "contain",
                }}
              />
              <Text style={styles.userH}>User Detail</Text>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 5 }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icons
                family={"MaterialIcons"}
                name="edit"
                size={22}
                color={R.colors.Grey}
              />
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Full Name:</Text>
              <Text numberOfLines={1} style={styles.userValueTxt}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Email:</Text>
              <Text numberOfLines={1} style={styles.userValueTxt}>
                {user?.email}
              </Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Phone:</Text>
              <Text numberOfLines={1} style={styles.userValueTxt}>
                🇪🇬 {user?.phone ? user?.phone.replace("+20", "(+20)") : ""}
              </Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Password:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Payment method:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => {
                  dispatch(setAppLoading(true));
                  getAllCards(user?._id)
                    .then((res) => {
                      dispatch(setAppLoading(false));
                      dispatch(setCardsList(res));
                      navigation.navigate("PaymentCardsList");
                    })
                    .catch((err) => {
                      dispatch(setAppLoading(false));
                    });
                }}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  Add Payment Method
                </Text>
              </TouchableOpacity>
            </View> */}
            <View
              style={[
                styles.userDataRow,
                { paddingBottom: 20, borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.userFieldTxt}>Logout:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => {
                  Alert.alert("Logout", "Are you sure want to logout", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => dispatch(logout()) },
                  ]);
                }}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RoundedBG2>
      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginTop: 15, marginRight: 20 }}
        onPress={
          () => navigation.navigate("SupportChatList")
          // showMessage({ type: "success", message: `How can I help` })
        }
      >
        <Text style={[styles.help]}>Need Help?</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Image
          style={{
            width: screenWidthInPercent(100),
            resizeMode: "contain",
            height: screenHeightInPercent(12),
          }}
          source={R.images.birds}
        />
      </View>
    </MainBackground>
  );
};

export default ProfileHome;

const styles = StyleSheet.create({
  userH: {
    marginLeft: 10,
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_regular,
  },
  aboutTxt: {
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.MediumDarkGrey,
    fontFamily: R.fonts.Inter_regular,
  },
  userDataRow: {
    borderBottomWidth: 1,
    borderBottomColor: R.colors.BorderPrimaryLight,
    paddingHorizontal: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  userFieldTxt: {
    flex: 1,
    fontSize: screenHeightInPercent(1.5),
    color: R.colors.Grey,
    fontFamily: R.fonts.Maven_regular,
  },
  userValueTxt: {
    flex: 2,
    fontSize: screenHeightInPercent(1.5),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_regular,
  },
  userUnderLineTxt: {
    textDecorationColor: R.colors.PrimaryColorDark,
    textDecorationLine: "underline",
    color: R.colors.PrimaryColorDark,
  },
  help: {
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.DarkGrey,
    fontFamily: R.fonts.Maven_medium,
    textDecorationLine: "underline",
  },
});
