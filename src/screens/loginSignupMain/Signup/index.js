import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../assets";
import { signUpProcessData } from "../../../redux/auth/actions";
import CirclesDesign from "../../../assets/images/circles_design.svg";
import ClientOption from "../../../assets/images/clientOption.svg";
import FreelanceOption from "../../../assets/images/freelanceOption.svg";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";

const SignupType = (props) => {
  const dispatch = useDispatch();
  const selectUser = (userType) => {
    dispatch(signUpProcessData({ userType }));
    props.navigation.navigate("Signup", { userType });
  };

  return (
    <>
      <View style={{ position: "absolute", right: 0, zIndex: 999 }}>
        <CirclesDesign />
      </View>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: R.colors.PrimaryColorDark,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginVertical: hp("13%"),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={R.images.butlerLogo}
              style={{
                width: screenWidthInPercent(27),
                height: screenHeightInPercent(5),
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: hp("2.2%"),
                fontStyle: "normal",
                color: R.colors.White,
                fontFamily: R.fonts.Maven_medium,
              }}
            >
              Find your best work
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.White,
              padding: 10,
              borderTopLeftRadius: hp("5.4%"),
              borderTopRightRadius: hp("5.4%"),
              // marginTop: hp("12%"),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: hp("5%"),
                fontSize: hp("2.3%"),
                fontStyle: "normal",
                color: "#535353",
                fontFamily: R.fonts.Maven_bold,
              }}
            >
              Which one are you?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => selectUser("client")}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  paddingVertical: 20,
                  flex: 1,
                  margin: 5,
                  borderRadius: hp("3.4%"),
                  backgroundColor: R.colors.PrimaryLight,
                }}
                activeOpacity={0.6}
              >
                <Text
                  style={{
                    marginBottom: hp("5%"),
                    textAlign: "center",
                    fontSize: hp("2.5%"),
                    color: "#535353",
                    fontFamily: R.fonts.Maven_semiBold,
                  }}
                >
                  Client
                </Text>
                <ClientOption width={hp("18%")} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectUser("freelancer")}
                style={{
                  flex: 1,
                  borderColor: "#fff",
                  alignItems: "center",
                  borderRadius: hp("3.4%"),
                  padding: 10,
                  margin: 5,
                  paddingVertical: 20,
                  backgroundColor: R.colors.PrimaryLight,
                  justifyContent: "center",
                }}
                activeOpacity={0.6}
              >
                <Text
                  style={{
                    marginBottom: hp("5%"),
                    textAlign: "center",
                    fontSize: hp("2.5%"),
                    color: "#535353",
                    fontFamily: R.fonts.Maven_semiBold,
                  }}
                >
                  Designer
                </Text>
                <FreelanceOption width={hp("18%")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        edges={["Bottom"]}
        style={{ flex: 0, backgroundColor: R.colors.White }}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SignupType);
