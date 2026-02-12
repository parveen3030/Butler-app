import React, { useEffect } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect, useDispatch, useSelector } from "react-redux";
import R from "../../../assets";
import GradientText from "../../../containers/preview/textGradient";
import { homeStackNavigate } from "../../../redux/auth/actions";
import {
  signUpProcessDataSelector,
  userDataSelector,
} from "../../../redux/auth/selectors";
import ApprovalBanner from "../../../assets/images/approvalBanner.svg";
import PatternBg from "../../../assets/images/patternBg.svg";
import { screenWidthInPercent } from "../../../utils/screenDimensions";
import { logout } from "../../../redux/auth/actions";

const Approval = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (user?.userType == "client") {
      setTimeout(() => {
        console.log("props.navigation", props.navigation);
        dispatch(homeStackNavigate());
      }, 3000);
    } else {
      setTimeout(() => {
        dispatch(logout())
      }, 3000);
    }    
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          paddingVertical: hp("5%"),
          paddingHorizontal: wp("10%"),
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {user?.userType == "client" ? (
            <Text
              style={{
                fontSize: hp("5%"),
                marginTop: hp("2%"),
                color: R.colors.PrimaryColorDark,
                fontFamily: R.fonts.ArialRoundedBold,
              }}
            >
              Butler
            </Text>
          ) : (
            <Text
              style={{
                fontSize: hp("4.2%"),
                color: R.colors.PrimaryColorDark,
                fontFamily: R.fonts.ArialRoundedBold,
              }}
            >
              Butler
            </Text>
          )}
          {user?.userType !== "client" && (
            <>
              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: hp("2.2%"),
                    color: R.colors.DarkBlack,
                    fontFamily: R.fonts.defaultRegular,
                  }}
                >
                  Hello,{" "}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: hp("2.2%"),
                    color: R.colors.DarkBlack,
                    fontFamily: R.fonts.defaultSemiBold,
                  }}
                >
                  {props.userData?.fullName}!
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  borderColor: R.colors.PrimaryColorDark,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: hp("1.2%"),
                    color: R.colors.DarkBlack,
                    fontFamily: R.fonts.Maven_semiBold,
                  }}
                >
                  YOUR APPLICATION HASE BEEN SENT
                </Text>
              </View>
            </>
          )}
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            zIndex: 1,
          }}
        >
          {user?.userType !== "client" ? (
            <ApprovalBanner width={wp("70%")} />
          ) : (
            <Image
              style={{
                resizeMode: "contain",
                width: screenWidthInPercent(95),
                height: screenWidthInPercent(95),
              }}
              source={R.images.clientWelcom}
            />
          )}
          {/*  */}
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: wp("70%"),
          }}
        >
          <View
            style={{
              position: "absolute",
              marginBottom: user?.userType == "client" ? hp("10%") : hp("-3%"),
              zIndex: -1,
              bottom: 0,
            }}
          >
            <PatternBg width={wp("100%")} />
          </View>
          {user?.userType !== "client" && (
            <Text
              style={{
                marginBottom: hp("12%"),
                textAlign: "center",
                fontSize: hp("1.6%"),
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
              }}
            >
              Thank you for taking interest in working with us!
            </Text>
          )}
        </View>

        {user?.userType == "client" && (
          <Text
            style={{
              textAlign: "center",
              marginTop: hp("1.4%"),
              fontSize: hp("1.8%"),
              color: "#131522",
              fontFamily: R.fonts.Maven_regular,
            }}
          >
            We’re finalizing everything for you
          </Text>
        )}

        <Text
          style={{
            textAlign: "center",
            marginTop: hp("1.4%"),
            fontSize: hp("1.8%"),
            color: R.colors.Grey,
            fontFamily: R.fonts.Maven_regular,
          }}
        >
          {user?.userType == "client"
            ? "Please wait..."
            : "We’re currently reviewing your application. We will get back to you as soon as possible."}
        </Text>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    userData: userDataSelector(state),
  };
}

export default connect(mapStateToProps)(Approval);
