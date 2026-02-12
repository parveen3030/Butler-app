import { StyleSheet, Text, View, Alert, Platform } from "react-native";
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
import { useFocusEffect } from "@react-navigation/native";
import { getAllCatagory, getCatagorySkills } from "../../../network/userApi";
import { setAppLoading } from "../../../redux/app/actions";
import RoundedBG2 from "../../../containers/common/RoundedBG2";
import { Image } from "react-native";

const MAX_LINES = 3;
const ProfileHome = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [moreBtn, setMoreBtn] = useState(null);
  const textRef = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      text2Ref.current.measure((x, y, width, height) => {
        textRef.current.measure((x, y, width, hght) => {
          if (height.toFixed(0) > hght.toFixed(0)) {
            setMoreBtn(true);
          } else {
            setMoreBtn(false);
          }
        });
      });
    }, 100);
  }, []);
  const chekMoreBtn = () => {
    setMoreBtn(false);
    setShowAll(false);
    setTimeout(() => {
      text2Ref.current.measure((x, y, width, height) => {
        textRef.current.measure((x, y, width, hght) => {
          if (height.toFixed(0) > hght.toFixed(0)) {
            setMoreBtn(true);
          } else {
            setMoreBtn(false);
            setShowAll(false);
          }
        });
      });
    }, 100);
  };
  useFocusEffect(
    React.useCallback(() => {
      chekMoreBtn();
    }, [])
  );

  const Checkheight = () => {
    return (
      <Text
        style={[
          styles.aboutTxt,
          { position: "absolute", color: "transparent", top: 5 },
        ]}
        ref={text2Ref}
      >
        {user?.aboutMe}
      </Text>
    );
  };

  const editSkills = () => {
    dispatch(setAppLoading(true));
    getCatagorySkills(user?._id)
      .then((res) => {
        dispatch(setAppLoading(false));
        navigation.navigate("Categories", { categories: res });
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
        console.log("errr", err);
      });
  }

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
              ? screenHeightInPercent(15)
              : screenHeightInPercent(20),
        }}
      >
        Account
      </Text>

      <RoundedBG2
        paddingHorizontal={0.001}
        marginTop={screenHeightInPercent(3)}
      >
        <View style={{ paddingHorizontal: screenWidthInPercent(4) }}>
          {/* about section */}
          <View style={styles.aboutView}>
            <View style={[R.appStyles.rowSpaceBtwn]}>
              <Text style={styles.aboutH}>About me</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("About")}
                style={{ padding: 5 }}
              >
                <Icons
                  family={"MaterialIcons"}
                  name="edit"
                  size={22}
                  color={R.colors.Grey}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.aboutTxtView]}>
              <Text
                ref={textRef}
                numberOfLines={showAll ? undefined : MAX_LINES}
                style={styles.aboutTxt}
              >
                {user?.aboutMe}
              </Text>

              {moreBtn && (
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 99,
                    backgroundColor: R.colors.White,
                    paddingHorizontal: 5,
                    position: "absolute",
                    bottom: 20,
                    right: 0,
                  }}
                  onPress={() => {
                    setShowAll(true);
                    setMoreBtn(false);
                  }}
                >
                  <Text style={styles.userUnderLineTxt}>more</Text>
                </TouchableOpacity>
              )}
              <Checkheight />
            </View>
          </View>

          {/* User Data section */}
          <View
            style={{
              marginTop: 18,
              backgroundColor: R.colors.White,
            }}
          >
            {/* user Heading */}
            <View style={[R.appStyles.rowSpaceBtwn]}>
              <View style={[R.appStyles.rowHCenter]}>
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
                  {user?.fullName}
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
              <View style={styles.userDataRow}>
                <Text style={styles.userFieldTxt}>Skills:</Text>
                <TouchableOpacity
                  style={{ flex: 2 }}
                  onPress={editSkills}
                >
                  <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                    Edit Skills
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.userDataRow,
                  { borderBottomWidth: 0, marginBottom: 5 },
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
        </View>
      </RoundedBG2>
      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginTop: 8, marginRight: 20 }}
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
  aboutView: {
    // marginHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: R.colors.ExtraLightGrey,
  },
  aboutTxtView: {
    marginTop: 10,
    paddingBottom: 20,
  },
  aboutH: {
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_medium,
  },
  userH: {
    marginLeft: 10,
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_regular,
  },
  aboutTxt: {
    fontSize: screenHeightInPercent(1.5),
    color: R.colors.MediumDarkGrey,
    fontFamily: R.fonts.Maven_regular,
  },
  userDataRow: {
    borderBottomWidth: 1,
    borderBottomColor: R.colors.BorderPrimaryLight,
    paddingHorizontal: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
