import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconF from "react-native-vector-icons/FontAwesome5";
import R from "../../assets";
import { isValidEmail } from "../../utils/validator";

export const TextArea = (props) => {
  const {
    inputStyle,
    passwordField,
    value,
    onChangeText,
    placeHolder,
    emailField,
    leftIcon,
    required,
    containerStyle,
    showError,
    rightIcon,
    title,
    titleTextStyle,
  } = props;
  const [error, setError] = useState("");

  return (
    <View style={containerStyle}>
      {title && (
        <Text
          style={[
            {
              marginBottom: 10,
              marginTop: 5,
              fontSize: hp("1.5%"),
              color: R.colors.Grey,
              fontFamily: R.fonts.defaultSemiBold,
            },
            titleTextStyle,
          ]}
        >
          {title}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          color: "rgba(255, 255, 255, 1)",
          borderColor: R.colors.BorderLightGreen,
          borderWidth: 1,
          color: "#353635",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <TextInput
          placeholder={placeHolder ? placeHolder : ""}
          placeholderTextColor={R.colors.LightGrey}
          style={[
            {
              color: R.colors.DefaultTextColor,
              height: hp("40%"),
              marginLeft: 0,
              flex: 1,
              fontSize: hp("1.6%"),
              backgroundColor: "transparent",
              lineHeight: hp("2.4%"),
              fontFamily:
                value.text == ""
                  ? R.fonts.defaultMedium
                  : R.fonts.defaultRegular,
            },
            inputStyle,
          ]}
          multiline={true}
          numberOfLines={20}
          onChangeText={(text) => {
            let errorText = "";
            if (required) {
              if (text.trim().length == 0) {
                errorText = "This field is required";
              }
            } else if (emailField) {
              if (!isValidEmail(text)) {
                errorText = "Enter a valid email address";
              }
            } else if (passwordField) {
              if (text != "" && text.length < 6) {
                errorText = "Password should be atleast 6 characters";
              }
            }
            onChangeText({
              text,
              error: errorText ? true : false,
            });
            if (showError || showError == undefined) {
              setError(errorText);
            }
          }}
          value={value.text}
        />
      </View>
    </View>
  );
};
