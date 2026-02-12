import React, { Component, useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../assets";
import IconF from "react-native-vector-icons/FontAwesome5";
import IconM from "react-native-vector-icons/MaterialIcons";
import ReadMoreText from "../../../containers/preview/readMoreText";
import { Skills } from "../../../containers/preview/skills";
import { ProjectsList } from "../../../containers/preview/projectsList";
import { logout, signInSuccess } from "../../../redux/auth/actions";
import { userDataSelector } from "../../../redux/auth/selectors";
import PatternTop from "../../../assets/images/patternTop.svg";
import CirclesDesign from "../../../assets/images/circles_design.svg";
import Icons from "../../../containers/common/Icons";

const Profile = (props) => {
  const { userData } = props;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  // console.log('user===>', userData);

  const changePassword = () => {
    props.navigation.navigate("ChangePassword");
  };
  const editAbout = () => {
    props.navigation.navigate("About");
  };
  const editProfile = () => {
    props.navigation.navigate("EditProfile");
  };
  const editSkills = () => {
    props.navigation.navigate("EditSkills");
  };

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <Image
          source={R.images.patternTop}
          resizeMode={"contain"}
          style={{
            width: hp("30%"),
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />

        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View
              style={{
                flex: 1,
                paddingTop: userData?.userType === "freelancer" ? 20 : 0,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 20,
                  paddingHorizontal: 30,
                }}
              >
                <View
                  style={{
                    width: hp("5%"),
                    height: hp("5%"),
                    borderRadius: hp("2.5%"),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "lightgray",
                    overflow: "hidden",
                  }}
                >
                  {userData?.profileImage ? (
                    <Image
                      source={{
                        uri: `${userData.profileImage}`,
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: hp("2.5%"),
                      }}
                      resizeMode={"contain"}
                    />
                  ) : (
                    <Icons
                      family={"FontAwesome"}
                      name="user"
                      size={30}
                      color="black"
                    />
                  )}
                </View>

                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 5,
                    fontSize: hp("1.8%"),
                    color: R.colors.DarkBlack,
                    fontFamily: R.fonts.defaultSemiBold,
                  }}
                >
                  Hi, {userData?.firstName} {userData?.lastName}
                </Text>
                <IconM
                  name={"verified"}
                  color={"rgba(40, 204, 126, 1)"}
                  size={hp("2%")}
                />
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => dispatch(logout())}
                  >
                    <IconM
                      name={"logout"}
                      color={R.colors.PrimaryColorDark}
                      size={hp("3%")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {userData?.userType === "freelancer" && (
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    marginTop: 20,
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      width: wp("40%"),
                      alignItems: "center",
                      flexDirection: "row",
                      padding: 15,
                      borderColor: R.colors.BorderColor,
                      borderWidth: 1,
                      backgroundColor: R.colors.White,
                      borderRadius: 25,
                    }}
                  >
                    <IconF
                      name={"dollar-sign"}
                      color={R.colors.MediumGrey}
                      size={hp("2.2%")}
                    />
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: hp("1.7%"),
                          color: R.colors.DarkBlack,
                          fontFamily: R.fonts.defaultMedium,
                        }}
                      >
                        $500K
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          marginLeft: 10,
                          fontSize: hp("1.3%"),
                          color: R.colors.Grey,
                          fontFamily: R.fonts.defaultMedium,
                        }}
                      >
                        TOTAL EARNING
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: wp("40%"),
                      alignItems: "center",
                      flexDirection: "row",
                      padding: 15,
                      borderColor: R.colors.BorderColor,
                      borderWidth: 1,
                      backgroundColor: R.colors.PrimaryColorDark,
                      borderRadius: 25,
                    }}
                  >
                    <IconF
                      name={"clipboard-list"}
                      color={R.colors.MediumGrey}
                      size={hp("2.2%")}
                    />
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: hp("1.7%"),
                          color: R.colors.DarkBlack,
                          fontFamily: R.fonts.defaultMedium,
                        }}
                      >
                        172
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          marginLeft: 10,
                          fontSize: hp("1.3%"),
                          color: R.colors.Grey,
                          fontFamily: R.fonts.defaultMedium,
                        }}
                      >
                        TOTAL JOBS
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  backgroundColor: R.colors.White,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  borderTopColor: R.colors.BorderColor,
                  borderTopWidth: 1,
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    padding: 20,
                    borderBottomColor: R.colors.BorderColor,
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp("1.6%"),
                        color: R.colors.DarkBlack,
                        fontFamily: R.fonts.defaultMedium,
                      }}
                    >
                      About
                    </Text>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 5 }}
                      onPress={editAbout}
                    >
                      <IconF
                        name={"pencil-alt"}
                        color={R.colors.MediumGrey}
                        size={hp("1.6%")}
                      />
                    </TouchableOpacity>
                  </View>
                  {userData?.aboutMe != "" && (
                    <ReadMoreText
                      textStyle={{
                        marginTop: 10,
                        fontSize: hp("1.4%"),
                        color: R.colors.MediumDarkGrey,
                        fontFamily: R.fonts.defaultMedium,
                      }}
                      readMoreStyle={{
                        fontSize: hp("1.4%"),
                        fontFamily: R.fonts.defaultMedium,
                        textDecorationColor: R.colors.PrimaryColorDark,
                        textDecorationLine: "underline",
                        color: R.colors.PrimaryColorDark,
                      }}
                    >
                      {userData?.aboutMe}
                    </ReadMoreText>
                  )}
                </View>
                <View
                  style={{
                    padding: 20,
                    borderBottomColor: R.colors.BorderColor,
                    borderBottomWidth: 1,
                    backgroundColor: R.colors.White,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <IconF
                        name={"id-card"}
                        color={R.colors.MediumGrey}
                        size={hp("2%")}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: hp("1.6%"),
                          color: R.colors.DarkBlack,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        User Detail
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{ paddingHorizontal: 5 }}
                      onPress={editProfile}
                    >
                      <IconF
                        name={"pencil-alt"}
                        color={R.colors.MediumGrey}
                        size={hp("1.6%")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: R.colors.BorderPrimaryLight,
                        paddingHorizontal: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: hp("1.5%"),
                          color: R.colors.Grey,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        Full Name:
                      </Text>
                      <Text
                        style={{
                          flex: 2,
                          fontSize: hp("1.5%"),
                          color: R.colors.DarkBlack,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        {userData?.firstName} {userData?.lastName}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: R.colors.BorderPrimaryLight,
                        paddingHorizontal: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: hp("1.5%"),
                          color: R.colors.Grey,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        Email:
                      </Text>
                      <Text
                        style={{
                          flex: 2,
                          fontSize: hp("1.5%"),
                          color: R.colors.DarkBlack,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        {userData?.email}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: R.colors.BorderPrimaryLight,
                        paddingHorizontal: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: hp("1.5%"),
                          color: R.colors.Grey,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        Phone:
                      </Text>
                      <Text
                        style={{
                          flex: 2,
                          fontSize: hp("1.5%"),
                          color: R.colors.DarkBlack,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        {userData?.phone}
                      </Text>
                    </View>
                    {userData?.userType === "client" && (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: R.colors.BorderPrimaryLight,
                          paddingHorizontal: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: 15,
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontSize: hp("1.5%"),
                            color: R.colors.Grey,
                            fontFamily: R.fonts.defaultRegular,
                          }}
                        >
                          Profession:
                        </Text>
                        <Text
                          style={{
                            flex: 2,
                            fontSize: hp("1.5%"),
                            color: R.colors.DarkBlack,
                            fontFamily: R.fonts.defaultRegular,
                          }}
                        >
                          {userData?.clientProfession}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        paddingHorizontal: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 15,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: hp("1.5%"),
                          color: R.colors.Grey,
                          fontFamily: R.fonts.defaultRegular,
                        }}
                      >
                        Password:
                      </Text>
                      <TouchableOpacity
                        style={{
                          flex: 2,
                        }}
                        onPress={changePassword}
                      >
                        <Text
                          style={{
                            fontSize: hp("1.5%"),
                            fontFamily: R.fonts.defaultRegular,
                            textDecorationColor: R.colors.PrimaryColorDark,
                            textDecorationLine: "underline",
                            color: R.colors.PrimaryColorDark,
                          }}
                        >
                          Change Password
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0, backgroundColor: R.colors.White }}
      ></SafeAreaView>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userData: userDataSelector(state),
  };
}

export default connect(mapStateToProps)(Profile);
