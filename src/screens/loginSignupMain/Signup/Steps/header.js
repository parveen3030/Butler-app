import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../../assets";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { signupProcessStepSelector } from "../../../../redux/auth/selectors";

const SignupStepsHeader = (props) => {
  const dispatch = useDispatch();
  const { signupStep } = props;
  return (
    <View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: hp("1.6%"),
              fontStyle: "normal",
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.defaultExtraBold,
            }}
          >
            {signupStep + 1}
          </Text>
          <Text
            style={{
              fontSize: hp("1.6%"),
              fontStyle: "normal",
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.defaultSemiBold,
            }}
          >
            {" "}
            / 6 STEPS
          </Text>
        </View>
        {/* <TouchableOpacity style={{}}>
                    <Icon name={'close'} color={R.colors.Grey} size={22} />
                </TouchableOpacity> */}
      </View>
      <View style={{ justifyContent: "center", marginTop: 10 }}>
        {/* <Text style={{
                    fontSize: hp('2.4%'),
                    fontStyle: 'normal',
                    color: R.colors.DarkBlack,
                    fontFamily: R.fonts.defaultRegular
                }} >Tell us about yourself!</Text> */}
        {/* <Text style={{
                    marginTop: 5,
                    fontSize: hp('1.6%'),
                    fontStyle: 'normal',
                    color: R.colors.Grey,
                    fontFamily: R.fonts.defaultRegular
                }} >Let’s fill this out to complete an account.</Text> */}
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    signupStep: signupProcessStepSelector(state),
  };
}

export default connect(mapStateToProps)(SignupStepsHeader);
