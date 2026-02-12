import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../assets";
import GradientContainer from "../../../containers/preview/gradientContainer";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";

const Welcome = (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: R.colors.PrimaryColorDark,
        padding: 20,
      }}
    >
      <View style={{ flex: 1, marginBottom: hp("5%") }}>
        <View
          style={{
            marginTop: hp("25%"),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={R.images.butlerLogo}
              style={{
                width: screenWidthInPercent(50),
                height: screenHeightInPercent(13),
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: hp("35%"),
          }}
        >
          <GradientContainer
            // direction={"horizontal"}
            containerStyle={{ borderRadius: hp("2.1%"), width: "90%" }}
          >
            <TouchableOpacity
               onPress={() => props.navigation.navigate("SignupType")}
              style={{
                backgroundColor: "#fff",
                borderRadius: hp("2.1%"),
                overflow: "hidden",
              }}
              activeOpacity={1}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SignupType")}
                style={{
                  height: hp("6.6%"),
                  padding: 10,
                  borderColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: hp("2.1%"),
                  overflow: "hidden",
                  // backgroundColor: "red",
                }}
              >
                <Text
                  style={{
                    fontSize: hp("2.2%"),
                    color: R.colors.PrimaryColorDarkExtra,
                    fontFamily: R.fonts.Maven_medium,
                  }}
                >
                  REGISTER
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </GradientContainer>
          <View
            style={{
              borderRadius: hp("2.1%"),
              padding: 2,
              width: "90%",
              marginTop: 15,
              backgroundColor: R.colors.PrimaryLight1,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
              style={{
                height: hp("6.6%"),
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp("2.2%"),
                  color: R.colors.DarkGrey,
                  fontFamily: R.fonts.Maven_medium,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Welcome);
