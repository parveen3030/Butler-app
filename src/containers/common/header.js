import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconF from "react-native-vector-icons/MaterialCommunityIcons";
import R from "../../assets";

export const Header = (props) => {
  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={[
          {
            flexDirection: "row",
            backgroundColor: props?.transparent ? "transparent" : "#fff",
            alignItems: "center",

            height: hp("11%"),
          },
          props?.transparent
            ? {}
            : { borderBottomColor: R.colors.BorderColor, borderBottomWidth: 1 },
          props.containerStyle,
        ]}
      >
        {props.back && (
          <View style={{ width: wp("10%"), alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{ padding: 5 }}
            >
              <IconF
                name={"arrow-left"}
                color={R.colors.MediumGrey}
                size={25}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={[
              {
                fontSize: hp("2.2%"),
                color: R.colors.DarkBlack,
                alignSelf: "center",
                justifyContent: "center",
                fontFamily: R.fonts.defaultMedium,
              },
              props.titleTextStyle,
            ]}
          >
            {props.title
              ? props.title
              : props.route.name
              ? props.route.name
              : ""}
          </Text>
        </View>
        <View style={{ width: wp("10%"), alignItems: "center" }}>
          {props.dotsEnabled && (
            <TouchableOpacity style={{ padding: 5 }}>
              <IconF
                name={"dots-vertical"}
                color={R.colors.MediumGrey}
                size={25}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};
