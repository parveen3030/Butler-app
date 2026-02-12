import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import R from "../../assets";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import Icons from "../common/Icons";

const MainBackground = ({
  children,
  showButler,
  heading,
  showBackIcon,
  onBackPress,
  onButlerPress,
  BGcolor,
  backColor = R.colors.DarkGrey
}) => {
  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: BGcolor ? BGcolor : R.colors.BackgroundLightGrey,
        }}
      >
        <Text style={styles.headTxt}>{heading}</Text>
        <ImageBackground
          source={R.images.patternTop}
          resizeMode={"stretch"}
          style={styles.bgImg}
        >
          <View style={[styles.txtContainer]}>
            {showBackIcon && (
              <TouchableOpacity
                onPress={onBackPress}
                style={{
                  padding: 5,
                }}
              >
                <Icons
                  family={"AntDesign"}
                  name="arrowleft"
                  size={25}
                  color={backColor}
                />
              </TouchableOpacity>
            )}
            {showButler && <TouchableOpacity
            onPress={onButlerPress}>
            <Text style={styles.imgTxt}>Butler</Text>
            </TouchableOpacity>}
          </View>
        </ImageBackground>
        {children}
      </SafeAreaView>
    </>
  );
};

export default MainBackground;

const styles = StyleSheet.create({
  bgImg: {
    width: screenWidthInPercent(60),
    height: screenHeightInPercent(22),
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  imgTxt: {
    fontSize: 40,
    fontFamily: R.fonts.ArialBold,
    color: R.colors.White,
    marginLeft: 5,
  },
  headTxt: {
    position: "absolute",
    top: screenHeightInPercent(5),
    textAlign: "center",
    flex: 1,
    left: screenWidthInPercent(20),
    right: screenWidthInPercent(20),
    color: R.colors.Black,
    fontFamily: R.fonts.BalooBhai_semiBold,
    fontSize: screenHeightInPercent(2.4),
    zIndex: 99,
  },
  txtContainer: {
    flexDirection: "row",
    marginTop: screenHeightInPercent(5),
    marginLeft: screenWidthInPercent(6),
    alignItems: "center",
  },
});
